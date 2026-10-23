import React, { useState, useRef } from 'react';
import {
  Upload,
  Shield,
  Layers,
  Sliders,
  Check,
  User,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { ActorProfile, AgencyLogo, LogoPosition } from '../types/studio';
import { ACTOR_PROFILES, AGENCY_LOGOS, TOPICS } from '../data/defaultData';

interface LogoManagerProps {
  logos: AgencyLogo[];
  activeLogo: AgencyLogo;
  onSelectLogo: (logo: AgencyLogo) => void;
  onAddLogo: (logo: AgencyLogo) => void;
  actorProfiles: ActorProfile[];
  onUpdateActorProfiles: (profiles: ActorProfile[]) => void;
}

export const LogoManager: React.FC<LogoManagerProps> = ({
  logos,
  activeLogo,
  onSelectLogo,
  onAddLogo,
  actorProfiles,
  onUpdateActorProfiles
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'logos' | 'actors'>('logos');

  // Interactive Sandbox state
  const [testRatio, setTestRatio] = useState<'4:5' | '1:1' | '9:16'>('4:5');
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [posX, setPosX] = useState(91);
  const [posY, setPosY] = useState(92);
  const [posW, setPosW] = useState(15);
  const [anchor, setAnchor] = useState<LogoPosition['anchor']>('bottom-right');

  // Custom logo upload state
  const [newLogoName, setNewLogoName] = useState('');
  const [newAgencyName, setNewAgencyName] = useState('');
  const [uploadedLogoData, setUploadedLogoData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Actor state
  const [showNewActorModal, setShowNewActorModal] = useState(false);
  const [newActorKo, setNewActorKo] = useState('');
  const [newActorEn, setNewActorEn] = useState('');
  const [newActorNotes, setNewActorNotes] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadedLogoData(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUploadedLogo = () => {
    if (!uploadedLogoData || !newLogoName) return;

    const newLogo: AgencyLogo = {
      id: 'custom-' + Date.now(),
      name: newLogoName,
      agencyName: newAgencyName || newLogoName.toUpperCase(),
      type: 'png',
      dataUrl: uploadedLogoData,
      isDefault: false,
      styleDescription: '사용자 지정 등록 로고 (PNG/SVG)'
    };

    onAddLogo(newLogo);
    onSelectLogo(newLogo);
    setNewLogoName('');
    setNewAgencyName('');
    setUploadedLogoData(null);
  };

  const handleAddActor = () => {
    if (!newActorKo) return;
    const newProfile: ActorProfile = {
      id: 'actor-' + Date.now(),
      nameKo: newActorKo,
      nameEn: newActorEn || newActorKo.toUpperCase(),
      agency: activeLogo.agencyName,
      defaultTopic: 'casting',
      signatureTitleFont: 'Bodoni Moda',
      signatureActorFont: 'Noto Serif KR',
      preferredLogoId: activeLogo.id,
      tags: ['배우', '프로필'],
      notes: newActorNotes || '신규 등록 배우 프로필'
    };

    onUpdateActorProfiles([...actorProfiles, newProfile]);
    setNewActorKo('');
    setNewActorEn('');
    setNewActorNotes('');
    setShowNewActorModal(false);
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white font-manrope">
              에이전시 브랜드 로고 & 배우 프로필 관리자
            </h1>
            <p className="text-xs text-zinc-400">
              상대좌표(%) 기반 로고 고정 배치 시스템 및 배우별 시그니처 브랜딩 프로필
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-[#121215] border border-white/10 rounded-xl text-xs">
            <button
              onClick={() => setSelectedSubTab('logos')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                selectedSubTab === 'logos'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              로고 자산 및 상대좌표 검증
            </button>
            <button
              onClick={() => setSelectedSubTab('actors')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                selectedSubTab === 'actors'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              배우별 브랜드 프로필 ({actorProfiles.length})
            </button>
          </div>
        </div>

        {selectedSubTab === 'logos' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Registered Logos List & Upload (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>등록된 에이전시 로고 라이브러리</span>
                  </h2>
                  <span className="text-[11px] font-mono text-zinc-400">
                    현재 적용: <strong className="text-amber-400">{activeLogo.name}</strong>
                  </span>
                </div>

                <div className="space-y-3">
                  {logos.map((logo) => {
                    const isSelected = activeLogo.id === logo.id;
                    return (
                      <div
                        key={logo.id}
                        onClick={() => onSelectLogo(logo)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/5 ring-1 ring-amber-400/30'
                            : 'border-white/10 bg-black/30 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{logo.name}</span>
                            {isSelected && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-black font-semibold font-mono">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-400">{logo.agencyName}</div>
                          <div className="text-[10px] text-zinc-400">{logo.styleDescription}</div>
                        </div>

                        {/* Vector SVG preview box */}
                        <div className="w-28 h-10 bg-black/60 border border-white/10 rounded flex items-center justify-center p-2 text-zinc-200 shrink-0">
                          {logo.svgString ? (
                            <div
                              className="w-full h-full text-zinc-200"
                              dangerouslySetInnerHTML={{ __html: logo.svgString }}
                            />
                          ) : logo.dataUrl ? (
                            <img
                              src={logo.dataUrl}
                              alt={logo.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-[10px] font-mono">LOGO</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upload New Agency Logo */}
              <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>새 회사 로고 등록 (PNG / SVG)</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-zinc-400 block mb-1">로고 명칭 (식별용)</label>
                    <input
                      type="text"
                      value={newLogoName}
                      onChange={(e) => setNewLogoName(e.target.value)}
                      placeholder="예: 우리 에이전시 공식 로고 (화이트)"
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">영문 소속사 공식명칭</label>
                    <input
                      type="text"
                      value={newAgencyName}
                      onChange={(e) => setNewAgencyName(e.target.value)}
                      placeholder="예: ARTIST MANAGEMENT GLOBAL"
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white uppercase"
                    />
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png,image/svg+xml"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-lg border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-xs text-zinc-300 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>{uploadedLogoData ? '로고 파일 선택 완료 (변경하기)' : '투명 배경 PNG 또는 SVG 파일 선택'}</span>
                    </button>
                  </div>

                  {uploadedLogoData && (
                    <button
                      onClick={handleSaveUploadedLogo}
                      className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-lg text-xs transition-colors"
                    >
                      로고 라이브러리에 저장 및 활성화
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Relative Percentage Calibration Visualizer (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl space-y-5">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>상대좌표(%) 해상도 불변 검증 샌드박스</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    로고를 픽셀 대신 상대 좌표(X=91%, Y=92%, W=15%)로 저장하여 4:5 인스타 피드, 1:1 정방형, 9:16 스토리 어디서든 동일한 브랜드 비례를 유지합니다.
                  </p>
                </div>

                {/* Ratio & BG Brightness Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-lg">
                    <button
                      onClick={() => setTestRatio('4:5')}
                      className={`px-3 py-1 rounded text-xs ${testRatio === '4:5' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'}`}
                    >
                      4:5 (피드)
                    </button>
                    <button
                      onClick={() => setTestRatio('1:1')}
                      className={`px-3 py-1 rounded text-xs ${testRatio === '1:1' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'}`}
                    >
                      1:1 (정방형)
                    </button>
                    <button
                      onClick={() => setTestRatio('9:16')}
                      className={`px-3 py-1 rounded text-xs ${testRatio === '9:16' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'}`}
                    >
                      9:16 (스토리)
                    </button>
                  </div>

                  <button
                    onClick={() => setIsDarkBg((d) => !d)}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded text-zinc-300 hover:text-white"
                  >
                    배경: {isDarkBg ? '다크 모드' : '라이트 모드'}
                  </button>
                </div>

                {/* Simulated Canvas Box */}
                <div className="w-full flex justify-center py-4 bg-black/40 rounded-xl border border-white/5">
                  <div
                    className={`relative rounded-lg overflow-hidden border shadow-inner transition-all flex flex-col justify-between p-4 ${
                      isDarkBg ? 'bg-[#0f0f12] text-white border-white/20' : 'bg-[#f4f4f5] text-black border-black/20'
                    }`}
                    style={{
                      width: '280px',
                      height: testRatio === '4:5' ? '350px' : testRatio === '1:1' ? '280px' : '480px'
                    }}
                  >
                    {/* Simulated Editorial Text */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono opacity-50 block">OFFICIAL SELECTION</span>
                      <h4 className="text-base font-bold tracking-tight font-manrope">CASTING NEWS</h4>
                      <p className="text-[11px] opacity-75 font-serif">배우 류경수</p>
                    </div>

                    {/* Logo Box Placed by Exact Relative Percentage */}
                    <div
                      className="absolute border border-dashed border-amber-400/50 p-1 flex items-center justify-center transition-all"
                      style={{
                        left: anchor === 'bottom-right' || anchor === 'top-right' ? undefined : `${posX}%`,
                        right: anchor === 'bottom-right' || anchor === 'top-right' ? `${100 - posX}%` : undefined,
                        top: anchor === 'top-left' || anchor === 'top-right' ? `${posY}%` : undefined,
                        bottom: anchor === 'bottom-left' || anchor === 'bottom-right' ? `${100 - posY}%` : undefined,
                        width: `${posW}%`
                      }}
                    >
                      {activeLogo.svgString ? (
                        <div
                          className={`w-full h-auto ${isDarkBg ? 'text-white' : 'text-zinc-900'}`}
                          dangerouslySetInnerHTML={{ __html: activeLogo.svgString }}
                        />
                      ) : activeLogo.dataUrl ? (
                        <img
                          src={activeLogo.dataUrl}
                          alt="logo"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <span className="text-[9px] font-mono">CAA</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sliders for Interactive Calibration */}
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>X 좌표 비율 (X Percent)</span>
                      <span className="font-mono text-zinc-200">{posX}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={posX}
                      onChange={(e) => setPosX(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Y 좌표 비율 (Y Percent)</span>
                      <span className="font-mono text-zinc-200">{posY}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={posY}
                      onChange={(e) => setPosY(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>로고 너비 비율 (Width Percent)</span>
                      <span className="font-mono text-zinc-200">{posW}%</span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={35}
                      value={posW}
                      onChange={(e) => setPosW(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Actor Brand Profiles Tab */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">소속 배우별 맞춤 브랜드 프로필</h2>
                <p className="text-xs text-zinc-400">
                  배우 이름을 감지하면 해당 배우의 시그니처 서체, 기본 템플릿, 전담 로고가 자동 배정됩니다.
                </p>
              </div>

              <button
                onClick={() => setShowNewActorModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>새 배우 프로필 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {actorProfiles.map((actor) => (
                <div
                  key={actor.id}
                  className="p-5 bg-[#121215] border border-white/10 rounded-2xl space-y-4 hover:border-amber-400/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{actor.nameKo}</h3>
                      <span className="text-[11px] font-mono text-amber-400">{actor.nameEn}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                      {actor.agency}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                    {actor.notes}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>시그니처 타이틀 서체:</span>
                      <strong className="text-zinc-200">{actor.signatureTitleFont}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>인물명 서체:</span>
                      <strong className="text-zinc-200">{actor.signatureActorFont}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>기본 배정 주제:</span>
                      <strong className="text-amber-300">
                        {TOPICS.find((t) => t.id === actor.defaultTopic)?.nameKo}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {actor.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Actor Modal */}
        {showNewActorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="max-w-md w-full bg-[#18181b] border border-white/10 rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">새 배우 브랜드 프로필 등록</h3>
              <div>
                <label className="text-zinc-400 block mb-1">배우명 (한글)</label>
                <input
                  type="text"
                  value={newActorKo}
                  onChange={(e) => setNewActorKo(e.target.value)}
                  placeholder="예: 이도현"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">영문 표기</label>
                <input
                  type="text"
                  value={newActorEn}
                  onChange={(e) => setNewActorEn(e.target.value)}
                  placeholder="예: DO HYUN LEE"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white uppercase"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">에이전시 브랜딩 및 스타일 메모</label>
                <textarea
                  value={newActorNotes}
                  onChange={(e) => setNewActorNotes(e.target.value)}
                  placeholder="추천 스타일, 영화 장르, 시그니처 톤앤매너 기록..."
                  rows={3}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => setShowNewActorModal(false)}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  onClick={handleAddActor}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-lg"
                >
                  프로필 저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
