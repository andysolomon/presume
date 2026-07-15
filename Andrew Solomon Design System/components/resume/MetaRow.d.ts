export interface MetaRowProps {
  /** Bold field label (e.g. "Location", "Email"). */
  label: string;
  /** The value text. */
  value: string;
  /** When set, the value becomes a link, amber on hover. */
  href?: string;
  className?: string;
}

/**
 * One metadata line — bold label flush left, value pushed to the right edge.
 * Stack a few and close the group with a `Hairline`.
 */
export function MetaRow(props: MetaRowProps): JSX.Element;
export default MetaRow;
