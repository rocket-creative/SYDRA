import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

export type SecurityTrustCard = {
  id: string;
  title: string;
  summary: string;
};

export type SecuritySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const SECURITY_HERO = {
  eyebrow: "Security and compliance",
  title: "Built for HIPAA and PHI",
  intro:
    "Billing leaders and compliance reviewers use this page before they book a demo. Sydra is designed for practices that handle protected health information under HIPAA, with a Business Associate Agreement available on request.",
};

export const SECURITY_TRUST_CARDS: SecurityTrustCard[] = [
  {
    id: "baa",
    title: "BAA on request",
    summary:
      "Business Associate Agreements for covered entities and their billing teams, executed as part of contracting.",
  },
  {
    id: "aws",
    title: "AWS hosting",
    summary:
      "Production workloads on AWS with region appropriate data residency for healthcare workloads.",
  },
  {
    id: "encryption",
    title: "Encryption",
    summary: "TLS in transit and encryption at rest through cloud provider controls.",
  },
  {
    id: "access",
    title: "Access control",
    summary:
      "Role based access, least privilege, and strict tenant isolation between practices.",
  },
  {
    id: "audit",
    title: "Audit logging",
    summary: "Sensitive operations are logged for review and accountability.",
  },
  {
    id: "soc2",
    title: "SOC 2 aligned",
    summary:
      "Controls aligned with SOC 2. Formal report available to qualified prospects under NDA.",
  },
];

export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    id: "heading-hipaa",
    title: "HIPAA and Business Associate Agreements",
    paragraphs: [
      "Sydra is built to support HIPAA safeguards for electronic protected health information your billing team processes in the NSA IDR workflow.",
      "We provide a Business Associate Agreement on request for covered entities and business associates. The BAA is executed during contracting, not published on this marketing site.",
      "Workforce members with access to production systems complete HIPAA awareness training as part of onboarding.",
    ],
  },
  {
    id: "heading-hosting",
    title: "Infrastructure and data residency",
    paragraphs: [
      "Production runs on AWS infrastructure designed for healthcare workloads. Data residency follows region appropriate hosting for U.S. practices.",
      "Cloud providers in scope maintain their own BAAs where PHI is processed. We review subprocessors as part of vendor management.",
    ],
  },
  {
    id: "heading-application",
    title: "Application safeguards",
    paragraphs: [
      "Each practice operates in a logically isolated tenant. Your data does not mingle with another customer’s claims or submissions.",
      "Role based access lets billing leads, admins, and physicians see only what their role requires. We apply least privilege by default for internal operations as well.",
      "Authentication supports modern session controls on the production application. Ask sales for current MFA options during evaluation.",
    ],
  },
  {
    id: "heading-integrations",
    title: "Integrations and PHI in workflow",
    paragraphs: [
      "ModMed and Stedi integrations move claim and EOB data through controlled paths. Your team reviews drafts before federal IDR submission.",
      "Customer PHI is not used to train third party foundation models without explicit contractual consent.",
    ],
  },
  {
    id: "heading-retention",
    title: "Retention, backup, and deletion",
    paragraphs: [
      "Retention follows your agreement and applicable regulations. Backups support continuity and recovery within our infrastructure program.",
      "Deletion requests are honored on written instruction from authorized practice contacts after identity verification.",
    ],
  },
  {
    id: "heading-incident",
    title: "Incident response",
    paragraphs: [
      "We maintain documented incident response procedures covering detection, escalation, containment, and customer notification where required by contract or law.",
      "Security events involving customer data are triaged by our operations team and leadership. Material incidents are communicated according to your BAA terms.",
    ],
  },
  {
    id: "heading-procurement",
    title: "Documentation for procurement",
    paragraphs: [
      "Qualified prospects can request a security summary one pager, SOC 2 report under NDA, and BAA template during evaluation.",
      `Use the form below or email ${SALES_EMAIL_FALLBACK} with your compliance contact copied. We typically respond within one business day.`,
    ],
  },
];

export const SECURITY_CTA = {
  formHeading: "Request security summary and demo",
  formIntro:
    "Submit your details and our sales team will send the security one pager and schedule a walkthrough if you need one.",
  mailtoLabel: "Email security one pager request",
};
