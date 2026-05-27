import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";

/** Reusable trust signals adjacent to CTAs on inner pages. */
export function CtaTrustSignals({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-slate-500 ${className}`.trim()}>
      <ReviewHighlight>
        Built to support HIPAA safeguards · BAA on request · ModMed and Stedi
        integrations · SOC 2 aligned, report under NDA ·{" "}
        <Link
          className="font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-2 hover:decoration-[rgb(0,40,184)]"
          href="/security"
        >
          Security details
        </Link>
      </ReviewHighlight>
    </p>
  );
}
