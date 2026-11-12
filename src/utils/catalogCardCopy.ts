/** Short labels for compact product cards (full SEO titles stay on detail pages). */
export function catalogCardTitle(slug: string, fallback: string): string {
  switch (slug) {
    case 'elite':
      return 'Rob Run Cheats';
    case 'hwid-spoofer':
      return 'HWID Spoofer';
    case 'ugc':
      return 'UGC Recovery';
    case 'lite':
      return 'Lite';
    case 'pro':
      return 'Pro';
    case 'unlock-all':
      return 'Skin Unlock';
    default:
      return fallback;
  }
}

export function catalogCardEyebrow(slug: string, fallback?: string): string {
  switch (slug) {
    case 'elite':
      return 'Cheats';
    case 'hwid-spoofer':
      return 'System utility';
    case 'ugc':
      return 'Account recovery';
    case 'lite':
      return 'Awareness';
    case 'pro':
      return 'Aim assist';
    case 'unlock-all':
      return 'Cosmetic';
    default:
      return fallback ?? 'Product';
  }
}

export function catalogCardDesc(slug: string, fallback: string): string {
  switch (slug) {
    case 'elite':
      return 'ESP, soft aim, radar and Open World helpers in one suite.';
    case 'hwid-spoofer':
      return 'Rotate hardware IDs after a Easy Anti-Cheat flag.';
    case 'ugc':
      return 'Structured appeals for Steam holds and account bans.';
    case 'lite':
      return 'Player ESP, radar and FOV without aim assist.';
    case 'pro':
      return 'Soft aim and profiles on top of every Lite module.';
    case 'unlock-all':
      return 'Local skin and cosmetic preview on your client.';
    default:
      return fallback;
  }
}

export function catalogBuyLabel(slug: string): string {
  switch (slug) {
    case 'elite':
      return 'Get access';
    case 'hwid-spoofer':
      return 'Get HWID';
    case 'ugc':
      return 'Get UGC';
    case 'lite':
      return 'Get Lite';
    case 'pro':
      return 'Get Pro';
    default:
      return 'Get access';
  }
}
