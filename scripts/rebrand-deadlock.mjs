/**
 * One-shot rebrand: FC27 Cheats → Deadlock Cheat (deadlockcheat.net)
 * Run from repo root: node scripts/rebrand-deadlock.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '.cursor', 'agent-tools']);
const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.cjs',
  '.json',
  '.toml',
  '.md',
  '.html',
  '.css',
  '.svg',
  '.txt',
  '.webmanifest',
  '.d.ts',
]);

/** Ordered replacements — longer / more specific first. */
const REPLACEMENTS = [
  // Domains & product paths
  ['https://fc27-cheats.net', 'https://deadlockcheat.net'],
  ['fc27-cheats.net', 'deadlockcheat.net'],
  ['fc27-cheats.com', 'deadlockcheat.net'],
  ['/products/fc27-cheats/', '/products/deadlock-cheat/'],
  ['/products/fc27-cheats', '/products/deadlock-cheat'],
  ['products/fc27-cheats', 'products/deadlock-cheat'],
  ['PRODUCT_BASE = \'/products/deadlock-cheat/\'', "PRODUCT_BASE = '/products/deadlock-cheat/'"],
  ['%2Fproducts%2Fea-sports-fc-27', '%2Fproducts%2Fdeadlock'],
  ['%2Fproducts%2Ffc-27', '%2Fproducts%2Fdeadlock'],
  ['%2Fproducts%2Ffc27', '%2Fproducts%2Fdeadlock'],
  ['/products/ea-sports-fc-27', '/products/deadlock'],
  ['/products/fc-27', '/products/deadlock'],
  ['/products/fc27', '/products/deadlock'],
  ['/go/fc27/', '/go/deadlock/'],
  ['/go/fc27', '/go/deadlock'],
  ['fc27-cheats-forum-vote', 'deadlock-cheat-forum-vote'],
  ['fc27-cheats-net', 'deadlockcheat-net'],
  ['name = "fc27-cheats-net"', 'name = "deadlockcheat-net"'],
  ['"name": "fc27-cheats"', '"name": "deadlock-cheat"'],
  ['@fc27cheats', '@deadlockcheat'],
  // Remaining hyphenated brand slug (blog posts, package refs) → plural-friendly
  ['fc27-cheats', 'deadlock-cheats'],
  ["'fc27'", "'deadlock'"],
  ['"fc27"', '"deadlock"'],

  // Checkout key identifiers (word-boundary-ish)
  ['checkoutPath(\'fc27\')', "checkoutPath('deadlock')"],
  ['checkoutPath("fc27")', 'checkoutPath("deadlock")'],
  ['checkoutRedirectPath(\'fc27\')', "checkoutRedirectPath('deadlock')"],
  ['checkoutExternalUrl(\'fc27\')', "checkoutExternalUrl('deadlock')"],
  ['PRIMARY_CHECKOUT_PATH = checkoutPath(\'fc27\')', "PRIMARY_CHECKOUT_PATH = checkoutPath('deadlock')"],
  ['product: CheckoutProduct = \'fc27\'', "product: CheckoutProduct = 'deadlock'"],
  ['  fc27: \'fc27\'', "  deadlock: 'deadlock'"],
  ['  fc27: \'https://', "  deadlock: 'https://"],
  ['  fc27:', '  deadlock:'],
  ['readonly fc27:', 'readonly deadlock:'],
  ["CHECKOUT_URLS.fc27", 'CHECKOUT_URLS.deadlock'],
  ["['/go/rust', CHECKOUT_URLS.deadlock]", "['/go/rust', CHECKOUT_URLS.deadlock]"],
  ["['/go/fc27', CHECKOUT_URLS.deadlock]", "['/go/deadlock', CHECKOUT_URLS.deadlock]"],
  ["['/go/fc27/', CHECKOUT_URLS.deadlock]", "['/go/deadlock/', CHECKOUT_URLS.deadlock]"],

  // Brand names
  ['FC27 Cheats', 'Deadlock Cheat'],
  ['FC 27 Cheats', 'Deadlock Cheats'],
  ['FC27 cheats', 'Deadlock cheats'],
  ['FC 27 cheats', 'Deadlock cheats'],
  ['Buy FC 27 Cheats', 'Buy Deadlock Cheats'],
  ['Buy Undetected FC 27', 'Buy Undetected Deadlock'],
  ['Shop FC 27', 'Shop Deadlock'],
  ['About FC27', 'About Deadlock'],
  ['TITLE_PREFIX = \'Buy FC 27 Cheats\'', "TITLE_PREFIX = 'Buy Deadlock Cheats'"],

  // Game identity
  ['EA Sports FC 27', 'Deadlock'],
  ['EA FC 27', 'Deadlock'],
  ['FC Sports 27', 'Deadlock'],
  ['FC27', 'Deadlock'],
  ['FC 27', 'Deadlock'],
  ['fc27', 'deadlock'],

  // Modes / soccer → Deadlock
  ['Ultimate Team, Rivals and Pro Clubs', 'Ranked, Casual and Party queue'],
  ['Ultimate Team, Clubs and Career', 'Ranked, Casual and Party matches'],
  ['Ultimate Team, Clubs, Career and Kick Off', 'Ranked, Casual, Party and Practice'],
  ['Ultimate Team, Clubs or Career modes', 'Ranked, Casual or Party matches'],
  ['Ultimate Team and Clubs', 'Ranked and Party queue'],
  ['Ultimate Team, Clubs', 'Ranked, Party'],
  ['Rivals, Champions and Pro Clubs', 'Ranked, Casual and Party queue'],
  ['Division Rivals and Weekend League', 'Ranked and high-MMR matches'],
  ['Division Rivals, Weekend League & Clubs', 'Ranked, high-MMR & Party queue'],
  ['Division Rivals', 'Ranked'],
  ['Weekend League', 'high-MMR ranked'],
  ['Pro Clubs', 'Party queue'],
  ['Career Mode', 'Casual'],
  ['Kick Off Practice', 'Practice range'],
  ['Kick Off or a friendly', 'Practice range or a bot match'],
  ['Kick Off', 'Practice range'],
  ['Ultimate Team', 'Ranked'],
  ['FUT match', 'Deadlock match'],
  ['FUT', 'ranked'],
  [' UT ', ' ranked '],
  [' UT.', ' ranked.'],
  ['& UT', '& ranked'],
  ['/ UT', '/ ranked'],
  ['UT suite', 'full suite'],
  ['UT tools', 'ranked tools'],
  ['UT helpers', 'ranked helpers'],
  ['live UT', 'live ranked'],
  ['to Live UT', 'to Live Ranked'],

  // Features / anti-cheat
  ['shot assist and soft aim', 'soft aim and aim assist'],
  ['soft aim, shot assist', 'soft aim, aim assist'],
  ['Shot assist / Soft Aim', 'Soft Aim / Aim Assist'],
  ['shot assist', 'aim assist'],
  ['Shot assist', 'Aim assist'],
  ['Shot Assist', 'Aim Assist'],
  ['finisher helpers', 'ability aim helpers'],
  ['finishing helpers', 'ability aim helpers'],
  ['finishing tuning', 'ability aim tuning'],
  ['coin/SBC farm helpers', 'soul farm helpers'],
  ['coin/SBC helpers', 'soul farm helpers'],
  ['kit unlock', 'skin unlock'],
  ['Kit unlock', 'Skin unlock'],
  ['Kit & Skin', 'Skin & Cosmetic'],
  ['kit & skin', 'skin & cosmetic'],
  ['kits, boots and cosmetics', 'skins and cosmetics'],
  ['home, away and goalkeeper kits', 'hero skins and cosmetics'],
  ['kit preview', 'skin preview'],
  ['Kit preview', 'Skin preview'],
  ['playstyles', 'hero roles'],
  ['Playstyles', 'Hero roles'],
  ['position profiles', 'hero role profiles'],
  ['pitch radar', 'map radar'],
  ['on the pitch', 'on the map'],
  ['the pitch', 'the map'],
  ['opponent tags', 'enemy outlines'],
  ['Win Duels', 'Win gunfights'],

  // Platform / anti-cheat
  ['Steam and EA App PC', 'Steam PC'],
  ['Steam or EA App PC', 'Steam PC'],
  ['Steam or EA App', 'Steam'],
  ['EA App or Steam', 'Steam'],
  ['EA App PC', 'Steam PC'],
  ['EA App', 'Steam'],
  ['EA anti-cheat', 'Valve anti-cheat'],
  ['EA Anti-Cheat', 'Valve Anti-Cheat'],
  ['EA patch', 'Deadlock patch'],
  ['EA patches', 'Deadlock patches'],
  ['EA bans', 'game bans'],
  ['EA ban', 'game ban'],
  ['EA Ban', 'Game Ban'],
  ['EA holds', 'Steam holds'],
  ['EA flags', 'anti-cheat flags'],
  ['EA Sports', 'Valve'],
  ['EA rules', 'Valve / Deadlock rules'],
  ['after an EA', 'after a Valve'],
  ['after EA', 'after Valve'],
  ['major EA', 'major Deadlock'],
  ['every EA', 'every Deadlock'],
  ['an EA', 'a Valve'],
  ['EA build', 'Steam build'],

  // Misc leftovers
  ['football brand mark', 'Deadlock brand mark'],
  ['nav-brand__football', 'nav-brand__mark'],
  ['nav-football', 'nav-brand'],
  ['deadlock-cheats-division-rivals-weekend-league', 'deadlock-cheats-ranked-party-queue'],
  ['deadlock-cheats-ranked-weekend-league', 'deadlock-cheats-ranked-party-queue'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function shouldTouch(file) {
  const ext = path.extname(file).toLowerCase();
  if (TEXT_EXT.has(ext)) return true;
  // files without extension like robots.txt already covered; also Dockerfile etc.
  const base = path.basename(file);
  return base === 'robots.txt' || base === 'llms.txt' || base === 'CNAME';
}

function applyReplacements(text) {
  let next = text;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to) continue;
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renamePathSafe(from, to) {
  if (!fs.existsSync(from)) return false;
  if (fs.existsSync(to)) return false;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.renameSync(from, to);
  return true;
}

// Rename product directory first
const oldProductDir = path.join(ROOT, 'src', 'pages', 'products', 'fc27-cheats');
const newProductDir = path.join(ROOT, 'src', 'pages', 'products', 'deadlock-cheat');
if (renamePathSafe(oldProductDir, newProductDir)) {
  console.log('Renamed products/fc27-cheats → products/deadlock-cheat');
}

// Rename asset files with fc27 / football in the filename (deepest paths first)
const assetFiles = walk(ROOT).filter((file) => {
  const base = path.basename(file).toLowerCase();
  return base.includes('fc27') || base.includes('nav-football');
});
assetFiles.sort((a, b) => b.length - a.length);
let renamedAssets = 0;
for (const file of assetFiles) {
  const dir = path.dirname(file);
  const base = path.basename(file);
  const nextBase = base.replaceAll('fc27', 'deadlock').replaceAll('nav-football', 'nav-brand');
  if (nextBase === base) continue;
  const dest = path.join(dir, nextBase);
  if (renamePathSafe(file, dest)) {
    renamedAssets++;
    console.log('Renamed asset', path.relative(ROOT, file), '→', path.relative(ROOT, dest));
  }
}

const files = walk(ROOT).filter(shouldTouch);
let changed = 0;
for (const file of files) {
  if (path.basename(file) === 'rebrand-deadlock.mjs') continue;
  const raw = fs.readFileSync(file, 'utf8');
  const next = applyReplacements(raw);
  if (next !== raw) {
    fs.writeFileSync(file, next, 'utf8');
    changed++;
    console.log('Updated', path.relative(ROOT, file));
  }
}

console.log(`\nDone. Renamed ${renamedAssets} assets. Updated ${changed} files.`);
