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
    q: "Does the platform identify potentially eligible out of network claims automatically?",
    a: "Yes, per claim. Sydra runs an eligibility check on each uploaded EOB before your team invests time in a packet, checking the claim against NSA eligibility and open negotiation requirements.",
  },
  {
    q: "How does Sydra determine whether a claim belongs in Federal IDR versus a state specific dispute process?",
    a: "Two questions decide it. First, whether the health plan is self funded or fully insured, since self funded ERISA plans always route to federal IDR regardless of state. Second, if the plan is fully insured, whether that state has its own specified state law covering the service in question. Where one applies, state law controls instead of federal IDR.",
  },
  {
    q: "What functionality is currently available for New Jersey, New York, and New Hampshire disputes?",
    a: "New York, New Jersey, and New Hampshire all have dedicated jurisdiction guides and state pages covering their process specifics, including New York's three year lookback allowing providers to challenge commercial payments going back three years. Operationally, Sydra is currently live or rolling out in Texas, California, New York, New Jersey, Florida, and Arizona for 2026. New Hampshire is not currently on that operational list.",
  },
  {
    q: "Does the system manage open negotiation and IDR filing deadlines?",
    a: "Yes. Deadlines and eligibility windows run on deterministic software rather than a model, so the 30 business day open negotiation period and the 4 business day IDR initiation window are tracked without relying on AI judgment. Batching is available, and your team chooses whether to batch per submission rather than it being automatic.",
  },
  {
    q: "What payer level, CPT level, provider level, and geographic level analytics are available?",
    a: "Sydra publishes aggregate published federal benchmarks, sourced from CMS public use files and Georgetown CHIR, broken out by specialty and award multiple.",
  },
  {
    q: "How is Sydra adapting its platform to the new CMS IDR Gateway and the Federal IDR operational changes being implemented in 2026?",
    a: "The May 28, 2026 CMS final rule cut the federal IDR administrative fee from $115 to $15 per party per dispute and formally sanctioned batching, both of which Sydra's platform already reflects. CMS is also rolling out a new centralized IDR Gateway in phases through late 2026, replacing the old single use web forms.",
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
