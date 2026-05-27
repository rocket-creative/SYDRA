import type { ReactNode } from "react";

import { ReviewHighlight } from "@/components/sydra/review-highlight";

type ServiceFaqSectionProps = {
  id?: string;
  heading?: string;
  items: { q: string; a: string }[];
  /** When true, wraps FAQ copy added during SEO implementation for human review. */
  highlightForReview?: boolean;
};

export function ServiceFaqSection({
  id = "heading-service-faq",
  heading = "Common questions",
  items,
  highlightForReview = true,
}: ServiceFaqSectionProps) {
  const wrap = (content: ReactNode) =>
    highlightForReview ? <ReviewHighlight>{content}</ReviewHighlight> : content;

  return (
    <section aria-labelledby={id} className="mx-auto mt-16 max-w-3xl">
      <h2 className="text-xl font-semibold text-[#1A2B48]" id={id}>
        {wrap(heading)}
      </h2>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-slate-200 bg-white px-4 py-1 shadow-sm open:border-slate-300 md:px-5"
          >
            <summary className="cursor-pointer list-none py-4 text-left text-base font-semibold text-[#1A2B48] outline-none ring-offset-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 md:text-[17px] [&::-webkit-details-marker]:hidden">
              {wrap(item.q)}
            </summary>
            <div className="border-t border-slate-100 pb-4 pt-2 text-[15px] leading-relaxed text-[#4A5568]">
              {wrap(item.a)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
