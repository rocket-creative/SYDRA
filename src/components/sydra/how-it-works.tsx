import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

const steps = [
  {
    n: "1",
    title: "Upload your EOB",
    highlight: true,
    body:
      "Paste or drag an EOB into Sydra. When an out-of-network claim comes back underpaid, this is where the IDR workflow starts. Under 5 minutes to a draft, one claim per CPT.",
  },
  {
    n: "2",
    title: "Review and submit the IDR",
    highlight: true,
    body:
      "Sydra drafts a Federal or State IDR submission citing real prior wins on your codes. Your team reviews, approves, and exports to the IDRE portal with a guided checklist.",
  },
  {
    n: "3",
    title: "Use upstream tools when you need them",
    body:
      "Optional: verify eligibility (270/271), draft prior auths, run compliance checks, and read op notes for CPT coding. All in the same platform if your practice wants them.",
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
          One workflow. NSA IDR at the center.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Upload an EOB, draft the IDR, submit. That is what most teams come for.
          Connect once and you also get eligibility, prior auth, CPT, and compliance
          when your workflow needs them.
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
                      Primary
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
