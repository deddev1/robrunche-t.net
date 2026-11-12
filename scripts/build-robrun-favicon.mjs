import sharp from 'sharp';
import { writeFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** ROB RUN circular game icon → site favicon / logo set. */
const src =
  'C:/Users/3Tee System/Downloads/d0b63dea-bf02-43ce-936d-0ae0af6cc0e4.png';
const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(path.join(publicDir, 'images'), { recursive: true });
const outPath = (name) => path.join(publicDir, name);

const meta = await sharp(src).metadata();
const size = Math.min(meta.width ?? 512, meta.height ?? 512);

// Square crop then circular alpha mask (removes outside-circle background)
const square = await sharp(src)
  .resize(size, size, { fit: 'cover', position: 'centre' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = square;
const cx = (info.width - 1) / 2;
const cy = (info.height - 1) / 2;
const radius = Math.min(cx, cy);
const soft = Math.max(1.5, radius * 0.01);

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let alpha = 255;
    if (dist > radius) alpha = 0;
    else if (dist > radius - soft) alpha = Math.round(255 * ((radius - dist) / soft));
    data[i + 3] = Math.min(data[i + 3], alpha);
    if (data[i + 3] === 0) data[i] = data[i + 1] = data[i + 2] = 0;
  }
}

const cutoutMaster = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer();

async function sized(px, { opaque = false, format = 'png' } = {}) {
  let pipeline = sharp(cutoutMaster).resize(px, px, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  // Apple / Android prefer opaque icons
  if (opaque) {
    pipeline = sharp({
      create: { width: px, height: px, channels: 4, background: { r: 10, g: 13, b: 16, alpha: 1 } },
    }).composite([{ input: await pipeline.png().toBuffer(), gravity: 'centre' }]);
  }

  if (format === 'jpg') return pipeline.jpeg({ quality: 92 }).toBuffer();
  return pipeline.png().toBuffer();
}

const obsolete = [
  'favicon.ico.png',
  'rust-icon.jpg',
  'fc27-icon.jpg',
  'images/favicon-source.png',
  'favicon-16.png',
  'favicon-32.png',
  'favicon.png',
  'favicon-192.png',
  'favicon-512.png',
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'android-chrome-192.png',
  'android-chrome-512.png',
  'logo.png',
  'logo.svg',
  'robrun-icon.jpg',
  'images/nav-brand.svg',
];

for (const rel of obsolete) {
  const p = outPath(rel);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log('deleted', rel);
  }
}

await sharp(cutoutMaster).resize(512, 512).png().toFile(outPath('images/favicon-source.png'));
console.log('wrote images/favicon-source.png');

const outputs = [
  ['favicon-16.png', 16, false],
  ['favicon-32.png', 32, false],
  ['favicon.png', 48, false],
  ['favicon-192.png', 192, false],
  ['favicon-512.png', 512, false],
  ['apple-touch-icon.png', 180, true],
  ['android-chrome-192.png', 192, true],
  ['android-chrome-512.png', 512, true],
  ['logo.png', 128, false],
  ['robrun-icon.jpg', 256, true],
];

for (const [name, px, opaque] of outputs) {
  const format = name.endsWith('.jpg') ? 'jpg' : 'png';
  writeFileSync(outPath(name), await sized(px, { opaque, format }));
  console.log('wrote', name);
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

const p16 = await sized(16);
const p32 = await sized(32);
const p48 = await sized(48);
writeFileSync(outPath('favicon.ico'), pngToIco([p16, p32, p48]));
console.log('wrote favicon.ico');

const png128 = (await sized(128)).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Rob Run Cheat">
  <image href="data:image/png;base64,${png128}" width="128" height="128"/>
</svg>
`;
writeFileSync(outPath('favicon.svg'), svg);
writeFileSync(outPath('logo.svg'), svg);
console.log('wrote favicon.svg, logo.svg');

const corner = await sharp(outPath('favicon-32.png')).ensureAlpha().raw().toBuffer();
console.log('corner rgba', [...corner.slice(0, 4)]);
console.log('done');
