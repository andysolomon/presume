export interface HairlineProps {
  /** Symmetric vertical margin around the rule. Default `md`. */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * The single divider primitive: a 1px whisper-grey rule, full width. It is the
 * only horizontal division in the system — no thicker borders, no filled bars,
 * no boxes. If it feels insufficient, add whitespace, not weight.
 */
export function Hairline(props: HairlineProps): JSX.Element;
export default Hairline;
