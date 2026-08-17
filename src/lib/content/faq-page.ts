import { siteUrl } from "@/lib/site";

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_PAGE_ITEMS: FaqItem[] = [
  {
    q: "How long does it actually take to prepare an IDR submission in Sydra?",
    a: "Under 5 minutes for a standard single CPT claim, against roughly 30 minutes by hand. Upload and eligibility check runs 30 to 60 seconds, review 60 to 90 seconds, approve and export about 30 seconds. Past the first five to ten submissions most teams settle around three minutes.",
  },
  {
    q: "Does Sydra batch CPT codes?",
    a: "It defaults to one claim per CPT code, because federal IDR is final offer arbitration and a submission covering one procedure is easier to support than one covering four. Batching is CMS sanctioned as of the final rule of May 28, 2026, effective June 11, 2026, at up to 50 qualified items per dispute, and is available per submission when your team wants it.",
  },
  {
    q: "What CPT codes does Sydra's determination library cover?",
    a: "213+ ingested IDR determinations, weighted toward surgical specialties — spine, orthopedic, neurosurgery, and plastics and hand. Comparables are filtered to your CPT code and your state.",
  },
  {
    q: "What does Sydra cost?",
    a: "Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive. The right number depends on specialty, state, and monthly out of network volume, so it is quoted on a 15 minute call.",
  },
  {
    q: "How does Sydra handle HIPAA and patient data security?",
    a: "PHI is processed on Claude Sonnet 4 via AWS Bedrock, encrypted at rest with AES-256 in S3 and in transit with TLS 1.2 or above, with per practice isolation at the data layer. SOC 2 aligned. A BAA is available on request.",
  },
  {
    q: "What happens if an IDR dispute loses?",
    a: "The plan's offer is selected and the losing party pays the certified IDRE fee, currently $50. The same item cannot be re filed against the same party for a 90 calendar day cooling period. For properly filed disputes the base rate is 88 percent in the provider's favour, which is why preparation is the whole game.",
  },
  {
    q: "How long does it take to get set up on Sydra?",
    a: "Most practices are live within one week. Days 1 to 2, tenant provisioning. Days 2 to 3, CV upload and provider profile. Days 3 to 4, integration. Days 4 to 5, first claim run with us. Days 5 to 7, independent runs.",
  },
  {
    q: "What if my practice doesn't want to run software at all?",
    a: "Then we run it. Sydra Full Service handles federal IDR end to end. You forward the EOBs and nothing else changes in how you practice or how you bill.",
  },
];

export const FAQ_BILLING_SECTION_TITLE =
  "Billing companies and multi provider organizations";

export const FAQ_BILLING_COMPANY_ITEMS: FaqItem[] = [
  {
    q: "Can Sydra support a medical billing company managing disputes for multiple independent surgeon clients, with separate TINs and NPIs?",
    a:
      "Yes, as long as those clients are all set up under the medical billing company's Sydra platform. A dedicated billing company account structure, sitting above individual provider profiles rather than requiring each client to be configured as its own separate provider profile, is in active development. See " +
      siteUrl() +
      "/roadmap for status.",
  },
  {
    q: "Does the platform identify potentially eligible out of network claims automatically?",
    a: "Yes, per claim. Sydra runs an eligibility check on each uploaded EOB before your team invests time in a packet, checking the claim against NSA eligibility and open negotiation requirements.",
  },
  {
    q: "How does Sydra determine whether a claim belongs in Federal IDR versus a state specific dispute process?",
    a:
      "Two questions decide it. First, whether the health plan is self funded or fully insured, since self funded ERISA plans always route to federal IDR regardless of state. Second, if the plan is fully insured, whether that state has its own specified state law covering the service in question. Sydra determines this using the EOB remark codes on the claim. Reviewing insurance card details as an additional data point is planned, see " +
      siteUrl() +
      "/roadmap.",
  },
  {
    q: "What functionality is currently available for New Jersey, New York, and New Hampshire disputes?",
    a: "Sydra provides state regulation guidance for all three states today, including New York's three year lookback allowing providers to challenge commercial payments going back three years. Operational rollout is prioritized by client demand, New York and New Jersey are live first, with additional states added as client need grows. New Hampshire can be added quickly once there's a client need for it.",
  },
  {
    q: "Does the system manage open negotiation notices, business day deadlines, IDR initiation, batching, and evidence and offer deadlines?",
    a:
      "Yes. Deadlines and eligibility windows run on deterministic software rather than a model, so the open negotiation period and IDR initiation window are tracked without relying on AI judgment, and batching is available with your team choosing per submission. Automated payment follow up tracking is in active development, see " +
      siteUrl() +
      "/roadmap.",
  },
  {
    q: "Can we establish our own negotiation parameters, settlement thresholds, and IDR offer strategies?",
    a: "Yes. You control your own offer strategy and settlement thresholds rather than being locked into a fixed methodology.",
  },
  {
    q: "What payer level, CPT level, provider level, and geographic level analytics are available for prior negotiations and IDR outcomes?",
    a: "Three layers. Published federal benchmarks sourced from CMS public use files, your own historical data from prior wins and losses as you add it, and broader market data sourced from Optum and FairHealth.",
  },
  {
    q: "Can all of our claim, payer, settlement, and outcome data be exported, and who owns the underlying data?",
    a: "Yes, all of it can be exported, and you own your data.",
  },
  {
    q: "How is Sydra adapting its platform to the new CMS IDR Gateway and the Federal IDR operational changes being implemented in 2026?",
    a: "Several ways, all already built in rather than planned. Sydra generates submissions that are Gateway ready and mirrors the Gateway's own case model, so as CMS migrates from single use forms to the centralized portal, intake, documentation, and status tracking already line up with it, no spreadsheets and no re keying. Sydra maintains a payer registration lookup so every dispute identifies the correct plan the first time, removing a common cause of rejected or delayed filings under the new identification requirements. The new batching criteria, same encounter items, same service code across patients, and specialty CPT ranges, are encoded directly into the platform, which auto groups line items up to the 50 item cap to maximize what goes into each dispute and lower the effective per claim fee. With eligibility and information requests now running on 5 business day clocks and open negotiation responses due by day 15, missed deadlines mean lost disputes, so Sydra's tracking and alerts are built around these exact windows, and the required eligibility documentation is auto assembled to match the expanded notice requirements. Because unpaid fees now cause a party's offer to be disregarded entirely, Sydra tracks the $15 fee and offer deadlines per dispute, while batching keeps the total fee burden low relative to the recovery. Sydra also reads the CARC and RARC remittance codes payers are now required to use to flag NSA applicability, so the platform automatically surfaces underpaid out of network claims that are actually eligible, the top of the recovery funnel.",
  },
  {
    q: "What does Sydra cost?",
    a: "Pricing is quoted per practice based on specialty and monthly out of network volume, confirmed on a demo call.",
  },
  {
    q: "Is there a minimum volume commitment?",
    a: "No minimum volume commitment and no minimum contract term are required on the standard tiers, month to month is available.",
  },
  {
    q: "What is the implementation timeline?",
    a: "Most practices are operational within one week of signing the BAA.",
  },
  {
    q: "What are the API and integration capabilities?",
    a: "Sydra lists AWS, Stedi, and ModMed as subprocessors and integrates with ModMed during onboarding.",
  },
  {
    q: "Is Sydra HIPAA compliant, and is a BAA available?",
    a: "Sydra handles PHI under HIPAA controls, running on Claude via Amazon Bedrock, a HIPAA eligible AWS service, operating within AWS's HIPAA BAA scope for that workload. Claude is contractually barred from training on your PHI, and no PHI reaches Anthropic's systems. A standard BAA is available for covered entities and business associates, covering permitted uses and disclosures, 60 day breach notification, audit rights, and data return or destruction on termination.",
  },
  {
    q: "What is Sydra's SOC 2 status?",
    a: "Sydra's controls are SOC 2 aligned, covering security, availability, and confidentiality. The full report is available under NDA to qualified prospects, requested through sales@sydrahealth.com.",
  },
  {
    q: "What security controls are in place?",
    a: "AES 256 encryption at rest through Amazon S3 and KMS, TLS 1.2 or higher in transit, strict per practice tenant isolation enforced at the application, API, database, and audit logging layers, and role based access control within each practice. Full audit logging captures user, timestamp, action, and IP address, available to the account administrator on request.",
  },
  {
    q: "What are the contract terms?",
    a: "No setup fees on Self Serve or Support tiers, no minimum contract term, month to month available.",
  },
];

/** @deprecated Categories removed in spec Part 6 */
export const FAQ_CATEGORIES = ["All"] as const;
