import React from 'react';

/* CV event — one experience/education entry. Bold role + mid-grey company on
   the left, amber date on the right, a hairline, then a "·"-prefixed bullet
   stack. No icons, no left-borders, no fills — the rhythm and the rule are the
   whole treatment. */
(function () {
  if (typeof document === 'undefined' || document.getElementById('as-cv-event-css')) return;
  const el = document.createElement('style');
  el.id = 'as-cv-event-css';
  el.textContent = `
.as-cv-event { margin: var(--space-xl) 0 var(--space-2xl); }
.as-cv-event__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-xl);
  font-size: var(--type-body-size);
}
.as-cv-event__title-line { margin: 0; font-size: var(--type-title-size); font-weight: var(--weight-regular); line-height: var(--leading-snug); }
.as-cv-event__title { font-weight: var(--weight-bold); color: var(--color-type); }
.as-cv-event__company { color: var(--color-mid-type); font-weight: var(--weight-regular); }
.as-cv-event__sep { color: var(--color-mid-type); white-space: pre; }
.as-cv-event__company-link { text-decoration: none; transition: color var(--duration-fast) var(--ease-out-expo); }
.as-cv-event__company-link:hover, .as-cv-event__company-link:focus-visible { color: var(--color-accent); outline: none; }
.as-cv-event__date { font-size: var(--type-body-size); color: var(--color-accent); white-space: nowrap; transition: color var(--duration-base) var(--ease-out-expo); }
.as-cv-event__rule { border: 0; height: var(--hairline-weight); width: 100%; background: var(--color-hairline); margin: var(--space-md) 0 var(--space-lg); transition: background-color var(--duration-base) var(--ease-out-expo); }
.as-cv-event__bullets {
  list-style: none; padding: 0; margin: 0;
  font-size: var(--type-body-size); line-height: var(--leading-body);
  display: flex; flex-direction: column; gap: var(--space-sm);
}
.as-cv-event__bullets li { padding-left: 1.1em; text-indent: -1.1em; }
.as-cv-event__bullets li::before { content: '\\00b7'; padding-right: 0.7em; color: var(--color-type); }
@media (max-width: 640px) {
  .as-cv-event__header { flex-direction: column; align-items: flex-start; gap: var(--space-xs); }
}
`;
  document.head.appendChild(el);
})();

export function CVEvent({ title, company, companyHref, date, bullets = [], separator = ' \u2014 ', className = '', ...rest }) {
  const cls = ['as-cv-event', className].filter(Boolean).join(' ');
  return (
    <article className={cls} {...rest}>
      <header className="as-cv-event__header">
        <h3 className="as-cv-event__title-line">
          <strong className="as-cv-event__title">{title}</strong>
          {company ? <span className="as-cv-event__sep">{separator}</span> : null}
          {company && companyHref ? (
            <a className="as-cv-event__company as-cv-event__company-link" href={companyHref} target="_blank" rel="noopener noreferrer">{company}</a>
          ) : company ? (
            <span className="as-cv-event__company">{company}</span>
          ) : null}
        </h3>
        {date ? <time className="as-cv-event__date">{date}</time> : null}
      </header>
      <hr className="as-cv-event__rule" />
      {bullets.length ? (
        <ul className="as-cv-event__bullets">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ) : null}
    </article>
  );
}

export default CVEvent;
