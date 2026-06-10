import { CountUp } from "@/components/motion/count-up";

type StatFigureProps = {
  value: string;
  label: string;
  caption?: string;
  /** When set, the numeric value counts up from 0 when it enters the viewport. */
  countTo?: number;
  /** Suffix appended to the counted value (e.g. "%"). */
  suffix?: string;
};

export function StatFigure({ value, label, caption, countTo, suffix }: StatFigureProps) {
  return (
    <figure className="min-w-0">
      <p
        className="type-stat text-brand tabular-nums"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {countTo != null ? <CountUp end={countTo} suffix={suffix} /> : value}
      </p>
      <div className="rule-measure rule-reveal my-4 border-t border-rule" aria-hidden />
      <figcaption className="type-body text-body">{label}</figcaption>
      {caption ? (
        <p className="mt-2 text-xs leading-relaxed text-body/70">{caption}</p>
      ) : null}
    </figure>
  );
}
