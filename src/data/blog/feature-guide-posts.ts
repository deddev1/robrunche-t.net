import type { BlogPostFull } from './types';

/**
 * Short-slug guides distilled from current ROB RUN feature listings.
 * Branded for robruncheat.net only — no third-party seller names.
 */
export const featureGuidePosts: BlogPostFull[] = [
  {
    tag: 'Features',
    title: 'ROB RUN Radar Hack: Zoom, Distance Rings & FOV Cone',
    slug: 'radar',
    seoTitle: 'ROB RUN Radar Hack | Zoom Rings FOV Cone',
    image: '/images/blog/esp-radar-town.webp',
    imageAlt: 'ROB RUN radar and vehicle ESP boxes on a hatchback outside a storefront in town',
    desc: 'How ROB RUN radar works—zoom, distance rings, FOV cone and entity tracking—versus on-screen ESP boxes and aimbot.',
    date: 'Nov 11, 2026',
    readTime: '7 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN radar is a separate view from player ESP and soft aim. It plots supported entities on a compact map with zoom, distance rings, an FOV cone and entity tracking so you see space—not only boxes through walls.',
      },
      {
        type: 'p',
        text: 'Use radar when you need rotate timing: who is flanking the heist exit, which police unit closed the road, which vehicle is still hot. Pair it with [ESP](/blog/esp/) for close reads and [aimbot](/blog/aimbot/) only when a fight is already committed.',
      },
      { type: 'h2', text: 'What the radar menu usually includes' },
      {
        type: 'ul',
        items: [
          'Zoom — tighten for alley fights or pull out for open-world travel',
          'Distance rings — quick range bands without counting meters',
          'FOV cone — show what your camera can currently cover',
          'Entity tracking — players, NPCs, vehicles or loot classes you enable',
        ],
      },
      { type: 'h2', text: 'Radar vs ESP vs off-screen arrows' },
      {
        type: 'p',
        text: 'ESP draws boxes, skeletons and tags in the 3D view. Off-screen arrows point at supported entities outside your frame. Radar answers “where on the map?” without stacking every label on your screen. Do not assume every tracked object appears in all three systems—enable what you need per Free Roam session.',
      },
      {
        type: 'cta',
        title: 'Compare ROB RUN radar tiers',
        text: 'Radar and awareness modules ship with Lite upward—confirm live status, then unlock access.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Related: [vehicle ESP](/blog/vehicles/) · [loot ESP](/blog/loot/) · [features map](/blog/features/). Check the status banner after every ROB RUN patch.',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ROB RUN Loot ESP: Weapons, Ammo, Armor & Equipment',
    slug: 'loot',
    seoTitle: 'ROB RUN Loot ESP | Weapons Ammo Armor Guide',
    image: '/images/blog/esp-loot.webp',
    imageAlt: 'ROB RUN loot ESP labels for phones, cash registers and items with radar in a sunny parking lot',
    desc: 'Loot ESP shows supported weapons, ammo, armor and equipment through walls—what it does and what it never does.',
    date: 'Nov 11, 2026',
    readTime: '6 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN loot ESP is world-item information: supported weapons, ammunition, armor and equipment tagged beyond the default HUD. It helps you decide whether a store, stash or corpse is worth the risk before you commit.',
      },
      {
        type: 'p',
        text: 'It does not create loot, change drop rates, duplicate inventories or print unlimited cash. Searches for [money glitches](/blog/money/) and [dupes](/blog/dupe/) describe different—and usually unverified—behavior.',
      },
      { type: 'h2', text: 'Practical loot ESP filters' },
      {
        type: 'ul',
        items: [
          'Start with weapons and armor only—phones and clutter drown heist focuses',
          'Raise max distance slowly; long-range tags add noise on open roads',
          'Combine with [radar](/blog/radar/) when you need map context, not a wall of labels',
          'Save a “heist” and a “PvP” preset so you are not retuning mid-fight',
        ],
      },
      {
        type: 'cta',
        title: 'Get loot ESP access',
        text: 'Loot overlays ship with awareness tiers—secure checkout after you confirm Undetected status.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Also: [jewelry / shop ESP](/blog/esp/) · [vehicle ESP](/blog/vehicles/) · [wallhack meaning](/blog/robrun-esp-wallhack/).',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ROB RUN Vehicle ESP: Owner, Driver & Speed',
    slug: 'vehicles',
    seoTitle: 'ROB RUN Vehicle ESP | Owner Driver Speed',
    image: '/images/blog/esp-vehicles.webp',
    imageAlt: 'ROB RUN vehicle ESP with yellow 3D boxes, nameplates and radar over cars in a western town',
    desc: 'Vehicle ESP for ROB RUN—owners, drivers, speed and status tags for chases, getaways and PvP roads.',
    date: 'Nov 11, 2026',
    readTime: '6 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN vehicle ESP highlights supported cars with fields such as owners, drivers, speed and vehicle status. In a sandbox built around travel, pursuits and street fights, that information is distinct from player boxes.',
      },
      {
        type: 'p',
        text: 'Use it to spot occupied getaway cars, abandoned loot haulers and police units before they close a corner. It does not spawn vehicles, unlock cars or rewrite ownership—only overlays what the current build can read.',
      },
      { type: 'h2', text: 'When vehicle ESP earns its place' },
      {
        type: 'ul',
        items: [
          'Coastal or town chases where audio alone is late',
          'Heist exits when you need a free hatchback, not a occupied trap',
          'Open-world PvP when a silent driver parks for an ambush',
        ],
      },
      {
        type: 'cta',
        title: 'Unlock vehicle ESP',
        text: 'Compare tiers with vehicle overlays, then checkout when status is green.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Pair with [radar](/blog/radar/) and [camera ESP](/blog/cameras/) for full route awareness.',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ROB RUN Camera ESP: Normal, Broken & Alarm States',
    slug: 'cameras',
    seoTitle: 'ROB RUN Camera ESP | Alarm States Guide',
    image: '/images/blog/esp-indoor.webp',
    imageAlt: 'ROB RUN indoor wallhack with cyan doorway boxes, loot tags and ROB RUN radar outside a building entrance',
    desc: 'Camera ESP for ROB RUN security cams—Normal, Broken and Alarm states, and what overlays never disable.',
    date: 'Nov 11, 2026',
    readTime: '5 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'Camera ESP shows supported security cameras and their states—commonly Normal, Broken and Alarm—so you know whether a storefront or heist interior is already hot before you push in.',
      },
      {
        type: 'p',
        text: 'Overlays are not the same as disabling cameras, removing alarm triggers or auto-completing heists. Treat camera ESP as information: plan the approach, then play the encounter yourself.',
      },
      { type: 'h2', text: 'Heist workflow tip' },
      {
        type: 'ul',
        items: [
          'Scan for Alarm before you commit the entry',
          'Mark Broken cams so you do not waste time on dead hardware',
          'Keep [loot ESP](/blog/loot/) filtered so camera tags stay readable',
        ],
      },
      {
        type: 'cta',
        title: 'Get heist-ready overlays',
        text: 'Camera and interior ESP live on Rob Run Cheat tiers—check status, then get access.',
        href: '/go/robrun/',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ROB RUN No Recoil, No Spread & No Sway Explained',
    slug: 'recoil',
    seoTitle: 'ROB RUN No Recoil No Spread No Sway',
    image: '/images/blog/menu-weapon.webp',
    imageAlt: 'ROB RUN cheat weapon settings panel with skin changer toggles over desert ESP boxes on vehicles',
    desc: 'What No Recoil, No Spread and No Sway change on ROB RUN weapons—and what they are not (ammo, damage, spawning).',
    date: 'Nov 11, 2026',
    readTime: '6 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'Three listed weapon-handling helpers are No Recoil, No Spread and No Sway. They target the corresponding supported weapon behaviors so sprays and scoped shots stay controllable.',
      },
      {
        type: 'p',
        text: 'They are not unlimited ammo, damage multipliers, instant kills or weapon spawning. Keep expectations tied to the live menu—not viral “god gun” clips.',
      },
      { type: 'h2', text: 'Sensible tuning' },
      {
        type: 'ul',
        items: [
          'Enable one helper at a time in Free Roam before Open World',
          'Match profiles to pistols vs rifles instead of one global nuke',
          'Leave a soft residual recoil so your spray still looks human on death cams',
          'Re-check after patches—weapon tables change in Early Access',
        ],
      },
      {
        type: 'cta',
        title: 'Get weapon helpers',
        text: 'Weapon profiles ship with combat tiers—secure checkout on robruncheat.net.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Also: [aimbot bones](/blog/bones/) · [aimbot FOV](/blog/fov/) · [config tips](/blog/settings/).',
      },
    ],
  },
  {
    tag: 'Features',
    title: 'ROB RUN Target Filters: Police, Robbers, Civilians & NPCs',
    slug: 'roles',
    seoTitle: 'ROB RUN Target Filters | Police Robbers NPCs',
    image: '/images/blog/esp-police.webp',
    imageAlt: 'ROB RUN ESP boxes on a police SUV and skeleton overlay on a nearby cop beside a ROB RUN hatchback',
    desc: 'Role filters for Police, Robbers, Civilians and NPCs—plus Ignore Dead, Knocked and In Vehicle options.',
    date: 'Nov 11, 2026',
    readTime: '6 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN mixes roles. Soft aim and ESP work better when filters limit eligible targets to Police, Robbers, Civilians or NPCs—and when Ignore Dead, Ignore Knocked and Ignore In Vehicle cut noise.',
      },
      {
        type: 'p',
        text: 'Filters restrict who the assist or overlay considers. They do not prove every NPC or player is always tracked. After each patch, re-test one filter set in Free Roam.',
      },
      { type: 'h2', text: 'Suggested presets' },
      {
        type: 'table',
        headers: ['Preset', 'Enable', 'Disable'],
        rows: [
          ['Heist push', 'Robbers, Police', 'Civilians clutter'],
          ['Quiet loot run', 'NPCs as needed', 'Aggressive aim filters'],
          ['Street PvP', 'Robbers / players', 'Dead and knocked'],
        ],
      },
      {
        type: 'cta',
        title: 'Tune aim + ESP filters',
        text: 'Role filters ship with Pro/Elite combat suites—compare tiers then get access.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Deep dives: [aimbot](/blog/aimbot/) · [player ESP](/blog/esp/) · [bones](/blog/bones/).',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'ROB RUN Money Glitch: Is Unlimited Cash Available?',
    slug: 'money',
    seoTitle: 'ROB RUN Money Glitch | Unlimited Cash Truth',
    image: '/images/blog/esp-items.webp',
    imageAlt: 'ROB RUN item ESP highlighting phones, cigars and cash registers behind hedges near a parked hatchback',
    desc: 'ROB RUN money glitch and infinite cash searches explained—why unlimited money is unverified and what Rob Run Cheat actually lists.',
    date: 'Nov 11, 2026',
    readTime: '11 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN money glitch, infinite money and cash glitch are high-volume searches. They usually point at bug videos, cheat tables or economy rumors—not a maintained product feature on robruncheat.net.',
      },
      {
        type: 'p',
        text: 'No current working unlimited-money method is verified for this site. Rob Run Cheat listings do not advertise cash generation, money editing or multipliers. Early Access balance patches invalidate old clips fast.',
      },
      { type: 'h2', text: 'Why money-glitch clips go stale' },
      {
        type: 'p',
        text: 'ROB RUN entered Steam Early Access with frequent economy and anti-cheat tweaks. A method filmed last week can fail after a single server-side patch even if the client looks identical. Clips rarely show the build number, EAC revision or whether the session was offline Free Roam versus online Open World.',
      },
      {
        type: 'ul',
        items: [
          'Client-only edits often desync and get rolled back on reconnect',
          'Shared “tables” are common malware droppers for Steam credentials',
          'Public Discord pastebins reuse the same hash long after it was burned',
        ],
      },
      { type: 'h2', text: 'What Rob Run Cheat actually lists' },
      {
        type: 'p',
        text: 'Combat and awareness modules help you finish heists and street fights more consistently. They do not print currency. If a seller promises infinite cash as a toggle, treat that claim as unverified marketing—not something we ship.',
      },
      {
        type: 'table',
        headers: ['Search phrase', 'Usually means', 'Supported here'],
        rows: [
          ['Money glitch / infinite cash', 'Economy exploit or editor', 'No'],
          ['Loot ESP', 'See world items through walls', 'Yes — [loot](/blog/loot/)'],
          ['Radar / vehicle ESP', 'Route and chase reads', 'Yes — [radar](/blog/radar/), [vehicles](/blog/vehicles/)'],
          ['Free money EXE', 'Unsigned download', 'Avoid — see [free](/blog/free/)'],
        ],
      },
      { type: 'h2', text: 'Free Roam checklist before you chase a “glitch”' },
      {
        type: 'ul',
        items: [
          'Note the ROB RUN build and check the live status banner on robruncheat.net',
          'Reproduce the claim in Free Roam first—never on a fresh paid account',
          'If cash only appears locally until reconnect, it is not a stable economy exploit',
          'Prefer [loot ESP](/blog/loot/) routes over random memory editors',
          'Keep one named config so you can roll back overlays after testing',
        ],
      },
      { type: 'h2', text: 'What actually helps farming' },
      {
        type: 'ul',
        items: [
          '[Loot ESP](/blog/loot/) to find supported weapons and equipment faster',
          '[Radar](/blog/radar/) and [vehicle ESP](/blog/vehicles/) for safer routes',
          '[Camera ESP](/blog/cameras/) so you do not walk into hot alarm states',
          'Combat tiers for PvP risk—not printing currency',
        ],
      },
      { type: 'h2', text: 'Free Roam money-claim drill (write it down)' },
      {
        type: 'p',
        text: 'Spend ten minutes in Free Roam with a notepad—not a main Open World character. For each claim you test: (1) screenshot the starting cash, (2) run the alleged steps once, (3) screenshot the ending cash, (4) fully exit to desktop and relaunch ROB RUN, (5) check whether the balance survived. If step 5 fails, stop. That is a client desync or a temporary UI glitch, not a durable money method worth risking a ban over.',
      },
      {
        type: 'ul',
        items: [
          'Never paste unknown console strings from TikTok comments into a live session',
          'Never download “cash menus” that ask you to turn off Windows Defender first',
          'If a seller demands remote desktop access “to enable money,” that is social engineering',
        ],
      },
      {
        type: 'p',
        text: 'Treat random “free money” executables as malware risks. Prefer portal delivery after checkout and keep the live status banner in mind. Editorial process and named editors: [About](/about/).',
      },
      {
        type: 'cta',
        title: 'Shop real ROB RUN tools',
        text: 'Compare ESP and combat tiers on robruncheat.net—no fake money editors.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Related myths: [dupe glitch](/blog/dupe/) · [free cheats](/blog/free/). Primary shop URL: [Elite](/products/robrun-cheat/elite/).',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'ROB RUN Dupe Glitch: Duplication Claims vs Reality',
    slug: 'dupe',
    seoTitle: 'ROB RUN Dupe Glitch | Duplication Explained',
    image: '/images/blog/esp-jewelry.webp',
    imageAlt: 'ROB RUN NPC skeleton ESP and jewelry loot tags through a glass storefront with distance readouts',
    desc: 'ROB RUN dupe and duplication glitch searches—why clips go stale and why loot ESP is not item copying.',
    date: 'Nov 11, 2026',
    readTime: '10 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN dupe, dupe glitch and duplication glitch usually mean unexpected item copying. A video or forum post does not prove a method still works after the next Steam build.',
      },
      {
        type: 'p',
        text: 'Rob Run Cheat does not advertise duplication. [Loot ESP](/blog/loot/) can display supported items; information overlays are not the same as making extra copies.',
      },
      { type: 'h2', text: 'Glitch vs exploit vs third-party software' },
      {
        type: 'ul',
        items: [
          'Glitch — unexpected game behavior that may be patched without notice',
          'Exploit — intentional abuse of a weakness, often banned when detected',
          'Third-party cheat — separate software that adds overlays or aim assists',
        ],
      },
      {
        type: 'p',
        text: 'Our catalog is third-party software for awareness and combat assists—not a promise of stable economy exploits. Mixing categories is how shoppers buy the wrong SKU.',
      },
      { type: 'h2', text: 'How to evaluate a “working dupe” claim' },
      {
        type: 'ul',
        items: [
          'Confirm whether items survive a full relog and a server hop',
          'Check whether only you see the copy or other players do too',
          'Record the ROB RUN build date before and after the alleged steps',
          'Never run unsigned “dupe tools” that ask for Steam credentials',
        ],
      },
      { type: 'h2', text: 'Free Roam duplication drill (documentation only)' },
      {
        type: 'p',
        text: 'Use Free Roam to document claims—not to farm online inventories. Write one sentence for each step you tried, whether the item persisted after reconnect, and whether the status banner was Undetected. If the copy vanishes on reconnect, it was a local desync, not a durable dupe.',
      },
      {
        type: 'table',
        headers: ['Observation', 'Likely meaning', 'Next step'],
        rows: [
          ['Item only on your client', 'Desync / local preview', 'Stop; do not risk main account'],
          ['Item gone after patch', 'Hotfix closed the hole', 'Archive the clip; do not chase'],
          ['Seller sells “dupe menu”', 'Unsigned third-party risk', 'Read [free](/blog/free/)'],
          ['Need better loot reads', 'Awareness tooling', 'Use [loot ESP](/blog/loot/)'],
        ],
      },
      { type: 'h2', text: 'Free Roam duplication notebook' },
      {
        type: 'ul',
        items: [
          'Start Free Roam with a junk loadout you can afford to lose',
          'Photograph inventory before and after the alleged dupe steps',
          'Force a full game restart, then check whether the copy remains',
          'If only your client shows the item, log the result as desync and stop',
          'Cross-link your notes to the ROB RUN build date and status banner label',
        ],
      },
      {
        type: 'p',
        text: 'Loot ESP helps you find items; it does not mint extras. Keep that distinction clear when a clip labels ESP as a “dupe.” Corrections and editorial contacts: [About](/about/).',
      },
      {
        type: 'cta',
        title: 'See supported features',
        text: 'Read the features map on robruncheat.net, then checkout for overlay and aim suites.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Also: [money glitch](/blog/money/) · [free downloads](/blog/free/) · [About / corrections](/about/).',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'ROB RUN Free Cheats: Why Paid Access Beats Random Downloads',
    slug: 'free',
    seoTitle: 'ROB RUN Free Cheats | Download Risks',
    image: '/images/blog/esp-pharmacy.webp',
    imageAlt: 'ROB RUN wallhack boxes and pharmacy, phone and cash register loot tags through a patio storefront',
    desc: 'ROB RUN free cheats and hack download searches—malware risk, fake “undetected” files and how portal access works.',
    date: 'Nov 11, 2026',
    readTime: '10 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'Players search ROB RUN cheats free, free cheats and hack download because the game is free to play. Paid access and free game are different things. Rob Run Cheat sells licenses delivered through a portal on robruncheat.net—not anonymous EXE packs.',
      },
      {
        type: 'p',
        text: 'Unknown downloads can contain malware or steal Steam sessions. The words free and undetected in a filename do not prove a tool works, is safe or matches our live status.',
      },
      { type: 'h2', text: 'Red flags in “free cheat” packs' },
      {
        type: 'ul',
        items: [
          'Password-protected archives with no publisher identity',
          'Requests for Steam username/password or email codes',
          '“Disable antivirus” as step one of the install guide',
          'Mirrors hosted on random file lockers with changing domains',
        ],
      },
      { type: 'h2', text: 'Safer path on robruncheat.net' },
      {
        type: 'ul',
        items: [
          'Confirm Undetected on the site banner after patches',
          'Buy only via Get access → partner checkout → portal loader',
          'Skip Discord DM “free keys” and random forum mirrors',
          'Read [are Rob Run cheats safe?](/blog/are-robrun-cheats-safe/) before first launch',
          'Use [Steam PC notes](/blog/steam/) for Windows / Borderless requirements',
        ],
      },
      { type: 'h2', text: 'What you should download instead' },
      {
        type: 'p',
        text: 'After checkout, only run files from your operator portal. That keeps the loader tied to the license you paid for and to the build that matches the status banner. We do not distribute loaders through public Google Drive folders.',
      },
      {
        type: 'table',
        headers: ['Source', 'Trust', 'Notes'],
        rows: [
          ['Portal after checkout', 'Intended path', 'Matches live status'],
          ['Official Discord ticket links', 'Support only', 'Never pay in DMs'],
          ['Random “UC” mirrors', 'High risk', 'Not affiliated'],
          ['Email attachments', 'Reject', 'Common malware vector'],
        ],
      },
      { type: 'h2', text: 'Free Roam hygiene before any first launch' },
      {
        type: 'ul',
        items: [
          'Create or use a throwaway Steam account for experiments—never your primary banked account',
          'Confirm Windows Defender or your AV is not disabled “because the free pack said so”',
          'Launch ROB RUN once clean (no third-party tools) to confirm EAC initializes',
          'Only after checkout, start the portal loader, then ROB RUN, then a short Free Roam session',
          'If anything looks off, stop and read [are Rob Run cheats safe?](/blog/are-robrun-cheats-safe/)',
        ],
      },
      {
        type: 'p',
        text: 'Paid access is not a ban guarantee—it is a delivery channel with status pauses and support tickets. Named editors and corrections: [About](/about/).',
      },
      {
        type: 'cta',
        title: 'Get portal access',
        text: 'Licensed loader delivery after checkout on robruncheat.net—no random free EXE.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Myths nearby: [money](/blog/money/) · [dupe](/blog/dupe/). Editorial standards: [About](/about/).',
      },
    ],
  },
  {
    tag: 'Guides',
    title: 'ROB RUN Cheats on Steam PC: Windows, Display Modes & EAC',
    slug: 'steam',
    seoTitle: 'ROB RUN Cheats Steam PC | Windows EAC',
    image: '/images/blog/menu-visuals.webp',
    imageAlt: 'ROB RUN cheat menu open on Visuals with player ESP toggles and a live desert street behind the overlay',
    desc: 'Steam PC compatibility for Rob Run Cheat—Windows 10/11, Borderless/Windowed, Early Access patches and Easy Anti-Cheat checks.',
    date: 'Nov 11, 2026',
    readTime: '7 min read',
    author: 'Rob Run Cheat Editorial',
    body: [
      {
        type: 'p',
        text: 'ROB RUN entered Steam Early Access on November 4, 2026—open-world travel, robbery, PvP/PvE, police pursuit and resource play. Rob Run Cheat targets the Steam PC client on Windows 10 and Windows 11.',
      },
      {
        type: 'p',
        text: 'Supported setups commonly include Intel and AMD CPUs, an external configuration, Borderless or Windowed display modes, and English/Chinese menus depending on build. Always re-check live status after game updates instead of assuming last week’s loader still applies.',
      },
      { type: 'h2', text: 'Before you buy' },
      {
        type: 'ul',
        items: [
          'Confirm Windows 10/11 and Steam launch path',
          'Prefer Borderless/Windowed if the guide asks for it',
          'Read [EAC errors](/blog/eac-error/) before assuming a ban',
          'Use [HWID Spoofer](/products/robrun-cheat/hwid-spoofer/) only for confirmed hardware flags',
        ],
      },
      {
        type: 'cta',
        title: 'Shop Steam PC access',
        text: 'Compare Lite, Pro and Elite for Windows Steam—then get access.',
        href: '/go/robrun/',
      },
      {
        type: 'p',
        text: 'Next: [buy guide](/blog/buy-guide/) · [patch day](/blog/patch-day/) · [anti-cheat notes](/blog/robrun-anti-cheat-undetected/).',
      },
    ],
  },
];
