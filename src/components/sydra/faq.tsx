import Link from "next/link";

import { pricingFaqAnswer } from "@/lib/content/tiers";

const faqs = [
  {
    q: "What does Sydra cost?",
    hasPlansLink: true,
    a: pricingFaqAnswer(),
  },
  {
    q: "How long does the demo take?",
    a: "About 15 minutes for the walkthrough, plus 5 to 10 minutes of Q&A if you want it. A Kronos specialist runs the call, with Chelsea joining for software focused questions.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are up and running in under a week. We provision your tenant, connect your clearinghouse, and walk one billing lead through their first submission.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Strict tenant isolation, encrypted at rest and in transit, AWS BAA in place, role based access for your staff. PHI is handled under HIPAA controls.",
  },
  {
    q: "How does Sydra compare to using an IDR attorney?",
    a: "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs — quoted on a demo call, structured below typical contingency fees. You keep the workflow and more of the win. If you want every claim handled for you, Kronos Full-Service on Kronos Revenue is the outsourced option.",
  },
  {
    q: "What does Sydra do besides IDR?",
    a: "NSA IDR is the primary focus. Sydra also includes eligibility verification, prior authorization drafting, CPT review from op notes, and compliance checks — supporting tools in the same platform when your team wants them.",
  },
  {
    q: "When should we look at Kronos Full-Service?",
    hasKronosLink: true,
    a: "High volume practices that do not want to operate software themselves should look at Kronos Full-Service on our sister site. Kronos runs every claim end to end.",
  },
] as const;

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
                {"hasPlansLink" in item && item.hasPlansLink ? (
                  <p className="mt-3">
                    <Link
                      className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
                      href="/plans"
                    >
                      Compare all plans
                    </Link>
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
