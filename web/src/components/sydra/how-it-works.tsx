const steps = [
  {
    n: "1",
    title: "Upload your case",
    body:
      "Drop in EOBs, op notes, patient notes, radiology, or scan a denial letter. Sydra pulls structured data automatically: CPT codes, dates, charges, patient demographics, and matches it against your provider profile.",
  },
  {
    n: "2",
    title: "Sydra drafts the submission",
    body:
      "Our AI, trained on hundreds of real IDR determinations, identifies the strongest argument for your specific CPT codes, cites prior wins, and assembles the executive summary, market rate analysis, and clinical narrative.",
  },
  {
    n: "3",
    title: "Review, export, submit",
    body:
      "You review the draft and edit anything you want. One click to copy for the IDRE portal or export as a submission ready DOCX with a guided checklist. Clearinghouse and EMR integration handles the upstream data flow.",
  },
] as const;

export function SydraHowItWorks() {
  return (
    <section
      className="border-b border-slate-100 bg-slate-50 py-16 md:py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          How it works
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]">
          Three steps from claim to submission
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <article
              key={s.n}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="inline-flex size-9 items-center justify-center rounded-md bg-blue-100 text-sm font-bold text-[#1A2B48]">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#1A2B48] md:text-xl">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
