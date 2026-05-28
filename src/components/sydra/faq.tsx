import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { HOMEPAGE_FAQ_SCHEMA } from "@/lib/seo/json-ld";
import {
  KRONOS_FULL_SERVICE_CTA,
  kronosCaseReviewUrl,
} from "@/lib/kronos-revenue";

const faqs = HOMEPAGE_FAQ_SCHEMA.map((item) => ({
  q: item.q,
  a: item.a,
}));

export function SydraFaq() {
  return (
    <Section ariaLabelledby="heading-faq" sidebarLabel="FAQ" tone="neutral">
      <h2 className="type-h2 prose-measure text-brand" id="heading-faq">
        Common questions
      </h2>
      <div className="mt-10 divide-y divide-[var(--color-rule)] border-y border-rule">
        {faqs.map((item) => (
          <details key={item.q} className="group py-0">
            <summary className="cursor-pointer list-none py-6 text-left text-base font-normal text-brand outline-none md:text-[17px] [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-6">
                {item.q}
                <span
                  aria-hidden
                  className="type-caption shrink-0 text-body transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-rule pb-6 pt-2 type-body text-body">
              <p>{item.a}</p>
              {item.q.includes("cost") || item.q.includes("difference") ? (
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <CtaLink href="/pricing">See pricing</CtaLink>
                  <CtaLink href="/demo">Schedule a demo</CtaLink>
                  <a
                    className="cta-link group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-hero)] hover:text-[var(--color-accent)]"
                    href={kronosCaseReviewUrl()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {KRONOS_FULL_SERVICE_CTA}
                  </a>
                </p>
              ) : null}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-8">
        <CtaLink href="/faq">See all FAQs</CtaLink>
      </p>
    </Section>
  );
}
