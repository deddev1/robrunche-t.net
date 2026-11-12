import fs from 'node:fs';

const map = {
  'cheat-codes': 'Buy Rob Run Cheats vs Console Codes — What Works Online',
  'console-tips': 'Rob Run Cheat Setup Tips — From Free Roam to Live PvP',
  'use-codes': 'How to Buy & Activate Rob Run Cheats After Checkout',
  features: 'Undetected Rob Run Cheat Features — ESP Soft Aim & Utilities',
  'console-cmds': 'ROB RUN Private Loader vs Offline Trainers — Buy the Right Tool',
  'lite-vs-pro': 'Buy ROB RUN Lite vs Pro Cheats — Which Undetected Tier?',
  elite: 'Buy ROB RUN Elite Cheats — Full Undetected Open World Suite',
  aimbot: 'Buy ROB RUN Soft Aim & Aim Assist — Undetected Pro Tools',
  esp: 'Buy ROB RUN ESP & Radar Cheats — Undetected Lite Setup',
  fov: 'Buy ROB RUN FOV Camera Cheats with ESP Awareness',
  skins: 'Buy ROB RUN Unlock All — Skin & Cosmetic Preview Utility',
  'patch-day': 'ROB RUN Patch Day Checklist Before You Buy Undetected Cheats',
  hwid: 'Buy ROB RUN HWID Spoofer After an Game Ban — Reset Guide',
  'buy-guide': 'How to Buy Undetected Rob Run Cheats in 2026 — Lite Pro Elite',
  bones: 'Buy ROB RUN Soft Aim Profiles — Target Select & Weapon loadouts',
  'valve-error': 'Easy Anti-Cheat Errors vs Buying ROB RUN UGC or HWID Help',
  external: 'Buy External Rob Run Cheats — Safer Undetected Loader Delivery',
  'stream-proof': 'Buy Stream-Proof Rob Run Cheats for Creators — OBS Safe Overlay',
};

const seoMap = {
  'cheat-codes': 'Buy Rob Run Cheats vs Console Codes | Online Guide',
  'console-tips': 'Rob Run Cheat Setup Tips | Free Roam to Live PvP',
  'use-codes': 'How to Buy & Activate Rob Run Cheats | Setup',
  features: 'Undetected Rob Run Cheat Features | ESP Soft Aim',
  'console-cmds': 'ROB RUN Private Loader vs Offline Trainers',
  'lite-vs-pro': 'Buy ROB RUN Lite vs Pro Cheats | Tier Guide',
  elite: 'Buy ROB RUN Elite Cheats | Undetected ranked Suite',
  aimbot: 'Buy ROB RUN Soft Aim & Aim Assist | Pro Tier',
  esp: 'Buy ROB RUN ESP & Radar Cheats | Lite Setup',
  fov: 'Buy ROB RUN FOV Camera Cheats | ESP Awareness',
  skins: 'Buy ROB RUN Unlock All | Kit Skin Preview',
  'patch-day': 'ROB RUN Patch Day Checklist | Before You Buy',
  hwid: 'Buy ROB RUN HWID Spoofer After Ban | Reset Guide',
  'buy-guide': 'How to Buy Undetected Rob Run Cheats 2026',
  bones: 'Buy ROB RUN Soft Aim Profiles | Target Select',
  'valve-error': 'Easy Anti-Cheat Errors | ROB RUN UGC & HWID Help',
  external: 'Buy External Rob Run Cheats | Undetected Loader',
  'stream-proof': 'Buy Stream-Proof Rob Run Cheats | OBS Safe',
};

let posts = fs.readFileSync('src/data/blog/posts.ts', 'utf8');
let en = fs.readFileSync('src/i18n/en.ts', 'utf8');

for (const [slug, title] of Object.entries(map)) {
  // posts: title may use " or '; slug may use " or '
  posts = posts.replace(
    new RegExp(`(title:\\s*["'])([^"']*)(["']\\s*,\\s*\\n\\s*slug:\\s*["']${slug}["'])`),
    `$1${title}$3`,
  );
  posts = posts.replace(
    new RegExp(`(slug:\\s*["']${slug}["']\\s*,\\s*\\n\\s*seoTitle:\\s*["'])([^"']*)(["'])`),
    `$1${seoMap[slug]}$3`,
  );

  en = en.replace(
    new RegExp(`(title:\\s*["'])([^"']*)(["']\\s*,\\s*\\n\\s*slug:\\s*["']${slug}["'])`),
    `$1${title}$3`,
  );
}

fs.writeFileSync('src/data/blog/posts.ts', posts);
fs.writeFileSync('src/i18n/en.ts', en);
console.log('Synced remaining titles/seoTitles');
