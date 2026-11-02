# Hawa — Follow the aroma: review preview

Date: 2 November 2026, Asia/Dhaka. Production has not been changed.

## Open the working preview
http://127.0.0.1:4173/

This loopback URL works on this Windows computer while the local server is running. No hosted preview or production deployment was created. Repository branch: `codex/hawa-follow-the-aroma`, based on verified production commit `8ae7961047c9ee8377ff1c825ae29362a5a703b3` on `arena/6f5d26e7-hawa`. The fresh clone had no existing uncommitted work. GitHub main contains only the initial README and was not used as the site baseline.

## Creative direction and implementation
One warm photographic platter crosses an emerald stage and settles toward a shared table. Cream menu surfaces, saffron actions, expressive Cormorant Garamond and readable Manrope carry the same identity through all four pages. Existing SVG branding is retained beside readable Hawa text; no logo replacement was published.

- Immediate first frame; removed the mandatory 1560 ms intro and GSAP entrance sequence.
- Native reversible scroll choreography, pointer depth, steam, shadow tightening, three short copy chapters, and direct skip-to-menu/table controls.
- True Three.js geometry for the wood table, linen runner, ceramic plates and brass spoons. Procedural grain and directional lighting. Lazy initialization only after scrolling; on-demand rendering, adaptive pixel ratio, offscreen pause, resource disposal and WebGL-loss fallback.
- Food is a layered photograph, not a fully rotatable 3D food model. No orbit/drag claim or control is offered without suitable capture.
- Complete menu, local search and category filters, URL-restored search state, useful empty states, selected quantities, shared persistent cart, native modal drawer, detail panels, quantity/remove actions and keyboard focus restoration.
- Request form uses associated inline validation, shows the constructed message locally, and offers an explicit WhatsApp link. It does not send anything or claim payment/order confirmation. Payment-method changes invalidate the preview. Drawer changes refresh checkout totals.
- Shared gathering, phone, directions, contact/help and mobile navigation. No messages or requests sent.
- Self-hosted licensed font subsets, responsive WebP food derivatives, semantic HTML independent of canvas, reduced-motion still composition and an explicit failed-image state.

## Verification performed
22 functional browser assertions passed: menu totals; category and combined search; no results/reset; search clearing/focus; quantity increase/decrease; focus containment/restoration; persistence; form errors; WhatsApp recipient/message content; removal/empty states; featured details/add; mobile navigation/Escape.

20 layout checks passed: homepage, menu, checkout and help at 360, 390, 768, 1024 and 1440 px widths. No horizontal overflow or broken image files in these normal-load checks. Inspected representative screenshots manually.

Additional passing checks: forward/reverse scroll restoration; initialized WebGL; reduced-motion unpinned layout and no WebGL initialization; explicit no3d fallback; actual WEBGL_lose_context context loss; request summary updates; URL search reload; storage-denied in-memory cart; forced image-request failure. Zero uncaught application errors in the normal layout matrix. Intentional failure tests produce expected network/context messages and are not represented as clean normal loads.

Axe WCAG 2/2.1/2.2 A/AA scan: zero detected violations on all four pages; full axe scan also clean for open selection drawer. Tested keyboard tab cycling and Escape. This is automated and browser-level evidence, not screen-reader certification.

JS syntax checks passed for shop.js, aroma-ui.js and aroma-scene.js. HTML integrity checks passed: one h1/main per page, no duplicate IDs, all local file references resolve. Prettier applied to active sources. DESIGN.md lint passes with zero errors/warnings. No framework build/typecheck existed; this remains a static HTML/CSS/JS site with no new framework requirement.

## Performance measurements
Lighthouse local Chrome, single final runs, mobile simulated throttling and desktop preset. Reports include the exact browser/settings. No production field CWV/INP or physical Android/iOS hardware results are claimed.

| Profile | Performance | LCP | Total blocking time | CLS |
|---|---:|---:|---:|---:|
| Mobile | 98 | 2.5 s | 20 ms | 0.008 |
| Desktop | 100 | 0.5 s | 0 ms | 0.002 |

Accessibility / best practices / SEO: 100 / 100 / 100 in both Lighthouse runs. Mobile LCP remains around the good/needs-improvement boundary; deployed network and real-device measurements remain necessary before making a field-performance claim.

A separate 390×844, 4× CPU slowdown scroll sample recorded 120 frames: median 21 ms, p95 31.6 ms, two frames above 50 ms. This is host emulation, not proof of a sustained 60 fps experience on representative phones.

The initial mobile result was 67 performance / 9.4 s LCP. Deferring Three.js, responsive image encoding, and splitting the BDT glyph from the Bengali font reduced first-load competition. The first frame does not wait for the 3D engine.

## Static auditor limitation
The prescribed strict premium audit was run and its raw JSON is included. It reports 21 findings: 20 literal buttons whose externally registered JS handlers it cannot detect, and a WebKit-only scrollbar rule in unused legacy styles.css. Runtime behavior for the active buttons is verified; active aroma.css supplies standards scrollbar-color/scrollbar-width and fallback rules. The audit is not reported as passing. These results are tool-scope limitations, not hidden by inline no-op handlers or suppressions.

## Remaining authentic-asset dependencies
- Existing hero.jpg visibly carries another restaurant name. It is excluded from active pages; the interior area has a clearly marked review placeholder.
- The owner’s authorization to redesign/use assets was confirmed. Specific food identity/provenance and current business/menu information were not independently verified. Existing contact/map/menu values are retained with confirmation notices; unsupported popularity claims removed.
- Sizzling Platter no longer borrows Chicken Tikka's image. Unphotographed menu dishes use clean text rows rather than repeated fictional food illustrations.
- A fully rotatable appetising food model needs an actual multiview capture/model. Supporting food photographs, real interior/exterior photography and preparation footage remain absent. No fabricated substitutes were introduced.
- Exact capture requirements are in ASSET-MANIFEST.md. No paid assets were purchased and no generated business imagery was commissioned.

## Review files
hero-desktop.png, hero-mobile.png, table-desktop.png, gatherings-desktop.png, menu-desktop.png, menu-mobile.png, selection-mobile.png, request-mobile.png. The full-page screenshots of a sticky story show its scroll runway as empty space; use the individual chapter captures and interactive URL to assess the sequence.

The ZIP contains active source, licensed runtime assets, design/asset/interaction notes, and this review. Existing archival source remains in the local Git checkout. Production publishing still requires explicit approval.
