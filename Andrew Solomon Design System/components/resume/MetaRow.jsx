import React from 'react';

/* Meta row — one contact/metadata line: bold label flush left, value pushed to
   the right edge. Stack several, then close with a Hairline. */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-meta-row-css')) return;
  const el = document.createElement('style');
  el.id = 'as-meta-row-css';
  el.textContent = `
.as-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-md);
  font-size: var(--type-label-size);
  line-height: 1.5;
}
.as-meta-row__label { font-weight: var(--weight-bold); letter-spacing: 0.02em; }
.as-meta-row__value { font-weight: var(--weight-regular); color: var(--color-type); }
.as-meta-row__link { text-decoration: none; transition: color var(--duration-fast) var(--ease-out-expo); }
.as-meta-row__link:hover, .as-meta-row__link:focus-visible { color: var(--color-accent); outline: none; }
`;
  document.head.appendChild(el);
})();

export function MetaRow({ label, value, href, className = '', ...rest }) {
  const cls = ['as-meta-row', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      <span className="as-meta-row__label">{label}</span>
      {href ? (
        <a className="as-meta-row__value as-meta-row__link" href={href}>{value}</a>
      ) : (
        <span className="as-meta-row__value">{value}</span>
      )}
    </div>
  );
}

export default MetaRow;
