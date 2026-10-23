import {
  AgencyLogo,
  AspectRatioConfig,
  DesignPreset,
  LogoPosition
} from '../types/studio';

export interface RenderParams {
  imageSrc: string;
  preset: DesignPreset;
  ratioConfig: AspectRatioConfig;
  logo: AgencyLogo;
  customText?: {
    title?: string;
    subtitle?: string;
    actorName?: string;
    kicker?: string;
    dateCredits?: string;
  };
  logoOverride?: Partial<LogoPosition>;
}

// Helper to load an image with Promise
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image: ' + e));
    img.src = src;
  });
}

// Convert SVG string to Image
export function loadSvgString(svgStr: string, color: string = '#FFFFFF'): Promise<HTMLImageElement> {
  const coloredSvg = svgStr.replace(/currentColor/g, color);
  const blob = new Blob([coloredSvg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG logo'));
    };
    img.src = url;
  });
}

/**
 * High-precision typography drawer with manual tracking/letter-spacing support
 */
function drawTextWithSpacing(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: 'left' | 'center' | 'right' = 'left'
) {
  if (!text) return;

  if (spacing <= 0) {
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
    return;
  }

  let totalWidth = 0;
  for (let i = 0; i < text.length; i++) {
    totalWidth += ctx.measureText(text[i]).width;
    if (i < text.length - 1) totalWidth += spacing;
  }

  let startX = x;
  if (align === 'center') {
    startX = x - totalWidth / 2;
  } else if (align === 'right') {
    startX = x - totalWidth;
  }

  let currentX = startX;
  ctx.textAlign = 'left';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    ctx.fillText(char, currentX, y);
    currentX += ctx.measureText(char).width + spacing;
  }
}

/**
 * Draw authentic festival laurel wreath branches
 */
function drawFestivalLaurel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  title: string,
  scale: number
) {
  ctx.save();
  ctx.strokeStyle = '#D4AF37';
  ctx.fillStyle = '#D4AF37';
  ctx.lineWidth = 2 * scale;

  // Left arc
  ctx.beginPath();
  ctx.arc(cx - 110 * scale, cy, 70 * scale, -0.6 * Math.PI, 0.6 * Math.PI, false);
  ctx.stroke();

  // Right arc
  ctx.beginPath();
  ctx.arc(cx + 110 * scale, cy, 70 * scale, 0.4 * Math.PI, 1.6 * Math.PI, false);
  ctx.stroke();

  // Laurel leaves on left arc
  const leafCount = 7;
  for (let i = 0; i < leafCount; i++) {
    const angle = -0.5 * Math.PI + (i * Math.PI * 0.9) / (leafCount - 1);
    const lx = cx - 110 * scale + Math.cos(angle) * 70 * scale;
    const ly = cy + Math.sin(angle) * 70 * scale;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle + Math.PI / 4);
    ctx.beginPath();
    ctx.ellipse(0, 0, 10 * scale, 4 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Laurel leaves on right arc
  for (let i = 0; i < leafCount; i++) {
    const angle = 0.5 * Math.PI + (i * Math.PI * 0.9) / (leafCount - 1);
    const rx = cx + 110 * scale + Math.cos(angle) * 70 * scale;
    const ry = cy + Math.sin(angle) * 70 * scale;

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(angle - Math.PI / 4);
    ctx.beginPath();
    ctx.ellipse(0, 0, 10 * scale, 4 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Central festival text
  ctx.font = `600 ${Math.round(11 * scale)}px 'Manrope', sans-serif`;
  ctx.textAlign = 'center';
  drawTextWithSpacing(ctx, title.toUpperCase(), cx, cy - 8 * scale, 4 * scale, 'center');

  ctx.font = `800 ${Math.round(9 * scale)}px 'Manrope', sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  drawTextWithSpacing(ctx, 'OFFICIAL SELECTION', cx, cy + 12 * scale, 3 * scale, 'center');

  ctx.restore();
}

/**
 * Draw 35mm film perforations and Kodak frame counter
 */
function draw35mmSprockets(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  filmRollCode: string,
  scale: number
) {
  ctx.save();
  const stripWidth = 54 * scale;

  // Left & right black strips
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, stripWidth, height);
  ctx.fillRect(width - stripWidth, 0, stripWidth, height);

  // Sprocket holes
  const holeW = 20 * scale;
  const holeH = 28 * scale;
  const holeRadius = 5 * scale;
  const step = 56 * scale;

  ctx.fillStyle = '#18181b';
  for (let y = 30 * scale; y < height - 30 * scale; y += step) {
    // Left hole
    ctx.beginPath();
    ctx.roundRect((stripWidth - holeW) / 2, y, holeW, holeH, holeRadius);
    ctx.fill();

    // Right hole
    ctx.beginPath();
    ctx.roundRect(width - stripWidth + (stripWidth - holeW) / 2, y, holeW, holeH, holeRadius);
    ctx.fill();
  }

  // Kodak film markings along the strips
  ctx.fillStyle = '#F59E0B'; // Vintage amber/orange
  ctx.font = `700 ${Math.round(9 * scale)}px 'Space Grotesk', monospace`;

  // Left text rotated
  ctx.save();
  ctx.translate(stripWidth * 0.45, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText(filmRollCode || 'KODAK PORTRA 400 · 35mm SAFETY FILM', 0, 0);
  ctx.restore();

  // Right frame numbers
  ctx.save();
  ctx.translate(width - stripWidth * 0.45, height * 0.3);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('▶ 24A · EXP 36', 0, 0);
  ctx.restore();

  ctx.restore();
}

/**
 * Draw authentic luxury magazine barcode
 */
function drawMagazineBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number
) {
  ctx.save();
  // White/cream backdrop plate
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = '#09090b';
  const barCount = 32;
  const barStartX = x + 8 * scale;
  const barW = (width - 16 * scale) / barCount;
  const barH = height - 16 * scale;

  for (let i = 0; i < barCount; i++) {
    const isThick = (i * 7) % 3 === 0;
    const isSkip = (i * 11) % 5 === 0;
    if (!isSkip) {
      ctx.fillRect(
        barStartX + i * barW,
        y + 5 * scale,
        isThick ? barW * 0.85 : barW * 0.45,
        barH
      );
    }
  }

  // Issue number under barcode
  ctx.font = `600 ${Math.round(7 * scale)}px 'Manrope', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('ISSN 2026-0814 // CAA', x + width / 2, y + height - 3 * scale);

  ctx.restore();
}

/**
 * Draw Swiss modernist crosshairs & grid markers
 */
function drawSwissCrosshairs(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1 * scale;

  const cross = (cx: number, cy: number, size: number = 10 * scale) => {
    ctx.beginPath();
    ctx.moveTo(cx - size, cy);
    ctx.lineTo(cx + size, cy);
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx, cy + size);
    ctx.stroke();
  };

  // Crosshairs at golden intersections
  cross(60 * scale, 60 * scale);
  cross(width - 60 * scale, 60 * scale);
  cross(60 * scale, height - 60 * scale);
  cross(width - 60 * scale, height - 60 * scale);
  cross(width / 2, height / 2);

  // Top registration marks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = `600 ${Math.round(8 * scale)}px 'Space Grotesk', monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('GRID // REF: SWISS-MODERN-01', 75 * scale, 63 * scale);
  ctx.textAlign = 'right';
  ctx.fillText('COORD: 37°30\'N 127°02\'E', width - 75 * scale, 63 * scale);

  ctx.restore();
}

/**
 * Draw Japanese / Korean vermillion square seal stamp
 */
function drawAgencySeal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  scale: number
) {
  ctx.save();
  const size = 38 * scale;
  ctx.strokeStyle = '#E11D48';
  ctx.fillStyle = 'rgba(225, 29, 72, 0.15)';
  ctx.lineWidth = 2 * scale;

  ctx.beginPath();
  ctx.rect(x, y, size, size);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#E11D48';
  ctx.font = `900 ${Math.round(11 * scale)}px 'Noto Serif KR', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 2), x + size / 2, y + size * 0.35);
  ctx.fillText(text.slice(2, 4) || '印', x + size / 2, y + size * 0.72);

  ctx.restore();
}

/**
 * Draw delicate 4-pointed star sparkle
 */
function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  color: string = '#F5EFE7'
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + radius * Math.sin(angle);
    const y = cy - radius * Math.cos(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Draw delicate doodle hand-drawn heart curve
 */
function drawDoodleHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  strokeColor: string = '#D77D9B',
  lineWidth: number = 2
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Delicate hand-drawn open heart stroke
  const d = size;
  ctx.moveTo(0, d * 0.3);
  ctx.bezierCurveTo(-d * 0.5, -d * 0.2, -d * 0.5, -d * 0.6, 0, -d * 0.2);
  ctx.bezierCurveTo(d * 0.5, -d * 0.6, d * 0.5, -d * 0.2, 0, d * 0.3);
  ctx.stroke();

  // Subtle accent flourish loop
  ctx.beginPath();
  ctx.arc(d * 0.1, -d * 0.35, d * 0.12, 0, Math.PI * 1.5);
  ctx.stroke();

  ctx.restore();
}

/**
 * Main High-Performance Agency Thumbnail Engine
 */
export async function renderAgencyThumbnail(
  canvas: HTMLCanvasElement,
  params: RenderParams
): Promise<string> {
  const { imageSrc, preset, ratioConfig, logo, customText, logoOverride } = params;
  const width = ratioConfig.width;
  const height = ratioConfig.height;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  const scale = width / 1080;
  const archetype = preset.layoutArchetype || 'agency-minimal-caa';
  const details = preset.layoutDetails || {};

  // Wait for Google Fonts
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed gracefully
    }
  }

  // 1. Draw Canvas Background (Solid fill first)
  ctx.fillStyle = archetype === 'frame-passepartout'
    ? (details.passepartoutColor || '#0e0e12')
    : '#09090b';
  ctx.fillRect(0, 0, width, height);

  // 2. Load Source Photo
  let bgImg: HTMLImageElement | null = null;
  try {
    bgImg = await loadImage(imageSrc);
  } catch (err) {
    console.warn('Image load fallback used');
  }

  // 3. Archetype-Specific Geometry & Photo Rendering
  if (bgImg) {
    if (archetype === 'frame-passepartout') {
      // Museum Matting Frame: Inset photo with wide elegant border
      const pBorder = (details.passepartoutWidth || 56) * scale;
      const bottomCaptionHeight = 220 * scale;
      const innerW = width - pBorder * 2;
      const innerH = height - pBorder * 2 - bottomCaptionHeight;

      // Draw photo inside inset frame
      ctx.save();
      ctx.beginPath();
      ctx.rect(pBorder, pBorder, innerW, innerH);
      ctx.clip();

      const imgRatio = bgImg.width / bgImg.height;
      const boxRatio = innerW / innerH;
      let rW = innerW, rH = innerH, rX = pBorder, rY = pBorder;

      if (imgRatio > boxRatio) {
        rH = innerH;
        rW = innerH * imgRatio;
        rX = pBorder + (innerW - rW) / 2;
      } else {
        rW = innerW;
        rH = innerW / imgRatio;
        rY = pBorder + (innerH - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);
      ctx.restore();

      // Hairline frame around photo
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(pBorder, pBorder, innerW, innerH);

    } else if (archetype === 'cinematic-letterbox') {
      // Cinema 2.39:1 Letterbox Widescreen Viewport
      const barH = (details.letterboxHeight || 130) * scale;
      const apertureH = height - barH * 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, barH, width, apertureH);
      ctx.clip();

      const imgRatio = bgImg.width / bgImg.height;
      const boxRatio = width / apertureH;
      let rW = width, rH = apertureH, rX = 0, rY = barH;

      if (imgRatio > boxRatio) {
        rH = apertureH;
        rW = apertureH * imgRatio;
        rX = (width - rW) / 2;
      } else {
        rW = width;
        rH = width / imgRatio;
        rY = barH + (apertureH - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);
      ctx.restore();

      // Draw Top & Bottom Solid Black Cinema Bars
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, barH);
      ctx.fillRect(0, height - barH, width, barH);

      // Gold hairline dividers on cinema bars
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(0, barH);
      ctx.lineTo(width, barH);
      ctx.moveTo(0, height - barH);
      ctx.lineTo(width, height - barH);
      ctx.stroke();

    } else if (archetype === 'swiss-grid') {
      // Asymmetric Swiss Offset
      const leftMargin = 70 * scale;
      const topMargin = 80 * scale;
      const innerW = width - leftMargin;
      const innerH = height - topMargin;

      ctx.save();
      ctx.beginPath();
      ctx.rect(leftMargin, topMargin, innerW, innerH);
      ctx.clip();

      const imgRatio = bgImg.width / bgImg.height;
      const boxRatio = innerW / innerH;
      let rW = innerW, rH = innerH, rX = leftMargin, rY = topMargin;

      if (imgRatio > boxRatio) {
        rH = innerH;
        rW = innerH * imgRatio;
        rX = leftMargin + (innerW - rW) / 2;
      } else {
        rW = innerW;
        rH = innerW / imgRatio;
        rY = topMargin + (innerH - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);
      ctx.restore();

      // Border and grid dividers
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(leftMargin, 0);
      ctx.lineTo(leftMargin, height);
      ctx.moveTo(0, topMargin);
      ctx.lineTo(width, topMargin);
      ctx.stroke();

    } else if (archetype === 'cinematic-filmstrip') {
      // 3 vertically stacked film contact frames on left column, solid black panel on right
      const leftColW = width * 0.46;
      const rightColW = width - leftColW;
      const sprocketW = 24 * scale;
      const gapY = 12 * scale;
      const padY = 28 * scale;
      const padRight = 10 * scale;

      const frameX = sprocketW + 6 * scale;
      const frameW = leftColW - frameX - padRight;
      const totalAvailableH = height - padY * 2 - gapY * 2;
      const frameH = totalAvailableH / 3;

      // 1. Far-left 35mm film sprocket gutter
      ctx.fillStyle = '#040406';
      ctx.fillRect(0, 0, sprocketW, height);

      // Gold film symbols / frame marks along the track
      ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.font = `700 ${Math.round(8 * scale)}px monospace`;
      ctx.textAlign = 'center';
      const markCount = 18;
      for (let i = 0; i < markCount; i++) {
        const my = (height / markCount) * i + 20 * scale;
        if (i % 3 === 0) {
          ctx.fillText(`0${Math.floor(i / 3) + 1}`, sprocketW / 2, my);
        } else if (i % 3 === 1) {
          ctx.fillRect(sprocketW / 2 - 2 * scale, my - 3 * scale, 4 * scale, 6 * scale);
        } else {
          ctx.fillText('▲', sprocketW / 2, my);
        }
      }

      // 2. Three vertically stacked framing cuts (Top: close-up, Middle: bust, Bottom: intimate expression)
      const crops = [
        { yFocus: 0.22, zoom: 1.45 }, // Frame 1: Close-up on eyes & face
        { yFocus: 0.38, zoom: 1.10 }, // Frame 2: Medium bust portrait
        { yFocus: 0.32, zoom: 1.30 }  // Frame 3: Intimate expression crop
      ];

      for (let i = 0; i < 3; i++) {
        const frameY = padY + i * (frameH + gapY);
        ctx.save();
        ctx.beginPath();
        ctx.rect(frameX, frameY, frameW, frameH);
        ctx.clip();

        // Calculate aspect-ratio preserved crop with zoom
        const crop = crops[i];
        const targetRatio = frameW / frameH;

        let sW = bgImg.width / crop.zoom;
        let sH = sW / targetRatio;
        if (sH > bgImg.height) {
          sH = bgImg.height;
          sW = sH * targetRatio;
        }

        let sX = (bgImg.width - sW) / 2;
        let sY = bgImg.height * crop.yFocus - sH / 2;
        if (sY < 0) sY = 0;
        if (sY + sH > bgImg.height) sY = bgImg.height - sH;

        ctx.drawImage(bgImg, sX, sY, sW, sH, frameX, frameY, frameW, frameH);
        ctx.restore();

        // Subtle hairline frame around each contact print
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 1 * scale;
        ctx.strokeRect(frameX, frameY, frameW, frameH);
      }

      // 3. Draw Right 54% Solid Black Card
      ctx.fillStyle = '#08080a';
      ctx.fillRect(leftColW, 0, rightColW, height);

      // Subtle vertical divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(leftColW, 0);
      ctx.lineTo(leftColW, height);
      ctx.stroke();

    } else if (archetype === 'blue-editorial') {
      // Top 78% photo + Bottom 22% solid white panel
      const topH = height * 0.78;
      const btmH = height - topH;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, topH);
      ctx.clip();

      const imgRatio = bgImg.width / bgImg.height;
      const boxRatio = width / topH;
      let rW = width, rH = topH, rX = 0, rY = 0;
      if (imgRatio > boxRatio) {
        rH = topH;
        rW = topH * imgRatio;
        rX = (width - rW) / 2;
      } else {
        rW = width;
        rH = width / imgRatio;
        rY = (topH - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);
      ctx.restore();

      // Bottom Solid White Panel
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, topH, width, btmH);

      // Hairline accent line separating photo and white panel
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(0, topH);
      ctx.lineTo(width, topH);
      ctx.stroke();

    } else if (archetype === 'warm-minimal') {
      // Warm ivory/cream background (#F2EDE5) with photo positioned on right
      ctx.fillStyle = '#F2EDE5';
      ctx.fillRect(0, 0, width, height);

      // Draw photo on right
      const photoX = width * 0.38;
      const photoW = width - photoX;
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, 0, photoW, height);
      ctx.clip();

      const imgRatio = bgImg.width / bgImg.height;
      const boxRatio = photoW / height;
      let rW = photoW, rH = height, rX = photoX, rY = 0;
      if (imgRatio > boxRatio) {
        rH = height;
        rW = height * imgRatio;
        rX = photoX + (photoW - rW) / 2;
      } else {
        rW = photoW;
        rH = photoW / imgRatio;
        rY = (height - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);
      ctx.restore();

      // Warm gradient feather between cream left and photo right
      const blendGrad = ctx.createLinearGradient(photoX, 0, photoX + 100 * scale, 0);
      blendGrad.addColorStop(0, '#F2EDE5');
      blendGrad.addColorStop(1, 'rgba(242, 237, 229, 0)');
      ctx.fillStyle = blendGrad;
      ctx.fillRect(photoX, 0, 100 * scale, height);

    } else {
      // Standard full-bleed cover (Magazine, Monumental, Minimal, Contact Sheet, Zen, etc.)
      const imgRatio = bgImg.width / bgImg.height;
      const canvasRatio = width / height;
      let rW = width, rH = height, rX = 0, rY = 0;

      if (imgRatio > canvasRatio) {
        rH = height;
        rW = height * imgRatio;
        rX = (width - rW) / 2;
      } else {
        rW = width;
        rH = width / imgRatio;
        rY = (height - rH) / 2;
      }
      ctx.drawImage(bgImg, rX, rY, rW, rH);

      // Monochrome Archive conversion
      if (archetype === 'monochrome-archive' || archetype === 'birthday-monochrome-statement') {
        try {
          const imgData = ctx.getImageData(0, 0, width, height);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
            const contrast = (gray - 128) * 1.25 + 128;
            const clamped = Math.max(0, Math.min(255, contrast));
            d[i] = clamped;
            d[i + 1] = clamped;
            d[i + 2] = clamped;
          }
          ctx.putImageData(imgData, 0, 0);
        } catch {
          // Graceful fallback if tainted canvas in browser
        }
      }
    }
  }

  // 4. Overlays & Gradients (Scrims tailored to archetype)
  const scrimOpacity = preset.overlay.gradientOpacity || 0.65;
  if (archetype === 'magazine-cover') {
    // Top subtle scrim for masthead legibility + bottom subtle scrim
    const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.28);
    topGrad.addColorStop(0, `rgba(9, 9, 11, ${scrimOpacity * 0.75})`);
    topGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, height * 0.28);

    const btmGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    btmGrad.addColorStop(0, 'rgba(9, 9, 11, 0)');
    btmGrad.addColorStop(1, `rgba(9, 9, 11, ${scrimOpacity * 0.85})`);
    ctx.fillStyle = btmGrad;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);

  } else if (archetype === 'cinematic-letterbox') {
    // Inner subtle vignette on the photo aperture
    const barH = (details.letterboxHeight || 130) * scale;
    const apertureH = height - barH * 2;
    const vig = ctx.createRadialGradient(
      width / 2, barH + apertureH / 2, apertureH * 0.3,
      width / 2, barH + apertureH / 2, width * 0.65
    );
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, barH, width, apertureH);

  } else if (archetype !== 'frame-passepartout') {
    // Bottom scrim for text reading
    const grad = ctx.createLinearGradient(0, height * 0.48, 0, height);
    grad.addColorStop(0, 'rgba(9, 9, 11, 0)');
    grad.addColorStop(0.5, `rgba(9, 9, 11, ${scrimOpacity * 0.6})`);
    grad.addColorStop(1, `rgba(9, 9, 11, ${scrimOpacity})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 5. Film Grain / Procedural Atmosphere
  if (preset.overlay.filmGrain || archetype === 'analog-contact-sheet') {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < 5000; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.2, 1.2);
    }
    ctx.restore();
  }

  // 6. Draw Archetype-Specific Graphic Embellishments
  if (archetype === 'analog-contact-sheet') {
    draw35mmSprockets(ctx, width, height, details.filmRollCode || 'KODAK PORTRA 400 · 35mm SAFETY FILM', scale);

    // Red grease-pencil crop frame in center
    ctx.save();
    ctx.strokeStyle = '#E11D48';
    ctx.lineWidth = 3 * scale;
    ctx.setLineDash([12 * scale, 8 * scale]);
    ctx.strokeRect(80 * scale, 120 * scale, width - 160 * scale, height - 260 * scale);
    ctx.restore();

  } else if (archetype === 'cinematic-letterbox') {
    // Festival laurels at top center
    const barH = (details.letterboxHeight || 130) * scale;
    drawFestivalLaurel(
      ctx,
      width / 2,
      barH / 2,
      details.festivalText || preset.kicker.text || 'CANNES 2026',
      scale
    );

  } else if (archetype === 'swiss-grid') {
    drawSwissCrosshairs(ctx, width, height, scale);

    // Vertical text in left strip
    ctx.save();
    ctx.translate(38 * scale, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = `700 ${Math.round(10 * scale)}px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    drawTextWithSpacing(
      ctx,
      details.verticalRibbonText || 'CREATIVE ARTISTS AGENCY · SWISS MODERN GRID',
      0,
      0,
      4 * scale,
      'center'
    );
    ctx.restore();

    // Large index number
    if (details.indexNumber) {
      ctx.save();
      ctx.font = `800 ${Math.round(48 * scale)}px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.textAlign = 'right';
      ctx.fillText(details.indexNumber, width - 40 * scale, 70 * scale);
      ctx.restore();
    }

  } else if (archetype === 'magazine-cover' && details.showBarcode !== false) {
    // Draw luxury barcode at bottom right
    const bcW = 120 * scale;
    const bcH = 48 * scale;
    drawMagazineBarcode(ctx, width - bcW - 40 * scale, height - bcH - 35 * scale, bcW, bcH, scale);

    // Top issue line
    ctx.save();
    ctx.font = `700 ${Math.round(10 * scale)}px 'Manrope', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    drawTextWithSpacing(
      ctx,
      `VOL. 26 // ISSUE NO. 04 // ${preset.dateCredits.text || 'PARIS · NEW YORK · SEOUL'}`,
      width / 2,
      35 * scale,
      5 * scale,
      'center'
    );
    ctx.restore();

  } else if (archetype === 'zen-vertical') {
    // Red Agency Square Stamp Seal
    drawAgencySeal(ctx, 50 * scale, height - 120 * scale, '藝人認證', scale);

  } else if (archetype === 'agency-minimal-caa') {
    // Top official dispatch banner
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = `700 ${Math.round(9 * scale)}px 'Manrope', monospace`;
    ctx.textAlign = 'left';
    drawTextWithSpacing(ctx, 'CAA MANAGEMENT // OFFICIAL PRESS DISPATCH', 50 * scale, 45 * scale, 3 * scale, 'left');
    ctx.textAlign = 'right';
    drawTextWithSpacing(ctx, 'CONFIDENTIAL · FOR IMMEDIATE RELEASE', width - 50 * scale, 45 * scale, 3 * scale, 'right');

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(50 * scale, 58 * scale);
    ctx.lineTo(width - 50 * scale, 58 * scale);
    ctx.stroke();
    ctx.restore();
  }

  // 7. Typography Layout Rendering (Tailored to Archetype!)
  const mainTitleText = customText?.title ?? preset.title.text;
  const subText = customText?.subtitle ?? preset.subtitle.text;
  const actorNameText = customText?.actorName ?? preset.actorName.text;
  const kickerText = customText?.kicker ?? preset.kicker.text;
  const dateCreditsText = customText?.dateCredits ?? preset.dateCredits.text;

  if (archetype === 'magazine-cover') {
    // A. MAGAZINE MASTHEAD: Giant Title across top (Y: 10%~15%)
    ctx.save();
    ctx.fillStyle = preset.title.color || '#FFFFFF';
    const titleSize = Math.round((preset.title.size || 88) * scale);
    ctx.font = `${preset.title.weight || 900} ${titleSize}px '${preset.title.font}', serif`;
    ctx.textAlign = 'center';
    drawTextWithSpacing(
      ctx,
      mainTitleText.toUpperCase(),
      width / 2,
      130 * scale,
      (preset.title.letterSpacing || 6) * scale,
      'center'
    );

    // Kicker right beneath masthead
    if (kickerText) {
      ctx.font = `600 ${Math.round(12 * scale)}px 'Manrope', sans-serif`;
      ctx.fillStyle = '#D4AF37';
      drawTextWithSpacing(ctx, `[ ${kickerText.toUpperCase()} ]`, width / 2, 165 * scale, 4 * scale, 'center');
    }

    // Actor Name in middle-left (Y: 52%)
    if (actorNameText) {
      ctx.font = `700 ${Math.round(36 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 12 * scale;
      drawTextWithSpacing(ctx, actorNameText, 60 * scale, height * 0.52, 2 * scale, 'left');

      // Actor subtitle
      ctx.font = `600 ${Math.round(13 * scale)}px 'Manrope', sans-serif`;
      ctx.fillStyle = '#E4D5B7';
      drawTextWithSpacing(ctx, subText.toUpperCase(), 60 * scale, height * 0.52 + 30 * scale, 3 * scale, 'left');
    }
    ctx.restore();

  } else if (archetype === 'cinematic-letterbox') {
    // B. CINEMA LETTERBOX: Centered title in bottom black bar + billing block
    const barH = (details.letterboxHeight || 130) * scale;
    const btmBarY = height - barH;

    ctx.save();
    // Title centered in bottom bar
    ctx.fillStyle = '#FFFFFF';
    const titleSize = Math.round(34 * scale);
    ctx.font = `700 ${titleSize}px 'DM Serif Display', serif`;
    drawTextWithSpacing(ctx, mainTitleText.toUpperCase(), width / 2, btmBarY + 48 * scale, 4 * scale, 'center');

    // Actor Name
    ctx.font = `600 ${Math.round(20 * scale)}px 'Noto Serif KR', serif`;
    ctx.fillStyle = '#D4AF37';
    drawTextWithSpacing(ctx, actorNameText, width / 2, btmBarY + 84 * scale, 3 * scale, 'center');

    // Billing block line
    ctx.font = `500 ${Math.round(10 * scale)}px 'Manrope', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    drawTextWithSpacing(
      ctx,
      `SPECIAL PRESENTATION · ${dateCreditsText || 'DIRECTED BY SEOUL · CAA TALENT'}`,
      width / 2,
      btmBarY + 112 * scale,
      3 * scale,
      'center'
    );
    ctx.restore();

  } else if (archetype === 'frame-passepartout') {
    // C. MUSEUM PASSE-PARTOUT: Title & Actor centered in bottom white/charcoal matting
    const pBorder = (details.passepartoutWidth || 56) * scale;
    const bottomCaptionHeight = 220 * scale;
    const captionCenterY = height - pBorder - bottomCaptionHeight / 2;

    ctx.save();
    // Thin gold divider line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80 * scale, captionCenterY - 45 * scale);
    ctx.lineTo(width / 2 + 80 * scale, captionCenterY - 45 * scale);
    ctx.stroke();

    // Main Title
    ctx.fillStyle = '#FFFFFF';
    const titleSize = Math.round(32 * scale);
    ctx.font = `700 ${titleSize}px 'Bodoni Moda', serif`;
    drawTextWithSpacing(ctx, mainTitleText.toUpperCase(), width / 2, captionCenterY - 15 * scale, 6 * scale, 'center');

    // Actor Name
    ctx.font = `600 ${Math.round(22 * scale)}px 'Noto Serif KR', serif`;
    ctx.fillStyle = '#E4D5B7';
    drawTextWithSpacing(ctx, actorNameText, width / 2, captionCenterY + 22 * scale, 4 * scale, 'center');

    // Subtitle & date
    ctx.font = `500 ${Math.round(11 * scale)}px 'Manrope', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    drawTextWithSpacing(
      ctx,
      `${subText.toUpperCase()} — ${dateCreditsText}`,
      width / 2,
      captionCenterY + 50 * scale,
      3 * scale,
      'center'
    );
    ctx.restore();

  } else if (archetype === 'stacked-monumental') {
    // D. STACKED MONUMENTAL: Massive 2-line words in giant heavy font
    ctx.save();
    const words = mainTitleText.split(' ');
    const line1 = words[0] || 'FIRST';
    const line2 = words.slice(1).join(' ') || 'PITCH';

    const giantSize = Math.round(82 * scale);
    ctx.font = `900 ${giantSize}px 'Archivo Black', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 16 * scale;

    const tY = height * 0.72;
    drawTextWithSpacing(ctx, line1.toUpperCase(), 50 * scale, tY, 2 * scale, 'left');
    drawTextWithSpacing(ctx, line2.toUpperCase(), 50 * scale, tY + 76 * scale, 2 * scale, 'left');

    // Diagonal high-energy athletic badge
    ctx.save();
    ctx.translate(width - 150 * scale, 120 * scale);
    ctx.rotate(-10 * Math.PI / 180);
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(-80 * scale, -20 * scale, 160 * scale, 40 * scale);
    ctx.fillStyle = '#000000';
    ctx.font = `900 ${Math.round(13 * scale)}px 'Archivo Black', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kickerText || 'CHAMPIONSHIP', 0, 0);
    ctx.restore();

    // Actor name at bottom right
    ctx.font = `800 ${Math.round(28 * scale)}px 'Noto Sans KR', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    drawTextWithSpacing(ctx, actorNameText, width - 50 * scale, tY + 76 * scale, 2 * scale, 'right');

    ctx.restore();

  } else if (archetype === 'zen-vertical') {
    // E. ZEN MINIMAL VERTICAL: Vertical text running down left/right side
    ctx.save();
    // Vertical Korean/English title along left margin
    const startY = height * 0.22;
    const charSpacing = 38 * scale;
    ctx.font = `700 ${Math.round(26 * scale)}px 'Noto Serif KR', serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    const titleChars = Array.from(mainTitleText);
    for (let i = 0; i < Math.min(titleChars.length, 12); i++) {
      ctx.fillText(titleChars[i], 65 * scale, startY + i * charSpacing);
    }

    // Actor name at bottom left
    ctx.font = `700 ${Math.round(30 * scale)}px 'Noto Serif KR', serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    drawTextWithSpacing(ctx, actorNameText, 120 * scale, height - 70 * scale, 4 * scale, 'left');

    // Horizontal english subtitle
    ctx.font = `600 ${Math.round(11 * scale)}px 'Manrope', sans-serif`;
    ctx.fillStyle = '#D4AF37';
    drawTextWithSpacing(ctx, subText.toUpperCase(), 120 * scale, height - 42 * scale, 3 * scale, 'left');

    ctx.restore();

  } else if (archetype === 'signature-script' || archetype === 'blue-signature') {
    // 02. SIGNATURE SCRIPT & 08. BLUE SIGNATURE
    ctx.save();
    const isBlue = archetype === 'blue-signature';
    const scriptColor = isBlue ? '#45658F' : '#FFFFFF';
    const fontName = isBlue ? 'Pinyon Script' : 'Allura';

    // Top Right vertical badge for 02
    if (!isBlue) {
      ctx.font = `700 ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      const trX = width - 50 * scale;
      drawTextWithSpacing(ctx, 'NEW', trX, 60 * scale, 3 * scale, 'right');
      drawTextWithSpacing(ctx, 'CASTING', trX, 78 * scale, 3 * scale, 'right');
      drawTextWithSpacing(ctx, 'NEWS', trX, 96 * scale, 3 * scale, 'right');
    } else {
      ctx.font = `600 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
      ctx.fillStyle = '#45658F';
      drawTextWithSpacing(ctx, 'BLANC ARTIST ROSTER', 60 * scale, 120 * scale, 3 * scale, 'left');
    }

    // Large diagonal cursive script
    ctx.save();
    const scriptY = isBlue ? height * 0.76 : height * 0.65;
    const scriptX = isBlue ? 60 * scale : width / 2;
    ctx.translate(scriptX, scriptY);
    ctx.rotate(-7.5 * Math.PI / 180);
    ctx.font = `400 ${Math.round((preset.title.size || 96) * scale)}px '${fontName}', cursive`;
    ctx.fillStyle = scriptColor;
    ctx.textAlign = isBlue ? 'left' : 'center';
    if (!isBlue) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 18 * scale;
    }
    ctx.fillText(mainTitleText, 0, 0);
    ctx.restore();

    // Actor Name
    if (actorNameText) {
      if (isBlue) {
        ctx.font = `700 ${Math.round(26 * scale)}px 'Noto Serif KR', serif`;
        ctx.fillStyle = '#FFFFFF';
        drawTextWithSpacing(ctx, actorNameText, 60 * scale, height * 0.67, 3 * scale, 'left');
      } else {
        ctx.font = `700 ${Math.round(28 * scale)}px 'Noto Serif KR', serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 10 * scale;
        drawTextWithSpacing(ctx, actorNameText, width / 2, height * 0.82, 3 * scale, 'center');
      }
    }

    // Subtitle
    if (subText) {
      if (isBlue) {
        // Bottom Right 2-line quote
        const lines = subText.split('\n');
        ctx.font = `500 ${Math.round(16 * scale)}px 'Noto Serif KR', serif`;
        ctx.fillStyle = '#F4F4F5';
        ctx.textAlign = 'right';
        const brX = width - 60 * scale;
        lines.forEach((line, idx) => {
          drawTextWithSpacing(ctx, line, brX, height * 0.84 + idx * 28 * scale, 2 * scale, 'right');
        });
      } else {
        ctx.font = `400 ${Math.round(14 * scale)}px 'Pretendard', sans-serif`;
        ctx.fillStyle = '#F5F2EC';
        drawTextWithSpacing(ctx, subText, width / 2, height * 0.88, 2 * scale, 'center');
      }
    }

    // Date / Agency Credits
    ctx.font = `500 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    if (isBlue) {
      drawTextWithSpacing(ctx, dateCreditsText, width - 60 * scale, height * 0.94, 3 * scale, 'right');
    } else {
      drawTextWithSpacing(ctx, dateCreditsText, width / 2, height * 0.94, 4 * scale, 'center');
    }
    ctx.restore();

  } else if (archetype === 'cinematic-filmstrip') {
    // 04. CINEMATIC FILMSTRIP: Layout on right 54% solid black panel
    ctx.save();
    const rightCardX = width * 0.46 + 46 * scale;

    // Vertical divider line in upper area (under the top logo)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(rightCardX, 130 * scale);
    ctx.lineTo(rightCardX, 195 * scale);
    ctx.stroke();

    // Actor Name (discreet agency credit)
    if (actorNameText) {
      ctx.font = `600 ${Math.round(13 * scale)}px 'Pretendard', sans-serif`;
      ctx.fillStyle = '#A1A1AA';
      drawTextWithSpacing(ctx, actorNameText, rightCardX, 235 * scale, 2 * scale, 'left');
    }

    // Title: Playfair Display 2-line CASTING NEWS
    const lines = mainTitleText.split('\n');
    ctx.font = `700 ${Math.round(52 * scale)}px 'Playfair Display', serif`;
    ctx.fillStyle = '#FFFFFF';
    lines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line.toUpperCase(), rightCardX, 290 * scale + idx * 56 * scale, 3 * scale, 'left');
    });

    // Horizontal thin divider
    const dividerY = 290 * scale + (lines.length - 1) * 56 * scale + 38 * scale;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(rightCardX, dividerY);
    ctx.lineTo(rightCardX + 50 * scale, dividerY);
    ctx.stroke();

    // 3-line Korean quote
    const quoteLines = (subText || '새로운 작품,\n새로운 얼굴,\n더 좋은 이야기.').split('\n');
    ctx.font = `400 ${Math.round(15 * scale)}px 'Pretendard', sans-serif`;
    ctx.fillStyle = '#E4E4E7';
    quoteLines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line, rightCardX, dividerY + 36 * scale + idx * 28 * scale, 1.5 * scale, 'left');
    });

    // Bottom 3-line agency metadata
    const bottomLines = [
      'GOOD PEOPLE',
      'GOOD STORIES',
      'BLANC ENTERTAINMENT'
    ];
    ctx.font = `600 ${Math.round(9 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    bottomLines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line, rightCardX, height - 100 * scale + idx * 20 * scale, 3.5 * scale, 'left');
    });

    ctx.restore();

  } else if (archetype === 'warm-minimal') {
    // 03. WARM MINIMAL: Cream background, top-left 3-line Korean quote, bottom-left Bodoni title
    ctx.save();
    // Top-left 3-line Korean quote
    const quoteLines = subText.split('\n');
    ctx.font = `500 ${Math.round(20 * scale)}px 'Noto Serif KR', serif`;
    ctx.fillStyle = '#2A2A2A';
    quoteLines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line, 60 * scale, 80 * scale + idx * 34 * scale, 1 * scale, 'left');
    });

    // Actor Name
    if (actorNameText) {
      ctx.font = `700 ${Math.round(24 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#1A1A1A';
      drawTextWithSpacing(ctx, actorNameText, 60 * scale, height * 0.73, 2 * scale, 'left');
    }

    // Title: Bodoni Moda 2-line in #1A1A1A
    const titleLines = mainTitleText.split('\n');
    ctx.font = `600 ${Math.round(52 * scale)}px 'Bodoni Moda', serif`;
    ctx.fillStyle = '#1A1A1A';
    titleLines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line.toUpperCase(), 60 * scale, height * 0.81 + idx * 56 * scale, 3 * scale, 'left');
    });

    // Date credits
    ctx.font = `500 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#71717A';
    drawTextWithSpacing(ctx, dateCreditsText, 60 * scale, height * 0.94, 3 * scale, 'left');
    ctx.restore();

  } else if (archetype === 'blue-editorial') {
    // 06. BLUE EDITORIAL: Floating quote on photo, large steel navy title in bottom white panel
    ctx.save();
    // Floating Korean quote in upper/middle photo area
    if (subText) {
      ctx.font = `500 ${Math.round(18 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 8 * scale;
      drawTextWithSpacing(ctx, subText, 60 * scale, height * 0.55, 2 * scale, 'left');
    }

    // Bottom Solid White Panel Title: Libre Baskerville in Steel Navy (#526B95)
    ctx.shadowBlur = 0;
    const topH = height * 0.78;
    ctx.font = `700 ${Math.round(54 * scale)}px 'Libre Baskerville', serif`;
    ctx.fillStyle = '#526B95';
    drawTextWithSpacing(ctx, mainTitleText.toUpperCase(), width / 2, topH + 80 * scale, 4 * scale, 'center');

    // Actor Name centered beneath title in white panel
    if (actorNameText) {
      ctx.font = `700 ${Math.round(22 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#2A3B52';
      drawTextWithSpacing(ctx, actorNameText, width / 2, topH + 130 * scale, 3 * scale, 'center');
    }

    // Credits in bottom panel
    ctx.font = `600 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#718096';
    drawTextWithSpacing(ctx, dateCreditsText, width / 2, topH + 168 * scale, 3 * scale, 'center');
    ctx.restore();

  } else if (archetype === 'monochrome-archive') {
    // 05. MONOCHROME ARCHIVE: Ultra wide-tracking Cormorant Garamond Light
    ctx.save();
    // Subtle hairline border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1 * scale;
    ctx.strokeRect(30 * scale, 30 * scale, width - 60 * scale, height - 60 * scale);

    // Kicker
    if (kickerText) {
      ctx.font = `600 ${Math.round(10 * scale)}px 'Pretendard', monospace`;
      ctx.fillStyle = '#A1A1AA';
      drawTextWithSpacing(ctx, kickerText, width / 2, 70 * scale, 4 * scale, 'center');
    }

    // Actor Name
    if (actorNameText) {
      ctx.font = `500 ${Math.round(22 * scale)}px 'Pretendard', sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, width / 2, height * 0.68, 4 * scale, 'center');
    }

    // Main Title: High-tracking C A S T I N G  N E W S
    ctx.font = `300 ${Math.round(38 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#FFFFFF';
    drawTextWithSpacing(ctx, mainTitleText.toUpperCase(), width / 2, height * 0.77, 10 * scale, 'center');

    // Subtitle
    if (subText) {
      ctx.font = `400 ${Math.round(11 * scale)}px 'Pretendard', sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      drawTextWithSpacing(ctx, subText, width / 2, height * 0.85, 3 * scale, 'center');
    }

    // Credits
    ctx.font = `500 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    drawTextWithSpacing(ctx, dateCreditsText, width / 2, height * 0.92, 4 * scale, 'center');
    ctx.restore();

  } else if (archetype === 'midnight-cinema') {
    // 07. MIDNIGHT CINEMA: Centered Cinzel Roman All-caps Title & Navy/Gold Mood
    ctx.save();
    // Kicker at top center
    if (kickerText) {
      ctx.font = `700 ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
      ctx.fillStyle = '#D4AF37';
      drawTextWithSpacing(ctx, `[ ${kickerText.toUpperCase()} ]`, width / 2, 130 * scale, 4 * scale, 'center');
    }

    // Actor Name
    if (actorNameText) {
      ctx.font = `600 ${Math.round(26 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, width / 2, height * 0.70, 4 * scale, 'center');
    }

    // Title: Cinzel centered
    ctx.font = `700 ${Math.round(52 * scale)}px 'Cinzel', serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 14 * scale;
    drawTextWithSpacing(ctx, mainTitleText.toUpperCase(), width / 2, height * 0.78, 8 * scale, 'center');

    // Subtitle
    if (subText) {
      ctx.font = `400 ${Math.round(14 * scale)}px 'Pretendard', sans-serif`;
      ctx.fillStyle = '#D4AF37';
      drawTextWithSpacing(ctx, subText, width / 2, height * 0.86, 2 * scale, 'center');
    }

    // Credits
    ctx.font = `500 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    drawTextWithSpacing(ctx, dateCreditsText, width / 2, height * 0.93, 4 * scale, 'center');
    ctx.restore();

  } else if (archetype === 'classic-editorial') {
    // 01. CLASSIC EDITORIAL: Cormorant Garamond 2-line Title bottom-left, Blanc logo top-left
    ctx.save();
    const tX = 60 * scale;

    // Actor Name
    if (actorNameText) {
      ctx.font = `600 ${Math.round(24 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, tX, height * 0.68, 2 * scale, 'left');
    }

    // Title: 2 lines
    const titleLines = mainTitleText.split('\n');
    ctx.font = `600 ${Math.round(58 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#FFFFFF';
    titleLines.forEach((line, idx) => {
      drawTextWithSpacing(ctx, line.toUpperCase(), tX, height * 0.75 + idx * 62 * scale, 4 * scale, 'left');
    });

    // Subtitle
    if (subText) {
      ctx.font = `400 ${Math.round(14 * scale)}px 'Pretendard', sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      drawTextWithSpacing(ctx, subText, tX, height * 0.87, 1.5 * scale, 'left');
    }

    // Credits
    ctx.font = `500 ${Math.round(10 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    drawTextWithSpacing(ctx, dateCreditsText, tX, height * 0.93, 3 * scale, 'left');
    ctx.restore();

  } else if (archetype === 'birthday-romantic-signature') {
    // BIRTHDAY 01: ROMANTIC SIGNATURE (-8° Allura Script, Bottom-Left Blessing)
    ctx.save();
    // Top-left Date
    ctx.font = `600 ${Math.round(14 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    drawTextWithSpacing(ctx, kickerText || 'OCT 23', 55 * scale, 55 * scale, 3 * scale, 'left');

    // Diagonal Allura Cursive Script
    ctx.save();
    ctx.translate(65 * scale, height * 0.14);
    ctx.rotate(-8 * Math.PI / 180);
    ctx.font = `400 ${Math.round(112 * scale)}px 'Allura', cursive`;
    ctx.fillStyle = '#E9A7B4';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 12 * scale;
    ctx.fillText('Happy', 0, 0);
    ctx.fillText('Birthday', 15 * scale, 105 * scale);
    ctx.restore();

    // Actor Name
    if (actorNameText) {
      ctx.font = `600 ${Math.round(20 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, 55 * scale, height * 0.80, 2 * scale, 'left');
    }

    // Bottom-left Quote (Wishing you a day as special as you are.)
    ctx.font = `400 ${Math.round(18 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    const bLines = (subText || 'Wishing you a day\nas special\nas you are.').split('\n');
    bLines.forEach((l, idx) => {
      drawTextWithSpacing(ctx, l, 55 * scale, height * 0.84 + idx * 24 * scale, 1 * scale, 'left');
    });

    // Date/Time
    ctx.font = `500 ${Math.round(9 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    drawTextWithSpacing(ctx, dateCreditsText, 55 * scale, height * 0.95, 2 * scale, 'left');
    ctx.restore();

  } else if (archetype === 'birthday-classic-editorial') {
    // BIRTHDAY 02: CLASSIC EDITORIAL (Cormorant Garamond Center Top, Right Quote, Divider)
    ctx.save();
    // Top-left OCT / 23
    ctx.font = `600 ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#433A37';
    drawTextWithSpacing(ctx, 'OCT', 55 * scale, 48 * scale, 2 * scale, 'left');
    drawTextWithSpacing(ctx, '23', 55 * scale, 64 * scale, 2 * scale, 'left');

    // Title: HAPPY BIRTHDAY top center (tightly packed)
    ctx.font = `600 ${Math.round(84 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#433A37';
    ctx.textAlign = 'center';
    drawTextWithSpacing(ctx, 'HAPPY', width / 2, height * 0.10, 3 * scale, 'center');
    drawTextWithSpacing(ctx, 'BIRTHDAY', width / 2, height * 0.17, 3 * scale, 'center');

    // Right mid quote (Y: 38%)
    ctx.font = `400 ${Math.round(16 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#433A37';
    const rLines = (subText || 'May your every day\nbe filled with\nhappiness.').split('\n');
    rLines.forEach((l, idx) => {
      drawTextWithSpacing(ctx, l, width - 55 * scale, height * 0.38 + idx * 22 * scale, 1 * scale, 'right');
    });

    // Hairline divider at Y: 85%
    ctx.strokeStyle = 'rgba(67, 58, 55, 0.3)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120 * scale, height * 0.86);
    ctx.lineTo(width / 2 + 120 * scale, height * 0.86);
    ctx.stroke();

    // Bottom center: NEW DAY / BRIGHTER YOU
    ctx.font = `600 ${Math.round(13 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#433A37';
    drawTextWithSpacing(ctx, actorNameText || 'NEW DAY / BRIGHTER YOU', width / 2, height * 0.89, 4 * scale, 'center');

    // Credits
    ctx.font = `500 ${Math.round(9 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(67, 58, 55, 0.65)';
    drawTextWithSpacing(ctx, dateCreditsText, width / 2, height * 0.94, 3 * scale, 'center');
    ctx.restore();

  } else if (archetype === 'birthday-soft-blush') {
    // BIRTHDAY 03: SOFT BLUSH (Libre Baskerville Left Top Stack, 10/23 Hairline Line, Bottom Quote)
    ctx.save();
    // Top-left 3-line stack
    ctx.font = `500 ${Math.round(32 * scale)}px 'Libre Baskerville', serif`;
    ctx.fillStyle = '#FFF3EE';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 8 * scale;
    drawTextWithSpacing(ctx, 'HAPPY', 60 * scale, height * 0.08, 6 * scale, 'left');
    drawTextWithSpacing(ctx, 'BIRTHDAY', 60 * scale, height * 0.12, 6 * scale, 'left');
    drawTextWithSpacing(ctx, 'TO YOU', 60 * scale, height * 0.16, 6 * scale, 'left');

    // Top-right: 10 / 23 with vertical hairline line below
    const trX = width - 60 * scale;
    ctx.font = `600 ${Math.round(13 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#FFF3EE';
    drawTextWithSpacing(ctx, '10', trX, 50 * scale, 2 * scale, 'right');
    drawTextWithSpacing(ctx, '23', trX, 68 * scale, 2 * scale, 'right');

    ctx.strokeStyle = 'rgba(255, 243, 238, 0.45)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(trX - 8 * scale, 82 * scale);
    ctx.lineTo(trX - 8 * scale, 135 * scale);
    ctx.stroke();

    // Actor Name
    if (actorNameText) {
      ctx.font = `600 ${Math.round(20 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFF3EE';
      drawTextWithSpacing(ctx, actorNameText, 60 * scale, height * 0.79, 2 * scale, 'left');
    }

    // Bottom-left poetic quote
    ctx.font = `400 ${Math.round(16 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = 'rgba(255, 243, 238, 0.9)';
    const sbLines = (subText || 'More love, more happiness,\nmore of the beautiful moments ahead.').split('\n');
    sbLines.forEach((l, idx) => {
      drawTextWithSpacing(ctx, l, 60 * scale, height * 0.84 + idx * 24 * scale, 1 * scale, 'left');
    });

    ctx.restore();

  } else if (archetype === 'birthday-midnight-luxury') {
    // BIRTHDAY 04: MIDNIGHT LUXURY (Bodoni Across Shoulder, Star Sparkle, Ivory/Black Glamour)
    ctx.save();
    // Top-right TO THE / BRIGHTEST / YOU
    const trX = width - 60 * scale;
    ctx.font = `500 ${Math.round(13 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#F5EFE7';
    drawTextWithSpacing(ctx, 'TO THE', trX, 48 * scale, 3 * scale, 'right');
    drawTextWithSpacing(ctx, 'BRIGHTEST', trX, 66 * scale, 3 * scale, 'right');
    drawTextWithSpacing(ctx, 'YOU', trX, 84 * scale, 3 * scale, 'right');

    // 4-pointed Star sparkle below top-right text
    drawFourPointStar(ctx, trX - 12 * scale, 110 * scale, 9 * scale, 2.5 * scale, '#F5EFE7');

    // Centered horizontal title across shoulder
    ctx.font = `600 ${Math.round(80 * scale)}px 'Bodoni Moda', serif`;
    ctx.fillStyle = '#F5EFE7';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 16 * scale;
    drawTextWithSpacing(ctx, 'HAPPY', width / 2, height * 0.64, 8 * scale, 'center');
    drawTextWithSpacing(ctx, 'BIRTHDAY', width / 2, height * 0.72, 8 * scale, 'center');

    // Bottom right date & quote
    ctx.font = `500 ${Math.round(14 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#F5EFE7';
    drawTextWithSpacing(ctx, '2026. 10. 23', trX, height * 0.88, 3 * scale, 'right');

    ctx.font = `600 ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(245, 239, 231, 0.8)';
    drawTextWithSpacing(ctx, 'ALWAYS', trX, height * 0.93, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'BE', trX, height * 0.955, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'HAPPY', trX, height * 0.98, 2 * scale, 'right');

    ctx.restore();

  } else if (archetype === 'birthday-monochrome-statement') {
    // BIRTHDAY 05: MONOCHROME STATEMENT (Massive Pink Condensed Serif, Black & White Photo)
    ctx.save();
    // Top-left: ANOTHER / BEAUTIFUL / CHAPTER
    ctx.font = `600 ${Math.round(13 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    drawTextWithSpacing(ctx, 'ANOTHER', 55 * scale, 48 * scale, 3 * scale, 'left');
    drawTextWithSpacing(ctx, 'BEAUTIFUL', 55 * scale, 66 * scale, 3 * scale, 'left');
    drawTextWithSpacing(ctx, 'CHAPTER', 55 * scale, 84 * scale, 3 * scale, 'left');

    // Massive bottom-left stacked serif in fashion blush pink #E6A2B5
    ctx.font = `700 ${Math.round(115 * scale)}px 'Bodoni Moda', serif`;
    ctx.fillStyle = '#E6A2B5';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 12 * scale;
    drawTextWithSpacing(ctx, 'HAPPY', 55 * scale, height * 0.72, 1 * scale, 'left');
    drawTextWithSpacing(ctx, 'BIRTHDAY', 55 * scale, height * 0.84, 1 * scale, 'left');

    // Mid-right quote
    const brX = width - 55 * scale;
    ctx.font = `500 ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    drawTextWithSpacing(ctx, 'SAME', brX, height * 0.78, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'BRIGHT', brX, height * 0.805, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'HEART', brX, height * 0.83, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'BRIGHTER', brX, height * 0.855, 2 * scale, 'right');
    drawTextWithSpacing(ctx, 'DAYS', brX, height * 0.88, 2 * scale, 'right');

    // Bottom-right date
    ctx.font = `600 ${Math.round(14 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    drawTextWithSpacing(ctx, 'OCT 23', brX, height * 0.94, 3 * scale, 'right');

    ctx.restore();

  } else if (archetype === 'birthday-pink-celebration') {
    // BIRTHDAY 06: PINK CELEBRATION (Playfair Large 2-line + Hand-drawn Pink Heart)
    ctx.save();
    // Title top-left in Playfair Display
    ctx.font = `700 ${Math.round(84 * scale)}px 'Playfair Display', serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 14 * scale;
    drawTextWithSpacing(ctx, 'HAPPY', 60 * scale, height * 0.09, 3 * scale, 'left');
    drawTextWithSpacing(ctx, 'BIRTHDAY', 60 * scale, height * 0.16, 3 * scale, 'left');

    // Delicate hand-drawn doodle heart in soft pink #D77D9B right next to title
    drawDoodleHeart(ctx, width * 0.78, height * 0.08, 38 * scale, '#D77D9B', 3 * scale);

    // Actor name
    if (actorNameText) {
      ctx.font = `700 ${Math.round(22 * scale)}px 'Noto Serif KR', serif`;
      ctx.fillStyle = '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, 60 * scale, height * 0.72, 2 * scale, 'left');
    }

    // Bottom-left 5-line quote
    ctx.font = `600 ${Math.round(12 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const pQuotes = ['TO', 'SOMEONE', 'WHO', 'MAKES', 'THE WORLD', 'BRIGHTER'];
    pQuotes.forEach((q, idx) => {
      drawTextWithSpacing(ctx, q, 60 * scale, height * 0.78 + idx * 19 * scale, 2 * scale, 'left');
    });

    ctx.restore();

  } else if (archetype === 'birthday-cinematic-night') {
    // BIRTHDAY 07: CINEMATIC NIGHT (Montserrat Wide Top, Allura 'to you' with Heart Bottom)
    ctx.save();
    // Top-center wide Montserrat
    ctx.font = `400 ${Math.round(26 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#FFF7F1';
    drawTextWithSpacing(ctx, 'H A P P Y   B I R T H D A Y', width / 2, 50 * scale, 8 * scale, 'center');

    ctx.font = `400 ${Math.round(12 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 247, 241, 0.8)';
    drawTextWithSpacing(ctx, 'MAY ALL YOUR WISHES COME TRUE', width / 2, 75 * scale, 3 * scale, 'center');

    // Bottom-right cursive Allura 'to you'
    const brX = width - 60 * scale;
    ctx.save();
    ctx.font = `400 ${Math.round(92 * scale)}px 'Allura', cursive`;
    ctx.fillStyle = '#FFF7F1';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 12 * scale;
    ctx.textAlign = 'right';
    ctx.fillText('to you', brX, height * 0.84);
    ctx.restore();

    // Mini doodle heart near to you
    drawDoodleHeart(ctx, brX + 8 * scale, height * 0.81, 16 * scale, '#FFF7F1', 1.5 * scale);

    // Date
    ctx.font = `500 ${Math.round(14 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = 'rgba(255, 247, 241, 0.85)';
    drawTextWithSpacing(ctx, '2026.10.23', brX, height * 0.92, 2 * scale, 'right');

    ctx.restore();

  } else if (archetype === 'birthday-floral-minimal') {
    // BIRTHDAY 08: FLORAL MINIMAL (Cormorant Garamond 27px, 10.23, Fine 45px Hairline Line)
    ctx.save();
    // Top-center Cormorant Garamond
    ctx.font = `500 ${Math.round(24 * scale)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#4A4844';
    drawTextWithSpacing(ctx, 'H A P P Y   B I R T H D A Y', width / 2, 55 * scale, 7 * scale, 'center');

    // Date
    ctx.font = `500 ${Math.round(18 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#4A4844';
    drawTextWithSpacing(ctx, '10.23', width / 2, 85 * scale, 3 * scale, 'center');

    // Bottom-center THANK YOU / FOR BEING YOU
    ctx.font = `500 ${Math.round(14 * scale)}px 'Montserrat', sans-serif`;
    ctx.fillStyle = '#4A4844';
    drawTextWithSpacing(ctx, 'THANK YOU', width / 2, height * 0.86, 3 * scale, 'center');
    drawTextWithSpacing(ctx, 'FOR BEING YOU', width / 2, height * 0.89, 3 * scale, 'center');

    // 45px fine line divider
    ctx.strokeStyle = 'rgba(74, 72, 68, 0.4)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 25 * scale, height * 0.92);
    ctx.lineTo(width / 2 + 25 * scale, height * 0.92);
    ctx.stroke();

    ctx.restore();

  } else {
    // F. CLASSIC AGENCY MINIMAL (CAA Official Dispatch)
    ctx.save();
    const tX = (width * preset.title.xPercent) / 100;
    const tY = (height * preset.title.yPercent) / 100;

    // Horizontal hairline divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(tX, tY - 60 * scale);
    ctx.lineTo(width - tX, tY - 60 * scale);
    ctx.stroke();

    // Kicker
    if (kickerText) {
      ctx.font = `700 ${Math.round(11 * scale)}px 'Manrope', sans-serif`;
      ctx.fillStyle = '#D4AF37';
      drawTextWithSpacing(ctx, kickerText.toUpperCase(), tX, tY - 40 * scale, 4 * scale, preset.title.align);
    }

    // Main Title
    const titleSize = Math.round(preset.title.size * scale);
    ctx.font = `${preset.title.weight} ${titleSize}px '${preset.title.font}', serif`;
    ctx.fillStyle = preset.title.color || '#FFFFFF';
    drawTextWithSpacing(
      ctx,
      mainTitleText.toUpperCase(),
      tX,
      tY,
      preset.title.letterSpacing * scale,
      preset.title.align
    );

    // Actor Name
    if (actorNameText) {
      const aX = (width * preset.actorName.xPercent) / 100;
      const aY = (height * preset.actorName.yPercent) / 100;
      ctx.font = `700 ${Math.round(preset.actorName.size * scale)}px '${preset.actorName.font}', serif`;
      ctx.fillStyle = preset.actorName.color || '#FFFFFF';
      drawTextWithSpacing(ctx, actorNameText, aX, aY, preset.actorName.letterSpacing * scale, preset.actorName.align);
    }

    // Subtitle & Date
    if (subText) {
      const sX = (width * preset.subtitle.xPercent) / 100;
      const sY = (height * preset.subtitle.yPercent) / 100;
      ctx.font = `600 ${Math.round(preset.subtitle.size * scale)}px 'Manrope', sans-serif`;
      ctx.fillStyle = '#A1A1AA';
      drawTextWithSpacing(ctx, subText.toUpperCase(), sX, sY, preset.subtitle.letterSpacing * scale, preset.subtitle.align);
    }
    ctx.restore();
  }

  // 8. Render Agency Logo (with Relative % Positioning)
  const logoConfig = { ...preset.logo, ...logoOverride };
  const logoTargetW = (width * logoConfig.widthPercent) / 100;

  try {
    let logoImg: HTMLImageElement;
    if (logo.svgString) {
      const logoColor = logoConfig.autoInvertContrast ? '#FFFFFF' : '#111111';
      logoImg = await loadSvgString(logo.svgString, logoColor);
    } else if (logo.dataUrl) {
      logoImg = await loadImage(logo.dataUrl);
    } else {
      throw new Error('No logo data');
    }

    const logoRatio = logoImg.width / logoImg.height;
    const logoTargetH = logoTargetW / logoRatio;

    let lX = (width * logoConfig.xPercent) / 100;
    let lY = (height * logoConfig.yPercent) / 100;

    switch (logoConfig.anchor) {
      case 'bottom-right':
        lX -= logoTargetW;
        lY -= logoTargetH;
        break;
      case 'bottom-left':
        lY -= logoTargetH;
        break;
      case 'bottom-center':
        lX -= logoTargetW / 2;
        lY -= logoTargetH;
        break;
      case 'top-right':
        lX -= logoTargetW;
        break;
      case 'top-center':
        lX -= logoTargetW / 2;
        break;
      case 'center':
        lX -= logoTargetW / 2;
        lY -= logoTargetH / 2;
        break;
      case 'top-left':
      default:
        break;
    }

    ctx.save();
    ctx.globalAlpha = logoConfig.opacity;

    if (logoConfig.showBackdrop) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(lX - 8, lY - 6, logoTargetW + 16, logoTargetH + 12);
    }

    ctx.drawImage(logoImg, lX, lY, logoTargetW, logoTargetH);
    ctx.restore();
  } catch (err) {
    // Discrete fallback
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = `800 ${Math.round(11 * scale)}px 'Manrope', sans-serif`;
    ctx.fillText('CAA GLOBAL ARTISTS', width - 150 * scale, height - 30 * scale);
    ctx.restore();
  }

  return canvas.toDataURL('image/png', 0.95);
}
