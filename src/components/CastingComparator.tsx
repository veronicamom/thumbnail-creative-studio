import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Sliders,
  Sparkles,
  Maximize2,
  Check,
  Type,
  ZoomIn,
  Split,
  Eye,
  ShieldCheck,
  Info,
  Image as ImageIcon,
  Upload,
  Cake,
  Film,
  Sun,
  Clapperboard
} from 'lucide-react';
import { AgencyLogo, AspectRatioConfig, DesignPreset } from '../types/studio';
import {
  ASPECT_RATIOS,
  CASTING_8_PRESETS,
  BIRTHDAY_8_PRESETS,
  DAILY_6_PRESETS,
  BEHIND_6_PRESETS,
  AGENCY_LOGOS
} from '../data/defaultData';
import { SAMPLE_PHOTOS, SamplePhoto } from '../data/sampleImages';
import { renderAgencyThumbnail } from '../utils/canvasRenderer';

interface CastingComparatorProps {
  referencePhotoUrl: string;
  presets: DesignPreset[];
  activeLogo: AgencyLogo;
  onOpenInStudio: (preset: DesignPreset, photoUrl: string, captionText: string) => void;
}

interface RenderedCard {
  preset: DesignPreset;
  renderedUrl: string;
  fontSpec: {
    titleFont: string;
    bodyFont: string;
    license: string;
  };
}

export const CastingComparator: React.FC<CastingComparatorProps> = ({
  referencePhotoUrl,
  presets,
  activeLogo,
  onOpenInStudio
}) => {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioConfig>(ASPECT_RATIOS[0]);
  const [activeCategory, setActiveCategory] = useState<'birthday' | 'daily' | 'behind' | 'casting'>('birthday');
  const [currentPhoto, setCurrentPhoto] = useState<string>(referencePhotoUrl);
  const [customActor, setCustomActor] = useState('배우 서유진');
  const [customTitle, setCustomTitle] = useState('HAPPY BIRTHDAY');
  const [currentLogo, setCurrentLogo] = useState<AgencyLogo>(
    AGENCY_LOGOS.find((l) => l.id === 'logo-blanc') || activeLogo
  );
  const [renderedList, setRenderedList] = useState<RenderedCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'split-compare'>('grid');

  const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fonts specifications metadata per presets
  const fontSpecs: Record<string, { titleFont: string; bodyFont: string; license: string }> = {
    // Birthday 8 Presets
    'birthday-01-romantic-signature': {
      titleFont: 'Allura (필기체 -8°)',
      bodyFont: 'Cormorant Garamond / Montserrat',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-02-classic-editorial': {
      titleFont: 'Cormorant Garamond (2줄 압축)',
      bodyFont: 'Montserrat / Cormorant',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-03-soft-blush': {
      titleFont: 'Libre Baskerville (3줄 스택)',
      bodyFont: 'Cormorant Garamond / Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-04-midnight-luxury': {
      titleFont: 'Bodoni Moda (어깨 하단 8px 자간)',
      bodyFont: 'Montserrat (별 장식)',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-05-monochrome-statement': {
      titleFont: 'Bodoni Moda (118px 핑크 세리프)',
      bodyFont: 'Montserrat (흑백 사진 필터)',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-06-pink-celebration': {
      titleFont: 'Playfair Display + 손그림 핑크 하트',
      bodyFont: 'Montserrat / Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-07-cinematic-night': {
      titleFont: 'Montserrat Light + Allura (to you)',
      bodyFont: 'Allura + Montserrat (영화적 감성)',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'birthday-08-floral-minimal': {
      titleFont: 'Cormorant Garamond (27px 미니멀)',
      bodyFont: 'Montserrat (45px 미세 구분선)',
      license: 'SIL OFL 1.1 (검증완료)'
    },

    // Daily 6 Presets
    'daily-01-minimal-diary': {
      titleFont: 'Cormorant Garamond (58px)',
      bodyFont: 'Noto Serif KR / Pretendard',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'daily-02-sunlight-script': {
      titleFont: 'Allura (필기체 골드)',
      bodyFont: 'Cormorant Garamond',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'daily-03-vogue-lifestyle': {
      titleFont: 'Bodoni Moda (96px 마스트헤드)',
      bodyFont: 'Montserrat / 바코드',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'daily-04-passepartout': {
      titleFont: 'Playfair Display (갤러리 액자)',
      bodyFont: 'Montserrat (34px)',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'daily-05-swiss-sunlight': {
      titleFont: 'Space Grotesk (스위스 그리드)',
      bodyFont: 'Pretendard / 십자선',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'daily-06-warm-ambient': {
      titleFont: 'Bodoni Moda (52px)',
      bodyFont: 'Noto Serif KR (명조 감성)',
      license: 'SIL OFL 1.1 (검증완료)'
    },

    // Behind 6 Presets
    'behind-01-contact-sheet': {
      titleFont: 'Space Grotesk + 35mm 타공',
      bodyFont: 'Pretendard / Kodak Portra',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'behind-02-cinematic-filmstrip': {
      titleFont: 'Playfair Display (모니터링)',
      bodyFont: 'Montserrat (3분할 필름)',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'behind-03-festival-letterbox': {
      titleFont: 'DM Serif Display (2.39:1 레터박스)',
      bodyFont: '영화제 월계관 / 빌링 블록',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'behind-04-director-slate': {
      titleFont: 'Archivo Black (82px 볼드)',
      bodyFont: '슬레이트 씬/테이크 배지',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'behind-05-monochrome-archive': {
      titleFont: 'Cormorant Garamond (와이드 자간)',
      bodyFont: '흑백 필름 렌즈 필터',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'behind-06-swiss-index': {
      titleFont: 'Space Grotesk (콜시트 리포트)',
      bodyFont: '비대칭 그리드 / 메타데이터',
      license: 'SIL OFL 1.1 (검증완료)'
    },

    // Casting 8 Presets
    'casting-01-classic-editorial': {
      titleFont: 'Cormorant Garamond Medium',
      bodyFont: 'Pretendard / Montserrat',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-02-signature-script': {
      titleFont: 'Allura (필기체 -8°)',
      bodyFont: 'Montserrat / Pretendard',
      license: 'SIL OFL 1.1 (Bickham 대체)'
    },
    'casting-03-warm-minimal': {
      titleFont: 'Bodoni Moda',
      bodyFont: 'Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-04-cinematic-filmstrip': {
      titleFont: 'Playfair Display',
      bodyFont: 'Montserrat Light',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-05-monochrome-archive': {
      titleFont: 'Cormorant Garamond Light (자간10px)',
      bodyFont: 'Pretendard',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-06-blue-editorial': {
      titleFont: 'Libre Baskerville (#526B95)',
      bodyFont: 'Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-07-midnight-cinema': {
      titleFont: 'Cinzel (All-caps)',
      bodyFont: 'Pretendard / Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    },
    'casting-08-blue-signature': {
      titleFont: 'Pinyon Script (#45658F)',
      bodyFont: 'Noto Serif KR',
      license: 'SIL OFL 1.1 (검증완료)'
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const renderAll8Presets = async () => {
      if (!offscreenCanvasRef.current) return;
      setIsLoading(true);

      const results: RenderedCard[] = [];
      let targetPresets: DesignPreset[] = BIRTHDAY_8_PRESETS;
      if (activeCategory === 'birthday') {
        targetPresets = BIRTHDAY_8_PRESETS;
      } else if (activeCategory === 'daily') {
        targetPresets = DAILY_6_PRESETS;
      } else if (activeCategory === 'behind') {
        targetPresets = BEHIND_6_PRESETS;
      } else {
        targetPresets = CASTING_8_PRESETS;
      }

      for (const preset of targetPresets) {
        if (isCancelled) return;

        const tailoredPreset: DesignPreset = {
          ...preset,
          actorName: {
            ...preset.actorName,
            text: customActor || preset.actorName.text
          }
        };

        try {
          const url = await renderAgencyThumbnail(offscreenCanvasRef.current, {
            imageSrc: currentPhoto,
            preset: tailoredPreset,
            ratioConfig: selectedRatio,
            logo: currentLogo,
            customText: {
              actorName: customActor,
              title:
                customTitle === 'CASTING NEWS' ||
                customTitle === 'HAPPY BIRTHDAY' ||
                customTitle === 'MOMENTS' ||
                customTitle === 'BEHIND THE SCENES'
                  ? preset.title.text
                  : customTitle
            }
          });

          results.push({
            preset: tailoredPreset,
            renderedUrl: url,
            fontSpec: fontSpecs[preset.id] || {
              titleFont: preset.title.font,
              bodyFont: preset.actorName.font,
              license: 'SIL OFL 1.1'
            }
          });
        } catch (e) {
          console.error(`Failed to render preset ${preset.id}:`, e);
        }
      }

      if (!isCancelled) {
        setRenderedList(results);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(renderAll8Presets, 40);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [currentPhoto, selectedRatio, customActor, customTitle, currentLogo, activeCategory]);

  const handleDownloadImage = (url: string, nameKo: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCS_Casting_${nameKo.replace(/\s+/g, '_')}_${selectedRatio.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      {/* Hidden offscreen canvas for rendering */}
      <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3">
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#18181d] border border-white/10 rounded-2xl w-fit">
              <button
                onClick={() => {
                  setActiveCategory('birthday');
                  setCustomTitle('HAPPY BIRTHDAY');
                  setCurrentPhoto(SAMPLE_PHOTOS[0].dataUrl);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'birthday'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Cake className="w-4 h-4" />
                <span>🎂 생일 축하 피드 8종</span>
                <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-pink-200">케이크 화보</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('daily');
                  setCustomTitle('MOMENTS');
                  setCurrentPhoto(SAMPLE_PHOTOS[1].dataUrl);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'daily'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>🌿 일상 화보 6종</span>
                <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white">라벤더 스냅</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('behind');
                  setCustomTitle('BEHIND THE SCENES');
                  setCurrentPhoto(SAMPLE_PHOTOS[2].dataUrl);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'behind'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-400 text-white shadow-lg shadow-sky-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Clapperboard className="w-4 h-4" />
                <span>🎬 촬영 비하인드 6종</span>
                <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-sky-200">현장 모니터링</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('casting');
                  setCustomTitle('CASTING NEWS');
                  setCurrentPhoto(SAMPLE_PHOTOS[3].dataUrl);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeCategory === 'casting'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>📢 캐스팅 뉴스 8종</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>
                  {activeCategory === 'birthday'
                    ? 'CAA·MMA GLOBAL AGENCY BIRTHDAY CELEBRATION FEED (8 PRESETS)'
                    : activeCategory === 'daily'
                    ? 'NATURAL LIGHT LIFESTYLE & MOMENTS DIARY (6 PRESETS)'
                    : activeCategory === 'behind'
                    ? 'CINEMA 35MM BTS & ON-SET MONITORING ARCHIVE (6 PRESETS)'
                    : 'OFFICIAL 8 CASTING PRESETS · COMMERCIAL OFL VERIFIED'}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-manrope flex items-center gap-3">
                <span>
                  {activeCategory === 'birthday'
                    ? '생일 축하 피드 프리셋 8종 — 실시간 대조 비교 매트릭스'
                    : activeCategory === 'daily'
                    ? '일상 / 화보 프리셋 6종 — 자연광 라벤더 스냅 실시간 매트릭스'
                    : activeCategory === 'behind'
                    ? '촬영 비하인드 프리셋 6종 — 35mm 현장 모니터링 실시간 매트릭스'
                    : '캐스팅 뉴스 프리셋 8종 — 공식 보도자료 실시간 대조 매트릭스'}
                </span>
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  activeCategory === 'birthday'
                    ? 'bg-pink-400 text-black'
                    : activeCategory === 'daily'
                    ? 'bg-emerald-400 text-black'
                    : activeCategory === 'behind'
                    ? 'bg-sky-400 text-black'
                    : 'bg-amber-400 text-black'
                }`}>
                  {activeCategory === 'birthday'
                    ? '8 BIRTHDAY'
                    : activeCategory === 'daily'
                    ? '6 DAILY'
                    : activeCategory === 'behind'
                    ? '6 BEHIND'
                    : '8 CASTING'}
                </span>
              </h1>
              <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
                {activeCategory === 'birthday' ? (
                  <>
                    글로벌 에이전시(CAA·MMA) 스타일의 <strong>배우 생일 축하 피드 8종</strong>(로맨틱 필기체, 클래식 매거진, 소프트 핑크 화보, 블랙 럭셔리, 흑백 타이포그래피, 러블리 셀러브레이션, 영화 같은 생일, 플로럴 미니멀)과 딸기 생크림 케이크 화보를 1:1 대조 렌더링합니다.
                  </>
                ) : activeCategory === 'daily' ? (
                  <>
                    자연광 라벤더 꽃밭 일상 화보에 최적화된 <strong>일상 / 라이프스타일 6종</strong>(내추럴 다이어리, 선라이트 시그니처, 보그 라이프스타일, 프렌치 갤러리 액자, 스위스 모던 스냅, 웜 앰비언트)을 실시간으로 렌더링합니다.
                  </>
                ) : activeCategory === 'behind' ? (
                  <>
                    패딩에 대본을 들고 감독과 모니터를 확인하는 리얼 현장 스틸에 맞춘 <strong>촬영 비하인드 6종</strong>(35mm 콘택트 시트, 비디오 빌리지 모니터, 2.39:1 레터박스, 볼드 슬레이트, 흑백 다큐, 스위스 인덱스)을 렌더링합니다.
                  </>
                ) : (
                  <>
                    업로드하신 <strong>배우 서유진 포트레이트</strong>를 기획안 명세서 8개 프리셋(클래식 에디토리얼, 시그니처 필기체, 웜 미니멀, 시네마틱 필름스트립, 모노크롬 아카이브, 블루 에디토리얼, 미드나잇 시네마, 블루 시그니처)에 1:1 대응하여 렌더링합니다.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Ratio & View Mode Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#121215] border border-white/10 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>8종 그리드</span>
              </button>
              <button
                onClick={() => setViewMode('split-compare')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  viewMode === 'split-compare'
                    ? 'bg-amber-400 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>기획안 원본 콜라주 대조</span>
              </button>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#121215] border border-white/10 rounded-xl">
              {ASPECT_RATIOS.slice(0, 3).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRatio(r)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedRatio.id === r.id
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real Reference Photos Selector Bar (시상식, 시구, GV, 팬미팅, 화보, 작품 포스터, 캐스팅 등) */}
        <div className="p-4 bg-[#121215] border border-white/10 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-manrope">
                비교용 배우 샘플 사진 선택 (주제별 9종 실사 레퍼런스)
              </span>
              <span className="text-[10px] text-zinc-400">
                (원하는 사진을 클릭하면 8종 프리셋 전체에 즉시 동기화됩니다)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) setCurrentPhoto(ev.target.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-400/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ 내 사진 업로드</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
            {SAMPLE_PHOTOS.map((sample) => {
              const isSelected = currentPhoto === sample.dataUrl;
              return (
                <button
                  key={sample.id}
                  onClick={() => {
                    setCurrentPhoto(sample.dataUrl);
                    setCustomActor(sample.actor);
                    if (sample.topic === 'awards') {
                      setCustomTitle('AWARDS NIGHT');
                    } else if (sample.topic === 'first-pitch') {
                      setCustomTitle('FIRST PITCH');
                    } else if (sample.topic === 'gv') {
                      setCustomTitle('SPECIAL GV');
                    } else if (sample.topic === 'fanmeeting') {
                      setCustomTitle('FAN MEETING');
                    } else if (sample.topic === 'daily') {
                      setCustomTitle('VOGUE EDITORIAL');
                    } else if (sample.topic === 'poster') {
                      setCustomTitle('ORIGINAL POSTER');
                    } else {
                      setCustomTitle('CASTING NEWS');
                    }
                  }}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all text-left flex flex-col justify-between group ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg scale-[1.03] z-10'
                      : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img
                    src={sample.dataUrl}
                    alt={sample.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-md ${
                        isSelected
                          ? 'bg-amber-400 text-black'
                          : 'bg-black/80 text-zinc-300 border border-white/10'
                      }`}
                    >
                      {sample.badge}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-1.5 pt-4">
                    <p className="text-[10px] font-semibold text-white truncate">{sample.actor}</p>
                    <p className="text-[8px] text-zinc-400 truncate">{sample.name.split('—')[0]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Controller Bar */}
        <div className="p-4 bg-[#121215] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <Type className="w-4 h-4 text-amber-400" />
              <span>실시간 배우명:</span>
              <input
                type="text"
                value={customActor}
                onChange={(e) => setCustomActor(e.target.value)}
                className="px-3 py-1 bg-black/60 border border-white/10 rounded text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400 w-32"
                placeholder="배우명 입력"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <span>적용 로고:</span>
              <select
                value={currentLogo.id}
                onChange={(e) => {
                  const found = AGENCY_LOGOS.find((l) => l.id === e.target.value);
                  if (found) setCurrentLogo(found);
                }}
                className="px-3 py-1 bg-black/60 border border-white/10 rounded text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
              >
                {AGENCY_LOGOS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>10종 오픈폰트 상업용·서버 자동생성 검증 완료 (SIL OFL 1.1)</span>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-10 text-center text-xs text-amber-400 flex items-center justify-center gap-2 bg-[#121215] rounded-2xl border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>캐스팅 사진에 8개 세부 레이아웃 엔진과 지정 서체를 렌더링 중입니다...</span>
          </div>
        )}

        {/* VIEW MODE 1: SPLIT COLLAGE COMPARATOR */}
        {viewMode === 'split-compare' && (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-r from-amber-950/20 via-black to-[#121215] border border-amber-400/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-black font-bold">
                  <Split className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">기획안 8종 원본 콜라주 vs 실시간 렌더링 1:1 대조</h3>
                  <p className="text-xs text-zinc-400">
                    좌측의 AI 기획안 원본 이미지(8개 디자인 콜라주)와 우측의 자동 렌더링 결과물을 나란히 비교합니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewModalUrl(
                  activeCategory === 'birthday'
                    ? '/assets/aistudio/8_____________________________________e989a7e8.png'
                    : '/assets/aistudio/___________________________________________________89c637c3.png'
                )}
                className="px-3.5 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs font-semibold text-amber-300 hover:bg-white/10 flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>원본 콜라주 전체화면</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: Original Collage Image */}
              <div className="bg-[#121215] border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    [ORIGINAL AI SPECIFICATION COLLAGE]
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {activeCategory === 'birthday' ? '생일 8종 기획안 원본 참조' : '캐스팅 8종 기획안 원본 참조'}
                  </span>
                </div>
                <div
                  onClick={() => setPreviewModalUrl(
                    activeCategory === 'birthday'
                      ? '/assets/aistudio/8_____________________________________e989a7e8.png'
                      : '/assets/aistudio/___________________________________________________89c637c3.png'
                  )}
                  className="relative rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-black"
                >
                  <img
                    src={
                      activeCategory === 'birthday'
                        ? '/assets/aistudio/8_____________________________________e989a7e8.png'
                        : '/assets/aistudio/___________________________________________________89c637c3.png'
                    }
                    alt={activeCategory === 'birthday' ? 'Birthday 8-Preset Collage' : 'Casting 8-Preset Collage'}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain block hover:scale-[1.01] transition-transform duration-200"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded text-[10px] text-white flex items-center gap-1 border border-white/20">
                    <Maximize2 className="w-3 h-3 text-amber-400" />
                    <span>클릭하여 확대</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">
                  {activeCategory === 'birthday' ? (
                    <>
                      상단: 01 Romantic Signature · 02 Classic Editorial · 03 Soft Blush · 04 Midnight Luxury
                      <br />
                      하단: 05 Monochrome Statement · 06 Pink Celebration · 07 Cinematic Night · 08 Floral Minimal
                    </>
                  ) : (
                    <>
                      상단: 01 Classic Editorial · 02 Signature Script · 03 Warm Minimal · 04 Cinematic Filmstrip
                      <br />
                      하단: 05 Monochrome Archive · 06 Blue Editorial · 07 Midnight Cinema · 08 Blue Signature
                    </>
                  )}
                </p>
              </div>

              {/* Right: Live Rendered 8-Grid Slices */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    [LIVE TCS ENGINE RENDERED OUTPUTS]
                  </span>
                  <span className="text-[11px] text-zinc-400">배우 서유진 사진 + OFL 서체 합성</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {renderedList.map((card, idx) => (
                    <div
                      key={card.preset.id}
                      onClick={() => setPreviewModalUrl(card.renderedUrl)}
                      className="bg-[#121215] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-amber-400 transition-all group"
                    >
                      <div className="px-2 py-1 bg-black/70 text-[10px] font-bold text-amber-300 truncate">
                        {card.preset.nameKo}
                      </div>
                      <div className="aspect-[4/5] bg-black overflow-hidden relative">
                        <img
                          src={card.renderedUrl}
                          alt={card.preset.nameKo}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-2 bg-black/40">
                        <p className="text-[9px] text-zinc-400 truncate">
                          {card.fontSpec.titleFont}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: 8-CARD COMPREHENSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderedList.map((card) => (
            <div
              key={card.preset.id}
              className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-400/60 transition-all shadow-xl"
            >
              {/* Card Header */}
              <div className="px-4 py-3 bg-black/60 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-amber-400 font-manrope">
                    {card.preset.nameKo}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    {card.preset.nameEn}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewModalUrl(card.renderedUrl)}
                  className="text-zinc-400 hover:text-white p-1 rounded hover:bg-white/10"
                  title="확대 보기"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Rendered Canvas Preview */}
              <div
                onClick={() => setPreviewModalUrl(card.renderedUrl)}
                className="relative aspect-[4/5] bg-black overflow-hidden cursor-pointer"
              >
                <img
                  src={card.renderedUrl}
                  alt={card.preset.nameKo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>크게 보기</span>
                  </span>
                </div>
              </div>

              {/* Specification Specs & Action Buttons */}
              <div className="p-4 space-y-3 bg-[#121215]">
                {/* Font Spec Pill */}
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-mono">제목 폰트</span>
                    <span className="text-amber-300 font-medium truncate max-w-[150px]">
                      {card.fontSpec.titleFont}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500 font-mono">보조 폰트</span>
                    <span className="text-zinc-300 font-medium truncate max-w-[150px]">
                      {card.fontSpec.bodyFont}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5">
                    <span className="text-zinc-500 font-mono">라이선스</span>
                    <span className="text-emerald-400 font-mono text-[9px] font-semibold">
                      {card.fontSpec.license}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed min-h-[36px] line-clamp-2">
                  {card.preset.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => onOpenInStudio(card.preset, currentPhoto, `${customActor} ${customTitle}`)}
                    className="py-1.5 px-2 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Sliders className="w-3 h-3 text-amber-400" />
                    <span>스튜디오</span>
                  </button>

                  <button
                    onClick={() => handleDownloadImage(card.renderedUrl, card.preset.nameKo)}
                    className="py-1.5 px-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG 저장</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Zoom Preview Modal */}
      {previewModalUrl && (
        <div
          onClick={() => setPreviewModalUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl p-2"
          >
            <button
              onClick={() => setPreviewModalUrl(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold"
            >
              ✕
            </button>
            <img
              src={previewModalUrl}
              alt="Zoomed preview"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl block"
            />
          </div>
        </div>
      )}
    </div>
  );
};
