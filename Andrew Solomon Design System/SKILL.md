---
name: andrew-solomon-design
description: Use this skill to generate well-branded interfaces and assets for the Andrew Solomon résumé site (andrewsolomon.dev), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, skill demos), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Fast orientation

- **North star:** "The Engineering Letter" — engineered, not decorated. Restraint = confidence.
- **Entry point:** link `styles.css` (imports all tokens + `base.css`).
- **Theme:** dark is canonical; set `data-theme="dark"` (or `"light"`) on `<html>`.
- **Type:** Raleway only, weights 400/700. Hierarchy from weight + scale.
- **Color:** one amber accent (`--color-accent`) on ≤8% of the surface. Never two accents, never a gradient.
- **Dividers:** the 1px hairline is the only one. More whitespace, never a thicker rule.
- **Flat & rectilinear:** zero shadows, `--radius: 0`, no rounded corners, no left-border stripes.
- **Icons:** inline stroke SVGs at ~1.5px, `currentColor`, only on affordances. No icon font, no emoji.
- **Logo:** none exists — the typographic title block is the mark. Do not invent one.

## Components

Load `_ds_bundle.js` and read from `window.AndrewSolomonDesignSystem_12f855`:
Button, IconButton, Link, SectionHeader, Hairline (core);
TitleBlock, MetaRow, CVEvent, Footer (résumé).

See `readme.md` for the full design guide, `components/**/*.prompt.md` for usage,
`ui_kits/resume/` for a full composed example, and `templates/resume/` for an
editable starting point.
