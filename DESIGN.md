---
version: alpha
colors:
  primary: "#073e32"
  emerald: "#073e32"
  charcoal: "#09271f"
  cream: "#f4eedf"
  saffron: "#edc76b"
  brass: "#ac8550"
  muted: "#596151"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
  body:
    fontFamily: "Manrope, Hind Siliguri, Arial, sans-serif"
rounded:
  control: "4px"
spacing:
  unit: "8px"
---
# Hawa — Follow the aroma

## Overview
A warm, surreal invitation to a real restaurant in Mymensingh. A single photographed platter crosses an emerald stage and settles into a shared table composition. This is a hybrid: expressive homepage, practical menu and enquiry pages. The source is production commit 8ae7961; no production changes are authorized.

## Colors
Runtime source: aroma.css :root. Emerald and charcoal frame the food; cream supports reading; saffron marks the primary action. Brass belongs to atmospheric serving ware, not decorative interface chrome. Materials are inspired by existing imagery, whose documentary provenance is unverified.

## Typography
Cormorant Garamond regular/italic gives aroma its flowing expression. Manrope 400–700 makes task text clear. Hind Siliguri supplies Bengali support. All are Google Fonts OFL, self-hosted with license files. Display 64–150px desktop, 62–82px mobile; body 16px/1.7. No local-only fonts. Labels at least 12px.

## Layout
Wide asymmetric opening, persistent right-side platter, generous left-side copy. 3 short scroll chapters; native scrolling, no snap or forced delays. On mobile food is in the first screen, story length shortened. Menu uses a readable list rather than pretending every unphotographed item has a picture.

## Elevation & Depth
One three.js scene supplies actual geometric table, plates and warm lighting. Food remains layered photography, not a rotatable model. CSS fallback is immediately visible. Perspective reactions are restrained; scroll motion is reversible. Reduced motion presents a still first scene and ordinary document sections.

## Shapes
Controls are gently squared, lines quiet. No repeated circular promotional cards. A physical oval table is narrative content rather than card decoration.

## Components
Shared header/footer, native dialogs for selection and dish detail, one cart store and one toast. Homepage and menu use the same dish data. Request form previews a WhatsApp message before its explicit external handoff. Focus and scrollbar colors share the system.

## Do's and Don'ts
Preserve the existing SVG identity, accompanied by readable Hawa text; this is a legibility treatment, not an approved replacement logo. Do not invent interiors, claims, food models, customer reviews, prices or successful orders. No sound, loader, cursor replacement, scroll-jacking or repeated entrance reveals.
