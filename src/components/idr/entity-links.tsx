import Link from "next/link";

import { textStyles } from "@/lib/typography";

export type EntityLink = { name: string; href: string };

type EntityLinksProps = {
  title: string;
  links: EntityLink[];
  /** Render as a wrapping pill row instead of a stacked list. */
  inline?: boolean;
};

/**
 * Internal-linking block that ties the entity graph together (code hub <-> state
 * <-> payer <-> specialty). Strong internal linking is what lets the broad
 * surface get discovered and crawled.
 */
export function EntityLinks({ title, links, inline = false }: EntityLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title}>
      <h2 className={textStyles.subsectionTitle}>{title}</h2>
      {inline ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="inline-flex items-center border border-rule px-3 py-1.5 text-[13px] uppercase tracking-[0.06em] text-brand transition-colors hover:border-body/40"
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link className={textStyles.textLink} href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
