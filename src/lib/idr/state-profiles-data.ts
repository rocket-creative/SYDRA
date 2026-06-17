export type NsaPathway = "federal" | "state" | "mixed";

export type StateProfileInput = {
  pathway: NsaPathway;
  /** Provider win rate as a fraction 0..1. */
  winRate: number;
  /** Plain-language summary of how disputes route in this state. Rendered on the state hub page. */
  lawSummary: string;
};

/** Keyed by two-letter state code (uppercase). All 51 jurisdictions present. */
export const STATE_PROFILE_INPUTS: Record<string, StateProfileInput> = {
  AL: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  AK: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  AZ: {
    pathway: "federal",
    winRate: 0.9,
    lawSummary:
      "Federal IDR carries most surgical out of network disputes here. Confirm any state arbitration overlay against the CMS chart. Among the strongest federal IDR provider win rates in the country, roughly 89 to 91 percent.",
  },
  AR: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  CA: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Fully insured commercial plans may fall under California's state process. Self funded ERISA plans route to federal IDR. California's AB 72 governs many fully insured disputes, so plan type decides the path. Self funded plans still route to federal IDR.",
  },
  CO: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under Colorado law; self funded plans route to federal IDR. Colorado runs a state payment process for many fully insured plans; self funded plans route to federal IDR.",
  },
  CT: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "State law references FAIR Health data for fully insured disputes. Self funded plans route to federal IDR. Connecticut uses FAIR Health benchmarks in its state process for fully insured plans; self funded plans route to federal IDR.",
  },
  DE: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  DC: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  FL: {
    pathway: "federal",
    winRate: 0.9,
    lawSummary:
      "Federal IDR carries most surgical out of network disputes here. Confirm any state overlay against the CMS chart. Federal IDR provider win rates in Florida run roughly 89 to 91 percent, among the highest nationally.",
  },
  GA: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "State arbitration references FAIR Health data for fully insured disputes. Self funded plans route to federal IDR. Georgia's Surprise Billing Consumer Protection Act uses FAIR Health benchmarks for fully insured plans; self funded plans route to federal IDR.",
  },
  HI: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  ID: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  IL: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under Illinois law; self funded plans route to federal IDR. Illinois runs a state process for many fully insured plans; self funded plans route to federal IDR.",
  },
  IN: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  IA: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  KS: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  KY: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  LA: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  ME: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  MD: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Maryland's All Payer Model Agreement creates a unique payment framework. Confirm routing against the CMS chart before treating a claim as federal. Maryland's All Payer Model Agreement governs hospital payment, a distinct path; confirm routing carefully before filing.",
  },
  MA: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  MI: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  MN: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under Minnesota law; self funded plans route to federal IDR. Minnesota has surprise billing protections affecting fully insured plans; self funded plans route to federal IDR.",
  },
  MS: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  MO: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  MT: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  NE: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  NV: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under Nevada law; self funded plans route to federal IDR. Nevada runs a state process for many fully insured plans; self funded plans route to federal IDR.",
  },
  NH: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under New Hampshire law; self funded plans route to federal IDR. New Hampshire has surprise billing protections affecting fully insured plans; self funded plans route to federal IDR.",
  },
  NJ: {
    pathway: "mixed",
    winRate: 0.66,
    lawSummary:
      "New Jersey's Out of network Consumer Protection Act covers fully insured and self funded opted in plans. Self funded plans that did not opt in route to federal IDR. The state filing window is short, so flag deadlines prominently. New Jersey's arbitration applies to fully insured and self funded opted in plans, and the filing window is shorter than New York or the federal process. Move fast.",
  },
  NM: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "State law references FAIR Health data for fully insured disputes. Self funded plans route to federal IDR. New Mexico uses FAIR Health benchmarks in its state process for fully insured plans; self funded plans route to federal IDR.",
  },
  NY: {
    pathway: "mixed",
    winRate: 0.81,
    lawSummary:
      "New York's surprise bill law uses baseball arbitration and references the FAIR Health 80th percentile benchmark. It allows a three year lookback on commercial claims. Self funded plans route to federal IDR; fully insured commercial disputes may fall under the New York process. New York lets providers challenge payments going back three years. Claims a practice wrote off as dead can be revived. This is the headline of the New York surface.",
  },
  NC: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  ND: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  OH: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  OK: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  OR: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Confirm fully insured routing under Oregon law; self funded plans route to federal IDR. Oregon has surprise billing protections affecting fully insured plans; self funded plans route to federal IDR.",
  },
  PA: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  RI: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  SC: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  SD: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  TN: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  TX: {
    pathway: "mixed",
    winRate: 0.9,
    lawSummary:
      "Texas has a state arbitration process for many fully insured plans, while self funded ERISA plans route to federal IDR. Federal win rates here are among the highest in the country. Texas drives huge federal IDR volume and provider win rates run roughly 89 to 91 percent. The state also runs its own process for many fully insured plans, so plan type decides the path.",
  },
  UT: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  VT: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  VA: {
    pathway: "mixed",
    winRate: 0.85,
    lawSummary:
      "Virginia operates a state process for many fully insured plans, yet the vast majority of disputes route federal. Self funded plans always route to federal IDR. Confirm plan type before filing. Virginia runs a state arbitration process, but federal volume dwarfs it; most surgical out of network disputes still route federal. Confirm plan type.",
  },
  WA: {
    pathway: "mixed",
    winRate: 0.6,
    lawSummary:
      "Washington's Balance Billing Protection Act covers many fully insured plans. Self funded plans route to federal IDR. Federal win rates are lower here, so the eligibility and evidence work matter more. Washington's Balance Billing Protection Act governs many fully insured plans. Federal win rates here run lower, around 60 percent, so case quality matters more. Self funded plans route to federal IDR.",
  },
  WV: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  WI: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
  WY: {
    pathway: "federal",
    winRate: 0.85,
    lawSummary:
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart.",
  },
};
