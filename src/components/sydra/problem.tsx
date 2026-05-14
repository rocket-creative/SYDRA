export function SydraProblem() {
  return (
    <section aria-labelledby="heading-problem" className="border-b border-slate-100 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2
              className="text-[1.55rem] font-semibold leading-snug tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2rem]"
              id="heading-problem"
            >
              Insurers obstruct payment at every step. IDR is where the biggest money lives.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
              Eligibility rejections at intake. Denied prior authorizations. Downcoded charges.
              And finally, underpaid out-of-network claims. Each step bleeds revenue,
              and the staff time required to fight back is what most practices can&apos;t spare.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
              The No Surprises Act gave providers the right to dispute underpayments through
              Independent Dispute Resolution — the single highest-leverage recovery in
              the workflow. Sydra wins those disputes in minutes instead of hours, and brings
              the same AI rigor to the pre-visit, coding, and compliance steps that lead up to them.
            </p>
            <p className="mt-4 text-base font-semibold text-[#1A2B48] md:text-[17px]">
              IDR-led. End-to-end. One platform.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
              What Sydra delivers
            </p>
            <ul className="space-y-3">
              {[
                "Real-time eligibility verification at intake (270/271)",
                "AI-drafted prior auth narratives and peer-to-peer prep",
                "AI gap analysis against payer medical-necessity rules",
                "CPT codes proposed directly from your op notes",
                "Federal and State IDR submissions cited to real wins",
                "Submission-ready DOCX export with guided checklist",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#4A5568] md:text-[15px]">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-600/15 text-[11px] font-bold text-blue-700" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
