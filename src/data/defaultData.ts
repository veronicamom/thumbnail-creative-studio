import {
  AgencyLogo,
  AspectRatioConfig,
  DesignPreset,
  FontItem,
  TopicDefinition,
  ActorProfile,
  TelegramConfig,
  FontLicenseAuditRecord
} from '../types/studio';

export const ASPECT_RATIOS: AspectRatioConfig[] = [
  {
    id: '4:5',
    label: '4:5 세로형',
    sublabel: 'Instagram Feed (1080 × 1350)',
    width: 1080,
    height: 1350
  },
  {
    id: '1:1',
    label: '1:1 정방형',
    sublabel: 'Square Post (1080 × 1080)',
    width: 1080,
    height: 1080
  },
  {
    id: '9:16',
    label: '9:16 스토리',
    sublabel: 'Story & Reels (1080 × 1920)',
    width: 1080,
    height: 1920
  },
  {
    id: '16:9',
    label: '16:9 와이드',
    sublabel: 'YouTube & Press (1280 × 720)',
    width: 1280,
    height: 720
  }
];

export const TOPICS: TopicDefinition[] = [
  {
    id: 'fanmeeting',
    nameKo: '팬미팅',
    nameEn: 'FAN MEETING',
    defaultTitle: 'FAN MEETING',
    defaultSubtitle: 'AN EVENING WITH ARTIST',
    badgeText: 'OFFICIAL INVITATION',
    description: '부드러운 클래식, 우아한 여백, 아이보리 톤의 감성적인 레이아웃',
    moodKeywords: ['우아함', '따뜻함', '감성적', '로맨틱', '클래식'],
    recommendedStyle: 'editorial'
  },
  {
    id: 'casting',
    nameKo: '캐스팅',
    nameEn: 'CASTING NEWS',
    defaultTitle: 'CASTING NEWS',
    defaultSubtitle: 'OFFICIAL AGENCY ANNOUNCEMENT',
    badgeText: 'PRESS RELEASE',
    description: 'CAA 스타일의 흑백 고대비, 절제된 타이포그래피, 공식 발표형',
    moodKeywords: ['정제됨', '전문적', '절제', '미니멀', '현대적'],
    recommendedStyle: 'minimal'
  },
  {
    id: 'birthday',
    nameKo: '생일 축하',
    nameEn: 'HAPPY BIRTHDAY',
    defaultTitle: 'HAPPY BIRTHDAY',
    defaultSubtitle: 'WISHING YOU THE HAPPIEST DAY',
    badgeText: 'BIRTHDAY ARCHIVE',
    description: 'CAA·MMA 에이전시의 절제된 고급스러움과 로맨틱 타이포그래피 (8종 전용 프리셋)',
    moodKeywords: ['로맨틱', '따뜻함', '축하', '고급스러움', '화보'],
    recommendedStyle: 'editorial'
  },
  {
    id: 'first-pitch',
    nameKo: '시구',
    nameEn: 'FIRST PITCH',
    defaultTitle: 'FIRST PITCH',
    defaultSubtitle: 'CHAMPIONSHIP CEREMONIAL MOMENT',
    badgeText: 'ATHLETIC EDITORIAL',
    description: '스포츠 에디토리얼, 강렬한 볼드 산세리프, 역동적 타이포',
    moodKeywords: ['역동적', '강렬함', '스포츠', '에너지', '스포티'],
    recommendedStyle: 'bold'
  },
  {
    id: 'gv',
    nameKo: 'GV / 무대인사',
    nameEn: 'SPECIAL GV',
    defaultTitle: 'SPECIAL GV',
    defaultSubtitle: 'DIRECTOR & CAST TALK',
    badgeText: 'CINEMATIC DIALOGUE',
    description: '영화제 포스터 느낌의 깊은 대비와 에디토리얼 세리프',
    moodKeywords: ['영화적', '극적인 대비', '예술적', '시네마틱', '포스터'],
    recommendedStyle: 'cinema'
  },
  {
    id: 'awards',
    nameKo: '시상식',
    nameEn: 'AWARDS NIGHT',
    defaultTitle: 'AWARDS NIGHT',
    defaultSubtitle: 'HONORING EXCELLENCE',
    badgeText: 'RED CARPET SELECTION',
    description: '블랙 & 골드 악센트, 레드카펫 럭셔리, 최고급 세리프 서체',
    moodKeywords: ['럭셔리', '고급스러움', '화려함', '품격', '클래식'],
    recommendedStyle: 'dark-luxury'
  },
  {
    id: 'daily',
    nameKo: '일상 / 화보',
    nameEn: 'MOMENTS',
    defaultTitle: 'MOMENTS',
    defaultSubtitle: 'OFF THE CAMERA DIARY',
    badgeText: 'LIFESTYLE ARCHIVE',
    description: '자연광, 미니멀한 텍스트 배치, 자연스러운 감성',
    moodKeywords: ['자연스러움', '미니멀', '차분함', '따뜻함', '라이프스타일'],
    recommendedStyle: 'minimal'
  },
  {
    id: 'filming',
    nameKo: '촬영장',
    nameEn: 'ON SET',
    defaultTitle: 'ON SET',
    defaultSubtitle: 'IN PRODUCTION DISPATCH',
    badgeText: 'CINEMA LOG',
    description: '시네마틱 와이드 구도, 프로덕션 스틸 컷, 모던 그리드',
    moodKeywords: ['시네마틱', '현장감', '모던', '다큐멘터리', '영화적'],
    recommendedStyle: 'cinema'
  },
  {
    id: 'behind',
    nameKo: '비하인드',
    nameEn: 'BEHIND THE SCENES',
    defaultTitle: 'BEHIND',
    defaultSubtitle: 'EXCLUSIVE UNSEEN ARCHIVE',
    badgeText: 'ARCHIVE STILLS',
    description: '35mm 필름 프레임 감성, 기록형 인덱스, 빈티지 모던',
    moodKeywords: ['아카이브', '필름', '기록형', '자연스러움', '감성'],
    recommendedStyle: 'swiss-modern'
  },
  {
    id: 'poster',
    nameKo: '공식 포스터',
    nameEn: 'OFFICIAL POSTER',
    defaultTitle: 'OFFICIAL POSTER',
    defaultSubtitle: 'FEATURE PRESENTATION',
    badgeText: 'ORIGINAL WORK',
    description: '작품 중심의 대담한 그리드, 타이틀 임팩트, 영화제 셀렉션',
    moodKeywords: ['강렬함', '예술적', '임팩트', '고대비', '디스플레이'],
    recommendedStyle: 'bold'
  }
];

export const AGENCY_LOGOS: AgencyLogo[] = [
  {
    id: 'logo-caa-style',
    name: 'CAA Style - Artist Agency',
    agencyName: 'CREATIVE ARTISTS AGENCY',
    type: 'svg',
    isDefault: true,
    styleDescription: '헐리우드 최고급 에이전시 스타일의 절제된 타이포 워드마크',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" fill="currentColor">
      <text x="4" y="32" font-family="'Manrope', sans-serif" font-size="28" font-weight="800" letter-spacing="8">CAA</text>
      <text x="110" y="24" font-family="'Manrope', sans-serif" font-size="9" font-weight="600" letter-spacing="3" opacity="0.8">GLOBAL ARTIST</text>
      <text x="110" y="38" font-family="'Manrope', sans-serif" font-size="9" font-weight="600" letter-spacing="3" opacity="0.8">MANAGEMENT</text>
      <line x1="96" y1="12" x2="96" y2="44" stroke="currentColor" stroke-width="1" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'logo-mma-style',
    name: 'MMA Style - Studio Collective',
    agencyName: 'MMA MANAGEMENT ARTISTS',
    type: 'svg',
    isDefault: false,
    styleDescription: '파리 패션·시네마틱 에디토리얼 워드마크',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50" fill="currentColor">
      <text x="2" y="26" font-family="'Italiana', serif" font-size="26" letter-spacing="6">M M A</text>
      <text x="4" y="42" font-family="'Manrope', sans-serif" font-size="7" font-weight="600" letter-spacing="4" opacity="0.75">PARIS · NEW YORK · SEOUL</text>
    </svg>`
  },
  {
    id: 'logo-cinetique',
    name: 'Cinétique Pictures',
    agencyName: 'CINÉTIQUE ENTERTAINMENT',
    type: 'svg',
    isDefault: false,
    styleDescription: '영화 배급사 및 프리미엄 제작사 스타일',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" fill="currentColor">
      <rect x="2" y="8" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="17,17 29,27 17,37" fill="currentColor"/>
      <text x="50" y="27" font-family="'DM Serif Display', serif" font-size="18" letter-spacing="2">CINÉTIQUE</text>
      <text x="52" y="40" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="600" letter-spacing="4" opacity="0.7">ENTERTAINMENT</text>
    </svg>`
  },
  {
    id: 'logo-blanc',
    name: 'Blanc Entertainment',
    agencyName: 'BLANC ENTERTAINMENT',
    type: 'svg',
    isDefault: false,
    styleDescription: 'Cormorant 세리프와 볼드 산세리프가 조화된 프렌치 에이전시 공식 워드마크',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 50" fill="currentColor">
      <text x="2" y="27" font-family="'Cormorant Garamond', serif" font-size="28" font-style="italic" font-weight="600" letter-spacing="2">blanc</text>
      <text x="3" y="42" font-family="'Montserrat', 'Manrope', sans-serif" font-size="8" font-weight="600" letter-spacing="5" opacity="0.85">ENTERTAINMENT</text>
    </svg>`
  },
  {
    id: 'logo-minimal-monogram',
    name: 'Studio Archive Monogram',
    agencyName: 'STUDIO ARCHIVE',
    type: 'svg',
    isDefault: false,
    styleDescription: '미니멀 모노그램 심볼과 현대적 타이포',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="currentColor">
      <circle cx="20" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="20" y1="12" x2="20" y2="36" stroke="currentColor" stroke-width="2"/>
      <text x="46" y="26" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" letter-spacing="4">ARCHIVE</text>
      <text x="47" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" letter-spacing="3" opacity="0.7">CREATIVE TALENT</text>
    </svg>`
  }
];

export const FONT_LIBRARY: FontItem[] = [
  // 1. Luxury & Editorial Serifs
  {
    id: 'bodoni-moda',
    name: 'Bodoni Moda',
    family: 'Bodoni Moda',
    cssFamily: "'Bodoni Moda', serif",
    category: 'serif',
    weights: [400, 600, 700, 900],
    moodTags: ['럭셔리', '패션', '극적인 대비', '우아함', '하이엔드'],
    styleTags: ['세리프', '고대비', '에디토리얼', '이탈리안'],
    topics: ['awards', 'poster', 'gv', 'fanmeeting'],
    roles: ['main-title', 'subtitle'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료, 이미지 및 웹 자동 렌더링 검증 완료)',
    scores: { luxury: 98, modern: 65, dramatic: 92, sporty: 10, koreanHarmony: 75 },
    recommendedPairings: ['manrope', 'noto-sans-kr', 'dm-sans']
  },
  {
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
    family: 'Cormorant Garamond',
    cssFamily: "'Cormorant Garamond', serif",
    category: 'serif',
    weights: [400, 600, 700],
    moodTags: ['클래식', '우아함', '감성적', '따뜻함', '로맨틱'],
    styleTags: ['올드스타일', '세리프', '섬세함', '문학적'],
    topics: ['fanmeeting', 'awards', 'daily'],
    roles: ['main-title', 'subtitle', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 94, modern: 55, dramatic: 80, sporty: 15, koreanHarmony: 88 },
    recommendedPairings: ['manrope', 'noto-serif-kr', 'plus-jakarta']
  },
  {
    id: 'dm-serif-display',
    name: 'DM Serif Display',
    family: 'DM Serif Display',
    cssFamily: "'DM Serif Display', serif",
    category: 'serif',
    weights: [400],
    moodTags: ['영화적', '에디토리얼', '묵직함', '포스터', '신뢰감'],
    styleTags: ['세리프', '트랜지셔널', '헤드라인', '시네마'],
    topics: ['gv', 'filming', 'casting', 'poster'],
    roles: ['main-title', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 90, modern: 78, dramatic: 94, sporty: 20, koreanHarmony: 82 },
    recommendedPairings: ['dm-sans', 'manrope', 'noto-sans-kr']
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: 'Playfair Display',
    cssFamily: "'Playfair Display', serif",
    category: 'serif',
    weights: [400, 700, 900],
    moodTags: ['고급', '잡지', '로맨틱', '드라마틱'],
    styleTags: ['세리프', '하이콘트라스트', '매거진'],
    topics: ['awards', 'fanmeeting', 'daily'],
    roles: ['main-title', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 92, modern: 70, dramatic: 88, sporty: 15, koreanHarmony: 78 },
    recommendedPairings: ['manrope', 'noto-sans-kr']
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    family: 'Cinzel',
    cssFamily: "'Cinzel', serif",
    category: 'display',
    weights: [500, 700, 900],
    moodTags: ['기념비적', '시상식', '클래식', '웅장함'],
    styleTags: ['로마자', '세리프', '올캡스', '모뉴멘탈'],
    topics: ['awards', 'poster', 'casting'],
    roles: ['main-title', 'subtitle'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 96, modern: 60, dramatic: 95, sporty: 10, koreanHarmony: 72 },
    recommendedPairings: ['manrope', 'inter']
  },
  {
    id: 'italiana',
    name: 'Italiana',
    family: 'Italiana',
    cssFamily: "'Italiana', serif",
    category: 'display',
    weights: [400],
    moodTags: ['오트쿠튀르', '패션', '극도로 얇음', '아방가르드'],
    styleTags: ['세리프', '패션매거진', '우아함'],
    topics: ['awards', 'daily', 'fanmeeting'],
    roles: ['main-title'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 97, modern: 75, dramatic: 85, sporty: 5, koreanHarmony: 70 },
    recommendedPairings: ['manrope', 'noto-sans-kr']
  },

  // 2. Modern & Geometric Sans
  {
    id: 'manrope',
    name: 'Manrope',
    family: 'Manrope',
    cssFamily: "'Manrope', sans-serif",
    category: 'sans',
    weights: [400, 500, 600, 700, 800],
    moodTags: ['정돈', '현대적', '미니멀', '에이전시', '절제'],
    styleTags: ['지오메트릭', '산세리프', '모던', '가독성'],
    topics: ['casting', 'daily', 'filming', 'behind', 'first-pitch', 'awards'],
    roles: ['main-title', 'actor-name', 'subtitle', 'date-credits'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 88, modern: 98, dramatic: 70, sporty: 75, koreanHarmony: 96 },
    recommendedPairings: ['bodoni-moda', 'dm-serif-display', 'noto-sans-kr']
  },
  {
    id: 'archivo-black',
    name: 'Archivo Black',
    family: 'Archivo Black',
    cssFamily: "'Archivo Black', sans-serif",
    category: 'display',
    weights: [900],
    moodTags: ['강렬함', '스포츠', '볼드', '역동적', '시구'],
    styleTags: ['헤비', '임팩트', '산세리프', '포스터'],
    topics: ['first-pitch', 'poster', 'casting'],
    roles: ['main-title'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 50, modern: 90, dramatic: 98, sporty: 99, koreanHarmony: 80 },
    recommendedPairings: ['manrope', 'inter', 'noto-sans-kr']
  },
  {
    id: 'archivo',
    name: 'Archivo',
    family: 'Archivo',
    cssFamily: "'Archivo', sans-serif",
    category: 'sans',
    weights: [400, 600, 800],
    moodTags: ['현대적', '에디토리얼', '스포티', '도시적'],
    styleTags: ['그로테스크', '산세리프', '볼드'],
    topics: ['first-pitch', 'casting', 'behind'],
    roles: ['main-title', 'actor-name', 'subtitle'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 75, modern: 95, dramatic: 85, sporty: 92, koreanHarmony: 88 },
    recommendedPairings: ['noto-sans-kr', 'manrope']
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    family: 'Space Grotesk',
    cssFamily: "'Space Grotesk', sans-serif",
    category: 'sans',
    weights: [500, 700],
    moodTags: ['실험적', '스위스', '트렌디', '아방가르드'],
    styleTags: ['테크', '현대적', '모노감성'],
    topics: ['behind', 'filming', 'casting'],
    roles: ['main-title', 'subtitle', 'date-credits'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 78, modern: 96, dramatic: 82, sporty: 60, koreanHarmony: 85 },
    recommendedPairings: ['manrope', 'noto-sans-kr']
  },
  {
    id: 'syne',
    name: 'Syne',
    family: 'Syne',
    cssFamily: "'Syne', sans-serif",
    category: 'display',
    weights: [600, 700, 800],
    moodTags: ['예술적', '감각적', '모던럭셔리', '유니크'],
    styleTags: ['와이드', '디스플레이', '아트'],
    topics: ['poster', 'daily', 'gv'],
    roles: ['main-title', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 91, modern: 95, dramatic: 89, sporty: 45, koreanHarmony: 84 },
    recommendedPairings: ['manrope', 'noto-sans-kr']
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    family: 'Plus Jakarta Sans',
    cssFamily: "'Plus Jakarta Sans', sans-serif",
    category: 'sans',
    weights: [400, 600, 700, 800],
    moodTags: ['세련됨', '도시적', '단정한', '글로벌'],
    styleTags: ['지오메트릭', '산세리프', '글로벌'],
    topics: ['casting', 'fanmeeting', 'daily', 'awards'],
    roles: ['main-title', 'actor-name', 'subtitle', 'date-credits'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 86, modern: 94, dramatic: 75, sporty: 70, koreanHarmony: 94 },
    recommendedPairings: ['bodoni-moda', 'noto-serif-kr', 'noto-sans-kr']
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    family: 'DM Sans',
    cssFamily: "'DM Sans', sans-serif",
    category: 'sans',
    weights: [400, 500, 700],
    moodTags: ['부드러움', '자연스러움', '중립', '신뢰'],
    styleTags: ['휴머니스트', '산세리프', '편안함'],
    topics: ['daily', 'fanmeeting', 'behind'],
    roles: ['subtitle', 'actor-name', 'date-credits'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License (상업용 무료)',
    scores: { luxury: 80, modern: 88, dramatic: 65, sporty: 65, koreanHarmony: 92 },
    recommendedPairings: ['dm-serif-display', 'bodoni-moda', 'noto-sans-kr']
  },

  // 3. Korean Essential & Luxury Fonts
  {
    id: 'noto-serif-kr',
    name: 'Noto Serif KR',
    family: 'Noto Serif KR',
    cssFamily: "'Noto Serif KR', serif",
    category: 'serif',
    weights: [300, 400, 600, 700, 900],
    moodTags: ['한국적', '문학적', '우아함', '정통', '클래식'],
    styleTags: ['명조', '한글세리프', '품격'],
    topics: ['awards', 'fanmeeting', 'gv', 'poster'],
    roles: ['main-title', 'actor-name', 'subtitle'],
    languages: ['ko', 'en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License (한글/영문 상업용 완전 무료)',
    scores: { luxury: 96, modern: 70, dramatic: 90, sporty: 20, koreanHarmony: 100 },
    recommendedPairings: ['bodoni-moda', 'cormorant-garamond', 'manrope']
  },
  {
    id: 'noto-sans-kr',
    name: 'Noto Sans KR',
    family: 'Noto Sans KR',
    cssFamily: "'Noto Sans KR', sans-serif",
    category: 'sans',
    weights: [300, 400, 500, 700, 900],
    moodTags: ['공식적', '가독성', '단정함', '중립적', '에이전시'],
    styleTags: ['고딕', '한글산세리프', '표준'],
    topics: ['casting', 'first-pitch', 'daily', 'filming', 'behind'],
    roles: ['main-title', 'actor-name', 'subtitle', 'date-credits'],
    languages: ['ko', 'en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License (한글/영문 상업용 완전 무료)',
    scores: { luxury: 82, modern: 92, dramatic: 78, sporty: 85, koreanHarmony: 100 },
    recommendedPairings: ['manrope', 'archivo-black', 'space-grotesk', 'bodoni-moda']
  },
  {
    id: 'pretendard',
    name: 'Pretendard',
    family: 'Pretendard',
    cssFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    category: 'sans',
    weights: [300, 400, 500, 600, 700],
    moodTags: ['모던', '에이전시', '최고가독성', '정밀함', '현대적'],
    styleTags: ['산세리프', '네오그로테스크', '표준'],
    topics: ['casting', 'daily', 'filming', 'behind', 'awards'],
    roles: ['main-title', 'actor-name', 'subtitle', 'date-credits'],
    languages: ['ko', 'en'],
    licenseStatus: 'verified-free',
    licenseNote: 'SIL Open Font License 1.1 (공식 GitHub, 상업용/서버/배포 전면 허용)',
    scores: { luxury: 90, modern: 99, dramatic: 80, sporty: 82, koreanHarmony: 100 },
    recommendedPairings: ['cormorant-garamond', 'cinzel', 'allura', 'bodoni-moda']
  },
  {
    id: 'allura',
    name: 'Allura',
    family: 'Allura',
    cssFamily: "'Allura', cursive",
    category: 'display',
    weights: [400],
    moodTags: ['필기체', '감성적', '로맨틱', '우아함', '시그니처'],
    styleTags: ['스크립트', '캘리그래피', '유려함'],
    topics: ['casting', 'fanmeeting', 'daily'],
    roles: ['main-title'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License 1.1 (상업용 무료, Bickham Script Pro 오픈소스 대체)',
    scores: { luxury: 95, modern: 65, dramatic: 88, sporty: 5, koreanHarmony: 82 },
    recommendedPairings: ['montserrat', 'pretendard', 'noto-sans-kr']
  },
  {
    id: 'pinyon-script',
    name: 'Pinyon Script',
    family: 'Pinyon Script',
    cssFamily: "'Pinyon Script', cursive",
    category: 'display',
    weights: [400],
    moodTags: ['프렌치', '클래식필기체', '귀족적', '섬세함', '하이엔드'],
    styleTags: ['스크립트', '프랑스풍', '오트쿠튀르'],
    topics: ['casting', 'awards', 'fanmeeting'],
    roles: ['main-title'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License 1.1 (상업용 무료, 서명형 타이틀 최적)',
    scores: { luxury: 97, modern: 50, dramatic: 91, sporty: 5, koreanHarmony: 80 },
    recommendedPairings: ['noto-serif-kr', 'montserrat', 'pretendard']
  },
  {
    id: 'libre-baskerville',
    name: 'Libre Baskerville',
    family: 'Libre Baskerville',
    cssFamily: "'Libre Baskerville', serif",
    category: 'serif',
    weights: [400, 700],
    moodTags: ['지적임', '신문', '전통', '매거진', '신뢰감'],
    styleTags: ['트랜지셔널', '세리프', '프레스'],
    topics: ['casting', 'gv', 'filming'],
    roles: ['main-title', 'subtitle'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License 1.1 (상업용 무료)',
    scores: { luxury: 91, modern: 72, dramatic: 84, sporty: 10, koreanHarmony: 86 },
    recommendedPairings: ['noto-serif-kr', 'montserrat', 'manrope']
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat',
    cssFamily: "'Montserrat', sans-serif",
    category: 'sans',
    weights: [300, 400, 500, 600, 700],
    moodTags: ['도시적', '단단함', '기하학적', '모던에디토리얼'],
    styleTags: ['지오메트릭', '산세리프', '현대적'],
    topics: ['casting', 'first-pitch', 'behind', 'awards'],
    roles: ['subtitle', 'date-credits', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'verified-free',
    licenseNote: 'Google Fonts SIL Open Font License 1.1 (상업용 무료, Neue Haas Grotesk 오픈소스 대체)',
    scores: { luxury: 87, modern: 96, dramatic: 78, sporty: 80, koreanHarmony: 93 },
    recommendedPairings: ['allura', 'cormorant-garamond', 'playfair-display']
  },

  // 4. Commercial Paid Fonts (Excluded from Default Engine / License Verification Required)
  {
    id: 'bickham-script-pro',
    name: 'Bickham Script Pro (유료 상용 — 기본 제외)',
    family: 'Bickham Script Pro',
    cssFamily: "'Bickham Script Pro', cursive",
    category: 'display',
    weights: [400, 700],
    moodTags: ['유료서체', '어도비', '하이엔드'],
    styleTags: ['스크립트', '상용라이선스'],
    topics: ['casting', 'awards'],
    roles: ['main-title'],
    languages: ['en'],
    licenseStatus: 'review-required',
    licenseNote: 'Adobe Fonts 유료 라이선스 — Mac Studio 자동생성 서버 설치 및 프로그램 내장 불가 (대체: Allura 또는 Pinyon Script 추천)',
    scores: { luxury: 98, modern: 45, dramatic: 95, sporty: 0, koreanHarmony: 70 },
    recommendedPairings: ['montserrat']
  },
  {
    id: 'neue-haas-grotesk',
    name: 'Neue Haas Grotesk (유료 상용 — 기본 제외)',
    family: 'Neue Haas Grotesk',
    cssFamily: "'Neue Haas Grotesk', sans-serif",
    category: 'sans',
    weights: [400, 500, 700],
    moodTags: ['유료서체', '스위스', '오리지널헬베티카'],
    styleTags: ['네오그로테스크', '상용라이선스'],
    topics: ['casting', 'behind'],
    roles: ['subtitle', 'actor-name'],
    languages: ['en'],
    licenseStatus: 'review-required',
    licenseNote: 'Linotype/Monotype 유료 라이선스 — Server & App 별도 라이선스 확인 필요 (대체: Montserrat 또는 Pretendard 추천)',
    scores: { luxury: 92, modern: 98, dramatic: 75, sporty: 70, koreanHarmony: 85 },
    recommendedPairings: ['cormorant-garamond']
  }
];

export const ACTOR_PROFILES: ActorProfile[] = [
  {
    id: 'actor-seo-yujin',
    nameKo: '서유진',
    nameEn: 'YUJIN SEO',
    agency: 'CREATIVE ARTISTS GROUP',
    defaultTopic: 'casting',
    signatureTitleFont: 'Bodoni Moda',
    signatureActorFont: 'Noto Serif KR',
    preferredLogoId: 'logo-caa-style',
    tags: ['공식 캐스팅', '글로벌 프로필', '시네마', '화보'],
    notes: '블랙 테일러드 재킷과 절제된 시선 — 보그 매거진 커버 및 CAA 공식 캐스팅 룩북 전담',
    avatarUrl: '/assets/aistudio/________________________________1__c5b8ff26.png'
  },
  {
    id: 'actor-ryu',
    nameKo: '류경수',
    nameEn: 'RYU KYUNG SOO',
    agency: 'CREATIVE ARTISTS GROUP',
    defaultTopic: 'casting',
    signatureTitleFont: 'Bodoni Moda',
    signatureActorFont: 'Noto Serif KR',
    preferredLogoId: 'logo-caa-style',
    tags: ['시네마', '배우', '주연', '캐스팅', 'GV'],
    notes: '영화 《야당》, 드라마 《미지의 서울》 — 강렬한 눈빛과 절제된 흑백 에디토리얼 스타일 권장'
  },
  {
    id: 'actor-kim',
    nameKo: '김서현',
    nameEn: 'SEO HYUN KIM',
    agency: 'MMA MANAGEMENT ARTISTS',
    defaultTopic: 'awards',
    signatureTitleFont: 'Italiana',
    signatureActorFont: 'Noto Serif KR',
    preferredLogoId: 'logo-mma-style',
    tags: ['시상식', '레드카펫', '하이패션', '화보'],
    notes: '우아한 세리프와 미니멀 앰비언트 라이팅 중심의 해외 매거진 표지풍 템플릿 선호'
  },
  {
    id: 'actor-park',
    nameKo: '박도윤',
    nameEn: 'DO YOUN PARK',
    agency: 'CINÉTIQUE ENTERTAINMENT',
    defaultTopic: 'first-pitch',
    signatureTitleFont: 'Archivo Black',
    signatureActorFont: 'Noto Sans KR',
    preferredLogoId: 'logo-caa-style',
    tags: ['시구', '스포츠', '드라마', '일상'],
    notes: '챔피언십 시구 및 액션 시리즈 홍보 — 강렬한 타이포그래피와 다이내믹 구도 선호'
  }
];

export const INITIAL_TELEGRAM_CONFIG: TelegramConfig = {
  botToken: '',
  botUsername: '@creative_studio_bot',
  isConnected: false,
  webhookUrl: 'https://api.telegram.org/bot<TOKEN>/setWebhook',
  allowedUsers: [
    { id: '184920412', name: '이수연 실장 (Chief Creative)', role: 'admin' },
    { id: '294109841', name: '홍보마케팅 1팀 (PR Team)', role: 'creator' },
    { id: '349102834', name: '매니지먼트 본부 (Management)', role: 'creator' }
  ],
  autoRecommendVariants: 3,
  defaultRatio: '4:5',
  exportFormat: 'png',
  compressionQuality: 95
};

// Generates 54 base presets (6 distinct styles x 9 topics)
export function generateCuratedPresets(): DesignPreset[] {
  const styles: {
    style: DesignPreset['style'];
    nameKo: string;
    nameEn: string;
    desc: string;
    defaultArchetype: DesignPreset['layoutArchetype'];
  }[] = [
    {
      style: 'minimal',
      nameKo: 'CAA 공식 디스패치',
      nameEn: 'Agency Minimal (CAA Dispatch)',
      desc: '헐리우드 CAA 공식 보도자료 룩 — 상단 컨피덴셜 와이어, 중앙 가로 헤어라인, 절제된 하단 서체',
      defaultArchetype: 'agency-minimal-caa'
    },
    {
      style: 'editorial',
      nameKo: '보그 매거진 커버',
      nameEn: 'Vogue Editorial Masthead',
      desc: '상단 15%를 가로지르는 대형 마스트헤드 타이틀, 바코드, 이슈 번호, 중앙 플로팅 배우명',
      defaultArchetype: 'magazine-cover'
    },
    {
      style: 'dark-luxury',
      nameKo: '미술관 파스파르투 액자',
      nameEn: 'Museum Passe-Partout',
      desc: '사진을 액자 매트 안에 띄우고 하단 여백에 얇은 골드 라인과 정통 세리프로 배치하는 전시형 룩',
      defaultArchetype: 'frame-passepartout'
    },
    {
      style: 'swiss-modern',
      nameKo: '스위스 비대칭 그리드',
      nameEn: 'Swiss Modern Grid (Zurich)',
      desc: '비대칭 여백, 90도 회전된 세로 리본 텍스트, 01 대형 번호 스탬프, 정밀 십자선 교차점',
      defaultArchetype: 'swiss-grid'
    },
    {
      style: 'cinema',
      nameKo: '영화제 시네마 레터박스',
      nameEn: 'Festival Cinema Letterbox',
      desc: '2.39:1 와이드스크린 블랙 레터박스, 상단 칸/베니스 영화제 월계관 심볼, 하단 빌링 블록',
      defaultArchetype: 'cinematic-letterbox'
    },
    {
      style: 'bold',
      nameKo: '볼드 2단 스택 임팩트',
      nameEn: 'Bold Stacked Monumental',
      desc: '화면을 가득 채우는 2단 누적 초대형 타이포그래피와 다이내믹 사선 스포츠/공식 스탬프 배지',
      defaultArchetype: 'stacked-monumental'
    }
  ];

  const presets: DesignPreset[] = [];

  for (const topic of TOPICS) {
    for (const s of styles) {
      // Determine distinct archetype per topic/style combination
      let archetype = s.defaultArchetype;
      if (topic.id === 'behind' && (s.style === 'cinema' || s.style === 'minimal')) {
        archetype = 'analog-contact-sheet';
      } else if (topic.id === 'fanmeeting' && s.style === 'minimal') {
        archetype = 'zen-vertical';
      } else if (topic.id === 'gv' && s.style === 'minimal') {
        archetype = 'cinematic-letterbox';
      } else if (topic.id === 'first-pitch' && s.style === 'editorial') {
        archetype = 'stacked-monumental';
      }

      const isSerif = s.style === 'editorial' || s.style === 'dark-luxury' || archetype === 'frame-passepartout';
      const isBold = s.style === 'bold' || archetype === 'stacked-monumental';

      const titleFont = isBold
        ? 'Archivo Black'
        : s.style === 'editorial' || archetype === 'magazine-cover'
        ? 'Bodoni Moda'
        : s.style === 'dark-luxury' || archetype === 'frame-passepartout'
        ? 'Playfair Display'
        : s.style === 'cinema' || archetype === 'cinematic-letterbox'
        ? 'DM Serif Display'
        : s.style === 'swiss-modern' || archetype === 'swiss-grid'
        ? 'Space Grotesk'
        : 'Manrope';

      const actorFont = isSerif ? 'Noto Serif KR' : 'Noto Sans KR';

      const titleSize = archetype === 'magazine-cover'
        ? 96
        : archetype === 'stacked-monumental'
        ? 82
        : archetype === 'frame-passepartout'
        ? 34
        : archetype === 'cinematic-letterbox'
        ? 36
        : 60;

      const titleTracking = archetype === 'magazine-cover'
        ? 8
        : archetype === 'stacked-monumental'
        ? 2
        : 5;

      const titleY = archetype === 'magazine-cover'
        ? 14
        : archetype === 'swiss-grid'
        ? 18
        : archetype === 'frame-passepartout'
        ? 86
        : 80;

      presets.push({
        id: `${topic.id}-${s.style}`,
        topic: topic.id,
        style: s.style,
        layoutArchetype: archetype,
        layoutDetails: {
          passepartoutWidth: 54,
          passepartoutColor: '#0a0a0d',
          letterboxHeight: 125,
          showFestivalLaurel: archetype === 'cinematic-letterbox',
          festivalText: `${topic.nameEn} · OFFICIAL SELECTION`,
          showSprocketHoles: archetype === 'analog-contact-sheet',
          filmRollCode: 'KODAK PORTRA 400 · 35mm SAFETY FILM',
          showVerticalRibbon: archetype === 'swiss-grid',
          verticalRibbonText: 'CAA TALENT ROSTER · ZURICH GRID',
          showBarcode: archetype === 'magazine-cover',
          indexNumber: '01 / ARCHIVE',
          hairlineGrid: archetype === 'swiss-grid',
          stackedTitle: archetype === 'stacked-monumental',
          agencyStamp: {
            show: archetype === 'zen-vertical',
            text: 'CAA認證',
            style: 'seal'
          }
        },
        nameKo: `${topic.nameKo} — ${s.nameKo}`,
        nameEn: `${topic.nameEn} · ${s.nameEn}`,
        description: s.desc,
        logo: {
          assetId: 'logo-caa-style',
          anchor: archetype === 'magazine-cover'
            ? 'top-left'
            : archetype === 'cinematic-letterbox'
            ? 'bottom-right'
            : archetype === 'frame-passepartout'
            ? 'bottom-right'
            : 'bottom-right',
          xPercent: archetype === 'magazine-cover' ? 8 : 91,
          yPercent: archetype === 'magazine-cover' ? 8 : 92,
          widthPercent: archetype === 'magazine-cover' ? 12 : 15,
          opacity: 0.95,
          autoInvertContrast: true,
          showBackdrop: false
        },
        title: {
          text: topic.defaultTitle,
          font: titleFont,
          weight: isBold ? 900 : s.style === 'dark-luxury' ? 700 : 600,
          size: titleSize,
          letterSpacing: titleTracking,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          align: archetype === 'magazine-cover' || archetype === 'frame-passepartout' || archetype === 'cinematic-letterbox'
            ? 'center'
            : 'left',
          xPercent: archetype === 'magazine-cover' || archetype === 'frame-passepartout' || archetype === 'cinematic-letterbox'
            ? 50
            : 8,
          yPercent: titleY
        },
        subtitle: {
          text: topic.defaultSubtitle,
          font: 'Manrope',
          weight: 600,
          size: 13,
          letterSpacing: 4,
          color: '#A1A1AA',
          textTransform: 'uppercase',
          align: 'left',
          xPercent: 8,
          yPercent: 74
        },
        actorName: {
          text: '배우 류경수',
          font: actorFont,
          weight: 700,
          size: 28,
          letterSpacing: 3,
          color: archetype === 'frame-passepartout' ? '#E4D5B7' : '#FFFFFF',
          align: 'left',
          xPercent: 8,
          yPercent: 87
        },
        kicker: {
          show: true,
          text: topic.badgeText,
          style: archetype === 'swiss-grid' ? 'frame-tag' : 'clean-text',
          color: '#D4AF37'
        },
        dateCredits: {
          text: 'SEOUL · 2026 OFFICIAL ARCHIVE',
          font: 'Manrope',
          weight: 500,
          size: 11,
          letterSpacing: 3,
          color: 'rgba(255, 255, 255, 0.65)',
          align: 'left',
          xPercent: 8,
          yPercent: 94
        },
        overlay: {
          gradient: 'bottom-scrim',
          gradientOpacity: 0.65,
          tintColor: undefined,
          tintOpacity: 0,
          filmGrain: archetype === 'analog-contact-sheet' || archetype === 'cinematic-letterbox',
          frameBorder: undefined
        },
        safeArea: {
          faceProtection: true,
          topSafePercent: 20,
          bottomSafePercent: 65
        }
      });
    }
  }

  // Prepend the curated casting, birthday, daily, and behind presets at the top
  return [
    ...CASTING_8_PRESETS,
    ...BIRTHDAY_8_PRESETS,
    ...DAILY_6_PRESETS,
    ...BEHIND_6_PRESETS,
    ...presets
  ];
}

export const CASTING_8_PRESETS: DesignPreset[] = [
  // 01. Classic Editorial
  {
    id: 'casting-01-classic-editorial',
    topic: 'casting',
    style: 'editorial',
    layoutArchetype: 'classic-editorial',
    nameKo: '01. 클래식 에디토리얼',
    nameEn: '01. Classic Editorial',
    description: 'Cormorant Garamond 세리프, 좌측 상단 blanc 로고(X:6%, Y:5%), 좌측 하단 2줄 CASTING NEWS 및 블랙 그라데이션',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5,
      widthPercent: 18,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'CASTING\nNEWS',
      font: 'Cormorant Garamond',
      weight: 600,
      size: 58,
      letterSpacing: 4,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      align: 'left',
      xPercent: 6,
      yPercent: 74
    },
    subtitle: {
      text: '새로운 이야기가 시작됩니다.',
      font: 'Pretendard',
      weight: 400,
      size: 14,
      letterSpacing: 1.5,
      color: 'rgba(255, 255, 255, 0.85)',
      align: 'left',
      xPercent: 6,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 24,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 68
    },
    kicker: {
      show: true,
      text: 'BLANC ENTERTAINMENT · OFFICIAL',
      style: 'clean-text',
      color: '#D4AF37'
    },
    dateCredits: {
      text: '2026 OFFICIAL CASTING ANNOUNCEMENT',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'left',
      xPercent: 6,
      yPercent: 92
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.75,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 60
    }
  },

  // 02. Signature Script
  {
    id: 'casting-02-signature-script',
    topic: 'casting',
    style: 'editorial',
    layoutArchetype: 'signature-script',
    nameKo: '02. 시그니처 필기체',
    nameEn: '02. Signature Script',
    description: 'Allura 유려한 필기체가 허리선 위를 -8° 대각선으로 가로지르는 감성적 드라마 캐스팅 룩',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 5,
      yPercent: 5,
      widthPercent: 17,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'Casting News',
      font: 'Allura',
      weight: 400,
      size: 96,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 64
    },
    subtitle: {
      text: '새로운 만남, 더 큰 기대.',
      font: 'Pretendard',
      weight: 400,
      size: 14,
      letterSpacing: 2,
      color: '#F5F2EC',
      align: 'center',
      xPercent: 50,
      yPercent: 88
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 26,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 83
    },
    kicker: {
      show: true,
      text: 'NEW\nCASTING\nNEWS',
      style: 'clean-text',
      color: 'rgba(255, 255, 255, 0.85)'
    },
    dateCredits: {
      text: 'BLANC ENTERTAINMENT · SIGNATURE SERIES',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 4,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'center',
      xPercent: 50,
      yPercent: 93
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.6,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 65
    }
  },

  // 03. Warm Minimal
  {
    id: 'casting-03-warm-minimal',
    topic: 'casting',
    style: 'minimal',
    layoutArchetype: 'warm-minimal',
    nameKo: '03. 웜 미니멀',
    nameEn: '03. Warm Minimal',
    description: '아이보리/크림(#F2EDE5) 배경에 인물을 우측으로 배치하고, 좌상단 3줄 감성 문구와 좌하단 Bodoni Moda 타이포',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-right',
      xPercent: 92,
      yPercent: 5,
      widthPercent: 16,
      opacity: 0.9,
      autoInvertContrast: false,
      showBackdrop: false
    },
    title: {
      text: 'CASTING\nNEWS',
      font: 'Bodoni Moda',
      weight: 600,
      size: 54,
      letterSpacing: 3,
      color: '#1A1A1A',
      textTransform: 'uppercase',
      align: 'left',
      xPercent: 8,
      yPercent: 82
    },
    subtitle: {
      text: '좋은 이야기와\n좋은 배우가\n만났습니다.',
      font: 'Noto Serif KR',
      weight: 500,
      size: 20,
      letterSpacing: 1,
      color: '#2A2A2A',
      align: 'left',
      xPercent: 8,
      yPercent: 18
    },
    actorName: {
      text: '서유진',
      font: 'Noto Serif KR',
      weight: 700,
      size: 26,
      letterSpacing: 3,
      color: '#1A1A1A',
      align: 'left',
      xPercent: 8,
      yPercent: 74
    },
    kicker: {
      show: true,
      text: 'BLANC ARTIST EDITORIAL',
      style: 'clean-text',
      color: '#71717A'
    },
    dateCredits: {
      text: 'SERIES & FEATURE DISPATCH · 2026',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: '#71717A',
      align: 'left',
      xPercent: 8,
      yPercent: 94
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      tintColor: '#F2EDE5',
      tintOpacity: 0.15,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 60
    }
  },

  // 04. Cinematic Filmstrip
  {
    id: 'casting-04-cinematic-filmstrip',
    topic: 'casting',
    style: 'cinema',
    layoutArchetype: 'cinematic-filmstrip',
    nameKo: '04. 시네마틱 필름스트립',
    nameEn: '04. Cinematic Filmstrip',
    description: '좌측 세로 3단 필름 프레임(클로즈업·상반신·표정 컷) + 우측 솔리드 블랙 카드에 Playfair Display 헤드라인',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 52,
      yPercent: 6,
      widthPercent: 20,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'CASTING\nNEWS',
      font: 'Playfair Display',
      weight: 700,
      size: 52,
      letterSpacing: 4,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      align: 'left',
      xPercent: 52,
      yPercent: 38
    },
    subtitle: {
      text: '새로운 작품,\n새로운 얼굴,\n더 좋은 이야기.',
      font: 'Pretendard',
      weight: 400,
      size: 15,
      letterSpacing: 1.5,
      color: '#E4E4E7',
      align: 'left',
      xPercent: 52,
      yPercent: 54
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 14,
      letterSpacing: 2,
      color: '#A1A1AA',
      align: 'left',
      xPercent: 52,
      yPercent: 28
    },
    kicker: {
      show: true,
      text: 'CINEMATIC STILLS',
      style: 'clean-text',
      color: '#D4AF37'
    },
    dateCredits: {
      text: 'GOOD PEOPLE · GOOD STORIES · BLANC ENTERTAINMENT',
      font: 'Montserrat',
      weight: 600,
      size: 9,
      letterSpacing: 4,
      color: 'rgba(255, 255, 255, 0.45)',
      align: 'left',
      xPercent: 56,
      yPercent: 90
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 60
    }
  },

  // 05. Monochrome Archive
  {
    id: 'casting-05-monochrome-archive',
    topic: 'casting',
    style: 'minimal',
    layoutArchetype: 'monochrome-archive',
    nameKo: '05. 모노크롬 아카이브',
    nameEn: '05. Monochrome Archive',
    description: 'Cormorant Garamond Light 초고밀도 자간(Tracking 12px) 타이틀, 흑백 모노톤 필름 텍스처',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5,
      widthPercent: 17,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'C A S T I N G  N E W S',
      font: 'Cormorant Garamond',
      weight: 300,
      size: 40,
      letterSpacing: 10,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      align: 'center',
      xPercent: 50,
      yPercent: 78
    },
    subtitle: {
      text: 'BLANC ARTIST ARCHIVE — MONO EDITION',
      font: 'Pretendard',
      weight: 400,
      size: 11,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.7)',
      align: 'center',
      xPercent: 50,
      yPercent: 88
    },
    actorName: {
      text: '배우 서유진',
      font: 'Pretendard',
      weight: 500,
      size: 22,
      letterSpacing: 4,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 70
    },
    kicker: {
      show: true,
      text: 'CONFIDENTIAL ARCHIVE // 05',
      style: 'clean-text',
      color: '#A1A1AA'
    },
    dateCredits: {
      text: 'SEOUL · 2026 ARCHIVAL RECORD',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 4,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'center',
      xPercent: 50,
      yPercent: 93
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.75,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 65
    }
  },

  // 06. Blue Editorial
  {
    id: 'casting-06-blue-editorial',
    topic: 'casting',
    style: 'editorial',
    layoutArchetype: 'blue-editorial',
    nameKo: '06. 블루 에디토리얼',
    nameEn: '06. Blue Editorial',
    description: '상단 78% 사진 + 하단 22% 솔리드 화이트 패널, 큰 스틸 네이비(#526B95) Libre Baskerville 제목',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5,
      widthPercent: 18,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'CASTING NEWS',
      font: 'Libre Baskerville',
      weight: 700,
      size: 56,
      letterSpacing: 4,
      color: '#526B95',
      textTransform: 'uppercase',
      align: 'center',
      xPercent: 50,
      yPercent: 88
    },
    subtitle: {
      text: '새로운 세계에서, 새로운 얼굴로.',
      font: 'Noto Serif KR',
      weight: 500,
      size: 18,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 54
    },
    actorName: {
      text: '서유진',
      font: 'Noto Serif KR',
      weight: 700,
      size: 24,
      letterSpacing: 3,
      color: '#2A3B52',
      align: 'center',
      xPercent: 50,
      yPercent: 94
    },
    kicker: {
      show: true,
      text: 'BLANC EDITORIAL SELECTION',
      style: 'clean-text',
      color: '#526B95'
    },
    dateCredits: {
      text: 'SPECIAL PRESS RELEASE // 2026',
      font: 'Montserrat',
      weight: 600,
      size: 10,
      letterSpacing: 3,
      color: '#718096',
      align: 'center',
      xPercent: 50,
      yPercent: 97
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 55
    }
  },

  // 07. Midnight Cinema
  {
    id: 'casting-07-midnight-cinema',
    topic: 'casting',
    style: 'cinema',
    layoutArchetype: 'midnight-cinema',
    nameKo: '07. 미드나잇 시네마',
    nameEn: '07. Midnight Cinema',
    description: '딥 미드나잇 네이비(#142337)의 깊은 암부와 비네팅, 중앙 인물 구도, Cinzel 골드/화이트 올캡스 타이틀',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'center',
      xPercent: 50,
      yPercent: 6,
      widthPercent: 19,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'CASTING NEWS',
      font: 'Cinzel',
      weight: 700,
      size: 52,
      letterSpacing: 8,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      align: 'center',
      xPercent: 50,
      yPercent: 78
    },
    subtitle: {
      text: '새로운 도약, 새로운 시작.',
      font: 'Pretendard',
      weight: 400,
      size: 14,
      letterSpacing: 2,
      color: '#D4AF37',
      align: 'center',
      xPercent: 50,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 26,
      letterSpacing: 4,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 71
    },
    kicker: {
      show: true,
      text: 'EXCLUSIVE FEATURE PRESENTATION',
      style: 'clean-text',
      color: '#D4AF37'
    },
    dateCredits: {
      text: 'BLANC CINEMA ALLIANCE · SEOUL · 2026',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 4,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'center',
      xPercent: 50,
      yPercent: 93
    },
    overlay: {
      gradient: 'vignette',
      gradientOpacity: 0.8,
      tintColor: '#142337',
      tintOpacity: 0.25,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 65
    }
  },

  // 08. Blue Signature
  {
    id: 'casting-08-blue-signature',
    topic: 'casting',
    style: 'dark-luxury',
    layoutArchetype: 'blue-signature',
    nameKo: '08. 블루 시그니처',
    nameEn: '08. Blue Signature',
    description: '스틸 블루(#45658F) Pinyon Script 대형 필기체가 하단을 가로지르고, 우하단 2줄 감성 카피가 자리잡은 프리셋',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5,
      widthPercent: 18,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'Casting News',
      font: 'Pinyon Script',
      weight: 400,
      size: 104,
      letterSpacing: 2,
      color: '#45658F',
      align: 'left',
      xPercent: 6,
      yPercent: 78
    },
    subtitle: {
      text: '함께 써 내려갈,\n새로운 이야기.',
      font: 'Noto Serif KR',
      weight: 500,
      size: 17,
      letterSpacing: 2,
      color: '#F4F4F5',
      align: 'right',
      xPercent: 94,
      yPercent: 88
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 24,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 68
    },
    kicker: {
      show: true,
      text: 'BLANC ARTIST ROSTER',
      style: 'clean-text',
      color: '#45658F'
    },
    dateCredits: {
      text: '2026 OFFICIAL ANNOUNCEMENT',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'right',
      xPercent: 94,
      yPercent: 95
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.7,
      tintColor: '#1A293D',
      tintOpacity: 0.2,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 65
    }
  }
];

export const BIRTHDAY_8_PRESETS: DesignPreset[] = [
  // 01. Romantic Signature — 로맨틱 필기체
  {
    id: 'birthday-01-romantic-signature',
    topic: 'birthday',
    style: 'editorial',
    layoutArchetype: 'birthday-romantic-signature',
    nameKo: '01. 로맨틱 필기체',
    nameEn: '01. Romantic Signature',
    description: 'Allura 필기체 2줄 대각선(-8° 회전), 따뜻하고 감성적인 로맨틱 핑크(#E9A7B4) 타이포그래피',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 83,
      yPercent: 92.5,
      widthPercent: 14,
      opacity: 0.85,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'Happy Birthday',
      font: 'Allura',
      weight: 400,
      size: 130,
      letterSpacing: 2,
      color: '#E9A7B4',
      align: 'left',
      xPercent: 6,
      yPercent: 14
    },
    subtitle: {
      text: 'Wishing you a day as special as you are.',
      font: 'Cormorant Garamond',
      weight: 500,
      size: 20,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.9)',
      align: 'left',
      xPercent: 6,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 22,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 80
    },
    kicker: {
      show: true,
      text: 'OCT 23',
      style: 'clean-text',
      color: 'rgba(255, 255, 255, 0.85)'
    },
    dateCredits: {
      text: '2026. 10. 23 // CELEBRATION',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'left',
      xPercent: 6,
      yPercent: 95
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.45,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 25,
      bottomSafePercent: 60
    }
  },

  // 02. Classic Editorial — 클래식 매거진
  {
    id: 'birthday-02-classic-editorial',
    topic: 'birthday',
    style: 'editorial',
    layoutArchetype: 'birthday-classic-editorial',
    nameKo: '02. 클래식 매거진',
    nameEn: '02. Classic Editorial',
    description: 'Cormorant Garamond 상단 중앙 2줄 압축 타이틀, 우측 중단 감성 카피, 하단 1px 구분선 매거진 공식형',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-left',
      xPercent: 5.5,
      yPercent: 92.5,
      widthPercent: 15,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'HAPPY\nBIRTHDAY',
      font: 'Cormorant Garamond',
      weight: 600,
      size: 88,
      letterSpacing: 2,
      color: '#433A37',
      align: 'center',
      xPercent: 50,
      yPercent: 10
    },
    subtitle: {
      text: 'May your every day\nbe filled with happiness.',
      font: 'Cormorant Garamond',
      weight: 500,
      size: 16,
      letterSpacing: 1.5,
      color: '#433A37',
      align: 'right',
      xPercent: 93,
      yPercent: 36
    },
    actorName: {
      text: 'NEW DAY / BRIGHTER YOU',
      font: 'Montserrat',
      weight: 600,
      size: 14,
      letterSpacing: 4,
      color: '#433A37',
      align: 'center',
      xPercent: 50,
      yPercent: 88
    },
    kicker: {
      show: true,
      text: 'OCT 23',
      style: 'clean-text',
      color: '#433A37'
    },
    dateCredits: {
      text: 'BLANC ARTIST ARCHIVE · 2026',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: 'rgba(67, 58, 55, 0.7)',
      align: 'center',
      xPercent: 50,
      yPercent: 94
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 65
    }
  },

  // 03. Soft Blush — 감성적인 핑크 화보
  {
    id: 'birthday-03-soft-blush',
    topic: 'birthday',
    style: 'editorial',
    layoutArchetype: 'birthday-soft-blush',
    nameKo: '03. 소프트 핑크 화보',
    nameEn: '03. Soft Blush',
    description: 'Libre Baskerville 좌측 상단 3줄 세로 구성, 우측 10/23 수직선 인덱스, 인물 중심의 절제된 타이포',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92.5,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'HAPPY\nBIRTHDAY\nTO YOU',
      font: 'Libre Baskerville',
      weight: 500,
      size: 34,
      letterSpacing: 6,
      color: '#FFF3EE',
      align: 'left',
      xPercent: 7,
      yPercent: 8
    },
    subtitle: {
      text: 'More love, more happiness,\nmore of the beautiful moments ahead.',
      font: 'Cormorant Garamond',
      weight: 400,
      size: 18,
      letterSpacing: 1.5,
      color: 'rgba(255, 243, 238, 0.9)',
      align: 'left',
      xPercent: 7,
      yPercent: 85
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 20,
      letterSpacing: 2,
      color: '#FFF3EE',
      align: 'left',
      xPercent: 7,
      yPercent: 79
    },
    kicker: {
      show: true,
      text: '10 / 23',
      style: 'clean-text',
      color: '#FFF3EE'
    },
    dateCredits: {
      text: 'BLANC EDITORIAL MOMENTS',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 243, 238, 0.7)',
      align: 'left',
      xPercent: 7,
      yPercent: 95
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.35,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 22,
      bottomSafePercent: 62
    }
  },

  // 04. Midnight Luxury — 블랙 럭셔리
  {
    id: 'birthday-04-midnight-luxury',
    topic: 'birthday',
    style: 'dark-luxury',
    layoutArchetype: 'birthday-midnight-luxury',
    nameKo: '04. 블랙 럭셔리',
    nameEn: '04. Midnight Luxury',
    description: 'Bodoni Moda 어깨 하단 중앙 가로형 2줄 배치, 우측 상단 별 장식, 2026.10.23 프리미엄 나이트',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-left',
      xPercent: 5.5,
      yPercent: 92.5,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'HAPPY\nBIRTHDAY',
      font: 'Bodoni Moda',
      weight: 600,
      size: 82,
      letterSpacing: 8,
      color: '#F5EFE7',
      align: 'center',
      xPercent: 50,
      yPercent: 66
    },
    subtitle: {
      text: 'TO THE\nBRIGHTEST\nYOU',
      font: 'Montserrat',
      weight: 500,
      size: 14,
      letterSpacing: 4,
      color: '#F5EFE7',
      align: 'right',
      xPercent: 93,
      yPercent: 6
    },
    actorName: {
      text: 'ALWAYS BE HAPPY',
      font: 'Montserrat',
      weight: 600,
      size: 12,
      letterSpacing: 3,
      color: 'rgba(245, 239, 231, 0.8)',
      align: 'right',
      xPercent: 93,
      yPercent: 92
    },
    kicker: {
      show: true,
      text: '2026. 10. 23',
      style: 'clean-text',
      color: '#F5EFE7'
    },
    dateCredits: {
      text: 'BLANC PRIVATE CELEBRATION',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(245, 239, 231, 0.6)',
      align: 'left',
      xPercent: 5.5,
      yPercent: 96
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.55,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 55
    }
  },

  // 05. Monochrome Statement — 흑백 타이포그래피
  {
    id: 'birthday-05-monochrome-statement',
    topic: 'birthday',
    style: 'bold',
    layoutArchetype: 'birthday-monochrome-statement',
    nameKo: '05. 흑백 타이포그래피',
    nameEn: '05. Monochrome Statement',
    description: '흑백 인물 사진 필터, 좌측 하단 거대한 핑크(#E6A2B5) 압축 세리프 HAPPY BIRTHDAY 타이포 그래픽',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-right',
      xPercent: 82,
      yPercent: 5.5,
      widthPercent: 15,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'HAPPY\nBIRTHDAY',
      font: 'Bodoni Moda',
      weight: 700,
      size: 118,
      letterSpacing: 1,
      color: '#E6A2B5',
      align: 'left',
      xPercent: 6,
      yPercent: 70
    },
    subtitle: {
      text: 'ANOTHER\nBEAUTIFUL\nCHAPTER',
      font: 'Montserrat',
      weight: 600,
      size: 14,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 5.5
    },
    actorName: {
      text: 'SAME BRIGHT HEART\nBRIGHTER DAYS',
      font: 'Montserrat',
      weight: 500,
      size: 13,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.85)',
      align: 'right',
      xPercent: 93,
      yPercent: 82
    },
    kicker: {
      show: true,
      text: 'OCT 23',
      style: 'clean-text',
      color: '#FFFFFF'
    },
    dateCredits: {
      text: 'BLANC FASHION ARCHIVE · VOL. 23',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'right',
      xPercent: 93,
      yPercent: 93
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 18,
      bottomSafePercent: 58
    }
  },

  // 06. Pink Celebration — 러블리 셀러브레이션
  {
    id: 'birthday-06-pink-celebration',
    topic: 'birthday',
    style: 'editorial',
    layoutArchetype: 'birthday-pink-celebration',
    nameKo: '06. 러블리 셀러브레이션',
    nameEn: '06. Pink Celebration',
    description: 'Playfair Display 상단 대형 2줄 타이틀 + 손그림 핑크 하트 장식, 생동감 넘치는 러블리 축하',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 86,
      yPercent: 92.5,
      widthPercent: 15,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'HAPPY\nBIRTHDAY',
      font: 'Playfair Display',
      weight: 700,
      size: 88,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 8
    },
    subtitle: {
      text: 'TO\nSOMEONE\nWHO\nMAKES\nTHE WORLD\nBRIGHTER',
      font: 'Montserrat',
      weight: 600,
      size: 13,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.9)',
      align: 'left',
      xPercent: 6,
      yPercent: 78
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 700,
      size: 24,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 70
    },
    kicker: {
      show: true,
      text: 'CELEBRATE TODAY',
      style: 'clean-text',
      color: '#D77D9B'
    },
    dateCredits: {
      text: 'BLANC CELEBRATION DISPATCH // 2026',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.65)',
      align: 'right',
      xPercent: 94,
      yPercent: 95
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.35,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 60
    }
  },

  // 07. Cinematic Night — 영화 같은 생일
  {
    id: 'birthday-07-cinematic-night',
    topic: 'birthday',
    style: 'cinema',
    layoutArchetype: 'birthday-cinematic-night',
    nameKo: '07. 영화 같은 생일',
    nameEn: '07. Cinematic Night',
    description: 'Montserrat 상단 얇은 와이드 대문자, 우측 하단 Allura 필기체 to you + 손글씨 하트, 날짜 2026.10.23',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-left',
      xPercent: 6,
      yPercent: 92.5,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'H A P P Y   B I R T H D A Y',
      font: 'Montserrat',
      weight: 400,
      size: 32,
      letterSpacing: 9,
      color: '#FFF7F1',
      align: 'center',
      xPercent: 50,
      yPercent: 6
    },
    subtitle: {
      text: 'MAY ALL YOUR WISHES COME TRUE',
      font: 'Montserrat',
      weight: 400,
      size: 15,
      letterSpacing: 4,
      color: 'rgba(255, 247, 241, 0.8)',
      align: 'center',
      xPercent: 50,
      yPercent: 9.5
    },
    actorName: {
      text: 'to you',
      font: 'Allura',
      weight: 400,
      size: 96,
      letterSpacing: 2,
      color: '#FFF7F1',
      align: 'right',
      xPercent: 90,
      yPercent: 82
    },
    kicker: {
      show: true,
      text: '2026.10.23',
      style: 'clean-text',
      color: '#FFF7F1'
    },
    dateCredits: {
      text: '2026.10.23',
      font: 'Montserrat',
      weight: 500,
      size: 15,
      letterSpacing: 3,
      color: 'rgba(255, 247, 241, 0.85)',
      align: 'right',
      xPercent: 92,
      yPercent: 92.5
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.5,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 16,
      bottomSafePercent: 60
    }
  },

  // 08. Floral Minimal — 플로럴 미니멀
  {
    id: 'birthday-08-floral-minimal',
    topic: 'birthday',
    style: 'minimal',
    layoutArchetype: 'birthday-floral-minimal',
    nameKo: '08. 플로럴 미니멀',
    nameEn: '08. Floral Minimal',
    description: 'Cormorant Garamond 27px 상단 중앙 초미니멀 자간, 10.23 날짜, 하단 45px 미세 구분선과 THANK YOU',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-center',
      xPercent: 50,
      yPercent: 94.5,
      widthPercent: 12,
      opacity: 0.85,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'H A P P Y   B I R T H D A Y',
      font: 'Cormorant Garamond',
      weight: 500,
      size: 26,
      letterSpacing: 8,
      color: '#4A4844',
      align: 'center',
      xPercent: 50,
      yPercent: 5.5
    },
    subtitle: {
      text: '10.23',
      font: 'Montserrat',
      weight: 500,
      size: 20,
      letterSpacing: 4,
      color: '#4A4844',
      align: 'center',
      xPercent: 50,
      yPercent: 9
    },
    actorName: {
      text: 'THANK YOU\nFOR BEING YOU',
      font: 'Montserrat',
      weight: 500,
      size: 16,
      letterSpacing: 4,
      color: '#4A4844',
      align: 'center',
      xPercent: 50,
      yPercent: 86
    },
    kicker: {
      show: true,
      text: 'FLORAL ARCHIVE',
      style: 'clean-text',
      color: '#4A4844'
    },
    dateCredits: {
      text: 'BLANC BOTANICAL ESSENCE',
      font: 'Montserrat',
      weight: 400,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(74, 72, 68, 0.65)',
      align: 'center',
      xPercent: 50,
      yPercent: 96.5
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 14,
      bottomSafePercent: 70
    }
  }
];

export const DAILY_6_PRESETS: DesignPreset[] = [
  // 01. Natural Diary — 내추럴 다이어리
  {
    id: 'daily-01-minimal-diary',
    topic: 'daily',
    style: 'minimal',
    layoutArchetype: 'classic-editorial',
    nameKo: '01. 내추럴 다이어리',
    nameEn: '01. Natural Diary',
    description: 'Cormorant Garamond 맑은 세리프와 자연광 라벤더 꽃밭 일상 감성 인용구',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5.5,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'MOMENTS',
      font: 'Cormorant Garamond',
      weight: 500,
      size: 58,
      letterSpacing: 8,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 78
    },
    subtitle: {
      text: 'A quiet afternoon in the lavender field.',
      font: 'Pretendard',
      weight: 400,
      size: 14,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.85)',
      align: 'left',
      xPercent: 6,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 22,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 70
    },
    kicker: {
      show: true,
      text: 'DAILY DIARY · 2026',
      style: 'clean-text',
      color: '#E2D5C3'
    },
    dateCredits: {
      text: 'BLANC ARTIST ARCHIVE // OFF THE CAMERA',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'left',
      xPercent: 6,
      yPercent: 94
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.65,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 02. Sunlight Signature — 선라이트 시그니처
  {
    id: 'daily-02-sunlight-script',
    topic: 'daily',
    style: 'editorial',
    layoutArchetype: 'signature-script',
    nameKo: '02. 선라이트 시그니처',
    nameEn: '02. Sunlight Signature',
    description: 'Allura 필기체 골드 텍스트, 따스한 햇살과 어우러지는 감성 필기체 서명',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 6,
      widthPercent: 14,
      opacity: 0.85,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'Sunny Days',
      font: 'Allura',
      weight: 400,
      size: 125,
      letterSpacing: 2,
      color: '#F4DFC8',
      align: 'left',
      xPercent: 6,
      yPercent: 52
    },
    subtitle: {
      text: 'Basking in the gentle summer breeze.',
      font: 'Cormorant Garamond',
      weight: 500,
      size: 17,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.9)',
      align: 'left',
      xPercent: 6,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 22,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 78
    },
    kicker: {
      show: true,
      text: 'MEMORIES',
      style: 'clean-text',
      color: '#F4DFC8'
    },
    dateCredits: {
      text: '2026. 10 // SUNSHINE ARCHIVE',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.6)',
      align: 'left',
      xPercent: 6,
      yPercent: 94
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.45,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 20,
      bottomSafePercent: 60
    }
  },

  // 03. Vogue Lifestyle — 보그 라이프스타일
  {
    id: 'daily-03-vogue-lifestyle',
    topic: 'daily',
    style: 'editorial',
    layoutArchetype: 'magazine-cover',
    nameKo: '03. 보그 라이프스타일',
    nameEn: '03. Vogue Lifestyle',
    description: '상단 볼드 Bodoni Moda 마스트헤드와 바코드, 패션 라이프스타일 에디토리얼',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 7,
      yPercent: 7,
      widthPercent: 13,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'LIFESTYLE',
      font: 'Bodoni Moda',
      weight: 800,
      size: 96,
      letterSpacing: 8,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 12
    },
    subtitle: {
      text: 'SEOYUJIN · NATURAL PROVENCE DIARY',
      font: 'Montserrat',
      weight: 600,
      size: 13,
      letterSpacing: 4,
      color: 'rgba(255, 255, 255, 0.9)',
      align: 'left',
      xPercent: 7,
      yPercent: 86
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 20,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 7,
      yPercent: 80
    },
    kicker: {
      show: true,
      text: 'ISSUE 10 · 2026',
      style: 'clean-text',
      color: '#E8D5B5'
    },
    dateCredits: {
      text: 'BLANC EDITORIAL COLLECTIVE',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.65)',
      align: 'left',
      xPercent: 7,
      yPercent: 94
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.55,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 22,
      bottomSafePercent: 65
    }
  },

  // 04. French Passe-Partout — 프렌치 갤러리 액자
  {
    id: 'daily-04-passepartout',
    topic: 'daily',
    style: 'dark-luxury',
    layoutArchetype: 'frame-passepartout',
    nameKo: '04. 프렌치 갤러리 액자',
    nameEn: '04. French Passe-Partout',
    description: '파스파르투 매트 보더 안에 사진을 띄운 갤러리 전시형 미술관 레이아웃',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'SERENITY',
      font: 'Playfair Display',
      weight: 700,
      size: 34,
      letterSpacing: 6,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 86
    },
    subtitle: {
      text: 'Exhibition Archive: Natural Light Series',
      font: 'Montserrat',
      weight: 400,
      size: 11,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.7)',
      align: 'center',
      xPercent: 50,
      yPercent: 91
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 16,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 82
    },
    kicker: {
      show: true,
      text: 'GALLERY ART',
      style: 'clean-text',
      color: 'rgba(212, 175, 55, 0.8)'
    },
    dateCredits: {
      text: '2026 BLANC EXHIBITION',
      font: 'Montserrat',
      weight: 400,
      size: 8,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'center',
      xPercent: 50,
      yPercent: 96
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 05. Swiss Modern Snap — 스위스 모던 스냅
  {
    id: 'daily-05-swiss-sunlight',
    topic: 'daily',
    style: 'swiss-modern',
    layoutArchetype: 'swiss-grid',
    nameKo: '05. 스위스 모던 스냅',
    nameEn: '05. Swiss Modern Snap',
    description: '좌측 세로 리본 인덱스와 십자선 그리드, 모던하고 트렌디한 일상 아카이브',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'ROUTINE',
      font: 'Space Grotesk',
      weight: 700,
      size: 46,
      letterSpacing: 4,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 15,
      yPercent: 80
    },
    subtitle: {
      text: 'FIELD NOTES & EVERYDAY REFLECTIONS',
      font: 'Montserrat',
      weight: 500,
      size: 11,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.75)',
      align: 'left',
      xPercent: 15,
      yPercent: 87
    },
    actorName: {
      text: '배우 서유진',
      font: 'Pretendard',
      weight: 600,
      size: 18,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 15,
      yPercent: 73
    },
    kicker: {
      show: true,
      text: 'ARCHIVE 05',
      style: 'clean-text',
      color: '#F59E0B'
    },
    dateCredits: {
      text: 'SWISS MODERN GRID · 2026',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'left',
      xPercent: 15,
      yPercent: 93
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.6,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 06. Warm Ambient — 웜 앰비언트
  {
    id: 'daily-06-warm-ambient',
    topic: 'daily',
    style: 'minimal',
    layoutArchetype: 'warm-minimal',
    nameKo: '06. 웜 앰비언트',
    nameEn: '06. Warm Ambient',
    description: 'Bodoni Moda & Noto Serif KR, 부드러운 여백과 따뜻한 감성 타이포',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 5,
      widthPercent: 15,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'BLOOM',
      font: 'Bodoni Moda',
      weight: 600,
      size: 52,
      letterSpacing: 6,
      color: '#433A37',
      align: 'left',
      xPercent: 6,
      yPercent: 80
    },
    subtitle: {
      text: '꽃처럼 피어나는 순간들을 기록합니다.',
      font: 'Noto Serif KR',
      weight: 400,
      size: 15,
      letterSpacing: 2,
      color: '#433A37',
      align: 'left',
      xPercent: 6,
      yPercent: 87
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 20,
      letterSpacing: 3,
      color: '#433A37',
      align: 'left',
      xPercent: 6,
      yPercent: 72
    },
    kicker: {
      show: true,
      text: 'AUTUMN NOTES',
      style: 'clean-text',
      color: '#6E5C55'
    },
    dateCredits: {
      text: 'BLANC LIFESTYLE ARCHIVE',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(67, 58, 55, 0.7)',
      align: 'left',
      xPercent: 6,
      yPercent: 94
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  }
];

export const BEHIND_6_PRESETS: DesignPreset[] = [
  // 01. 35mm Contact Sheet — 35mm 필름 콘택트 시트
  {
    id: 'behind-01-contact-sheet',
    topic: 'behind',
    style: 'swiss-modern',
    layoutArchetype: 'analog-contact-sheet',
    nameKo: '01. 35mm 필름 콘택트 시트',
    nameEn: '01. 35mm Contact Sheet',
    description: '좌우 35mm 필름 퍼포레이션 스프로킷 홀과 Kodak Portra 프레임 마크',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'ON SET STILLS',
      font: 'Space Grotesk',
      weight: 700,
      size: 42,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 12,
      yPercent: 78
    },
    subtitle: {
      text: 'KODAK PORTRA 400 · ROLL 12 / FRAME 04A',
      font: 'Montserrat',
      weight: 500,
      size: 11,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.75)',
      align: 'left',
      xPercent: 12,
      yPercent: 85
    },
    actorName: {
      text: '배우 서유진',
      font: 'Pretendard',
      weight: 600,
      size: 18,
      letterSpacing: 2,
      color: '#FBBF24',
      align: 'left',
      xPercent: 12,
      yPercent: 72
    },
    kicker: {
      show: true,
      text: 'UNRELEASED CUT',
      style: 'clean-text',
      color: '#FBBF24'
    },
    dateCredits: {
      text: 'BLANC CINEMA UNIT · 2026',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'left',
      xPercent: 12,
      yPercent: 92
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.7,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 02. Video Village Monitor — 비디오 빌리지 모니터
  {
    id: 'behind-02-cinematic-filmstrip',
    topic: 'behind',
    style: 'cinema',
    layoutArchetype: 'cinematic-filmstrip',
    nameKo: '02. 비디오 빌리지 모니터',
    nameEn: '02. Video Village Monitor',
    description: '3분할 필름 프레임과 감독 모니터링 메타데이터, 다큐멘터리 스틸',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'MONITORING',
      font: 'Playfair Display',
      weight: 700,
      size: 40,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 54,
      yPercent: 78
    },
    subtitle: {
      text: 'DIRECTOR & CAST ON SET REVIEW',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.8)',
      align: 'left',
      xPercent: 54,
      yPercent: 85
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 18,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 54,
      yPercent: 72
    },
    kicker: {
      show: true,
      text: 'PRODUCTION LOG',
      style: 'clean-text',
      color: '#D4AF37'
    },
    dateCredits: {
      text: 'SCENE 42 // TAKE 03 // 24FPS',
      font: 'Montserrat',
      weight: 500,
      size: 8,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'left',
      xPercent: 54,
      yPercent: 92
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.6,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 03. 2.39:1 Cinema Letterbox — 시네마 레터박스
  {
    id: 'behind-03-festival-letterbox',
    topic: 'behind',
    style: 'cinema',
    layoutArchetype: 'cinematic-letterbox',
    nameKo: '03. 2.39:1 시네마 레터박스',
    nameEn: '03. 2.39:1 Cinema Letterbox',
    description: '상하단 와이드 레터박스, 영화제 월계관 심볼과 하단 프로덕션 빌링 블록',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 91,
      yPercent: 94,
      widthPercent: 13,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'IN PRODUCTION',
      font: 'DM Serif Display',
      weight: 600,
      size: 36,
      letterSpacing: 5,
      color: '#FFFFFF',
      align: 'center',
      xPercent: 50,
      yPercent: 88
    },
    subtitle: {
      text: 'FEATURE DRAMA SERIES · DAY 24',
      font: 'Montserrat',
      weight: 500,
      size: 10,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.75)',
      align: 'center',
      xPercent: 50,
      yPercent: 93
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 15,
      letterSpacing: 2,
      color: '#F4DFC8',
      align: 'center',
      xPercent: 50,
      yPercent: 82
    },
    kicker: {
      show: true,
      text: 'OFFICIAL SELECTION',
      style: 'clean-text',
      color: '#D4AF37'
    },
    dateCredits: {
      text: 'DIRECTED BY PRODUCTION TEAM · BLANC ENTERTAINMENT',
      font: 'Montserrat',
      weight: 500,
      size: 8,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.45)',
      align: 'center',
      xPercent: 50,
      yPercent: 97
    },
    overlay: {
      gradient: 'none',
      gradientOpacity: 0,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 18,
      bottomSafePercent: 75
    }
  },

  // 04. Bold Slate Dispatch — 볼드 슬레이트 디스패치
  {
    id: 'behind-04-director-slate',
    topic: 'behind',
    style: 'bold',
    layoutArchetype: 'stacked-monumental',
    nameKo: '04. 볼드 슬레이트 디스패치',
    nameEn: '04. Bold Slate Dispatch',
    description: '화면 가득 채우는 2단 누적 초대형 타이포와 사선 씬/테이크 배지',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.95,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'BEHIND SCENE',
      font: 'Archivo Black',
      weight: 900,
      size: 82,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 8,
      yPercent: 80
    },
    subtitle: {
      text: 'SCENE 34B · TAKE 03 · SOUND ROLL 08',
      font: 'Montserrat',
      weight: 700,
      size: 12,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.85)',
      align: 'left',
      xPercent: 8,
      yPercent: 87
    },
    actorName: {
      text: '배우 서유진',
      font: 'Pretendard',
      weight: 700,
      size: 20,
      letterSpacing: 2,
      color: '#FBBF24',
      align: 'left',
      xPercent: 8,
      yPercent: 72
    },
    kicker: {
      show: true,
      text: 'DIRECTOR CUT',
      style: 'clean-text',
      color: '#000000'
    },
    dateCredits: {
      text: 'BLANC ON-SET ARCHIVES · 2026',
      font: 'Montserrat',
      weight: 600,
      size: 9,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.55)',
      align: 'left',
      xPercent: 8,
      yPercent: 94
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.75,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 05. Monochrome Doc Archive — 흑백 다큐멘터리 아카이브
  {
    id: 'behind-05-monochrome-archive',
    topic: 'behind',
    style: 'editorial',
    layoutArchetype: 'monochrome-archive',
    nameKo: '05. 흑백 다큐멘터리 아카이브',
    nameEn: '05. Monochrome Doc Archive',
    description: '고대비 흑백 필름 필터, Cormorant Garamond Light 10px 와이드 자간',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'top-left',
      xPercent: 6,
      yPercent: 6,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'P R O D U C T I O N',
      font: 'Cormorant Garamond',
      weight: 400,
      size: 46,
      letterSpacing: 10,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 80
    },
    subtitle: {
      text: 'A quiet glance behind the cinema lens.',
      font: 'Cormorant Garamond',
      weight: 400,
      size: 16,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.8)',
      align: 'left',
      xPercent: 6,
      yPercent: 87
    },
    actorName: {
      text: '배우 서유진',
      font: 'Noto Serif KR',
      weight: 600,
      size: 20,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 6,
      yPercent: 72
    },
    kicker: {
      show: true,
      text: 'CAA ARCHIVES',
      style: 'clean-text',
      color: 'rgba(255, 255, 255, 0.75)'
    },
    dateCredits: {
      text: 'BLACK & WHITE FILM ARCHIVE · 2026',
      font: 'Montserrat',
      weight: 400,
      size: 9,
      letterSpacing: 3,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'left',
      xPercent: 6,
      yPercent: 94
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.7,
      filmGrain: true
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  },

  // 06. Swiss Index Report — 스위스 인덱스 리포트
  {
    id: 'behind-06-swiss-index',
    topic: 'behind',
    style: 'swiss-modern',
    layoutArchetype: 'swiss-grid',
    nameKo: '06. 스위스 인덱스 리포트',
    nameEn: '06. Swiss Index Report',
    description: '비대칭 그리드와 정밀 십자선, 촬영 일차 및 현장 콜시트 메타데이터',
    logo: {
      assetId: 'logo-blanc',
      anchor: 'bottom-right',
      xPercent: 88,
      yPercent: 92,
      widthPercent: 14,
      opacity: 0.9,
      autoInvertContrast: true,
      showBackdrop: false
    },
    title: {
      text: 'CALL SHEET',
      font: 'Space Grotesk',
      weight: 700,
      size: 46,
      letterSpacing: 3,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 15,
      yPercent: 80
    },
    subtitle: {
      text: 'SHOOTING REPORT · LOCATION SEOUL',
      font: 'Montserrat',
      weight: 500,
      size: 11,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.75)',
      align: 'left',
      xPercent: 15,
      yPercent: 87
    },
    actorName: {
      text: '배우 서유진',
      font: 'Pretendard',
      weight: 600,
      size: 18,
      letterSpacing: 2,
      color: '#FFFFFF',
      align: 'left',
      xPercent: 15,
      yPercent: 73
    },
    kicker: {
      show: true,
      text: 'INDEX 06',
      style: 'clean-text',
      color: '#38BDF8'
    },
    dateCredits: {
      text: 'PRODUCTION LOGISTICS // UNIT 1',
      font: 'Montserrat',
      weight: 500,
      size: 9,
      letterSpacing: 2,
      color: 'rgba(255, 255, 255, 0.5)',
      align: 'left',
      xPercent: 15,
      yPercent: 93
    },
    overlay: {
      gradient: 'bottom-scrim',
      gradientOpacity: 0.65,
      filmGrain: false
    },
    safeArea: {
      faceProtection: true,
      topSafePercent: 15,
      bottomSafePercent: 65
    }
  }
];

export const FONT_LICENSE_AUDIT: FontLicenseAuditRecord[] = [
  {
    fontName: 'Cormorant Garamond',
    category: 'Serif',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Cormorant+Garamond',
    fileVersion: 'v3.001',
    sha256Hash: 'e4a91901cb74b0fa251910ef093ca2d98177264a2754602f35798b1a8d67280e',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['01 Classic Editorial', '05 Monochrome Archive'],
    notes: '에디토리얼 세리프의 글로벌 표준. 상업용 이미지 제작 및 Mac Studio 자동 생성 서버 전면 허용.'
  },
  {
    fontName: 'Bodoni Moda',
    category: 'Serif',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Bodoni+Moda',
    fileVersion: 'v2.000',
    sha256Hash: 'b3d82a170f20d65bca8131e50529d33b49e17b3cb478627e7703bcde65b12af9',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['03 Warm Minimal'],
    notes: '하이패션 고대비 모던 세리프. 크림 톤 배경 및 미니멀 여백 레이아웃과 최상의 시너지.'
  },
  {
    fontName: 'Playfair Display',
    category: 'Serif',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Playfair+Display',
    fileVersion: 'v2.102',
    sha256Hash: 'c8f12d431bb5e76a0841ec7e24699042b4ee591cda631349f7831ca2095f7004',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['04 Cinematic Filmstrip'],
    notes: '디스플레이 헤드라인의 품격. 3분할 필름스트립 우측 다크 카드 및 골드 악센트와 조화.'
  },
  {
    fontName: 'Libre Baskerville',
    category: 'Serif',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Libre+Baskerville',
    fileVersion: 'v1.000',
    sha256Hash: 'd92a15c3289047cb598df241ec4fa9b09a7b9ceb2fa90b5df921a4fae36b856e',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['06 Blue Editorial'],
    notes: '전통 보도자료 및 프레스 릴리스의 신뢰감. 하단 솔리드 화이트 패널의 스틸 네이비 컬러 최적화.'
  },
  {
    fontName: 'Cinzel',
    category: 'Display',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Cinzel',
    fileVersion: 'v2.003',
    sha256Hash: 'a11c82e70fa4a8d0526e9527ecb8423277b084e4f71a086bc9b3986a42a0b4b2',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['07 Midnight Cinema'],
    notes: '로마 고전 기념비 서체. 딥 미드나잇 네이비 배경 속 중앙 집중형 시네마틱 타이포 최적.'
  },
  {
    fontName: 'Allura',
    category: 'Script',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Allura',
    fileVersion: 'v1.002',
    sha256Hash: 'f55b9319e7a9b054a88bc3bdf906d48b4380e927c32b509bc029da9f095d24b6',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    replacementSuggestion: 'Bickham Script Pro의 안전한 완전 대체 서체',
    assignedPresets: ['02 Signature Script'],
    notes: '우아한 필기체. Bickham Script Pro 유료 라이선스 제약 없이 서버 자동 생성 및 배포 가능.'
  },
  {
    fontName: 'Pinyon Script',
    category: 'Script',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Pinyon+Script',
    fileVersion: 'v1.001',
    sha256Hash: '8e3d489b023f0a40d5e3532cf2b7579f18a541315995abdfef1c9b83b49ec938',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['08 Blue Signature'],
    notes: '프렌치 오트쿠튀르 감성의 스크립트 서체. 하단을 가로지르는 서명형 대형 타이포그래피 구현.'
  },
  {
    fontName: 'Montserrat',
    category: 'Sans',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Montserrat',
    fileVersion: 'v7.222',
    sha256Hash: '712a321cfb77626359b6ce8d6e35560b4ef7e0cb3a0c7c72f3e8207137f26d24',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    replacementSuggestion: 'Neue Haas Grotesk의 글로벌 표준 오픈소스 대체 서체',
    assignedPresets: ['02 Signature Script', '04 Cinematic Filmstrip', '06 Blue Editorial'],
    notes: '기하학적 산세리프. Neue Haas Grotesk의 복잡한 유료 계약 없이 보조 타이포그래피 전면 사용 가능.'
  },
  {
    fontName: 'Pretendard',
    category: 'Sans',
    licenseType: 'SIL OFL 1.1',
    officialSource: '공식 GitHub (orioncactus/pretendard)',
    sourceUrl: 'https://github.com/orioncactus/pretendard',
    fileVersion: 'v1.3.9',
    sha256Hash: '90ab4282e70df447814b77f98b9e6027ab464e837ca7d2d385f0ef307f59d571',
    hasKoreanSupport: true,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    replacementSuggestion: 'Apple 산돌고딕 및 Neue Haas Grotesk의 현대적 한글/영문 통합 대체',
    assignedPresets: ['01 Classic Editorial', '05 Monochrome Archive', '07 Midnight Cinema'],
    notes: '공식 저장소에서 상업적 이용·수정·재배포 명시적 허용. 디지털 디스플레이 최고 가독성.'
  },
  {
    fontName: 'Noto Serif KR',
    category: 'Serif',
    licenseType: 'SIL OFL 1.1',
    officialSource: 'Google Fonts',
    sourceUrl: 'https://fonts.google.com/specimen/Noto+Serif+KR',
    fileVersion: 'v2.001',
    sha256Hash: '4fa2136d8048f074d642ae0c1c1f72d4ba0680d0d867c8be0fb4a779532ea489',
    hasKoreanSupport: true,
    rights: {
      commercialPromo: true,
      serverRendering: true,
      bundleDistribute: true,
      webPreview: true,
      modifyDistribute: true
    },
    verdict: 'verified-ofl',
    verdictLabel: '사용 추천 (OFL 1.1 검증 완료)',
    assignedPresets: ['03 Warm Minimal', '06 Blue Editorial', '08 Blue Signature'],
    notes: '정통 한글 명조의 최고 품격. 배우 이름 및 감성 인용구 표현에서 압도적 조화로움 제공.'
  },

  // 11 & 12. Excluded Paid Fonts
  {
    fontName: 'Bickham Script Pro',
    category: 'Script',
    licenseType: 'Adobe 상용 라이선스 (Subscription)',
    officialSource: 'Adobe Fonts',
    sourceUrl: 'https://fonts.adobe.com/fonts/bickham-script-pro',
    fileVersion: 'Commercial v1.0',
    sha256Hash: '[상용 비공개 — 라이선스 계약 증빙 필요]',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: false,
      bundleDistribute: false,
      webPreview: false,
      modifyDistribute: false
    },
    verdict: 'excluded-commercial',
    verdictLabel: '기본 내장 제외 (별도 서버 라이선스 필요)',
    replacementSuggestion: 'Allura 또는 Pinyon Script로 대체 권장',
    assignedPresets: [],
    notes: 'Adobe Fonts 라이선스는 Mac Studio 자동 생성 서버 설치 및 프로그램 내장 배포를 명시적으로 금지함. 유료 증빙 전까지 비활성화.'
  },
  {
    fontName: 'Neue Haas Grotesk',
    category: 'Sans',
    licenseType: '상용 계약형 (Linotype / Monotype)',
    officialSource: 'MyFonts / Monotype',
    sourceUrl: 'https://www.myfonts.com/collections/neue-haas-grotesk-font-linotype',
    fileVersion: 'Commercial v1.0',
    sha256Hash: '[상용 비공개 — 라이선스 계약 증빙 필요]',
    hasKoreanSupport: false,
    rights: {
      commercialPromo: true,
      serverRendering: false,
      bundleDistribute: false,
      webPreview: false,
      modifyDistribute: false
    },
    verdict: 'excluded-commercial',
    verdictLabel: '기본 내장 제외 (별도 서버 라이선스 필요)',
    replacementSuggestion: 'Montserrat 또는 Pretendard로 대체 권장',
    assignedPresets: [],
    notes: 'Desktop, Webfont, App, Server 라이선스가 모두 분리된 상용 서체. Mac Studio 자동 생성용 별도 서버 계약 필요.'
  }
];

