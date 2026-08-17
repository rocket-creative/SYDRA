export type ProofItem = {
  value: string;
  label: string;
  caption?: string;
};

const PROOF_ITEMS: readonly ProofItem[] = [
  {
    value: "88%",
    label: "of properly filed federal IDR disputes get paid",
    caption: "Source: Georgetown University CHIR, March 2026",
  },
  {
    value: "5 minutes",
    label: "to prepare a complete submission packet",
  },
  {
    value: "Or we file it",
    label: "Our team handles every dispute end to end",
  },
  {
    value: "June 2026",
    label: "Built for the current federal IDR rules",
  },
] as const;

type HeroProofStackProps = {
  className?: string;
  /** Override the default homepage proof row. */
  items?: readonly ProofItem[];
};

/** Compact trust row under the hero CTA. Stacks on mobile, two columns from md, four from lg. */
export function HeroProofStack({ className = "", items = PROOF_ITEMS }: HeroProofStackProps) {
  return (
    <div
      aria-label="Recovery proof points"
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-4 ${className}`.trim()}
    >
      {items.map((item) => (
        <figure key={item.value} className="min-w-0">
          <p
            className="text-[1.75rem] font-light leading-none tracking-[-0.03em] text-brand tabular-nums md:text-[2rem]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {item.value}
          </p>
          <div className="my-2.5 h-px w-8 bg-[var(--color-rule)]" aria-hidden />
          <figcaption className="text-sm leading-snug text-body">{item.label}</figcaption>
          {item.caption ? (
            <p className="mt-1.5 text-[11px] leading-relaxed text-body/70">{item.caption}</p>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
