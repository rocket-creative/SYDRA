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
  list?: string[];
};

export const SECURITY_HERO = {
  title: "How Sydra handles protected health information.",
  intro:
    "An NSA IDR submission contains your patient's name, date of service, diagnosis, procedure codes, operative note excerpts, and disputed claim amounts. Every document uploaded to Sydra is protected health information under HIPAA. This page describes how we handle PHI specifically.",
};

export const SECURITY_TRUST_CARDS: SecurityTrustCard[] = [
  { id: "baa", title: "BAA available", summary: "For covered entities on request during contracting." },
  { id: "bedrock", title: "AWS Bedrock", summary: "Claude Sonnet 4 on HIPAA eligible infrastructure." },
  { id: "encryption", title: "Encryption", summary: "AES 256 at rest, TLS 1.2+ in transit." },
  { id: "isolation", title: "Tenant isolation", summary: "Strict per practice row level security." },
  {
    id: "soc2",
    title: "SOC 2 aligned",
    summary: "SOC 2 aligned controls. Report available under NDA during evaluation.",
  },
];

export const SOC2_SECTION: SecuritySection = {
  id: "heading-soc2",
  title: "SOC 2 alignment.",
  paragraphs: [
    "Sydra's controls are SOC 2 aligned, covering security, availability, and confidentiality for the systems that process customer data.",
    "A SOC 2 report is available under NDA to qualified prospects during evaluation. Email sales@kronosrevenue.health with your compliance contact copied and we'll send it the same business day.",
  ],
};

export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    id: "heading-bedrock",
    title: "How Claude via Amazon Bedrock handles your PHI.",
    paragraphs: [
      "Sydra runs on Claude via Amazon Bedrock. Claude is contractually barred from training on your PHI, and Bedrock is covered under our AWS Business Associate Agreement. Your claim data is processed inside the same HIPAA aligned boundary as the rest of your workflow.",
      "AWS Bedrock is a HIPAA eligible service. AWS's HIPAA BAA covers Amazon Bedrock when used in the context of a covered healthcare workload. Sydra operates within that BAA scope.",
      "When Sydra generates an IDR draft from your operative note: the operative note is processed by Claude via Amazon Bedrock. PHI in that document stays inside the AWS HIPAA eligible service boundary. No PHI is transmitted to Anthropic's systems or any other third party during generation. No data is used to train the Claude model or any other model.",
    ],
  },
  {
    id: "heading-infrastructure",
    title: "Infrastructure and encryption.",
    paragraphs: [],
    list: [
      "Hosting: Sydra production workloads run on AWS infrastructure in US regions.",
      "Encryption at rest: Documents are stored in Amazon S3 with AES 256 server side encryption. Keys managed through AWS Key Management Service (KMS).",
      "Encryption in transit: All data between your browser and Sydra's servers is transmitted over TLS 1.2 or higher.",
      "Document access: Documents aren't accessible through persistent public URLs. Retrieval uses signed URLs with short expiry windows (minutes, not days).",
      "Database: PHI is stored with row level security. Each practice has a unique tenant identifier. Queries are scoped to the authenticated practice's tenant by default.",
    ],
  },
  {
    id: "heading-access",
    title: "Access control and isolation.",
    paragraphs: [
      "Within your practice: Role based access control. You define which staff members can view, draft, approve, or export. Permissions are granted explicitly, not inherited by default.",
      "Between practices: Strict tenant isolation enforced at multiple layers: application logic, API authorization, database row level security, and audit logging.",
      "Within Kronos Health: Software engineering team access is governed by internal HIPAA training. Kronos Revenue RCM team access to PHI only for practices using Sydra + Kronos Support. Leadership access for quality review and escalated cases. No PHI accessible to sales or marketing without an operational need.",
    ],
  },
  {
    id: "heading-audit",
    title: "Audit logging.",
    paragraphs: [
      "Every log entry captures: user name, email, user ID, timestamp (UTC to the second), action performed, record affected (submission ID, document ID), IP address, session identifier. Logs are available to your account administrator on request.",
    ],
  },
  {
    id: "heading-baa",
    title: "Business Associate Agreement.",
    paragraphs: [
      "A BAA is available for all covered entities and business associates using Sydra to process PHI. The BAA is executed during contracting. What the BAA covers: permitted uses and disclosures of PHI, our obligation to safeguard PHI, breach notification timelines (60 day notification per HIPAA), your right to audit our compliance, data return or destruction on termination, subprocessor obligations.",
      `If you want to review the BAA template before booking a demo, email ${SALES_EMAIL_FALLBACK}. We send it the same business day.`,
    ],
  },
  {
    id: "heading-incident",
    title: "Incident response.",
    paragraphs: [
      "Documented incident response procedures covering detection, escalation, containment, recovery, and customer notification. If an incident involves your PHI: We notify you per the timeline in your BAA. We haven't had a reportable incident involving customer PHI.",
    ],
  },
  {
    id: "heading-docs",
    title: "Requesting security documentation.",
    paragraphs: [
      "Available to qualified prospects during evaluation: BAA template, security one pager, subprocessor list (AWS, Stedi, ModMed, and others in scope), AWS Bedrock HIPAA eligibility documentation, SOC 2 report under NDA.",
      `Request: email ${SALES_EMAIL_FALLBACK} with your compliance contact copied. Response within one business day.`,
    ],
  },
];

export const SECURITY_CTA = {
  demoLabel: "Schedule a demo",
  mailtoLabel: "Email the security package request",
};
