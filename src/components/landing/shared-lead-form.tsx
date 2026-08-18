"use client";

import { useSearchParams } from "next/navigation";

import { LeadForm } from "@/components/landing/lead-form";
import { US_STATES } from "@/lib/constants/us-states";
import { CASE_REVIEW_THANK_YOU_PATH } from "@/lib/case-review";
import { buildCampaignTracking, parseUtmFromSearchParams } from "@/lib/landing/tracking";

/**
 * The one lead form. Every page that captures a lead mounts this, so the fields,
 * the two-step flow, the attribution payload and the delivery path are identical
 * everywhere: POST /api/postcard-lead, which writes the Supabase landing_leads
 * row before emailing sales@ with the ops address on BCC.
 *
 * Reads state, code and UTM from the query string, so mount it inside a
 * <Suspense> boundary.
 */

type LeadFormIntent = "demo" | "case-review";

const DEFAULT_THANK_YOU: Record<LeadFormIntent, string> = {
  demo: "/demo/thank-you",
  "case-review": CASE_REVIEW_THANK_YOU_PATH,
};

type SharedLeadFormProps = {
  /** GA4 generate_lead attribution. Also the analytics name for this placement. */
  landingPage: string;
  /** Scroll target for sticky bars and in-page CTAs. */
  anchorId?: string;
  /** Demo booking copy vs claim review copy. Both fire the same Ads conversion. */
  intent?: LeadFormIntent;
  /** Overrides the per-intent default. */
  thankYouPath?: string;
  variant?: "section" | "card" | "band";
};

export function SharedLeadForm({
  landingPage,
  anchorId = "lead-form",
  intent = "case-review",
  thankYouPath,
  variant = "card",
}: SharedLeadFormProps) {
  const searchParams = useSearchParams();
  const stateRaw = (searchParams.get("state") ?? "").trim().toUpperCase();
  const stateCode = US_STATES.some((s) => s.code === stateRaw) ? stateRaw : "";
  const tracking = buildCampaignTracking(stateCode, parseUtmFromSearchParams(searchParams));

  // ?source= rides through to the thank-you page so Ads can separate the
  // campaigns that share a destination.
  const source = (searchParams.get("source") ?? "").trim();
  const base = thankYouPath ?? DEFAULT_THANK_YOU[intent];
  const resolvedThankYou =
    /^[a-zA-Z0-9_-]+$/.test(source) && !base.includes("?")
      ? `${base}?source=${encodeURIComponent(source)}`
      : base;

  return (
    <LeadForm
      anchorId={anchorId}
      defaultState={stateCode}
      intent={intent}
      landingPage={landingPage}
      thankYouPath={resolvedThankYou}
      tracking={tracking}
      variant={variant}
    />
  );
}
