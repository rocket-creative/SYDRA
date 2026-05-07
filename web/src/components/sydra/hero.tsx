import Link from "next/link";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-slate-700 md:text-base">
      <span
        className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded bg-blue-600/15 text-[12px] font-bold text-blue-700"
        aria-hidden
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function SydraHero() {
  return (
    <section className="border-b border-slate-100 bg-white pb-14 pt-12 md:pb-16 md:pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700 sm:text-xs">
          For surgical practices fighting insurance underpayments
        </p>
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-14">
          <div className="lg:col-span-7">
            <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#1A2B48] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              Win more IDR disputes.{` `}
              <span className="block">In minutes, not hours.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.7]">
              Sydra drafts your No Surprises Act IDR submissions using AI trained
              on hundreds of real determinations, built by a practicing
              neurosurgeon who grew tired of insurance companies underpaying his
              cases.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                className="inline-flex rounded-lg bg-[#1A2B48] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:min-w-[10rem]"
                href="#contact"
              >
                Request a demo
              </Link>
              <a
                className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1A2B48] hover:bg-slate-50"
                href="#how-it-works"
              >
                See how it works
              </a>
            </div>
            <p className="mt-8 text-sm text-slate-500 md:text-[15px]">
              No setup fees. Integrates with your EMR and Clearinghouse. SOC 2
              controls in place.
            </p>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-2">
            <div className="rounded-xl bg-[#F0F4F8] p-8 shadow-inner ring-1 ring-slate-200/70 md:p-9">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
                What Sydra produces
              </h2>
              <ul className="mt-6 space-y-5">
                <CheckItem>
                  Executive summary tailored to your CPT codes
                </CheckItem>
                <CheckItem>
                  Market rate justification with comparable cases
                </CheckItem>
                <CheckItem>
                  Citations from prior winning determinations
                </CheckItem>
                <CheckItem>
                  Clinical necessity narrative drawn from your op notes
                </CheckItem>
                <CheckItem>
                  Submission ready DOCX export with checklist
                </CheckItem>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
