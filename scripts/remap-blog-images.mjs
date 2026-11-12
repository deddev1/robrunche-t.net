import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const pathMap = {
  '/images/blog/robrun-chams-esp.webp': '/images/blog/robrun-chams-esp.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-aimbot-combat.webp': '/images/blog/robrun-aimbot-combat.webp',
  '/images/blog/robrun-radar-esp.webp': '/images/blog/robrun-radar-esp.webp',
  '/images/blog/robrun-aimbot-stairs.webp': '/images/blog/robrun-aimbot-stairs.webp',
  '/images/blog/robrun-chams-esp.webp': '/images/blog/robrun-chams-esp.webp',
  '/images/blog/robrun-radar-esp.webp': '/images/blog/robrun-radar-esp.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-box-esp-indoor.webp': '/images/blog/robrun-box-esp-indoor.webp',
  '/images/blog/robrun-wallhack-courtyard.webp': '/images/blog/robrun-wallhack-courtyard.webp',
  '/images/blog/robrun-box-esp-indoor.webp': '/images/blog/robrun-box-esp-indoor.webp',
  '/images/blog/robrun-wallhack-courtyard.webp': '/images/blog/robrun-wallhack-courtyard.webp',
  '/images/blog/robrun-chams-esp.webp': '/images/blog/robrun-chams-esp.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-aimbot-combat.webp': '/images/blog/robrun-aimbot-combat.webp',
  '/images/blog/robrun-radar-esp.webp': '/images/blog/robrun-radar-esp.webp',
  '/images/blog/robrun-aimbot-stairs.webp': '/images/blog/robrun-aimbot-stairs.webp',
  '/images/blog/robrun-chams-esp.webp': '/images/blog/robrun-chams-esp.webp',
  '/images/blog/robrun-radar-esp.webp': '/images/blog/robrun-radar-esp.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-esp-boxes.webp': '/images/blog/robrun-esp-boxes.webp',
  '/images/blog/robrun-box-esp-indoor.webp': '/images/blog/robrun-box-esp-indoor.webp',
  '/images/blog/robrun-wallhack-courtyard.webp': '/images/blog/robrun-wallhack-courtyard.webp',
  '/images/blog/robrun-box-esp-indoor.webp': '/images/blog/robrun-box-esp-indoor.webp',
  '/images/blog/robrun-wallhack-courtyard.webp': '/images/blog/robrun-wallhack-courtyard.webp',
  '/images/blog/robrun-aimbot-stairs.webp': '/images/blog/robrun-aimbot-stairs.webp',
  '/images/blog/robrun-wallhack-courtyard.webp': '/images/blog/robrun-wallhack-courtyard.webp',
  '/images/blog/robrun-radar-esp.webp': '/images/blog/robrun-radar-esp.webp',
  '/images/blog/robrun-aimbot-combat.webp': '/images/blog/robrun-aimbot-combat.webp',
  '/images/blog/robrun-aimbot-stairs.webp': '/images/blog/robrun-aimbot-stairs.webp',
};

const metaBySrc = {
  '/images/blog/robrun-chams-esp.webp': {
    alt: 'ROB RUN Open World cheat overlay during a ROB RUN match',
    caption: 'Ranked overlay',
  },
  '/images/blog/robrun-esp-boxes.webp': {
    alt: 'ROB RUN match gameplay with purple ESP overlay highlighting opponents on the map',
    caption: 'Purple ESP overlay',
  },
  '/images/blog/robrun-aimbot-combat.webp': {
    alt: 'ROB RUN purple cheat overlay active during a live match on PC',
    caption: 'Match overlay',
  },
  '/images/blog/robrun-radar-esp.webp': {
    alt: 'ROB RUN Heists gameplay with cheat overlays on the map',
    caption: 'Party gameplay',
  },
  '/images/blog/robrun-aimbot-stairs.webp': {
    alt: 'Rob Run cheat gameplay overlay showing assists during a match on the map',
    caption: 'Pitch gameplay',
  },
  '/images/blog/robrun-box-esp-indoor.webp': {
    alt: 'ROB RUN Heists cheat menu open on Matchday with purple UI panels',
    caption: 'Heists menu',
  },
  '/images/blog/robrun-wallhack-courtyard.webp': {
    alt: 'Rob Run cheat utility menu showing helper tools and toggles',
    caption: 'Utility tools',
  },
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      walk(full, out);
    } else if (/\.(ts|astro|mjs|js)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let filesChanged = 0;
for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;
  for (const [from, to] of Object.entries(pathMap)) {
    text = text.split(from).join(to);
  }
  if (text !== original) {
    fs.writeFileSync(file, text);
    filesChanged += 1;
    console.log('paths', path.relative(root, file));
  }
}

function syncAlts(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  for (const [src, meta] of Object.entries(metaBySrc)) {
    const esc = escapeRegExp(src);
    const altEsc = escapeRegExp(meta.alt);
    text = text.replace(
      new RegExp(`(image:\\s*"${esc}",\\s*\\n\\s*imageAlt:\\s*")[^"]*(")`, 'g'),
      `$1${meta.alt}$2`,
    );
    text = text.replace(
      new RegExp(`(image:\\s*'${esc}',\\s*\\n\\s*imageAlt:\\s*')[^']*(')`, 'g'),
      `$1${meta.alt}$2`,
    );
    text = text.replace(
      new RegExp(`(src:\\s*"${esc}",\\s*alt:\\s*")[^"]*(")`, 'g'),
      `$1${meta.alt}$2`,
    );
    text = text.replace(
      new RegExp(`(src:\\s*'${esc}',\\s*alt:\\s*')[^']*(')`, 'g'),
      `$1${meta.alt}$2`,
    );
    text = text.replace(
      new RegExp(`(src:\\s*"${esc}",\\s*alt:\\s*"${altEsc}",\\s*caption:\\s*")[^"]*(")`, 'g'),
      `$1${meta.caption}$2`,
    );
    text = text.replace(
      new RegExp(`(src:\\s*'${esc}',\\s*alt:\\s*'${altEsc}',\\s*caption:\\s*')[^']*(')`, 'g'),
      `$1${meta.caption}$2`,
    );
    // gameplayImages style: src then alt on own fields
    text = text.replace(
      new RegExp(`(src:\\s*'${esc}',\\s*\\n\\s*alt:\\s*')[^']*(')`, 'g'),
      `$1${meta.alt}$2`,
    );
    text = text.replace(
      new RegExp(`(src:\\s*"${esc}",\\s*\\n\\s*alt:\\s*")[^"]*(")`, 'g'),
      `$1${meta.alt}$2`,
    );
  }
  fs.writeFileSync(filePath, text);
  console.log('alts', path.relative(root, filePath));
}

syncAlts(path.join(root, 'src/data/blog/posts.ts'));
syncAlts(path.join(root, 'src/data/gameplayImages.ts'));
syncAlts(path.join(root, 'src/i18n/en.ts'));
syncAlts(path.join(root, 'src/config/seo.ts'));

console.log(`Done. Path remaps in ${filesChanged} files.`);
