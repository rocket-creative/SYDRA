export function SydraAbout() {
  return (
    <section aria-labelledby="heading-about" className="border-b border-slate-100 bg-white py-16 md:py-24" id="about">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 xl:max-w-[720px] xl:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          About Sydra
        </p>
        <h2
          className="mt-3 text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
          id="heading-about"
        >
          Built by a surgeon, not a billing company.
        </h2>
        <p className="mt-6 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Sydra is a product of{" "}
          <strong className="font-semibold text-[#1A2B48]">Kronos Health</strong>
          , built by{" "}
          <strong className="font-semibold text-[#1A2B48]">Dr. John Abrahams</strong>
          , a practicing neurosurgeon and expert in Revenue Cycle Management and
          the NSA IDR process.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Practices that want full-service claim management alongside the
          software work directly with the Kronos Revenue team. The same
          operation, two ways to engage.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          After watching insurers underpay his own cases and seeing law firms
          take 20% of every recovery for handling IDR, Dr. Abrahams built
          Sydra — for his practice first, then for other surgical groups.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Sydra is currently serving practices in New York, Texas, California,
          New Jersey, Florida, and Arizona, with national expansion planned for
          2026.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Sydra runs in production today at NY Brain and Spine Surgery and is
          being licensed to additional surgical practices in 2026.
        </p>
      </div>
    </section>
  );
}
