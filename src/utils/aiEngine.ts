import { DesignPreset, FontItem, TopicId } from '../types/studio';
import { FONT_LIBRARY, TOPICS } from '../data/defaultData';

export interface ExtractedMeta {
  topic: TopicId;
  actorName?: string;
  title?: string;
  subtitle?: string;
  detectedMoods: string[];
}

export interface FontRecommendation {
  titleFont: FontItem;
  actorFont: FontItem;
  reason: string;
  matchScore: number;
}

/**
 * Intelligent text parser for Telegram captions
 * e.g., "배우 류경수 프로필 및 영화 '야당' 캐스팅 뉴스"
 */
export function parseTelegramCaption(text: string): ExtractedMeta {
  const clean = text.trim();
  let matchedTopic: TopicId = 'casting';
  let actorName: string | undefined = undefined;
  let title: string | undefined = undefined;

  // 1. Topic detection keywords
  if (/생일|축하|birthday|hbd|탄신|해피버스데이/i.test(clean)) {
    matchedTopic = 'birthday';
  } else if (/촬영\s*비하인드|비하인드|메이킹|미공개|bts|현장스틸|메이킹필름/i.test(clean)) {
    matchedTopic = 'behind';
  } else if (/일상|사복|데일리|모먼트|라이프스타일|꽃밭|자연광|스냅|휴일/i.test(clean)) {
    matchedTopic = 'daily';
  } else if (/시구|야구|경기|시구자|스포츠/.test(clean)) {
    matchedTopic = 'first-pitch';
  } else if (/팬미팅|팬싸|팬클럽|팬이벤트|쇼케이스/.test(clean)) {
    matchedTopic = 'fanmeeting';
  } else if (/시상식|레드카펫|어워즈|수상|노미네이트|드레스/.test(clean)) {
    matchedTopic = 'awards';
  } else if (/GV|관객과의대화|무대인사|상영회|영화제/.test(clean)) {
    matchedTopic = 'gv';
  } else if (/촬영|크랭크인|현장|세트|로케이션/.test(clean)) {
    matchedTopic = 'filming';
  } else if (/포스터|티저|메인포스터|공식포스터/.test(clean)) {
    matchedTopic = 'poster';
  } else if (/캐스팅|공식|출연|차기작|소속사/.test(clean)) {
    matchedTopic = 'casting';
  }

  // 2. Extract Actor name
  const actorMatch = clean.match(/배우\s*([가-힣]{2,4})/) || clean.match(/([가-힣]{2,4})\s*배우/);
  if (actorMatch) {
    actorName = `배우 ${actorMatch[1]}`;
  } else {
    // Check known actor names
    const known = ['서유진', '류경수', '김서현', '박도윤', '정유나', '이도현', '김고은', '박은빈', '손석구'];
    for (const name of known) {
      if (clean.includes(name)) {
        actorName = `배우 ${name}`;
        break;
      }
    }
  }

  // 3. Extract Work / Title inside quotes
  const workMatch = clean.match(/['"《〈](.+?)['"》〉]/);
  if (workMatch) {
    title = workMatch[1].toUpperCase();
  }

  const topicDef = TOPICS.find((t) => t.id === matchedTopic);

  return {
    topic: matchedTopic,
    actorName: actorName || '배우 서유진',
    title: title || topicDef?.defaultTitle,
    subtitle: topicDef?.defaultSubtitle,
    detectedMoods: topicDef?.moodKeywords || ['럭셔리', '에이전시']
  };
}

/**
 * AI Font Curator: calculates match scores based on mood tags, topic synergy, and typographic role
 */
export function recommendFontsForContext(
  topic: TopicId,
  userMoodTags: string[] = []
): FontRecommendation[] {
  const recommendations: FontRecommendation[] = [];

  // Filter available title fonts
  const titleCandidates = FONT_LIBRARY.filter(
    (f) => f.roles.includes('main-title') && f.licenseStatus === 'verified-free'
  );

  // Filter available Korean actor fonts
  const actorCandidates = FONT_LIBRARY.filter(
    (f) => f.roles.includes('actor-name') && f.languages.includes('ko')
  );

  for (const tFont of titleCandidates) {
    // Topic matching score
    let score = tFont.topics.includes(topic) ? 40 : 15;

    // Mood overlap
    const moodOverlap = tFont.moodTags.filter((m) => userMoodTags.includes(m)).length;
    score += moodOverlap * 15;

    // Topic-specific bonuses
    if (topic === 'awards' || topic === 'fanmeeting') {
      score += tFont.scores.luxury * 0.3;
    } else if (topic === 'first-pitch') {
      score += tFont.scores.sporty * 0.35;
    } else if (topic === 'casting' || topic === 'filming') {
      score += tFont.scores.modern * 0.3;
    }

    // Pick best pairing actor font
    const actorFont =
      tFont.category === 'serif'
        ? actorCandidates.find((a) => a.category === 'serif') || actorCandidates[0]
        : actorCandidates.find((a) => a.category === 'sans') || actorCandidates[0];

    let reason = '';
    if (topic === 'awards') {
      reason = `${tFont.name}의 하이엔드 세리프 곡선과 ${actorFont.name}의 정통 명조가 시상식의 격식을 완성합니다.`;
    } else if (topic === 'first-pitch') {
      reason = `${tFont.name}의 묵직한 볼드 헤비 웨이트로 경기장의 박진감과 스포티함을 극대화합니다.`;
    } else if (topic === 'casting') {
      reason = `${tFont.name}의 미니멀하고 정제된 타이포로 헐리우드 CAA 공식 보도자료 룩을 재현합니다.`;
    } else {
      reason = `${tFont.name}과 ${actorFont.name}의 황금비율 대비를 통해 에이전시 특유의 세련된 여백을 구성합니다.`;
    }

    recommendations.push({
      titleFont: tFont,
      actorFont,
      reason,
      matchScore: Math.min(Math.round(score), 99)
    });
  }

  // Sort descending by score
  return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}

/**
 * Filter 3 curated variations for Telegram inline response:
 * A: Agency Minimal (or recommended)
 * B: Editorial Classic
 * C: Cinematic Dark
 */
export function getThreeVariantPresets(
  allPresets: DesignPreset[],
  topic: TopicId
): { variantA: DesignPreset; variantB: DesignPreset; variantC: DesignPreset } {
  const topicPresets = allPresets.filter((p) => p.topic === topic);

  // Variant A: Top Masthead Cover (보그 매거진 커버 — 상단 대형 타이틀 + 바코드)
  const variantA =
    topicPresets.find((p) => p.layoutArchetype === 'magazine-cover') ||
    topicPresets.find((p) => p.style === 'editorial') ||
    topicPresets[0];

  // Variant B: Cinema Letterbox (2.39:1 와이드 레터박스 + 영화제 월계관) 또는 35mm 필름 타공
  const variantB =
    topicPresets.find((p) => p.layoutArchetype === 'cinematic-letterbox' || p.layoutArchetype === 'analog-contact-sheet') ||
    topicPresets.find((p) => p.style === 'cinema') ||
    topicPresets[1];

  // Variant C: Museum Matte Frame (미술관 액자) 또는 볼드 2단 스택 / 스위스 그리드
  const variantC =
    topicPresets.find((p) => p.layoutArchetype === 'frame-passepartout' || p.layoutArchetype === 'stacked-monumental' || p.layoutArchetype === 'swiss-grid') ||
    topicPresets.find((p) => p.style === 'dark-luxury') ||
    topicPresets[2];

  return { variantA, variantB, variantC };
}
