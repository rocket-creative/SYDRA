import type { EntityFaqItem } from "@/components/idr/entity-faq";
import { multiple, percent, usd } from "@/lib/idr/format";
import type { CodeStateContext } from "@/lib/idr/queries";

/**
 * Page copy generated from the data atom. The numbers come from the benchmark,
 * so each page reads as a genuine analytical unit rather than boilerplate.
 */

export function codeStateLead(ctx: CodeStateContext): string {
  const { codeLabel, stateName, benchmark } = ctx;
  const spread = benchmark.inNetworkMedian - benchmark.oonAllowed;
  return `Out of network ${codeLabel} (CPT ${ctx.benchmark.code}) claims in ${stateName} are often paid near ${usd(
    benchmark.oonAllowed,
  )}, well below the in network median of ${usd(
    benchmark.inNetworkMedian,
  )}. That ${usd(spread)} gap is what the federal independent dispute resolution process exists to recover, and providers win ${percent(
    benchmark.idrWinRate,
  )} of disputes like this.`;
}

export function codeStateFaqs(ctx: CodeStateContext): EntityFaqItem[] {
  const { codeLabel, stateName, benchmark } = ctx;
  const code = benchmark.code;

  return [
    {
      q: `Is CPT ${code} eligible for federal IDR in ${stateName}?`,
      a: `An out of network ${codeLabel} claim in ${stateName} generally qualifies for federal IDR when the plan is covered by the No Surprises Act, open negotiation has concluded without agreement, and the deadline to initiate has not passed. Self funded ERISA plans follow the federal process; some fully insured plans follow a state pathway. Confirm the plan type for your specific claim.`,
    },
    {
      q: `What can a ${codeLabel} claim recover through IDR?`,
      a: `In ${stateName}, the in network median for this service is about ${usd(
        benchmark.inNetworkMedian,
      )} against an out of network allowed amount near ${usd(
        benchmark.oonAllowed,
      )}. Median IDR awards land around ${multiple(
        benchmark.idrMedianPctQpa,
      )} the insurer qualifying payment amount, and providers prevail in ${percent(
        benchmark.idrWinRate,
      )} of disputes for comparable services.`,
    },
    {
      q: `How does Sydra help dispute CPT ${code}?`,
      a: `Sydra prepares the complete federal IDR submission for ${codeLabel}: the payment offer, a market rate justification citing prior determinations, a clinical narrative drafted from the operative note, and the provider credential block. Your billing team reviews, approves, and exports a submission ready packet in under 5 minutes.`,
    },
    {
      q: `What is the deadline to file IDR for this claim?`,
      a: `After open negotiation ends, the No Surprises Act sets a limited window to initiate IDR. Missing it forfeits the dispute, so most teams track the negotiation and initiation deadlines per claim. Sydra flags eligibility and deadline issues before drafting a submission.`,
    },
  ];
}
