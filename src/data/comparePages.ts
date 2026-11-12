export type CompareBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export interface ComparePage {
  slug: string;
  title: string;
  h1: string;
  desc: string;
  primaryCta: { href: string; label: string };
  body: CompareBlock[];
}

export const comparePages: ComparePage[] = [
  {
    slug: 'hwid-vs-new-account',
    title: 'HWID Spoofer vs New Account | ROB RUN Ban Recovery',
    h1: 'HWID Spoofer vs New Account After a ROB RUN Ban',
    desc:
      'Choose HWID Spoofer or a fresh Steam account after a ROB RUN hardware or account ban—decision checklist before checkout.',
    primaryCta: { href: '/products/robrun-cheat/hwid-spoofer/', label: 'Open HWID Spoofer' },
    body: [
      {
        type: 'p',
        text: 'After a ROB RUN or Easy Anti-Cheat hit, buyers usually ask one question: spoof this PC, or abandon the account? The answer depends on whether the flag is tied to hardware, the Steam account, or both. This page is the decision guide; the [HWID product page](/products/robrun-cheat/hwid-spoofer/) is where you buy if spoofing is the right path.',
      },
      { type: 'h2', text: 'Choose HWID Spoofer when' },
      {
        type: 'ul',
        items: [
          'Fresh Steam accounts die on the same PC within minutes of launching ROB RUN.',
          'Support or your ban notice points at a hardware / HWID style enforcement.',
          'You can take a restore point, follow the portal checklist, reboot, and verify IDs before queueing.',
          'You still want to keep configs and habits on the machine you already own.',
        ],
      },
      { type: 'h2', text: 'Choose a new account when' },
      {
        type: 'ul',
        items: [
          'The restriction is account-only (Steam hold, UGC path, reputation burn) and hardware looks clean.',
          'You cannot or will not change disk/MAC/GPU identifiers on a shared or work PC.',
          'You need a clean social graph more than you need to keep the old inventory.',
        ],
      },
      { type: 'h2', text: 'When to pair tools' },
      {
        type: 'p',
        text: 'Some players need both: [UGC](/products/robrun-cheat/ugc/) to organize an account appeal, then HWID if new accounts still die on the same box. Do not buy Elite soft aim as a substitute for either recovery path—combat modules do not clear hardware flags.',
      },
      { type: 'h2', text: 'Safe order of operations' },
      {
        type: 'ul',
        items: [
          'Read the live the live status banner — never spoof or launch while loaders are Updating.',
          'Backup / restore point before any HWID change.',
          'Follow portal steps only (no random Discord DM loaders).',
          'Verify identifiers, then test in Free Roam before Open World.',
          'If accounts still die instantly, open Discord support with order ID + screenshots before buying again.',
        ],
      },
      {
        type: 'p',
        text: 'Deep setup notes: [HWID blog guide](/blog/hwid/). Catalog decision table: [utilities comparison](/products/robrun-cheat/utilities/).',
      },
    ],
  },
  {
    slug: 'cheats-vs-utilities',
    title: 'Rob Run Cheats vs HWID & UGC Utilities',
    h1: 'Rob Run Cheats vs HWID Spoofer & UGC Utilities',
    desc:
      'Compare ROB RUN Elite cheats with HWID Spoofer and UGC recovery—when to buy combat modules versus ban utilities.',
    primaryCta: { href: '/products/robrun-cheat/', label: 'Open products hub' },
    body: [
      {
        type: 'p',
        text: 'ROB RUNcheat.net sells three catalog products on purpose. Cheats (Elite) solve awareness and aim problems in Open World and Heists. Utilities solve access problems after flags or holds. Mixing them up wastes money and creates support tickets.',
      },
      { type: 'h2', text: 'Buy Rob Run Cheats (Elite) when' },
      {
        type: 'ul',
        items: [
          'You can launch ROB RUN and queue matches already.',
          'You want player ESP, soft aim, radar, or Open World helpers.',
          'You accept ban risk and will read the the live status banner before every session.',
        ],
      },
      { type: 'h2', text: 'Buy HWID Spoofer when' },
      {
        type: 'ul',
        items: [
          'New accounts fail on one PC but work elsewhere.',
          'You need to rotate hardware identifiers after an anti-cheat hardware flag.',
        ],
      },
      { type: 'h2', text: 'Buy UGC when' },
      {
        type: 'ul',
        items: [
          'Steam or account access is restricted and you need a structured appeal workflow.',
          'You are documenting a case—not trying to force an undetectable aim preset.',
        ],
      },
      { type: 'h2', text: 'Quick matrix' },
      {
        type: 'ul',
        items: [
          'Can play, want ESP/aim → [Elite](/products/robrun-cheat/elite/)',
          'Cannot play on this PC → [HWID Spoofer](/products/robrun-cheat/hwid-spoofer/) or [HWID vs new account](/compare/hwid-vs-new-account/)',
          'Account hold / appeal → [UGC](/products/robrun-cheat/ugc/)',
          'Still choosing tiers historically → [Lite vs Pro](/blog/lite-vs-pro/) (legacy context; catalog shop is Elite + utilities)',
        ],
      },
      {
        type: 'p',
        text: 'Full utility table with feature blurbs: [utilities page](/products/robrun-cheat/utilities/). Risk framing: [Are Rob Run cheats safe?](/blog/are-robrun-cheats-safe/).',
      },
    ],
  },
  {
    slug: 'safe-setup-checklist',
    title: 'Safe Rob Run Cheat Setup Checklist | Before Heists',
    h1: 'Safe Rob Run Cheat Setup Checklist Before Heists',
    desc:
      'Pre-heist checklist for Rob Run cheats: status board, Free Roam, conservative presets, stream-proof tests, and Discord support.',
    primaryCta: { href: '/blog/are-robrun-cheats-safe/', label: 'Read safety guide' },
    body: [
      {
        type: 'p',
        text: 'This checklist is the operational companion to [Are Rob Run cheats safe?](/blog/are-robrun-cheats-safe/)—the primary URL for safe/undetected intent. Use it the night you install, not as a substitute for the live the live status banner.',
      },
      { type: 'h2', text: 'Before checkout' },
      {
        type: 'ul',
        items: [
          'Confirm you need cheats vs utilities via [cheats vs utilities](/compare/cheats-vs-utilities/).',
          'Read Elite module list and system requirements on the [product page](/products/robrun-cheat/elite/).',
          'Plan a Free Roam session—first launch is never a Open World promo game.',
        ],
      },
      { type: 'h2', text: 'After delivery' },
      {
        type: 'ul',
        items: [
          'Download only from your order portal.',
          'Check the live status banner — if Updating or Offline, wait.',
          'Load portal conservative presets; disable magic bullet / aggressive loot aim helpers if you care about reports.',
          'Enable stream-proof and record a 60-second OBS test if you create content.',
          'Play two Practice or bot matches before any Open World queue.',
        ],
      },
      { type: 'h2', text: 'After every ROB RUN patch' },
      {
        type: 'ul',
        items: [
          'Refresh the live status banner and the portal notice.',
          'Follow the [patch-day checklist](/blog/patch-day/).',
          'Re-test one loadout in Practice before climbing again.',
        ],
      },
      {
        type: 'p',
        text: 'Loader architecture notes stay on [undetected hacks](/blog/undetected-robrun-hacks/); anti-cheat behavior stays on [EAC / anti-cheat](/blog/robrun-anti-cheat-undetected/). Those URLs support this checklist—they are not alternate “safe?” landing pages.',
      },
    ],
  },
];

export function getComparePage(slug: string): ComparePage | undefined {
  return comparePages.find((p) => p.slug === slug);
}

export function getAllCompareSlugs(): string[] {
  return comparePages.map((p) => p.slug);
}
