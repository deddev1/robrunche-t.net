/**
 * Recompress all public gameplay webps + favicon/logo assets.
 * Run: node scripts/compress-all-images.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'robrun-compress-'));

const IMAGE_DIRS = [
  path.join(publicDir, 'images', 'hero'),
  path.join(publicDir, 'images', 'blog'),
  path.join(publicDir, 'images', 'gameplay'),
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function walkWebps(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.webp$/i.test(f) && !/\.tmp\.webp$/i.test(f))
    .map((f) => path.join(dir, f));
}

async function replaceFile(dest, buf) {
  const tmp = path.join(tmpDir, `${path.basename(dest)}.${process.pid}.${Date.now()}`);
  fs.writeFileSync(tmp, buf);
  let lastErr;
  for (let i = 0; i < 12; i++) {
    try {
      try {
        fs.unlinkSync(dest);
      } catch (e) {
        if (e.code !== 'ENOENT') throw e;
      }
      fs.copyFileSync(tmp, dest);
      fs.unlinkSync(tmp);
      return;
    } catch (e) {
      lastErr = e;
      await sleep(150 + i * 100);
    }
  }
  try {
    fs.unlinkSync(tmp);
  } catch {
    /* ignore */
  }
  throw lastErr;
}

async function compressWebp(file) {
  const base = path.basename(file);
  const isOg = /-og\.webp$/i.test(base);
  const isMaster = !/-\d+\.webp$/i.test(base) && !isOg;
  const quality = isOg ? 78 : isMaster ? 74 : 68;
  const before = fs.statSync(file).size;
  const input = fs.readFileSync(file);
  const buf = await sharp(input)
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer();
  if (buf.length < before) {
    await replaceFile(file, buf);
    return { file, before, after: buf.length };
  }
  return { file, before, after: before, skipped: true };
}

async function compressPng(file, { maxEdge } = {}) {
  if (!fs.existsSync(file)) return null;
  const before = fs.statSync(file).size;
  const input = fs.readFileSync(file);
  let pipeline = sharp(input).ensureAlpha();
  if (maxEdge) {
    pipeline = pipeline.resize(maxEdge, maxEdge, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  const buf = await pipeline
    .png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
    .toBuffer();
  // Fall back to non-palette if palette blew up colors badly / larger
  const bufFull = await sharp(input)
    .ensureAlpha()
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
  const best = buf.length <= bufFull.length ? buf : bufFull;
  if (best.length < before) {
    await replaceFile(file, best);
    return { file, before, after: best.length };
  }
  return { file, before, after: before, skipped: true };
}

function pngToIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = 6 + count * 16;
  const entries = [];
  for (const png of pngBuffers) {
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);
    const metaBuf = Buffer.alloc(16);
    metaBuf[0] = w >= 256 ? 0 : w;
    metaBuf[1] = h >= 256 ? 0 : h;
    metaBuf.writeUInt16LE(1, 4);
    metaBuf.writeUInt16LE(32, 6);
    metaBuf.writeUInt32LE(png.length, 8);
    metaBuf.writeUInt32LE(offset, 12);
    entries.push(metaBuf);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

let saved = 0;
let beforeTotal = 0;
let afterTotal = 0;

console.log('Compressing webps…');
for (const dir of IMAGE_DIRS) {
  for (const file of walkWebps(dir)) {
    const r = await compressWebp(file);
    beforeTotal += r.before;
    afterTotal += r.after;
    if (!r.skipped) {
      saved += r.before - r.after;
      console.log(
        `  ${path.relative(root, r.file)} ${Math.round(r.before / 1024)}KB → ${Math.round(r.after / 1024)}KB`,
      );
    }
  }
}

console.log('\nCompressing favicon / logo PNGs…');
const pngTargets = [
  ['favicon-16.png', 16],
  ['favicon-32.png', 32],
  ['favicon.png', 48],
  ['favicon-192.png', 192],
  ['favicon-512.png', 512],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192.png', 192],
  ['android-chrome-512.png', 512],
  ['logo.png', 128],
  ['images/favicon-source.png', 512],
];

for (const [rel, edge] of pngTargets) {
  const file = path.join(publicDir, rel);
  const r = await compressPng(file, { maxEdge: edge });
  if (!r) continue;
  beforeTotal += r.before;
  afterTotal += r.after;
  if (!r.skipped) {
    saved += r.before - r.after;
    console.log(
      `  ${rel} ${Math.round(r.before / 1024)}KB → ${Math.round(r.after / 1024)}KB`,
    );
  }
}

// Rebuild ico + svg from compressed PNGs
const icoParts = [];
for (const name of ['favicon-16.png', 'favicon-32.png', 'favicon.png']) {
  icoParts.push(fs.readFileSync(path.join(publicDir, name)));
}
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngToIco(icoParts));
console.log('rewrote favicon.ico');

const logoPng = fs.readFileSync(path.join(publicDir, 'logo.png'));
const b64 = logoPng.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Rob Run Cheat">
  <image href="data:image/png;base64,${b64}" width="128" height="128"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);
fs.writeFileSync(path.join(publicDir, 'logo.svg'), svg);
console.log('rewrote favicon.svg, logo.svg');

// Compress jpg icon if present
const jpg = path.join(publicDir, 'robrun-icon.jpg');
if (fs.existsSync(jpg)) {
  const before = fs.statSync(jpg).size;
  const buf = await sharp(jpg).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  if (buf.length < before) {
    await replaceFile(jpg, buf);
    saved += before - buf.length;
    beforeTotal += before;
    afterTotal += buf.length;
    console.log(`  robrun-icon.jpg ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`);
  }
}

try {
  fs.rmSync(tmpDir, { recursive: true, force: true });
} catch {
  /* ignore */
}

// Clean leftover sidecars from earlier failed runs
for (const dir of IMAGE_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (/\.tmp\.(webp|png)$/i.test(f)) {
      try {
        fs.unlinkSync(path.join(dir, f));
      } catch {
        /* ignore */
      }
    }
  }
}

console.log(
  `\nDone. Saved ~${Math.round(saved / 1024)}KB (${Math.round(beforeTotal / 1024)}KB → ${Math.round(afterTotal / 1024)}KB touched).`,
);
