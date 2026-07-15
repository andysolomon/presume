# TitleBlock

The single identity header: small-caps `name`, a vertical amber bar (the one place the accent becomes a shape rather than text), the `title` word, and an optional subtitle. Appears exactly once, at the top of a document. On narrow screens it stacks and the bar turns horizontal.

```jsx
<TitleBlock
  name="Andrew Solomon"
  title="Resume"
  subtitle="Software Developer"
  nameHref="https://www.linkedin.com/in/andrew-solomon-44550a24/"
/>
```

Props: `name`, `title`, `subtitle`, `nameHref`. Reserve the small-caps display treatment for this block alone.
