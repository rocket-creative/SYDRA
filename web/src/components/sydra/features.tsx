const features = [
  {
    title: "AI drafted submissions",
    body:
      "Claude Sonnet 4 generates the executive summary, market rate justification, and clinical narrative tailored to your case.",
  },
  {
    title: "Extensive determination library",
    body:
      "Cite real, recent IDR rulings, including the win and loss patterns specific to your CPT codes.",
  },
  {
    title: "Document scanning",
    body:
      "Upload op notes, radiology reads, EOBs, denials. Sydra pulls structured data automatically.",
  },
  {
    title: "CPT aware matching",
    body:
      "Sydra prioritizes determinations that share your specific CPT codes, with deep coverage on spine procedures.",
  },
  {
    title: "Multi tenant security",
    body:
      "Strict per practice isolation. Role based access. SOC 2 controls. Your data never mingles with another practice.",
  },
  {
    title: "Clearinghouse and EMR integration",
    body:
      "Pull claim data directly from your clearinghouse and EMR. No copy paste between systems.",
  },
] as const;

export function SydraFeatures() {
  return (
    <section
      className="border-b border-slate-100 bg-white py-16 md:py-24"
      id="features"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          What you get
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]">
          Built for the way surgical practices actually work
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="text-lg font-semibold text-[#1A2B48]">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
