import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

const stats = [
  { value: "213+", label: "Determinations analyzed" },
  { value: "> 90%", label: "Provider win rate in our library" },
  { value: "Under 5 min", label: "Average time to file" },
  { value: "CPT", label: "Heavy spine and ortho coverage" },
] as const;

export function SydraProof() {
  return (
    <section
      aria-labelledby="heading-proof"
      className="border-b border-slate-100 bg-slate-50 py-16 md:py-24"
      id="proof"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          Why it works
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
          id="heading-proof"
        >
          The library is the moat
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          We have ingested every public IDR determination relevant to surgical
          practices. Sydra knows what arguments actually win, and what patterns
          the IDREs reject.
        </p>
        <StaggerParent className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerChild key={s.label}>
              <div className="rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-7">
                <p className="text-2xl font-semibold text-[#1A2B48] md:text-[1.75rem]">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-[#4A5568] md:text-[15px]">
                  {s.label}
                </p>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-500 md:text-sm">
          Time to draft is for a typical single CPT submission with documents
          already on file. Win rate reflects the determinations in our reference
          library; it isn&apos;t a guarantee of future results.
        </p>
      </div>
    </section>
  );
}
