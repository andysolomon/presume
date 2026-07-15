import type { ReactNode, MouseEventHandler } from 'react';

export interface ButtonProps {
  /** Label / content. Rendered uppercase with 0.08em tracking. */
  children?: ReactNode;
  /** When set, renders an `<a>` (link action) instead of a `<button>`. */
  href?: string;
  /** Click handler. */
  onClick?: MouseEventHandler;
  /** Optional leading glyph (inline stroke SVG). The system uses icons sparingly. */
  icon?: ReactNode;
  /** `md` (default) or the tighter `sm` used on small screens. */
  size?: 'md' | 'sm';
  /** Disabled state (button only). */
  disabled?: boolean;
  /** Native button type when rendered as a `<button>`. */
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * The single button idiom: a hairline-bordered, transparent, uppercase action
 * that lifts to amber on hover/focus. There is intentionally no filled/primary
 * variant — a solid CTA is an off-brand SaaS-landing pattern.
 */
export function Button(props: ButtonProps): JSX.Element;
export default Button;
