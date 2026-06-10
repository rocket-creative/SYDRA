import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
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
    a: "No. Sydra files one claim per eligible CPT code. If your EOB contains three CPT codes, Sydra generates three separate submission packets. Each with a procedure specific payment offer, CPT specific market rate justification, clinical narrative specific to that procedure, and the provider credentials relevant to that code. The one CPT per claim structure isn't configurable. Federal IDR is final offer arbitration. A batched offer covering three CPT codes can't be matched cleanly to any single prior determination. CMS data shows providers win 88% of IDR disputes industry wide (H1 2025). The practices reaching that win rate are filing correctly. Batched filings underperform it.",
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
    a: "A determination against the provider's offer means the insurer's offer was selected. Both parties pay the IDRE administrative fee (currently $50 per dispute). Sydra tracks adverse determinations in your dashboard. After the 90 calendar day cooling off period, the same code and payer combination is eligible for re filing. If you have Sydra + Kronos Support, your Kronos specialist reviews adverse determinations with you at the monthly account review. CMS data shows 88% of properly filed disputes result in provider wins.",
  },
  {
    q: "How long does it take to get set up on Sydra?",
    a: "Most practices are operational within one week of signing the BAA. Day 1 to 2: We provision your practice tenant and send login credentials. Day 2 to 3: Your billing lead uploads the first provider CV and we build the provider profile. Day 3 to 4: ModMed integration configured if applicable. Day 4 to 5: First claim run in the platform with your billing lead watching. Day 5 to 7: Second and third claims run independently.",
  },
  {
    q: "What if my practice doesn't want to run software at all?",
    a: "Kronos Full Service on our sister site handles every IDR claim end to end. Your practice forwards EOBs. The Kronos Revenue team handles eligibility, documentation, submission, and tracking. Zero software for your billing team to operate. Get a free IDR review at " + kronosCaseReviewUrl() + ".",
  },
];

/** @deprecated Categories removed in spec Part 6 */
export const FAQ_CATEGORIES = ["All"] as const;
