"use client";

import { useState } from "react";

import { Arrow } from "@/components/ui/arrow";
import { Section } from "@/components/ui/section";
import { buildFaqs } from "@/lib/landing/faqs";

type FaqProps = {
  stateDisplay?: string | null;
};

export function Faq({ stateDisplay = null }: FaqProps) {
  const faqs = buildFaqs(stateDisplay);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section ariaLabelledby="heading-faq" id="faq" sidebarLabel="FAQ" tone="neutral">
      <h2 className="type-h2 prose-measure text-brand" id="heading-faq">
        Common questions
      </h2>
      <div className="mt-10 divide-y divide-[var(--color-rule)] border-y border-rule">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q}>
              <h3>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left text-base font-normal text-brand outline-none md:text-[17px]"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.q}</span>
                  <Arrow
                    className={`mt-1.5 shrink-0 text-body transition-transform duration-300 [transition-timing-function:var(--ease-out)] ${isOpen ? "rotate-180" : ""}`}
                    direction="down"
                  />
                </button>
              </h3>
              <div
                aria-hidden={!isOpen}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 [transition-timing-function:var(--ease-out)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0">
                  <div className="border-t border-rule pb-6 pt-2 type-body text-body">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
