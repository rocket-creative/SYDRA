import { Button } from "@/components/ui/button";
import {
  CALL_CTA_LABEL,
  CALL_PATH,
  CASE_REVIEW_PATH,
  PRIMARY_CTA_LABEL,
} from "@/lib/case-review";
import { getSalesEmail } from "@/lib/contact";
import { textStyles } from "@/lib/typography";

type DualPageCtaProps = {
  lead?: string;
  className?: string;
};

/** Primary 15-minute call + secondary claim review. Used in place of a single-option band. */
export function DualPageCta({ lead, className = "" }: DualPageCtaProps) {
  return (
    <div className={className}>
      {lead ? <p className={`${textStyles.body} mb-6`}>{lead}</p> : null}
      <div className="cta-row">
        <Button href={CALL_PATH} showArrow variant="solid">
          {CALL_CTA_LABEL}
        </Button>
        <Button href={CASE_REVIEW_PATH} variant="ghost">
          {PRIMARY_CTA_LABEL}
        </Button>
      </div>
      <p className={`${textStyles.body} mt-4`}>
        Questions before either? Email{" "}
        <a className="underline underline-offset-2" href={`mailto:${getSalesEmail()}`}>
          {getSalesEmail()}
        </a>
        .
      </p>
    </div>
  );
}
