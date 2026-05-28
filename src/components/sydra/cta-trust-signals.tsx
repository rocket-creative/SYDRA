import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { textStyles } from "@/lib/typography";

export function CtaTrustSignals({ className = "" }: { className?: string }) {
  return (
    <p className={`${textStyles.trustLine} ${className}`.trim()}>
      <ReviewHighlight>
        Built to support HIPAA safeguards · BAA on request · ModMed and Stedi integrations · SOC
        2 Type II compliant ·{" "}
        <Link className={textStyles.textLink} href="/security">
          Security details
        </Link>
      </ReviewHighlight>
    </p>
  );
}
