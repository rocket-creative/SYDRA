/**
 * Entity-space SEO types. The CPT/HCPCS/ICD-10 code is the stable spine; the
 * dollar figures (negotiated rate, allowed amount, QPA outcome) are the data
 * atoms that fill each page. See 01_Sydra_Entity-SEO_Playbook.md sections 1-3.
 */

export type CodeSystem = "cpt" | "hcpcs" | "icd10";

/**
 * Where a published descriptor comes from. CPT long-descriptors are
 * AMA-copyrighted and may not be published at scale without a license, so the
 * launch corpus leans on HCPCS/ICD-10 (public domain) and Sydra-authored
 * wording until the AMA license is in place.
 */
export type DescriptorSource = "hcpcs" | "icd10" | "sydra_authored" | "ama_licensed";

/**
 * Provenance of a benchmark row. `seed` is placeholder data that must never be
 * indexed; `puf` and `mrf` are real public datasets that flip a page to
 * indexable. This single flag is the index-gating safeguard.
 */
export type DataSource = "seed" | "puf" | "mrf";

export type SpecialtySlug =
  | "spine"
  | "orthopedics"
  | "neurosurgery"
  | "plastics"
  | "hand"
  | "pain";

/** Internal prioritization heuristic. Never published on a page. */
export type ValueTier = "high" | "medium" | "standard";

export type IdrCode = {
  code: string;
  codeSystem: CodeSystem;
  /** Short, publishable label (Sydra-authored or public-domain descriptor). */
  shortLabel: string;
  /** Longer descriptor, only published when descriptorSource permits it. */
  descriptor: string;
  descriptorSource: DescriptorSource;
  specialty: SpecialtySlug;
  /** Whether this code is in the IDR-relevant launch set. */
  isRelevant: boolean;
  /**
   * Original plain-language wording written for Sydra (NOT the AMA long
   * descriptor), safe to publish before the AMA license is in place.
   */
  shortDescription?: string;
  /** Anatomical region, for on-page context. */
  bodyRegion?: string;
  /** Typical site of service. */
  setting?: string;
  /** Add-on code billed alongside a primary procedure. */
  addOn?: boolean;
  /** Sibling codes for internal linking. */
  relatedCodes?: string[];
  /** Why the code is disputed out of network. Surfaced on the code hub. */
  disputeContext?: string;
  valueTier?: ValueTier;
};

export type IdrPayer = {
  slug: string;
  name: string;
  /** Whether we hold this payer's machine-readable file data. */
  hasMrf: boolean;
  /** Alternate names buyers search. */
  aka?: string[];
  /** Plain-language context surfaced on the payer hub. */
  note?: string;
};

export type IdrSpecialty = {
  slug: SpecialtySlug;
  name: string;
  blurb: string;
};

export type StateRef = {
  code: string;
  name: string;
};

/**
 * State-level NSA eligibility + outcome profile. Eligibility content is a legal
 * surface and is reviewed copy, not generated. See playbook section 11.
 */
export type IdrStateProfile = {
  state: string;
  /** Which IDR pathway predominates for OON surgical claims in this state. */
  nsaPathway: "federal" | "state" | "mixed";
  stateLawSummary: string;
  /** Provider win rate (0-1) across IDR disputes in this state. */
  idrWinRate: number;
  /** Median award as a multiple of QPA for disputes in this state. */
  idrMedianPctQpa: number;
  dataSource: DataSource;
};

/**
 * One benchmark cell: a code x state (x payer) data atom. payerSlug is null for
 * the state-level aggregate that powers the code x state page.
 */
export type IdrBenchmark = {
  code: string;
  state: string;
  payerSlug: string | null;
  inNetworkMedian: number;
  oonAllowed: number;
  medicareRate: number;
  idrWinRate: number;
  idrMedianPctQpa: number;
  dataSource: DataSource;
  updatedAt: string;
};
