/**
 * One-shot rebrand: Deadlock Cheat → Rob Run Cheat (robruncheat.net)
 * Run from repo root: node scripts/rebrand-robrun.mjs
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
  ['https://deadlockcheat.net', 'https://robruncheat.net'],
  ['deadlockcheat.net', 'robruncheat.net'],
  ['deadlockche-t.net', 'robruncheat.net'],
  ['deadlockche-t-net', 'robruncheat-net'],
  ['/products/deadlock-cheat/', '/products/robrun-cheat/'],
  ['/products/deadlock-cheat', '/products/robrun-cheat'],
  ['products/deadlock-cheat', 'products/robrun-cheat'],
  ["PRODUCT_BASE = '/products/deadlock-cheat/'", "PRODUCT_BASE = '/products/robrun-cheat/'"],
  ['%2Fproducts%2Fdeadlock', '%2Fproducts%2Frobrun'],
  ['/products/deadlock', '/products/robrun'],
  ['/go/deadlock/', '/go/robrun/'],
  ['/go/deadlock', '/go/robrun'],
  ['deadlock-cheat-forum-vote', 'robrun-cheat-forum-vote'],
  ['deadlockcheat-net', 'robruncheat-net'],
  ['name = "deadlockcheat-net"', 'name = "robruncheat-net"'],
  ['name = "deadlockche-t-net"', 'name = "robruncheat-net"'],
  ['"name": "deadlock-cheat"', '"name": "robrun-cheat"'],
  ['@deadlockcheat', '@robruncheat'],
  ['deadlock-cheats', 'robrun-cheats'],
  ['deadlock-cheat', 'robrun-cheat'],

  // Checkout keys
  ["checkoutPath('deadlock')", "checkoutPath('robrun')"],
  ['checkoutPath("deadlock")', 'checkoutPath("robrun")'],
  ["checkoutRedirectPath('deadlock')", "checkoutRedirectPath('robrun')"],
  ["checkoutExternalUrl('deadlock')", "checkoutExternalUrl('robrun')"],
  ["PRIMARY_CHECKOUT_PATH = checkoutPath('deadlock')", "PRIMARY_CHECKOUT_PATH = checkoutPath('robrun')"],
  ["product: CheckoutProduct = 'deadlock'", "product: CheckoutProduct = 'robrun'"],
  ["  deadlock: 'deadlock'", "  robrun: 'robrun'"],
  ["  deadlock: 'https://", "  robrun: 'https://"],
  ['  deadlock:', '  robrun:'],
  ['readonly deadlock:', 'readonly robrun:'],
  ['CHECKOUT_URLS.deadlock', 'CHECKOUT_URLS.robrun'],
  ["['/go/deadlock', CHECKOUT_URLS.robrun]", "['/go/robrun', CHECKOUT_URLS.robrun]"],
  ["['/go/deadlock/', CHECKOUT_URLS.robrun]", "['/go/robrun/', CHECKOUT_URLS.robrun]"],

  // Brand names
  ['Buy Undetected Deadlock', 'Buy Undetected Rob Run'],
  ['Buy Deadlock Cheats', 'Buy Rob Run Cheats'],
  ['Shop Deadlock', 'Shop Rob Run'],
  ['About Deadlock Cheat', 'About Rob Run Cheat'],
  ['About Deadlock', 'About Rob Run'],
  ['Deadlock Cheats', 'Rob Run Cheats'],
  ['Deadlock Cheat', 'Rob Run Cheat'],
  ['Deadlock cheats', 'Rob Run cheats'],
  ['Deadlock cheat', 'Rob Run cheat'],
  ['undetected Deadlock', 'undetected Rob Run'],
  ['Undetected Deadlock', 'Undetected Rob Run'],
  ["TITLE_PREFIX = 'Buy Deadlock Cheats'", "TITLE_PREFIX = 'Buy Rob Run Cheats'"],

  // Modes: Deadlock hero shooter → ROB RUN crime sandbox
  ['Ranked, Casual and Party queue', 'Open World, Heists and PvP'],
  ['Ranked, Casual and Party matches', 'Open World, Heists and street fights'],
  ['Ranked, Casual, Party and Practice', 'Open World, Heists, PvP and Free Roam'],
  ['Ranked, Casual or Party matches', 'Open World, Heists or PvP'],
  ['Ranked and Party queue', 'Open World and Heists'],
  ['Ranked, Party', 'Open World, Heists'],
  ['Ranked and high-MMR matches', 'PvP shootouts and heists'],
  ['Ranked, high-MMR & Party queue', 'Open World, Heists & PvP'],
  ['Party queue', 'Heists'],
  ['Practice range', 'Free Roam'],
  ["modes: ['Ranked', 'Party', 'Casual', 'Practice']", "modes: ['Open World', 'Heists', 'PvP', 'Free Roam']"],
  ['Ranked Prep', 'Heist Prep'],
  ['in Ranked', 'in Open World'],
  ['for Ranked', 'for Open World'],
  ['quiet Ranked', 'quiet Free Roam'],
  ['casual Ranked', 'casual Free Roam'],
  [' Ranked ', ' Open World '],
  ['Ranked,', 'Open World,'],
  ['Ranked.', 'Open World.'],
  ['and Party', 'and Heists'],
  ['or Party', 'or Heists'],
  ['in Party', 'in Heists'],
  ['for Party', 'for Heists'],
  [' Party.', ' Heists.'],
  [' Party,', ' Heists,'],
  [' Party ', ' Heists '],
  ['Casual', 'Free Roam'],

  // Features tuned for ROB RUN
  ['soul farm helpers', 'loot farm helpers'],
  ['Soul farm', 'Loot farm'],
  ['ability aim helpers', 'recoil helpers'],
  ['Ability aim', 'Recoil control'],
  ['hero role profiles', 'weapon profiles'],
  ['Hero roles', 'Weapon loadouts'],
  ['hero roles', 'weapon loadouts'],
  ['hero skins', 'character skins'],
  ['Win gunfights', 'Win shootouts'],
  ['match assist', 'combat assist'],
  ['City Never Sleeps', 'Early Access'],
  ['map radar', 'minimap radar'],
  ['enemy outlines', 'player & NPC outlines'],

  // Platform / anti-cheat: Valve/Deadlock → EAC / Kefir ROB RUN
  ['Valve anti-cheat', 'Easy Anti-Cheat'],
  ['Valve Anti-Cheat', 'Easy Anti-Cheat'],
  ['Valve / Deadlock rules', 'Kefir / ROB RUN rules'],
  ['Valve Terms of Service', 'Steam and ROB RUN Terms of Service'],
  ['Valve review', 'Kefir review'],
  ['Valve or anti-cheat', 'EAC or anti-cheat'],
  ['Valve patch', 'ROB RUN patch'],
  ['Valve bans', 'EAC bans'],
  ['Valve ban', 'EAC ban'],
  ['after a Valve', 'after an EAC'],
  ['after Valve', 'after EAC'],
  ['frog curse', 'EAC ban'],
  ['Frog curse', 'EAC ban'],
  ['frog', 'EAC'],
  ['Frog', 'EAC'],
  ['Steam build', 'Steam Early Access build'],

  // Game identity (after longer phrases)
  ['an Deadlock', 'a ROB RUN'],
  ['a Deadlock', 'a ROB RUN'],
  ['Deadlock patch', 'ROB RUN patch'],
  ['Deadlock patches', 'ROB RUN patches'],
  ['Deadlock PC', 'ROB RUN PC'],
  ['Deadlock via Steam', 'ROB RUN via Steam'],
  ['launching Deadlock', 'launching ROB RUN'],
  ['Deadlock tools', 'ROB RUN tools'],
  ['Deadlock ESP', 'ROB RUN ESP'],
  ['Deadlock', 'ROB RUN'],
  ['deadlock', 'robrun'],

  // Package / worker naming leftovers
  ['"deadlock-cheat"', '"robrun-cheat"'],
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
const oldProductDir = path.join(ROOT, 'src', 'pages', 'products', 'deadlock-cheat');
const newProductDir = path.join(ROOT, 'src', 'pages', 'products', 'robrun-cheat');
if (renamePathSafe(oldProductDir, newProductDir)) {
  console.log('Renamed products/deadlock-cheat → products/robrun-cheat');
}

// Rename asset files with deadlock in the filename (deepest paths first)
const assetFiles = walk(ROOT).filter((file) => {
  const base = path.basename(file).toLowerCase();
  return base.includes('deadlock');
});
assetFiles.sort((a, b) => b.length - a.length);
let renamedAssets = 0;
for (const file of assetFiles) {
  const dir = path.dirname(file);
  const base = path.basename(file);
  const nextBase = base.replaceAll('deadlock', 'robrun').replaceAll('Deadlock', 'robrun');
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
  const base = path.basename(file);
  if (base === 'rebrand-robrun.mjs' || base === 'rebrand-deadlock.mjs') continue;
  const raw = fs.readFileSync(file, 'utf8');
  const next = applyReplacements(raw);
  if (next !== raw) {
    fs.writeFileSync(file, next, 'utf8');
    changed++;
    console.log('Updated', path.relative(ROOT, file));
  }
}

console.log(`\nDone. Renamed ${renamedAssets} assets. Updated ${changed} files.`);
