import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const covers = [
  '/images/blog/esp-skeleton.webp',
  '/images/blog/esp-loot.webp',
  '/images/blog/esp-vehicles.webp',
  '/images/blog/esp-radar-town.webp',
  '/images/blog/esp-jewelry.webp',
  '/images/blog/esp-items.webp',
  '/images/blog/esp-pharmacy.webp',
  '/images/blog/esp-indoor.webp',
  '/images/blog/aimbot-bar.webp',
  '/images/blog/esp-storefront.webp',
  '/images/blog/esp-police.webp',
  '/images/blog/esp-players-indoor.webp',
  '/images/blog/esp-heist.webp',
  '/images/blog/esp-coast-cops.webp',
  '/images/blog/esp-parking.webp',
  '/images/blog/esp-plaza-loot.webp',
  '/images/blog/menu-visuals.webp',
  '/images/blog/menu-weapon.webp',
  '/images/blog/menu-aimbot.webp',
];

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

const imageFieldRe = /(image:\s*['"])([^'"]+)(['"])/g;

function rewriteFile(rel) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  let i = 0;

  text = text.replace(imageFieldRe, (m, a, url, c) => {
    if (!/\/images\//.test(url)) return m;
    const next = covers[i % covers.length];
    i++;
    return `${a}${next}${c}`;
  });

  text = text.replace(/\/images\/blog\/robrun-[a-z0-9.-]+\.webp/gi, () => {
    const next = covers[i % covers.length];
    i++;
    return next;
  });
  text = text.replace(/\/images\/hero\/robrun-[a-z0-9.-]+\.webp/gi, () => {
    const next = covers[i % covers.length].replace('/blog/', '/hero/');
    i++;
    return next;
  });
  text = text.replace(/\/images\/gameplay\/robrun-[a-z0-9.-]+\.webp/gi, () => {
    const next = covers[i % covers.length].replace('/blog/', '/gameplay/');
    i++;
    return next;
  });

  // Ensure imageAlt exists near image fields for posts (best-effort)
  if (rel.includes('posts.ts') || rel.includes('keyword-posts.ts')) {
    // Add/replace imageAlt when an image line is present in an object block
    text = text.replace(
      /(image:\s*['"](\/images\/blog\/[^'"]+)['"],?\n)(\s*)(imageAlt:\s*['"][^'"]*['"],?\n)?/g,
      (m, imageLine, imgPath, indent, existingAlt) => {
        const alt = alts[imgPath] || 'ROB RUN cheat gameplay screenshot with ESP overlays';
        return `${imageLine}${indent}imageAlt: '${alt.replace(/'/g, "\\'")}',\n`;
      },
    );
  }

  fs.writeFileSync(file, text);
  console.log('updated', rel, 'cycles', i);
}

for (const f of [
  'src/data/blog/posts.ts',
  'src/data/blog/keyword-posts.ts',
  'src/i18n/en.ts',
  'src/config/seo.ts',
  'src/pages/index.astro',
]) {
  rewriteFile(f);
}

// Force known SEO + preload targets
const seoFile = path.join(root, 'src/config/seo.ts');
let seo = fs.readFileSync(seoFile, 'utf8');
seo = seo.replace(
  /export const DEFAULT_OG_IMAGE = ['"][^'"]+['"]/,
  "export const DEFAULT_OG_IMAGE = '/images/blog/esp-skeleton-og.webp'",
);
fs.writeFileSync(seoFile, seo);

const indexFile = path.join(root, 'src/pages/index.astro');
let index = fs.readFileSync(indexFile, 'utf8');
index = index.replace(
  /href="\/images\/hero\/[^"]+"/,
  'href="/images/hero/menu-visuals-512.webp"',
);
fs.writeFileSync(indexFile, index);
console.log('seo + index preload fixed');
