/**
 * Second-pass copy cleanup after Deadlock → Rob Run rebrand.
 * Run: node scripts/cleanup-robrun-copy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '.cursor']);
const EXT = new Set([
  '.ts', '.tsx', '.astro', '.mjs', '.js', '.json', '.toml', '.md', '.html', '.css', '.txt', '.webmanifest', '.svg',
]);

const pairs = [
  // Broken frog → EAC substitutions
  ['turning them into a EAC', 'applying an EAC ban'],
  ['turned into a EAC', 'hit with an EAC ban'],
  ['into a EAC for', 'with an EAC ban for'],
  ['into a EAC with', 'with an EAC ban and'],
  ['a EAC with a ban', 'an EAC ban'],
  ['a EAC', 'an EAC ban'],
  ['EAC-and-ban flow', 'EAC ban flow'],
  ['EAC’s EAC-and-ban', 'EAC’s ban'],
  ['Valve’s EAC-and-ban flow', 'Kefir’s EAC ban flow'],
  ['Valve’s EAC ban flow', 'Kefir’s EAC ban flow'],

  // Wrong publisher / affiliation
  ['ROB RUN is a trademark of Valve', 'ROB RUN is a trademark of Kefir'],
  ['We are not Valve and we are not affiliated with Valve or Easy Anti-Cheat', 'We are not Kefir and we are not affiliated with Kefir, Steam, or Easy Anti-Cheat'],
  ['Valve and Easy Anti-Cheat', 'Kefir and Easy Anti-Cheat'],
  ['Valve and online matchmaking', 'Kefir and online matchmaking'],
  ['Valve and online services', 'Kefir and online services'],
  ['Valve and game bans', 'EAC and game bans'],
  ['Valve server-side checks', 'server-side checks'],
  ['Valve shifts structures', 'Kefir shifts structures'],
  ['Valve added ROB RUN', 'Kefir added ROB RUN'],
  ['Valve’s patch note', 'Kefir’s patch note'],
  ['Valve has said', 'Kefir has said'],
  ['Whether VAC is involved', 'Whether kernel EAC is the only layer'],
  ['not Valve', 'not Kefir'],

  // Deadlock hero-shooter leftovers → ROB RUN crime sandbox
  ['ranked tools', 'PvP tools'],
  ['Live Ranked', 'Live PvP'],
  ['to Live Ranked', 'to Live PvP'],
  ['Before Ranked', 'Before Heists'],
  ['before Ranked', 'before Heists'],
  ['Pre-Ranked', 'Pre-heist'],
  ['mid-Ranked', 'mid-fight'],
  ['in live Ranked', 'in live PvP'],
  ['live Ranked', 'live PvP'],
  ['Open World and Ranked', 'Open World and PvP'],
  ['Open World, Heists, Ranked', 'Open World, Heists, PvP'],
  ['Ranked / Heists', 'Open World / Heists'],
  ['Ranked / Free Roam', 'PvP / Free Roam'],
  ['Ranked quiet', 'PvP quiet'],
  ['"Ranked quiet"', '"PvP quiet"'],
  ['Ranked W/L Spoofer', 'Wanted Level Spoofer'],
  ['Ranked (Initiate to Eternus)', 'PvP (street fights to turf wars)'],
  ['Ranked / Eternus', 'PvP / high heat'],
  ['Initiate up to Eternus', 'street fights up to turf wars'],
  ['Bell Tower, Midboss, Lanes and Ranked', 'Districts, Heists, Safehouses and PvP'],
  ['Bell Tower, Midboss, Lanes', 'Districts, Heists, Safehouses'],
  ['Midboss fights', 'heist finales'],
  ['Midboss', 'heist boss'],
  ['soul swings', 'loot swings'],
  ['soul positions', 'loot positions'],
  ['soul farming', 'loot farming'],
  ['soul aim', 'loot aim'],
  ['robrun-soul-aim', 'robrun-loot-aim'],
  ['haunt helper', 'loot helper'],
  ['enemy heroes', 'enemy players'],
  ['Filter by hero role', 'Filter by threat type'],
  ['and hero you use', 'and loadout you use'],
  ['which hero', 'which loadout'],
  ['troopers and objective units', 'NPCs, cops and loot markers'],
  ['Practice Range to Ranked', 'Free Roam to PvP'],
  ['From Free Roam to Live Ranked', 'From Free Roam to Live PvP'],
  ['high-MMR finishers', 'high-heat finishers'],
  ['ability dashes', 'sprints and vehicle peeks'],
  ['heroes that do not reward crits', 'loadouts that do not reward headshots'],
  ['six heroes rolling out', 'new districts rolling out'],
  ['each of the six heroes', 'each new district'],
  ['Standard wins before it becomes eligible', 'sessions before high-risk content unlocks'],
  ['unranked Standard mode', 'casual Free Roam mode'],
  [' Ranked ', ' PvP '],
  [' Ranked.', ' PvP.'],
  [' Ranked,', ' PvP,'],
  ['Ranked is where', 'Open World PvP is where'],
  ['Ranked only', 'PvP only'],
  ['trade radar and farm helpers', 'loot radar and farm helpers'],
  ['between games, not mid-PvP panic', 'between heists, not mid-fight panic'],

  // Image / SEO path renames already done; fix remaining Deadlock map language
  ['on heroes', 'on players'],
  ['hero you', 'loadout you'],
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
  return EXT.has(path.extname(file).toLowerCase());
}

let changed = 0;
for (const file of walk(ROOT).filter(shouldTouch)) {
  if (path.basename(file).startsWith('cleanup-robrun') || path.basename(file).startsWith('rebrand-')) continue;
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== text) {
    fs.writeFileSync(file, next, 'utf8');
    changed++;
    console.log('Updated', path.relative(ROOT, file));
  }
}
console.log(`\nCleanup done. Updated ${changed} files.`);
