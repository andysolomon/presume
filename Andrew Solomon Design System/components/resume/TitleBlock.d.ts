export interface TitleBlockProps {
  /** Left word — the name. Default "Andrew Solomon". */
  name?: string;
  /** Right word — the document kind. Default "Resume". */
  title?: string;
  /** Optional subtitle line beneath (e.g. "Software Developer"). */
  subtitle?: string;
  /** When set, the name becomes a link (e.g. to LinkedIn), amber on hover. */
  nameHref?: string;
  className?: string;
}

/**
 * The single identity header: HUGE small-caps `name`, a vertical amber bar (the
 * one place the accent is a shape, not text), the `title` word, then an optional
 * subtitle. Appears exactly once, at the top of a document.
 */
export function TitleBlock(props: TitleBlockProps): JSX.Element;
export default TitleBlock;
