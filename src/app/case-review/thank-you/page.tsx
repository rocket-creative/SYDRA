import { LeadConversionOnMount } from "@/components/analytics/lead-conversion-on-mount";
import { Button } from "@/components/ui/button";
import { CalendlyEmbed } from "@/components/sydra/calendly-embed";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SALES_PHONE_DISPLAY, SALES_PHONE_TEL } from "@/lib/contact";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.caseReviewThankYou;

export default function CaseReviewThankYouPage() {
  return (
    <SydraPageShell
      breadcrumb={[
        ...BREADCRUMBS.caseReview,
        { name: "Thank you", path: "/case-review/thank-you" },
      ]}
      headerVariant="funnel"
      mainClassName="px-4 py-16 md:px-10 md:py-24"
    >
      <LeadConversionOnMount action="free_demo" />
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <p className="type-caption text-[var(--color-accent)]">Confirmed</p>
          <h1 className="type-h2 mt-4 text-brand">Claim review request received</h1>
          <p className="mt-6 type-body text-body">
            Our team reviews every request and will follow up within one business day with a clear
            recommendation for your practice. If you want to see Sydra on a live claim, pick a time
            below.
          </p>
          <p className="mt-4 type-body text-body">
            Or set up a call:{" "}
            <a className="underline underline-offset-2" href={SALES_PHONE_TEL}>
              {SALES_PHONE_DISPLAY}
            </a>
          </p>
        </div>
        <CalendlyEmbed className="mt-10" />
        <div className="mt-10">
          <Button href="/" variant="ghost">
            Back to homepage
          </Button>
        </div>
      </div>
    </SydraPageShell>
  );
}
