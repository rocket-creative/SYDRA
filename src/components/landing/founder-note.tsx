import { Section } from "@/components/ui/section";
import { FOUNDER_MARKETING_BYLINE } from "@/lib/content/founder-lines";

export function FounderNote() {
  return (
    <Section ariaLabelledby="heading-founder" sidebarLabel="Why surgeon built" tone="neutral">
      <h2 className="type-h2 prose-measure text-brand" id="heading-founder">
        Built by a surgeon who files these claims
      </h2>
      <p className="prose-measure mt-6 type-body text-body">
        Sydra is built by{" "}
        <strong className="font-medium text-brand">{FOUNDER_MARKETING_BYLINE}</strong>.
        Specialty depth for orthopedics, neurosurgery, spine, and plastics. Files one claim per CPT
        by default, because it protects your win rate. Batching is available and CMS sanctioned as of
        the 2026 rule. You decide per submission.
      </p>
    </Section>
  );
}
