import Link from "next/link";

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
    <section aria-labelledby="heading-faq" className="border-b border-slate-100 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[720px] xl:px-8">
        <h2
          className="text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl"
          id="heading-faq"
        >
          Common questions
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white px-4 py-1 shadow-sm transition-all duration-300 ease-out open:border-slate-300 open:shadow-md hover:border-slate-300/90 md:px-5"
            >
              <summary className="cursor-pointer list-none py-4 text-left text-base font-semibold text-[#1A2B48] outline-none ring-offset-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 md:text-[17px] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span
                    className="text-slate-400 transition-transform duration-300 ease-out group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <div className="border-t border-slate-100 pb-4 pt-2 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                <p>{item.a}</p>
                {item.q.includes("cost") || item.q.includes("difference") ? (
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    <Link
                      className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
                      href="/pricing"
                    >
                      See pricing
                    </Link>
                    <Link
                      className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
                      href="/demo"
                    >
                      Schedule a demo
                    </Link>
                    <a
                      className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
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
        <p className="mt-8 text-center">
          <Link
            className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
            href="/faq"
          >
            See all FAQs →
          </Link>
        </p>
      </div>
    </section>
  );
}
