import { StatFigure } from "@/components/landing/stat-figure";

/** Recovery proof points for the homepage hero right column (and mobile under CTA). */
export function HeroProofStack({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="Recovery proof points"
      className={`flex flex-col gap-8 ${className}`.trim()}
    >
      <StatFigure
        caption="Source: Georgetown University CHIR, March 2026"
        countTo={88}
        label="of properly filed federal IDR disputes get paid"
        suffix="%"
        value="88%"
      />
      <StatFigure
        label="to prepare a complete submission packet"
        value="5 minutes"
      />
      <StatFigure label="You keep the recovery." value="No 20% cut" />
    </div>
  );
}
