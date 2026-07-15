import React from 'react';

/* The hairline — the ONE divider primitive. 1px, whisper-grey, full width.
   When a division needs to feel louder the answer is more space, never a
   thicker line. `spacing` sets the symmetric vertical margin. */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-hairline-css')) return;
  const el = document.createElement('style');
  el.id = 'as-hairline-css';
  el.textContent = `
.as-hairline {
  border: 0;
  height: var(--hairline-weight);
  width: 100%;
  background: var(--color-hairline);
  transition: background-color var(--duration-base) var(--ease-out-expo);
}
.as-hairline--none { margin: 0; }
.as-hairline--sm { margin: var(--space-sm) 0; }
.as-hairline--md { margin: var(--space-md) 0; }
.as-hairline--lg { margin: var(--space-lg) 0; }
.as-hairline--xl { margin: var(--space-xl) 0; }
`;
  document.head.appendChild(el);
})();

export function Hairline({ spacing = 'md', className = '', ...rest }) {
  const cls = ['as-hairline', `as-hairline--${spacing}`, className].filter(Boolean).join(' ');
  return <hr className={cls} {...rest} />;
}

export default Hairline;
