import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { textStyles } from "@/lib/typography";

const LINKS = [
  { href: "/how-it-works", label: "How Sydra works" },
  { href: "/pricing", label: "Compare pricing" },
  { href: "/security", label: "Security and HIPAA" },
  { href: "/faq", label: "Full FAQ" },
] as const;

type ServiceLinkHref = (typeof LINKS)[number]["href"];

type ServiceCrossLinksProps = {
  current: ServiceLinkHref | "/about" | "/contact" | "/demo";
};

export function ServiceCrossLinks({ current }: ServiceCrossLinksProps) {
  const related = LINKS.filter((link) => link.href !== current);

  return (
    <nav aria-label="Related pages" className="prose-measure mt-16 border-t border-rule pt-10">
      <h2 className={textStyles.subsectionTitle}>
        <ReviewHighlight>Explore related Sydra pages</ReviewHighlight>
      </h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {related.map((link) => (
          <li key={link.href}>
            <Link className={textStyles.textLink} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
