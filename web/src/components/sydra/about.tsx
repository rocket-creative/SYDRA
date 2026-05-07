export function SydraAbout() {
  return (
    <section className="border-b border-slate-100 bg-white py-16 md:py-24" id="about">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 xl:max-w-[720px] xl:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          About Sydra
        </p>
        <h2 className="mt-3 text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]">
          Built by a surgeon, not a billing company.
        </h2>
        <p className="mt-6 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Sydra is a product of{" "}
          <strong className="font-semibold text-[#1A2B48]">Kronos Health</strong>
          , an expert in Revenue Cycle Management and specifically the NSA IDR
          process.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          After watching insurers underpay his own cases case after case, and
          seeing the legal hourly rate billing companies charge to handle IDR
          submissions, he built Sydra for his practice and then opened it to
          other surgical groups.
        </p>
        <p className="mt-4 text-left text-base leading-relaxed text-[#4A5568] md:text-[17px] md:leading-[1.75]">
          Sydra runs in production today at NY Brain and Spine Surgery and is
          being licensed to additional surgical practices in 2026.
        </p>
      </div>
    </section>
  );
}
