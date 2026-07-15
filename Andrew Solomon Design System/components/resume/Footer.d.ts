export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  /** Links rendered centered, amber, separated by "·". */
  links?: FooterLink[];
  className?: string;
}

/**
 * A centered row of amber links, each separated by a "·" (matching the bullet
 * glyph). Links use the accent idiom — amber at rest, ink on hover. Pinned to
 * the bottom of a document.
 */
export function Footer(props: FooterProps): JSX.Element;
export default Footer;
