# Presume — Design System

The design language of **[andrewsolomon.dev](https://andrewsolomon.dev)**. This
document is the source of truth for how the résumé — and every future skill demo
on the site — should look, read, and behave.

> **Canonical state.** An earlier revision of this file documented a bright
> Salesforce "process blue" (`#0096FF`). That accent is **retired** and is now an
> explicit anti-reference. The current system is a warm **amber** accent on a
> **dark** ground, exactly as implemented in `web/src/styles/tokens.css`.

---

## North Star — "The Engineering Letter"

A formal, letter-form artifact — **engineered, not decorated**. Tight hierarchy,
deliberate whitespace, hairline rules instead of heavier ornament, every glyph
paying its own way. Confidence through restraint. The register of a well-made
Stripe or Vercel document.

Five rules govern every decision:

1. **Single-Family Rule** — Raleway is the only typeface. Hierarchy comes from
   weight and scale, never a second family.
2. **Two-Weight Rule** — only 400 and 700. Nothing between.
3. **One-Accent Rule** — a single amber carries every emphasis. Never two
   accents, never a gradient. Accent covers ≤ 8% of any surface.
4. **Hairline-Is-The-Layer Rule** — a 1px hairline is the only divider. When a
   division feels weak, add whitespace — never a heavier rule.
5. **Flat & Rectilinear Rule** — zero shadows, zero rounded corners, zero
   glassmorphism. Depth is hairline-and-whitespace only.

---

## Color

Near-monochrome, one accent. **Dark is canonical** — `:root` carries the dark
palette so any surface renders correctly with no `[data-theme]` attribute;
`[data-theme="light"]` is the parity override. Neutrals are tinted toward the
accent hue (hue ≈ 80, tiny chroma) — no pure `#000` or `#fff` in the dark canon.

### Dark (canonical)

| Token | Value (oklch) | Role |
| --- | --- | --- |
| `--color-surface` | `oklch(16% 0.008 80)` | near-black, faintly warm ground |
| `--color-type` | `oklch(94% 0.005 80)` | primary ink |
| `--color-mid-type` | `oklch(70% 0.008 80)` | secondary layer (company names) |
| `--color-hairline` | `oklch(28% 0.008 80)` | the only divider color |
| `--color-accent` | `oklch(72% 0.13 75)` | amber — section headers, title bar, dates, links |
| `--color-accent-soft` | `oklch(72% 0.13 75 / 0.18)` | selection tint |

### Light (parity)

| Token | Value | Role |
| --- | --- | --- |
| `--color-surface` | `#ffffff` | ground |
| `--color-type` | `oklch(18% 0.005 80)` | ink |
| `--color-mid-type` | `oklch(50% 0.005 80)` | secondary |
| `--color-hairline` | `oklch(89% 0.003 80)` | divider |
| `--color-accent` | `oklch(50% 0.16 55)` | burnt-amber — deepened for AA on white |

---

## Type

- **Family:** Raleway (geometric humanist sans), self-hosted woff2, weights
  400 & 700 only.
- **Small-caps** (`font-variant: small-caps` on lowercased text) is reserved for
  the **title wordmark alone** — the first signal that this is engineered.
- Scale (screen-adapted from the LaTeX 10pt baseline):

| Token | Size | Use |
| --- | --- | --- |
| `--type-display-size` | `clamp(2rem, 4.5vw, 2.75rem)` | title wordmark |
| `--type-headline-size` | `0.95rem` | section headers (amber) |
| `--type-title-size` | `0.875rem` | role / event titles |
| `--type-body-size` | `0.875rem` | body, bullets |
| `--type-subtitle-size` | `0.78rem` | subhead under title |
| `--type-label-size` | `0.7rem` | meta labels, eyebrow links |

Line-heights: `--leading-tight 1.2`, `--leading-snug 1.3`, `--leading-body
1.55`, `--leading-prose 1.6`.

---

## Spacing & layout

pt-derived rhythm; layout breathes **vertically**.

`--space-xs 2pt` · `--space-sm 3pt` · `--space-md 6pt` · `--space-lg 8pt` ·
`--space-xl 12pt` · `--space-2xl 1.5rem` · `--space-3xl 2rem`.

Page geometry: centered column, `--page-max-width: 52rem`, `2rem` margins. An A4
feel, web-adapted — it reads on a screen, not a sheet. `--hairline-weight: 1px`
(0.4pt in the LaTeX original). `--radius: 0` everywhere.

---

## Motion, hover & press

- **Exponential ease-out only:** `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce, no
  elastic. Durations `--duration-fast 160ms` / `--duration-base 240ms`.
- **Only color/border transitions.** The theme flip cross-fades surface + ink.
- **Hover:** links shift color (accent ↔ ink); bordered controls shift their
  hairline border + label to accent. No scale, no shadow, no lift.
- **Press:** no shrink. Disabled = `opacity: 0.45`.
- **Focus:** 1px accent outline, 2px offset.
- `prefers-reduced-motion` kills the cross-fade.

---

## Iconography

The résumé is, by rule, **icon-free** — no icon-per-skill grids (that's the
Trailhead anti-reference), no pictograms, no emoji. Icons appear **only** on
interface affordances, drawn as **inline stroke SVGs** (~1.5px stroke,
`currentColor`, round caps): the sun/moon theme toggle and the download-arrow on
the export button. No icon font, no sprite, no icon library.

Unicode is used in exactly one place: the middle-dot (`·`, `\00b7`) that
prefixes every bullet and separates footer links.

---

## Logo / brand mark

There is **no logo file**. The mark *is* the typographic title block — the name
and "Résumé" set in small-caps with the amber bar between them. Do not invent or
draw a logo; render the name in type wherever a mark is needed (the reduced
"AS │" form is acceptable for a favicon/tile).

---

## Content voice

- **Precise, modern, confident.** Direct and results-forward. No hedging, no
  jargon padding. Reads like well-engineered product copy.
- **Impersonal résumé grammar** — verb-first bullets that drop the subject:
  *"Built and scaled 2GP package pipelines across 33+ repositories."* Never "I
  built…", never "you".
- **Evidence over adjectives** — claims are quantified (*"serving 50,000+ daily
  users," "reducing deployment time by 40%"*). Numbers persuade; prose stays flat.
- **Bridge identity** — every section reads as Salesforce-deep **and**
  modern-web/AI-current. Apex/LWC/fflib/2GP sit next to TypeScript/Next.js/Claude
  API/MCP deliberately.
- **Casing:** sentence case for prose; UPPERCASE (letter-spaced) for eyebrow
  links, button labels, and meta labels; small-caps for the title wordmark alone.
- **No emoji. No exclamation points.** Hierarchy carries the emphasis.
- **Single-page discipline** is a content force: if a bullet doesn't earn its
  line, cut it.

---

## Implementation notes

- Token source of truth: `web/src/styles/tokens.css`. Consumers link the
  design-system `styles.css`, which `@import`s all token files + `base.css`.
- Raleway is self-hosted (woff2, `latin` + `latin-ext`) — no runtime CDN
  dependency.
- Theme is set via `data-theme` on `<html>` and persisted to `localStorage`
  under `resume-theme`, applied pre-paint to avoid a flash.

New skill demos on the site should be **plain HTML/CSS/JS**, link the same
tokens, default to `data-theme="dark"`, and obey the five rules above. See
`Design Reference.html` for a complete, self-contained example.
