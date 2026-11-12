import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'src', 'config', 'path-redirects.mjs');
let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const dropSrc =
  /rust-|dota|fc27|warthunder|war-thunder|deadlock|ea-sports|valve-error|valve-patch|\/go\/rust|\/go\/fc27|\/go\/warthunder/i;

let removed = 0;
lines = lines.filter((line) => {
  if (line.trim().startsWith('//') && /Legacy|rust-|dota|FC27|War Thunder|Valve-named|interim/i.test(line)) {
    removed++;
    return false;
  }
  if (line.includes('[') && dropSrc.test(line)) {
    removed++;
    return false;
  }
  return true;
});

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('path-redirects: removed', removed, 'lines');

// Rename valve-error destinations still present elsewhere to eac-error if any remain
const also = [
  path.join(root, 'src', 'config', 'pageSeo.ts'),
  path.join(root, 'src', 'data', 'blog', 'posts.ts'),
  path.join(root, 'src', 'data', 'blog', 'keyword-posts.ts'),
  path.join(root, 'src', 'i18n', 'en.ts'),
  path.join(root, 'src', 'data', 'seoIntentMap.ts'),
  path.join(root, 'scripts', 'qa-checklist.mjs'),
];
for (const f of also) {
  if (!fs.existsSync(f)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  let next = raw
    .split('/blog/valve-error/')
    .join('/blog/eac-error/')
    .split('/blog/valve-error')
    .join('/blog/eac-error')
    .split("slug: 'valve-error'")
    .join("slug: 'eac-error'")
    .split('slug: "valve-error"')
    .join('slug: "eac-error"')
    .split('valve-error')
    .join('eac-error');
  if (next !== raw) {
    fs.writeFileSync(f, next, 'utf8');
    console.log('Updated', path.relative(root, f));
  }
}
