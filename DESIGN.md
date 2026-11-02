---
version: alpha
colors:
  primary: "#064633"
  emerald: "#064633"
  charcoal: "#072f24"
  cream: "#fbf7eb"
  saffron: "#f1c54d"
  brass: "#ac8550"
  muted: "#59614f"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
  body:
    fontFamily: "Manrope, Hind Siliguri, Arial, sans-serif"
rounded:
  control: "30px"
spacing:
  unit: "8px"
---
# Hawa — Follow the aroma

## Overview
Food leads the experience. A complete brass biryani platter fills the emerald opening; confident Manrope headlines and Cormorant accents carry the invitation through cream menu surfaces, firni editorial photography and a warm gathering section. This revision responds to the user's rejection of the sparse table scene and explicit request to create and use food images. Publishing to the existing Vercel project is authorized by the user's earlier instruction.

## Colors
Canonical tokens: feast.css :root, loaded after aroma.css on all four active pages. Deep emerald, warm cream and saffron frame the generated food illustrations. Brass, linen and terracotta appear in the imagery. They are an art direction, not evidence of Hawa's actual serving ware.

## Typography
Manrope 400–700 for navigation, body and bold homepage headlines. Cormorant Garamond supplies expressive accents and menu titles. Hind Siliguri supplies Bengali support. Self-hosted Google Fonts with OFL licenses and separate currency glyph subset. Explicit word spacing preserves readability in large tracked headlines. Typical mobile body copy is 13–14px; small category labels are secondary to clear names and prices.

## Layout
An immediate food-and-headline opening with accessible menu and gathering actions. Ordinary document scrolling; no long pinned runway. Three featured dishes have large distinct images, readable prices, details and direct add actions. Firni and gathering compositions vary image scale. The menu starts with a compact title, search and category controls, followed by image cards and text rows for dishes without assets. All pages share header, footer, cart and enquiry styling.

## Elevation & Depth
The transparent biryani cutout retains its complete vessel, soft contact shadow and directional lighting. Restrained pointer/scroll parallax and a slow float add depth. Pause and reduced-motion controls are supported. This is layered generated imagery, not a rotatable food model. The previous bare Three.js table is no longer loaded; its source is retained only as historical implementation.

## Shapes
Full serving vessels rather than artificial oval crops. Rounded primary actions, quiet rules, gentle image corners, one arched gathering image. Existing logo is retained beside readable Hawa text.

## Components
Shared data and cart in shop.js; native dialogs and navigation in aroma-ui.js; hero motion in feast-motion.js. Food details and direct add actions use the same records as the catalogue. Quantity updates preserve row order. Checkout previews a WhatsApp enquiry and requires the visitor's explicit handoff.

## Do's and Don'ts
Keep generated imagery honestly identified. Do not invent interiors, reviews, popularity, real-time stock, payment collection or confirmed orders. Keep existing menu prices indicative pending confirmation. Preserve immediate navigation, visible focus, reversible cart controls and reduced motion. Do not reintroduce a long loader, empty table runway, repeated circular food crops or scroll-jacking.
