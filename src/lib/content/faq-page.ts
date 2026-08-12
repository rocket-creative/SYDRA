import { caseReviewUrl } from "@/lib/case-review";
import { siteUrl } from "@/lib/site";

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_PAGE_ITEMS: FaqItem[] = [
  {
    q: "How long does it actually take to prepare an IDR submission in Sydra?",
    a: "Under 5 minutes for a standard single CPT claim where the operative note is already uploaded and the provider profile is built. The time breaks down: 30 to 60 seconds to upload the EOB and run the eligibility check. 60 to 90 seconds to review the automatically generated draft. 30 seconds to approve and export the DOCX. After the first five to ten submissions, experienced billers report the process taking closer to 3 minutes per claim. The 30 minute comparison is based on the manual process: pulling the EOB, looking up QPA, drafting a market rate argument from scratch, writing a clinical narrative, gathering credentials, and formatting for the portal. Sydra automates the documentation step. The review is still human. The drafting isn't.",
  },
  {
    q: "Does Sydra batch CPT codes?",
    a: "Sydra defaults to one claim per eligible CPT code. If your EOB contains three CPT codes, Sydra prepares three separate submission packets by default, each with a procedure specific payment offer, CPT specific market rate justification, clinical narrative, and credentials for that code. Batching is CMS sanctioned as of the May 28, 2026 final rule and available if your team wants it for a specific submission. You decide per submission. Federal IDR is final offer arbitration, so a batched offer covering several CPT codes can win or lose together. CMS data shows providers win 88% of IDR disputes industry wide (H1 2025). Filing individually is the setting that generally protects that win rate.",
  },
  {
    q: "What CPT codes does Sydra's determination library cover?",
    a: "Sydra has ingested 213+ IDR determinations. The library is weighted toward surgical specialties: Spine: 22612, 22630, 22633, 22840, 22842, 63030, 63047, 63055, and related add ons. Orthopedic: 27447, 27130, 29881, 29882, 23412, 29806, 29827, 27570, and related codes. Neurosurgery: 61510, 61512, 61520, 63047, 63055, and selected cranial procedure codes. Plastics and hand: 25447, 26356, 26115, 19364, and selected reconstructive codes. For codes not in the library at a state specific level: Sydra uses national comparison data and flags lower library confidence on the market rate section. Complete current coverage available to review on your demo call.",
  },
  {
    q: "What does Sydra cost?",
    a: "Pricing is shared on your demo call after we understand your specialty, state, and monthly OON claim volume. What we can tell you: Sydra's platform fee is structured below typical 20% attorney contingency fees for most practices at most claim volumes. Exact quote on your demo call. No obligation.",
  },
  {
    q: "How does Sydra handle HIPAA and patient data security?",
    a: "IDR submissions contain PHI. Sydra handles PHI under these controls: AI processing runs on Claude Sonnet 4 on AWS Bedrock. PHI stays inside the AWS HIPAA eligible service boundary during generation. No data is sent to Anthropic's infrastructure. Storage: Amazon S3, AES 256 encryption at rest. TLS 1.2 or higher for all data in transit. Strict per practice tenant isolation at the database row level. BAA: Standard BAA available for covered entities. Email sales@sydrahealth.com. SOC 2: SOC 2 aligned controls. Report available under NDA on request. See the full security page at " + siteUrl() + "/security.",
  },
  {
    q: "What happens if an IDR dispute loses?",
    a: "A determination against the provider's offer means the insurer's offer was selected. Both parties pay the IDRE administrative fee (currently $50 per dispute). Sydra tracks adverse determinations in your dashboard. After the 90 calendar day cooling off period, the same code and payer combination is eligible for re filing. If you have Sydra + Support, your Sydra specialist reviews adverse determinations with you at the monthly account review. CMS data shows 88% of properly filed disputes result in provider wins.",
  },
  {
    q: "How long does it take to get set up on Sydra?",
    a: "Most practices are operational within one week of signing the BAA. Day 1 to 2: We provision your practice tenant and send login credentials. Day 2 to 3: Your billing lead uploads the first provider CV and we build the provider profile. Day 3 to 4: ModMed integration configured if applicable. Day 4 to 5: First claim run in the platform with your billing lead watching. Day 5 to 7: Second and third claims run independently.",
  },
  {
    q: "What if my practice doesn't want to run software at all?",
    a: "Sydra Full Service handles every IDR claim end to end. Your practice forwards EOBs. The Sydra team handles eligibility, documentation, submission, and tracking. Zero software for your billing team to operate. Get a free IDR review at " + caseReviewUrl() + ".",
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
