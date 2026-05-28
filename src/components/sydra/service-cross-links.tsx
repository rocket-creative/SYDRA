import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";

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

/** Internal links between service pages for SEO and navigation. */
export function ServiceCrossLinks({ current }: ServiceCrossLinksProps) {
  const related = LINKS.filter((link) => link.href !== current);

  return (
    <nav aria-label="Related pages" className="mx-auto mt-16 max-w-3xl border-t border-slate-200 pt-10">
      <h2 className="text-lg font-semibold text-[#1A2B48]">
        <ReviewHighlight>Explore related Sydra pages</ReviewHighlight>
      </h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        {related.map((link) => (
          <li key={link.href}>
            <Link
              className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
