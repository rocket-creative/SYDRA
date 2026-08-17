import { Button } from "@/components/ui/button";
import { CASE_REVIEW_PATH, PRIMARY_CTA_LABEL } from "@/lib/case-review";
import { textStyles } from "@/lib/typography";

type DualPageCtaProps = {
  lead?: string;
  className?: string;
};

/** Primary case-review + secondary demo. Used on Group A pages in place of a demo-only band. */
export function DualPageCta({ lead, className = "" }: DualPageCtaProps) {
  return (
    <div className={className}>
      {lead ? <p className={`${textStyles.body} mb-6`}>{lead}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Button href={CASE_REVIEW_PATH} showArrow variant="solid">
          {PRIMARY_CTA_LABEL}
        </Button>
        <Button href="/demo" variant="ghost">
          Request a 15-minute demo
        </Button>
      </div>
    </div>
  );
}
