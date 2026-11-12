/**
 * Unique titles/descriptions per route — aligned to high-intent Rob Run cheat SERPs.
 * Titles ~50–60 chars; descriptions ~140–155 chars.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Undetected Rob Run Cheats | ESP Soft Aim & Spoofer',
    description:
      'Buy undetected Rob Run cheats: ESP, soft aim and spoofer for Open World and Heists—stream-proof overlays on Steam PC. Shop Elite, HWID Spoofer and UGC.',
  },
  '/products/robrun-cheat/': {
    title: 'Buy Rob Run Cheats | Elite HWID Spoofer & UGC Hub',
    description:
      'Shop Rob Run cheats, HWID Spoofer and UGC recovery for Steam PC—three products with module lists, buy guides and secure checkout.',
  },
  '/products/robrun-cheat/elite/': {
    title: 'Buy ROB RUN Elite Cheats | Full Undetected Ranked',
    description:
      'Buy undetected Rob Run Elite cheats: ESP, soft aim, loot farm helpers, skin unlock and priority patch updates for Open World and Heists.',
  },
  '/products/robrun-cheat/hwid-spoofer/': {
    title: 'Buy ROB RUN HWID Spoofer | Reset Hardware Ban IDs',
    description:
      'Buy a ROB RUN HWID spoofer to rotate disk, MAC and GPU IDs after Easy Anti-Cheat flags your hardware. Portal setup and Discord support included.',
  },
  '/products/robrun-cheat/ugc/': {
    title: 'Buy ROB RUN UGC Unban Tools | Steam Account Recovery',
    description:
      'Buy ROB RUN UGC unban tools for Steam holds, bans and restrictions—document cases, track status and rebuild access with structured appeals.',
  },
  '/products/robrun-cheat/utilities/': {
    title: 'Buy Rob Run Cheat Utilities | HWID Spoofer & UGC Hub',
    description:
      'Buy Rob Run cheat utilities—compare HWID Spoofer vs UGC recovery use cases, feature lists and product pages. Skin unlock ships with Elite.',
  },
  '/blog/': {
    title: 'Rob Run Cheat Guides | Buy Undetected ESP Soft Aim',
    description:
      'Read Rob Run cheat buy guides—undetected ESP, soft aim, FOV, HWID recovery after bans, and loader setup notes for Windows Steam.',
  },
  '/forum/': {
    title: 'Rob Run Cheats Forum | ESP Soft Aim & Spoofer Q&A',
    description:
      'Rob Run cheats buyer forum: undetected ESP and soft aim setup Q&A—overlay tuning, HWID tools, patch readiness and tier picks before checkout.',
  },
  '/reviews/': {
    title: 'Rob Run Cheat Reviews | Verified Buyer Ratings 2026',
    description:
      'Buyer reviews for ROB RUN Elite, HWID Spoofer and UGC—ratings and notes from customers after checkout on robruncheat.net.',
  },
  '/faq/': {
    title: 'Rob Run Cheats FAQ | Setup Ban Risk Before You Buy',
    description:
      'Rob Run cheats FAQ before you buy: Windows, Steam setup, Elite modules, ban risk, checkout delivery and HWID resets.',
  },
  '/terms/': {
    title: 'Rob Run Cheat Terms of Sale | License Refund Rules',
    description:
      'Legal terms for purchasing Rob Run cheat licenses on robruncheat.net—delivery, personal-use limits, refunds, ban risk and acceptable use.',
  },
  '/about/': {
    title: 'About Rob Run Cheat | Undetected Store and Support',
    description:
      'About Rob Run Cheat: buy undetected Rob Run tools for Open World and Heists—tiers, utilities, patch-day loader updates and Discord support.',
  },
  '/support/': {
    title: 'Rob Run Cheats Support | Loader HWID Checkout Help',
    description:
      'Rob Run cheats Discord support for loader errors, HWID Spoofer setup and checkout help. Open a ticket with your order ID, issue type and screenshots.',
  },
  '/privacy/': {
    title: 'Rob Run Cheat Privacy Policy | Cookies & Data Use',
    description:
      'Privacy policy for robruncheat.net—cookies, analytics, Discord ticket data, checkout partners, retention and your rights when browsing or purchasing.',
  },
  '/compare/': {
    title: 'Compare Rob Run Cheats | Spoofer Setup & Utilities',
    description:
      'Compare ROB RUN Elite cheats vs HWID and UGC, ban recovery paths, and safe setup—plus the primary URL map for each search intent.',
  },
  '/compare/hwid-vs-new-account/': {
    title: 'HWID Spoofer vs New Account | ROB RUN Ban Recovery',
    description:
      'Choose HWID Spoofer or a new Steam account after a ROB RUN hardware ban—checklist before you buy recovery tools on Steam PC.',
  },
  '/compare/cheats-vs-utilities/': {
    title: 'Rob Run Cheats vs HWID Spoofer & UGC Utility Tools',
    description:
      'Compare ROB RUN Elite cheats with HWID Spoofer and UGC recovery so you buy combat modules or ban utilities—not both by mistake.',
  },
  '/compare/safe-setup-checklist/': {
    title: 'Safe Rob Run Cheat Setup Checklist | Heist Prep PC',
    description:
      'Pre-heist checklist for Rob Run cheats: status board, Free Roam, conservative presets, stream-proof tests and patch-day steps.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
