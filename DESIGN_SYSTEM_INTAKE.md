# Sydra — Design System Intake

Ready-to-paste content for Claude's "Set up your design system" form. Each section below maps to one form field. Drafted from the real tokens in `src/app/globals.css`, `src/lib/typography.ts`, and copy in `docs/SYDRA-MASTER.md`.

---

## 1. Company name and blurb

Paste into the "Company name and blurb" field:

> Sydra: NSA IDR billing software for surgical practices (orthopedic, neurosurgery, spine, plastics). Billing teams prepare federal independent dispute resolution submissions in under 5 minutes per claim. This is the marketing website (Next.js 16 App Router) covering the product, pricing, security, FAQ, and demo funnel.

---

## 2. Code to attach

Use the "Link code from your computer" option and drag the frontend-focused subfolder:

- `src/components/` — primitives in `ui/`, page sections in `sydra/`, animation in `motion/`

Also include the token sources so Claude infers the system, not just markup:

- `src/app/globals.css` — color, type, spacing, motion tokens and utility classes
- `src/lib/typography.ts` — `textStyles` helper for page and section copy

GitHub option: instead of dragging a folder, paste the repo URL (`https://github.com/owner/repo`). Use this only if the repo is public or the account is connected.

---

## 3. Fonts, logos, and assets to attach

Drag into "Add fonts, logos and assets":

- `SYDRA_LOGO_MASTER.svg` — primary logo
- `SYDRA_LOGO_MASTER-no-tagline.svg` — logo without tagline
- `public/sydra-logo-nav.svg` — nav lockup
- `public/icon-sydra.svg` — icon / OG / manifest mark

Fonts: Geist Sans and Geist Mono. These load from Google Fonts via `next/font`, so there is no font file to upload. They are named in the notes below.

`.fig` file: none in this repo. Skip the Figma upload.

---

## 4. Notes (design system summary)

Paste into the "Any other notes?" field:

> Color roles. Hero navy #1a2b48 for full-bleed backgrounds (gradient #0a1525 to #152238 to #1a2b48 to #243a5c). Text #1a2b48. Body copy #4a5568. Warm stone page background #ebe8e2. Cool neutral alternating sections #e8eaef. Accent blue #0028b8 used sparingly for links, focus, and small moments. Rule lines #d4d0c8. One color dominates per section, no color soup.
>
> Typography. Geist Sans for everything, Geist Mono for code. Display, h1, and h2 use weight 500 with tight negative letter spacing. Large stat figures use weight 300. Body is 1.0625rem at line-height 1.7. Headings are sentence case. Readable column max width is 42rem.
>
> Layout. Magazine over stone: a stone outer field framing a white content spread with clear edges. Content max width 1280px, shell max width 1440px. Section rhythm is clamp(80px, 10vw, 160px). Pattern alternates hero, neutral, hero, neutral, footer. Compositions are editorial and asymmetric, not centered template grids.
>
> Components. Buttons are square (no rounded corners), uppercase, letter spaced, light weight, with an arrow that shifts right on hover. Product cards have no shadows or borders; the image is the card, with name in small caps and price in lighter weight. Nav links draw an underline left to right on hover. Scroll cues read "VIEW MORE" with a down arrow in small caps, tracking widest.
>
> Motion. Framer Motion entrance and scroll reveals. Primary easing cubic-bezier(0.16, 1, 0.3, 1). Durations 150ms to 700ms. All motion respects prefers-reduced-motion.
>
> Brand voice. Plain, direct, and confident. No hyphens anywhere (rewrite to avoid). Active voice. Oxford comma. Avoid AI giveaway phrases such as "dive into," "leverage," "utilize," and "it's important to note."
>
> Accessibility. WCAG 2.1 AA. Visible accent-blue focus rings, alt text on all images, labels on all inputs, full keyboard navigation.

---

## 5. Fill-in checklist

1. Company name and blurb → paste the blurb from section 1.
2. Link code from your computer → drag `src/components/`, then add `src/app/globals.css` and `src/lib/typography.ts`. (Or use the GitHub link instead.)
3. Upload a .fig file → skip (none in repo).
4. Add fonts, logos and assets → drag the four logo/icon files from section 3.
5. Any other notes → paste the notes block from section 4.
6. Submit.
