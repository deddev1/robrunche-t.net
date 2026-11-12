# Ranking action plan — robruncheat.net

**Role lens:** 15+ year SEO engineer  
**Evidence:** offline `dist/` crawl (68 pages, 0 issues) + competitor SERP sample (Avalanche, Elocarry, Mitamers, SSZ, Nexus)  
**Scores:** Overall **74** · Dist-only **86** · Indexed today **0** (`site:` empty) · Off-page est. **~18**

---

## Verdict

Your **on-page / schema / GEO foundation is ready**. Ranking is blocked first by **host not live**, then by **trust & commercial UX gaps** vs shops that already rank — not by “write more blog words.”

---

## P0 — Must do before any ranking talk

1. **Connect domain** until `https://robruncheat.net/` returns 200  
2. **Google Search Console** verify + submit `sitemap-index.xml`  
3. Set **IndexNow** key if you use Bing  

Without this, every other SEO change is inventory for a warehouse with no loading dock.

---

## P1 — Changes that actually move rankings/CTR after go-live

| Change | Status |
|--------|--------|
| **Show starting prices on Elite / HWID / UGC UI** | Still open (schema has $35; UI optional follow-up) |
| **Public `/status/` page** | ✅ Done — `/status/` + nav/footer/hero + sitemap |
| **Expand product hub + utilities** | ✅ Done — deeper commercial copy on both hubs |
| **De-template blog depth blocks** | ✅ Done — unique field notes per slug; template session/patch blocks removed |

---

## P2 — Competitive content & authority

1. ✅ **Comparison pages** — `/compare/`, `hwid-vs-new-account`, `cheats-vs-utilities`, `safe-setup-checklist`  
2. ✅ **One primary URL per intent** — map on `/compare/` (`seoIntentMap.ts`)  
3. ✅ **Review signals** — AggregateRating JSON-LD on reviews; Discord sameAs + leave-a-review intake (add Trustpilot URL via `PUBLIC_ORG_SAME_AS` when you have a real profile)  
4. **Above-fold Elite proof** — still optional (dated re-test badge polish)

**Differentiation to push (you already have it):** HWID + UGC + honest risk copy — cheat-only shops often don’t.

---

## P3 — After indexing starts

- Mobile PageSpeed / CWV (LCP, INP, CLS)  
- Security headers (HSTS, CSP baseline)  
- GSC query report → double down on URLs getting impressions  
- Prune or noindex near-duplicate blogs that never earn clicks  

---

## Do not waste cycles on

- More generic 1,500-word filler on every slug  
- More FAQPage schema on commercial pages  
- Chasing every competitor feature keyword with a new thin post  
- Expecting rankings while DNS is down  

---

## 90-day sequence

- **Days 1–7:** Live host + GSC + visible prices  
- **Days 8–30:** `/status/`, expand product hub, 3 comparison pages, review accuracy  
- **Days 31–90:** Authority / reviews, de-template blogs, CWV pass, scale what GSC proves  

Interactive board: open the SEO ranking canvas beside chat.
