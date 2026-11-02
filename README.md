# Hawa — Follow the aroma

Review-only redesign of Hawa Restaurant & Party Centre. Production remains unchanged.

## Run locally
From this directory run `python -m http.server 4173 --bind 127.0.0.1`, then open http://127.0.0.1:4173/ . No npm install/build is required. Use an HTTP server for ES modules, not file://.

## Architecture
- index.html + aroma-scene.js: three-stage scroll story. True table geometry; layered food photography.
- aroma-ui.js: shared navigation, dish details, motion coordination and image fallback.
- shop.js: existing menu data/schema, hardened cart and validated WhatsApp request preview.
- aroma.css / fonts.css: single active visual system; self-hosted OFL fonts.
- menu.html / checkout.html / track.html: menu, enquiry preparation, direct contact.
- `?no3d` exercises the still/table fallback. Reduced-motion skips WebGL initialization.

Read DESIGN.md, ART-DIRECTION.md, ASSET-MANIFEST.md, UX-CONTRACT.md and VERIFICATION.md before publishing. Original JPEGs and older redesign files are retained as history but are not the active site. The interior placeholder and photographic food layer are explicit limits pending authentic capture.

No backend, payment processing, live inventory, order confirmation or tracking is implied. Test WhatsApp links by inspecting the local preview; do not send test messages.
