import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public/images/blog');
const files = fs.readdirSync(dir).filter((file) => {
  if (!/\.webp$/i.test(file)) return false;
  if (/-\d+\.webp$/i.test(file)) return false; // sized variants
  if (/-og\.webp$/i.test(file)) return false;
  return true;
});

console.log(`Generating OG covers for ${files.length} bases`);

for (const file of files) {
  const input = path.join(dir, file);
  const base = file.replace(/\.webp$/i, '');
  const output = path.join(dir, `${base}-og.webp`);
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 84, effort: 4 })
    .toFile(output);
  console.log(`Wrote ${path.relative(process.cwd(), output)}`);
}

console.log('OG generation complete.');
