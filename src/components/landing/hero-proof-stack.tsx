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
    value: "No 20% cut",
    label: "You keep the recovery.",
  },
] as const;

type HeroProofStackProps = {
  className?: string;
  /** Override the default homepage three-stat row. */
  items?: readonly ProofItem[];
};

/** Compact trust row under the hero CTA. Stacks on mobile, three columns from md up. */
export function HeroProofStack({ className = "", items = PROOF_ITEMS }: HeroProofStackProps) {
  return (
    <div
      aria-label="Recovery proof points"
      className={`grid gap-6 sm:grid-cols-3 sm:gap-5 ${className}`.trim()}
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
