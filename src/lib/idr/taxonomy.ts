import { US_STATES } from "@/lib/constants/us-states";
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
      "Cervical and lumbar fusion, decompression, and instrumentation codes that surgical billing teams dispute most often under the No Surprises Act.",
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
      "Cranial and peripheral nerve procedure codes where federal IDR awards routinely exceed the insurer qualifying payment amount.",
  },
  {
    slug: "plastics",
    name: "Plastic and reconstructive surgery",
    blurb:
      "Reconstructive flap, breast, and soft tissue codes frequently underpaid on an out of network basis.",
  },
  {
    slug: "hand",
    name: "Hand surgery",
    blurb:
      "Carpal tunnel, tendon, and small joint codes that hand surgeons take through independent dispute resolution.",
  },
];

/**
 * IDR-relevant launch code set. Codes themselves are factual identifiers; the
 * publishable labels here are Sydra-authored so nothing depends on an AMA CPT
 * descriptor license. descriptorSource records that provenance per row.
 */
export const IDR_CODES: IdrCode[] = [
  // Spine
  c("22551", "Anterior cervical fusion, single level", "spine"),
  c("22552", "Anterior cervical fusion, each additional level", "spine"),
  c("22845", "Anterior spinal instrumentation", "spine"),
  c("22612", "Posterior lumbar fusion, single level", "spine"),
  c("22633", "Transforaminal lumbar interbody fusion (TLIF)", "spine"),
  c("22630", "Posterior lumbar interbody fusion, single level", "spine"),
  c("63030", "Lumbar discectomy, single interspace", "spine"),
  c("63047", "Lumbar laminectomy and decompression, single level", "spine"),
  c("63055", "Transpedicular decompression, thoracic or lumbar", "spine"),
  c("64483", "Transforaminal epidural injection, lumbar, single level", "spine"),
  c("22840", "Posterior non segmental spinal instrumentation", "spine"),
  c("22842", "Posterior segmental spinal instrumentation", "spine"),
  // Orthopedics
  c("27447", "Total knee arthroplasty", "orthopedics"),
  c("27130", "Total hip arthroplasty", "orthopedics"),
  c("29881", "Knee arthroscopy with meniscectomy", "orthopedics"),
  c("29882", "Knee arthroscopy with meniscus repair", "orthopedics"),
  c("29827", "Shoulder arthroscopy with rotator cuff repair", "orthopedics"),
  c("29806", "Shoulder arthroscopy, capsulorrhaphy", "orthopedics"),
  c("23412", "Open rotator cuff repair, chronic", "orthopedics"),
  c("27570", "Knee manipulation under anesthesia", "orthopedics"),
  c("27486", "Knee replacement revision, one component", "orthopedics"),
  c("27814", "Open repair of ankle fracture, bimalleolar", "orthopedics"),
  // Neurosurgery
  c("61510", "Craniotomy for excision of brain tumor, supratentorial", "neurosurgery"),
  c("61512", "Craniotomy for excision of meningioma", "neurosurgery"),
  c("61520", "Craniotomy for excision of cerebellopontine tumor", "neurosurgery"),
  c("62223", "Ventriculoperitoneal shunt placement", "neurosurgery"),
  c("63685", "Spinal neurostimulator generator implantation", "neurosurgery"),
  c("64721", "Carpal tunnel release, open", "neurosurgery"),
  // Plastics
  c("15734", "Muscle flap, trunk", "plastics"),
  c("15756", "Free muscle flap with microvascular anastomosis", "plastics"),
  c("19364", "Breast reconstruction with free flap", "plastics"),
  c("19357", "Breast reconstruction with tissue expander", "plastics"),
  c("14301", "Adjacent tissue transfer, 30.1 to 60 sq cm", "plastics"),
  c("13101", "Complex wound repair, trunk, 2.6 to 7.5 cm", "plastics"),
  // Hand
  c("25447", "Arthroplasty, interposition, intercarpal or carpometacarpal", "hand"),
  c("26356", "Flexor tendon repair in zone 2, primary, single", "hand"),
  c("26115", "Excision of soft tissue tumor of hand or finger, subcutaneous", "hand"),
  c("64719", "Ulnar nerve decompression at wrist", "hand"),
  c("26055", "Tendon sheath incision, trigger finger release", "hand"),
];

function c(
  code: string,
  shortLabel: string,
  specialty: SpecialtySlug,
): IdrCode {
  return {
    code,
    codeSystem: "cpt",
    shortLabel,
    descriptor: shortLabel,
    descriptorSource: "sydra_authored",
    specialty,
    isRelevant: true,
  };
}

/**
 * Major commercial payers that matter for OON surgical disputes. hasMrf gates
 * whether a code x state x payer page is allowed to exist (playbook section 11:
 * never multiply by payer without that payer's data for that code).
 */
export const IDR_PAYERS: IdrPayer[] = [
  { slug: "unitedhealthcare", name: "UnitedHealthcare", hasMrf: true },
  { slug: "aetna", name: "Aetna", hasMrf: true },
  { slug: "cigna", name: "Cigna", hasMrf: true },
  { slug: "anthem-bcbs", name: "Anthem Blue Cross Blue Shield", hasMrf: true },
  { slug: "humana", name: "Humana", hasMrf: false },
  { slug: "bcbs", name: "Blue Cross Blue Shield", hasMrf: false },
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

export function codesForSpecialty(slug: SpecialtySlug): IdrCode[] {
  return IDR_CODES.filter((row) => row.specialty === slug);
}
