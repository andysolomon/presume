import React from 'react';

/* Square, hairline-bordered icon button — the smallest interactive affordance.
   Faithful to the resume's theme-toggle: 2.25rem square, transparent, amber on
   hover/focus, zero rounding. Glyphs are inline stroke SVGs (~1.5 stroke). */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-icon-btn-css')) return;
  const el = document.createElement('style');
  el.id = 'as-icon-btn-css';
  el.textContent = `
.as-icon-btn {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  background: transparent;
  border: var(--hairline-weight) solid var(--color-hairline);
  border-radius: var(--radius);
  color: var(--color-type);
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-out-expo),
    color var(--duration-fast) var(--ease-out-expo);
}
.as-icon-btn:hover,
.as-icon-btn:focus-visible { border-color: var(--color-accent); color: var(--color-accent); outline: none; }
.as-icon-btn:focus-visible { outline: var(--hairline-weight) solid var(--color-accent); outline-offset: 2px; }
.as-icon-btn:disabled { opacity: 0.45; pointer-events: none; }
.as-icon-btn__glyph { display: grid; place-items: center; }
.as-icon-btn__glyph svg {
  width: 0.95rem; height: 0.95rem;
  fill: none; stroke: currentColor; stroke-width: 1.5;
  stroke-linecap: round; stroke-linejoin: round;
}
`;
  document.head.appendChild(el);
})();

export function IconButton({ children, icon = null, ariaLabel, onClick, type = 'button', disabled = false, className = '', ...rest }) {
  const cls = ['as-icon-btn', className].filter(Boolean).join(' ');
  return (
    <button className={cls} type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled} {...rest}>
      <span className="as-icon-btn__glyph" aria-hidden="true">{icon || children}</span>
    </button>
  );
}

export default IconButton;
