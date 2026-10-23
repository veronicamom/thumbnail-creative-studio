import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Terminal,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ImplementationPlanViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  const fullMarkdownPlan = `# TELEGRAM CREATIVE STUDIO (TCS)
## 텔레그램 기반 에이전시 썸네일 자동 제작 시스템 — 통합 구현계획서 v1.1

---

### 1. 프로그램 기본 개요
- **프로그램명**: Telegram Creative Studio (TCS)
- **실행 환경**: Mac Studio (Apple Silicon M-Series) 로컬 상시 실행
- **인터페이스**: Telegram Bot (grammY 기반) + Web Admin Studio (React + Vite + Tailwind)
- **주요 목적**: 텔레그램으로 사진과 캡션을 전송하면, 소속사 로고·폰트·레이아웃·색상 규칙을 자동 적용해 CAA/MMA 스타일의 초고급 썸네일 자동 렌더링
- **핵심 엔진**: Sharp + Canvas SVG + Fontconfig + AI Font Curator Engine
- **데이터베이스**: SQLite (Wal 모드, 영구 로컬 저장)
- **외부 유료 API**: 기본 불필요 (선택적 로컬 모델 또는 Gemini 비전 연동)

---

### 2. 실제 텔레그램 사용 및 대화 흐름
1. **사진 및 캡션 수신**:
   - 사용자 전송 예시: \`배우 류경수 프로필 및 영화 '야당' 캐스팅 뉴스\` + 사진 1장 첨부
2. **캡션 지능형 분석 (NLP)**:
   - 키워드 분석을 통해 주제(\`캐스팅\`), 배우명(\`배우 류경수\`), 작품명(\`야당\`) 자동 추출
3. **인라인 템플릿 제안**:
   - 봇: "이미지를 확인했습니다. [캐스팅] 주제가 감지되었습니다. 3종 시안을 생성합니다."
4. **동시 3종 프리셋 렌더링**:
   - A안: 에이전시 미니멀 (CAA 흑백 고대비)
   - B안: 에디토리얼 클래식 (Vogue / 프렌치 세리프)
   - C안: 시네마틱 다크 (Cannes 레드카펫 / 깊은 대비)
5. **텔레그램 인라인 버튼 인터랙션**:
   - \`[A 선택]\` \`[B 선택]\` \`[C 선택]\` \`[다시 제작]\` \`[비율 변경]\` \`[웹 스튜디오에서 열기]\`
6. **최종 확정 및 원본 전송**:
   - 선택된 안을 1080x1350 무손실 PNG 또는 고품질 JPG 파일로 텔레그램 문서(Document) 전송

---

### 3. 주제별 디자인 프리셋 (9개 주제 × 6대 스타일 = 54 기본 템플릿)
- **팬미팅 (FAN MEETING)**: 부드러운 클래식, 여백 중심, 아이보리/크림 톤
- **캐스팅 (CASTING NEWS)**: CAA 스타일 흑백 고대비, 절제된 타이포, 공식 보도자료 룩
- **시구 (FIRST PITCH)**: 스포츠 에디토리얼, 역동적인 볼드 산세리프, 헤비 타이틀
- **GV (SPECIAL GV)**: 영화제 포스터 무드, 깊은 섀도우 대비, 에디토리얼 세리프
- **시상식 (AWARDS NIGHT)**: 블랙 & 골드 악센트, 오트쿠튀르 세리프 (Bodoni / Italiana)
- **일상 (MOMENTS)**: 자연광, 미니멀한 텍스트 배치, 편안한 라이프스타일
- **촬영 (ON SET)**: 35mm 영화 스틸컷 구도, 프로덕션 로케이션 아카이브
- **비하인드 (BEHIND THE SCENES)**: 필름 프레임, 인덱스 번호, 다큐멘터리 스틸
- **포스터 (OFFICIAL POSTER)**: 작품 중심 대형 타이틀, 강렬한 시각 임팩트

---

### 4. 로고 상대좌표(%) 합성 엔진 (Resolution-Independent Logo System)
- **핵심 원리**: 픽셀(px)이 아닌 캔버스 해상도에 대한 상대 퍼센트(%) 좌표로 저장
  - \`xPercent: 91%\`
  - \`yPercent: 92%\`
  - \`widthPercent: 15%\`
  - \`anchor: "bottom-right"\`
- **효과**: 1080x1350 (4:5 피드), 1080x1080 (1:1 정방형), 1080x1920 (9:16 릴스/스토리) 등 어떤 비율로 변경되어도 회사의 브랜드 로고가 동일한 여백과 비례로 정확히 안착됨.
- **자동 대비 반전**: 배경 이미지의 평균 휘도(Luminance)를 계산하여 어두운 배경에는 화이트 로고, 밝은 배경에는 블랙/골드 로고 자동 스위칭.

---

### 5. AI 폰트 큐레이터 (Font Intelligence Engine) v1.1
- **6차원 태그 시스템**:
  1. 감성 태그: 우아함, 따뜻함, 차가움, 로맨틱, 강렬함, 럭셔리
  2. 디자인 태그: 미니멀, 클래식, 패션, 영화적, 실험적, 스위스
  3. 형태 태그: 세리프, 산세리프, 고대비, 장평, 굵기
  4. 적합한 주제: 캐스팅, GV, 팬미팅, 시상식, 일상, 시구
  5. 사용 역할: 메인 타이틀, 배우명, 서브헤드, 날짜/크레딧
  6. 언어 및 라이선스: 한글/영문 지원 여부, 상업용 라이선스 검증 상태
- **황금 폰트 페어링 엔진**:
  - 영문 메인 타이틀(Bodoni Moda, Cormorant Garamond, Manrope, Archivo)과 한글 배우명(Noto Serif KR, Noto Sans KR)의 서체 질감을 자동 매칭.
- **상업용 라이선스 관리**:
  - SIL Open Font License 및 상업용 검증 서체만 자동 렌더링에 배정하여 법적 분쟁 원천 차단.

---

### 6. 시스템 아키텍처 및 Mac Studio 상시 구동 (launchd)
- **Node.js TypeScript 백엔드** + **grammY 텔레그램 프레임워크**
- **Mac Studio \`~/Library/LaunchAgents/com.agency.tcs.plist\` 상시 데몬**:
  \`\`\`xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
      <key>Label</key>
      <string>com.agency.creative-studio</string>
      <key>ProgramArguments</key>
      <array>
          <string>/usr/local/bin/node</string>
          <string>/Users/admin/creative-studio/dist/server.js</string>
      </array>
      <key>RunAtLoad</key>
      <true/>
      <key>KeepAlive</key>
      <true/>
      <key>StandardErrorPath</key>
      <string>/Users/admin/creative-studio/logs/error.log</string>
      <key>StandardOutPath</key>
      <string>/Users/admin/creative-studio/logs/stdout.log</string>
  </dict>
  </plist>
  \`\`\`
- **보안 화이트리스트**: 등록된 Telegram User ID만 요청 허용 (\`telegram_allowed_users\` 테이블 연동).
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([fullMarkdownPlan], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TCS_Implementation_Plan_v1.1_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>OFFICIAL SYSTEM SPECIFICATION · VERSION 1.1</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-manrope">
              통합 구현계획서 v1.1
            </h1>
            <p className="text-xs text-zinc-400">
              텔레그램 기반 에이전시 썸네일 자동 제작 시스템 (Telegram Creative Studio)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3.5 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료' : 'Markdown 복사'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.MD 파일 다운로드</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
              <Cpu className="w-4 h-4" />
              <span>MAC STUDIO 상시 데몬</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              launchd 백그라운드 상주 프로세스로 서버 재부팅 시에도 자동 복구되며 텔레그램 봇 토큰만으로 즉시 운영됩니다.
            </p>
          </div>

          <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
              <Layers className="w-4 h-4" />
              <span>상대좌표(%) 해상도 불변</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              4:5 피드, 1:1 정방형, 9:16 스토리 등 어떤 비율에서도 로고와 타이포그래피의 황금 비율을 그대로 유지합니다.
            </p>
          </div>

          <div className="p-4 bg-[#121215] border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>AI 폰트 큐레이터 & 라이선스</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              6차원 태그 기반으로 사진 무드에 맞는 영문+한글 서체를 자동 매칭하고 상업용 무료 서체(SIL OFL)로 안전 배포합니다.
            </p>
          </div>
        </div>

        {/* Document Content Sections */}
        <div className="p-8 bg-[#121215] border border-white/10 rounded-2xl space-y-8 text-xs leading-relaxed text-zinc-300 font-sans">
          {/* Section 1 */}
          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-manrope">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>1. 프로그램 기본 구조 및 실행 아키텍처</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-zinc-400 w-36 font-semibold">프로그램명</td>
                    <td className="py-2 text-zinc-200">Telegram Creative Studio (TCS)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-zinc-400 font-semibold">실행 환경</td>
                    <td className="py-2 text-zinc-200">Mac Studio 로컬 상시 실행 (Node.js LTS + launchd 데몬)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-zinc-400 font-semibold">사용자 인터페이스</td>
                    <td className="py-2 text-zinc-200">텔레그램 봇 (현장 매니저/홍보팀) + 웹 관리자 스튜디오</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-zinc-400 font-semibold">디자인 렌더링 엔진</td>
                    <td className="py-2 text-zinc-200">Sharp + Canvas SVG + Fontconfig 고정밀 벡터 타이포그래피</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-zinc-400 font-semibold">데이터 저장</td>
                    <td className="py-2 text-zinc-200">SQLite (로컬 DB, 외부 유료 의존성 제로)</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-zinc-400 font-semibold">출력 규격</td>
                    <td className="py-2 text-zinc-200">1080×1350 (4:5 인스타그램 피드), 1080×1080 (1:1), 1080×1920 (9:16)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-manrope">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>2. 텔레그램 대화 흐름 및 3종 안 자동 제안</span>
            </h2>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2 font-mono text-[11px]">
              <div className="text-amber-400"># 사용자: 배우 류경수 프로필 및 영화 《야당》 캐스팅 뉴스 (사진 1장)</div>
              <div className="text-zinc-400">→ TCS Bot: 키워드 분석 완료 (주제: 캐스팅, 인물: 배우 류경수)</div>
              <div className="text-zinc-400">→ TCS Bot: CAA 미니멀, Vogue 클래식, Cannes 다크 럭셔리 3종 동시 렌더링</div>
              <div className="text-emerald-400">→ TCS Bot: [A안 선택] [B안 선택] [C안 선택] [다시 제작] 인라인 키보드 발송</div>
              <div className="text-zinc-300">→ 사용자 [A안 선택] 클릭 시 1080x1350 무손실 PNG 원본 전송 완료</div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-b border-white/10 pb-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-manrope">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>3. 9개 엔터테인먼트 주제별 프리셋 정의</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">팬미팅 (FAN MEETING)</strong>
                <span className="text-zinc-400 text-[11px]">부드러운 클래식, 여백 중심, 아이보리 감성</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">캐스팅 (CASTING NEWS)</strong>
                <span className="text-zinc-400 text-[11px]">CAA 스타일 흑백 고대비, 절제된 타이포</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">시구 (FIRST PITCH)</strong>
                <span className="text-zinc-400 text-[11px]">스포츠 에디토리얼, 강렬한 볼드 산세리프</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">GV / 무대인사 (SPECIAL GV)</strong>
                <span className="text-zinc-400 text-[11px]">영화제 포스터 느낌, 시네마틱 섀도우</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">시상식 (AWARDS NIGHT)</strong>
                <span className="text-zinc-400 text-[11px]">블랙 & 골드, 레드카펫 럭셔리 세리프</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">일상 (MOMENTS)</strong>
                <span className="text-zinc-400 text-[11px]">자연광, 미니멀한 텍스트, 라이프스타일</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">촬영장 (ON SET)</strong>
                <span className="text-zinc-400 text-[11px]">35mm 시네마 스틸, 와이드 현장감</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">비하인드 (BEHIND THE SCENES)</strong>
                <span className="text-zinc-400 text-[11px]">필름 프레임 감성, 기록형 인덱스</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                <strong className="text-white block">공식 포스터 (OFFICIAL POSTER)</strong>
                <span className="text-zinc-400 text-[11px]">작품 중심 대형 타이틀, 압도적 비주얼</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-manrope">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>4. Mac Studio launchd 상시 자동 실행 구성</span>
            </h2>
            <div className="p-4 bg-black/50 border border-white/10 rounded-xl overflow-x-auto font-mono text-[11px] text-zinc-300">
              <span className="text-zinc-500 block mb-1"># 터미널에서 등록 명령어</span>
              <span className="text-amber-400 block mb-3">launchctl load ~/Library/LaunchAgents/com.agency.creative-studio.plist</span>
              <span className="text-zinc-500 block mb-1"># 데몬 설정 파일 (자동 재시작 및 부팅 시 자동 로드)</span>
              <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.agency.creative-studio</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/Users/admin/creative-studio/dist/server.js</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>`}</pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
