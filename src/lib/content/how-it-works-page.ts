export type HowItWorksSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const HOW_IT_WORKS_HERO = {
  title: "What a federal IDR submission requires, and what Sydra does with each part.",
  subtitle: "Step by step, element by element.",
  paragraphs: [
    "Federal IDR is final offer arbitration. The entity picks one offer — yours or the plan's — based on which is better supported. Six elements decide that, and every one of them has to be built.",
    "Building them by hand takes 25 to 40 minutes per claim. That number, not the law, is what limits how many disputes a practice files. This page describes what each element requires and what Sydra does with it.",
  ],
};

export const SUBMISSION_REQUIREMENTS: HowItWorksSection = {
  id: "heading-requirements",
  title: "What a complete federal IDR submission requires.",
  paragraphs: [
    "Six elements. A submission missing any one of them is weaker on the axis the entity actually scores.",
  ],
  list: [
    "The provider's payment offer: a specific dollar amount per CPT code. Not a range. One number with the basis for that number documented.",
    "Market rate justification: evidence that the provider's offer is consistent with what other providers receive for the same service in the same geographic market. Prior determination citations do the work a generic usual and customary argument can't.",
    "Clinical necessity documentation: tied to the operative note, specific to the patient's clinical circumstances. The arbitrator needs to understand why this procedure, at this complexity, at this fee, is reasonable.",
    "Provider credentials: training, board certifications, procedure volume on the specific CPT. An arbitrator deciding between a $14,000 and an $8,500 offer on a complex spinal fusion benefits from knowing the surgeon has performed 500 of that exact procedure.",
    "Open negotiation documentation: proof that a Notice of Open Negotiation was sent and that the 30 business day period elapsed without agreement.",
    "Eligibility confirmation: evidence the claim meets federal IDR requirements. 44% of 2024 IDR disputes were challenged as ineligible. CMS data, Zelis analysis, March 2026.",
  ],
};

export const SUBMISSION_FOOTNOTE =
  "Building all six from scratch on a single claim: 25 to 40 minutes. Sydra handles elements 1 through 4. Your team provides the EOB and operative note. Your team reviews and submits.";

export const SYDRA_ELEMENTS: HowItWorksSection[] = [
  {
    id: "element-1",
    title: "Element 1 — Payment offer",
    paragraphs: [
      "The offer must be a specific dollar figure per CPT code, not a range. Claude, the AI built by Anthropic and run via Amazon Bedrock, identifies the correct CPT code from the EOB, and Sydra prepares the formal offer statement against it.",
    ],
  },
  {
    id: "element-2",
    title: "Element 2 — Market rate justification",
    paragraphs: [
      "This is the element that most often decides the outcome, and the one that takes longest by hand. Sydra pulls prior IDR determinations from a library of 213+ ingested cases, filtered to your CPT code and your state, and cites them in the submission.",
    ],
  },
  {
    id: "element-3",
    title: "Element 3 — Clinical necessity narrative",
    paragraphs: [
      "Upload the operative note as a PDF. Claude via Amazon Bedrock reads the document directly through its multimodal layer, with no OCR and no copy and paste, and drafts the clinical narrative from what the note actually says.",
    ],
  },
  {
    id: "element-4",
    title: "Element 4 — Provider credentials",
    paragraphs: [
      "Training, board certifications, and procedure volume for the CPT in dispute. Sydra maintains a provider profile built from the surgeon's CV. Upload it once as a DOCX and it populates every subsequent submission.",
    ],
  },
  {
    id: "element-5",
    title: "Element 5 — Open negotiation documentation",
    paragraphs: [
      "Proof that the 30 business day period elapsed. If you have sent an Open Negotiation Notice, upload it, and Sydra attaches it with the required proof of delivery fields populated.",
    ],
  },
  {
    id: "element-6",
    title: "Element 6 — Eligibility verification",
    paragraphs: [
      "44 percent of 2024 IDR cases were challenged as ineligible. At EOB upload, Sydra runs a real time eligibility check through the Stedi clearinghouse using a 270/271 transaction, so a claim that will not survive challenge is flagged before anyone drafts against it.",
    ],
  },
];

export const DOCX_SECTION: HowItWorksSection = {
  id: "heading-docx",
  title: "The export and the submission checklist.",
  paragraphs: [
    "Sydra produces a DOCX and PDF packet and a guided checklist for the IDRE portal. Nothing files itself. Your billing team reviews every decision and submits.",
  ],
};

export const ONE_PER_CPT_SECTION: HowItWorksSection = {
  id: "heading-one-per-cpt",
  title: "One claim per CPT by default, and why that still matters.",
  paragraphs: [
    "Federal IDR is final offer arbitration. The entity picks one offer. There are no splits: it picks the offer better supported by evidence, and a submission covering one procedure is easier to support than one covering four.",
    "Sydra defaults to one claim per CPT code because that setting generally protects win rate. Batching is CMS sanctioned as of the final rule of May 28, 2026, effective June 11, 2026, at up to 50 qualified items per dispute, and is available when your team wants it.",
  ],
};

export const HOW_IT_WORKS_HOW_TO_STEPS: { name: string; text: string }[] = [
  {
    name: "Flag the claim",
    text: "Sydra checks each underpaid or denied claim against the qualifying payment amount and payer history to identify strong IDR candidates",
  },
  {
    name: "Review the offer",
    text: "Sydra calculates a recommended offer amount and assembles the supporting documentation",
  },
  {
    name: "Approve and file",
    text: "You approve the offer, and Sydra submits it to the correct certified IDR entity for that payer and state",
  },
  {
    name: "Track the case",
    text: "Sydra monitors the thirty business day federal timeline and flags any case falling behind",
  },
  {
    name: "Receive the decision",
    text: "The certified IDR entity issues a binding decision, and Sydra applies the result to your claim record",
  },
];
