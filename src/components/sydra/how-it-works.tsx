import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

const steps = [
  {
    n: "1",
    title: "Connect your practice",
    body:
      "EMR (ModMed today, more coming), Stedi clearinghouse for real-time eligibility, and provider profiles including CVs — ingested once. Multi-tenant from day one, so your data is yours.",
  },
  {
    n: "2",
    title: "Run every patient through Sydra",
    body:
      "Verify eligibility (270/271) at intake. Draft prior auths against embedded payer policy and run an AI compliance check. Read op notes for CPT coding. Each step compounds into stronger documentation for the next.",
  },
  {
    n: "3",
    title: "Win the IDR — or never need one",
    highlight: true,
    body:
      "When an out-of-network claim comes back underpaid, Sydra drafts a Federal or State IDR submission in minutes, citing real prior wins on your CPT codes. One-click DOCX export and a guided checklist for the IDRE portal.",
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
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          How it works
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
          id="heading-how-it-works"
        >
          One workflow. Every step of the claim.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Connect once. Run every patient through Sydra. IDR is the headline payoff, but the system earns its keep at every step before it.
        </p>
        <StaggerParent className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <StaggerChild key={s.n}>
              <article className={`group h-full rounded-xl border p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-8 ${"highlight" in s && s.highlight ? "border-blue-200 bg-blue-50/40 ring-1 ring-blue-200 hover:border-blue-300" : "border-slate-100 bg-white hover:border-slate-200"}`}>
                <div className="flex items-center justify-between">
                  <div className={`inline-flex size-9 items-center justify-center rounded-md text-sm font-bold transition-transform duration-300 ease-out group-hover:scale-110 ${"highlight" in s && s.highlight ? "bg-[#1A2B48] text-white" : "bg-blue-100 text-[#1A2B48]"}`}>
                    {s.n}
                  </div>
                  {"highlight" in s && s.highlight && (
                    <span className="rounded-full border border-blue-200 bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-blue-700">
                      Biggest payoff
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1A2B48] md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                  {s.body}
                </p>
              </article>
            </StaggerChild>
          ))}
        </StaggerParent>
      </div>
    </section>
  );
}
