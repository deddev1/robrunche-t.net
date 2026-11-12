import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { resolvePathRedirect, TRAILING_SLASH_SKIP } from './config/path-redirects.mjs';

/** Same 301/302 map as Node serve.mjs and public/_redirects (Cloudflare). */
export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  const checkout = resolveCheckoutPathRedirect(pathname);
  if (checkout) {
    return context.redirect(checkout, 302);
  }

  const pathRedirect = resolvePathRedirect(pathname);
  if (pathRedirect && pathRedirect !== pathname) {
    return context.redirect(`${pathRedirect}${url.search}${url.hash}`, 301);
  }

  // Canonicalize HTML paths to trailing slash (keeps sitemap/canonicals consistent).
  if (
    pathname !== '/' &&
    !pathname.endsWith('/') &&
    !TRAILING_SLASH_SKIP.test(pathname)
  ) {
    return context.redirect(`${pathname}/${url.search}${url.hash}`, 301);
  }

  return next();
});
