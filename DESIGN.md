---
name: Andrew Solomon Resume
description: A single-sheet engineered document positioning a senior Salesforce engineer who is also a modern web/AI craftsman.
colors:
  page-white: "#FFFFFF"
  type-black: "#000000"
  mid-type-grey: "#6E6E6E"
  whisper-hairline: "#E1E1E1"
  legacy-process-blue: "#0096FF"
typography:
  display:
    fontFamily: "Raleway, sans-serif"
    fontSize: "28pt"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
    fontFeature: "smcp"
  headline:
    fontFamily: "Raleway, sans-serif"
    fontSize: "12pt"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Raleway, sans-serif"
    fontSize: "10pt"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Raleway, sans-serif"
    fontSize: "10pt"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
  label:
    fontFamily: "Raleway, sans-serif"
    fontSize: "8pt"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Raleway, sans-serif"
    fontSize: "9pt"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  xs: "2pt"
  sm: "3pt"
  md: "6pt"
  lg: "8pt"
  xl: "12pt"
  page-margin-y: "1.25cm"
  page-margin-x: "1.5cm"
components:
  section-header:
    typography: "{typography.headline}"
    textColor: "{colors.legacy-process-blue}"
    padding: "0 0 6pt 0"
  event-title:
    typography: "{typography.title}"
    textColor: "{colors.type-black}"
    padding: "0"
  event-company:
    typography: "{typography.body}"
    textColor: "{colors.mid-type-grey}"
    padding: "0"
  event-date:
    typography: "{typography.body}"
    textColor: "{colors.legacy-process-blue}"
    padding: "0"
  event-bullet:
    typography: "{typography.body}"
    textColor: "{colors.type-black}"
    padding: "0 0 3pt 0"
  hairline-rule:
    backgroundColor: "{colors.whisper-hairline}"
    height: "0.4pt"
    width: "100%"
---

# Design System: Andrew Solomon Resume

## 1. Overview

**Creative North Star: "The Engineering Letter"**

This is a formal single-sheet letter-form artifact — engineered, not decorated. The system reads like a spec written by someone who cares about typography: tight hierarchy, deliberate whitespace, hairline rules in place of heavier ornament, every glyph paying its own way. Confidence is signaled by restraint rather than volume. The voice is the voice of a well-engineered Stripe or Vercel document, ported into LaTeX.

The system explicitly rejects four adjacent gravity wells named in `PRODUCT.md`: generic Word/LinkedIn templates (the Times-New-Roman default), Salesforce-corporate aesthetics (cloud-blue gradients, icon-per-skill, Trailhead warmth), designer-portfolio cosplay (HUGE display type, manifesto-asymmetric layouts), and AI-slop SaaS landing pages (gradient text, glassmorphism, identical card grids). The visual system is the proof that the engineer is also the craftsman; bridge identity is delivered through evidence, not announcement.

The current `main.tex` carries one legacy artifact — the bright `#0096FF` Salesforce-blue accent — that is itself an instance of the second anti-reference and is being retired on the active `dark-mode` branch. This document captures the **current state** so the redesign has a baseline; re-run `/impeccable document` once `dark-mode` lands to recapture the real palette.

**Key Characteristics:**
- Single A4 page; tight 1.25cm vertical / 1.5cm horizontal margins
- Sans-serif typographic system anchored on Raleway, weights 400 and 700 only
- Hairline rules (0.4pt) carry every horizontal division — no thicker borders, no boxes
- Color is restrained and used as accent on ≤8% of the surface
- Zero shadows, zero rounded corners, zero ornament that does not earn its place
- Layout rhythm via negative `\vspace` adjustments rather than uniform padding

## 2. Colors

A near-monochrome palette: a single accent against four neutrals. The accent is currently in transition.

### Primary
- **Legacy Process Blue** (`#0096FF`, RGB 0, 150, 255): Section header text, the vertical title bar between "Andrew Solomon" and "Resume", right-aligned dates inside `\cvevent`, and the linkedin/github strings in the footer. **This color is currently flagged as an anti-pattern (Salesforce-corporate cloud-blue) and is slated for replacement on the `dark-mode` branch.** Treat it as legacy, not canon.

### Neutral
- **Type Black** (`#000000`): Default body text, `\cvevent` role titles, bullet `$\cdot$` prefixes. (Note: pure black is not on-brand for production-grade typographic systems — see the Don'ts section below.)
- **Mid-Type Grey** (`#6E6E6E`, RGB 110, 110, 110): Company names inside `\cvevent` headers. The single non-text-black neutral; carries the secondary information layer.
- **Whisper Hairline Grey** (`#E1E1E1`, RGB 225, 225, 225): Used **only** for `\hrule` dividers under section headers, the meta block, and `\cvevent` headers. Never for text. Never for borders larger than 0.4pt.
- **Page White** (`#FFFFFF`): Page background.

### Named Rules

**The One Accent Rule.** A single accent color carries every emphasis on the page. The accent appears on ≤8% of the surface: section headers, the vertical title bar, dates, footer URLs. Never two accents. Never a gradient.

**The Hairline-Only Rule.** Horizontal divisions are 0.4pt `whisper-hairline` rules. No thicker borders. No filled separator bars. No boxes.

**The No-Decoration Rule.** Color is always semantic — it marks section, date, or active link. It never appears as decoration.

## 3. Typography

**Display Font:** Raleway (with system sans-serif fallback)
**Body Font:** Raleway (same family, different weights and sizes)
**Label/Mono Font:** None — the system is single-family by commitment.

**Character:** Raleway is a geometric humanist sans with crisp small-caps and excellent legibility at small sizes. Used as the sole family, it produces a quiet, modern, deliberate page that reads as engineered rather than designed. Weight contrast (400 ↔ 700) and size contrast carry every level of hierarchy.

### Hierarchy

- **Display** (Raleway 400, ~28pt, line-height 1, letter-spacing 0.08em, small-caps): The title block — `Andrew Solomon` and `Resume`, separated by the legacy-blue vertical bar. Appears once.
- **Headline** (Raleway 700, 12pt, legacy-process-blue, centered): `\cvsection` headers. Marks every top-level section.
- **Title** (Raleway 700, 10pt, type-black): `\cvevent` role titles ("Senior Salesforce Engineer / Technical Lead"). Always paired with mid-type-grey company name on the same line.
- **Body** (Raleway 400, 10pt, line-height 1.35, type-black): Summary paragraph and every bullet. Bullets prefix with `$\cdot$`, then text, then a 3pt vertical step.
- **Label** (Raleway 400, 8pt, type-black, bold for the field name): Meta section — `Location`, `Portfolio`, `Email` rows.
- **Subtitle** (Raleway 400, 9pt, type-black, centered): The "Software Developer" subhead beneath the title block.

### Named Rules

**The Single-Family Rule.** Raleway and only Raleway. Hierarchy is delivered by weight (400 / 700) and scale, never by family contrast.

**The Two-Weight Rule.** 400 and 700, nothing in between. No light, no semibold, no extrabold. The contrast ratio is binary by design.

**The Small-Caps Title Rule.** The title block uses LaTeX `\textsc{}` small-caps with letter-spacing approximating 0.08em. This treatment is reserved for the title block alone; it is the reader's first signal that this is an engineered document, not a generated one.

## 4. Elevation

The system is **flat by absolute commitment**. There are no shadows, no tonal layering, no glassmorphism, no backdrop-filter. Depth and division are conveyed exclusively by:

1. The 0.4pt `whisper-hairline` `\hrule` (under section headers and `\cvevent` titles)
2. Negative-`\vspace` and positive-`\vspace` rhythm to compress or breathe the layout
3. Color contrast on accent text (legacy-process-blue vs. type-black)

No shadow vocabulary is defined. No shadow vocabulary should be defined. PDF rendering of shadows is unreliable and reads as cheap; print renders them as smudges.

### Named Rules

**The No-Shadow Rule.** Shadows are forbidden in this system. Depth is hairline-and-whitespace, not light-and-dark.

**The Hairline-Is-The-Layer Rule.** When a division is needed, the answer is a 0.4pt `whisper-hairline` rule. When that feels insufficient, the answer is more vertical space, never a thicker line.

## 5. Components

The resume has no buttons, inputs, navigation, or cards. This system documents the actual signature components that carry the page.

### Title Block
- **Composition:** Centered HUGE small-caps `Andrew Solomon`, a 1mm wide × 0.9cm tall vertical bar in `legacy-process-blue` as the only divider, then HUGE small-caps `Resume`. Beneath, centered subtitle (`small`) reading "Software Developer".
- **Behavior:** Appears once, at the top of the page. Carries the entire identity-impression budget of the first second.

### Meta Section
- **Composition:** A stack of single-line rows. Each row is `[bold field label] [value]` with `\hspace*{\fill}` pushing the label to the right edge, the value flush left. Closes with a `whisper-hairline` rule.
- **Internal:** `footnotesize` (8pt). Field labels in 700 weight; values in 400.

### Section Header (`\cvsection`)
- **Style:** Centered, `large`, weight 700, color `legacy-process-blue`. Single line.
- **Spacing:** 6pt below before the first content line.
- **Behavior:** Marks every top-level section (Summary, Technical Skills, Experience, Education, Certifications).

### CV Event (`\cvevent`)
- **Composition:** A two-column row using `\begin{tabular*}` — left column 13.6cm carrying `**Title** - mid-type-grey company`; right column 3.9cm carrying the right-aligned `legacy-process-blue` date.
- **After header:** A negative 8pt vertical step, then a `whisper-hairline` `\hrule`, then 6pt of breathing room, then the bullet stack.
- **Bullets:** Each begins with a math `$\cdot$` (slightly higher and tighter than a typed `·`), then the description text in `body` style, then a 3pt vertical step.
- **No icons, no left-borders, no background fills.** The two-column rhythm and the hairline are the entire visual treatment.

### Hairline Rule
- **Spec:** 0.4pt height, full text-width, color `whisper-hairline`. The only divider primitive in the system.
- **Use:** Beneath the meta section. Beneath every `\cvevent` header. Never decoratively, never doubled.

### Footer
- **Composition:** A `\colorbox{white}` of 1.5× line-width (deliberately exceeding the text frame), centered, containing `linkedin.com/in/andysolomon · github.com/andysolomon` in `legacy-process-blue`. The `$\cdot$` separator matches the bullet glyph.
- **Position:** Pinned to page bottom via `\null \vspace*{\fill}`.
- **Note:** The 1.5× width is a deliberate visual escape from the geometry — the only place on the page where an element exceeds the text frame.

## 6. Do's and Don'ts

### Do:
- **Do** use Raleway and only Raleway. Two weights: 400 and 700.
- **Do** carry every horizontal division as a 0.4pt `whisper-hairline` rule.
- **Do** keep accent color usage to ≤8% of any visual region.
- **Do** use `\textsc{}` small-caps **only** for the title block.
- **Do** respect the single-page constraint as a hard design force — it disciplines hierarchy.
- **Do** treat any decision that could be lifted from a Word resume template, a Trailhead page, a Behance portfolio, or a v0 landing page as automatically wrong (per `PRODUCT.md` anti-references).
- **Do** prefer `\vspace` adjustments to thicker rules when the layout needs more breathing room.

### Don't:
- **Don't** introduce any color outside the five tokens declared in the frontmatter without a Named-Rule-level justification.
- **Don't** keep `legacy-process-blue` (`#0096FF`) past the dark-mode branch landing — it is the Salesforce-corporate anti-reference from `PRODUCT.md`. Replace, don't preserve.
- **Don't** use `#000` or `#FFF` in **future** iterations — tint every neutral toward the accent hue (chroma 0.005–0.01 in OKLCH terms). The current pure-black/white in `main.tex` is a legacy LaTeX default and should be addressed during the dark-mode pass.
- **Don't** use a second font family. No serif "for variety". No mono "for technical accents".
- **Don't** introduce shadows. PDF shadows render as smudges.
- **Don't** introduce rounded corners. The system is rectilinear by commitment.
- **Don't** add icons, emoji, or pictograms. The hierarchy carries every signal that an icon would.
- **Don't** use `border-left` greater than 1px (or any colored side-stripe) anywhere on the page.
- **Don't** introduce gradient text, glassmorphism, hero-metric templates, or any of the AI-slop SaaS-landing patterns named in `PRODUCT.md`.
- **Don't** add a second accent. The system runs on one accent or zero.
- **Don't** use horizontal rules thicker than 0.4pt. If the rule needs to be louder, the answer is more whitespace, not a thicker line.
- **Don't** use icons-per-skill in Technical Skills. The bullet list is the right answer; an icon grid is the Trailhead anti-reference.
