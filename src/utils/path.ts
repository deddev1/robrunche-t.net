import { PRODUCT_BASE } from '../config/site';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

/** Former /cheats/* URLs → current routes (must match PATH_REDIRECTS targets). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': `${PRODUCT_BASE}elite/`,
  '/cheats/lite/': `${PRODUCT_BASE}elite/`,
  '/cheats/pro': `${PRODUCT_BASE}elite/`,
  '/cheats/pro/': `${PRODUCT_BASE}elite/`,
  '/cheats/elite': `${PRODUCT_BASE}elite/`,
  '/cheats/elite/': `${PRODUCT_BASE}elite/`,
  '/cheats/compare': '/blog/lite-vs-pro/',
  '/cheats/compare/': '/blog/lite-vs-pro/',
  '/contact': '/support/',
  '/contact/': '/support/',
  '/blog/valve-error': '/blog/eac-error/',
  '/blog/valve-error/': '/blog/eac-error/',
  [`${PRODUCT_BASE}lite`]: `${PRODUCT_BASE}elite/`,
  [`${PRODUCT_BASE}lite/`]: `${PRODUCT_BASE}elite/`,
  [`${PRODUCT_BASE}pro`]: `${PRODUCT_BASE}elite/`,
  [`${PRODUCT_BASE}pro/`]: `${PRODUCT_BASE}elite/`,
  [`${PRODUCT_BASE}unlock-all`]: `${PRODUCT_BASE}utilities/`,
  [`${PRODUCT_BASE}unlock-all/`]: `${PRODUCT_BASE}utilities/`,
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  blog: '/blog/',
  forum: '/forum/',
  reviews: '/reviews/',
  compare: '/compare/',
  products: PRODUCT_BASE,
  productsElite: `${PRODUCT_BASE}elite/`,
  productsUtilities: `${PRODUCT_BASE}utilities/`,
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: '/support/',
  privacy: '/privacy/',
} as const;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

/** @deprecated Use productPath — cheat tier pages live under products. */
export function cheatPath(slug: string): string {
  return productPath(slug);
}

export function productPath(slug: string): string {
  return `${PRODUCT_BASE}${slug}/`;
}
