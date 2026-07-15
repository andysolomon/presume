import React from 'react';

/* Text link — three semantic idioms drawn straight from the resume:
   - inline  : ink at rest, amber on hover      (meta rows, in-prose links)
   - accent  : amber at rest, ink on hover       (footer links)
   - eyebrow : uppercase, tracked, amber -> ink   (the "View ... resume" links) */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-link-css')) return;
  const el = document.createElement('style');
  el.id = 'as-link-css';
  el.textContent = `
.as-link {
  text-decoration: none;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out-expo);
}
.as-link:focus-visible { outline: var(--hairline-weight) solid var(--color-accent); outline-offset: 2px; }
.as-link--inline { color: var(--color-type); }
.as-link--inline:hover, .as-link--inline:focus-visible { color: var(--color-accent); }
.as-link--accent { color: var(--color-accent); }
.as-link--accent:hover, .as-link--accent:focus-visible { color: var(--color-type); }
.as-link--eyebrow {
  color: var(--color-accent);
  font-size: var(--type-label-size);
  font-weight: var(--weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.as-link--eyebrow:hover, .as-link--eyebrow:focus-visible { color: var(--color-type); }
`;
  document.head.appendChild(el);
})();

export function Link({ children, href, variant = 'inline', onClick, className = '', ...rest }) {
  const cls = ['as-link', `as-link--${variant}`, className].filter(Boolean).join(' ');
  return (
    <a className={cls} href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

export default Link;
