"use client";

import { useSearchParams } from "next/navigation";

import { LeadForm } from "@/components/landing/lead-form";
import { US_STATES } from "@/lib/constants/us-states";
import { CASE_REVIEW_THANK_YOU_PATH } from "@/lib/case-review";
import { buildCampaignTracking, parseUtmFromSearchParams } from "@/lib/landing/tracking";

/**
 * LeadForm wired for /case-review with claim-review copy and IDR conversion.
 */
export function CaseReviewLeadForm() {
  const searchParams = useSearchParams();
  const stateRaw = (searchParams.get("state") ?? "").trim().toUpperCase();
  const stateCode = US_STATES.some((s) => s.code === stateRaw) ? stateRaw : "";
  const utm = parseUtmFromSearchParams(searchParams);
  const tracking = buildCampaignTracking(stateCode, utm);

  return (
    <LeadForm
      anchorId="case-review-form"
      defaultState={stateCode}
      intent="case-review"
      landingPage="case-review"
      thankYouPath={CASE_REVIEW_THANK_YOU_PATH}
      tracking={tracking}
      variant="card"
    />
  );
}
