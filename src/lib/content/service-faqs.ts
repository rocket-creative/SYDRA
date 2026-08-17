export type ServiceFaqItem = { q: string; a: string };

export const HOW_IT_WORKS_FAQ: ServiceFaqItem[] = [
  {
    q: "How does Sydra work?",
    a: "You upload an EOB and the supporting documents. Sydra runs the eligibility check, identifies the eligible CPT, pulls comparable prior determinations, drafts the clinical narrative from the operative note, assembles the six required elements, and exports a submission ready packet. Your team reviews and files.",
  },
  {
    q: "Why does filing matter so much to the outcome?",
    a: "Because the entity picks one offer and does not split. The dispute is decided on which side documented its number better. Preparation is not administrative overhead in this process; it is the argument.",
  },
  {
    q: "How long does the IDR process take from start to finish?",
    a: "The open negotiation period runs 30 business days, and IDR must be initiated within 4 business days after it closes. Determination timelines after that vary with entity workload.",
  },
  {
    q: "Do I need to do anything manually?",
    a: "Yes, deliberately. Nothing files itself. Sydra prepares the submission; your billing team reviews every decision and submits through the IDRE portal.",
  },
  {
    q: "Can Sydra handle claims across multiple payers and multiple states?",
    a: "Yes. Determination comparables are filtered by CPT code and state, so a submission is built against the market the dispute actually sits in.",
  },
];

export const SECURITY_FAQ: ServiceFaqItem[] = [
  {
    q: "Is patient data encrypted?",
    a: "Yes. Documents are stored in Amazon S3 with AES 256 server side encryption, with keys managed through AWS Key Management Service. All data between your browser and Sydra's servers is transmitted over TLS 1.2 or higher.",
  },
  {
    q: "Is Sydra HIPAA compliant?",
    a: "Sydra handles PHI under HIPAA controls, running on Claude via Amazon Bedrock, a HIPAA eligible AWS service, and operating within AWS's HIPAA Business Associate Agreement for that workload. Claude is contractually barred from training on your PHI, no PHI is transmitted to Anthropic's systems, and no data is used to train the Claude model or any other model. A standard BAA is available for all covered entities and business associates using Sydra to process PHI.",
  },
  {
    q: "Who has access to my billing data?",
    a: "Within your practice, access is role based. You define which staff can view, draft, approve, or export, and permissions are granted explicitly rather than inherited by default. Between practices, strict tenant isolation is enforced at the application logic, API authorization, database row level security, and audit logging layers. Internally at Sydra, software engineering team access is governed by internal HIPAA training, the Full Service RCM team only has access for practices using Sydra plus Support, leadership has access for quality review and escalated cases, and no PHI is accessible to sales or marketing without an operational need.",
  },
  {
    q: "Where is data hosted?",
    a: "Sydra production workloads run on AWS infrastructure in US regions.",
  },
  {
    q: "What happens if there's a security incident involving my data?",
    a: "Sydra maintains documented incident response procedures covering detection, escalation, containment, recovery, and customer notification. If an incident involves your PHI, notification follows the timeline specified in your BAA, which is 60 days per HIPAA. Sydra has not had a reportable incident involving customer PHI to date.",
  },
  {
    q: "Does Sydra share data with payers or third parties beyond what's required to file a dispute?",
    a: "Subprocessors with access to data in scope are AWS, Stedi, ModMed, and others listed in the subprocessor list available on request. Data submitted in an IDR filing goes to the certified IDR entity and the payer as required by the federal process, consistent with what the dispute itself requires.",
  },
  {
    q: "Can I get an audit trail of who accessed my data?",
    a: "Yes. Every log entry captures user name, email, user ID, UTC timestamp, action performed, record affected, IP address, and session identifier. Logs are available to your account administrator on request.",
  },
];

export const PRICING_FAQ: ServiceFaqItem[] = [
  {
    q: "Are there setup fees?",
    a: "No setup fees on Self Serve or Sydra + Support.",
  },
  {
    q: "Is there a minimum contract term?",
    a: "No. Month to month available on all Sydra tiers.",
  },
  {
    q: "Can we switch tiers?",
    a: "Yes. Many practices start Self Serve and add Support or move to Full Service. Tier switches don't require a new onboarding process.",
  },
  {
    q: "How does Sydra pricing compare to a typical 20% contingency?",
    a: "For a practice with 20 claims per month, $15,000 average disputed amount, 88% win rate: a typical 20% contingency: $633,600 in annual fees on recoveries. Sydra platform fee: quoted to your volume, structured below that figure. The exact comparison is part of what we show you on the demo call.",
  },
];
