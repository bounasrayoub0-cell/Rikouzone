import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Precise vector reconstruction of the uploaded RikouZone cyber neon RZ icon
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <!-- Background Radial Glow -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#0a0f1d" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#05060b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#020306" stop-opacity="1"/>
    </radialGradient>

    <!-- Rainbow Neon Border Gradient for Squircle -->
    <linearGradient id="neonBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="25%" stop-color="#38ef7d"/>
      <stop offset="50%" stop-color="#f1c40f"/>
      <stop offset="75%" stop-color="#ff007f"/>
      <stop offset="100%" stop-color="#7000ff"/>
    </linearGradient>

    <!-- Card Body Inner Gradient -->
    <linearGradient id="badgeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c16"/>
      <stop offset="50%" stop-color="#04060a"/>
      <stop offset="100%" stop-color="#020306"/>
    </linearGradient>

    <!-- Letter R Gradient: Electric Cyan to Neon Lime Green -->
    <linearGradient id="rGrad" x1="0%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#00f6ff"/>
      <stop offset="35%" stop-color="#00c6ff"/>
      <stop offset="70%" stop-color="#10e88a"/>
      <stop offset="100%" stop-color="#38ef7d"/>
    </linearGradient>

    <!-- Letter R Leg Gradient: Vibrant Electric Blue to Cyan -->
    <linearGradient id="rLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e1ff"/>
      <stop offset="50%" stop-color="#0080ff"/>
      <stop offset="100%" stop-color="#0051ff"/>
    </linearGradient>

    <!-- Letter Z Gradient: Lime Green to Neon Magenta/Pink -->
    <linearGradient id="zGrad" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#44ff44"/>
      <stop offset="30%" stop-color="#76ff03"/>
      <stop offset="55%" stop-color="#eeff41"/>
      <stop offset="75%" stop-color="#ff00a0"/>
      <stop offset="100%" stop-color="#e00090"/>
    </linearGradient>

    <!-- Orbital Swoosh Ring Gradient: Cyan to Lime Green -->
    <linearGradient id="swooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="45%" stop-color="#00e5ff"/>
      <stop offset="75%" stop-color="#22ff88"/>
      <stop offset="100%" stop-color="#80ff00"/>
    </linearGradient>

    <!-- Lower Swoosh Arc Gradient: Cyan Blue -->
    <linearGradient id="lowerSwooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d2ff"/>
      <stop offset="60%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#44ffaa"/>
    </linearGradient>

    <!-- Bevel Specular Highlights -->
    <linearGradient id="bevelWhite" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1"/>
    </linearGradient>

    <!-- Intense Neon Glow Filter -->
    <filter id="neonGlowOuter" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22" result="blur1"/>
      <feGaussianBlur stdDeviation="10" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur1"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="ringGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Deep Cosmic Black Background -->
  <rect width="1024" height="1024" fill="#040508"/>
  <rect width="1024" height="1024" fill="url(#bgGlow)"/>

  <!-- Outer Ambient Atmospheric Neon Halo -->
  <rect x="76" y="76" width="872" height="872" rx="230" ry="230" 
        fill="none" stroke="url(#neonBorderGrad)" stroke-width="32" 
        opacity="0.45" filter="url(#neonGlowOuter)"/>

  <!-- Main Rounded Squircle Badge Base -->
  <rect x="80" y="80" width="864" height="864" rx="220" ry="220" 
        fill="url(#badgeBodyGrad)" stroke="url(#neonBorderGrad)" stroke-width="12"/>

  <!-- Inner Subtle Accent Outline -->
  <rect x="100" y="100" width="824" height="824" rx="200" ry="200" 
        fill="none" stroke="#00f2fe" stroke-width="2" opacity="0.3"/>

  <!-- ================= TECH HUD ACCENTS ================= -->
  <!-- Top Tech Circuit Lines & Node -->
  <g opacity="0.95" filter="url(#subtleGlow)">
    <!-- 3 Angled Cyan Slashes (///) at Top-Left -->
    <line x1="240" y1="195" x2="275" y2="165" stroke="#00e5ff" stroke-width="14" stroke-linecap="round"/>
    <line x1="275" y1="195" x2="310" y2="165" stroke="#00e5ff" stroke-width="14" stroke-linecap="round"/>
    <line x1="310" y1="195" x2="345" y2="165" stroke="#00e5ff" stroke-width="14" stroke-linecap="round"/>

    <!-- Cyan Circuit Trace with Node Dot -->
    <path d="M 180,285 L 215,220 L 410,155 L 565,155" fill="none" stroke="#00e5ff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="580" cy="155" r="10" fill="#00f2fe"/>
    <circle cx="580" cy="155" r="5" fill="#ffffff"/>
  </g>

  <!-- Bottom Tech Circuit Lines & Slashes -->
  <g opacity="0.95" filter="url(#subtleGlow)">
    <!-- Bottom Circuit Trace with Green Node Dot -->
    <path d="M 175,720 L 230,775 L 360,775 L 420,835 L 515,835" fill="none" stroke="#22ff66" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="530" cy="835" r="10" fill="#22ff66"/>
    <circle cx="530" cy="835" r="5" fill="#ffffff"/>

    <!-- 3 Angled Magenta Slashes (///) at Bottom-Right -->
    <line x1="645" y1="835" x2="680" y2="805" stroke="#ff0099" stroke-width="14" stroke-linecap="round"/>
    <line x1="680" y1="835" x2="715" y2="805" stroke="#ff0099" stroke-width="14" stroke-linecap="round"/>
    <line x1="715" y1="835" x2="750" y2="805" stroke="#ff0099" stroke-width="14" stroke-linecap="round"/>
  </g>

  <!-- ================= AMBIENT SHADOWS ================= -->
  <g opacity="0.65" filter="blur(22px)">
    <!-- Lower Swoosh Shadow -->
    <path d="M 90,605 C 105,675 220,685 410,610 C 270,670 145,675 90,605 Z" fill="#000000"/>
    <!-- Central RZ Shadow -->
    <polygon points="160,290 535,285 590,410 470,515 565,650 870,395 890,670 450,725 155,700" fill="#000000"/>
  </g>

  <!-- ================= LOWER ORBITAL SWOOSH ARC ================= -->
  <!-- Sweeping Crescent Arc cutting under the R's left leg -->
  <g filter="url(#ringGlow)">
    <!-- Glowing Halo -->
    <path d="M 95,570 C 95,640 185,675 425,605 C 265,655 135,640 95,570 Z" 
          fill="url(#lowerSwooshGrad)" opacity="0.6" filter="blur(8px)"/>
    <!-- Sharp Crescent Blade -->
    <path d="M 95,570 C 105,635 195,665 425,605 C 275,648 140,635 95,570 Z" 
          fill="url(#lowerSwooshGrad)"/>
    <!-- White Highlight Edge on Swoosh -->
    <path d="M 120,580 C 160,630 260,645 425,605" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8" stroke-linecap="round"/>
  </g>

  <!-- ================= UPPER ORBITAL SWOOSH RING ================= -->
  <!-- Arches from behind R loop across and over the Z -->
  <g filter="url(#ringGlow)">
    <!-- Glowing Halo behind upper swoop -->
    <path d="M 440,295 C 600,240 820,205 910,240 C 910,240 860,330 670,395 C 775,340 870,285 440,295 Z" 
          fill="url(#swooshGrad)" opacity="0.5" filter="blur(10px)"/>
    <!-- Main Upper Crescent Swoop -->
    <path d="M 440,295 C 620,240 825,205 910,240 C 865,320 685,385 640,395 C 765,345 865,280 440,295 Z" 
          fill="url(#swooshGrad)"/>
    <!-- Upper Glossy Specular Rim -->
    <path d="M 470,290 C 630,240 820,215 905,240" fill="none" stroke="#ffffff" stroke-width="3.5" opacity="0.9" stroke-linecap="round"/>
  </g>

  <!-- ================= MONOGRAM "RZ" ================= -->
  <!-- Group with subtle drop shadow for depth -->
  <g>
    <!-- LETTER R -->
    <!-- R Left Leg / Polygon (Detached Futuristic Style) -->
    <g filter="url(#subtleGlow)">
      <!-- Outer Leg Body -->
      <polygon points="230,395 365,395 285,605 160,605" fill="url(#rLegGrad)"/>
      <!-- Inner Bevel Highlight -->
      <polygon points="230,395 365,395 350,425 240,425" fill="#ffffff" opacity="0.7"/>
      <polygon points="230,395 250,400 180,600 160,605" fill="#00f2fe" opacity="0.8"/>
      <!-- Edge Highlight line -->
      <line x1="230" y1="395" x2="365" y2="395" stroke="#ffffff" stroke-width="3"/>
    </g>

    <!-- R Main Upper Loop & Stem -->
    <g filter="url(#subtleGlow)">
      <!-- Main Upper Body of R -->
      <path d="M 160,280 L 530,280 C 605,280 625,360 560,425 C 500,480 410,485 340,485 L 340,485 L 535,670 L 440,715 L 290,545 L 290,545 L 340,485 L 230,485 Z" 
            fill="url(#rGrad)"/>

      <!-- Re-drawn precise R Body matching the reference:
           Reference has:
           - Top bar: Slanted horizontal bar across top
           - Angular rounded loop curving on the right
           - Slanted diagonal leg connecting to the Z -->
      <path d="M 160,280 L 525,280 C 595,280 618,345 570,410 C 530,460 455,475 385,475 L 565,655 L 445,715 L 325,565 L 295,565 L 335,475 L 230,475 Z" 
            fill="url(#rGrad)"/>

      <!-- R Inner Counter Cutout (Dark Hollow) -->
      <polygon points="260,355 450,355 480,395 440,415 285,415" fill="#070b14"/>

      <!-- Top Chrome Ridge Highlight on R -->
      <line x1="160" y1="280" x2="525" y2="280" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 525,280 C 585,280 605,335 570,395" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
      <line x1="160" y1="280" x2="230" y2="475" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
      <line x1="325" y1="565" x2="445" y2="715" stroke="#76ff03" stroke-width="3.5" stroke-linecap="round"/>
    </g>


    <!-- LETTER Z -->
    <g filter="url(#subtleGlow)">
      <!-- Z Top Bar, Diagonal Slash & Bottom Bar -->
      <!-- Top Bar: Starts near R waist, points right -->
      <!-- Diagonal: Slashes down from top-right to bottom-left -->
      <!-- Bottom Bar: Wide base at bottom-right -->
      <path d="M 590,405 L 865,405 L 815,485 L 610,635 L 880,635 L 850,715 L 445,715 L 505,635 L 700,485 L 535,485 Z" 
            fill="url(#zGrad)"/>

      <!-- Z Top Bevel Highlight (Greenish Gold) -->
      <polygon points="590,405 865,405 845,435 605,435" fill="#ffffff" opacity="0.75"/>
      <line x1="590" y1="405" x2="865" y2="405" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>

      <!-- Z Diagonal Ridge Highlight Line -->
      <line x1="815" y1="485" x2="610" y2="635" stroke="#ffffff" stroke-width="3.5" opacity="0.85" stroke-linecap="round"/>

      <!-- Z Bottom Magenta Rim Highlight -->
      <polygon points="445,715 850,715 865,685 470,685" fill="#ff77d5" opacity="0.5"/>
      <line x1="445" y1="715" x2="850" y2="715" stroke="#ff00a0" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="850" y1="715" x2="880" y2="635" stroke="#ff80df" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- Glossy Glint Specular Flashes -->
    <!-- Glint 1: Top-Left of R -->
    <g transform="translate(160, 280)">
      <circle cx="0" cy="0" r="8" fill="#ffffff" filter="url(#subtleGlow)"/>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#ffffff" stroke-width="3"/>
    </g>

    <!-- Glint 2: Peak of R Loop -->
    <g transform="translate(525, 280)">
      <circle cx="0" cy="0" r="7" fill="#80ff00" filter="url(#subtleGlow)"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" stroke-width="2.5"/>
    </g>

    <!-- Glint 3: Top-Right of Z -->
    <g transform="translate(865, 405)">
      <circle cx="0" cy="0" r="7" fill="#eeff41" filter="url(#subtleGlow)"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" stroke-width="2.5"/>
    </g>

    <!-- Glint 4: Bottom-Right of Z -->
    <g transform="translate(850, 715)">
      <circle cx="0" cy="0" r="8" fill="#ff00a0" filter="url(#subtleGlow)"/>
      <line x1="-14" y1="0" x2="14" y2="0" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="-14" x2="0" y2="14" stroke="#ffffff" stroke-width="3"/>
    </g>
  </g>
</svg>`;

async function generateBrandIcons() {
  console.log('Rendering SVG to multi-resolution PNG assets...');

  // 1. Save SVG
  const svgPath = path.join(publicDir, 'assets', 'rz-hero-badge.svg');
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log(`Saved SVG: ${svgPath}`);

  // 2. Render 1024x1024 Master High-Res PNG
  const resvg1024 = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: 1024 }
  });
  const png1024 = resvg1024.render().asPng();

  // Save as uploaded image filename in public
  fs.writeFileSync(path.join(publicDir, 'file_00000000b1d881f496a6612e6eef85ce.png'), png1024);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), png1024);
  fs.writeFileSync(path.join(publicDir, 'assets', 'rz-hero-badge.png'), png1024);
  console.log('Saved 1024x1024 brand PNGs.');

  // 3. Render 180x180 Apple Touch Icon
  const resvg180 = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: 180 }
  });
  const png180 = resvg180.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  console.log('Saved 180x180 apple-touch-icon.png.');

  // 4. Render 32x32 Favicon
  const resvg32 = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: 32 }
  });
  const png32 = resvg32.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  console.log('Saved 32x32 favicon-32x32.png.');

  // 5. Render 16x16 Favicon
  const resvg16 = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: 16 }
  });
  const png16 = resvg16.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  console.log('Saved 16x16 favicon-16x16.png.');

  // 6. Build Multi-Res ICO file containing 16x16 and 32x32 PNGs
  const icoBuffer = createIcoFromPngs([png16, png32]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved multi-resolution favicon.ico.');

  // 7. Copy to dist if dist exists
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(path.join(publicDir, 'file_00000000b1d881f496a6612e6eef85ce.png'), path.join(distDir, 'file_00000000b1d881f496a6612e6eef85ce.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon.png'), path.join(distDir, 'favicon.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-32x32.png'), path.join(distDir, 'favicon-32x32.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-16x16.png'), path.join(distDir, 'favicon-16x16.png'));
    fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(distDir, 'apple-touch-icon.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(distDir, 'favicon.ico'));
    console.log('Copied all updated icon assets to dist directory.');
  }

  console.log('All brand icons and favicons generated successfully!');
}

function createIcoFromPngs(pngBuffers) {
  // ICO header: 6 bytes
  // Reserved: 2 bytes (0)
  // Type: 2 bytes (1 for ICO)
  // Count: 2 bytes (number of images)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  const dirEntries = [];
  let offset = 6 + (16 * pngBuffers.length);

  for (const png of pngBuffers) {
    // Read width and height from PNG IHDR chunk (offset 16 & 20)
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0); // width
    entry.writeUInt8(height >= 256 ? 0 : height, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // size of image in bytes
    entry.writeUInt32LE(offset, 12); // offset of image data

    dirEntries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

generateBrandIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
