# Hawa interaction contract
Visual contract: DESIGN.md. Business evidence: user brief, HAWA-AUDIT-2026-11.md, existing shop.js data. Owner has authorized redesign; production publishing remains explicitly prohibited pending approval.

## Canonical owners
- Menu data and cart: shop.js, existing hawa_cart_v1 storage schema, max 50 per dish. Storage failure uses in-memory cart and announces non-persistence. No private customer data stored.
- Dialogs: shared native dialog behavior in aroma-ui.js; modal focus containment, Escape, focus restoration. Drawer is a native dialog.
- Form: shop.js validation with inline associated errors and local message preview. No network submit; only explicit WhatsApp link transfers entered data. Native area select uses OS behavior, accepted for this simple enquiry.
- Scrollbar: aroma.css global tokens with forced-color fallback.
- Toast: shop.js HAWA.toast, role=status.
- Search/filter: shop.js, local immediate filtering, URL q/cat state, clear/reset, aria-pressed and focus retention. Fifteen existing dishes, no pagination needed.
- Payment: preference only; no collection, success, tracking or confirmation state.

## Shared outcomes
Add updates quantity/badge/status. Remove updates total and retains meaningful focus. Empty drawer links to menu. Details use same data and add action. Checkout preserves cart, validates required fields and builds an inspectable message. External link explicitly opens WhatsApp; user still sends there. Normal links are navigation; buttons perform state changes.

## Limits
Existing prices/descriptions and business contact are carried forward, with confirmation notices. No backend, remote failures, authentication, inventory, live tracking or payment integration are claimed. Search has no async race. Offline reload requires browser cache; no service worker promise. Native dialogs require contemporary browser support.
