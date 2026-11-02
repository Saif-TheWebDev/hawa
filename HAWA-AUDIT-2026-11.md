# HAWA — Restaurant UI/UX + source audit
Date: 2026-11-02
Status: Redesign pass 1 on review branch; production unchanged.

## Method and scope
Audited GitHub source for every deployed HTML page in the current restaurant project: `index.html`, `menu.html`, `checkout.html`, `track.html`, and the unrelated `ai-models.html`. Inspected `styles.css`, `shop.js`, `app.js`, `scene.js`, `vercel.json`, and deployment metadata/build logs. Studied restaurant/editorial and interface inspiration at Awwwards, Dribbble, Pinterest and 21st.dev.

**Not a rendered-browser test:** The public Vercel deployment has Vercel Authentication; cannot verify real desktop/mobile screenshots, JS console, Lighthouse scores, image loading or WhatsApp delivery in a real user browser from this environment. The code has received static checks and Vercel preview builds. All real business information must be owner-approved.

## Severity 0 — blocked for real transactional launch
- **Fake order placement:** Checkout previously created `HW-*` orders in localStorage, then said an order was placed, despite no server intake, notification, or restaurant confirmation. **Fixed for demo:** cart now creates a prefilled WhatsApp request. Customer must press Send and wait for Hawa confirmation.
- **Fabricated live delivery tracking:** Stage advanced every nine seconds, animated a map, predicted ETA and named a pretend rider. **Fixed:** honest order-help page with restaurant call/WhatsApp.
- **Payment implication:** bKash/Nagad/Rocket preferences appeared as payment without a payment gateway. **Fixed:** labelled preferences, with no payment collection.
- **Unapproved pricing, offers and availability claims:** HAWA10, free delivery over ৳800, ~35-minute ETA, 24/7 availability were published without an integrated source of truth. **Fixed:** customer-facing promises removed; restaurant confirms them.
- **Invented named testimonials:** customer reviews were displayed without source verification. **Fixed:** replaced with truthful hospitality/party space copy, with links to restaurant Facebook.
- **Unrelated AI models promotion:** `ai-models.html` was unrelated to the restaurant. **Fixed:** removed from review branch.

## Severity 1 — usability and engineering
- **Three conflicting design styles** accumulated in cascade: black neo-brutalist, taped scrapbook, generic coral SaaS. **Fixed for pass 1:** a single editorial hospitality stylesheet, consistent palette, type and components.
- **Cart quantity duplication** in `setQty`. **Fixed:** quantity update now replaces instead of duplicates.
- **Bottom cart-bar pointer only** and no keyboard activation. **Fixed:** Enter/Space handling.
- **Menu no-results state** omitted. **Fixed:** informative empty state and clear-search action.
- **Seasonal market-priced item** could be added at zero cost. **Fixed:** ask for quote via WhatsApp.
- **Payment selectors** were non-semantic divs. **Fixed:** button controls with `aria-pressed`.
- **Drawer** was not exposed as dialog. **Improved:** dialog semantics, focus to close button, Escape closes and returns focus. **Remaining:** full keyboard focus trap/inert outside.
- **Reveals** required IntersectionObserver. **Fixed:** reduced-motion/unsupported-browser fallback.
- **Navigation active highlight** did not correctly reflect page. **Fixed:** pathname-driven active state and `aria-current`.
- **Dead Three.js import** remained on homepage despite no scene element. **Fixed:** removed from loading graph.
- **Brand identity** was a circular storefront photo pretending to be a logo. **Fixed for review:** custom typographic Bangla `হ` monogram. Restaurant must approve brand mark.

## Creative direction, not a template
Use Hawa's culture as the visual system. Warm paper background, deep olive surfaces, rust-red primary actions, generous serif display type, rich food/location photography. The UI should evoke an editorial hospitality publication or tasteful printed dining menu. Photography and content lead; UI chrome stays minimal. Motion is deliberate: image entrance, scroll reveal, editorial ticker, microhover and graceful transitions that respect reduced motion. No floating 3D food, autoplay hijacking, faux cursors, shiny gradients or irrelevant animated blobs.

### Palette
- Warm background `#F6F1E8`
- Food-paper cards `#FFFAF1`
- Deep olive `#23382E`
- Rust red `#A9442B`
- Text charcoal `#24251D`
- Muted taupe `#665F53`

### Design research, for inspiration only (not copied code)
- Awwwards: https://www.awwwards.com/ and https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf — performance as a motion-design constraint.
- Dribbble: https://dribbble.com/shots/26927571-Restaurant-Website-UI-Design-for-Food-Brand — photography + editorial structure.
- Dribbble: https://dribbble.com/shots/27318945-Luxury-Restaurant-Website-UI — food-first narrative.
- Pinterest: https://guide.pinterest.com/design/color-palette-for-restaurant-website/ — role-based palette discipline.
- 21st.dev: https://docs.21st.dev/%40efferd/components/image-gallery — efficient progressive gallery behavior; current static gallery was preferred to avoid a needless React dependency.

## Implemented in redesign pass 1
- New complete responsive editorial stylesheet with food-specific design system.
- Responsive typography scales across desktop/tablet/mobile and consistent page widths.
- Real photo-led half-screen arched hero, simplified hero headline and conversion CTAs.
- Bengali typographic brand monogram.
- Reduced visual noise from sticker/tape/emoji/chunky shadows and repeated card chrome.
- Editorial menu cards and larger imagery, clear category navigation and search empty state.
- Better gallery and photo transitions, less stage blocking, no dead 3D JavaScript.
- Family/event feature replacing unverified guest reviews.
- Consolidated buttons, focused checkout hierarchy, accessible payment selection.
- Honest order enquiry through WhatsApp; no fake payment/auto-confirmation.
- Real order-help contact instead of animated fake delivery map.
- Basic keyboard/reduced-motion/nav fixes and social/location/contact links.
- Removed promotional AI page.

## Quality gates before merge
1. Open preview on iPhone-sized 360/390px, tablet 768px, laptop 1024px and desktop 1440px; check every page and scroll for overflow/overlapping nav.
2. Verify actual restaurant photographs (rights, identity, correct dishes, quality, crop). Replace emoji placeholders with verified menu photographs, not fabricated food photography.
3. Run browser console + accessibility scanner, Lighthouse performance, contrast, keyboard tab/shift-tab, screenreader check, reduced motion.
4. Confirm WhatsApp destination (+880 1705-036161) belongs to Hawa and can receive orders, and the restaurant actually monitors it.
5. Confirm all listed dishes/prices, phone, location, business hours, pickup/delivery, party facilities with restaurant owner.
6. Confirm server-side integration or operator workflow before calling any future interaction "order placed", "live tracking", or payment.
7. Check WhatsApp pre-filled message on Android/iOS/desktop and external-app handoff success and failure states.
8. Consider swapping self-hosted optimized WebP/AVIF for GitHub raw images and preloading only the lead photo. Measure real-world LCP/CLS/INP.
9. Add analytics events for menu CTA -> cart -> WhatsApp intent, but do not log phone, address, or customer message payload.
10. Revalidate accessibility of cart drawer keyboard focus trapping and no background focus while open.
11. Verify Vercel Authentication access policy and custom domain before sharing with customers.
12. The default GitHub `main` branch is not production. Vercel production currently tracks `arena/6f5d26e7-hawa`: review/merge carefully into that target, not `main`.

## Remaining high-value roadmap
- Actual photography and original brand mark approved by Hawa; visual consistency audit with screenshots.
- Build a proper order backend only if restaurant wants real checkout. Requires persistence, staff dashboard, acknowledgement, secure order lifecycle, delivery assignments, and payment integration.
- Verified opening hours/delivery pricing/areas with an editable CMS, if this is a commercial launch.
- Dedicated party-centre landing section with capacity, hall details and genuine photos, no unsourced promises.
- In-page food gallery with accessible zoom and captions for properly licensed imagery.
- Optional bilingual English/Bangla after complete translation and native speaker proofreading.
- Menu data sourced from owner instead of hard-coded unverified prices; proof of specials.
- Focus-managed cart drawer, native modal dialog and accessible form error summary.
- Favicon, SVG/wordmark variations and social share assets that consistently represent Hawa.
- Real E2E order-intent tests and visual regression tests.

## Integrity note
A request for “200 major improvements every iteration, until 100 iterations” is not a meaningful acceptance standard. This pass deliberately prioritizes coherent design and actual correctness instead of inflating change counts. Future passes should be measured by reviewed user journeys, accessibility, business approval and screenshot-verified quality—not arbitrary diff size.
