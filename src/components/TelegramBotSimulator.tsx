import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Upload,
  Sparkles,
  Download,
  Settings,
  Check,
  RefreshCw,
  Sliders,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  AgencyLogo,
  AspectRatioConfig,
  DesignPreset,
  TelegramConfig,
  TopicId
} from '../types/studio';
import {
  ASPECT_RATIOS,
  TOPICS
} from '../data/defaultData';
import { SAMPLE_PHOTOS, SamplePhoto } from '../data/sampleImages';
import { renderAgencyThumbnail } from '../utils/canvasRenderer';
import { parseTelegramCaption, getThreeVariantPresets } from '../utils/aiEngine';

interface TelegramBotSimulatorProps {
  presets: DesignPreset[];
  activeLogo: AgencyLogo;
  telegramConfig: TelegramConfig;
  onUpdateTelegramConfig: (cfg: TelegramConfig) => void;
  onOpenInStudio: (preset: DesignPreset, photoUrl: string, captionText: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  photoUrl?: string;
  type?: 'text' | 'topic-selection' | 'preview-variants' | 'final-approved';
  topicId?: TopicId;
  variants?: {
    letter: 'A' | 'B' | 'C';
    name: string;
    style: string;
    preset: DesignPreset;
    renderedUrl: string;
  }[];
  selectedVariant?: {
    letter: 'A' | 'B' | 'C';
    name: string;
    preset: DesignPreset;
    renderedUrl: string;
  };
}

export const TelegramBotSimulator: React.FC<TelegramBotSimulatorProps> = ({
  presets,
  activeLogo,
  telegramConfig,
  onUpdateTelegramConfig,
  onOpenInStudio
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('배우 서유진 공식 에이전시 캐스팅 뉴스');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_PHOTOS[0].dataUrl);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioConfig>(ASPECT_RATIOS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tempToken, setTempToken] = useState(telegramConfig.botToken);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize initial greeting message once
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          time: '09:00',
          text: `안녕하세요. Telegram Creative Studio (TCS) 봇입니다.\n\n사진과 함께 배우명, 작품명, 행사 캡션을 보내주시면 설정된 ${activeLogo.agencyName} 브랜드 로고와 폰트 규칙을 자동 반영해 CAA / MMA 스타일의 고품질 썸네일을 제작해 드립니다.\n\n아래 샘플 사진을 선택하거나 직접 사진을 업로드해 보세요.`
        }
      ]);
    }
  }, []);

  // Auto scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // User sends photo + caption
  const handleSend = async () => {
    if (!selectedPhoto) return;

    const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsgId = 'user-' + Date.now();

    // 1. Add user message
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      time,
      photoUrl: selectedPhoto,
      text: inputText
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsProcessing(true);

    // 2. Parse caption using NLP / AI Heuristics
    const meta = parseTelegramCaption(inputText);

    // Wait slightly to simulate realistic Telegram processing latency (600ms)
    setTimeout(async () => {
      // 3. Bot responds with Topic Selector and Auto-detected Notice
      const botAckId = 'bot-ack-' + Date.now();
      const detectedTopicDef = TOPICS.find((t) => t.id === meta.topic);

      const ackMessage: ChatMessage = {
        id: botAckId,
        sender: 'bot',
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        type: 'topic-selection',
        topicId: meta.topic,
        text: `이미지를 확인했습니다 (${selectedRatio.label}).\n캡션 분석 결과: [${detectedTopicDef?.nameKo}] 주제가 자동 감지되었습니다.\n\n제작할 에이전시 템플릿 주제를 선택해주세요:`
      };

      setMessages((prev) => [...prev, ackMessage]);
      setIsProcessing(false);
    }, 600);
  };

  // When user clicks a topic button (e.g. 캐스팅, 시구, 시상식...)
  const handleSelectTopic = async (topicId: TopicId) => {
    setIsProcessing(true);
    const meta = parseTelegramCaption(inputText);
    const topicDef = TOPICS.find((t) => t.id === topicId);

    // Get 3 curated style variations
    const { variantA, variantB, variantC } = getThreeVariantPresets(presets, topicId);

    // Render all 3 variants on offscreen canvas
    const renderedVariants: ChatMessage['variants'] = [];

    const variantsToRender = topicId === 'birthday'
      ? [
          {
            letter: 'A' as const,
            name: '01. 로맨틱 필기체 (-8° Allura)',
            preset: presets.find((p) => p.id === 'birthday-01-romantic-signature') || variantA
          },
          {
            letter: 'B' as const,
            name: '02. 클래식 매거진 (Cormorant Garamond)',
            preset: presets.find((p) => p.id === 'birthday-02-classic-editorial') || variantB
          },
          {
            letter: 'C' as const,
            name: '04. 블랙 럭셔리 (Bodoni Moda)',
            preset: presets.find((p) => p.id === 'birthday-04-midnight-luxury') || variantC
          }
        ]
      : topicId === 'daily'
      ? [
          {
            letter: 'A' as const,
            name: '01. 내추럴 다이어리 (세리프 에디토리얼)',
            preset: presets.find((p) => p.id === 'daily-01-minimal-diary') || variantA
          },
          {
            letter: 'B' as const,
            name: '02. 선라이트 시그니처 (골드 필기체)',
            preset: presets.find((p) => p.id === 'daily-02-sunlight-script') || variantB
          },
          {
            letter: 'C' as const,
            name: '03. 보그 라이프스타일 (상단 마스트헤드)',
            preset: presets.find((p) => p.id === 'daily-03-vogue-lifestyle') || variantC
          }
        ]
      : topicId === 'behind'
      ? [
          {
            letter: 'A' as const,
            name: '01. 35mm 콘택트 시트 (필름 타공)',
            preset: presets.find((p) => p.id === 'behind-01-contact-sheet') || variantA
          },
          {
            letter: 'B' as const,
            name: '02. 비디오 빌리지 모니터 (현장 스틸)',
            preset: presets.find((p) => p.id === 'behind-02-cinematic-filmstrip') || variantB
          },
          {
            letter: 'C' as const,
            name: '04. 볼드 슬레이트 디스패치 (씬/테이크)',
            preset: presets.find((p) => p.id === 'behind-04-director-slate') || variantC
          }
        ]
      : [
          {
            letter: 'A' as const,
            name: variantA.layoutArchetype === 'magazine-cover'
              ? '보그 매거진 마스트헤드 (상단 전면)'
              : variantA.nameKo,
            preset: variantA
          },
          {
            letter: 'B' as const,
            name: variantB.layoutArchetype === 'cinematic-letterbox'
              ? '영화제 시네마 레터박스 (월계관)'
              : variantB.layoutArchetype === 'analog-contact-sheet'
              ? '35mm 필름 콘택트 시트 (타공)'
              : variantB.nameKo,
            preset: variantB
          },
          {
            letter: 'C' as const,
            name: variantC.layoutArchetype === 'frame-passepartout'
              ? '미술관 파스파르투 액자'
              : variantC.layoutArchetype === 'stacked-monumental'
              ? '볼드 2단 스택 임팩트'
              : variantC.nameKo,
            preset: variantC
          }
        ];

    if (offscreenCanvasRef.current) {
      for (const item of variantsToRender) {
        try {
          const url = await renderAgencyThumbnail(offscreenCanvasRef.current, {
            imageSrc: selectedPhoto,
            preset: item.preset,
            ratioConfig: selectedRatio,
            logo: activeLogo,
            customText: {
              actorName: meta.actorName,
              title: meta.title
            }
          });

          renderedVariants.push({
            letter: item.letter,
            name: item.name,
            style: item.preset.style,
            preset: item.preset,
            renderedUrl: url
          });
        } catch (e) {
          console.error('Render error:', e);
        }
      }
    }

    const previewMsg: ChatMessage = {
      id: 'bot-preview-' + Date.now(),
      sender: 'bot',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: 'preview-variants',
      topicId,
      text: `[${topicDef?.nameKo}] 썸네일 3종 제작이 완료되었습니다.\n마음에 드는 디자인을 선택하거나 다시 제작을 요청하세요.`,
      variants: renderedVariants
    };

    setMessages((prev) => [...prev, previewMsg]);
    setIsProcessing(false);
  };

  // When user selects A, B, or C variant
  const handleApproveVariant = (variant: NonNullable<ChatMessage['variants']>[0]) => {
    const finalMsg: ChatMessage = {
      id: 'bot-final-' + Date.now(),
      sender: 'bot',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: 'final-approved',
      text: `[${variant.letter}안: ${variant.name}]으로 확정되었습니다.\n고해상도 원본 파일이 생성되었습니다.`,
      selectedVariant: variant
    };

    setMessages((prev) => [...prev, finalMsg]);
  };

  // Direct download image
  const handleDownloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-4 lg:p-8">
      {/* Offscreen Canvas for background renders */}
      <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Photo Source & Caption Controller */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-white/10 bg-[#121215] p-5 rounded-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-semibold tracking-wide text-zinc-200 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>텔레그램 이미지 전송 준비</span>
              </h2>
              <button
                onClick={() => setShowConfigModal(true)}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                title="봇 토큰 및 허용 사용자 설정"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>봇 설정</span>
              </button>
            </div>

            {/* Photo Selection */}
            <div>
              <label className="text-xs text-zinc-400 block mb-2 font-medium">
                1. 사진 선택 (샘플 클릭 또는 파일 업로드)
              </label>

              <div className="grid grid-cols-3 gap-2 mb-3 max-h-72 overflow-y-auto pr-1">
                {SAMPLE_PHOTOS.map((sample: SamplePhoto) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedPhoto(sample.dataUrl);
                      if (sample.topic === 'awards') {
                        setInputText('배우 김서현 칸 국제영화제 레드카펫 시상식 참석');
                      } else if (sample.topic === 'first-pitch') {
                        setInputText('배우 박도윤 챔피언십 개막전 시구 비하인드');
                      } else if (sample.topic === 'gv') {
                        setInputText('배우 정유나 영화 《미지의 서울》 GV 무대인사');
                      } else if (sample.topic === 'fanmeeting') {
                        setInputText('배우 이연 2026 단독 팬미팅 With You 개최 소식');
                      } else if (sample.topic === 'daily') {
                        setInputText('배우 한소희 보그 코리아 하이엔드 뷰티 화보 공개');
                      } else if (sample.topic === 'poster') {
                        setInputText('드라마 《다시, 봄》 서유진 류경수 주연 공식 티저 포스터');
                      } else if (sample.topic === 'casting') {
                        setInputText(`배우 ${sample.actor.replace('배우 ', '')} 공식 글로벌 캐스팅 뉴스 발표`);
                      } else {
                        setInputText('배우 차은우 시네마 현장 비하인드 스틸');
                      }
                    }}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all text-left group ${
                      selectedPhoto === sample.dataUrl
                        ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={sample.dataUrl}
                      alt={sample.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-amber-300 border border-white/10">
                        {sample.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-1.5">
                      <span className="text-[10px] text-zinc-100 font-medium truncate w-full">
                        {sample.actor}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload Custom File */}
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-lg border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-xs text-zinc-300 flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>내 컴퓨터에서 사진 불러오기</span>
                </button>
              </div>
            </div>

            {/* Ratio Selection */}
            <div>
              <label className="text-xs text-zinc-400 block mb-2 font-medium">
                2. 출력 해상도 및 화면 비율
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio)}
                    className={`px-3 py-2 rounded-lg text-left border transition-all ${
                      selectedRatio.id === ratio.id
                        ? 'border-amber-400/70 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{ratio.label}</div>
                    <div className="text-[10px] text-zinc-400">{ratio.sublabel}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Telegram Message / Caption Input */}
            <div>
              <label className="text-xs text-zinc-400 block mb-2 font-medium flex items-center justify-between">
                <span>3. 텔레그램 메시지 캡션</span>
                <span className="text-[11px] text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI 자동 추출 연동</span>
                </span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="예: 배우 류경수 프로필 및 '야당' 캐스팅 뉴스"
                rows={3}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <p className="text-[11px] text-zinc-400 mt-1.5">
                * 키워드(생일, 시구, 캐스팅, 팬미팅, 배우 이름 등)를 작성하면 AI가 해당 주제를 자동 식별합니다.
              </p>

              {/* Quick Template Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setInputText('배우 서유진 생일 축하 피드 8종 만들어줘');
                    setSelectedPhoto(SAMPLE_PHOTOS[0].dataUrl);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-[11px] text-pink-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>🎂 생일 피드 (케이크)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputText('배우 서유진 라벤더 꽃밭 일상 화보 6종');
                    setSelectedPhoto(SAMPLE_PHOTOS[1].dataUrl);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] text-emerald-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>🌿 일상 화보 (라벤더)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputText('배우 서유진 드라마 촬영장 모니터링 비하인드');
                    setSelectedPhoto(SAMPLE_PHOTOS[2].dataUrl);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-[11px] text-sky-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>🎬 촬영 비하인드 (현장)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputText('배우 서유진 공식 에이전시 캐스팅 뉴스');
                    setSelectedPhoto(SAMPLE_PHOTOS[3].dataUrl);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-[11px] text-amber-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>📢 캐스팅 뉴스</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputText('배우 김서현 칸 영화제 레드카펫 시상식');
                    setSelectedPhoto(SAMPLE_PHOTOS[4].dataUrl);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300 transition-colors flex items-center gap-1"
                >
                  <span>🏆 레드카펫</span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSend}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>텔레그램 봇으로 전송하기</span>
            </button>
          </div>

          {/* Connected Agency Logo summary */}
          <div className="border border-white/10 bg-[#121215] p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] text-zinc-400 block">적용 중인 에이전시 로고</span>
              <span className="text-xs font-semibold text-zinc-200">{activeLogo.agencyName}</span>
              <span className="text-[10px] text-zinc-400 block">
                상대좌표 고정 (우하단 91% · 92% · 너비 15%)
              </span>
            </div>
            <div className="w-24 h-8 bg-black/40 rounded flex items-center justify-center border border-white/10 p-1 text-zinc-200">
              {activeLogo.svgString ? (
                <div
                  className="w-full h-full text-zinc-200"
                  dangerouslySetInnerHTML={{ __html: activeLogo.svgString }}
                />
              ) : (
                <span className="text-[10px] font-mono">CAA LOGO</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Telegram Chat Simulator Interface */}
        <div className="lg:col-span-7 flex flex-col h-[740px] border border-white/10 bg-[#0f0f12] rounded-2xl overflow-hidden shadow-2xl">
          {/* Telegram Header */}
          <div className="px-5 py-3.5 bg-[#18181b] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-black text-xs font-mono">
                TCS
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
                  <span>Creative Studio Bot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {telegramConfig.botUsername} · bot
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([
                  {
                    id: 'reset-' + Date.now(),
                    sender: 'bot',
                    time: '09:00',
                    text: '대화가 초기화되었습니다. 새로운 사진과 주제를 보내주세요.'
                  }
                ])}
                className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                title="대화 초기화"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-black rounded-br-none'
                      : 'bg-[#1e1e24] border border-white/10 text-zinc-100 rounded-bl-none'
                  }`}
                >
                  {/* Photo attachment in user message */}
                  {msg.photoUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-black/10 max-w-[280px]">
                      <img
                        src={msg.photoUrl}
                        alt="Uploaded preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-56"
                      />
                    </div>
                  )}

                  {/* Message Text */}
                  {msg.text && (
                    <p className="whitespace-pre-line font-sans font-medium">{msg.text}</p>
                  )}

                  {/* Time */}
                  <span
                    className={`block text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-black/60 text-right' : 'text-zinc-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {/* Inline Keyboard: Topic Selection */}
                {msg.type === 'topic-selection' && (
                  <div className="mt-2.5 max-w-[92%] grid grid-cols-3 gap-1.5 p-2 bg-[#141418] border border-white/10 rounded-xl">
                    {TOPICS.map((topic) => {
                      const isSuggested = topic.id === msg.topicId;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => handleSelectTopic(topic.id)}
                          className={`py-2 px-2.5 rounded text-[11px] font-medium text-center transition-all ${
                            isSuggested
                              ? 'bg-amber-400 text-black font-bold shadow'
                              : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          {topic.nameKo}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Inline Keyboard & Previews: 3 Variants (A, B, C) */}
                {msg.type === 'preview-variants' && msg.variants && (
                  <div className="mt-3 w-full max-w-[96%] space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {msg.variants.map((v) => (
                        <div
                          key={v.letter}
                          className="bg-[#141418] border border-white/10 rounded-xl p-2.5 space-y-2 group hover:border-amber-400/50 transition-all"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-amber-400">안 {v.letter}</span>
                            <span className="text-[10px] text-zinc-400 truncate">{v.name}</span>
                          </div>

                          <div className="aspect-[4/5] rounded overflow-hidden border border-white/10 bg-black">
                            <img
                              src={v.renderedUrl}
                              alt={v.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col gap-1 pt-1">
                            <button
                              onClick={() => handleApproveVariant(v)}
                              className="w-full py-1.5 px-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-[11px] rounded transition-colors"
                            >
                              [{v.letter} 선택]
                            </button>
                            <button
                              onClick={() => onOpenInStudio(v.preset, selectedPhoto, inputText)}
                              className="w-full py-1 text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Sliders className="w-3 h-3" />
                              <span>스튜디오 수정</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex items-center justify-end gap-2 text-[11px]">
                      <button
                        onClick={() => msg.topicId && handleSelectTopic(msg.topicId)}
                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>다시 제작</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Final Approved Card */}
                {msg.type === 'final-approved' && msg.selectedVariant && (
                  <div className="mt-3 max-w-[340px] bg-[#141418] border border-emerald-500/30 rounded-xl p-3 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                      <Check className="w-4 h-4" />
                      <span>{msg.selectedVariant.name} 확정</span>
                    </div>

                    <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img
                        src={msg.selectedVariant.renderedUrl}
                        alt="Approved thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleDownloadImage(
                            msg.selectedVariant!.renderedUrl,
                            `TCS_${msg.selectedVariant!.preset.topic}_${Date.now()}.png`
                          )
                        }
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>고해상도 다운로드</span>
                      </button>

                      <button
                        onClick={() =>
                          onOpenInStudio(msg.selectedVariant!.preset, selectedPhoto, inputText)
                        }
                        className="py-2 px-3 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs flex items-center gap-1"
                        title="스튜디오에서 추가 편집"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 italic">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>봇이 에이전시 레이아웃과 폰트 자간을 계산하고 있습니다...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Bar */}
          <div className="p-3 bg-[#141418] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지 또는 배우/행사 캡션 입력..."
              className="flex-1 px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isProcessing}
              className="p-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bot Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-lg w-full bg-[#18181b] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">텔레그램 봇 토큰 및 보안 연동</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕ 닫기
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Telegram Bot Token</label>
                <input
                  type="password"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  placeholder="예: 7182938491:AAHk3_..."
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-zinc-200 font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  @BotFather에서 발급받은 토큰을 입력하면 실제 텔레그램 봇과 Webhook 연동이 활성화됩니다.
                </span>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1 font-medium">허용 사용자 화이트리스트 (Telegram User IDs)</label>
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {telegramConfig.allowedUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between px-2.5 py-1.5 bg-black/30 rounded border border-white/5 text-[11px]"
                    >
                      <span>{u.name} ({u.id})</span>
                      <span className="text-amber-400 font-mono text-[10px]">{u.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-lg text-[11px] text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  사내 보안 정책에 따라 화이트리스트에 등록되지 않은 텔레그램 계정의 요청은 자동 차단됩니다.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                취소
              </button>
              <button
                onClick={() => {
                  onUpdateTelegramConfig({
                    ...telegramConfig,
                    botToken: tempToken,
                    isConnected: !!tempToken
                  });
                  setShowConfigModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-colors"
              >
                설정 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
