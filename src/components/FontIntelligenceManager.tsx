import React, { useState } from 'react';
import {
  Type,
  Sparkles,
  ShieldCheck,
  Search,
  Check,
  Layers,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { FontItem, TopicId } from '../types/studio';
import { FONT_LIBRARY, TOPICS } from '../data/defaultData';
import { recommendFontsForContext } from '../utils/aiEngine';

interface FontIntelligenceManagerProps {
  onApplyFontPairing?: (titleFont: string, actorFont: string) => void;
}

export const FontIntelligenceManager: React.FC<FontIntelligenceManagerProps> = ({
  onApplyFontPairing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'serif' | 'sans' | 'display'>('all');
  const [previewText, setPreviewText] = useState('RYU KYUNG SOO · CASTING NEWS');
  const [selectedTopicForAi, setSelectedTopicForAi] = useState<TopicId>('casting');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // All unique mood & style tags across font library
  const allTags = Array.from(
    new Set(FONT_LIBRARY.flatMap((f) => [...f.moodTags, ...f.styleTags]))
  );

  // Filtered fonts
  const filteredFonts = FONT_LIBRARY.filter((f) => {
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    if (selectedTag !== 'all' && !f.moodTags.includes(selectedTag) && !f.styleTags.includes(selectedTag))
      return false;
    if (
      searchQuery &&
      !f.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.moodTags.some((t) => t.includes(searchQuery))
    )
      return false;
    return true;
  });

  // AI recommendations for currently selected topic
  const aiRecommendations = recommendFontsForContext(selectedTopicForAi, ['럭셔리', '에디토리얼', '우아함']);

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>AI FONT INTELLIGENCE ENGINE & LICENSING VAULT</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-manrope">
              AI 폰트 큐레이터 & 라이브러리
            </h1>
            <p className="text-xs text-zinc-400">
              분위기·감성·고급스러움·적합성 태그를 기반으로 사진과 주제에 가장 어울리는 황금 타이포그래피 조합 자동 추천
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
            <ShieldCheck className="w-4 h-4" />
            <span>상업용 배포 라이선스 검증 완료 (SIL OFL)</span>
          </div>
        </div>

        {/* AI Font Pairing Sandbox Section */}
        <div className="p-6 bg-gradient-to-br from-[#18181b] to-[#121215] border border-amber-400/30 rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">AI 타이포그래피 황금 조합 추천</h2>
                <p className="text-[11px] text-zinc-400">
                  주제와 인물 분위기에 맞춰 메인 타이틀 + 한글 배우명 폰트를 페어링합니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">분석 주제:</span>
              <select
                value={selectedTopicForAi}
                onChange={(e) => setSelectedTopicForAi(e.target.value as TopicId)}
                className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400"
              >
                {TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nameKo} ({t.nameEn})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* AI Recommended Pairings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.slice(0, 3).map((rec, idx) => (
              <div
                key={rec.titleFont.id}
                className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3 relative hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      추천 {idx + 1}순위 (일치도 {rec.matchScore}%)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {rec.titleFont.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Visual Type Preview */}
                  <div className="py-3 px-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                    <div
                      className="text-lg font-bold text-white uppercase tracking-wider truncate"
                      style={{ fontFamily: rec.titleFont.family }}
                    >
                      {rec.titleFont.name}
                    </div>
                    <div
                      className="text-xs text-amber-200"
                      style={{ fontFamily: rec.actorFont.family }}
                    >
                      배우 류경수 · {rec.actorFont.name}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>

                {onApplyFontPairing && (
                  <button
                    onClick={() => onApplyFontPairing(rec.titleFont.family, rec.actorFont.family)}
                    className="w-full py-1.5 px-3 bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-black font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>이 조합 스튜디오에 적용</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive Text Input Sandbox */}
        <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>실시간 폰트 렌더링 미리보기 텍스트</span>
            </span>
            <span className="text-[11px] text-zinc-500">한글/영문 자유롭게 입력 가능</span>
          </div>
          <input
            type="text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            placeholder="미리보기할 텍스트를 입력하세요..."
            className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filters & Search */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Category tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#121215] border border-white/10 rounded-lg text-xs w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === 'all' ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                전체 서체
              </button>
              <button
                onClick={() => setSelectedCategory('serif')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === 'serif' ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                세리프 (Serif)
              </button>
              <button
                onClick={() => setSelectedCategory('sans')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === 'sans' ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                산세리프 (Sans)
              </button>
              <button
                onClick={() => setSelectedCategory('display')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === 'display' ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                디스플레이 (Display)
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="폰트명 또는 태그 검색 (예: 럭셔리, 보도자료)"
                className="w-full pl-9 pr-3 py-2 bg-[#121215] border border-white/10 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Mood Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-zinc-500 font-medium mr-1">분위기 태그:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedTag === 'all'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              전체
            </button>
            {allTags.slice(0, 14).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedTag === tag
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Font Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFonts.map((font) => (
            <div
              key={font.id}
              className="p-5 bg-[#121215] border border-white/10 rounded-2xl space-y-4 hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-manrope">{font.name}</h3>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {font.category.toUpperCase()} · 지원: {font.languages.join(' / ').toUpperCase()}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    OFL 상업용 허가
                  </span>
                </div>

                {/* Live Preview Display */}
                <div className="p-4 bg-black/60 border border-white/5 rounded-xl min-h-[90px] flex items-center">
                  <div
                    className="text-xl sm:text-2xl text-white tracking-wide leading-snug w-full truncate"
                    style={{ fontFamily: font.family }}
                  >
                    {previewText || font.name}
                  </div>
                </div>

                {/* Mood & Style Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {font.moodTags.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 font-mono"
                    >
                      #{m}
                    </span>
                  ))}
                  {font.styleTags.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-400/5 text-amber-300 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Scores Bar */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                  <div>
                    <span>럭셔리: </span>
                    <span className="text-amber-300">{font.scores.luxury}%</span>
                  </div>
                  <div>
                    <span>모던: </span>
                    <span className="text-amber-300">{font.scores.modern}%</span>
                  </div>
                  <div>
                    <span>드라마: </span>
                    <span className="text-amber-300">{font.scores.dramatic}%</span>
                  </div>
                  <div>
                    <span>한글조화: </span>
                    <span className="text-amber-300">{font.scores.koreanHarmony}%</span>
                  </div>
                </div>
              </div>

              {/* License Note & Action */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="truncate max-w-[260px]">{font.licenseNote}</span>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(font.family);
                    setCopiedId(font.id);
                    setTimeout(() => setCopiedId(null), 1500);
                  }}
                  className="px-2.5 py-1 rounded border border-white/10 hover:bg-white/5 text-zinc-300 text-xs transition-colors shrink-0"
                >
                  {copiedId === font.id ? '복사 완료' : '패밀리명 복사'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
