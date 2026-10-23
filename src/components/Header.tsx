import { Send, Sliders, Layout, Type, Image as ImageIcon, FileText, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export type TabType = 'simulator' | 'studio' | 'compare' | 'templates' | 'fonts' | 'license' | 'logos' | 'plan';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onQuickCreate: () => void;
  isBotConfigured: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onQuickCreate,
  isBotConfigured
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('simulator')}
            className="text-left font-manrope text-base font-extrabold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="font-bodoni italic text-amber-400 text-lg">TCS</span>
            <span>TELEGRAM CREATIVE STUDIO</span>
          </button>
        </div>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <button
            onClick={() => onTabChange('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>봇 시뮬레이터</span>
          </button>

          <button
            onClick={() => onTabChange('compare')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold">캐스팅 8대 양식 비교</span>
          </button>

          <button
            onClick={() => onTabChange('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'studio'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>스튜디오 편집기</span>
          </button>

          <button
            onClick={() => onTabChange('templates')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>템플릿 라이브러리 (54+)</span>
          </button>

          <button
            onClick={() => onTabChange('fonts')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'fonts'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>AI 폰트 큐레이터</span>
          </button>

          <button
            onClick={() => onTabChange('license')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'license'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">폰트 라이선스 관리</span>
          </button>

          <button
            onClick={() => onTabChange('logos')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'logos'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>로고 & 배우 프로필</span>
          </button>

          <button
            onClick={() => onTabChange('plan')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'plan'
                ? 'text-white border-b-2 border-amber-400 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>통합 구현계획서 v1.1</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {isBotConfigured ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BOT READY</span>
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <span>STANDBY</span>
            </span>
          )}

          <button
            onClick={onQuickCreate}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            + 빠른 썸네일 제작
          </button>
        </div>
      </div>
    </header>
  );
};
