import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const alts = {
  '/images/blog/esp-skeleton.webp':
    'ROB RUN skeletal ESP and red player boxes with distance and weapon tags through indoor pillars',
  '/images/blog/esp-loot.webp':
    'ROB RUN loot ESP labels for phones, cash registers and items with radar in a sunny parking lot',
  '/images/blog/esp-vehicles.webp':
    'ROB RUN vehicle ESP with yellow 3D boxes, nameplates and radar over cars in a western town',
  '/images/blog/esp-radar-town.webp':
    'ROB RUN radar and vehicle ESP boxes on a hatchback outside a storefront in town',
  '/images/blog/esp-jewelry.webp':
    'ROB RUN NPC skeleton ESP and jewelry loot tags through a glass storefront with distance readouts',
  '/images/blog/esp-items.webp':
    'ROB RUN item ESP highlighting phones, cigars and cash registers behind hedges near a parked hatchback',
  '/images/blog/esp-pharmacy.webp':
    'ROB RUN wallhack boxes and pharmacy, phone and cash register loot tags through a patio storefront',
  '/images/blog/esp-indoor.webp':
    'ROB RUN indoor wallhack with cyan doorway boxes, loot tags and ROB RUN radar outside a building entrance',
  '/images/blog/aimbot-bar.webp':
    'ROB RUN aimbot FOV circle and skeleton ESP locking a robber behind the Reef Bar counter',
  '/images/blog/esp-storefront.webp':
    'ROB RUN player ESP boxes and nameplates on robbers inside a storefront viewed from a getaway hatchback',
  '/images/blog/esp-police.webp':
    'ROB RUN ESP boxes on a police SUV and skeleton overlay on a nearby cop beside a ROB RUN hatchback',
  '/images/blog/esp-players-indoor.webp':
    'ROB RUN red skeleton ESP on multiple criminals with distance and armor tags in a vaulted indoor plaza',
  '/images/blog/esp-heist.webp':
    'ROB RUN heist ESP showing robber outlines, weapons and distances through a blue business building doorway',
  '/images/blog/esp-coast-cops.webp':
    'ROB RUN aimbot FOV and ESP boxes on police cars along a sunny coastal road with a Ferris wheel behind',
  '/images/blog/esp-parking.webp':
    'ROB RUN ESP boxes and skeletons on players and cars in a desert parking lot with a central aim reticle',
  '/images/blog/esp-plaza-loot.webp':
    'ROB RUN green loot ESP boxes through a plaza building wall with cash and security item labels',
  '/images/blog/menu-visuals.webp':
    'ROB RUN cheat menu open on Visuals with player ESP toggles and a live desert street behind the overlay',
  '/images/blog/menu-weapon.webp':
    'ROB RUN cheat weapon settings panel with skin changer toggles over desert ESP boxes on vehicles',
  '/images/blog/menu-aimbot.webp':
    'ROB RUN cheat aimbot settings menu beside ESP-highlighted players and a custom radar',
};
const fallback = 'ROB RUN cheat gameplay screenshot with ESP overlays';

for (const rel of ['src/data/blog/posts.ts', 'src/data/blog/keyword-posts.ts', 'src/i18n/en.ts']) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(
    /(image:\s*["'])(\/images\/blog\/[^"']+)(["'],?\r?\n)(\s*)imageAlt:\s*["'][^"']*["']/g,
    (m, a, img, c, indent) => {
      const alt = (alts[img] || fallback).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `${a}${img}${c}${indent}imageAlt: '${alt}'`;
    },
  );
  fs.writeFileSync(file, text);
  console.log('synced', rel);
}
