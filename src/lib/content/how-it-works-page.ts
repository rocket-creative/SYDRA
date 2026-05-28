export type HowItWorksSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const HOW_IT_WORKS_HERO = {
  title: "How Sydra prepares a federal IDR submission.",
  subtitle: "Step by step, element by element.",
  lead: "This page describes what Sydra does from the moment you upload an EOB to the moment your billing team exports a submission ready packet for the IDRE portal. The federal IDR submission requirements are specific. This page covers them specifically.",
};

export const SUBMISSION_REQUIREMENTS: HowItWorksSection = {
  id: "heading-requirements",
  title: "What a complete federal IDR submission requires.",
  paragraphs: [
    "A single federal IDR submission requires:",
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
      "Sydra identifies the correct CPT code from the EOB and prepares the formal offer statement. One claim per CPT. If the EOB contains multiple CPT codes, Sydra generates a separate submission packet for each. Never batched.",
      "The one CPT per claim structure isn't configurable. It's how federal IDR was designed, and it's what the data shows produces the best outcomes for providers.",
    ],
  },
  {
    id: "element-2",
    title: "Element 2 — Market rate justification",
    paragraphs: [
      "Sydra pulls prior IDR determinations from its library of 213+ ingested cases, filtered to your specific CPT code and your state. The market rate section cites those determinations directly with case identifiers and determination amounts.",
    ],
  },
  {
    id: "element-3",
    title: "Element 3 — Clinical necessity narrative",
    paragraphs: [
      "Upload the operative note as a PDF. Sydra's Bedrock multimodal layer reads the document using Claude Sonnet 4. No OCR. No copy paste. The PDF is processed directly.",
      "Sydra extracts: the procedure performed, surgical approach, clinical indication, surgeon's documentation of complexity, intraoperative findings relevant to clinical justification, and technique specific details that distinguish this case from a templated submission.",
      "The narrative draft is built from those extracted elements, not from a template. Your billing team reviews. If something in the operative note strengthens the clinical argument, Sydra surfaces it. If the biller sees something that needs adjustment, they edit it. The draft is a starting point. The human is still the reviewer.",
    ],
  },
  {
    id: "element-4",
    title: "Element 4 — Provider credentials",
    paragraphs: [
      "Sydra maintains a provider profile built from the surgeon's CV. Upload the CV once as a DOCX. Sydra extracts: board certifications, fellowship training, procedure volume by CPT category, publications, and practice affiliations.",
      "Each submission automatically includes the credential block relevant to the CPT being filed. A craniotomy submission includes the surgeon's neurosurgical training and cranial procedure volume. A total knee submission includes orthopedic training and arthroplasty volume.",
    ],
  },
  {
    id: "element-5",
    title: "Element 5 — Open negotiation documentation",
    paragraphs: [
      "If you have sent an Open Negotiation Notice, upload it. Sydra attaches it with the required proof of delivery fields populated. If you haven't yet sent it, Sydra flags this before generating the submission. IDR can't be initiated without completing the open negotiation step.",
    ],
  },
  {
    id: "element-6",
    title: "Element 6 — Eligibility verification",
    paragraphs: [
      "At EOB upload, Sydra runs a real time eligibility check through the Stedi clearinghouse (270/271 transaction) if the practice is connected to ModMed. For manual uploads, Sydra reviews the claim data against federal eligibility criteria and flags any concerns.",
      "Any eligibility flag is surfaced before the draft is generated. You resolve the flag or you don't file the claim. The system prevents ineligible submissions from being prepared.",
    ],
  },
];

export const DOCX_SECTION: HowItWorksSection = {
  id: "heading-docx",
  title: "The DOCX export and submission checklist.",
  paragraphs: [
    "When your billing team approves the draft, one click export generates a submission ready DOCX.",
    "The DOCX contains: the formal payment offer letter, market rate justification with prior determination citations, clinical necessity narrative, provider credential block, and an appendix with all supporting documents.",
    "The guided checklist walks your biller through the IDRE portal step by step: what goes where, what attachments are required, what the confirmation looks like.",
    "Nothing is submitted automatically. Your billing team controls the submission.",
  ],
};

export const ONE_PER_CPT_SECTION: HowItWorksSection = {
  id: "heading-one-per-cpt",
  title: "The one per CPT rule and why it matters.",
  paragraphs: [
    "Federal IDR is final offer arbitration. The IDRE picks one offer. No splits. The IDRE picks the offer better supported by evidence.",
    "When multiple CPT codes are batched into one submission, the composite offer can't map cleanly to any single prior determination. The submission performs worse.",
    "Sydra files one claim per CPT. If your case involves CPT 22612, 22632, 22840, and 63030, that's four submissions. Each takes under 5 minutes in Sydra. Total: under 20 minutes for four procedure specific, prior determination cited IDR packets.",
    "The alternative: one batched submission in 30 to 40 minutes that performs materially worse at arbitration. The math isn't complicated.",
  ],
};
