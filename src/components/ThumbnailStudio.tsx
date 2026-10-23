import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Type,
  Layout,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import {
  AgencyLogo,
  AspectRatioConfig,
  DesignPreset,
  LogoPosition,
  TopicId
} from '../types/studio';
import {
  ASPECT_RATIOS,
  TOPICS,
  AGENCY_LOGOS,
  FONT_LIBRARY
} from '../data/defaultData';
import { SAMPLE_PHOTOS } from '../data/sampleImages';
import { renderAgencyThumbnail } from '../utils/canvasRenderer';
import { recommendFontsForContext } from '../utils/aiEngine';

interface ThumbnailStudioProps {
  currentPreset: DesignPreset;
  currentPhoto: string;
  currentLogo: AgencyLogo;
  allPresets: DesignPreset[];
  allLogos: AgencyLogo[];
  onSelectPreset: (preset: DesignPreset) => void;
  onSelectLogo: (logo: AgencyLogo) => void;
}

export const ThumbnailStudio: React.FC<ThumbnailStudioProps> = ({
  currentPreset,
  currentPhoto,
  currentLogo,
  allPresets,
  allLogos,
  onSelectPreset,
  onSelectLogo
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>(currentPhoto);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('all');
  const [activeRatio, setActiveRatio] = useState<AspectRatioConfig>(ASPECT_RATIOS[0]);
  const [activePreset, setActivePreset] = useState<DesignPreset>(currentPreset);
  const [activeLogo, setActiveLogo] = useState<AgencyLogo>(currentLogo);

  // Editable fields
  const [titleText, setTitleText] = useState(currentPreset.title.text);
  const [subtitleText, setSubtitleText] = useState(currentPreset.subtitle.text);
  const [actorNameText, setActorNameText] = useState(currentPreset.actorName.text);
  const [kickerText, setKickerText] = useState(currentPreset.kicker.text);
  const [dateCreditsText, setDateCreditsText] = useState(currentPreset.dateCredits.text);

  // Typography controls
  const [titleFont, setTitleFont] = useState(currentPreset.title.font);
  const [titleSize, setTitleSize] = useState(currentPreset.title.size);
  const [titleSpacing, setTitleSpacing] = useState(currentPreset.title.letterSpacing);
  const [titleY, setTitleY] = useState(currentPreset.title.yPercent);
  const [titleAlign, setTitleAlign] = useState(currentPreset.title.align);
  const [actorFont, setActorFont] = useState(currentPreset.actorName.font);

  // Logo relative coordinates
  const [logoX, setLogoX] = useState(currentPreset.logo.xPercent);
  const [logoY, setLogoY] = useState(currentPreset.logo.yPercent);
  const [logoW, setLogoW] = useState(currentPreset.logo.widthPercent);
  const [logoOpacity, setLogoOpacity] = useState(currentPreset.logo.opacity);
  const [logoAnchor, setLogoAnchor] = useState(currentPreset.logo.anchor);
  const [logoInvert, setLogoInvert] = useState(currentPreset.logo.autoInvertContrast);

  // Viewport overlays & zoom
  const [showFaceSafeGuide, setShowFaceSafeGuide] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeArchetype, setActiveArchetype] = useState<DesignPreset['layoutArchetype']>(
    currentPreset.layoutArchetype || 'agency-minimal-caa'
  );
  const [showFestivalLaurel, setShowFestivalLaurel] = useState(
    currentPreset.layoutDetails?.showFestivalLaurel ?? false
  );
  const [showSprockets, setShowSprockets] = useState(
    currentPreset.layoutDetails?.showSprocketHoles ?? false
  );
  const [showBarcode, setShowBarcode] = useState(
    currentPreset.layoutDetails?.showBarcode ?? true
  );
  const [showVerticalRibbon, setShowVerticalRibbon] = useState(
    currentPreset.layoutDetails?.showVerticalRibbon ?? false
  );

  // Sync when props change
  useEffect(() => {
    setActivePreset(currentPreset);
    setActiveArchetype(currentPreset.layoutArchetype || 'agency-minimal-caa');
    setTitleText(currentPreset.title.text);
    setSubtitleText(currentPreset.subtitle.text);
    setActorNameText(currentPreset.actorName.text);
    setKickerText(currentPreset.kicker.text);
    setDateCreditsText(currentPreset.dateCredits.text);
    setTitleFont(currentPreset.title.font);
    setTitleSize(currentPreset.title.size);
    setTitleSpacing(currentPreset.title.letterSpacing);
    setTitleY(currentPreset.title.yPercent);
    setTitleAlign(currentPreset.title.align);
    setActorFont(currentPreset.actorName.font);
    setLogoX(currentPreset.logo.xPercent);
    setLogoY(currentPreset.logo.yPercent);
    setLogoW(currentPreset.logo.widthPercent);
    setLogoOpacity(currentPreset.logo.opacity);
    setLogoAnchor(currentPreset.logo.anchor);
    setShowFestivalLaurel(currentPreset.layoutDetails?.showFestivalLaurel ?? false);
    setShowSprockets(currentPreset.layoutDetails?.showSprocketHoles ?? false);
    setShowBarcode(currentPreset.layoutDetails?.showBarcode ?? true);
    setShowVerticalRibbon(currentPreset.layoutDetails?.showVerticalRibbon ?? false);
  }, [currentPreset]);

  // Main Render Effect
  useEffect(() => {
    const doRender = async () => {
      if (!canvasRef.current) return;
      setIsRendering(true);

      const modifiedPreset: DesignPreset = {
        ...activePreset,
        layoutArchetype: activeArchetype,
        layoutDetails: {
          ...activePreset.layoutDetails,
          showFestivalLaurel,
          showSprocketHoles: showSprockets,
          showBarcode,
          showVerticalRibbon
        },
        title: {
          ...activePreset.title,
          text: titleText,
          font: titleFont,
          size: titleSize,
          letterSpacing: titleSpacing,
          yPercent: titleY,
          align: titleAlign
        },
        subtitle: {
          ...activePreset.subtitle,
          text: subtitleText
        },
        actorName: {
          ...activePreset.actorName,
          text: actorNameText,
          font: actorFont
        },
        kicker: {
          ...activePreset.kicker,
          text: kickerText
        },
        dateCredits: {
          ...activePreset.dateCredits,
          text: dateCreditsText
        },
        logo: {
          ...activePreset.logo,
          xPercent: logoX,
          yPercent: logoY,
          widthPercent: logoW,
          opacity: logoOpacity,
          anchor: logoAnchor,
          autoInvertContrast: logoInvert
        }
      };

      try {
        await renderAgencyThumbnail(canvasRef.current, {
          imageSrc: photoSrc,
          preset: modifiedPreset,
          ratioConfig: activeRatio,
          logo: activeLogo,
          customText: {
            title: titleText,
            subtitle: subtitleText,
            actorName: actorNameText,
            kicker: kickerText,
            dateCredits: dateCreditsText
          },
          logoOverride: {
            xPercent: logoX,
            yPercent: logoY,
            widthPercent: logoW,
            opacity: logoOpacity,
            anchor: logoAnchor,
            autoInvertContrast: logoInvert
          }
        });
      } catch (e) {
        console.error('Studio render error:', e);
      } finally {
        setIsRendering(false);
      }
    };

    const timer = setTimeout(doRender, 40);
    return () => clearTimeout(timer);
  }, [
    activeArchetype,
    showFestivalLaurel,
    showSprockets,
    showBarcode,
    showVerticalRibbon,
    photoSrc,
    activeRatio,
    activePreset,
    activeLogo,
    titleText,
    subtitleText,
    actorNameText,
    kickerText,
    dateCreditsText,
    titleFont,
    titleSize,
    titleSpacing,
    titleY,
    titleAlign,
    actorFont,
    logoX,
    logoY,
    logoW,
    logoOpacity,
    logoAnchor,
    logoInvert
  ]);

  // Handle Archetype change (radically shifts composition, font size, Y position)
  const handleArchetypeChange = (arch: DesignPreset['layoutArchetype']) => {
    setActiveArchetype(arch);
    if (arch === 'magazine-cover') {
      setTitleY(14);
      setTitleSize(96);
      setTitleSpacing(8);
      setTitleAlign('center');
      setTitleFont('Bodoni Moda');
      setLogoAnchor('top-left');
      setLogoX(8);
      setLogoY(8);
      setLogoW(12);
      setShowBarcode(true);
      setShowFestivalLaurel(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    } else if (arch === 'cinematic-letterbox') {
      setTitleY(88);
      setTitleSize(36);
      setTitleSpacing(4);
      setTitleAlign('center');
      setTitleFont('DM Serif Display');
      setLogoAnchor('bottom-right');
      setLogoX(91);
      setLogoY(92);
      setLogoW(14);
      setShowFestivalLaurel(true);
      setShowBarcode(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    } else if (arch === 'frame-passepartout') {
      setTitleY(86);
      setTitleSize(34);
      setTitleSpacing(6);
      setTitleAlign('center');
      setTitleFont('Playfair Display');
      setLogoAnchor('bottom-right');
      setLogoX(91);
      setLogoY(92);
      setLogoW(14);
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    } else if (arch === 'analog-contact-sheet') {
      setTitleY(80);
      setTitleSize(56);
      setTitleSpacing(4);
      setTitleAlign('left');
      setTitleFont('Space Grotesk');
      setShowSprockets(true);
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowVerticalRibbon(false);
    } else if (arch === 'swiss-grid') {
      setTitleY(18);
      setTitleSize(58);
      setTitleSpacing(4);
      setTitleAlign('left');
      setTitleFont('Space Grotesk');
      setShowVerticalRibbon(true);
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowSprockets(false);
    } else if (arch === 'stacked-monumental') {
      setTitleY(72);
      setTitleSize(82);
      setTitleSpacing(2);
      setTitleAlign('left');
      setTitleFont('Archivo Black');
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    } else if (arch === 'zen-vertical') {
      setTitleY(22);
      setTitleSize(28);
      setTitleSpacing(4);
      setTitleAlign('left');
      setTitleFont('Noto Serif KR');
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    } else {
      // agency-minimal-caa
      setTitleY(80);
      setTitleSize(60);
      setTitleSpacing(6);
      setTitleAlign('left');
      setTitleFont('Manrope');
      setShowFestivalLaurel(false);
      setShowBarcode(false);
      setShowSprockets(false);
      setShowVerticalRibbon(false);
    }
  };

  // Handle Preset change
  const handleSelectPresetItem = (preset: DesignPreset) => {
    setActivePreset(preset);
    setActiveArchetype(preset.layoutArchetype || 'agency-minimal-caa');
    onSelectPreset(preset);
  };

  // AI Auto-Tune Font Pairing & Layout
  const handleAiAutoTune = () => {
    const recs = recommendFontsForContext(activePreset.topic, ['럭셔리', '에디토리얼', '우아함']);
    if (recs.length > 0) {
      const best = recs[0];
      setTitleFont(best.titleFont.family);
      setActorFont(best.actorFont.family);
      setTitleSpacing(best.titleFont.category === 'serif' ? 6 : 3);
    }
  };

  // Export & Download
  const handleDownload = (format: 'png' | 'jpeg') => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL(`image/${format}`, 0.95);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `TCS_${activePreset.topic}_${activeRatio.id}_${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Preset JSON
  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(
      {
        id: activePreset.id,
        name: activePreset.nameKo,
        topic: activePreset.topic,
        ratio: activeRatio.id,
        canvas: { width: activeRatio.width, height: activeRatio.height },
        logo: {
          assetId: activeLogo.id,
          anchor: logoAnchor,
          xPercent: logoX,
          yPercent: logoY,
          widthPercent: logoW,
          opacity: logoOpacity
        },
        typography: {
          title: { text: titleText, font: titleFont, size: titleSize, tracking: titleSpacing },
          subtitle: { text: subtitleText },
          actorName: { text: actorNameText, font: actorFont }
        }
      },
      null,
      2
    );

    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-4 lg:p-6 overflow-x-hidden">
      <div className="mx-auto max-w-[1520px] space-y-4">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#121215] border border-white/10 rounded-xl">
          {/* Topic & Style Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">주제:</span>
              <select
                value={activePreset.topic}
                onChange={(e) => {
                  const newTopic = e.target.value as TopicId;
                  const match = allPresets.find((p) => p.topic === newTopic && p.style === activePreset.style) ||
                    allPresets.find((p) => p.topic === newTopic) || allPresets[0];
                  handleSelectPresetItem(match);
                }}
                className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
              >
                {TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nameKo} ({t.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">에이전시 스타일:</span>
              <select
                value={activePreset.style}
                onChange={(e) => {
                  const newStyle = e.target.value;
                  const match = allPresets.find((p) => p.topic === activePreset.topic && p.style === newStyle) || activePreset;
                  handleSelectPresetItem(match);
                }}
                className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
              >
                <option value="minimal">에이전시 미니멀 (CAA)</option>
                <option value="editorial">에디토리얼 클래식 (Vogue)</option>
                <option value="dark-luxury">다크 럭셔리 (Cannes)</option>
                <option value="swiss-modern">스위스 모던 그리드 (Zurich)</option>
                <option value="cinema">시네마 에디토리얼 (35mm)</option>
                <option value="bold">볼드 임팩트 (Bold)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 font-semibold">레이아웃 양식:</span>
              <select
                value={activeArchetype}
                onChange={(e) => handleArchetypeChange(e.target.value as any)}
                className="bg-black/80 border border-amber-400/60 rounded px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="magazine-cover">보그 매거진 커버 (Vogue Top Masthead)</option>
                <option value="cinematic-letterbox">영화제 시네마 레터박스 (Festival 2.39:1 + 월계관)</option>
                <option value="frame-passepartout">미술관 파스파르투 액자 (Museum Matte Frame)</option>
                <option value="analog-contact-sheet">35mm 필름 콘택트 시트 (Kodak Sprockets)</option>
                <option value="swiss-grid">스위스 비대칭 그리드 (Swiss Grid + 세로 리본)</option>
                <option value="stacked-monumental">볼드 2단 스택 임팩트 (Stacked Monumental)</option>
                <option value="zen-vertical">동양식 버티컬 젠 (Zen Vertical + 붉은 인장)</option>
                <option value="agency-minimal-caa">CAA 공식 디스패치 (Agency Minimal Wire)</option>
              </select>
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-lg">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRatio(r)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  activeRatio.id === r.id
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {r.id}
              </button>
            ))}
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAiAutoTune}
              className="px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 폰트 큐레이팅</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 text-xs flex items-center gap-1 transition-colors"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? '복사됨' : 'JSON 복사'}</span>
            </button>

            <div className="flex rounded-lg overflow-hidden border border-amber-400">
              <button
                onClick={() => handleDownload('png')}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG 다운로드</span>
              </button>
              <button
                onClick={() => handleDownload('jpeg')}
                className="px-2 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold border-l border-amber-600/30 transition-colors"
                title="JPG 다운로드"
              >
                JPG
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Studio Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Source Photos & Presets Catalog (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Photos Box */}
            <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>배우 사진 선택 (11종 샘플)</span>
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (ev.target?.result) setPhotoSrc(ev.target.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-amber-400 hover:text-amber-300"
                >
                  + 사진 업로드
                </button>
              </div>

              {/* Photo Filter Categories */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] no-scrollbar">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'birthday', label: '생일' },
                  { id: 'daily', label: '일상' },
                  { id: 'behind', label: '촬영 비하인드' },
                  { id: 'casting', label: '캐스팅' },
                  { id: 'awards', label: '시상식' },
                  { id: 'first-pitch', label: '시구' },
                  { id: 'gv', label: 'GV' },
                  { id: 'fanmeeting', label: '팬미팅' },
                  { id: 'poster', label: '포스터' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPhotoCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-colors ${
                      selectedPhotoCategory === cat.id
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {SAMPLE_PHOTOS
                  .filter((s) => selectedPhotoCategory === 'all' || s.topic === selectedPhotoCategory || s.category === selectedPhotoCategory)
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setPhotoSrc(s.dataUrl);
                        setActorNameText(s.actor);
                      }}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all text-left group ${
                        photoSrc === s.dataUrl
                          ? 'border-amber-400 ring-2 ring-amber-400/20'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={s.dataUrl}
                        alt={s.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1 left-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-amber-300 border border-white/10">
                          {s.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-1.5">
                        <span className="text-[10px] text-zinc-100 font-semibold truncate">{s.actor}</span>
                        <span className="text-[8px] text-zinc-400 truncate">{s.name.split('—')[0]}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Quick Preset Variations */}
            <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Layout className="w-3.5 h-3.5 text-amber-400" />
                <span>현재 주제의 레이아웃 변형</span>
              </span>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {allPresets
                  .filter((p) => p.topic === activePreset.topic)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPresetItem(p)}
                      className={`w-full p-2.5 rounded-lg text-left border transition-all text-xs ${
                        activePreset.id === p.id
                          ? 'border-amber-400/80 bg-amber-400/10 text-white'
                          : 'border-white/5 bg-black/20 text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                      }`}
                    >
                      <div className="font-semibold text-zinc-200">{p.nameKo}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {p.description}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Canvas Viewport (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full p-4 bg-[#121215] border border-white/10 rounded-xl space-y-3 flex flex-col items-center">
              {/* Canvas Toolbar */}
              <div className="w-full flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span>캔버스: {activeRatio.width} × {activeRatio.height}px</span>
                  {isRendering && (
                    <span className="text-amber-400 text-[10px] flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>렌더링...</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[11px] text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showFaceSafeGuide}
                      onChange={(e) => setShowFaceSafeGuide(e.target.checked)}
                      className="rounded border-white/20 bg-black/40 text-amber-400"
                    />
                    <span>얼굴 안전영역 가이드</span>
                  </label>

                  <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded p-0.5">
                    <button
                      onClick={() => setZoomScale((z) => Math.max(0.4, z - 0.1))}
                      className="p-1 hover:text-white"
                      title="축소"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] px-1 font-mono">{Math.round(zoomScale * 100)}%</span>
                    <button
                      onClick={() => setZoomScale((z) => Math.min(1.4, z + 0.1))}
                      className="p-1 hover:text-white"
                      title="확대"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setZoomScale(1)}
                      className="p-1 hover:text-white"
                      title="100%"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport Frame */}
              <div
                className="relative overflow-hidden rounded-lg border border-white/20 shadow-2xl bg-black flex items-center justify-center transition-transform"
                style={{
                  maxWidth: '100%',
                  maxHeight: '620px'
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="max-h-[580px] w-auto h-auto object-contain block transition-all"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center'
                  }}
                />

                {/* Face Safe-Area Visual Overlay */}
                {showFaceSafeGuide && (
                  <div
                    className="absolute pointer-events-none border-2 border-emerald-400/70 border-dashed rounded bg-emerald-400/5 flex items-start justify-center p-2"
                    style={{
                      top: '20%',
                      left: '20%',
                      right: '20%',
                      height: '42%'
                    }}
                  >
                    <span className="text-[10px] font-mono text-emerald-300 bg-black/70 px-1.5 py-0.5 rounded">
                      FACE SAFE ZONE (타이포 및 로고 침범 금지)
                    </span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-zinc-400 text-center">
                * 캔버스 렌더러는 4:5 Instagram (1080×1350) 해상도로 실시간 초정밀 벡터 합성됩니다.
              </div>
            </div>
          </div>

          {/* Right Column: Precision Typography & Logo Sliders (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Typography Section */}
            <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-4">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>타이포그래피 정밀 조정</span>
              </span>

              {/* Main Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">메인 타이틀</span>
                  <select
                    value={titleFont}
                    onChange={(e) => setTitleFont(e.target.value)}
                    className="bg-black/60 border border-white/10 rounded px-2 py-0.5 text-[11px] text-amber-300 font-mono"
                  >
                    {FONT_LIBRARY.map((f) => (
                      <option key={f.id} value={f.family}>
                        {f.name} ({f.category})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 rounded text-xs text-white uppercase font-semibold"
                />

                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-zinc-400 block mb-0.5">크기 ({titleSize}px)</span>
                    <input
                      type="range"
                      min={36}
                      max={96}
                      value={titleSize}
                      onChange={(e) => setTitleSize(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-400 block mb-0.5">자간 ({titleSpacing}px)</span>
                    <input
                      type="range"
                      min={0}
                      max={18}
                      value={titleSpacing}
                      onChange={(e) => setTitleSpacing(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                  <div>
                    <span className="text-zinc-400 block mb-0.5">Y 위치 ({titleY}%)</span>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={titleY}
                      onChange={(e) => setTitleY(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Actor Name */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">배우명 / 인물 표기</span>
                  <select
                    value={actorFont}
                    onChange={(e) => setActorFont(e.target.value)}
                    className="bg-black/60 border border-white/10 rounded px-2 py-0.5 text-[11px] text-zinc-300 font-mono"
                  >
                    <option value="Noto Serif KR">Noto Serif KR (명조)</option>
                    <option value="Noto Sans KR">Noto Sans KR (고딕)</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={actorNameText}
                  onChange={(e) => setActorNameText(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 rounded text-xs text-white font-medium"
                />
              </div>

              {/* Subtitle & Badge */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                <div>
                  <span className="text-zinc-400 block mb-1">서브 타이틀</span>
                  <input
                    type="text"
                    value={subtitleText}
                    onChange={(e) => setSubtitleText(e.target.value)}
                    className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded text-xs text-zinc-300 uppercase"
                  />
                </div>
                <div>
                  <span className="text-zinc-400 block mb-1">태그 배지</span>
                  <input
                    type="text"
                    value={kickerText}
                    onChange={(e) => setKickerText(e.target.value)}
                    className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded text-xs text-amber-300 uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Layout Graphic & Frame Elements */}
            <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Layout className="w-3.5 h-3.5 text-amber-400" />
                <span>특수 레이아웃 그래픽 요소</span>
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={showFestivalLaurel}
                    onChange={(e) => setShowFestivalLaurel(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-400"
                  />
                  <span className="text-[11px] text-zinc-300">영화제 월계관</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={showSprockets}
                    onChange={(e) => setShowSprockets(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-400"
                  />
                  <span className="text-[11px] text-zinc-300">35mm 필름 타공</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={showBarcode}
                    onChange={(e) => setShowBarcode(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-400"
                  />
                  <span className="text-[11px] text-zinc-300">매거진 바코드</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={showVerticalRibbon}
                    onChange={(e) => setShowVerticalRibbon(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-400"
                  />
                  <span className="text-[11px] text-zinc-300">세로 리본 텍스트</span>
                </label>
              </div>
            </div>

            {/* Logo Relative Coordinate Engine */}
            <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-4">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>로고 상대좌표(%) & 브랜드 배치 엔진</span>
              </span>

              {/* Logo Select */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">선택된 로고</span>
                <select
                  value={activeLogo.id}
                  onChange={(e) => {
                    const l = allLogos.find((item) => item.id === e.target.value) || allLogos[0];
                    setActiveLogo(l);
                    onSelectLogo(l);
                  }}
                  className="bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-amber-300"
                >
                  {allLogos.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Anchor Dropdown */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">기준 앵커 (Anchor)</span>
                <select
                  value={logoAnchor}
                  onChange={(e) => setLogoAnchor(e.target.value as LogoPosition['anchor'])}
                  className="bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-zinc-200"
                >
                  <option value="bottom-right">우하단 (Bottom-Right)</option>
                  <option value="bottom-left">좌하단 (Bottom-Left)</option>
                  <option value="top-right">우상단 (Top-Right)</option>
                  <option value="top-left">좌상단 (Top-Left)</option>
                  <option value="center">중앙 (Center)</option>
                </select>
              </div>

              {/* Relative Coordinates Sliders */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-0.5">
                    <span>X 좌표 (X Percent)</span>
                    <span className="font-mono text-zinc-200">{logoX}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={logoX}
                    onChange={(e) => setLogoX(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-0.5">
                    <span>Y 좌표 (Y Percent)</span>
                    <span className="font-mono text-zinc-200">{logoY}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={logoY}
                    onChange={(e) => setLogoY(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-0.5">
                    <span>로고 너비 비율 (Width Percent)</span>
                    <span className="font-mono text-zinc-200">{logoW}%</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={30}
                    value={logoW}
                    onChange={(e) => setLogoW(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-zinc-300">
                    <input
                      type="checkbox"
                      checked={logoInvert}
                      onChange={(e) => setLogoInvert(e.target.checked)}
                      className="rounded border-white/20 bg-black/40 text-amber-400"
                    />
                    <span>명도 대비 자동 반전 (White/Dark)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
