# Link

The system's text link in three semantic idioms — color is the only thing that animates, never a hover underline.

- `inline` (default): ink at rest → amber on hover. In-prose links, meta values.
- `accent`: amber at rest → ink on hover. Footer links.
- `eyebrow`: uppercase, 0.08em tracked, amber → ink. Small "View …" actions.

```jsx
<Link href="mailto:andrewsolomon.edu@gmail.com" variant="inline">andrewsolomon.edu@gmail.com</Link>
<Link href="/government" variant="eyebrow">View government experience</Link>
```

Props: `href`, `variant`, `children`, `onClick`.
