import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const files = [
  'src/i18n/en.ts',
  'src/data/blog/posts.ts',
  'src/data/blog/keyword-posts.ts',
];

const pairs = [
  [
    'when head locks fail on SMG, shotgun and pistol loadouts',
    'when to prefer chest locks on SMG, shotgun and pistol fights',
  ],
  [
    'why head locks fail on SMG, shotgun and pistol loadouts',
    'when chest locks beat head locks on SMG, shotgun and pistol fights',
  ],
  [
    'why SMG, shotgun and pistol loadouts gain little from head locks',
    'when SMG, shotgun and pistol fights favor chest locks over head locks',
  ],
  [
    'Headshots deal a base 1.65× bullet damage, but SMG loadouts and shotgun loadouts cannot crit, and pistol loadouts headshots trigger item effects without bonus damage. For those three, chest locks often beat head locks.',
    'In close-range ROB RUN fights, SMG and shotgun sprays often miss a bobbing head hitbox. Chest locks track more reliably while you strafe, drive, or peek alleys—especially before you have a clean optic sight picture.',
  ],
  [
    'Headshots deal a base 1.65× bullet damage, but SMG loadouts and shotgun loadouts cannot land critical hits at all, and pistol loadouts headshots trigger item effects without the bonus damage. For those three, a head lock buys little over a chest lock.',
    'Close-range ROB RUN gunfights punish tiny head hitboxes. For SMG and shotgun sprays, chest locks stay on target through strafe and vehicle sway; save head priority for slower rifle peeks when you already frame the enemy.',
  ],
  [
    'Bone choice matters more in ROB RUN than in most shooters. Headshots deal a base 1.65× bullet damage, but SMG loadouts and shotgun loadouts cannot land critical hits, and pistol loadouts headshots trigger item effects without the bonus damage. For those three, a head lock buys little over a chest lock.',
    'Bone choice matters in ROB RUN because fights move between alleys, vehicles, and rooftops. Head locks shine on stable rifle peeks; chest locks win more SMG and shotgun trades when targets strafe or crouch spam.',
  ],
  [
    "Bone choice matters more in ROB RUN than in most shooters. Headshots deal a base 1.65× bullet damage, but SMG loadouts and shotgun loadouts cannot land critical hits at all, and pistol loadouts’s headshots trigger item effects without the bonus damage. For those three, a head lock buys little over a chest lock.",
    'Bone choice matters in ROB RUN because fights move between alleys, vehicles, and rooftops. Head locks shine on stable rifle peeks; chest locks win more SMG and shotgun trades when targets strafe or crouch spam.',
  ],
  [
    'Bone select tuned per loadout—chest over head for SMG, shotgun and pistol loadouts',
    'Bone select tuned per loadout—chest for close SMG/shotgun, head for rifle peeks',
  ],
  ['["SMG loadouts", "Chest", "No critical hits"]', '["SMG / close range", "Chest", "Tracks strafe better"]'],
  ['["shotgun loadouts", "Chest", "No critical hits"]', '["Shotgun", "Chest", "Pellet spread favors center mass"]'],
  ['["pistol loadouts", "Chest", "Headshots skip bonus damage"]', '["Pistol / hipfire", "Chest", "Faster acquire in panic peeks"]'],
  ['["Most gun loadouts", "Head", "1.65× crit when available"]', '["Rifle / optic", "Head", "Best when you already frame the target"]'],
];

for (const rel of files) {
  const f = path.join(root, rel);
  let t = fs.readFileSync(f, 'utf8');
  let n = t;
  for (const [a, b] of pairs) n = n.split(a).join(b);
  if (n !== t) {
    fs.writeFileSync(f, n, 'utf8');
    console.log('fixed', rel);
  } else {
    console.log('no change', rel);
  }
}
