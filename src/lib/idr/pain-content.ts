import type { Metadata } from "next";

import type { EntityFaqItem } from "@/components/idr/entity-faq";
import { composeDenialReasons } from "@/lib/idr/denial-engine";
import {
  demoDeepLink,
  idrCodeStatePath,
  idrCodeStatePayerPath,
  idrSpecialtyPath,
  idrStatePath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import {
  getStatePathway,
  pathwayPlainLanguage,
  type StatePathway,
} from "@/lib/idr/state-pathways";
import { getCodeMeta } from "@/lib/idr/taxonomy";
import type { SpecialtySlug } from "@/lib/idr/types";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { robotsFor } from "@/lib/idr/indexable";

/**
 * Pain first page copy (build spec section 3). Search intent is pain: the
 * denial, the procedure, the state, the payer. Every H1, title, and FAQ leads
 * with the denial, never with a win rate or a dollar figure. The numbers that
 * exist live only inside the SAME disclaimer block, never in metadata.
 */

/** Pain phrasing per specialty for the specialty by state H1 (spec section 3.1). */
const SPECIALTY_PAIN_LABELS: Record<SpecialtySlug, string> = {
  spine: "out of network spine surgery",
  orthopedics: "out of network orthopedic surgery",
  neurosurgery: "out of network neurosurgery",
  plastics: "out of network reconstructive surgery",
  pain: "out of network interventional pain procedures",
  hand: "out of network hand surgery",
};

export function specialtyPainLabel(slug: string): string {
  return SPECIALTY_PAIN_LABELS[slug as SpecialtySlug] ?? "out of network surgery";
}

/** One human line of what the code is (spec section 3.2). */
export function painCodeLine(code: string): string {
  const meta = getCodeMeta(code);
  const raw = (meta?.shortDescription ?? meta?.shortLabel ?? "").trim();
  if (!raw) return `CPT ${code} is a procedure surgical billing teams dispute out of network.`;
  const lowered = raw.charAt(0).toLowerCase() + raw.slice(1);
  const trimmed = lowered.replace(/\.$/, "");
  return `CPT ${code} covers ${trimmed}.`;
}

/** The plain line length the index gate checks (spec section 5.1). */
export function plainLineLength(code: string): number {
  const meta = getCodeMeta(code);
  return (meta?.shortDescription ?? meta?.shortLabel ?? "").trim().length;
}

// --- H1 builders (spec section 3.1) ---------------------------------------

export function h1CptStatePayer(proc: string, stateName: string, payerName: string): string {
  return `Denied on ${proc} in ${stateName} by ${payerName}?`;
}

export function h1CptState(proc: string, stateName: string): string {
  return `Out of network ${proc} denied in ${stateName}?`;
}

export function h1SpecialtyState(painLabel: string, stateName: string): string {
  return `${capitalize(painLabel)} underpaid in ${stateName}?`;
}

export function h1Cpt(proc: string, code: string): string {
  return `Out of network ${proc} (CPT ${code}) denied?`;
}

export function h1State(stateName: string): string {
  return `Out of network surgical claims denied in ${stateName}?`;
}

export function h1Specialty(painLabel: string): string {
  return `${capitalize(painLabel)} denied or underpaid?`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --- State pathway lead sentence (spec section 3.7) -----------------------

export function statePathwaySentence(pathway: StatePathway): string {
  return `In ${pathway.name}, the pathway for out of network surgical disputes is ${pathwayPlainLanguage(
    pathway.pathway,
  )}. ${pathway.pathwayNote}`;
}

// --- Metadata factories (spec section 3.1) --------------------------------

export function cptStatePayerMeta(input: {
  code: string;
  stateCode: string;
  payerSlug: string;
  proc: string;
  stateName: string;
  payerName: string;
  indexable: boolean;
}): Metadata {
  const { code, stateCode, payerSlug, proc, stateName, payerName, indexable } = input;
  return buildPageMetadata({
    title: `${payerName} denied your ${proc} claim in ${stateName}? | Sydra`,
    description: `${payerName} underpaid out of network ${proc} in ${stateName}. See why these claims get denied and how federal IDR recovers the gap. We file it, you keep the recovery.`,
    path: idrCodeStatePayerPath(code, stateCode, payerSlug),
    ogImageAlt: `${payerName} denials on out of network ${proc} in ${stateName}.`,
    robots: robotsFor(indexable),
  });
}

export function cptStateMeta(input: {
  code: string;
  stateCode: string;
  proc: string;
  stateName: string;
  indexable: boolean;
}): Metadata {
  const { code, stateCode, proc, stateName, indexable } = input;
  return buildPageMetadata({
    title: `Out of network ${proc} denied in ${stateName}? | Sydra`,
    description: `Out of network ${proc} (CPT ${code}) underpaid in ${stateName}? See why these claims get denied and how federal IDR recovers the gap. We file it, you keep the recovery.`,
    path: idrCodeStatePath(code, stateCode),
    ogImageAlt: `Out of network ${proc} denials in ${stateName}.`,
    robots: robotsFor(indexable),
  });
}

export function specialtyStateMeta(input: {
  slug: string;
  stateCode: string;
  painLabel: string;
  name: string;
  stateName: string;
  indexable: boolean;
}): Metadata {
  const { slug, stateCode, painLabel, name, stateName, indexable } = input;
  return buildPageMetadata({
    title: `${capitalize(painLabel)} underpaid in ${stateName}? | Sydra`,
    description: `${name} claims paid below the billed charge out of network in ${stateName}. See why these claims get denied and how federal IDR recovers the gap. We file it, you keep the recovery.`,
    path: idrStateSpecialtyPath(stateCode, slug),
    ogImageAlt: `${name} out of network denials in ${stateName}.`,
    robots: robotsFor(indexable),
  });
}

export function cptHubMeta(input: {
  code: string;
  proc: string;
  indexable: boolean;
}): Metadata {
  const { code, proc, indexable } = input;
  return buildPageMetadata({
    title: `Out of network ${proc} (CPT ${code}) denied? | Sydra`,
    description: `Out of network ${proc} (CPT ${code}) gets underpaid and denied. See why these claims get denied and how federal IDR recovers the gap, state by state. We file it, you keep the recovery.`,
    path: `/idr/cpt/${code}`,
    ogImageAlt: `Out of network ${proc} (CPT ${code}) denials and federal IDR.`,
    robots: robotsFor(indexable),
  });
}

export function stateHubMeta(input: {
  stateCode: string;
  stateName: string;
  indexable: boolean;
}): Metadata {
  const { stateCode, stateName, indexable } = input;
  return buildPageMetadata({
    title: `Out of network surgical claims denied in ${stateName}? | Federal IDR | Sydra`,
    description: `Out of network surgical claims underpaid in ${stateName}? See the state pathway, why these claims get denied, and how federal IDR recovers the gap. We file it, you keep the recovery.`,
    path: idrStatePath(stateCode),
    ogImageAlt: `Out of network surgical denials and federal IDR in ${stateName}.`,
    robots: robotsFor(indexable),
  });
}

export function specialtyHubMeta(input: {
  slug: string;
  name: string;
  painLabel: string;
  indexable: boolean;
}): Metadata {
  const { slug, name, painLabel, indexable } = input;
  return buildPageMetadata({
    title: `${name} claims denied out of network? | Federal IDR | Sydra`,
    description: `${capitalize(painLabel)} gets underpaid and denied. See why these claims get denied and how federal IDR recovers the gap. We file it, you keep the recovery.`,
    path: idrSpecialtyPath(slug),
    ogImageAlt: `${name} out of network denials and federal IDR.`,
    robots: robotsFor(indexable),
  });
}

// --- FAQ builders (spec section 3.9) --------------------------------------
// Interpolated per page so the FAQPage schema is distinct, generalized in the
// answers, and always carrying the no guarantees framing.

function pathwayFaqAnswer(stateCode: string, stateName: string): string {
  const pathway = getStatePathway(stateCode);
  if (!pathway) {
    return `Out of network surgical disputes in ${stateName} generally route through the federal IDR process once open negotiation ends without agreement. Confirm the plan type for your specific claim.`;
  }
  return `In ${stateName}, out of network surgical disputes route through ${pathwayPlainLanguage(
    pathway.pathway,
  )}. ${pathway.pathwayNote}`;
}

const SYDRA_PROCESS_ANSWER =
  "We build the federal IDR submission, your billing team approves it, and you keep the recovery. We do this every day and we win most of the time. No outcome is guaranteed, and we will not predict a result on a specific claim.";

export function cptStatePayerFaqs(input: {
  proc: string;
  code: string;
  stateName: string;
  stateCode: string;
  payerName: string;
}): EntityFaqItem[] {
  const { proc, stateName, stateCode, payerName } = input;
  return [
    {
      q: `Was your ${proc} claim underpaid by ${payerName} in ${stateName}?`,
      a: `If ${payerName} paid your out of network ${proc} in ${stateName} below the billed charge, that gap is what federal IDR exists to recover. Send us the denial and we will tell you fast whether it qualifies.`,
    },
    {
      q: `Does federal IDR apply to ${proc} in ${stateName}?`,
      a: pathwayFaqAnswer(stateCode, stateName),
    },
    {
      q: `How does Sydra dispute a ${payerName} denial on ${proc}?`,
      a: SYDRA_PROCESS_ANSWER,
    },
  ];
}

export function cptStateFaqs(input: {
  proc: string;
  code: string;
  stateName: string;
  stateCode: string;
}): EntityFaqItem[] {
  const { proc, stateName, stateCode } = input;
  return [
    {
      q: `Was your out of network ${proc} claim underpaid in ${stateName}?`,
      a: `When an out of network ${proc} claim in ${stateName} is paid below the billed charge, that gap is what federal IDR exists to recover. Send us the denial and we will tell you fast whether it qualifies.`,
    },
    {
      q: `Does federal IDR apply to ${proc} in ${stateName}?`,
      a: pathwayFaqAnswer(stateCode, stateName),
    },
    {
      q: `How does Sydra dispute an underpaid ${proc} claim?`,
      a: SYDRA_PROCESS_ANSWER,
    },
  ];
}

export function specialtyStateFaqs(input: {
  name: string;
  painLabel: string;
  stateName: string;
  stateCode: string;
}): EntityFaqItem[] {
  const { name, painLabel, stateName, stateCode } = input;
  return [
    {
      q: `Are your ${painLabel} claims underpaid in ${stateName}?`,
      a: `When ${painLabel} in ${stateName} is paid below the billed charge, that gap is what federal IDR exists to recover. Send us the denial and we will tell you fast whether it qualifies.`,
    },
    {
      q: `Does federal IDR apply to ${name.toLowerCase()} claims in ${stateName}?`,
      a: pathwayFaqAnswer(stateCode, stateName),
    },
    {
      q: `How does Sydra dispute an underpaid ${name.toLowerCase()} claim?`,
      a: SYDRA_PROCESS_ANSWER,
    },
  ];
}

export function stateHubFaqsPain(stateCode: string, stateName: string): EntityFaqItem[] {
  return [
    {
      q: `Which pathway carries out of network surgical disputes in ${stateName}?`,
      a: pathwayFaqAnswer(stateCode, stateName),
    },
    {
      q: `Was your out of network surgical claim underpaid in ${stateName}?`,
      a: `When an out of network surgical claim in ${stateName} is paid below the billed charge, that gap is what federal IDR exists to recover. Send us the denial and we will tell you fast whether it qualifies.`,
    },
    {
      q: `How does Sydra dispute an underpaid claim in ${stateName}?`,
      a: SYDRA_PROCESS_ANSWER,
    },
  ];
}

export function specialtyHubFaqs(name: string, painLabel: string): EntityFaqItem[] {
  return [
    {
      q: `Why do ${painLabel} claims get denied or underpaid?`,
      a: `Out of network ${name.toLowerCase()} claims are commonly anchored to the qualifying payment amount, bundled, downcoded, or paid at a low out of network allowed amount, all well below the billed charge. That gap is what federal IDR exists to recover.`,
    },
    {
      q: `Does federal IDR apply to ${name.toLowerCase()} claims?`,
      a: `Out of network ${name.toLowerCase()} claims generally qualify for federal IDR once open negotiation ends without agreement and the plan is covered by the No Surprises Act. The pathway varies by state and plan type, so confirm the plan type for your specific claim.`,
    },
    {
      q: `How does Sydra dispute an underpaid ${name.toLowerCase()} claim?`,
      a: SYDRA_PROCESS_ANSWER,
    },
  ];
}

// --- Convenience re exports for pages --------------------------------------

export { composeDenialReasons, demoDeepLink };
