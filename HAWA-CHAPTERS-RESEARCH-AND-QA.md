# Hawa / Chapters 02 — cinematic design pass
Date: 2026-11-02
Branch: `design/hawa-cinematic-chapters-v2`
Context: Inspiration research across Nicolai Palmkvist's public Elementor project catalogue, with individual accessible demos sampled. No licensed template, code or art asset was copied.

## Reference research
Source catalogue: https://nicolaipalmkvist.com/
- Nordicus Architects (template3.nicolaipalmkvist.com): cinematic page rhythm and highly legible section sequencing.
- Wave Wood (ivory-viper-747903.hostingersite.com): materiality and editorial human touches.
- MILANO Ecommerce (template2.nicolaipalmkvist.com): product-led structure.
- Northbound Agency (elementor-template.lifeonablock.com): carefully choreographed, multi-section GSAP scenes.
- Agenzi Agenzi (template1.nicolaipalmkvist.com): section hierarchy and brand-first narration.
- GreenBird Agency (yellow-magpie-125839.hostingersite.com): bold vertical rhythm.
- Circular rotating slider, Scroll-Trigger Ice Cream, Forrest Tower, Showcase Scrolltrigger, Image Wave, Reveal Content, 360° Gallery: surveyed design/interaction patterns across the linked template catalogue.
Other listed projects include Fashion Puffer, Nike Shoe Rotate, Cruise Ship Hero, Full Page Snap, Chameleon Juice, Roadtrip, Vision Pro, NextGen Slider, and more. Some destination demos were inaccessible or bot-blocked, so do not claim each was visually tested.

## Art direction
Original direction **The Hawa Chapters**: editorial film title cards, forest-green scrims, butter paper, warm copper, food and venue photography from assets already used in the repository. Motion supports storytelling: image arrival, masked display type, sticky three-chapter story, manual image gallery, photo zoom and a controlled no-autoplay editorial slider. No global scrolling hijack; checkout remains simple.

## Functional implementation
- Completely reworked homepage hero without generic bento overlays.
- Three native-scroll chapters with pinned frame on desktop; all chapters readable in linear order on small screens and when reduced motion is requested.
- Manual three-slide menu vignette with prev/next and left/right keyboard support and inert offscreen slides.
- Gallery lightbox using native dialog semantics, keyboard Escape and focus return.
- Bespoke three-part Eat / Talk / Gather spread, removing emoji-heavy bento cards.
- Two premium photo-led dishes in the landing menu preview; links still lead to functional menu and WhatsApp request flow.
- Photographic masthead on the menu page, rebuilt page heading treatments for inner pages.
- Oversized closing invitation with visit/map and WhatsApp.
- No third-party animation dependency or autoplay video; external images remain the site's original GitHub-hosted content.

## Verify before presentation
- Each new HTML page loads `hawa-chapters.css`, home also loads `hawa-chapters.js`.
- JS syntax check in the review workflow.
- CSS braces balanced; HTML main/h1 count and unique IDs validated.
- Vercel build is READY.
- Check actual visuals at 360, 390, 768, 1024, 1440 wide using an authenticated browser; external inspection via automated browser is blocked by this environment.
- Test touch interactions, gallery dialog and keyboard, slider, reduced motion, sticky scroll chapter switching, media/low-bandwidth behavior and cross-browser CSS.
- Optimize GitHub raw-hosted photos to a stable CDN/image pipeline for any serious public launch; this remains a demo.

## Important
The real checkout is a WhatsApp enquiry, not an automatically confirmed order or paid transaction. There is no real GPS rider tracking. Do not describe these as live features.
