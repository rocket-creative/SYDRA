import Link from "next/link";

/** Mid-page CTA band driving visitors to the demo funnel. */
export function SydraCtaBand() {
  return (
    <section
      aria-labelledby="heading-cta-band"
      className="border-b border-slate-100 bg-[#1A2B48] py-14 md:py-16"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 xl:max-w-[720px] xl:px-8">
        <h2
          className="text-[1.55rem] font-semibold tracking-tight text-white sm:text-3xl"
          id="heading-cta-band"
        >
          Ready to see Sydra on a real denied claim?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-[17px]">
          Schedule a 15 minute walkthrough. No commitment. We show you what Sydra
          generates from a recent case.
        </p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-[#1A2B48] shadow-sm transition duration-300 ease-out hover:bg-slate-100 active:scale-[0.98]"
          href="/demo"
        >
          Schedule a demo
        </Link>
      </div>
    </section>
  );
}
