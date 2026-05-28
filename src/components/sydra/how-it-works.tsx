const steps = [
  {
    n: "1",
    title: "Upload the EOB",
    body: "Paste or drag the EOB into Sydra. If your practice uses ModMed, the EOB data flows directly from your EMR through the Stedi clearinghouse integration. No copy paste. Sydra immediately runs an eligibility check: Is this claim NSA eligible? Is the plan type covered? Is there an active cooling off period for this CPT and payer combination? Has open negotiation been properly initiated?",
    note: "44% of 2024 IDR disputes were challenged as ineligible by payers. CMS data, Zelis analysis, March 2026. Eligibility errors are the leading cause of IDR processing delays. Sydra surfaces these before the submission, not after.",
  },
  {
    n: "2",
    title: "Review the draft",
    body: "Sydra generates a complete IDR submission packet using Claude Sonnet 4 on AWS Bedrock: executive summary, market rate justification from 213+ ingested determinations weighted toward surgical specialties, clinical necessity narrative drafted from your uploaded operative note (Bedrock multimodal reads the PDF directly), and provider credentials from your profile. Your billing team reads the draft, makes edits, and signs off. Nothing leaves the practice until a human has reviewed and approved it.",
  },
  {
    n: "3",
    title: "Export and submit",
    body: "One click DOCX export. The guided submission checklist walks your biller through the IDRE portal field by field. Track status in the Sydra dashboard. Total time on a standard single CPT claim with documents on file: under 5 minutes.",
  },
] as const;

export function SydraHowItWorks() {
  return (
    <section
      aria-labelledby="heading-how-it-works"
      className="border-b border-slate-100 bg-slate-50 py-16 md:py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <h2
          className="mx-auto max-w-3xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
          id="heading-how-it-works"
        >
          What your billing team actually does in Sydra.
        </h2>
        <div className="mt-12 space-y-8">
          {steps.map((s) => (
            <article
              key={s.n}
              className="rounded-xl border border-slate-200 bg-white p-6 md:p-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(0,40,184)]">
                Step {s.n}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[#1A2B48] md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                {s.body}
              </p>
              {"note" in s && s.note ? (
                <p className="mt-4 text-sm leading-relaxed text-slate-600 italic">
                  {s.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
