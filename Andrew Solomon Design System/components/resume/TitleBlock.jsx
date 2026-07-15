import React from 'react';

/* Title block — the single identity header. HUGE small-caps name, a vertical
   amber bar as the only divider, then the title word, then a subtitle.
   The bar is the one place the accent becomes a shape rather than text. */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-title-block-css')) return;
  const el = document.createElement('style');
  el.id = 'as-title-block-css';
  el.textContent = `
.as-title-block { text-align: center; }
.as-title-block__line {
  display: inline-flex;
  align-items: center;
  gap: var(--space-lg);
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--type-display-size);
  font-weight: var(--weight-regular);
  line-height: 1;
  letter-spacing: var(--type-display-tracking);
  font-variant: small-caps;
  text-transform: lowercase; /* lowercase + small-caps => true SMALL-CAPS */
  color: var(--color-type);
}
.as-title-block__bar {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  background: var(--color-accent);
  border-radius: var(--radius);
  transition: background-color var(--duration-base) var(--ease-out-expo);
}
.as-title-block__name-link { color: inherit; text-decoration: none; transition: color var(--duration-fast) var(--ease-out-expo); }
.as-title-block__name-link:hover, .as-title-block__name-link:focus-visible { color: var(--color-accent); outline: none; }
.as-title-block__name-link:focus-visible { outline: var(--hairline-weight) solid var(--color-accent); outline-offset: 4px; }
.as-title-block__subtitle {
  margin: var(--space-md) auto 0;
  max-width: 68ch;
  font-size: var(--type-subtitle-size);
  font-weight: var(--weight-regular);
  letter-spacing: 0.02em;
  color: var(--color-type);
}
@media (max-width: 640px) {
  .as-title-block__line { flex-direction: column; gap: var(--space-sm); }
  .as-title-block__bar { width: 1.2em; height: 2px; }
}
`;
  document.head.appendChild(el);
})();

export function TitleBlock({ name = 'Andrew Solomon', title = 'Resume', subtitle, nameHref, className = '', ...rest }) {
  const cls = ['as-title-block', className].filter(Boolean).join(' ');
  const nameEl = nameHref ? (
    <a className="as-title-block__name as-title-block__name-link" href={nameHref} target="_blank" rel="noopener noreferrer">{name}</a>
  ) : (
    <span className="as-title-block__name">{name}</span>
  );
  return (
    <header className={cls} {...rest}>
      <h1 className="as-title-block__line">
        {nameEl}
        <span className="as-title-block__bar" aria-hidden="true"></span>
        <span className="as-title-block__name">{title}</span>
      </h1>
      {subtitle ? <p className="as-title-block__subtitle">{subtitle}</p> : null}
    </header>
  );
}

export default TitleBlock;
