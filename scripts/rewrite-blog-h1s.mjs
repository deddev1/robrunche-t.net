import fs from 'node:fs';

const postsPath = 'src/data/blog/posts.ts';
const enPath = 'src/i18n/en.ts';
let text = fs.readFileSync(postsPath, 'utf8');
let en = fs.readFileSync(enPath, 'utf8');

const updates = [
  {
    slug: 'cheat-codes',
    title: 'Buy Rob Run Cheats vs Console Codes — What Works Online',
    seoTitle: 'Buy Rob Run Cheats vs Console Codes | Online Guide',
  },
  {
    slug: 'console-tips',
    title: 'Rob Run Cheat Setup Tips — From Free Roam to Live PvP',
    seoTitle: 'Rob Run Cheat Setup Tips | Free Roam to Live PvP',
  },
  {
    slug: 'use-codes',
    title: 'How to Buy & Activate Rob Run Cheats After Checkout',
    seoTitle: 'How to Buy & Activate Rob Run Cheats | Setup',
  },
  {
    slug: 'features',
    title: 'Undetected Rob Run Cheat Features — ESP Soft Aim & Utilities',
    seoTitle: 'Undetected Rob Run Cheat Features | ESP Soft Aim',
  },
  {
    slug: 'console-cmds',
    title: 'ROB RUN Private Loader vs Offline Trainers — Buy the Right Tool',
    seoTitle: 'ROB RUN Private Loader vs Offline Trainers',
  },
  {
    slug: 'lite-vs-pro',
    title: 'Buy ROB RUN Lite vs Pro Cheats — Which Undetected Tier?',
    seoTitle: 'Buy ROB RUN Lite vs Pro Cheats | Tier Guide',
  },
  {
    slug: 'elite',
    title: 'Buy ROB RUN Elite Cheats — Full Undetected Open World Suite',
    seoTitle: 'Buy ROB RUN Elite Cheats | Undetected ranked Suite',
  },
  {
    slug: 'aimbot',
    title: 'Buy ROB RUN Soft Aim & Aim Assist — Undetected Pro Tools',
    seoTitle: 'Buy ROB RUN Soft Aim & Aim Assist | Pro Tier',
  },
  {
    slug: 'esp',
    title: 'Buy ROB RUN ESP & Radar Cheats — Undetected Lite Setup',
    seoTitle: 'Buy ROB RUN ESP & Radar Cheats | Lite Setup',
  },
  {
    slug: 'fov',
    title: 'Buy ROB RUN FOV Camera Cheats with ESP Awareness',
    seoTitle: 'Buy ROB RUN FOV Camera Cheats | ESP Awareness',
  },
  {
    slug: 'skins',
    title: 'Buy ROB RUN Unlock All — Skin & Cosmetic Preview Utility',
    seoTitle: 'Buy ROB RUN Unlock All | Kit Skin Preview',
  },
  {
    slug: 'patch-day',
    title: 'ROB RUN Patch Day Checklist Before You Buy Undetected Cheats',
    seoTitle: 'ROB RUN Patch Day Checklist | Before You Buy',
  },
  {
    slug: 'hwid',
    title: 'Buy ROB RUN HWID Spoofer After an Game Ban — Reset Guide',
    seoTitle: 'Buy ROB RUN HWID Spoofer After Ban | Reset Guide',
  },
  {
    slug: 'buy-guide',
    title: 'How to Buy Undetected Rob Run Cheats in 2026 — Lite Pro Elite',
    seoTitle: 'How to Buy Undetected Rob Run Cheats 2026',
  },
  {
    slug: 'bones',
    title: 'Buy ROB RUN Soft Aim Profiles — Target Select & Weapon loadouts',
    seoTitle: 'Buy ROB RUN Soft Aim Profiles | Target Select',
  },
  {
    slug: 'valve-error',
    title: 'Easy Anti-Cheat Errors vs Buying ROB RUN UGC or HWID Help',
    seoTitle: 'Easy Anti-Cheat Errors | ROB RUN UGC & HWID Help',
  },
  {
    slug: 'external',
    title: 'Buy External Rob Run Cheats — Safer Undetected Loader Delivery',
    seoTitle: 'Buy External Rob Run Cheats | Undetected Loader',
  },
  {
    slug: 'stream-proof',
    title: 'Buy Stream-Proof Rob Run Cheats for Creators — OBS Safe Overlay',
    seoTitle: 'Buy Stream-Proof Rob Run Cheats | OBS Safe',
  },
];

for (const u of updates) {
  const titleBeforeSlug = new RegExp(
    `(title:\\s*")([^"]*)("\\s*,\\s*\\n\\s*slug:\\s*"${u.slug}")`,
  );
  const seoAfterSlug = new RegExp(
    `(slug:\\s*"${u.slug}"\\s*,\\s*\\n\\s*seoTitle:\\s*")([^"]*)(")`,
  );
  const titleBeforeSlugSingle = new RegExp(
    `(title:\\s*')([^']*)('\\s*,\\s*\\n\\s*slug:\\s*'${u.slug}')`,
  );

  if (titleBeforeSlug.test(text)) {
    text = text.replace(titleBeforeSlug, `$1${u.title}$3`);
  } else {
    console.warn('title miss posts', u.slug);
  }

  if (seoAfterSlug.test(text)) {
    text = text.replace(seoAfterSlug, `$1${u.seoTitle}$3`);
  } else {
    console.warn('seo miss posts', u.slug);
  }

  // Sync en.ts blog card titles when slug matches
  if (titleBeforeSlugSingle.test(en)) {
    en = en.replace(titleBeforeSlugSingle, `$1${u.title}$3`);
  }
}

fs.writeFileSync(postsPath, text);
fs.writeFileSync(enPath, en);
console.log('Updated blog H1s in posts.ts and synced en.ts card titles where matched.');
