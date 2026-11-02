# Hawa — Follow the aroma

Food-led website revision for Hawa Restaurant & Party Centre. Deploy target: the existing hawa-restaurant project in Saif PRO, https://hawa-restaurant-omega.vercel.app/ . The user requested this improvement and previously authorized publishing to Vercel. See VERIFICATION.md for this revision's checks and the deployment record in the delivered review.

## Run locally
Run `python -m http.server 4173 --bind 127.0.0.1` in this directory, then open http://127.0.0.1:4173/ . No framework or npm build is required.

## Active architecture
- index.html: food-led homepage, three featured dishes, firni, gathering and visit sections.
- feast-motion.js: lightweight pointer/scroll parallax, float pause, reduced motion.
- aroma-ui.js: shared navigation, native dish dialog and image fallbacks.
- shop.js: existing 15 menu records, persistent selection, stable quantity updates, validated WhatsApp enquiry preview.
- fonts.css / aroma.css / feast.css: shared styling; feast.css is the current visual override on all four pages.
- menu.html + feast-menu.css: search, filters, distinct image cards and text catalogue.
- checkout.html / track.html: enquiry preparation and contact help.
- assets/hawa-*-ai-v2*.webp: explicitly authorized generated food illustrations; exact prompts in assets/GENERATED-FOOD-PROMPTS.md.

Older aroma-scene.js / Three.js and legacy assets remain in repository history but are not loaded by active pages. No rotatable food model is claimed. No fabricated interior is used.

No backend, payment processing, live inventory, order confirmation or tracking is implied. Tests inspect the WhatsApp preview without sending messages.
