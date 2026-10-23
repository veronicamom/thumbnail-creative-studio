import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ExternalLink,
  Lock,
  Download,
  Info,
  Layers,
  Cpu,
  Hash,
  Sparkles,
  Upload,
  Check
} from 'lucide-react';
import { FONT_LICENSE_AUDIT } from '../data/defaultData';
import { FontLicenseAuditRecord } from '../types/studio';

export const FontLicenseManager: React.FC = () => {
  const [auditList, setAuditList] = useState<FontLicenseAuditRecord[]>(FONT_LICENSE_AUDIT);
  const [filterVerdict, setFilterVerdict] = useState<'all' | 'verified-ofl' | 'excluded-commercial'>('all');
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    officialDownload: true,
    licenseNotice: true,
    sha256Recorded: true,
    rightsCategorized: true,
    koreanAudited: true,
    paidLicenseVerified: false
  });

  const [uploadedFonts, setUploadedFonts] = useState<
    { name: string; file: string; status: 'PENDING' | 'VERIFIED'; note: string }[]
  >([
    {
      name: 'CustomBrandSerif-Regular.otf',
      file: 'CustomBrandSerif-Regular.otf (248 KB)',
      status: 'PENDING',
      note: '외부 업로드 폰트 — 저작권 계약서 및 배포 허용 증빙 확인 전까지 템플릿 비활성화'
    }
  ]);

  const [newFontName, setNewFontName] = useState('');

  const handleToggleChecklist = (key: string) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddPendingFont = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFontName.trim()) return;
    setUploadedFonts((prev) => [
      {
        name: `${newFontName.trim()}.otf`,
        file: `${newFontName.trim()}.otf (외부 업로드)`,
        status: 'PENDING',
        note: '라이선스 확인 대기 중 — 검증 완료 전까지 자동 생성 엔진 번들 제외'
      },
      ...prev
    ]);
    setNewFontName('');
  };

  const filteredAudit = auditList.filter((item) => {
    if (filterVerdict === 'verified-ofl') return item.verdict === 'verified-ofl';
    if (filterVerdict === 'excluded-commercial') return item.verdict === 'excluded-commercial';
    return true;
  });

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>LEGAL & COMPLIANCE · COMMERCIAL FONT LICENSING VAULT</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-manrope flex items-center gap-3">
              <span>캐스팅 뉴스 프리셋 8종 — 상업용 폰트 라이선스 검토</span>
            </h1>
            <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
              메리디안 컬렉티브 개발 썸네일 자동 생성 프로그램 기준: 상업용 홍보물 제작, Mac Studio 서버 설치, 프로그램 내장 배포, 웹 관리자 미리보기 등 사용 범위별 법적 권리를 분리 검토하여 유료 라이선스 분쟁 없이 안전하게 운영합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-mono">검증 기준일</span>
              <span className="text-xs font-bold text-amber-300 font-mono">2026. 10. 23 최신 검토</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-mono">기본 정책</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">OFL 1.1 우선 정책</span>
            </div>
          </div>
        </div>

        {/* 1. Development & Operational Verification Checklist */}
        <div className="p-6 bg-gradient-to-br from-[#18181b] to-[#121215] border border-white/10 rounded-2xl space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>폰트 라이선스 관리 — 개발 및 배포 체크리스트</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    OFL 1.1 우선
                  </span>
                </h2>
                <p className="text-[11px] text-zinc-400">
                  개발용 확인 목록입니다. 외부 유료 폰트는 계약 증빙 확인 전까지 PENDING 상태로 유지됩니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">검증 완료율:</span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                5 / 6 완료 (83%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              onClick={() => handleToggleChecklist('officialDownload')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.officialDownload
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/30 border-white/10 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.officialDownload ? 'bg-emerald-400 text-black' : 'border border-zinc-600'
              }`}>
                {checklist.officialDownload && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="text-xs font-bold block">공식 배포처에서 다운로드</span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  Google Fonts 공식 API 및 GitHub 공식 릴리즈 저장소 본체 파일만 승인
                </span>
              </div>
            </button>

            <button
              onClick={() => handleToggleChecklist('licenseNotice')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.licenseNotice
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/30 border-white/10 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.licenseNotice ? 'bg-emerald-400 text-black' : 'border border-zinc-600'
              }`}>
                {checklist.licenseNotice && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="text-xs font-bold block">라이선스 원문 및 저작권 고지 보관</span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  OFL.txt 및 공식 저작권 고지문을 프로그램 내 /licenses 디렉토리에 보관
                </span>
              </div>
            </button>

            <button
              onClick={() => handleToggleChecklist('sha256Recorded')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.sha256Recorded
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/30 border-white/10 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.sha256Recorded ? 'bg-emerald-400 text-black' : 'border border-zinc-600'
              }`}>
                {checklist.sha256Recorded && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="text-xs font-bold block">파일 버전 및 SHA-256 해시 기록</span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  빌드 무결성 보장을 위해 폰트 바이너리별 고유 해시값 메타데이터 등록
                </span>
              </div>
            </button>

            <button
              onClick={() => handleToggleChecklist('rightsCategorized')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.rightsCategorized
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/30 border-white/10 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.rightsCategorized ? 'bg-emerald-400 text-black' : 'border border-zinc-600'
              }`}>
                {checklist.rightsCategorized && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="text-xs font-bold block">상업용·서버·웹·재배포 권한 구분</span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  홍보 이미지 생성과 서버 내장 배포 권한을 엄격히 구분하여 안전성 검증
                </span>
              </div>
            </button>

            <button
              onClick={() => handleToggleChecklist('koreanAudited')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.koreanAudited
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/30 border-white/10 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.koreanAudited ? 'bg-emerald-400 text-black' : 'border border-zinc-600'
              }`}>
                {checklist.koreanAudited && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="text-xs font-bold block">폰트별 한글 지원 여부 검사</span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  한글 본문용(Pretendard, Noto Serif KR)과 영문 전용 타이틀 서체 페어링
                </span>
              </div>
            </button>

            <button
              onClick={() => handleToggleChecklist('paidLicenseVerified')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                checklist.paidLicenseVerified
                  ? 'bg-amber-500/10 border-amber-500/30 text-white'
                  : 'bg-red-500/5 border-red-500/20 text-zinc-400'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center ${
                checklist.paidLicenseVerified ? 'bg-amber-400 text-black' : 'border border-red-500/40 text-red-400'
              }`}>
                {checklist.paidLicenseVerified ? <Check className="w-3 h-3 stroke-[3]" /> : '✕'}
              </div>
              <div>
                <span className="text-xs font-bold block text-zinc-200">
                  유료 폰트는 계약 증빙 확인 후 활성화
                </span>
                <span className="text-[10px] text-zinc-400 leading-snug block mt-0.5">
                  Bickham Script Pro, Neue Haas Grotesk — 라이선스 계약서 제출 전까지 잠금
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. 8 Casting Presets Font Allocation Matrix */}
        <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                프로그램 실제 적용: 캐스팅 뉴스 프리셋 8종 최종 폰트 구성
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              100% 오픈폰트 기반 (유료 폰트 구매 불필요)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: '01', name: 'Classic Editorial', title: 'Cormorant Garamond', body: 'Pretendard / Montserrat', status: '사용 가능' },
              { id: '02', name: 'Signature Script', title: 'Allura (Bickham 대체)', body: 'Montserrat Light', status: '사용 가능' },
              { id: '03', name: 'Warm Minimal', title: 'Bodoni Moda', body: 'Noto Serif KR', status: '사용 가능' },
              { id: '04', name: 'Cinematic Filmstrip', title: 'Playfair Display', body: 'Montserrat', status: '사용 가능' },
              { id: '05', name: 'Monochrome Archive', title: 'Cormorant Garamond Light', body: 'Pretendard', status: '사용 가능' },
              { id: '06', name: 'Blue Editorial', title: 'Libre Baskerville', body: 'Noto Serif KR', status: '사용 가능' },
              { id: '07', name: 'Midnight Cinema', title: 'Cinzel (All-caps)', body: 'Pretendard', status: '사용 가능' },
              { id: '08', name: 'Blue Signature', title: 'Pinyon Script (Bickham 대체)', body: 'Noto Serif KR', status: '사용 가능' }
            ].map((p) => (
              <div key={p.id} className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    {p.id}. {p.name}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {p.status}
                  </span>
                </div>
                <div className="text-[11px]">
                  <span className="text-zinc-500 block text-[10px]">제목 서체:</span>
                  <span className="text-white font-medium">{p.title}</span>
                </div>
                <div className="text-[11px]">
                  <span className="text-zinc-500 block text-[10px]">보조/한글 서체:</span>
                  <span className="text-zinc-300">{p.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Detailed 12-Font License Audit Table */}
        <div className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {/* Table Header and Filter */}
          <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>전체 폰트 라이선스 상세 감사 매트릭스 (12종)</span>
                <span className="text-xs font-mono text-zinc-400 font-normal">
                  (추천 오픈폰트 10종 + 유료 제외 폰트 2종)
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                SIL OFL 1.1 조건부 가능 판정 서체와 서버 라이선스 필요로 제외된 유료 서체 비교
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-white/10 rounded-xl">
              <button
                onClick={() => setFilterVerdict('all')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filterVerdict === 'all' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                전체 (12)
              </button>
              <button
                onClick={() => setFilterVerdict('verified-ofl')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filterVerdict === 'verified-ofl' ? 'bg-emerald-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                OFL 사용 추천 (10)
              </button>
              <button
                onClick={() => setFilterVerdict('excluded-commercial')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filterVerdict === 'excluded-commercial' ? 'bg-red-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                유료 제외 (2)
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">폰트명</th>
                  <th className="py-3.5 px-4 font-semibold">라이선스</th>
                  <th className="py-3.5 px-4 font-semibold">공식 출처</th>
                  <th className="py-3.5 px-4 font-semibold text-center">상업 홍보물</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Mac 서버 생성</th>
                  <th className="py-3.5 px-4 font-semibold text-center">패키지 내장</th>
                  <th className="py-3.5 px-4 font-semibold text-center">웹 미리보기</th>
                  <th className="py-3.5 px-4 font-semibold text-center">판정</th>
                  <th className="py-3.5 px-4 font-semibold">대체 및 참고사항</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredAudit.map((font) => (
                  <tr
                    key={font.fontName}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      font.verdict === 'excluded-commercial' ? 'bg-red-950/10' : ''
                    }`}
                  >
                    {/* Font Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{font.fontName}</span>
                        {font.hasKoreanSupport && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded">
                            한글지원
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        {font.category} · {font.fileVersion}
                      </span>
                    </td>

                    {/* License */}
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className={font.verdict === 'verified-ofl' ? 'text-emerald-400' : 'text-red-400'}>
                        {font.licenseType}
                      </span>
                    </td>

                    {/* Official Source */}
                    <td className="py-3.5 px-4">
                      <a
                        href={font.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 hover:text-amber-400 underline underline-offset-2 flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>{font.officialSource}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      </a>
                    </td>

                    {/* Rights 1: Commercial Promo */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-emerald-400 font-bold">가능</span>
                    </td>

                    {/* Rights 2: Server Rendering */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {font.rights.serverRendering ? (
                        <span className="text-emerald-400 font-bold">OFL 허용</span>
                      ) : (
                        <span className="text-red-400 font-bold">불가 (별도계약)</span>
                      )}
                    </td>

                    {/* Rights 3: Bundle Distribute */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {font.rights.bundleDistribute ? (
                        <span className="text-emerald-400 font-bold">OFL 허용</span>
                      ) : (
                        <span className="text-red-400 font-bold">불가</span>
                      )}
                    </td>

                    {/* Rights 4: Web Preview */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {font.rights.webPreview ? (
                        <span className="text-emerald-400 font-bold">허용</span>
                      ) : (
                        <span className="text-red-400 font-bold">제한</span>
                      )}
                    </td>

                    {/* Verdict */}
                    <td className="py-3.5 px-4 text-center">
                      {font.verdict === 'verified-ofl' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-[10px] whitespace-nowrap">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>사용 추천</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 font-bold text-[10px] whitespace-nowrap">
                          <XCircle className="w-3 h-3" />
                          <span>기본 내장 제외</span>
                        </span>
                      )}
                    </td>

                    {/* Replacement & Notes */}
                    <td className="py-3.5 px-4 text-[11px] text-zinc-400 leading-snug max-w-xs">
                      {font.replacementSuggestion ? (
                        <span className="text-amber-300 font-medium block mb-0.5">
                          👉 {font.replacementSuggestion}
                        </span>
                      ) : null}
                      <span>{font.notes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-black/60 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2">
            <span className="flex items-center gap-1.5 text-zinc-500 font-mono">
              <Hash className="w-3.5 h-3.5" />
              <span>SHA-256 해시 검증 및 라이선스 고지문은 프로그램 번들 /licenses 디렉토리에 동봉됩니다.</span>
            </span>
            <span className="text-emerald-400 font-mono font-medium">
              OFL 1.1: 상업용 이용, 서버 자동화, 프로그램 번들 배포 전면 허용 확인 완료
            </span>
          </div>
        </div>

        {/* 4. External Font Upload & Quarantine (PENDING State) Simulator */}
        <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>외부 폰트 등록 및 격리(Quarantine) 관리기</span>
              </h3>
              <p className="text-xs text-zinc-400">
                외부에서 업로드한 폰트는 라이선스 원문 검증 전까지 PENDING 상태로 보관되며, 검증 완료 전까지 템플릿 엔진에서 선택할 수 없습니다.
              </p>
            </div>

            <form onSubmit={handleAddPendingFont} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="외부 폰트명 입력..."
                value={newFontName}
                onChange={(e) => setNewFontName(e.target.value)}
                className="px-3 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 w-48"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors"
              >
                + 폰트 등록
              </button>
            </form>
          </div>

          <div className="space-y-2">
            {uploadedFonts.map((uf, idx) => (
              <div
                key={idx}
                className="p-3 bg-black/40 border border-amber-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{uf.name}</span>
                    <span className="text-[10px] text-zinc-400 block">{uf.note}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    STATUS: {uf.status} (라이선스 확인 대기)
                  </span>
                  <button
                    onClick={() => {
                      setUploadedFonts((prev) =>
                        prev.map((f, i) =>
                          i === idx
                            ? {
                                ...f,
                                status: f.status === 'PENDING' ? 'VERIFIED' : 'PENDING',
                                note:
                                  f.status === 'PENDING'
                                    ? '라이선스 계약 증빙 확인 완료 — 템플릿 선택 승인'
                                    : '라이선스 확인 대기 중'
                              }
                            : f
                        )
                      );
                    }}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-medium border border-white/10"
                  >
                    {uf.status === 'PENDING' ? '증빙 승인' : '대기로 전환'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
