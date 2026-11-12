import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/** Affiliate checkout destinations. */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  robrun: 'robrun',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** On-site /go/* path for visible “Get access” / buy CTAs (302 to affiliate via middleware). */
export function checkoutPath(product: CheckoutProduct = 'robrun'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Alias — same as checkoutPath (kept for call sites that want the redirect name). */
export function checkoutRedirectPath(product: CheckoutProduct = 'robrun'): string {
  return checkoutPath(product);
}

/** External affiliate URL (302 target for /go/*). */
export function checkoutExternalUrl(product: CheckoutProduct = 'robrun'): string {
  return CHECKOUT[product];
}

/** Default product checkout hop (on-site /go/robrun/). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('robrun');

/** Map internal product slugs to on-site checkout hops. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'unlock-all':
      return checkoutPath('skinChanger');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'lite':
    case 'pro':
    case 'elite':
    default:
      return checkoutPath('robrun');
  }
}

/** Resolve blog CTA or legacy href values to on-site /go/* hops (never expose affiliate host in HTML). */
export function resolveCheckoutHref(href: string): string {
  const normalized = href.startsWith('/') ? href : `/${href}`;
  const goMatch = normalized.match(/^\/go\/([^/]+)\/?$/);
  if (goMatch) {
    const product = CHECKOUT_SLUG_TO_PRODUCT[goMatch[1]];
    if (product) return checkoutPath(product);
  }

  if (!href.startsWith('http')) {
    return normalized;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}&`) || href.startsWith(`${url}?`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return checkoutPath('skinChanger');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (href.includes('%2Fproducts%2Frobrun') || href.includes('/products/robrun')) {
    return checkoutPath('robrun');
  }

  return href;
}
