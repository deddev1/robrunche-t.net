# FULL SEO AUDIT — robruncheat.net

**Date:** 2026-11-11  
**Scope:** Full-site (built `dist/` + `public/` crawl assets; localhost blocked by skill SSRF; production DNS unresolved)  
**Business type:** Affiliate / digital product storefront (Rob Run cheat tools)  
**Method:** Agentic SEO Skill rubric + offline HTML scan of 78 pages + sitemap/robots/llms/_headers  
**Score confidence:** Medium (no live PageSpeed/CrUX; production host not resolving)

---

## A) Audit Summary

### Overall SEO Health Score: **84 / 100 — Good**

| Category | Score | Weight | Weighted |
|----------|------:|-------:|---------:|
| Technical SEO | 88 | 25% | 22.0 |
| Content Quality | 80 | 20% | 16.0 |
| On-Page SEO | 90 | 15% | 13.5 |
| Schema / Structured Data | 88 | 15% | 13.2 |
| Performance (CWV) | 68 | 10% | 6.8 |
| Image Optimization | 86 | 10% | 8.6 |
| AI Search Readiness (GEO) | 90 | 5% | 4.5 |
| **Total** | | | **84.6 → 84** |

### Top 3 issues
1. **Production DNS / HTTPS not live** — `robruncheat.net` does not resolve; indexing & CWV cannot be confirmed in the wild.  
2. **Heavy HTML payloads** — homepage ~235 KB HTML; `/blog/` ~314 KB (SSR weight before assets).  
3. **Intent overlap still in sitemap** — multiple safe/ESP/aim posts remain indexable alongside primary intent URLs.

### Top 3 opportunities
1. Point DNS + HTTPS, then re-run PageSpeed + Search Console.  
2. Trim homepage hero/blog SSR or defer non-critical blocks for LCP.  
3. Demote or consolidate secondary synonym posts (safe / ESP / silent-aim clusters).

---

## B) Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Technical | Critical* | Confirmed | Apex domain does not resolve | `Invoke-WebRequest https://robruncheat.net` → name not resolved | Point DNS + TLS, then submit sitemap |
| Technical | Pass | Confirmed | robots.txt + sitemap present & aligned | `robots.txt` Disallow `/go/`,`/forum/`; sitemap **57** URLs; no forum/go/lite/pro product URLs | Keep as-is after deploy |
| Technical | Pass | Confirmed | Canonicals / OG / Twitter on all scanned pages | Scan: 78/78 canonical, OG, Twitter | — |
| Technical | Pass | Confirmed | Security headers prepared for CF | `_headers`: HSTS, XCTO, Referrer-Policy, XFO, Permissions-Policy | Confirm active on CDN after DNS |
| Technical | Info | Confirmed | No CSP header | `_headers` lacks Content-Security-Policy | Optional CSP after inventory of scripts |
| On-Page | Warning | Confirmed | Homepage meta description 162 chars | `/` desc_len=162 (target ≤155–160) | Trim 5–10 chars |
| On-Page | Pass | Confirmed | Titles unique; avg ~51 chars; single H1 | 0 duplicate titles; 0 multi-H1 issues in scan | — |
| Content | Warning | Likely | Keyword cannibalization clusters remain | Sitemap still lists synonym posts for safe/ESP/aim intents | Keep primary URLs; thin or noindex secondaries over time |
| Content | Pass | Confirmed | Money pages / About E-E-A-T present | Expanded myth guides; About editorial + status verification | Maintain Last verified dates |
| Schema | Pass | Confirmed | Product + on-domain Offer | Elite JSON-LD Offer.url = `https://robruncheat.net/products/.../elite/` | — |
| Schema | Pass | Confirmed | BlogPosting ×40, BreadcrumbList ×77 | site-seo-scan.json schema_types | — |
| Schema | Info | Likely | AggregateRating on Product | ratingValue 4.7 / reviewCount 19 on Elite | Ensure reviews page visibly supports counts |
| Performance | Warning | Confirmed | Large HTML documents | Home 234,727 B; blog index 313,628 B | Cap SSR lists; lazy below-fold modules |
| Performance | Unknown | — | LCP / INP / CLS | PageSpeed blocked (no public host) | Run PSI after DNS |
| Images | Pass | Confirmed | No missing `alt` in dist scan | issue_kinds had 0 img-alt failures; hero/blog webp | — |
| GEO / AI | Pass | Confirmed | Strong `llms.txt` + AI bot allows | Primary pages + intent notes; GPTBot/Claude/Perplexity Allow | — |
| IA | Pass | Confirmed | Checkout hrefs on-site `/go/` | No `zadeyo.com` in href scan of dist | Keep affiliate only as 302 target |

\*Critical for **live** indexing; not a defect in the built HTML.

---

## C) Category Notes

### Technical SEO — 88
Crawl setup is strong: trailing-slash policy, path redirects, sitemap hygiene, robots Disallow for thin forum + checkout hops, security headers ready. Deduction for undeployed DNS and unmeasured live headers/CWV.

### Content Quality — 80
Solid transactional + guide coverage, About E-E-A-T, FAQ depth. Remaining risk is overlapping blog intents and some forum-thin pages (correctly Disallow/noindex).

### On-Page SEO — 90
Near-perfect metadata hygiene. Only material nit: homepage description slightly over length.

### Schema — 88
Product/Offer/Breadcrumb/BlogPosting/Organization present; Offer URLs on-domain. No banned HowTo/FAQPage spam patterns observed.

### Performance — 68
Inferred from HTML weight only. CWV unknown until public PSI.

### Images — 86
WebP usage + alts look good; further gains from responsive `srcset` audits on product galleries if needed.

### AI Search Readiness — 90
`llms.txt` is explicit about catalog, canonical host, and primary intent URLs.

---

## D) Environment Limitations

- Skill fetch scripts **block 127.0.0.1** (SSRF guard).  
- Production hostname **does not resolve** at audit time.  
- Evidence is from **`dist/` build + `public/`** (78 `index.html` pages, 57 sitemap URLs).  
- Core Web Vitals / CrUX / GSC: **not measured**.

---

## E) Unknowns / Follow-ups

1. Mobile & desktop PageSpeed after DNS.  
2. Search Console coverage vs sitemap after first crawl.  
3. Whether AggregateRating matches visible `/reviews/` counts in Google’s eyes.  
4. Real LCP element (hero carousel vs title) on production CDN.
