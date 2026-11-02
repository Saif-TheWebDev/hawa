# Hawa food-led revision — verification

Date: 2 November 2026, Asia/Dhaka. This report supersedes the earlier table-scene review. Production publishing was explicitly authorized by the user; this revision improves that deployed design in response to their feedback.

## Changes
Four new generated food images: whole mutton biryani platter, mixed grill, beef roast and firni. Bolder typography, complete serving vessels, shorter homepage, image-led catalogue and direct featured-dish add controls. Header, footer and enquiry pages share the same tokens. The earlier bare Three.js table and long pinned sequence are no longer active. The site uses layered imagery, not a rotatable food model.

## Functional verification
22 browser assertions passed for menu count, combined category/search filtering, no-results/reset, search clear/focus, drawer opening, quantity increases/decreases, focus containment/restoration, cart persistence, required form validation, WhatsApp recipient and message content, removal/empty states, featured details/add, mobile navigation and Escape. Additional review verified that quantity updates preserve item order. No WhatsApp message or order was sent.

## Responsive and accessibility verification
All four pages checked at 360, 390, 768, 1024 and 1440px: no document overflow, broken images or uncaught application errors. Additional 320, 600 and 760px checks exposed and fixed category overflow and hero image/action overlap. Desktop/mobile screenshots reviewed visually. Pause and reduced motion work. Axe WCAG A/AA checks found zero violations on all four pages, open selection drawer and open dish dialog after correcting photo-button accessible names. These are automated/browser checks, not screen-reader certification or physical-device testing.

## Performance
Single local Lighthouse runs using Chrome's simulated mobile and desktop preset. These are lab measurements, not production field Core Web Vitals.

| Profile | Performance | LCP | Total blocking time | CLS |
|---|---:|---:|---:|---:|
| Mobile | 96 | 2.6 s | 110 ms | 0.009 |
| Desktop | 100 | 0.5 s | 0 ms | 0.005 |

Accessibility, Best Practices and SEO each scored 100 on both profiles. Mobile LCP is near the 2.5s good/needs-improvement boundary; deployed network/device performance can differ.

## Source integrity
Syntax checks pass for active JavaScript. HTML pages each contain one main/h1, unique IDs and resolving local asset references. Runtime food assets have both 1400px and 700px derivatives. No framework build step exists. DESIGN.md documents the current visual contract.

## Provenance and limits
Images were created with the built-in generator after explicit user instruction. They are labelled illustrative. Existing menu/contact/directions data are retained; prices and availability require Hawa confirmation. No actual restaurant interior, staff, customer story, payment gateway, live tracking or order confirmation was fabricated. Full food model and documentary restaurant photography remain outside this revision.

Exact prompts and originals: outputs/hawa-food-images. Current review screenshots start with feast-. Older reports and images describe the superseded table-scene design and should not be treated as evidence of this revision.

## Additional final checks
Direct featured-dish add and multi-item quantity order passed. Short-phone 375×667 and intermediate 600×844 layouts were inspected after size adjustments. Forced generated-image failure after menu filtering correctly shows the image-unavailable fallback. The failure test intentionally produces a network error; normal navigation has no uncaught application errors. DESIGN.md lint: zero errors/warnings.

The strict premium static audit was run and saved as feast-premium-audit.json. It reports 21 findings: 20 external-event-handler buttons it cannot detect statically, and a WebKit scrollbar rule in inactive legacy styles.css. Active button behavior is verified in the browser; active aroma.css includes standard scrollbar properties. This static audit is not reported as passing. No inline dummy handlers or suppressions were added.
