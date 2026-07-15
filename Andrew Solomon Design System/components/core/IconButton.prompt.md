# IconButton

A 2.25rem square, hairline-bordered icon button — the smallest interactive affordance in the system (the theme toggle is the canonical use). The glyph is an inline stroke SVG that inherits `currentColor` and lifts to amber on hover/focus. Icons are used sparingly; reach for this only when a labelled `Button` won't fit.

```jsx
<IconButton ariaLabel="Switch to light mode" onClick={toggle} icon={<SunGlyph />} />
```

Props: `icon` (or `children`), `ariaLabel` (required), `onClick`, `disabled`. Provide a 24×24 stroke SVG with `stroke-width` ~1.5.
