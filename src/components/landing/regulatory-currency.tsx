import { HomepageBand } from "@/components/landing/homepage-band";
import { CtaLink } from "@/components/ui/cta-link";

const CMS_RULE_URL =
  "https://www.cms.gov/newsroom/fact-sheets/federal-independent-dispute-resolution-operations-final-rule";

export function RegulatoryCurrency() {
  return (
    <HomepageBand ariaLabelledby="heading-regulatory-currency" id="built-for-the-rules" tone="white">
      <h2 className="home-h2 max-w-[720px] text-brand" id="heading-regulatory-currency">
        Built for the rules as they are now.
      </h2>
      <div className="home-body mt-6 max-w-[720px] space-y-5 text-body">
        <p>The federal IDR process changed materially in June 2026. Most billing workflows still run the old one.</p>
        <p>
          <strong className="font-medium text-brand">
            The administrative fee dropped from $115 to $15 per party, per dispute
          </strong>
          , effective June 11, 2026. Claims in the $1,500 to $5,000 range that were not economical to
          dispute a few months ago are now clearly worth filing.
        </p>
        <p>
          <strong className="font-medium text-brand">
            Open negotiation must now be initiated through the federal IDR portal
          </strong>
          , not directly with the payer. The window remains 30 business days, and it is unforgiving.
          There is no cure for missing it.
        </p>
        <p>
          <strong className="font-medium text-brand">
            Up to 50 qualified items can be batched into a single dispute
          </strong>
          , spreading the fee across claims where codes are identical or comparable.
        </p>
        <p>
          Sydra is built to the current rule. Every submission it drafts reflects the process as it
          operates today, not as it operated last year.
        </p>
      </div>
      <p className="mt-8">
        <CtaLink href="/idr/guide">Read the full federal IDR guide</CtaLink>
      </p>
      <p className="home-caption mt-6 text-body">
        Source:{" "}
        <a
          className="underline decoration-rule underline-offset-2 transition-colors hover:text-[var(--color-hero)]"
          href={CMS_RULE_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          CMS, Federal Independent Dispute Resolution Operations Final Rule, effective June 11, 2026
        </a>
        .
      </p>
    </HomepageBand>
  );
}
