import { Section } from "@/components/ui/section";

export function FounderNote() {
  return (
    <Section ariaLabelledby="heading-founder" sidebarLabel="Why surgeon built" tone="neutral">
      <h2 className="type-h2 prose-measure text-brand" id="heading-founder">
        Built by a surgeon who files these claims
      </h2>
      <p className="prose-measure mt-6 type-body text-body">
        Sydra and Kronos Revenue are built by{" "}
        <strong className="font-medium text-brand">Kronos Health</strong>, founded by{" "}
        <strong className="font-medium text-brand">Dr. John M. Abrahams, MD</strong>, a board
        certified neurosurgeon. Specialty depth for orthopedics, neurosurgery, spine, and plastics.
        One claim per CPT, every time.
      </p>
    </Section>
  );
}
