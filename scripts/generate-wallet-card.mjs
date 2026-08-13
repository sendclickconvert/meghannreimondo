/**
 * Generates public/meghann-wallet-card.png from an inline SVG.
 * Run once: node scripts/generate-wallet-card.mjs
 * When Kyra sends the final graphic, simply replace public/meghann-wallet-card.png
 * and this script is no longer needed (the download link already points at that path).
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'meghann-wallet-card.png');

// Credit-card proportions: 3.375 × 2.125 in → at 200 dpi ≈ 675 × 425 px
const W = 675;
const H = 425;
const STRIPE = 12;   // top/bottom accent bar height
const NAVY = '#012566';
const RED  = '#D60F29';
const CREAM = '#F9F6F0';

// Both cards side-by-side with a small gap
const GAP = 20;
const TOTAL_W = W * 2 + GAP;
const TOTAL_H = H;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TOTAL_W}" height="${TOTAL_H}" viewBox="0 0 ${TOTAL_W} ${TOTAL_H}">
  <defs>
    <style>
      @font-face {}
    </style>
  </defs>

  <!-- canvas background -->
  <rect width="${TOTAL_W}" height="${TOTAL_H}" fill="${CREAM}" />

  <!-- ══════════════ FRONT card ══════════════ -->
  <rect x="0" y="0" width="${W}" height="${H}" rx="18" ry="18" fill="${NAVY}" />
  <!-- top stripe -->
  <rect x="0" y="0" width="${W}" height="${STRIPE}" rx="18" ry="18" fill="${RED}" />
  <rect x="0" y="${STRIPE / 2}" width="${W}" height="${STRIPE / 2}" fill="${RED}" />
  <!-- bottom stripe -->
  <rect x="0" y="${H - STRIPE}" width="${W}" height="${STRIPE}" rx="0" ry="0" fill="${RED}" />
  <rect x="0" y="${H - STRIPE}" width="${W}" height="${STRIPE / 2}" fill="${RED}" />
  <rect x="0" y="${H - STRIPE}" width="${W}" height="${STRIPE}" rx="18" ry="18" fill="${RED}" />
  <!-- bottom stripe clean -->
  <rect x="0" y="${H - STRIPE}" width="${W}" height="${STRIPE}" fill="${RED}" />
  <rect x="0" y="${H - STRIPE - 9}" width="${W}" height="9" rx="0" fill="${NAVY}" />

  <!-- "WRITE-IN" badge -->
  <rect x="${W / 2 - 72}" y="52" width="144" height="32" rx="16" fill="white" />
  <text x="${W / 2}" y="73" font-family="Georgia, serif" font-weight="700" font-size="15"
    fill="${RED}" text-anchor="middle" letter-spacing="4" font-variant="small-caps">WRITE-IN</text>

  <!-- candidate name -->
  <text x="${W / 2}" y="155" font-family="Georgia, 'Times New Roman', serif" font-weight="900"
    font-size="58" fill="white" text-anchor="middle" letter-spacing="-1">MEGHANN</text>
  <text x="${W / 2}" y="220" font-family="Georgia, 'Times New Roman', serif" font-weight="900"
    font-size="58" fill="white" text-anchor="middle" letter-spacing="-1">REIMONDO</text>

  <!-- office -->
  <text x="${W / 2}" y="260" font-family="Arial, sans-serif" font-size="17"
    fill="rgba(255,255,255,0.85)" text-anchor="middle" letter-spacing="1">for Woodstock Town Supervisor</text>

  <!-- tagline pill -->
  <rect x="${W / 2 - 105}" y="280" width="210" height="36" rx="6" fill="rgba(255,255,255,0.95)" />
  <text x="${W / 2}" y="304" font-family="Georgia, serif" font-style="italic" font-weight="700"
    font-size="16" fill="${RED}" text-anchor="middle">Leading with Heart</text>

  <!-- ══════════════ BACK card ══════════════ -->
  <rect x="${W + GAP}" y="0" width="${W}" height="${H}" rx="18" ry="18" fill="white" />
  <!-- top stripe navy -->
  <rect x="${W + GAP}" y="0" width="${W}" height="${STRIPE}" rx="18" ry="18" fill="${NAVY}" />
  <rect x="${W + GAP}" y="${STRIPE / 2}" width="${W}" height="${STRIPE / 2}" fill="${NAVY}" />
  <!-- bottom stripe navy -->
  <rect x="${W + GAP}" y="${H - STRIPE}" width="${W}" height="${STRIPE}" fill="${NAVY}" />
  <rect x="${W + GAP}" y="${H - STRIPE - 9}" width="${W}" height="9" fill="white" />

  <!-- "HOW TO WRITE ME IN" heading -->
  <text x="${W + GAP + W / 2}" y="72" font-family="Arial, Helvetica, sans-serif" font-weight="700"
    font-size="14" fill="${RED}" text-anchor="middle" letter-spacing="3">HOW TO WRITE ME IN</text>

  <!-- Step 1 -->
  <circle cx="${W + GAP + 52}" cy="130" r="18" fill="${NAVY}" />
  <text x="${W + GAP + 52}" y="136" font-family="Arial, sans-serif" font-weight="700"
    font-size="15" fill="white" text-anchor="middle">1</text>
  <text x="${W + GAP + 80}" y="120" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a">Find the write-in area at the</text>
  <text x="${W + GAP + 80}" y="140" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a" font-weight="700">bottom of the ballot,</text>
  <text x="${W + GAP + 80}" y="158" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a">Town Supervisor column</text>

  <!-- Step 2 -->
  <circle cx="${W + GAP + 52}" cy="218" r="18" fill="${NAVY}" />
  <text x="${W + GAP + 52}" y="224" font-family="Arial, sans-serif" font-weight="700"
    font-size="15" fill="white" text-anchor="middle">2</text>
  <text x="${W + GAP + 80}" y="210" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a">Write in:</text>
  <text x="${W + GAP + 80}" y="230" font-family="Arial, Helvetica, sans-serif" font-size="15"
    fill="${NAVY}" font-weight="700">MEGHANN REIMONDO</text>

  <!-- Step 3 -->
  <circle cx="${W + GAP + 52}" cy="295" r="18" fill="${NAVY}" />
  <text x="${W + GAP + 52}" y="301" font-family="Arial, sans-serif" font-weight="700"
    font-size="15" fill="white" text-anchor="middle">3</text>
  <text x="${W + GAP + 80}" y="287" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a">Fill it in to make</text>
  <text x="${W + GAP + 80}" y="307" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1a1a1a" font-weight="700">your vote count</text>

  <!-- Election label -->
  <text x="${W + GAP + W / 2}" y="${H - 24}" font-family="Arial, sans-serif" font-size="13"
    fill="${CREAM}" text-anchor="middle" letter-spacing="1">November 3, 2026 · Woodstock, NY</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(OUT);

console.log(`✓ Written: ${OUT}`);
console.log(`  Dimensions: ${TOTAL_W} × ${TOTAL_H} px`);
console.log(`  Replace this file with Kyra's graphic at the same path and the download links update automatically.`);
