import { multiple, percent } from "@/lib/idr/format";
import type { IdrBenchmark } from "@/lib/idr/types";
import { textStyles } from "@/lib/typography";

type IdrOutcomeStatProps = {
  benchmark: IdrBenchmark;
  codeLabel: string;
  stateName: string;
};

/**
 * IDR outcome data from the CMS Federal IDR Public Use Files: win rate and
 * median award as a multiple of QPA for this service in this state.
 */
export function IdrOutcomeStat({
  benchmark,
  codeLabel,
  stateName,
}: IdrOutcomeStatProps) {
  return (
    <div>
      <h2 className={textStyles.sectionTitle}>
        Federal IDR outcomes for {codeLabel} in {stateName}.
      </h2>
      <p className={`${textStyles.body} mt-3 prose-measure`}>
        How disputes like this one resolve when they reach a certified IDR
        entity.
      </p>

      <dl className="mt-8 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
        <div className="bg-white p-6">
          <dt className="type-caption text-body">Provider win rate</dt>
          <dd
            className="mt-3 font-light leading-none tracking-[-0.03em] tabular-nums text-brand"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {percent(benchmark.idrWinRate)}
          </dd>
          <p className={`${textStyles.meta} mt-3`}>
            Share of disputes resolved in the provider&apos;s favor.
          </p>
        </div>
        <div className="bg-white p-6">
          <dt className="type-caption text-body">Median award</dt>
          <dd
            className="mt-3 font-light leading-none tracking-[-0.03em] tabular-nums text-brand"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {multiple(benchmark.idrMedianPctQpa)}
          </dd>
          <p className={`${textStyles.meta} mt-3`}>
            Median award as a multiple of the insurer&apos;s qualifying payment
            amount.
          </p>
        </div>
      </dl>
    </div>
  );
}
