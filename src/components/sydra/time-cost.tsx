export function SydraTimeCost() {
  return (
    <section aria-labelledby="heading-time-cost" className="border-b border-slate-100 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[720px] xl:px-8">
        <h2
          className="text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2rem]"
          id="heading-time-cost"
        >
          What 30 minutes per claim actually costs at scale.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          A single federal IDR submission requires pulling and parsing the EOB, verifying
          eligibility and cooling off period status, building a CPT specific payment offer,
          drafting a clinical necessity narrative from the operative note, identifying market
          rate comparisons from prior determinations, preparing provider credentials, and
          formatting everything for the IDRE portal.
        </p>
        <ul className="mt-6 space-y-2 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          <li>At 30 minutes per claim: 10 claims per month = 5 hours of biller time monthly on IDR prep alone.</li>
          <li>20 claims per month = 10 hours.</li>
          <li>30 claims per month = 15 hours.</li>
        </ul>
        <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Most billing teams don&apos;t have 15 hours per month for a single workflow. So they
          file fewer claims than they should. Or none at all. CMS data shows only about 10%
          of eligible claims reach IDR. ACEP analysis.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          The other 90% aren&apos;t filed or aren&apos;t reaching arbitration. The insurer keeps
          the underpayment. Every month.
        </p>
        <p className="mt-6 text-base font-semibold leading-relaxed text-[#1A2B48] md:text-[17px]">
          Sydra reduces the prep step to under 5 minutes per claim. The same 30 claims per
          month becomes under 2.5 hours of billing team time. The claims that weren&apos;t being
          filed start getting filed.
        </p>
      </div>
    </section>
  );
}
