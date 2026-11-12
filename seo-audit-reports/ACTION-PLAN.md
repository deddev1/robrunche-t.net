# SEO ACTION PLAN — robruncheat.net

**Source:** Agentic SEO full audit + implementation pass (2026-11-11)  
**Overall score (pre-pass):** 84 / 100 (Good)  
**Related:** `FULL-AUDIT-REPORT.md`

---

## Completed this pass

| Item | Status |
|------|--------|
| Trim homepage meta ≤155 | Done (~148–155) |
| Spot-check AggregateRating vs `/reviews/` | Done — Elite schema uses filtered Elite reviews (~19 @ ~4.7); matches `productHref` filter |
| Append short-slug blogs to `llms.txt` | Done (+ patch-day, eac-error, skins) |
| Production security headers + basic CSP | Done in `public/_headers` |
| Hero LCP preload on `-512.webp` | Verified (`index.astro` + first slide 512 widths) |
| Reduce homepage SSR weight | Done — hero 8→4 slides; non-LCP slides single 512w srcset |
| Enforce `seoIntentMap` demotion | Done — `supportOf` + canonical + sitemap omit for secondary safe/ESP/aim/loot posts |
| Strengthen E-E-A-T About | Done — named editors (Jordan Hale, Sam Rivera), verify Undetected, corrections |
| Expand `money` / `dupe` / `free` Free Roam drills | Done |
| Scrub other-game leftovers | Done — Deadlock soul/orbs/MMR rewrite; `robrun-loot-aim` is ROB RUN loot aim |
| IndexNow wiring | `.env.example` + `public/indexnow-key.txt.example` |

---

## Still blocked on DNS / deploy

| # | Action | Why |
|---|--------|-----|
| 1 | Point `robruncheat.net` DNS + HTTPS | Live indexing / CWV |
| 2 | Run PageSpeed mobile + desktop after DNS | Confirm LCP/INP/CLS Good |
| 3 | Set `INDEXNOW_KEY`, publish `{key}.txt`, submit sitemap in GSC | Indexing velocity |

---

## Maintenance

- Keep one primary URL per intent (`src/data/seoIntentMap.ts` + `supportOf` on secondaries).
- Never recommend HowTo schema; avoid FAQPage for this commercial site.
- Re-audit after major ROB RUN / EAC patches when status copy changes.
- Do not reintroduce Deadlock vocabulary (souls, orbs, troopers, MMR, hero laning).
