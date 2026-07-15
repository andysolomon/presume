# MetaRow

One metadata line — a bold label flush left, its value pushed to the right edge (a `Location … Atlanta, Georgia` row). Stack several inside a `<section>` and close the group with a `Hairline`.

```jsx
<MetaRow label="Location" value="Atlanta, Georgia" />
<MetaRow label="Email" value="andrewsolomon.edu@gmail.com" href="mailto:andrewsolomon.edu@gmail.com" />
<Hairline />
```

Props: `label`, `value`, `href` (makes the value a link).
