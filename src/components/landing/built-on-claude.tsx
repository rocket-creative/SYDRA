import { Section } from "@/components/ui/section";

const layers = [
  {
    label: "Deterministic software",
    title: "The deadlines never depend on a model.",
    body: "Eligibility windows, the open negotiation clock, and the one claim per CPT structure run on deterministic software. No model decides whether you are in time to file.",
  },
  {
    label: "Claude via Amazon Bedrock",
    title: "Reasoning runs on a named frontier model.",
    body: "Claude reads each operative note and EOB, identifies the eligible CPT, calculates qualified payment amounts by geography, and drafts the market rate and clinical argument for that specific dispute.",
  },
  {
    label: "Human escalation",
    title: "Your team approves every filing.",
    body: "Your billing team reviews every draft and submits. Nothing files itself. On Sydra plus Kronos Support, a specialist escalates disputed cases.",
  },
] as const;

export function BuiltOnClaude() {
  return (
    <Section ariaLabelledby="heading-built-on-claude" id="built-on-claude" sidebarLabel="Built on Claude" tone="white">
      <h2 className="type-h2 prose-measure text-brand" id="heading-built-on-claude">
        Built by people who read the AI billing horror stories too
      </h2>
      <p className="prose-measure mt-6 type-body text-body">
        The unattributed black box is the part you should worry about. Sydra is not that. The work
        is split across three layers, and you can see where each one starts and stops.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {layers.map((layer) => (
          <article key={layer.label} className="editorial-card bg-white p-6 sm:p-8">
            <p className="type-caption text-[var(--color-accent)]">{layer.label}</p>
            <h3 className="mt-3 text-lg font-medium text-brand">{layer.title}</h3>
            <p className="mt-4 type-body text-body">{layer.body}</p>
          </article>
        ))}
      </div>
      <p className="prose-measure mt-10 text-base italic text-brand">
        Sydra runs on Claude via Amazon Bedrock. A named frontier model with published safety
        standards, inside the same AWS boundary your IT team already trusts.
      </p>
    </Section>
  );
}
