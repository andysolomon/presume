# Andrew Solomon — Résumé Design System

The design system behind **[andrewsolomon.dev](https://andrewsolomon.dev)** — the
single-sheet résumé of Andrew Solomon, a Senior Salesforce Engineer / Technical
Lead who is also a modern web & AI craftsman. This system exists so that future
additions to the site — the résumé itself and small HTML/CSS/JS skill demos —
all speak in one deliberate, engineered voice.

**Creative North Star: "The Engineering Letter."** A formal, letter-form
artifact — engineered, not decorated. Tight hierarchy, deliberate whitespace,
hairline rules instead of heavier ornament, every glyph paying its own way.
Confidence through restraint. The register of a well-made Stripe or Vercel
document.

## Sources

Everything here was extracted from the résumé's source of truth:

- **GitHub — [andysolomon/presume](https://github.com/andysolomon/presume)**
  (branch `main`). The LaTeX résumé (`main.tex`, `DESIGN.md`, `PRODUCT.md`) plus
  the ported **LWR + TypeScript** web app under `web/` that renders the same
  content. Key files read:
  - `DESIGN.md`, `.impeccable/design.json` — the written design system.
  - `web/src/styles/tokens.css` — the live token values (both themes).
  - `web/src/modules/c/app/` — the résumé component (structure + CSS).
  - `web/src/modules/c/resumeData/resumeData.ts` — the résumé content.
- **Live site:** https://andrewsolomon.dev

> The published `DESIGN.md` documents a *legacy* state built around a bright
> Salesforce "process blue" (`#0096FF`). That accent is an explicit
> anti-reference and has been **retired**. This design system captures the
> **current, canonical** state: a warm **amber** accent on a **dark** ground,
> exactly as implemented in `web/src/styles/tokens.css`. Explore the repo above
> to go deeper or to regenerate values if the site changes.

---

## Content Fundamentals

How copy is written across the site.

- **Voice: precise, modern, confident.** Direct and results-forward. No jargon
  padding, no hedging. Reads like well-engineered product copy.
- **Third-person / impersonal résumé grammar.** Bullets are verb-first and drop
  the subject: *"Built and scaled 2GP package pipelines across 33+
  repositories."* Never "I built…", never "you".
- **Evidence over adjectives.** Claims are quantified — *"serving 50,000+ daily
  users,"* *"reducing deployment time by 40%,"* *"10,000+ healthcare
  professionals."* Numbers do the persuading; the prose stays flat.
- **Bridge identity, always.** Every section must read as Salesforce-deep AND
  modern-web/AI-current. Salesforce terms (Apex, LWC, fflib, 2GP) sit next to
  web/AI terms (TypeScript, Next.js, Claude API, MCP) deliberately.
- **Labels are terse and titled.** Section headers are single words or short
  phrases: *Summary, Technical Skills, Experience, Education*. Meta labels are
  one word: *Location, Portfolio, Email*. Micro-links are uppercase eyebrows:
  *VIEW GOVERNMENT EXPERIENCE*.
- **Casing:** sentence case for prose and bullets; UPPERCASE (letter-spaced)
  reserved for eyebrow links, button labels, and meta labels; small-caps
  reserved for the title wordmark alone.
- **No emoji. No exclamation points.** The hierarchy carries the emphasis.
- **The single-page discipline** is a content force: if a bullet doesn't earn
  its line, it is cut.

---

## Visual Foundations

### Color
A near-monochrome palette with **one accent**. Dark is canonical.

- **Surface** `oklch(16% 0.008 80)` — near-black, faintly warm.
- **Ink** `oklch(94% 0.005 80)` — primary type.
- **Mid-type** `oklch(70% 0.008 80)` — the single secondary layer (company names).
- **Hairline** `oklch(28% 0.008 80)` — the only divider color.
- **Accent (amber)** `oklch(72% 0.13 75)` — section headers, the title bar,
  dates, links. **≤8% of the surface**, ever. Never two accents, never a
  gradient. In the light-parity theme the accent deepens to a burnt-amber
  `oklch(50% 0.16 55)` for AA contrast on white.
- Neutrals are **tinted toward the accent hue** (hue 80, tiny chroma) rather
  than pure grey — no `#000`, no `#fff` in the dark canon.

### Type
- **Single family: Raleway.** Geometric humanist sans. Hierarchy comes from
  **weight and scale only** — never a second family. No serif "for variety," no
  mono "for technical accents."
- **Two weights only: 400 and 700.** Nothing between.
- **Small-caps** (`font-variant: small-caps` on lowercased text) is reserved for
  the title wordmark alone — the reader's first signal this is engineered.
- Scale (screen-adapted from the LaTeX 10pt baseline): display
  `clamp(2rem, 4.5vw, 2.75rem)`, headline `0.95rem`, title/body `0.875rem`,
  subtitle `0.78rem`, label `0.7rem`.

### Spacing & layout
- pt-derived rhythm: `xs 2pt … 3xl 2rem`. Layout breathes **vertically**;
  when a division feels weak the answer is *more whitespace*, never a louder rule.
- Page geometry: centered column, `max-width: 52rem`, `2rem` margins. A4 feel,
  web-adapted — it reads on a screen, not a sheet.

### Elevation, borders, shape
- **Flat by absolute commitment.** Zero shadows, zero tonal layers, zero
  glassmorphism, zero backdrop-filter. Depth is hairline-and-whitespace.
- **Hairline is the only divider.** 0.4pt in LaTeX → `1px var(--color-hairline)`
  on screen. Never thicker, never doubled, never a filled bar or box.
- **Rectilinear.** `--radius: 0`. No rounded corners anywhere.
- **No left-border stripes**, no colored side-accents, no cards-with-accent-edge.

### Backgrounds & imagery
- No background images, no full-bleed photos, no textures, no patterns, no
  gradients. The surface is a single flat color. (The portfolio sub-site carries
  a couple of project screenshots; the résumé system itself is imagery-free.)

### Motion, hover & press
- **Restrained, exponential ease-out only** (`cubic-bezier(0.16, 1, 0.3, 1)`);
  no bounce, no elastic. Durations `160ms` / `240ms`.
- **Only color/border transitions.** The theme flip cross-fades surface + ink.
- **Hover idioms:** links shift *color* (accent↔ink); bordered controls shift
  their *hairline border + label* to accent. No scale, no shadow, no lift.
- **Press:** no shrink/scale; disabled = `opacity: 0.45`.
- Focus: `1px` accent outline, `2px` offset. `prefers-reduced-motion` kills the
  cross-fade.

### Transparency & blur
- Used only for `--color-accent-soft` (an ~18% accent tint) behind text
  selection. No blur anywhere.

---

## Iconography

The résumé is, by rule, **icon-free** — no icons per skill (that's the Trailhead
anti-reference), no pictograms, no emoji. Icons appear **only** on the two
interface affordances, drawn as **inline stroke SVGs** (~1.5px stroke,
`currentColor`, round caps):

- **Theme toggle** — a sun (dark mode) / moon (light mode) glyph, from the
  source's `themeToggle` component.
- **Export PDF** — a download-arrow glyph on the one button.

There is **no icon font, no sprite sheet, no icon library**. New demos that need
an icon should follow the same recipe: a single inline stroke SVG at ~1.5px
weight in `currentColor`, never a filled or multicolor icon set. Unicode is used
in exactly one place: the middle-dot (`·`, `\00b7`) that prefixes every bullet
and separates footer links.

### Logo / brand mark
The source repo ships **no logo file**. The brand mark *is* the typographic
title block — "Andrew Solomon │ Résumé" set in small-caps with the amber bar
between the two words. Do not invent or draw a logo; render the name in type
wherever a mark is needed (see `thumbnail.html` for the reduced "AS │" form).

---

## Components

React primitives (`window.AndrewSolomonDesignSystem_12f855.<Name>`). Each ships
a `.jsx`, a `.d.ts` contract, and a `.prompt.md` usage note.

**Core** (`components/core/`) — general primitives, reusable in skill demos:
- **Button** — the one button idiom: transparent, hairline border, uppercase
  label, amber on hover. No filled/primary variant (a filled CTA is the
  SaaS-landing anti-reference). `size`, `icon`, `href`, `disabled`.
- **IconButton** — 2.25rem square hairline button for a single glyph (the theme
  toggle idiom).
- **Link** — text link with three semantic idioms: `inline` (ink→amber),
  `accent` (amber→ink, footer), `eyebrow` (uppercase tracked, cross-nav).
- **SectionHeader** — centered, bold, amber section marker.
- **Hairline** — the single divider primitive; `spacing` sets vertical margin.

**Résumé** (`components/resume/`) — the document primitives:
- **TitleBlock** — the small-caps identity header with the accent bar + subtitle.
- **MetaRow** — one contact line: bold label, value (optionally a link).
- **CVEvent** — one experience/education entry: two-column header, hairline,
  middle-dot bullets.
- **Footer** — centered accent links joined by middle-dots.

### Intentional additions
The résumé source defines no generic UI primitives (it has no buttons/inputs).
**Button, IconButton, and Link** are added as first-class primitives — extracted
faithfully from the résumé's real affordances (`.pdf-export`, the theme toggle,
and the three link idioms) — so the planned HTML/CSS/JS skill demos have a
governed vocabulary to build on. They introduce no new visual language.

---

## Index

- `styles.css` — **the entry point.** Links this one file. Imports all tokens +
  `base.css`.
- `base.css` — page resets, dark-canon ground, default link idiom, selection.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `motion.css`,
  `fonts.css`.
- `components/core/` — Button, IconButton, Link, SectionHeader, Hairline (+ card).
- `components/resume/` — TitleBlock, MetaRow, CVEvent, Footer (+ card).
- `guidelines/` — 17 foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/resume/` — the full interactive résumé recreation.
- `templates/resume/` — `Resume.dc.html`, an editable single-sheet résumé
  starting point.
- `thumbnail.html` — the design-system homepage tile.
- `SKILL.md` — Agent-Skills-compatible entry for downloading this system.

## Fonts

Raleway is **self-hosted** (weights 400 & 700). The two variable-woff2 subsets
(`latin`, `latin-ext`) live in `assets/fonts/`, declared via `@font-face` in
`tokens/fonts.css` — no runtime CDN dependency, works fully offline. These are
Google Fonts' own subsets (`fonts.google.com/specimen/Raleway`); each subset
file covers the full weight axis, so one file serves both 400 and 700.
