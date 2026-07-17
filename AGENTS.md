# JSG Pump website maintenance rules

## Bilingual content is mandatory

Every user-facing content update must ship as a matched English and Simplified Chinese pair.

- English route: `/<route>/`
- Chinese route: `/zh/<route>/`
- Author both versions explicitly. Do not machine-translate or rewrite a static page in the browser at runtime.
- For generated pages, update the source content in `scripts/generate-static-pages.js`; generation must emit the English route and its `/zh/` partner together.
- For homepage UI changes, add matching English and Chinese values in `assets/js/main.js`. Never rely on an English fallback for new customer-visible labels.
- The language selector must navigate to the matching route and preserve the page topic, query parameters other than `lang`, and hash.
- Keep navigation, headings, body copy, calls to action, tables, captions, image alt text, forms, validation messages, breadcrumbs, and footer copy in the selected language.
- Keep brand names, model numbers, units, standards, email addresses, and common engineering abbreviations unchanged where appropriate.
- Update both versions of title, meta description, canonical, hreflang, Open Graph data, and JSON-LD.
- Add both routes to `sitemap.xml` at the same time.
- Never add Chinese content only to an English page or English prose only to a Chinese page.

## Public-facing copy only

- Write every published page for customers, engineers, and purchasing teams.
- Do not expose production notes or content-preparation language such as source materials, supplied files, image cleanup, logo removal, de-branding, indexed images, verified-from-source wording, internal references, or archive handling.
- Present images as product images, specifications as representative product or series parameters, and caveats as normal engineering selection guidance.
- Replace any internal workflow explanation with product benefits, technical specifications, typical applications, or a clear RFQ call to action.
- Do not add third-party creator, generator, platform, or tooling credits to public page footers unless the user explicitly requests them.

## Verification before release

1. Run `node scripts/validate-static-site.js`.
   This check must fail for missing language partners, stale shared assets, or known untranslated Chinese shell labels.
2. Open both local routes and verify the selected language option matches the route.
3. Switch English → Chinese and Chinese → English; confirm the browser navigates to the paired route.
4. Check that headings, table headers, navigation, CTA labels, breadcrumbs, and footer links remain entirely in the selected language.
5. Keep changes in local preview until the user explicitly approves production deployment.
