import { StaggerChild, StaggerParent } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";

const steps = [
  {
    n: "01",
    title: "Import the denied or underpaid claim.",
    body: "Eligibility and CPT mapped automatically.",
  },
  {
    n: "02",
    title: "Review the auto built IDR packet.",
    body: "Sydra assembles the federal submission in about five minutes.",
  },
  {
    n: "03",
    title: "Submit and keep the recovery.",
    body: "Your team files; your EMR stays your EMR.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section
      ariaLabelledby="heading-how-sydra-works"
      id="how-sydra-works"
      sidebarLabel="How Sydra works"
      tone="neutral"
    >
      <h2 className="type-h2 prose-measure text-brand" id="heading-how-sydra-works">
        Three steps from denial to federal IDR
      </h2>
      <StaggerParent>
        <ol className="mt-10 space-y-0">
          {steps.map((step, index) => (
            <li key={step.n}>
              <div aria-hidden className="rule-reveal border-t border-rule" />
              <StaggerChild className="py-8">
                <p className="type-caption text-[var(--color-accent)]">{step.n}</p>
                <h3 className="mt-2 text-lg font-medium text-brand">{step.title}</h3>
                <p className="mt-3 type-body text-body">{step.body}</p>
              </StaggerChild>
              {index === steps.length - 1 ? (
                <div aria-hidden className="rule-reveal border-t border-rule" />
              ) : null}
            </li>
          ))}
        </ol>
      </StaggerParent>
      <p className="mt-10 max-w-2xl text-base italic text-brand">
        Your team reviews. Your team submits. You keep the recovery.
      </p>
    </Section>
  );
}
