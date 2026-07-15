# CVEvent

One experience or education entry. A bold role and mid-grey company sit on the left, an amber date on the right; a hairline separates the header from a `·`-prefixed bullet stack. No icons, no colored left-border, no background fill — the two-column rhythm and the single rule are the whole treatment.

```jsx
<CVEvent
  title="Senior Salesforce Engineer / Technical Lead"
  company="Thrivent Financial"
  companyHref="https://www.thrivent.com"
  date="2024 — Present"
  bullets={[
    'Built and scaled 2GP package pipelines across 33+ repositories.',
    'Developed LWC with GraphQL and Apex service layers.',
  ]}
/>
```

Props: `title`, `company`, `companyHref`, `date`, `bullets` (string[]), `separator`.
