/**
 * Sample photography assets and generators for editorial agency thumbnails
 */

export interface SamplePhoto {
  id: string;
  name: string;
  category: string;
  actor: string;
  description: string;
  dataUrl: string;
}

// Generate high-resolution procedural studio portraits rendered as rich SVG Data URLs
// with realistic studio lighting, rim shadows, and atmospheric textures.
function createStudioPortraitSvg(
  type: 'actor-suit' | 'actress-gown' | 'athlete-pitch' | 'director-bts'
): string {
  let innerElements = '';

  if (type === 'actor-suit') {
    // Elegant Korean male actor in tailored charcoal suit, dramatic studio lighting
    innerElements = `
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="#2a2a30"/>
          <stop offset="55%" stop-color="#141418"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </radialGradient>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#28282e"/>
          <stop offset="40%" stop-color="#161619"/>
          <stop offset="100%" stop-color="#0c0c0e"/>
        </linearGradient>
        <linearGradient id="faceGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#ecd6c4"/>
          <stop offset="60%" stop-color="#d4b8a2"/>
          <stop offset="100%" stop-color="#8c6a56"/>
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#242220"/>
          <stop offset="100%" stop-color="#0e0d0c"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="1080" height="1350" fill="url(#bgGlow)"/>
      
      <!-- Studio Rim Light Beam -->
      <path d="M 0,0 L 400,0 L 250,1350 L 0,1350 Z" fill="rgba(255,255,255,0.02)"/>
      <circle cx="540" cy="420" r="320" fill="rgba(212,175,55,0.03)" filter="blur(50px)"/>

      <!-- Body / Tailored Suit Shoulders -->
      <path d="M 220,1350 C 240,940 340,780 440,730 L 640,730 C 740,780 840,940 860,1350 Z" fill="url(#suitGrad)"/>
      <!-- Suit Lapels -->
      <path d="M 440,730 L 515,1020 L 540,1180 L 480,1350 L 390,1350 Z" fill="#1b1b20"/>
      <path d="M 640,730 L 565,1020 L 540,1180 L 600,1350 L 690,1350 Z" fill="#131316"/>
      <!-- White Dress Shirt V & Dark Tie -->
      <polygon points="515,750 565,750 540,940" fill="#f4f4f6"/>
      <polygon points="535,770 545,770 548,990 540,1040 532,990" fill="#09090b"/>

      <!-- Neck -->
      <path d="M 490,620 L 490,750 C 515,770 565,770 590,750 L 590,620 Z" fill="#b99982"/>

      <!-- Head / Jawline -->
      <path d="M 440,430 C 430,560 480,660 540,680 C 600,660 650,560 640,430 C 635,320 445,320 440,430 Z" fill="url(#faceGrad)"/>

      <!-- Stylized Hair -->
      <path d="M 420,380 C 410,260 500,200 580,210 C 660,220 670,320 660,390 C 635,340 590,320 540,315 C 480,310 435,340 420,380 Z" fill="url(#hairGrad)"/>
      <path d="M 430,340 C 460,260 540,240 600,250 C 560,280 500,290 450,330 Z" fill="#32302e" opacity="0.6"/>

      <!-- Facial Shadows & Subtle Features -->
      <ellipse cx="495" cy="440" rx="18" ry="7" fill="#2d221c"/>
      <ellipse cx="585" cy="440" rx="18" ry="7" fill="#2d221c"/>
      <path d="M 480,415 Q 500,405 520,412" stroke="#1d1512" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 560,412 Q 580,405 600,415" stroke="#1d1512" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 538,435 L 535,510 L 550,518" stroke="#8c6a56" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 515,565 Q 540,580 565,565" stroke="#704e3d" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 522,572 Q 540,585 558,572" fill="#5c3e30"/>

      <!-- Lens Grain & Vignette -->
      <rect width="1080" height="1350" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    `;
  } else if (type === 'actress-gown') {
    // Actress Cannes Red Carpet / Luxury Evening
    innerElements = `
      <defs>
        <radialGradient id="bgAwards" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stop-color="#28221e"/>
          <stop offset="50%" stop-color="#141110"/>
          <stop offset="100%" stop-color="#070605"/>
        </radialGradient>
        <linearGradient id="faceGrad2" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stop-color="#faeee3"/>
          <stop offset="65%" stop-color="#e8cca8"/>
          <stop offset="100%" stop-color="#a67c5c"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bgAwards)"/>
      <circle cx="540" cy="380" r="380" fill="rgba(212,175,55,0.06)" filter="blur(60px)"/>

      <!-- Black Evening Gown Silhouette -->
      <path d="M 260,1350 C 300,900 380,820 460,760 L 620,760 C 700,820 780,900 820,1350 Z" fill="#0d0d0f"/>
      <path d="M 460,760 L 540,920 L 620,760" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/>

      <!-- Shoulders & Décolletage -->
      <path d="M 330,820 C 400,740 470,720 540,720 C 610,720 680,740 750,820 L 710,880 C 640,810 590,790 540,790 C 490,790 440,810 370,880 Z" fill="#d8bba0"/>
      
      <!-- Slender Neck -->
      <path d="M 505,580 L 505,730 C 525,745 555,745 575,730 L 575,580 Z" fill="#c4a58b"/>

      <!-- Elegant Head -->
      <path d="M 460,400 C 450,530 495,620 540,640 C 585,620 630,530 620,400 C 615,290 465,290 460,400 Z" fill="url(#faceGrad2)"/>

      <!-- Sleek Updo Hair -->
      <circle cx="540" cy="250" r="75" fill="#141211"/>
      <path d="M 445,360 C 440,250 510,210 570,215 C 635,220 635,300 635,360 C 610,315 575,300 540,300 C 500,300 465,320 445,360 Z" fill="#1a1614"/>

      <!-- Delicate Jewelry Reflection -->
      <circle cx="540" cy="740" r="6" fill="#f4e8c1"/>
      <circle cx="452" cy="480" r="4" fill="#f4e8c1"/>
      <circle cx="628" cy="480" r="4" fill="#f4e8c1"/>

      <!-- Facial Features -->
      <ellipse cx="500" cy="430" rx="14" ry="6" fill="#201510"/>
      <ellipse cx="580" cy="430" rx="14" ry="6" fill="#201510"/>
      <path d="M 488,408 Q 502,398 518,405" stroke="#1c110b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M 562,405 Q 578,398 592,408" stroke="#1c110b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M 538,425 L 537,495 L 546,500" stroke="#a67c5c" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 522,545 Q 540,560 558,545" stroke="#a83232" stroke-width="5" stroke-linecap="round" fill="none"/>
    `;
  } else if (type === 'athlete-pitch') {
    // Dynamic Baseball First Pitch
    innerElements = `
      <defs>
        <radialGradient id="bgStadium" cx="50%" cy="40%" r="90%">
          <stop offset="0%" stop-color="#16202c"/>
          <stop offset="50%" stop-color="#0c1117"/>
          <stop offset="100%" stop-color="#06080b"/>
        </radialGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bgStadium)"/>
      <!-- Stadium Floodlights -->
      <circle cx="200" cy="180" r="140" fill="rgba(255,255,255,0.06)" filter="blur(40px)"/>
      <circle cx="880" cy="180" r="140" fill="rgba(255,255,255,0.06)" filter="blur(40px)"/>

      <!-- Dynamic Pitching Motion Silhouette -->
      <path d="M 180,1350 C 220,1100 320,860 480,820 L 700,720 L 880,560 L 920,620 L 760,820 L 820,1350 Z" fill="#1c2430"/>
      <path d="M 380,820 C 450,700 560,680 620,740 L 590,920 L 440,940 Z" fill="#2d3748"/>

      <!-- Ball in Hand with Motion Blur -->
      <circle cx="940" cy="590" r="26" fill="#f8fafc"/>
      <path d="M 928,575 C 935,585 935,595 928,605" stroke="#e11d48" stroke-width="3" fill="none"/>
      <path d="M 952,575 C 945,585 945,595 952,605" stroke="#e11d48" stroke-width="3" fill="none"/>

      <!-- Cap & Head Profile -->
      <ellipse cx="560" cy="460" rx="60" ry="70" fill="#d97706" opacity="0.3"/>
      <path d="M 490,480 C 500,380 580,360 630,400 L 680,410 L 670,440 L 610,430 C 600,480 560,540 510,530 Z" fill="#0f172a"/>
    `;
  } else {
    // Cinema Film Set / Director BTS
    innerElements = `
      <defs>
        <radialGradient id="bgSet" cx="45%" cy="40%" r="85%">
          <stop offset="0%" stop-color="#241e1a"/>
          <stop offset="50%" stop-color="#141210"/>
          <stop offset="100%" stop-color="#090807"/>
        </radialGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bgSet)"/>

      <!-- Tungsten Warm Light Flare -->
      <circle cx="820" cy="300" r="220" fill="rgba(245,158,11,0.08)" filter="blur(60px)"/>
      <circle cx="260" cy="400" r="180" fill="rgba(56,189,248,0.04)" filter="blur(50px)"/>

      <!-- Arri Cinema Camera Rig Silhouette -->
      <rect x="680" y="560" width="220" height="160" rx="8" fill="#141416"/>
      <rect x="580" y="590" width="110" height="100" rx="4" fill="#0d0d0f"/>
      <circle cx="590" cy="640" r="45" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.4"/>
      <!-- Tripod legs -->
      <line x1="790" y1="720" x2="680" y2="1350" stroke="#1f1f23" stroke-width="16"/>
      <line x1="790" y1="720" x2="940" y2="1350" stroke="#1a1a1e" stroke-width="16"/>

      <!-- Actor in Rest Pose on Set -->
      <path d="M 220,1350 C 260,980 340,840 450,810 L 590,810 C 660,860 690,960 700,1350 Z" fill="#1e1e24"/>
      <path d="M 450,810 L 490,660 L 550,660 L 590,810 Z" fill="#b89376"/>
      <circle cx="520" cy="540" r="85" fill="#d4aa88"/>
      <path d="M 440,510 C 440,410 520,380 580,400 C 620,440 610,500 600,520 C 570,470 520,460 460,490 Z" fill="#121214"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
    ${innerElements}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export interface SamplePhoto {
  id: string;
  name: string;
  category: string;
  actor: string;
  description: string;
  dataUrl: string;
  topic: 'casting' | 'awards' | 'first-pitch' | 'gv' | 'fanmeeting' | 'daily' | 'poster' | 'behind' | 'filming' | 'birthday';
  badge: string;
}

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: 'sample-birthday-celebration',
    name: '생일 파티 케이크 화보 (Birthday Party)',
    category: 'birthday',
    actor: '배우 서유진',
    description: '딸기 생크림 케이크와 촛불, 핑크빛 파티 풍선과 꽃을 든 사랑스러운 생일 축하 포트레이트',
    dataUrl: '/assets/aistudio/_____________________________________370d4b6c.png',
    topic: 'birthday',
    badge: '생일'
  },
  {
    id: 'sample-daily-lifestyle',
    name: '라벤더 꽃밭 일상 스냅 (Daily Lifestyle)',
    category: 'daily',
    actor: '배우 서유진',
    description: '지중해풍 라벤더 꽃밭에서 자연광을 받으며 미소 짓는 내추럴 일상 화보',
    dataUrl: '/assets/aistudio/______________________________c04ff283.png',
    topic: 'daily',
    badge: '일상'
  },
  {
    id: 'sample-filming-behind',
    name: '촬영장 모니터링 비하인드 (Shooting Behind)',
    category: 'behind',
    actor: '배우 서유진',
    description: '패딩 점퍼에 대본을 들고 감독과 함께 촬영 모니터를 진지하게 확인하는 영화/드라마 현장 비하인드',
    dataUrl: '/assets/aistudio/__________________________________70fdffac.png',
    topic: 'behind',
    badge: '촬영 비하인드'
  },
  {
    id: 'sample-actress-casting-ref',
    name: '공식 캐스팅 프로필 (Casting Profile)',
    category: 'casting',
    actor: '배우 서유진',
    description: 'CAA 글로벌 에이전시 공식 캐스팅 포트레이트 (블랙 재킷 스튜디오 촬영)',
    dataUrl: '/assets/aistudio/________________________________1__c5b8ff26.png',
    topic: 'casting',
    badge: '캐스팅'
  },
  {
    id: 'sample-awards-redcarpet',
    name: '시상식 레드카펫 (Awards Night Gala)',
    category: 'awards',
    actor: '배우 김서현',
    description: '플래시 세례와 다이아몬드 주얼리, 화려한 오프숄더 드레스 시상식 포토월',
    dataUrl: '/assets/aistudio/awards_ceremony_square_1254_3e9a7a68.png',
    topic: 'awards',
    badge: '시상식'
  },
  {
    id: 'sample-first-pitch-kbo',
    name: '챔피언십 개막전 시구 (First Pitch)',
    category: 'first-pitch',
    actor: '배우 박도윤',
    description: '프로야구 유니폼과 글러브, 마운드 위의 역동적인 와인드업 포즈',
    dataUrl: '/assets/aistudio/_________________________________________c381f6db.png',
    topic: 'first-pitch',
    badge: '시구'
  },
  {
    id: 'sample-gv-greeting',
    name: '영화 GV 및 무대인사 (Guest Visit)',
    category: 'gv',
    actor: '배우 정유나',
    description: '상영관 객석을 향해 다정하게 손을 흔드는 화이트 트위드 무대인사 스틸',
    dataUrl: '/assets/aistudio/____________________________________10824e7e.png',
    topic: 'gv',
    badge: 'GV/무대인사'
  },
  {
    id: 'sample-fanmeeting-withyou',
    name: '공식 팬미팅 포스터 (Fan Meeting)',
    category: 'fanmeeting',
    actor: '배우 이연',
    description: '2026 단독 팬미팅 《With You》 공식 포스터, 꽃과 니트 감성 포트레이트',
    dataUrl: '/assets/aistudio/________________With_You_________c9881b94.png',
    topic: 'fanmeeting',
    badge: '팬미팅'
  },
  {
    id: 'sample-drama-poster',
    name: '드라마 《다시, 봄》 공식 포스터 (Key Art)',
    category: 'poster',
    actor: '배우 서유진 · 류경수',
    description: '노을빛 도시 스카이라인 배경의 멜로드라마 시리즈 공식 포스터 아트',
    dataUrl: '/assets/aistudio/___________________________cb96237e.png',
    topic: 'poster',
    badge: '작품 포스터'
  },
  {
    id: 'sample-pictorial-beauty',
    name: '하이엔드 뷰티 & 패션 화보 (Pictorial)',
    category: 'daily',
    actor: '배우 한소희',
    description: '빛나는 핑크 크리스털 조명과 에디토리얼 글래머 메이크업 클로즈업 화보',
    dataUrl: '/assets/aistudio/_________________________________60a0bbc6.png',
    topic: 'daily',
    badge: '뷰티 화보'
  }
];


