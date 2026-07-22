"use client";

import { useSearchParams } from "next/navigation";

import { LeadForm } from "@/components/landing/lead-form";
import { US_STATES } from "@/lib/constants/us-states";
import { buildCampaignTracking, parseUtmFromSearchParams } from "@/lib/landing/tracking";

/**
 * LeadForm wired for /demo with query param state/code/UTM context.
 * Kept as a client island so the demo page can Suspense around search params.
 */
export function DemoPageLeadForm() {
  const searchParams = useSearchParams();
  const stateRaw = (searchParams.get("state") ?? "").trim().toUpperCase();
  const stateCode = US_STATES.some((s) => s.code === stateRaw) ? stateRaw : "";
  const utm = parseUtmFromSearchParams(searchParams);
  const tracking = buildCampaignTracking(stateCode, utm);

  return (
    <LeadForm
      anchorId="demo-form"
      defaultState={stateCode}
      tracking={tracking}
      variant="card"
    />
  );
}
