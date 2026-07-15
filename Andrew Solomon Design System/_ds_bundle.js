/* @ds-bundle: {"format":4,"namespace":"AndrewSolomonDesignSystem_12f855","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Hairline","sourcePath":"components/core/Hairline.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Link","sourcePath":"components/core/Link.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"CVEvent","sourcePath":"components/resume/CVEvent.jsx"},{"name":"Footer","sourcePath":"components/resume/Footer.jsx"},{"name":"MetaRow","sourcePath":"components/resume/MetaRow.jsx"},{"name":"TitleBlock","sourcePath":"components/resume/TitleBlock.jsx"}],"sourceHashes":{"components/core/Button.jsx":"42f8378e0d84","components/core/Hairline.jsx":"a97a00dc64ac","components/core/IconButton.jsx":"78f923358070","components/core/Link.jsx":"1f92869828eb","components/core/SectionHeader.jsx":"0a7e86d1c6f8","components/resume/CVEvent.jsx":"42d6a374ff38","components/resume/Footer.jsx":"8b912d623b21","components/resume/MetaRow.jsx":"af36a5de1b22","components/resume/TitleBlock.jsx":"38fe25180812","ui_kits/resume/ResumeScreen.jsx":"dde865e5caec"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AndrewSolomonDesignSystem_12f855 = window.AndrewSolomonDesignSystem_12f855 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement("span", {
    className: "as-btn__icon",
    "aria-hidden": "true"
  }, icon) : null, children != null ? /*#__PURE__*/React.createElement("span", {
    className: "as-btn__label"
  }, children) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href,
      onClick: onClick
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    onClick: onClick,
    disabled: disabled
  }, rest), inner);
}
Object.assign(__ds_scope, { Button, __ds_default_components_core_Button_51d4zy: Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Hairline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Hairline({
  spacing = 'md',
  className = '',
  ...rest
}) {
  const cls = ['as-hairline', `as-hairline--${spacing}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("hr", _extends({
    className: cls
  }, rest));
}
Object.assign(__ds_scope, { Hairline, __ds_default_components_core_Hairline_1axf1by: Hairline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Hairline.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function IconButton({
  children,
  icon = null,
  ariaLabel,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  const cls = ['as-icon-btn', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    "aria-label": ariaLabel,
    onClick: onClick,
    disabled: disabled
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "as-icon-btn__glyph",
    "aria-hidden": "true"
  }, icon || children));
}
Object.assign(__ds_scope, { IconButton, __ds_default_components_core_IconButton_p7lntj: IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Link.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Link({
  children,
  href,
  variant = 'inline',
  onClick,
  className = '',
  ...rest
}) {
  const cls = ['as-link', `as-link--${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href,
    onClick: onClick
  }, rest), children);
}
Object.assign(__ds_scope, { Link, __ds_default_components_core_Link_pwkvi8: Link });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Link.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function SectionHeader({
  children,
  align = 'center',
  as = 'h2',
  className = '',
  ...rest
}) {
  const Tag = as;
  const cls = ['as-section-header', `as-section-header--${align}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { SectionHeader, __ds_default_components_core_SectionHeader_11f61e8: SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/resume/CVEvent.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function CVEvent({
  title,
  company,
  companyHref,
  date,
  bullets = [],
  separator = ' \u2014 ',
  className = '',
  ...rest
}) {
  const cls = ['as-cv-event', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("header", {
    className: "as-cv-event__header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "as-cv-event__title-line"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "as-cv-event__title"
  }, title), company ? /*#__PURE__*/React.createElement("span", {
    className: "as-cv-event__sep"
  }, separator) : null, company && companyHref ? /*#__PURE__*/React.createElement("a", {
    className: "as-cv-event__company as-cv-event__company-link",
    href: companyHref,
    target: "_blank",
    rel: "noopener noreferrer"
  }, company) : company ? /*#__PURE__*/React.createElement("span", {
    className: "as-cv-event__company"
  }, company) : null), date ? /*#__PURE__*/React.createElement("time", {
    className: "as-cv-event__date"
  }, date) : null), /*#__PURE__*/React.createElement("hr", {
    className: "as-cv-event__rule"
  }), bullets.length ? /*#__PURE__*/React.createElement("ul", {
    className: "as-cv-event__bullets"
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, b))) : null);
}
Object.assign(__ds_scope, { CVEvent, __ds_default_components_resume_CVEvent_2pojh1: CVEvent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/resume/CVEvent.jsx", error: String((e && e.message) || e) }); }

// components/resume/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Footer({
  links = [],
  className = '',
  ...rest
}) {
  const cls = ['as-footer', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: cls
  }, rest), links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "as-footer__link",
    href: l.href
  }, l.label)));
}
Object.assign(__ds_scope, { Footer, __ds_default_components_resume_Footer_1kcm6ll: Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/resume/Footer.jsx", error: String((e && e.message) || e) }); }

// components/resume/MetaRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function MetaRow({
  label,
  value,
  href,
  className = '',
  ...rest
}) {
  const cls = ['as-meta-row', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "as-meta-row__label"
  }, label), href ? /*#__PURE__*/React.createElement("a", {
    className: "as-meta-row__value as-meta-row__link",
    href: href
  }, value) : /*#__PURE__*/React.createElement("span", {
    className: "as-meta-row__value"
  }, value));
}
Object.assign(__ds_scope, { MetaRow, __ds_default_components_resume_MetaRow_dtmxsp: MetaRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/resume/MetaRow.jsx", error: String((e && e.message) || e) }); }

// components/resume/TitleBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function TitleBlock({
  name = 'Andrew Solomon',
  title = 'Resume',
  subtitle,
  nameHref,
  className = '',
  ...rest
}) {
  const cls = ['as-title-block', className].filter(Boolean).join(' ');
  const nameEl = nameHref ? /*#__PURE__*/React.createElement("a", {
    className: "as-title-block__name as-title-block__name-link",
    href: nameHref,
    target: "_blank",
    rel: "noopener noreferrer"
  }, name) : /*#__PURE__*/React.createElement("span", {
    className: "as-title-block__name"
  }, name);
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("h1", {
    className: "as-title-block__line"
  }, nameEl, /*#__PURE__*/React.createElement("span", {
    className: "as-title-block__bar",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "as-title-block__name"
  }, title)), subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "as-title-block__subtitle"
  }, subtitle) : null);
}
Object.assign(__ds_scope, { TitleBlock, __ds_default_components_resume_TitleBlock_4htynb: TitleBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/resume/TitleBlock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/resume/ResumeScreen.jsx
try { (() => {
/* Full résumé data — trimmed from web/src/modules/c/resumeData/resumeData.ts.
   Loaded as a raw <script type="text/babel"> — no module import/export. */
const resumeData = {
  header: {
    name: 'Andrew Solomon',
    title: 'Resume',
    subtitle: 'Software Developer',
    nameHref: 'https://www.linkedin.com/in/andrew-solomon-44550a24/'
  },
  meta: [{
    label: 'Location',
    value: 'Atlanta, Georgia'
  }, {
    label: 'Portfolio',
    value: 'andrewsolomon.dev',
    href: 'https://andrewsolomon.dev'
  }, {
    label: 'Email',
    value: 'andrewsolomon.edu@gmail.com',
    href: 'mailto:andrewsolomon.edu@gmail.com'
  }],
  summary: 'Senior Salesforce Engineer & Technical Lead with 15+ years of software development experience and 20+ full end-to-end Salesforce implementations. Deep Apex specialist across trigger frameworks, asynchronous processing, batch integrations, fflib patterns, governor-limit optimization, and enterprise test architecture. Expert in Lightning Web Components, Apex, 2nd-generation packages, and Experience Cloud. Proven track record leading technical teams, establishing engineering standards, and delivering enterprise-scale solutions for Fortune 500 companies and federal agencies, including the VA. Security-first approach with deep expertise in sharing models, persona-based testing, CRUD/FLS enforcement, and least-privilege Apex design. Holds an active national security clearance.',
  skills: [{
    label: 'Salesforce',
    value: 'Apex, LWC, SOQL, SOSL, Trigger Frameworks, Async Apex, fflib, Experience Cloud, OmniStudio, 2GP Packages, Flow'
  }, {
    label: 'Design',
    value: 'Figma, SLDS 2, Design Tokens, IBM Carbon Design System, Sass'
  }, {
    label: 'AI',
    value: 'OpenAI, Claude API, AI Agents, Prompt Engineering, MCP'
  }, {
    label: 'DevOps',
    value: 'GitHub Actions, SonarQube, SFDX, Vercel, Jest, Playwright'
  }, {
    label: 'Frontend',
    value: 'TypeScript, React, Next.js, Tailwind CSS, GraphQL, Redux, LWC'
  }, {
    label: 'Backend',
    value: 'Node, Java, Supabase, Cloudflare Workers, Vercel Functions, REST APIs, AWS S3'
  }],
  experience: [{
    date: '2024 — Present',
    title: 'Senior Salesforce Engineer / Technical Lead',
    company: 'Thrivent Financial',
    companyHref: 'https://www.thrivent.com',
    bullets: ['Built and scaled 2GP package pipelines across 33+ repositories, managing multiple SFDX projects in parallel across multi-tier environments', 'Developed Lightning Web Components with GraphQL and Apex service layers that integrate with Java-based connected apps for external clients', 'Architected a Salesforce Bulk API 2.0 + Amazon S3 pipeline that streams large-scale query results to S3 and generates custom object artifacts', 'Established Apex and LWC testing standards, including dependency-isolated unit tests, templated Jest guidance, and Playwright automation']
  }, {
    date: '2023 — 2024',
    title: 'Senior Salesforce Developer',
    company: 'MagMutual',
    companyHref: 'https://www.magmutual.com',
    bullets: ['Led development of a Lightning Web Components platform serving 10,000+ healthcare professionals, improving engagement by 30%', 'Architected an enterprise Git workflow with GitHub Actions, reducing deployment time by 40% across 5 teams', 'Designed a component library based on IBM Carbon Design System, deployed across 3 customer-facing applications']
  }, {
    date: '2022 — 2023',
    title: 'Senior Salesforce Developer',
    company: 'Department of Veterans Affairs — PSIP',
    companyHref: '',
    bullets: ['Designed and delivered a Salesforce case management system for the VA Personnel Security & Investigations Program', 'Built an Experience Cloud portal for 10,000+ applicants to submit forms and track case status', 'Hardened Apex document access with Security.stripInaccessible(), CRUD/FLS checks, and persona-based testing']
  }, {
    date: '2018 — 2022',
    title: 'Lead Frontend Engineer',
    company: 'CodeScience',
    companyHref: 'https://www.codescience.com',
    bullets: ['Delivered enterprise Salesforce solutions for Fortune 500 clients including RingCentral and Ford, serving 50,000+ daily users', 'Core contributor to Salesforce DevOps Center, improving deployment efficiency for 1000+ organizations', 'Mentored a team of 8 developers in modern JavaScript practices and Salesforce development']
  }],
  education: [{
    date: '2005 — 2010',
    title: 'B.Sc. Computer Science',
    company: 'Albany State University',
    companyHref: 'https://www.asurams.edu',
    bullets: ['Graduated with 3.8 GPA, focus on algorithms and information security', 'Led development of a security research platform used by 500+ students']
  }],
  footer: [{
    label: 'linkedin.com/in/andysolomon',
    href: 'https://www.linkedin.com/in/andrew-solomon-44550a24/'
  }, {
    label: 'github.com/andysolomon',
    href: 'https://github.com/andysolomon'
  }]
};

/* Résumé screen — the full andrewsolomon.dev résumé, composed from primitives.
   Depends on the DS bundle globals being present on window. */
function ResumeScreen({
  ns
}) {
  const {
    TitleBlock,
    MetaRow,
    SectionHeader,
    CVEvent,
    Footer,
    Hairline,
    Link
  } = ns;
  const d = resumeData;
  return /*#__PURE__*/React.createElement("main", {
    className: "resume-sheet",
    "aria-label": "Andrew Solomon \u2014 R\xE9sum\xE9"
  }, /*#__PURE__*/React.createElement(TitleBlock, {
    name: d.header.name,
    title: d.header.title,
    subtitle: d.header.subtitle,
    nameHref: d.header.nameHref
  }), /*#__PURE__*/React.createElement("div", {
    className: "alt-row"
  }, /*#__PURE__*/React.createElement(Link, {
    href: "#",
    variant: "eyebrow"
  }, "View government experience"), /*#__PURE__*/React.createElement(Link, {
    href: "#",
    variant: "eyebrow"
  }, "View Salesforce Tech Lead resume")), /*#__PURE__*/React.createElement("section", {
    className: "meta-block"
  }, d.meta.map(m => /*#__PURE__*/React.createElement(MetaRow, {
    key: m.label,
    label: m.label,
    value: m.value,
    href: m.href
  })), /*#__PURE__*/React.createElement(Hairline, {
    spacing: "md"
  })), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionHeader, null, "Summary"), /*#__PURE__*/React.createElement("p", {
    className: "prose"
  }, d.summary)), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionHeader, null, "Technical Skills"), /*#__PURE__*/React.createElement("ul", {
    className: "skills"
  }, d.skills.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "skill-label"
  }, s.label), " ", s.value)))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionHeader, null, "Experience"), d.experience.map((e, i) => /*#__PURE__*/React.createElement(CVEvent, {
    key: i,
    title: e.title,
    company: e.company,
    companyHref: e.companyHref,
    date: e.date,
    bullets: e.bullets
  }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionHeader, null, "Education"), d.education.map((e, i) => /*#__PURE__*/React.createElement(CVEvent, {
    key: i,
    title: e.title,
    company: e.company,
    companyHref: e.companyHref,
    date: e.date,
    bullets: e.bullets
  }))), /*#__PURE__*/React.createElement(Footer, {
    links: d.footer
  }));
}
Object.assign(window, {
  ResumeScreen,
  resumeData
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/resume/ResumeScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Hairline = __ds_scope.Hairline;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Link = __ds_scope.Link;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.CVEvent = __ds_scope.CVEvent;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.MetaRow = __ds_scope.MetaRow;

__ds_ns.TitleBlock = __ds_scope.TitleBlock;

})();
