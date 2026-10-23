import React, { useState } from 'react';
import {
  Layout,
  Sliders,
  Sparkles,
  ArrowRight,
  Film,
  Camera,
  Grid,
  Square,
  Award
} from 'lucide-react';
import { AgencyStyle, DesignPreset, LayoutArchetype, TopicId } from '../types/studio';
import { TOPICS } from '../data/defaultData';
import { SAMPLE_PHOTOS } from '../data/sampleImages';

interface TemplateLibraryProps {
  presets: DesignPreset[];
  onSelectPreset: (preset: DesignPreset) => void;
  onOpenInStudio: (preset: DesignPreset) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  presets,
  onSelectPreset,
  onOpenInStudio
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [selectedArchetype, setSelectedArchetype] = useState<LayoutArchetype | 'all'>('all');

  const filteredPresets = presets.filter((p) => {
    if (selectedTopic !== 'all' && p.topic !== selectedTopic) return false;
    if (selectedArchetype !== 'all' && p.layoutArchetype !== selectedArchetype) return false;
    return true;
  });

  const getArchetypeLabel = (arch: LayoutArchetype) => {
    switch (arch) {
      case 'magazine-cover':
        return '보그 매거진 마스트헤드';
      case 'cinematic-letterbox':
        return '영화제 2.39:1 레터박스';
      case 'frame-passepartout':
        return '미술관 파스파르투 액자';
      case 'analog-contact-sheet':
        return '35mm 필름 콘택트 시트';
      case 'swiss-grid':
        return '스위스 비대칭 그리드';
      case 'stacked-monumental':
        return '볼드 2단 스택 임팩트';
      case 'zen-vertical':
        return '동양식 버티컬 젠';
      case 'agency-minimal-caa':
      default:
        return 'CAA 공식 디스패치';
    }
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>RADICALLY DIVERSE ARCHITECTURAL LAYOUTS (8 DISTINCT ARCHETYPES)</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-manrope">
              에이전시 디자인 템플릿 라이브러리
            </h1>
            <p className="text-xs text-zinc-400">
              보그 마스트헤드, 2.39:1 영화제 레터박스, 35mm 필름 퍼포레이션, 파스파르투 액자 등 완전히 서로 다른 구조의 54개 프리셋
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            총 <span className="text-amber-400 font-bold">{filteredPresets.length}</span>개의 프리셋 표시 중
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-3">
          {/* Topics Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121215] border border-white/10 rounded-xl">
            <span className="text-xs text-zinc-400 px-2 font-medium">주제:</span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              전체 보기 (All)
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTopic === topic.id
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {topic.nameKo}
              </button>
            ))}
          </div>

          {/* Radical Archetype Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121215] border border-white/10 rounded-xl">
            <span className="text-xs text-amber-400 px-2 font-semibold">양식별 필터:</span>
            <button
              onClick={() => setSelectedArchetype('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'all'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              전체 양식
            </button>
            <button
              onClick={() => setSelectedArchetype('magazine-cover')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'magazine-cover' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              보그 매거진 커버 (상단 마스트헤드)
            </button>
            <button
              onClick={() => setSelectedArchetype('cinematic-letterbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'cinematic-letterbox' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              영화제 레터박스 (2.39:1 + 월계관)
            </button>
            <button
              onClick={() => setSelectedArchetype('frame-passepartout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'frame-passepartout' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              미술관 파스파르투 액자
            </button>
            <button
              onClick={() => setSelectedArchetype('analog-contact-sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'analog-contact-sheet' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              35mm 필름 콘택트 시트
            </button>
            <button
              onClick={() => setSelectedArchetype('swiss-grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'swiss-grid' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              스위스 비대칭 그리드
            </button>
            <button
              onClick={() => setSelectedArchetype('stacked-monumental')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'stacked-monumental' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              볼드 2단 스택 임팩트
            </button>
            <button
              onClick={() => setSelectedArchetype('zen-vertical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'zen-vertical' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              동양식 버티컬 젠
            </button>
            <button
              onClick={() => setSelectedArchetype('agency-minimal-caa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedArchetype === 'agency-minimal-caa' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CAA 공식 디스패치
            </button>
          </div>
        </div>

        {/* Preset Cards Grid with Radically Distinct Structural Layout Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPresets.map((preset) => {
            const topicDef = TOPICS.find((t) => t.id === preset.topic);
            const samplePhoto =
              SAMPLE_PHOTOS.find((s) => s.topic === preset.topic || s.category === preset.topic)?.dataUrl ||
              (preset.topic === 'filming' ? SAMPLE_PHOTOS.find((s) => s.topic === 'behind')?.dataUrl : undefined) ||
              SAMPLE_PHOTOS[0].dataUrl;

            const arch = preset.layoutArchetype;

            return (
              <div
                key={preset.id}
                className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-lg"
              >
                {/* Visual Preview Frame customized per layout archetype */}
                <div className="relative aspect-[4/5] bg-black overflow-hidden flex flex-col justify-between">
                  {/* Photo Rendering based on layout archetype */}
                  {arch === 'frame-passepartout' ? (
                    /* Passepartout Inset */
                    <div className="absolute inset-0 p-5 bg-[#0a0a0d] flex flex-col">
                      <div className="relative flex-1 rounded border border-white/10 overflow-hidden mb-14">
                        <img
                          src={samplePhoto}
                          alt={preset.nameKo}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-12 flex flex-col items-center justify-center text-center space-y-0.5">
                        <div className="w-12 h-px bg-amber-400/40 mb-1" />
                        <div className="text-[11px] font-bold tracking-widest text-white uppercase font-serif">
                          {preset.title.text}
                        </div>
                        <div className="text-[10px] text-amber-200/80 font-serif">
                          {preset.actorName.text}
                        </div>
                      </div>
                    </div>
                  ) : arch === 'cinematic-letterbox' ? (
                    /* 2.39:1 Letterbox Widescreen */
                    <div className="absolute inset-0 flex flex-col justify-between bg-black">
                      {/* Top Black Bar with Laurel */}
                      <div className="h-14 bg-black flex flex-col items-center justify-center border-b border-amber-400/30 px-4">
                        <span className="text-[9px] font-mono text-amber-400 tracking-wider">
                          ❦ CANNES OFFICIAL SELECTION ❦
                        </span>
                      </div>
                      {/* Central Photo Viewport */}
                      <div className="flex-1 overflow-hidden relative">
                        <img
                          src={samplePhoto}
                          alt={preset.nameKo}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      {/* Bottom Black Bar with Title and Billing block */}
                      <div className="h-20 bg-black flex flex-col items-center justify-center border-t border-amber-400/30 px-3 text-center space-y-1">
                        <div className="text-xs font-bold tracking-widest text-white uppercase font-serif">
                          {preset.title.text}
                        </div>
                        <div className="text-[10px] text-amber-300 font-serif">
                          {preset.actorName.text}
                        </div>
                        <div className="text-[8px] font-mono text-zinc-500">
                          DIRECTED BY SEOUL · CAA TALENT MANAGEMENT
                        </div>
                      </div>
                    </div>
                  ) : arch === 'analog-contact-sheet' ? (
                    /* 35mm Film Sprockets */
                    <div className="absolute inset-0 bg-black flex">
                      {/* Left Sprocket Strip */}
                      <div className="w-7 bg-zinc-950 flex flex-col justify-around py-3 items-center border-r border-white/10 shrink-0">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-2.5 h-3.5 bg-zinc-800 rounded-sm" />
                        ))}
                      </div>
                      {/* Center Frame */}
                      <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-3">
                        <img
                          src={samplePhoto}
                          alt={preset.nameKo}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                        <div className="relative text-[9px] font-mono text-amber-400">
                          KODAK PORTRA 400 · 35mm
                        </div>
                        <div className="relative space-y-0.5">
                          <div className="text-sm font-bold text-white font-mono uppercase">
                            {preset.title.text}
                          </div>
                          <div className="text-[10px] text-amber-200">{preset.actorName.text}</div>
                        </div>
                      </div>
                      {/* Right Sprocket Strip */}
                      <div className="w-7 bg-zinc-950 flex flex-col justify-around py-3 items-center border-l border-white/10 shrink-0">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-2.5 h-3.5 bg-zinc-800 rounded-sm" />
                        ))}
                      </div>
                    </div>
                  ) : arch === 'magazine-cover' ? (
                    /* Vogue Magazine Masthead Across Top */
                    <div className="absolute inset-0 overflow-hidden flex flex-col justify-between p-5">
                      <img
                        src={samplePhoto}
                        alt={preset.nameKo}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />

                      {/* Giant Top Masthead */}
                      <div className="relative z-10 text-center space-y-1 pt-1">
                        <div className="text-[8px] font-mono text-white/70 tracking-widest">
                          VOL. 26 // SPECIAL EDITORIAL // 2026
                        </div>
                        <div className="text-2xl font-black text-white uppercase tracking-widest font-serif leading-none">
                          {preset.title.text}
                        </div>
                      </div>

                      {/* Middle-Left Floating Actor Name */}
                      <div className="relative z-10 space-y-0.5">
                        <div className="text-sm font-bold text-white font-serif drop-shadow-md">
                          {preset.actorName.text}
                        </div>
                        <div className="text-[9px] text-amber-300 font-mono tracking-wider">
                          {preset.subtitle.text}
                        </div>
                      </div>

                      {/* Bottom Right Barcode */}
                      <div className="relative z-10 flex justify-end">
                        <div className="bg-white/90 px-2 py-1 rounded text-[7px] text-black font-mono flex items-center gap-1">
                          <span>|||||||||||||||</span>
                          <span>ISSN 2026</span>
                        </div>
                      </div>
                    </div>
                  ) : arch === 'stacked-monumental' ? (
                    /* Stacked Monumental Heavy 2-Line */
                    <div className="absolute inset-0 overflow-hidden flex flex-col justify-between p-5">
                      <img
                        src={samplePhoto}
                        alt={preset.nameKo}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

                      {/* Top Diagonal Badge */}
                      <div className="relative z-10 flex justify-end">
                        <span className="bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 rounded -rotate-6">
                          {preset.kicker.text}
                        </span>
                      </div>

                      {/* Giant Stacked Title */}
                      <div className="relative z-10 space-y-0.5">
                        <div className="text-2xl font-black text-white font-archivo uppercase leading-tight drop-shadow-lg">
                          {preset.title.text}
                        </div>
                        <div className="text-xs font-bold text-white pt-1">
                          {preset.actorName.text}
                        </div>
                      </div>
                    </div>
                  ) : arch === 'zen-vertical' ? (
                    /* Zen Vertical down left with red stamp */
                    <div className="absolute inset-0 overflow-hidden flex p-5">
                      <img
                        src={samplePhoto}
                        alt={preset.nameKo}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

                      <div className="relative z-10 flex flex-col justify-between">
                        {/* Vertical text */}
                        <div className="text-sm font-bold text-white font-serif writing-vertical space-y-1">
                          {preset.title.text}
                        </div>

                        {/* Bottom actor & red seal */}
                        <div className="space-y-2">
                          <div className="w-6 h-6 border border-rose-500 bg-rose-500/20 text-rose-500 text-[8px] flex items-center justify-center font-serif">
                            認證
                          </div>
                          <div className="text-xs font-bold text-white font-serif">
                            {preset.actorName.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : arch === 'swiss-grid' ? (
                    /* Swiss Grid with side ribbon */
                    <div className="absolute inset-0 overflow-hidden flex">
                      {/* Left Strip */}
                      <div className="w-8 bg-zinc-900 border-r border-white/10 flex items-center justify-center z-10 shrink-0">
                        <span className="text-[8px] font-mono text-zinc-400 -rotate-90 tracking-widest whitespace-nowrap">
                          SWISS MODERN GRID · 2026
                        </span>
                      </div>
                      <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-4">
                        <img
                          src={samplePhoto}
                          alt={preset.nameKo}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        <div className="relative text-right text-xs font-bold font-mono text-white/30">
                          01 / ARCHIVE
                        </div>
                        <div className="relative space-y-0.5">
                          <div className="text-base font-bold text-white font-mono uppercase">
                            {preset.title.text}
                          </div>
                          <div className="text-xs text-amber-300 font-mono">{preset.actorName.text}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* CAA Minimal Dispatch */
                    <div className="absolute inset-0 overflow-hidden flex flex-col justify-between p-5">
                      <img
                        src={samplePhoto}
                        alt={preset.nameKo}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
                      <div className="relative text-[8px] font-mono text-zinc-400 border-b border-white/20 pb-1">
                        CAA MANAGEMENT // OFFICIAL DISPATCH
                      </div>
                      <div className="relative space-y-1">
                        <div className="text-xs font-mono text-amber-400">{preset.kicker.text}</div>
                        <div className="text-xl font-bold text-white uppercase font-sans">
                          {preset.title.text}
                        </div>
                        <div className="text-xs text-zinc-200 font-serif">{preset.actorName.text}</div>
                      </div>
                    </div>
                  )}

                  {/* Archetype Tag Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-amber-300 border border-amber-400/30 z-20 shadow-md">
                    {getArchetypeLabel(arch)}
                  </div>
                </div>

                {/* Card Meta & Action */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">{preset.nameKo}</h3>
                      <span className="text-[11px] font-mono text-amber-400">
                        {topicDef?.nameEn}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="text-zinc-400 font-mono">
                      서체: <strong className="text-zinc-200">{preset.title.font}</strong>
                    </span>

                    <button
                      onClick={() => onOpenInStudio(preset)}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>편집기에서 적용</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
