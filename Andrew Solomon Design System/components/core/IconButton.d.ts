import type { ReactNode, MouseEventHandler } from 'react';

export interface IconButtonProps {
  /** The glyph — an inline stroke SVG. Alias of `icon`. */
  children?: ReactNode;
  /** The glyph, if not passed as children. */
  icon?: ReactNode;
  /** Required accessible label — the button has no visible text. */
  ariaLabel: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

/**
 * A 2.25rem square, hairline-bordered icon button — the smallest interactive
 * affordance (e.g. the theme toggle). Glyph inherits `currentColor` and lifts
 * to amber on hover/focus. Always pass `ariaLabel`.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
export default IconButton;
