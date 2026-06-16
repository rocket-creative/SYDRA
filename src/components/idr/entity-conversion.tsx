import { RecoveryCalculator } from "@/components/sydra/recovery-calculator";
import { Button } from "@/components/ui/button";
import { textStyles } from "@/lib/typography";

type EntityConversionProps = {
  code: string;
  state: string;
  codeLabel: string;
  stateName: string;
  /** Per-claim recovery potential used to prefill the calculator. */
  defaultAvgDisputedAmount?: number;
};

/**
 * Conversion path for an entity page: the recovery calculator plus a demo CTA
 * that carries the code/state context through to the demo funnel form so the
 * tracked conversion is attributable to the page (playbook section 8).
 */
export function EntityConversion({
  code,
  state,
  codeLabel,
  stateName,
  defaultAvgDisputedAmount,
}: EntityConversionProps) {
  const demoHref = `/demo?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;

  return (
    <div className="prose-measure">
      <h2 className={textStyles.sectionTitle}>
        See what a {codeLabel} claim could recover in {stateName}.
      </h2>
      <p className={`${textStyles.body} mt-3`}>
        Estimate the recovery on your out of network volume, then book a demo and
        we run Sydra on a real {codeLabel} claim.
      </p>

      <div className="mt-10">
        <RecoveryCalculator
          ctaHref={demoHref}
          ctaLabel={`Book a demo for ${code} in ${state}`}
          {...(defaultAvgDisputedAmount
            ? { defaultAvgDisputedAmount }
            : {})}
        />
      </div>

      <div className="mt-10">
        <Button href={demoHref} showArrow>
          Book a 5 minute demo
        </Button>
      </div>
    </div>
  );
}
