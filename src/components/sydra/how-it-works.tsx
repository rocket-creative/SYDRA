import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const steps = [
  {
    n: "01",
    title: "Upload the EOB",
    body: "Paste or drag the EOB into Sydra. If your practice uses ModMed, the EOB data flows directly from your EMR through the Stedi clearinghouse integration. No copy paste. Sydra immediately runs an eligibility check: Is this claim NSA eligible? Is the plan type covered? Is there an active cooling off period for this CPT and payer combination? Has open negotiation been properly initiated?",
    note: "44% of 2024 IDR disputes were challenged as ineligible by payers. CMS data, Zelis analysis, March 2026. Eligibility errors are the leading cause of IDR processing delays. Sydra surfaces these before the submission, not after.",
  },
  {
    n: "02",
    title: "Review the draft",
    body: "Sydra generates a complete IDR submission packet using Claude Sonnet 4 on AWS Bedrock: executive summary, market rate justification from 213+ ingested determinations weighted toward surgical specialties, clinical necessity narrative drafted from your uploaded operative note (Bedrock multimodal reads the PDF directly), and provider credentials from your profile. Your billing team reads the draft, makes edits, and signs off. Nothing leaves the practice until a human has reviewed and approved it.",
  },
  {
    n: "03",
    title: "Export and submit",
    body: "One click DOCX export. The guided submission checklist walks your biller through the IDRE portal field by field. Track status in the Sydra dashboard. Total time on a standard single CPT claim with documents on file: under 5 minutes.",
  },
] as const;

export function SydraHowItWorks() {
  return (
    <Section
      ariaLabelledby="heading-how-it-works"
      id="how-it-works"
      sidebarLabel="Process"
      tone="neutral"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <ImagePlaceholder aspect="4/5" className="lg:sticky lg:top-24" />
        <div className="min-w-0">
          <h2 className="type-h2 prose-measure text-brand" id="heading-how-it-works">
            What your billing team actually does in Sydra.
          </h2>
          <div className="mt-10 space-y-0">
            {steps.map((s, i) => (
              <article
                key={s.n}
                className={`border-t border-rule py-8 ${i === steps.length - 1 ? "border-b" : ""}`}
              >
                <p className="type-caption text-[var(--color-accent)]">{s.n}</p>
                <h3 className="mt-2 text-lg font-medium text-brand md:text-xl">{s.title}</h3>
                <p className="mt-3 type-body text-body">{s.body}</p>
                {"note" in s && s.note ? (
                  <p className="mt-3 text-sm leading-relaxed text-body/80">{s.note}</p>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-8">
            <CtaLink href="/how-it-works">Full workflow</CtaLink>
          </p>
        </div>
      </div>
    </Section>
  );
}
