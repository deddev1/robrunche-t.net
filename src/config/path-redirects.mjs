/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/robrun-cheat/'],
  ['/cheats/', '/products/robrun-cheat/'],
  ['/cheats/lite', '/products/robrun-cheat/elite/'],
  ['/cheats/lite/', '/products/robrun-cheat/elite/'],
  ['/cheats/pro', '/products/robrun-cheat/elite/'],
  ['/cheats/pro/', '/products/robrun-cheat/elite/'],
  ['/cheats/elite', '/products/robrun-cheat/elite/'],
  ['/cheats/elite/', '/products/robrun-cheat/elite/'],
  // Legacy Lite / Pro / Unlock All detail URLs → catalog primaries (avoid thin duplicate product URLs)
  ['/products/robrun-cheat/lite', '/products/robrun-cheat/elite/'],
  ['/products/robrun-cheat/lite/', '/products/robrun-cheat/elite/'],
  ['/products/robrun-cheat/pro', '/products/robrun-cheat/elite/'],
  ['/products/robrun-cheat/pro/', '/products/robrun-cheat/elite/'],
  ['/products/robrun-cheat/unlock-all', '/products/robrun-cheat/utilities/'],
  ['/products/robrun-cheat/unlock-all/', '/products/robrun-cheat/utilities/'],
  ['/cheats/compare', '/blog/lite-vs-pro/'],
  ['/cheats/compare/', '/blog/lite-vs-pro/'],
  // Short blog slugs — keep old URLs working
  ['/blog/robrun-map-hack-setup', '/blog/esp/'],
  ['/blog/robrun-map-hack-setup/', '/blog/esp/'],
  ['/blog/robrun-zoom-hack-guide', '/blog/fov/'],
  ['/blog/robrun-zoom-hack-guide/', '/blog/fov/'],
  ['/blog/robrun-skin-changer-guide', '/blog/skins/'],
  ['/blog/robrun-skin-changer-guide/', '/blog/skins/'],
  ['/blog/eac-patch-day-checklist', '/blog/patch-day/'],
  ['/blog/eac-patch-day-checklist/', '/blog/patch-day/'],
  ['/blog/eac-patch', '/blog/patch-day/'],
  ['/blog/eac-patch/', '/blog/patch-day/'],
  // (do not redirect active forumPosts slugs — that baked duplicate "Redirecting to…" titles).
  ['/forum/how-to-set-up-esp-overlay', '/blog/esp/'],
  ['/forum/how-to-set-up-esp-overlay/', '/blog/esp/'],
  ['/forum/what-fov-settings-are-comfortable', '/blog/fov/'],
  ['/forum/what-fov-settings-are-comfortable/', '/blog/fov/'],
  ['/forum/how-to-tune-aimbot-smoothing', '/blog/aimbot/'],
  ['/forum/how-to-tune-aimbot-smoothing/', '/blog/aimbot/'],
  ['/forum/how-to-practice-recoil-profiles', '/blog/bones/'],
  ['/forum/how-to-practice-recoil-profiles/', '/blog/bones/'],
  ['/forum/recoil-drill', '/blog/bones/'],
  ['/forum/recoil-drill/', '/blog/bones/'],
  // Space-slug typo → hyphenated forum thread
  // Literal-space keys for Node (decoded pathnames). write-redirects encodes spaces to %20 for CF.
  ['/forum/shot timing-drill', '/forum/shot-timing-drill/'],
  ['/forum/shot timing-drill/', '/forum/shot-timing-drill/'],
  ['/forum/shot%20timing-drill', '/forum/shot-timing-drill/'],
  ['/forum/shot%20timing-drill/', '/forum/shot-timing-drill/'],
  ['/forum/what-is-in-the-elite-tier', '/blog/elite/'],
  ['/forum/what-is-in-the-elite-tier/', '/blog/elite/'],
  ['/forum/how-do-lite-and-pro-differ', '/blog/lite-vs-pro/'],
  ['/forum/how-do-lite-and-pro-differ/', '/blog/lite-vs-pro/'],
  ['/forum/what-to-know-about-skin-changer', '/blog/skins/'],
  ['/forum/what-to-know-about-skin-changer/', '/blog/skins/'],
  ['/forum/how-does-an-external-loader-work', '/blog/external/'],
  ['/forum/how-does-an-external-loader-work/', '/blog/external/'],
  ['/forum/how-to-check-stream-proof-capture', '/blog/stream-proof/'],
  ['/forum/how-to-check-stream-proof-capture/', '/blog/stream-proof/'],
  ['/forum/what-to-do-after-hwid-change', '/blog/hwid/'],
  ['/forum/what-to-do-after-hwid-change/', '/blog/hwid/'],
  ['/forum/what-to-check-before-installing-tools', '/blog/features/'],
  ['/forum/what-to-check-before-installing-tools/', '/blog/features/'],
  ['/forum/can-admin-commands-be-used-on-official-servers', '/blog/cheat-codes/'],
  ['/forum/can-admin-commands-be-used-on-official-servers/', '/blog/cheat-codes/'],
  ['/forum/how-to-learn-spray-control-on-a-private-server', '/blog/cheat-codes/'],
  ['/forum/how-to-learn-spray-control-on-a-private-server/', '/blog/cheat-codes/'],
  ['/forum/what-to-check-after-an-eac-patch', '/blog/patch-day/'],
  ['/forum/what-to-check-after-an-eac-patch/', '/blog/patch-day/'],
  ['/products/robrun-cheat/utilities', '/products/robrun-cheat/utilities/'],
  ['/products/robrun-cheat', '/products/robrun-cheat/'],
  ['/products/robrun-cheat/account-recovery', '/products/robrun-cheat/ugc/'],
  ['/products/robrun-cheat/account-recovery/', '/products/robrun-cheat/ugc/'],
  ['/products/robrun-cheat/elite', '/products/robrun-cheat/elite/'],


  // /forum/eac-init/ is the live thread (see valve-init → eac-init below)
  ['/forum/f1-console', '/forum/practice-console/'],
  ['/forum/f1-console/', '/forum/practice-console/'],
  ['/forum/spray-safe', '/forum/aim-drill-safe/'],
  ['/forum/spray-safe/', '/forum/aim-drill-safe/'],
  ['/forum/spray-server', '/forum/aim-drill-host/'],
  ['/forum/spray-server/', '/forum/aim-drill-host/'],

  ['/blog/ea-patch', '/blog/patch-day/'],
  ['/blog/ea-patch/', '/blog/patch-day/'],

  ['/blog/gaijin-patch', '/blog/patch-day/'],
  ['/blog/gaijin-patch/', '/blog/patch-day/'],

  // Dead slug → live EAC errors guide
  ['/blog/valve-error', '/blog/eac-error/'],
  ['/blog/valve-error/', '/blog/eac-error/'],

  // Forum slug rename (Valve leftover → EAC)
  ['/forum/valve-init', '/forum/eac-init/'],
  ['/forum/valve-init/', '/forum/eac-init/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct && direct !== pathname) return direct;

  // Unsashed → prefer an explicit slash-form redirect target, else add `/`.
  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    const withSlash = `${pathname}/`;
    const fromSlash = PATH_REDIRECTS.get(withSlash);
    if (fromSlash && fromSlash !== withSlash) return fromSlash;
    return withSlash;
  }

  return null;
}
