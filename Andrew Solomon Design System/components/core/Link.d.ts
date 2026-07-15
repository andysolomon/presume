import type { ReactNode, MouseEventHandler } from 'react';

export interface LinkProps {
  children?: ReactNode;
  href?: string;
  /**
   * Which link idiom:
   * - `inline` (default): ink at rest, amber on hover — meta rows, in-prose links
   * - `accent`: amber at rest, ink on hover — footer links
   * - `eyebrow`: uppercase, tracked, amber→ink — small "View …" actions
   */
  variant?: 'inline' | 'accent' | 'eyebrow';
  onClick?: MouseEventHandler;
  className?: string;
}

/**
 * The system's text link, in three semantic idioms lifted from the resume.
 * Color is the only thing that moves — never an underline appearing on hover.
 */
export function Link(props: LinkProps): JSX.Element;
export default Link;
