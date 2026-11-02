# Hawa — Food-first refresh / V6

Date: 2026-11-02

## Visual reference
User supplied a tall screenshot of a bright food-delivery storefront. We adapted its **visual principles**, not its logo, copy or copyrighted artwork:
- a deep evergreen hero with a large food focal point;
- split typography/food imagery;
- colorful promotional cards with asymmetry;
- high-contrast food cards;
- floating category discovery around a plate;
- compact menu cards and strong calls to action;
- a modern, airy visual rhythm.

## Original brand direction
Hawa branding stays distinct. The existing Hawa vector logo, food photography and venue photography are reused from this repository. No external stock photos, fabricated restaurant photos, unverified discounts or fake customer ratings were added.

Colors: forest green #084a3b, butter yellow #ffce3c, tangerine #fa674b, pistachio #d6edba, off-white #fbfbf8.

Typography: Poppins for large food-first hero/body, Montserrat for microcopy/navigation, Orlean where locally licensed/installed for editorial display headings with Bodoni Moda as fallback. No font file was downloaded or redistributed.

## Pages
- Homepage rewritten with hero platter, venue inset, three promo cards, three photographed top picks, orbit-style category navigation, additional menu cards, gathering feature, visit contact and footer.
- Menu rewritten with functional category filters, full search, contemporary cards and modernized cart drawer.
- Checkout restyled; the order still prepares a WhatsApp message and is not a paid or confirmed order.
- Order-help page restyled; no fake GPS/rider tracking.
- Legacy multi-theme stylesheet removed from active pages. New CSS + JS in `hawa-fresh.css` and `hawa-fresh.js`.
- Menu category links: `menu.html?cat=rice|grill|curry|asian|sweet`.

## Motion
GSAP 3.15.0 and ScrollTrigger (pinned CDN version), short one-time branded loader, hero food entrance/depth, promo/card entrance animation, category image drift, venue photo parallax. All motion skips if reduced motion is requested. Site layout works without GSAP.

## Trust and caveats
The menu prices are the existing demo values, **not** reverified restaurant prices. They are presented with a clear confirmation notice. No fabricated discounts, ratings, delivery ETAs or payment acceptance claims were added.

## Validation
- HTML structural tag counts, unique IDs, one h1/main per page.
- JS syntax checks and balanced CSS declaration braces.
- Menu, checkout and cart target IDs preserved.
- All assets referenced are present in the project's `assets` directory.
- Vercel preview READY.
- A protected Vercel preview means authenticated real-browser visual tests (mobile, contrast, GSAP timing, category menu and WhatsApp handoff) should still be performed before a commercial launch.
