/**
 * Telegram Creative Studio (TCS) - Type Definitions
 */

export type TopicId =
  | 'fanmeeting'
  | 'casting'
  | 'birthday'
  | 'first-pitch'
  | 'gv'
  | 'awards'
  | 'daily'
  | 'filming'
  | 'behind'
  | 'poster';

export type AspectRatioId = '4:5' | '1:1' | '9:16' | '16:9';

export interface AspectRatioConfig {
  id: AspectRatioId;
  label: string;
  sublabel: string;
  width: number;
  height: number;
}

export type AgencyStyle =
  | 'minimal'
  | 'editorial'
  | 'dark-luxury'
  | 'swiss-modern'
  | 'cinema'
  | 'bold';

export type LogoAnchor =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export interface LogoPosition {
  assetId: string;
  anchor: LogoAnchor;
  xPercent: number; // e.g. 92
  yPercent: number; // e.g. 94
  widthPercent: number; // e.g. 14
  opacity: number; // 0 to 1
  autoInvertContrast: boolean; // Dark/light automatic inversion
  showBackdrop: boolean; // Translucent backing plate
}

export interface AgencyLogo {
  id: string;
  name: string;
  agencyName: string;
  type: 'svg' | 'png';
  svgString?: string;
  dataUrl?: string;
  isDefault: boolean;
  styleDescription: string;
}

export interface FontItem {
  id: string;
  name: string;
  family: string;
  cssFamily: string;
  category: 'serif' | 'sans' | 'display';
  weights: number[];
  moodTags: string[];
  styleTags: string[];
  topics: TopicId[];
  roles: ('main-title' | 'actor-name' | 'subtitle' | 'date-credits')[];
  languages: ('ko' | 'en')[];
  licenseStatus: 'verified-free' | 'commercial-subscription' | 'review-required';
  licenseNote: string;
  scores: {
    luxury: number; // 0-100
    modern: number;
    dramatic: number;
    sporty: number;
    koreanHarmony: number;
  };
  recommendedPairings: string[]; // font IDs
}

export interface TypographyLayer {
  text: string;
  font: string; // font family
  weight: number;
  size: number; // base size for 1080px width
  letterSpacing: number; // in px
  lineHeight?: number;
  color: string;
  textTransform?: 'uppercase' | 'none' | 'capitalize';
  align: 'left' | 'center' | 'right';
  xPercent: number;
  yPercent: number;
}

export type LayoutArchetype =
  | 'classic-editorial'     // Preset 01: Cormorant Garamond, bottom-left 2-line title, Blanc logo top-left
  | 'signature-script'      // Preset 02: Allura script -8° diagonal across center-lower body, top-right vertical stack
  | 'warm-minimal'          // Preset 03: Cream background (#F2EDE5), top-left 3-line Korean quote, Bodoni Moda title
  | 'cinematic-filmstrip'   // Preset 04: Left 52% 3-slice vertical filmstrip, right 48% black card with Playfair
  | 'monochrome-archive'    // Preset 05: Cormorant Garamond Light wide-tracking C A S T I N G, B&W film photo
  | 'blue-editorial'        // Preset 06: Top 78% photo, bottom 22% white panel with steel navy (#526B95) title
  | 'midnight-cinema'       // Preset 07: Midnight navy (#142337) vignette, centered subject, Cinzel gold/white title
  | 'blue-signature'        // Preset 08: Deep steel-blue (#45658F) Pinyon Script crossing lower half, bottom-right quote
  | 'birthday-romantic-signature'     // B01: -8° Allura script, bottom-left quote, top OCT 23, logo BR
  | 'birthday-classic-editorial'      // B02: Cormorant Garamond top center, right quote, bottom divider
  | 'birthday-soft-blush'             // B03: Libre Baskerville 3-line vertical stack, top-right 10/23 with line, bottom quote
  | 'birthday-midnight-luxury'        // B04: Bodoni Moda across shoulder, top-right star & quote, bottom date & quote
  | 'birthday-monochrome-statement'   // B05: Grayscale photo, massive pink HAPPY BIRTHDAY stacked serif, logo TR
  | 'birthday-pink-celebration'       // B06: Playfair Display top-left with doodle heart accent, bottom quote
  | 'birthday-cinematic-night'        // B07: Montserrat top-center, Allura to you bottom-right with heart, date
  | 'birthday-floral-minimal'         // B08: Cormorant Garamond 27px top-center with 10.23, bottom quote with 45px line
  | 'magazine-cover'        // Vogue / V Magazine: Giant top masthead, barcode, issue date
  | 'cinematic-letterbox'   // Cannes / GV: Top & bottom black letterbox bars, festival laurels, billing block
  | 'swiss-grid'            // Zurich: Asymmetric grid, vertical ribbon text, index numbers, crosshairs
  | 'frame-passepartout'    // Museum / Gallery: Inset photo with wide elegant matte border & bottom caption
  | 'stacked-monumental'    // Heavy Impact: Giant stacked 2-line words, bold diagonal athletic/official stamp
  | 'analog-contact-sheet'  // Behind / 35mm: Film sprocket holes, Kodak frame count, grease pencil markings
  | 'zen-vertical'          // Tokyo / Kyoto: Vertical typography, extreme whitespace, agency seal stamp
  | 'agency-minimal-caa'    // Hollywood CAA: Stark monochrome, horizontal hairline rule, bottom metadata
  | 'duotone-poster';       // Contemporary Graphic: High contrast, framing lines, festival typography

export interface LayoutDetails {
  passepartoutWidth?: number;
  passepartoutColor?: string;
  letterboxHeight?: number;
  showFestivalLaurel?: boolean;
  festivalText?: string;
  showSprocketHoles?: boolean;
  filmRollCode?: string;
  showVerticalRibbon?: boolean;
  verticalRibbonText?: string;
  showBarcode?: boolean;
  indexNumber?: string;
  hairlineGrid?: boolean;
  stackedTitle?: boolean;
  agencyStamp?: {
    show: boolean;
    text: string;
    style: 'box' | 'circle' | 'seal';
  };
}

export interface DesignPreset {
  id: string;
  topic: TopicId;
  style: AgencyStyle;
  layoutArchetype: LayoutArchetype;
  layoutDetails?: LayoutDetails;
  nameKo: string;
  nameEn: string;
  description: string;
  logo: LogoPosition;
  title: TypographyLayer;
  subtitle: TypographyLayer;
  actorName: TypographyLayer;
  kicker: {
    show: boolean;
    text: string;
    style: 'clean-text' | 'editorial-line' | 'frame-tag';
    color: string;
  };
  dateCredits: TypographyLayer;
  overlay: {
    gradient: 'bottom-scrim' | 'top-scrim' | 'cinematic-duo' | 'vignette' | 'clean-fade' | 'none';
    gradientOpacity: number;
    tintColor?: string;
    tintOpacity?: number;
    filmGrain: boolean;
    frameBorder?: {
      show: boolean;
      color: string;
      width: number;
      inset: number;
    };
  };
  safeArea: {
    faceProtection: boolean;
    topSafePercent: number;
    bottomSafePercent: number;
  };
}

export interface TopicDefinition {
  id: TopicId;
  nameKo: string;
  nameEn: string;
  defaultTitle: string;
  defaultSubtitle: string;
  badgeText: string;
  description: string;
  moodKeywords: string[];
  recommendedStyle: AgencyStyle;
}

export interface ActorProfile {
  id: string;
  nameKo: string;
  nameEn: string;
  agency: string;
  defaultTopic: TopicId;
  signatureTitleFont: string;
  signatureActorFont: string;
  preferredLogoId: string;
  tags: string[];
  notes: string;
  avatarUrl?: string;
}

export interface TelegramConfig {
  botToken: string;
  botUsername: string;
  isConnected: boolean;
  webhookUrl: string;
  allowedUsers: { id: string; name: string; role: 'admin' | 'creator' }[];
  autoRecommendVariants: number; // default 3
  defaultRatio: AspectRatioId;
  exportFormat: 'png' | 'jpg' | 'webp';
  compressionQuality: number; // 80-100
}

export interface TelegramMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text?: string;
  imageUrl?: string;
  inlineButtons?: { text: string; action: string; data?: any }[];
  presetPreviews?: {
    presetId: string;
    styleName: string;
    thumbnailUrl: string;
  }[];
}

export interface RenderOutputRecord {
  id: string;
  timestamp: string;
  topic: TopicId;
  presetName: string;
  aspectRatio: AspectRatioId;
  titleText: string;
  actorText: string;
  outputImageUrl: string;
}

export type FontLicenseVerdict = 'verified-ofl' | 'excluded-commercial' | 'pending-review';

export interface FontLicenseAuditRecord {
  fontName: string;
  category: 'Serif' | 'Sans' | 'Script' | 'Display';
  licenseType: string;
  officialSource: string;
  sourceUrl: string;
  fileVersion: string;
  sha256Hash: string;
  hasKoreanSupport: boolean;
  rights: {
    commercialPromo: boolean;   // 상업용 홍보물 (인스타, 캐스팅 뉴스, 보도자료)
    serverRendering: boolean;   // Mac Studio 서버 자동 생성 (Sharp/Canvas)
    bundleDistribute: boolean;  // 프로그램 패키지 내장 배포
    webPreview: boolean;        // 웹 관리자 미리보기
    modifyDistribute: boolean;  // 수정·재배포
  };
  verdict: FontLicenseVerdict;
  verdictLabel: string;
  replacementSuggestion?: string;
  assignedPresets: string[];
  notes: string;
}

