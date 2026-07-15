import React from 'react';

/* Footer — centered row of amber links, each separated by a "·". The links use
   the accent idiom (amber at rest, ink on hover). */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-footer-css')) return;
  const el = document.createElement('style');
  el.id = 'as-footer-css';
  el.textContent = `
.as-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  text-align: center;
  font-size: var(--type-body-size);
  padding: var(--space-2xl) 0 var(--space-xl);
}
.as-footer__link { color: var(--color-accent); text-decoration: none; transition: color var(--duration-fast) var(--ease-out-expo); }
.as-footer__link:hover, .as-footer__link:focus-visible { color: var(--color-type); outline: none; }
.as-footer__link:not(:last-child)::after { content: '\\00b7'; color: var(--color-accent); padding: 0 0.5em; }
`;
  document.head.appendChild(el);
})();

export function Footer({ links = [], className = '', ...rest }) {
  const cls = ['as-footer', className].filter(Boolean).join(' ');
  return (
    <footer className={cls} {...rest}>
      {links.map((l, i) => (
        <a key={i} className="as-footer__link" href={l.href}>{l.label}</a>
      ))}
    </footer>
  );
}

export default Footer;
