/**
 * One primary URL per search intent — use on /compare/ and internal linking.
 * Secondary URLs should support (not compete with) the primary.
 */
export interface SeoIntentRow {
  intent: string;
  primaryPath: string;
  primaryLabel: string;
  secondary: { path: string; label: string }[];
  rule: string;
}

export const SEO_INTENT_MAP: SeoIntentRow[] = [
  {
    intent: 'Buy / transactional Rob Run cheats',
    primaryPath: '/products/robrun-cheat/elite/',
    primaryLabel: 'Elite product page',
    secondary: [
      { path: '/products/robrun-cheat/', label: 'Products hub' },
      { path: '/blog/buy-guide/', label: 'Buy guide' },
    ],
    rule: 'Money intent lands on Elite; hub compares catalog SKUs only.',
  },
  {
    intent: 'Safe / undetected / ban risk',
    primaryPath: '/blog/are-robrun-cheats-safe/',
    primaryLabel: 'Are Rob Run cheats safe?',
    secondary: [
      { path: '/blog/robrun-anti-cheat-undetected/', label: 'Anti-cheat & EAC ban' },
      { path: '/blog/undetected-robrun-hacks/', label: 'Undetected loader notes' },
    ],
    rule: 'Safety answers cite the safe guide; anti-cheat/loader posts deepen, not duplicate.',
  },
  {
    intent: 'HWID / hardware ban recovery',
    primaryPath: '/products/robrun-cheat/hwid-spoofer/',
    primaryLabel: 'HWID Spoofer product',
    secondary: [
      { path: '/blog/hwid/', label: 'HWID setup guide' },
      { path: '/compare/hwid-vs-new-account/', label: 'HWID vs new account' },
    ],
    rule: 'Commercial HWID queries → product; how-to → blog; decision → compare page.',
  },
  {
    intent: 'Account / UGC recovery',
    primaryPath: '/products/robrun-cheat/ugc/',
    primaryLabel: 'UGC product',
    secondary: [
      { path: '/products/robrun-cheat/utilities/', label: 'Utilities comparison' },
      { path: '/compare/cheats-vs-utilities/', label: 'Cheats vs utilities' },
    ],
    rule: 'UGC buy intent stays on UGC; utilities page is the decision table.',
  },
  {
    intent: 'Aim assist / soft aim how-to',
    primaryPath: '/blog/aimbot/',
    primaryLabel: 'Aimbot guide',
    secondary: [
      { path: '/blog/bones/', label: 'Bone priority' },
      { path: '/blog/fov/', label: 'FOV tuning' },
      { path: '/blog/robrun-aimbot-silent-magic-bullet/', label: 'Silent / magic bullet risks' },
    ],
    rule: 'General aim → aimbot; bones/FOV are child topics; silent/magic is risk-only.',
  },
  {
    intent: 'ESP / wallhack how-to',
    primaryPath: '/blog/esp/',
    primaryLabel: 'ESP guide',
    secondary: [
      { path: '/blog/robrun-esp-wallhack/', label: 'Wallhack notes' },
      { path: '/blog/robrun-aimbot-esp-explained/', label: 'Aimbot + ESP overview' },
    ],
    rule: 'ESP how-to → esp; wallhack is synonym support; overview is for beginners only.',
  },
  {
    intent: 'Tier comparison / what to buy',
    primaryPath: '/products/robrun-cheat/elite/',
    primaryLabel: 'Elite product page',
    secondary: [
      { path: '/blog/lite-vs-pro/', label: 'Legacy Lite vs Pro notes' },
      { path: '/blog/elite/', label: 'Elite tier guide' },
      { path: '/compare/', label: 'Compare hub' },
      { path: '/products/robrun-cheat/', label: 'Products hub' },
    ],
    rule: 'Buy intent → Elite product; lite-vs-pro is historical support; shopping → products hub.',
  },
  {
    intent: 'Non-cheat settings / FPS',
    primaryPath: '/blog/settings/',
    primaryLabel: 'ROB RUN settings guide',
    secondary: [],
    rule: 'Keep as topical authority without forcing a cheat CTA in the first screen.',
  },
  {
    intent: 'Radar / minimap hack',
    primaryPath: '/blog/radar/',
    primaryLabel: 'Radar guide',
    secondary: [
      { path: '/blog/esp/', label: 'ESP guide' },
      { path: '/blog/vehicles/', label: 'Vehicle ESP' },
    ],
    rule: 'Radar intent stays on /blog/radar/; ESP and vehicles support.',
  },
  {
    intent: 'Money glitch / infinite cash',
    primaryPath: '/blog/money/',
    primaryLabel: 'Money glitch truth',
    secondary: [
      { path: '/blog/dupe/', label: 'Dupe glitch' },
      { path: '/blog/loot/', label: 'Loot ESP' },
    ],
    rule: 'Economy myths → money/dupe; loot ESP is the supported alternative.',
  },
  {
    intent: 'Free cheats / downloads',
    primaryPath: '/blog/free/',
    primaryLabel: 'Free cheats risks',
    secondary: [
      { path: '/blog/are-robrun-cheats-safe/', label: 'Safety guide' },
      { path: '/blog/steam/', label: 'Steam PC compatibility' },
    ],
    rule: 'Free-download intent lands on risk education, then safety/Steam.',
  },
];
