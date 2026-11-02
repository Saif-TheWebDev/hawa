# Hawa / Image Expansion — prepared assets

## Images to add
All files were generated specifically for the Hawa demo, optimized for the web and stored in the companion `Hawa_6_New_Images_Website_Pack.zip` artifact, in the `assets/` folder.

| File | Intended placement | Nature |
| --- | --- | --- |
| `assets/hawa-kacchi-biryani.webp` | Homepage hero, biryani promotion, category dish, menu banner and featured product | AI-generated dish illustration |
| `assets/hawa-grilled-platter.webp` | Grill promotion and featured product cards | AI-generated dish illustration |
| `assets/hawa-beef-roast.webp` | New featured roast editorial card and mini-menu | AI-generated dish illustration |
| `assets/hawa-sweets-drinks.webp` | New featured desserts editorial card and mini-menu | AI-generated dish illustration |
| `assets/hawa-dining-concept.webp` | Compact venue teaser and promotion | AI-generated concept; **not** a photograph of the actual restaurant |
| `assets/hawa-gathering-concept.webp` | Gathering event hero section | AI-generated concept; **not** a photograph of the actual restaurant |

## Publish gate
**Do not merge this branch until all six binary WebP images have been added to the branch's `assets/` directory.** The code references the named files, but this chat's GitHub integration supports UTF-8 content creation and base64 blob calls only, not direct local-file or file-reference upload. The image pack is separate; the branch intentionally remains a draft until the six assets appear in source.

## QA after assets upload
1. Confirm all six URLs return 200 with image/webp MIME.
2. View homepage and menu at 375, 768 and 1440 px.
3. Check hero, promos, featured picks, desserts, venue concept labels, menu banner.
4. Check preload/CLS, lazy loading and fallback to original existing assets when needed.
5. Confirm WhatsApp cart flow still works and no fake restaurant interiors are presented as photographs.
6. Merge PR into `arena/6f5d26e7-hawa`, then deploy production with Vercel.
