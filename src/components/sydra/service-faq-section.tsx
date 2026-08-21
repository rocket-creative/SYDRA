import type { ReactNode } from "react";

import { ReviewHighlight } from "@/components/sydra/review-highlight";

type ServiceFaqSectionProps = {
  id?: string;
  heading?: string;
  items: { q: string; a: string }[];
  highlightForReview?: boolean;
  /** Extra classes when stacked after sibling content in the same Section. */
  className?: string;
};

export function ServiceFaqSection({
  id = "heading-service-faq",
  heading = "Common questions",
  items,
  highlightForReview = true,
  className = "",
}: ServiceFaqSectionProps) {
  const wrap = (content: ReactNode) =>
    highlightForReview ? <ReviewHighlight>{content}</ReviewHighlight> : content;

  return (
    <section aria-labelledby={id} className={`prose-measure ${className}`.trim()}>
      <h2 className="type-h2 text-brand" id={id}>
        {wrap(heading)}
      </h2>
      <div className="mt-8 divide-y divide-[var(--color-rule)] border-y border-rule">
        {items.map((item) => (
          <details key={item.q} className="group py-0">
            <summary className="cursor-pointer list-none py-6 text-left [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-6">
                <h3 className="min-w-0 text-base font-normal text-brand md:text-[17px]">
                  {wrap(item.q)}
                </h3>
                <span
                  aria-hidden
                  className="type-caption shrink-0 text-body transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-rule pb-6 pt-2 text-[15px] leading-relaxed text-body">
              {wrap(item.a)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
