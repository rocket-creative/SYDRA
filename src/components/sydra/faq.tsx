const faqs = [
  {
    q: "What does Sydra cost?",
    a: "Sydra is licensed per practice with annual pricing scaled to your submission volume. Most practices recover the license cost on their first 1 to 2 cases. Request a demo for a custom quote.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are up and running in under a week. We provision your tenant, import your provider profiles, connect your clearinghouse and EMR, and walk one of your billing leads through their first submission.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Strict tenant isolation, encrypted at rest and in transit, AWS BAA in place, role-based access for your staff. PHI is handled under HIPAA controls. We are happy to walk through our security posture with your compliance team before signing.",
  },
  {
    q: "What does Sydra do besides IDR?",
    a: "Sydra was built around IDR — that's still the biggest dollar win for most practices. But the same engine now drives real-time eligibility verification (270/271), prior authorization drafting with embedded payer policy, an AI compliance check against medical-necessity criteria, and a CPT assessor that reads your op notes directly. It's a practice-wide tool now, not just an IDR drafter.",
  },
  {
    q: "Does Sydra replace my biller?",
    a: "No. Your biller still handles charge capture, claim submission, and standard accounts receivable follow-up. Sydra sits alongside them and handles the high-judgment work AI is uniquely good at: IDR submissions, prior auth narratives, peer-to-peer prep, compliance audits, and CPT review from op notes. Practices keep their biller and add Sydra.",
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
              <p className="border-t border-slate-100 pb-4 pt-2 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
