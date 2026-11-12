import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const dirs = [
  'public/images/gameplay',
  'public/images/blog',
  'public/images/hero',
];

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        /\.(png|webp)$/i.test(file) &&
        !/-\d+\.webp$/i.test(file) &&
        !/-og\.webp$/i.test(file), // social crops stay 1200×630 only
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|webp)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 68, effort: 6, smartSubsample: true })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');
