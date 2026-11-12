/**
 * Purge leftover Deadlock / other-game copy so the site is ROB RUN only.
 * Run: node scripts/purge-other-games.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '.cursor']);
const EXT = new Set([
  '.ts', '.tsx', '.astro', '.mjs', '.js', '.json', '.toml', '.md', '.html', '.css', '.txt', '.webmanifest', '.svg',
]);

/** Longer / more specific first. */
const pairs = [
  // Deadlock heroes → ROB RUN players / loadouts
  ['Graves, Deadman Danny and Paige', 'SMG, shotgun and pistol loadouts'],
  ['Graves, Deadman Danny, and Paige', 'SMG, shotgun and pistol loadouts'],
  ['Graves/Deadman Danny/Paige', 'SMG/shotgun/pistol'],
  ['Graves or Deadman Danny', 'an SMG or shotgun loadout'],
  ['Deadman Danny', 'shotgun loadouts'],
  ['Graves', 'SMG loadouts'],
  ['Paige', 'pistol loadouts'],
  ['Flight Vindicta', 'a vehicle chase target'],
  ['flying Vindicta', 'a fleeing vehicle'],
  ['Vindicta using Flight', 'a driver in a getaway car'],
  ['Vindicta', 'a distant shooter'],
  ['fed Haze', 'an armed rival'],
  ['that Haze behind', 'that player behind'],
  ['Haze', 'rival'],

  // Deadlock map / mode leftovers
  ['Open World (Initiate to Eternus)', 'Open World PvP'],
  ['Initiate to Eternus', 'street fights to turf wars'],
  ['from Initiate to Eternus', 'from street fights to turf wars'],
  ['Bell Tower / heist boss', 'districts / heist finales'],
  ['Bell Tower or heist boss', 'a district fight or heist finale'],
  ['Bell Tower and Sunken Plaza', 'Downtown and Industrial'],
  ['Bell Tower in Chinatown', 'the Downtown tower district'],
  ['Bell Tower rotates', 'district rotations'],
  ['Bell Tower angles', 'alley and rooftop angles'],
  ['Bell Tower sightlines', 'district sightlines'],
  ['Bell Tower fights', 'district fights'],
  ['Bell Tower heist boss', 'district heist finales'],
  ['Bell Tower', 'Downtown'],
  ['Sunken Plaza', 'the Industrial tunnels'],
  ['Broadway, Greenwich, York, Downtown, heist boss', 'Downtown, Industrial, Docks, heist finales'],
  ['Broadway, Greenwich, York', 'Downtown, Industrial, Docks'],
  ['Chinatown', 'Downtown'],
  ['robrun map bell tower ranked', 'robrun map districts pvp'],
  ['valve-patch', 'patch-day'],
  ['/blog/valve-patch/', '/blog/patch-day/'],

  // Soul / hero-shooter mechanics → crime sandbox
  ['soul ESP', 'loot ESP'],
  ['Soul ESP', 'Loot ESP'],
  ['soul dots', 'loot markers'],
  ['soul hotspot', 'loot hotspot'],
  ['soul draw distance', 'loot draw distance'],
  ['ability upgrades through walls', 'armor and weapon info through walls'],
  ['levels, inventory, ability upgrades', 'wanted level, inventory, armor'],
  ['levels, inventory and ability upgrades', 'wanted level, inventory and armor'],
  ['per-hero profiles', 'per-weapon profiles'],
  ['per hero', 'per loadout'],
  ['both heroes have committed abilities', 'both players have committed to the fight'],
  ['Five heroes plus summons', 'Cops, NPCs and rival players'],
  ['one lane fight', 'one street fight'],
  ['lane pressure', 'district pressure'],
  ['lane_tight', 'street_tight'],
  ['static lane target', 'static street target'],
  ['In the lane you want', 'In a street fight you want'],
  ['For objective brawls', 'For heist brawls'],
  ['above the lane', 'above the street'],
  ['draft to Ancient', 'spawn to extract'],
  ['one hero from draft', 'one loadout from spawn'],
  ['gun heroes', 'gun loadouts'],
  ['Most gun heroes', 'Most gun loadouts'],
  ['rail heroes', 'rooftop players'],
  ['melee hero', 'melee attacker'],
  ['melee brawlers', 'melee fighters'],
  ['pool of heroes', 'set of loadouts'],
  ['when heroes swap mid-match', 'when you swap weapons mid-session'],
  ['heroes swap', 'weapons swap'],
  ['heroes behind walls', 'players behind walls'],
  ['heroes collapse', 'players collapse'],
  ['heroes have', 'players have'],
  ['nearby heroes', 'nearby players'],
  ['multiple heroes', 'multiple players'],
  ['heroes they never', 'players they never'],
  ['heroes rather', 'loadouts rather'],
  ['three heroes', 'three players'],
  ['both heroes', 'both players'],
  ['heroes', 'players'],
  ['hero positions', 'player positions'],
  ['one hero', 'one loadout'],
  ['Cheat Death and revive-item hints', 'armor and revive-item hints'],
  ['Cheat Death', 'armor plates'],
  ['Party matches punish', 'Crew heists punish'],
  ['ally outlines', 'crew outlines'],
  ['upgrade trees on every gray silhouette', 'full loot trees on every gray silhouette'],
  ['upgrade text', 'loot text'],
  ['Orbs matter during', 'Cash bags matter during'],
  ['trade bleeds into the pit', 'fight spills into the alley'],
  ['abandon district pressure', 'abandon the fight'],
  ['high-MMR session', 'high-heat PvP session'],
  ['modes people actually rank in', 'modes people actually play'],
  ['standard Standard mode', 'Free Roam'],
  ['Standard mode', 'Free Roam'],
  ['Standard wins', 'Free Roam sessions'],

  // Valve leftovers (game publisher is Kefir; Steam is fine)
  ['Easy Anti-Cheat and Valve checks', 'Easy Anti-Cheat and server checks'],
  ['Valve’s automated layer', 'Kefir’s automated EAC layer'],
  ['Valve checks evolve', 'EAC checks evolve'],
  [' Valve ', ' Kefir '],
  [' Valve.', ' Kefir.'],
  [' Valve,', ' Kefir,'],
  ['Valve ', 'Kefir '],

  // Misc
  ['Flight above', 'rooftops above'],
  ['whip onto a fleeing vehicle', 'whip onto a fleeing target'],
  ['onto Flight', 'onto a chase target'],
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
  const base = path.basename(file);
  if (base.startsWith('purge-') || base.startsWith('rebrand-') || base.startsWith('cleanup-')) return false;
  return EXT.has(path.extname(file).toLowerCase());
}

let changed = 0;
for (const file of walk(ROOT).filter(shouldTouch)) {
  const raw = fs.readFileSync(file, 'utf8');
  let next = raw;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== raw) {
    fs.writeFileSync(file, next, 'utf8');
    changed++;
    console.log('Updated', path.relative(ROOT, file));
  }
}
console.log(`\nPurge done. Updated ${changed} files.`);
