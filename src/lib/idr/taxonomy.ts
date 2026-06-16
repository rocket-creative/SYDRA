import { US_STATES } from "@/lib/constants/us-states";
import {
  SOURCE_CODES,
  type SourceSpecialty,
} from "@/lib/idr/source-codes";
import type {
  IdrCode,
  IdrPayer,
  IdrSpecialty,
  SpecialtySlug,
  StateRef,
} from "@/lib/idr/types";

/**
 * Launch geo spine. The full surface scales to all 51 states; the proof slice
 * launches with these six (playbook section 2). Names come from the shared
 * US_STATES constant so the geo dimension stays in sync with the demo form.
 */
export const LAUNCH_STATE_CODES = ["TX", "CA", "NY", "NJ", "FL", "AZ"] as const;

export const LAUNCH_STATES: StateRef[] = LAUNCH_STATE_CODES.map((code) => {
  const match = US_STATES.find((s) => s.code === code);
  return { code, name: match?.name ?? code };
});

export const SPECIALTIES: IdrSpecialty[] = [
  {
    slug: "spine",
    name: "Spine surgery",
    blurb:
      "Cervical and lumbar fusion, decompression, instrumentation, and neurostimulation codes that surgical billing teams dispute most often under the No Surprises Act.",
  },
  {
    slug: "orthopedics",
    name: "Orthopedic surgery",
    blurb:
      "Joint replacement, arthroscopy, and fracture repair codes with high out of network exposure for orthopedic groups.",
  },
  {
    slug: "neurosurgery",
    name: "Neurosurgery",
    blurb:
      "Cranial, vascular, functional, and peripheral nerve procedure codes where federal IDR awards routinely exceed the insurer qualifying payment amount.",
  },
  {
    slug: "plastics",
    name: "Plastic and reconstructive surgery",
    blurb:
      "Reconstructive flap, graft, breast, and soft tissue codes frequently underpaid on an out of network basis.",
  },
  {
    slug: "pain",
    name: "Interventional pain",
    blurb:
      "Epidural injections, facet procedures, radiofrequency ablation, and sacroiliac codes that interventional pain practices take through dispute resolution.",
  },
  {
    slug: "hand",
    name: "Hand surgery",
    blurb:
      "Carpal tunnel, tendon, and small joint codes that hand surgeons take through independent dispute resolution.",
  },
];

/** Map the source specialty vocabulary onto the repo specialty slugs. */
const SOURCE_SPECIALTY_MAP: Record<SourceSpecialty, SpecialtySlug> = {
  spine: "spine",
  ortho: "orthopedics",
  neuro: "neurosurgery",
  plastics: "plastics",
  pain: "pain",
};

/**
 * The IDR code spine. All disputed surgical, neuro, plastics, and pain codes
 * come from the source dataset in source-codes.ts using original, license safe
 * wording (never the AMA long descriptor), so the corpus is safe to publish
 * before the AMA descriptor license is in place. A small set of hand surgery
 * codes not present in the source set is appended so the hand specialty hub
 * keeps content.
 */
const SOURCE_IDR_CODES: IdrCode[] = SOURCE_CODES.map((s) => ({
  code: s.code,
  codeSystem: s.codeType === "HCPCS" ? "hcpcs" : "cpt",
  shortLabel: s.name,
  descriptor: s.name,
  descriptorSource: s.codeType === "HCPCS" ? "hcpcs" : "sydra_authored",
  specialty: SOURCE_SPECIALTY_MAP[s.specialty],
  isRelevant: true,
  shortDescription: s.shortDescription,
  bodyRegion: s.bodyRegion,
  setting: s.setting,
  addOn: s.addOn,
  relatedCodes: s.relatedCodes,
  disputeContext: s.disputeContext,
  valueTier: s.valueTier,
}));

function hand(
  code: string,
  shortLabel: string,
  shortDescription: string,
  bodyRegion: string,
): IdrCode {
  return {
    code,
    codeSystem: "cpt",
    shortLabel,
    descriptor: shortLabel,
    descriptorSource: "sydra_authored",
    specialty: "hand",
    isRelevant: true,
    shortDescription,
    bodyRegion,
    setting: "ASC or office",
    addOn: false,
    relatedCodes: [],
    disputeContext:
      "High volume hand procedure disputed when paid below market out of network.",
    valueTier: "standard",
  };
}

const HAND_ONLY_CODES: IdrCode[] = [
  hand(
    "25447",
    "Wrist joint replacement (interposition arthroplasty)",
    "Replacement or resurfacing of an arthritic intercarpal or carpometacarpal joint of the wrist.",
    "wrist",
  ),
  hand(
    "26356",
    "Flexor tendon repair in zone 2, single",
    "Primary repair of a cut flexor tendon in the most technically demanding zone of the hand.",
    "hand",
  ),
  hand(
    "26115",
    "Excision of soft tissue tumor of the hand",
    "Removal of a subcutaneous soft tissue tumor of the hand or finger.",
    "hand",
  ),
];

export const IDR_CODES: IdrCode[] = [...SOURCE_IDR_CODES, ...HAND_ONLY_CODES];

/**
 * Major commercial payers that matter for OON surgical disputes. hasMrf gates
 * whether a code x state x payer page is allowed to exist (playbook section 11:
 * never multiply by payer without that payer's data for that code).
 */
export const IDR_PAYERS: IdrPayer[] = [
  {
    slug: "unitedhealthcare",
    name: "UnitedHealthcare",
    hasMrf: true,
    aka: ["UHC", "United", "Optum", "UMR"],
    note: "Largest commercial payer and a frequent out of network underpayer, with high search volume for disputes.",
  },
  {
    slug: "aetna",
    name: "Aetna",
    hasMrf: true,
    aka: ["CVS Health", "Aetna CVS"],
    note: "Major national payer and a common surgical out of network dispute target.",
  },
  {
    slug: "cigna",
    name: "Cigna",
    hasMrf: true,
    aka: ["Cigna Healthcare", "Evernorth"],
    note: "National payer with significant out of network claim volume.",
  },
  {
    slug: "anthem",
    name: "Anthem Blue Cross Blue Shield",
    hasMrf: true,
    aka: ["Elevance", "Elevance Health", "Anthem BCBS"],
    note: "Large Blue Cross affiliate operating across many states and a frequent IDR counterparty.",
  },
  {
    slug: "hcsc",
    name: "Health Care Service Corporation",
    hasMrf: true,
    aka: ["HCSC", "BCBS Illinois", "BCBS Texas", "BCBS Oklahoma"],
    note: "Operates Blue Cross plans in several launch states including Texas and Illinois.",
  },
  {
    slug: "horizon",
    name: "Horizon Blue Cross Blue Shield of New Jersey",
    hasMrf: true,
    aka: ["Horizon BCBS", "Horizon NJ"],
    note: "Dominant New Jersey payer and highly relevant for the New Jersey surface.",
  },
  {
    slug: "bcbs",
    name: "Blue Cross Blue Shield",
    hasMrf: false,
    aka: ["Blue Cross", "BCBS", "the Blues"],
    note: "Umbrella for the Blue Cross plans. Route searches to the specific affiliate where possible.",
  },
  {
    slug: "humana",
    name: "Humana",
    hasMrf: false,
    aka: ["Humana Health"],
    note: "National payer with out of network surgical disputes across commercial lines.",
  },
  {
    slug: "centene",
    name: "Centene",
    hasMrf: false,
    aka: ["Ambetter", "Centene Corporation"],
    note: "Large marketplace and managed care payer relevant in several launch states.",
  },
  {
    slug: "molina",
    name: "Molina Healthcare",
    hasMrf: false,
    aka: ["Molina"],
    note: "Managed care payer with marketplace presence in launch states.",
  },
  {
    slug: "oscar",
    name: "Oscar Health",
    hasMrf: false,
    aka: ["Oscar"],
    note: "Marketplace payer concentrated in metro markets and relevant in New York, Texas, and Florida.",
  },
  {
    slug: "kaiser",
    name: "Kaiser Permanente",
    hasMrf: false,
    aka: ["Kaiser", "KP"],
    note: "Largely integrated and in network, with lower out of network dispute volume. Confirm before building pages.",
  },
];

const CODE_INDEX = new Map(IDR_CODES.map((row) => [row.code, row]));
const PAYER_INDEX = new Map(IDR_PAYERS.map((row) => [row.slug, row]));
const SPECIALTY_INDEX = new Map(SPECIALTIES.map((row) => [row.slug, row]));
const STATE_INDEX = new Map<string, string>(
  US_STATES.map((row) => [row.code, row.name]),
);

export function getCodeMeta(code: string): IdrCode | null {
  return CODE_INDEX.get(code) ?? null;
}

export function getPayerMeta(slug: string): IdrPayer | null {
  return PAYER_INDEX.get(slug) ?? null;
}

export function getSpecialtyMeta(slug: string): IdrSpecialty | null {
  return SPECIALTY_INDEX.get(slug as SpecialtySlug) ?? null;
}

export function isLaunchState(state: string): boolean {
  return (LAUNCH_STATE_CODES as readonly string[]).includes(state);
}

export function getStateName(state: string): string | null {
  return STATE_INDEX.get(state) ?? null;
}

function toStateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const STATE_CODE_TO_SLUG = new Map<string, string>(
  US_STATES.map((row) => [row.code, toStateSlug(row.name)]),
);
const STATE_SLUG_TO_CODE = new Map<string, string>(
  US_STATES.map((row) => [toStateSlug(row.name), row.code]),
);

/** Two-letter code (e.g. "NY") -> readable URL slug (e.g. "new-york"). */
export function stateSlug(code: string): string {
  return STATE_CODE_TO_SLUG.get(code.toUpperCase()) ?? code.toLowerCase();
}

/**
 * Resolve a route param to a canonical 2-letter code. Accepts a readable slug
 * ("new-york") or a 2-letter code ("NY"/"ny") for backward compatibility, so
 * old code-based URLs still resolve while the slug form is canonical.
 */
export function stateCodeFromSlug(input: string): string | null {
  const raw = input.trim().toLowerCase();
  const fromSlug = STATE_SLUG_TO_CODE.get(raw);
  if (fromSlug) return fromSlug;
  const upper = raw.toUpperCase();
  return STATE_INDEX.has(upper) ? upper : null;
}

export function codesForSpecialty(slug: SpecialtySlug): IdrCode[] {
  return IDR_CODES.filter((row) => row.specialty === slug);
}
