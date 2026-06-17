import { US_STATES } from "@/lib/constants/us-states";
import { LAUNCH_STATE_CODES, stateSlug } from "@/lib/idr/taxonomy";
import { STATE_PROFILE_INPUTS } from "@/lib/idr/state-profiles-data";

/**
 * The state pathway model (build spec sections 2 and 3.7).
 *
 * pathway and pathwayNote come from the public CMS federal IDR applicability and
 * deeming chart. That single load is what makes all 51 state pages genuinely
 * state specific. differentiators are real, free state facts (for example the
 * New York three year lookback). Federal only states carry no differentiators
 * and lean on the denial block and the promise instead of padded prose.
 *
 * No win rates, no dollar figures, and no editorial instructions live here.
 */

export type Pathway = "FEDERAL" | "STATE" | "BIFURCATED";

export type StatePathway = {
  code: string;
  slug: string;
  name: string;
  pathway: Pathway;
  pathwayNote: string;
  differentiators: string[];
  isLaunch: boolean;
};

const LAUNCH = new Set<string>(LAUNCH_STATE_CODES);

function pathwayFromProfile(code: string): Pathway {
  const p = STATE_PROFILE_INPUTS[code]?.pathway ?? "federal";
  if (p === "federal") return "FEDERAL";
  if (p === "state") return "STATE";
  return "BIFURCATED";
}

const DEFAULT_NOTE: Record<Pathway, string> = {
  FEDERAL:
    "Self funded ERISA plans follow the federal IDR process. Confirm fully insured routing against the CMS applicability chart before filing.",
  STATE:
    "Many fully insured plans follow the state arbitration process. Self funded ERISA plans still follow the federal IDR process, so confirm plan type before filing.",
  BIFURCATED:
    "Self funded ERISA plans follow the federal IDR process while many fully insured plans follow a state pathway, so the plan type decides which process a dispute routes to.",
};

/** Per state note overrides keyed by two letter code. */
const NOTE_OVERRIDES: Record<string, string> = {
  MD: "Maryland's All Payer Model Agreement governs hospital payment as a distinct framework, so confirm routing against the CMS chart before a claim is treated as federal.",
};

/** Real, free state facts. Federal only states stay empty by design. */
const DIFFERENTIATORS: Record<string, string[]> = {
  NY: [
    "New York lets providers challenge commercial payments going back three years, so claims a practice already wrote off can be revived.",
    "New York's surprise bill law uses baseball arbitration and references the FAIR Health 80th percentile as the benchmark standard.",
  ],
  NJ: [
    "New Jersey's arbitration covers fully insured and self funded opted in plans, and the filing window is shorter than New York or the federal process, so deadlines move fast.",
  ],
  TX: [
    "Texas runs a high volume state arbitration process for many fully insured plans, so plan type decides whether a dispute routes to the state process or to federal IDR.",
  ],
  CA: [
    "California's AB 72 governs many fully insured disputes, so plan type decides the path. Self funded plans still route to federal IDR.",
  ],
  CT: [
    "Connecticut references FAIR Health benchmarks in its state process for fully insured plans.",
  ],
  GA: [
    "Georgia's Surprise Billing Consumer Protection Act references FAIR Health benchmarks for fully insured plans.",
  ],
  NM: [
    "New Mexico references FAIR Health benchmarks in its state process for fully insured plans.",
  ],
  WA: [
    "Washington's Balance Billing Protection Act governs many fully insured plans, so eligibility and evidence work carry more weight here.",
  ],
  VA: [
    "Virginia runs a state arbitration process, but federal volume is far larger, so most surgical out of network disputes still route federal.",
  ],
  CO: [
    "Colorado runs a state payment process for many fully insured plans. Self funded plans route to federal IDR.",
  ],
  IL: [
    "Illinois runs a state process for many fully insured plans. Self funded plans route to federal IDR.",
  ],
  MN: [
    "Minnesota's surprise billing protections affect many fully insured plans. Self funded plans route to federal IDR.",
  ],
  NV: [
    "Nevada runs a state process for many fully insured plans. Self funded plans route to federal IDR.",
  ],
  NH: [
    "New Hampshire's surprise billing protections affect many fully insured plans. Self funded plans route to federal IDR.",
  ],
  OR: [
    "Oregon's surprise billing protections affect many fully insured plans. Self funded plans route to federal IDR.",
  ],
  MD: [
    "Maryland's All Payer Model Agreement is a distinct hospital payment framework, so routing should be confirmed carefully before filing.",
  ],
};

function buildPathway(code: string, name: string): StatePathway {
  const pathway = pathwayFromProfile(code);
  return {
    code,
    slug: stateSlug(code),
    name,
    pathway,
    pathwayNote: NOTE_OVERRIDES[code] ?? DEFAULT_NOTE[pathway],
    differentiators: DIFFERENTIATORS[code] ?? [],
    isLaunch: LAUNCH.has(code),
  };
}

export const STATE_PATHWAYS: Record<string, StatePathway> = Object.fromEntries(
  US_STATES.map((s) => [s.code, buildPathway(s.code, s.name)]),
);

export function getStatePathway(code: string): StatePathway | null {
  return STATE_PATHWAYS[code.toUpperCase()] ?? null;
}

/** Plain language pathway phrase for the section 3.7 sentence. */
export function pathwayPlainLanguage(pathway: Pathway): string {
  switch (pathway) {
    case "FEDERAL":
      return "federal independent dispute resolution";
    case "STATE":
      return "a state arbitration process";
    case "BIFURCATED":
      return "federal IDR for self funded plans and a state process for many fully insured plans";
  }
}

export const ALL_STATE_PATHWAYS: StatePathway[] = Object.values(STATE_PATHWAYS);
