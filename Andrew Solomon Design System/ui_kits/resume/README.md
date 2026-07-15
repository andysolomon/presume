# Résumé UI Kit

A high-fidelity recreation of the andrewsolomon.dev résumé site — the primary
product of this design system. Composes the design-system primitives; it does
not re-implement them.

## Files

- `index.html` — the full interactive résumé. Dark theme is canonical; the
  top-right `IconButton` flips dark/light (persisted to `localStorage` under
  `resume-theme`, matching the real site's pre-paint bootstrap). The top-left
  `Button` is the "Export PDF" action.
- `ResumeScreen.jsx` — the résumé composed from `TitleBlock`, `MetaRow`,
  `SectionHeader`, `CVEvent`, `Footer`, `Hairline`, and `Link`. Exports
  `ResumeScreen` and the `resumeData` content object to `window`.

## Fidelity notes

- Content is trimmed (fewer bullets/roles) from the generated `resumeData.ts`;
  the visual system is exact.
- The real site also serves two alternate résumé variants (`governmentResume`,
  `kapitusResume`) reachable via the eyebrow `Link`s under the title block —
  represented here as inert links.
- Source of truth: `andysolomon/presume` → `web/src/modules/c/app/`.
