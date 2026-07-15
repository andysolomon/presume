# Button

The one button idiom — a hairline-bordered, transparent, uppercase action that lifts to amber on hover/focus. Use it for any deliberate action (download, external link-as-action). There is intentionally **no** filled/primary button; a solid CTA reads as SaaS-landing slop, off-brand for the Engineering Letter.

```jsx
<Button href="/andrewsolomon.pdf" icon={<DownloadGlyph />}>Export PDF</Button>
<Button size="sm" onClick={save}>Save</Button>
```

Props: `children`, `href` (renders `<a>`), `onClick`, `icon` (leading glyph), `size` (`md` | `sm`), `disabled`, `type`. Keep labels short and verb-first.
