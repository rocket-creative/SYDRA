/**
 * Homepage copy and case study data. Approved, legally reviewed strings.
 *
 * Every string in this module is transcribed character for character from the
 * approved build spec. Do not rephrase, shorten, expand, or A/B vary anything
 * here without a new approval. Figures in RESULTS_* are real client data and
 * must not be rounded, reformatted, or recalculated.
 *
 * CONFLICT(spec 0.1 vs scripts/check-copy-hyphens.mjs): the spec mandates em
 * dashes and this file is inside the check:copy walk, so the approved copy adds
 * violations to that report. The dashes below are required by the spec and are
 * deliberately not recast. check:copy is not wired into `npm run build` and
 * already failed before this change (see docs/sydra-em-dash-sweep.md). Ops must
 * decide whether the guardrail or the approved copy gives way.
 *
 * HOUSE STYLE(unresolved): the spec hyphenates compound modifiers this site
 * leaves open. "out-of-network", "per-claim" and "white-label" appear below,
 * against "out of network", "per claim" and "white label" everywhere else.
 * check:copy permits both, so nothing fails, but the homepage reads as though a
 * different hand wrote it. Not recast here because the strings are approved.
 * Ops decides: either the spec relaxes or the rest of the site closes up.
 */

export const HERO = {
  kicker: "Federal IDR · No Surprises Act",
  h1: "That payment is an opening offer.",
  subhead:
    "Most practices treat a payer's out-of-network payment as the amount owed. Under the No Surprises Act it isn't — federal IDR exists to contest it.",
} as const;

/** Analytics label per spec 9. Also the anchor target id, minus the underscore form. */
export type PathSlug =
  | "path_never_filed"
  | "path_contingency_client"
  | "path_rcm"
  | "path_contingency_firm";

export type PathCard = {
  slug: PathSlug;
  href: string;
  heading: string;
  body: string;
};

export type PathGroup = {
  label: string;
  cards: readonly [PathCard, PathCard];
};

export const PATH_GROUPS: readonly [PathGroup, PathGroup] = [
  {
    label: "You run a practice",
    cards: [
      {
        slug: "path_never_filed",
        href: "#path-never-filed",
        heading: "Never filed IDR?",
        body: "We find the qualifying claims, build the submissions, and hold every deadline.",
      },
      {
        slug: "path_contingency_client",
        href: "#path-contingency-client",
        heading: "Already using a contingency firm?",
        body: "Per-claim pricing instead of 20%+ of what you recover.",
      },
    ],
  },
  {
    label: "You serve practices",
    cards: [
      {
        slug: "path_rcm",
        href: "#path-rcm",
        heading: "Run an RCM company?",
        body: "Add an IDR service line without adding headcount. White-label available.",
      },
      {
        slug: "path_contingency_firm",
        href: "#path-contingency-firm",
        heading: "Run a contingency firm?",
        body: "Same engine, aimed at recoveries per FTE. Small claims finally pencil.",
      },
    ],
  },
] as const;

/**
 * The fourth cell is an approved addition to spec 4, not spec copy. Without it
 * the homepage sells software only: "5 min to prepare a submission" reads as
 * work the visitor does. But the first path above promises that Sydra
 * identifies the claims, assembles the submissions, and manages the deadlines,
 * and /recover, /r and /idr-for-billing-companies all already carry this cell
 * (see src/components/landing/hero-proof-stack.tsx). Dropping it here was the
 * only place on the site where full service went unmentioned, so a visitor who
 * cannot operate software concluded Sydra was not for them.
 *
 * Wording is taken verbatim from the existing proof stack so the two surfaces
 * cannot drift.
 */
export const PROOF_CELLS = [
  { value: "88%", label: "of properly filed federal IDR disputes get paid" },
  { value: "5 min", label: "to prepare a complete submission packet" },
  { value: "Or we file it", label: "our team handles every dispute end to end" },
  { value: "June 2026", label: "built for the current federal IDR rules" },
] as const;

export const THESIS = {
  heading: "IDR is a process problem, not a legal mystery.",
  body: "The rules and the deadlines are fixed. That is exactly what makes the work automatable.",
} as const;

export type PathDetail = {
  id: string;
  heading: string;
  body: string;
};

/** Order is the DOM order per spec 2. Do not reorder. */
export const PATH_DETAILS: readonly PathDetail[] = [
  {
    id: "path-never-filed",
    heading: "Never filed IDR?",
    body: "We identify which claims qualify, assemble submissions, and manage every deadline without changing how you practice or bill.",
  },
  {
    id: "path-contingency-client",
    heading: "Already using a contingency firm?",
    body: "Sydra runs per-claim/subscription pricing instead of a percentage of recovery, so costs stop scaling against you as your volume grows.",
  },
  {
    id: "path-rcm",
    heading: "Run an RCM company?",
    body: "IDR is still mostly manual work. Sydra supplies the automation layer so you can add or expand an IDR service line without scaling headcount, white-label available.",
  },
  {
    id: "path-contingency-firm",
    heading: "Run a contingency firm?",
    body: "Same engine, aimed at recoveries per FTE — automating the mechanical steps makes smaller claims worth pursuing and frees your team for the disputes where judgment matters.",
  },
] as const;

/**
 * NOT SPEC COPY. Deep links added on top of the approved build spec so each path
 * reaches the page written for that audience instead of dead ending in the CTA
 * block. Labels below are editable; every string above this point is not.
 *
 * Destinations are matched to the audience each section addresses:
 *   never-filed        -> the claim review, where Sydra identifies what qualifies
 *   contingency-client -> the three filing arrangements compared on cost
 *   rcm                -> multi tenant behaviour at billing company volume
 *   contingency-firm   -> the page written for firms, which argues per FTE
 *
 * never-filed previously pointed at /how-it-works. That page opens with the
 * reader drafting a submission in five minutes, which contradicts the promise
 * this section just made, that Sydra identifies the claims and manages the
 * deadlines. /case-review is the surface that actually delivers that promise:
 * send one EOB, get back what qualifies and what it is worth.
 */
export const PATH_DETAIL_LINKS: Record<string, { href: string; label: string }> = {
  "path-never-filed": { href: "/case-review", label: "Start with one denied claim" },
  "path-contingency-client": {
    href: "/sydra-vs-idr-attorney",
    label: "Compare your filing options",
  },
  "path-rcm": {
    href: "/idr-for-billing-companies",
    label: "See Sydra at billing company volume",
  },
  "path-contingency-firm": {
    href: "/idr-for-contingency-firms",
    label: "See the per FTE argument",
  },
};

export const RESULTS_INTRO = {
  heading: "What this looks like in practice",
  body: "Two anonymized examples from Sydra's book of business. The first shows the gap between what payers initially pay and what federal IDR can award. The second compares Sydra's outcomes against the contingency firm the practice used previously.",
} as const;

/**
 * Em dash meaning "no case example available" (spec 6.1). It is required copy.
 * Never render it as "N/A", "0", or an empty cell.
 */
export const NO_CASE_EXAMPLE = "—";

/**
 * TODO(ops): spec 12.1. Two questions block this table, and neither can be
 * answered by inspecting the numbers:
 *
 *   1. Geography. "Area Avg Initial Payment" averages over some region. Which?
 *      RESULTS_DISCLAIMER currently says "the applicable geographic region",
 *      which is true but tells a reader nothing. Name the region.
 *   2. Denominator. "Median" is a median of what: initial payments, or awards?
 *      A median award of $747.71 against a $3,116.33 average initial payment
 *      (CPT 19364) only makes sense under one of those readings, and a reader
 *      who picks the wrong one draws the opposite conclusion.
 *
 * Do not publish without answers. The vintage is registered as cms-puf-2025-q4
 * in src/lib/content/sources.json; add the geography and denominator there and
 * to the column labels at the same time.
 */
export const PRACTICE_A = {
  caption: "Practice A, plastic and reconstructive surgery: area payment benchmarks by CPT code",
  heading: "Practice A — plastic & reconstructive surgery",
  subLabel: "Source: 2025 Public Use File (PUF) data, Quarter 4",
  columns: [
    "CPT Code",
    "Description",
    "Area Avg Initial Payment",
    "Median",
    "Case Example",
  ],
  /**
   * `caseExample: null` renders the em dash that means "no case example
   * available" (spec 6.1). Never render it as "N/A", "0", or an empty cell.
   */
  rows: [
    {
      cpt: "19318",
      description: "Breast reduction",
      areaAverage: "$2,031.61",
      median: "$1,479.26",
      caseExample: "QPA $2,500 → award $50,742.00 (20.30x QPA)",
      footnoted: true,
    },
    {
      cpt: "15734",
      description: "Muscle/myocutaneous flap",
      areaAverage: "$2,623.45",
      median: "$968.18",
      caseExample: null,
      footnoted: false,
    },
    {
      cpt: "19357",
      description: "Breast reconstruction (tissue expander)",
      areaAverage: "$2,048.21",
      median: "$1,863.53",
      caseExample: null,
      footnoted: false,
    },
    {
      cpt: "19364",
      description: "Free flap breast reconstruction",
      areaAverage: "$3,116.33",
      median: "$747.71",
      caseExample: null,
      footnoted: false,
    },
  ],
  footnote: "Single case. Not a typical or expected result.",
} as const;

/** No em dash placeholder: the em dash in the heading is required copy. */
export const PRACTICE_B = {
  caption:
    "Practice B: Sydra outcomes compared with the contingency firm the practice used previously",
  heading: "Practice B — established IDR filer, switched from a contingency firm",
  columns: ["Metric", "Sydra", "Prior Contingency Firm"],
  rows: [
    { metric: "Decided cases", sydra: "113", prior: "76" },
    { metric: "Win rate", sydra: "92%", prior: "82.9%" },
    { metric: "Loss rate", sydra: "8%", prior: "17.1%" },
    { metric: "Fee structure", sydra: "Per-claim / subscription", prior: "20% contingency" },
  ],
} as const;

/**
 * Required on the same page as the tables above (spec 5, 6, 7). Must render as
 * selectable, crawlable text at 12px or larger and 4.5:1 contrast or better.
 * Do not relocate, truncate, or replace with an image.
 */
export const RESULTS_DISCLAIMER =
  "Disclaimer: The figures above reflect actual outcomes for specific Sydra clients and are presented with client permission. Practice names and identifying details have been removed. Payment averages and medians are derived from the 2025 federal Independent Dispute Resolution Public Use File (PUF), Quarter 4, and reflect reported activity for the referenced procedure codes in the applicable geographic region; they are not Sydra performance figures. Individual case examples are single outcomes and are not typical, average, or expected results. Win rates reflect decided cases only for the referenced client over the period measured and do not include withdrawn, ineligible, or pending disputes. Past results do not guarantee or predict future outcomes. Eligibility for federal IDR, applicable deadlines, and award amounts depend on the specific facts of each claim, the applicable plan, and current federal regulations, which are subject to change. Nothing on this page is legal, financial, billing, or coding advice. Sydra is not a law firm and does not provide legal representation.";

/**
 * Spec 8 opens with "Request a 15-min demo" wired to a scheduler modal. That
 * button is withheld until a booking provider is live: offering a demo the site
 * cannot actually book is the problem the spec was trying to avoid. "Set up a
 * call" with the published number takes its place, so the primary action is one
 * a visitor can complete right now.
 *
 * TODO(scheduler): once Calendly or equivalent is provisioned, restore the demo
 * button as the primary action with the approved label "Request a 15-min demo",
 * and keep the call, calculator, and email options below it.
 */
export const CTA_BLOCK = {
  heading: "Worth a 15-minute call?",
  body: "We'd welcome a short call to see if this is worth pursuing.",
  call: "Set up a call",
  calculator: "What's your claim worth?",
  question: "Ask a question",
} as const;

/**
 * Spec 8 removed the source email's "Not sure yet, will reach out" option on
 * purpose: on a page it is a button that goes nowhere. Do not re-add it.
 */

/*
 * Spec 3.1 asked for a header CTA labelled "Request a 15-min demo". It is not
 * defined here, and the shared header in src/components/sydra/header.tsx keeps
 * pointing at /case-review, for the same reason CTA_BLOCK withholds its demo
 * button: there is no booking provider yet, so a demo ask the site cannot
 * fulfil is worse than a claim review it can. The header is also shared by
 * every route, so changing it would swap the primary CTA on roughly forty
 * pages, not just this one.
 *
 * TODO(scheduler): revisit alongside the CTA_BLOCK note above once Calendly or
 * equivalent is live. Both should change together or not at all.
 */
