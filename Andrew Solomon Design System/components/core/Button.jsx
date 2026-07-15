import React from 'react';

/* Hairline-bordered action — the ONLY button idiom in the system.
   Faithful to the resume's `.pdf-export` control: transparent ground, 1px
   hairline border, uppercase label, amber on hover/focus. There is deliberately
   NO filled/primary button (a filled CTA is the SaaS-landing anti-reference). */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-btn-css')) return;
  const el = document.createElement('style');
  el.id = 'as-btn-css';
  el.textContent = `
.as-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: var(--hairline-weight) solid var(--color-hairline);
  border-radius: var(--radius);
  color: var(--color-type);
  font-family: var(--font-sans);
  font-size: var(--type-label-size);
  font-weight: var(--weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  line-height: 1;
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-out-expo),
    color var(--duration-fast) var(--ease-out-expo);
}
.as-btn:hover,
.as-btn:focus-visible { border-color: var(--color-accent); color: var(--color-accent); outline: none; }
.as-btn:focus-visible { outline: var(--hairline-weight) solid var(--color-accent); outline-offset: 2px; }
.as-btn--sm { padding: 0.4rem 0.55rem; gap: var(--space-sm); }
.as-btn:disabled, .as-btn[aria-disabled="true"] { opacity: 0.45; pointer-events: none; }
.as-btn__icon { display: block; flex-shrink: 0; }
.as-btn__icon svg { display: block; }
`;
  document.head.appendChild(el);
})();

export function Button({
  children,
  href,
  onClick,
  icon = null,
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const cls = ['as-btn', size === 'sm' ? 'as-btn--sm' : '', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon ? <span className="as-btn__icon" aria-hidden="true">{icon}</span> : null}
      {children != null ? <span className="as-btn__label">{children}</span> : null}
    </>
  );
  if (href && !disabled) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}

export default Button;
