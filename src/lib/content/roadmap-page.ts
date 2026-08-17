export type RoadmapItem = {
  id: string;
  title: string;
  body: string;
};

export const ROADMAP_HERO = {
  title: "What we're building now.",
  subtitle: "So you know what to expect on a demo, and what isn't there yet.",
  intro:
    "Everything below is in development. It is listed here so that a demo does not surprise you in either direction. You will see what exists, and you will not be shown a slide about something that doesn't.",
};

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "heading-billing-company-account",
    title: "Billing company account structure",
    body: "Today, Sydra supports a medical billing company managing disputes for multiple independent surgeon clients as long as those clients are set up under the billing company's Sydra platform. We're building a dedicated account structure that sits above individual provider profiles, purpose built for billing companies managing several TINs and NPIs under one relationship. In active development.",
  },
  {
    id: "heading-bulk-claims-import",
    title: "Bulk claims import",
    body: "Uploading a single EOB to check eligibility works today. We're building bulk import for 835 remittance files, ERA data, and other billing data, so a high volume operation can feed claims in at scale instead of one at a time. In active development.",
  },
  {
    id: "heading-automatic-eligibility",
    title: "Automatic eligibility scanning",
    body: "Sydra checks eligibility on every claim you upload today. We're building automatic identification of potentially eligible out of network claims across a full claim feed, so eligible claims surface on their own instead of requiring a manual upload first. In active development.",
  },
  {
    id: "heading-payment-follow-up",
    title: "Payment follow up tracking",
    body: "Open negotiation notices, business day deadlines, IDR initiation, batching, and evidence and offer deadlines are all tracked today. Automated payment follow up once a case is won is in active development.",
  },
  {
    id: "heading-insurance-card-review",
    title: "Insurance card review for jurisdiction determination",
    body: "Sydra determines whether a claim routes to Federal IDR or a state specific process using the EOB remark codes on the claim today. Adding insurance card detail as a second data point, to make that determination even more reliable, is planned.",
  },
];

export const ROADMAP_FAQ = [
  {
    q: "Is Sydra finished, or is the platform still being built out?",
    a: "Sydra is a live platform in active use today, handling eligibility checks, offer preparation, IDR filing, deadline tracking, and case status for practices and billing companies right now. We're also building specific new capability on an ongoing basis, most of it aimed at making bulk operations easier for larger billing organizations. Anything not yet live is listed above rather than left unstated.",
  },
];
