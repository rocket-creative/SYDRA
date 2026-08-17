import { HomepageBand } from "@/components/landing/homepage-band";

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
  items?: readonly ProofItem[];
  variant?: "compact" | "homepage";
};

export function HeroProofStack({
  className = "",
  items = PROOF_ITEMS,
  variant = "compact",
}: HeroProofStackProps) {
  if (variant === "homepage") {
    return (
      <div
        aria-label="Recovery proof points"
        className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 ${className}`.trim()}
      >
        {items.map((item) => (
          <figure key={item.value} className="min-w-0">
            <p className="home-stat whitespace-nowrap text-brand tabular-nums">{item.value}</p>
            <div className="mt-3 h-[2px] w-8 bg-[var(--color-rule)]" aria-hidden />
            <figcaption className="home-caption mt-3 text-body">{item.label}</figcaption>
            {item.caption ? <p className="home-caption mt-3 text-body">{item.caption}</p> : null}
          </figure>
        ))}
      </div>
    );
  }

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

export function HomepageProofBand() {
  return (
    <HomepageBand ariaLabelledby="heading-proof-band" id="proof-band" tone="alt">
      <h2 className="sr-only" id="heading-proof-band">
        Recovery proof points
      </h2>
      <HeroProofStack variant="homepage" />
    </HomepageBand>
  );
}
