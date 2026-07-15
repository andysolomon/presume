import React from 'react';

/* Section header — the top-level section marker (Summary, Experience, …).
   Centered, bold, amber, lightly tracked. This is the primary place the accent
   appears in running content. */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-section-header-css')) return;
  const el = document.createElement('style');
  el.id = 'as-section-header-css';
  el.textContent = `
.as-section-header {
  margin: 0 0 var(--space-lg);
  font-family: var(--font-sans);
  font-size: var(--type-headline-size);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: 0.04em;
  color: var(--color-accent);
  transition: color var(--duration-base) var(--ease-out-expo);
}
.as-section-header--center { text-align: center; }
.as-section-header--start { text-align: left; }
`;
  document.head.appendChild(el);
})();

export function SectionHeader({ children, align = 'center', as = 'h2', className = '', ...rest }) {
  const Tag = as;
  const cls = ['as-section-header', `as-section-header--${align}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}

export default SectionHeader;
