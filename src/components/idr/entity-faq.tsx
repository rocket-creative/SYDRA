import { textStyles } from "@/lib/typography";

export type EntityFaqItem = { q: string; a: string };

type EntityFaqProps = {
  heading?: string;
  items: EntityFaqItem[];
};

/**
 * Presentational FAQ list. The matching FAQPage JSON-LD is emitted at the page
 * level via faqPageJsonLd so the two never drift.
 */
export function EntityFaq({ heading = "Common questions.", items }: EntityFaqProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className={textStyles.sectionTitle}>{heading}</h2>
      <div className="mt-6 max-w-2xl divide-y divide-[var(--color-rule)] border-y border-rule">
        {items.map((item) => (
          <details className="group py-0" key={item.q}>
            <summary className="cursor-pointer list-none py-6 text-left text-base font-normal text-brand md:text-[17px] [&::-webkit-details-marker]:hidden">
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
            <div className="border-t border-rule pb-6 pt-2 text-[15px] leading-relaxed text-body">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
