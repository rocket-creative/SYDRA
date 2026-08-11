import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { textStyles } from "@/lib/typography";

const LINKS = [
  { href: "/idr", label: "Federal IDR benchmarks" },
  { href: "/idr-filing-deadline", label: "IDR filing deadline" },
  { href: "/idr-for-billing-companies", label: "IDR for billing companies" },
  { href: "/in-house-idr", label: "In house IDR" },
  { href: "/sydra-vs-idr-attorney", label: "Sydra vs an IDR attorney" },
  { href: "/how-it-works", label: "How Sydra works" },
  { href: "/pricing", label: "Compare pricing" },
  { href: "/idr-recovery-calculator", label: "IDR recovery calculator" },
  { href: "/security", label: "Security and HIPAA" },
  { href: "/resources", label: "IDR resources" },
  { href: "/resources/updates", label: "Resource updates" },
  { href: "/glossary", label: "IDR glossary" },
  { href: "/faq", label: "Full FAQ" },
] as const;

type ServiceCrossLinksProps = {
  current: string;
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
