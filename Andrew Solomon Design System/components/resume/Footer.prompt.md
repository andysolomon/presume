# Footer

A centered row of amber links, each separated by a `·` (the same glyph the bullets use). Links use the accent idiom — amber at rest, ink on hover. Pin it to the bottom of a document.

```jsx
<Footer
  links={[
    { label: 'linkedin.com/in/andysolomon', href: 'https://www.linkedin.com/in/andrew-solomon-44550a24/' },
    { label: 'github.com/andysolomon', href: 'https://github.com/andysolomon' },
  ]}
/>
```

Props: `links` — array of `{ label, href }`.
