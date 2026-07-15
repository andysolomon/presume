export interface CVEventProps {
  /** Bold role / degree title. */
  title: string;
  /** Company / institution (mid-grey). */
  company?: string;
  /** When set, the company becomes an outbound link, amber on hover. */
  companyHref?: string;
  /** Right-aligned date range, in amber. */
  date?: string;
  /** Bullet lines — each rendered with a "·" prefix. */
  bullets?: string[];
  /** Separator between title and company. Default " — ". */
  separator?: string;
  className?: string;
}

/**
 * One experience/education entry: bold role + mid-grey company on the left,
 * amber date on the right, a hairline, then a "·"-prefixed bullet stack.
 * No icons, no left-border stripe, no fill — the two-column rhythm and the
 * hairline are the entire visual treatment.
 */
export function CVEvent(props: CVEventProps): JSX.Element;
export default CVEvent;
