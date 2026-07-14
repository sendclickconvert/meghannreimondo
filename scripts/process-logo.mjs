// Process the circular campaign badge into a transparent-corner header logo + favicons.
// Circular mask (NOT a white-key) — the badge has white INTERIOR text that must stay opaque;
// only the square corners outside the circle become transparent.
// Usage: node scripts/process-logo.mjs "<path-to-source>"
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = process.argv[2] || 'assets/brand/logo-src.webp';
const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

const meta = await sharp(SRC).metadata();
const { width: w, height: h } = meta;
const d = Math.min(w, h);
console.log(`source ${w}x${h}, alpha=${meta.hasAlpha}`);

// Circular mask: keep the inscribed circle, drop the corners.
const mask = Buffer.from(
  `<svg width="${w}" height="${h}"><circle cx="${w / 2}" cy="${h / 2}" r="${d / 2}" fill="#fff"/></svg>`
);
const circular = await sharp(SRC)
  .ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// Header logo — square, transparent corners, 400px.
await sharp(circular).resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92 }).toFile(`${OUT}/logo.webp`);

// Favicons — the badge reads well small (it's already a circular mark).
const pad = { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } };
await sharp(circular).resize(32, 32, pad).png().toFile(`${OUT}/favicon-32.png`);
await sharp(circular).resize(192, 192, pad).png().toFile(`${OUT}/favicon-192.png`);
await sharp(circular).resize(180, 180, pad).png().toFile(`${OUT}/apple-touch-icon.png`);

console.log('Wrote logo.webp + favicon-32/192 + apple-touch-icon (circular, transparent corners).');
