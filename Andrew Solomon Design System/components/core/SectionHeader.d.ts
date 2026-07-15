import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  children?: ReactNode;
  /** Text alignment. Default `center` (the resume idiom). */
  align?: 'center' | 'start';
  /** Heading element to render. Default `h2`. */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

/**
 * The top-level section marker (Summary, Technical Skills, Experience …).
 * Centered, bold, amber, lightly tracked — the main appearance of the accent
 * in running content.
 */
export function SectionHeader(props: SectionHeaderProps): JSX.Element;
export default SectionHeader;
