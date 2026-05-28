import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

const props = [
  {
    title: "Faster",
    body: "30 minutes per claim down to under 5. At 10 disputes a month, that's 4+ hours of biller time recovered, without hiring or outsourcing.",
  },
  {
    title: "Smarter",
    body: "Specialty trained. Files one claim per CPT. Never batches codes that should be filed individually.",
  },
  {
    title: "Yours",
    body: "Your team owns the workflow. Keep recoveries in house instead of giving 20% to a law firm, or add Kronos Support on tricky cases.",
  },
] as const;

export function SydraValueProps() {
  return (
    <section aria-labelledby="heading-value-props" className="border-b border-slate-100 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <StaggerParent className="grid gap-6 md:grid-cols-3 md:gap-8">
          {props.map((item) => (
            <StaggerChild key={item.title}>
              <article className="h-full rounded-xl border border-slate-100 bg-[#FAFBFD] p-6 md:p-8">
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(0,40,184)]"
                  id={item.title === "Faster" ? "heading-value-props" : undefined}
                >
                  {item.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                  {item.body}
                </p>
              </article>
            </StaggerChild>
          ))}
        </StaggerParent>
      </div>
    </section>
  );
}
