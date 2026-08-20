import { ClaimReviewSampleDocument } from "@/components/sydra/claim-review-sample-document";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  CALL_CTA_LABEL,
  CALL_PATH,
  CASE_REVIEW_PATH,
  CASE_REVIEW_SAMPLE_PATH,
  PRIMARY_CTA_SHORT_LABEL,
} from "@/lib/case-review";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Sample Claim Review: Eligibility and Dollars | Sydra";
const DESCRIPTION =
  "Labeled sample Sydra claim review: eligibility, dollar range, filing deadline, and what we would submit. Figures are representative, not from a specific practice.";

export const metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: CASE_REVIEW_SAMPLE_PATH,
});

const crumbs = [
  ...BREADCRUMBS.caseReview,
  { name: "Sample", path: CASE_REVIEW_SAMPLE_PATH },
];

export default function ClaimReviewSamplePage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: CASE_REVIEW_SAMPLE_PATH,
            name: "Sample claim review",
            description: DESCRIPTION,
          }),
        ]}
      />
      <SydraPageShell banded breadcrumb={crumbs}>
        <Section ariaLabelledby="heading-sample-review" sidebarLabel="Sample" tone="white">
          {/*
            The ask sits above the document as well as below it. The sample runs
            several screens, and a reader who is convinced by the first page
            should not have to scroll past all of it to act.
          */}
          <div className="prose-measure mb-12 border-b border-rule pb-10">
            <p className="type-body text-body">
              This is what comes back on one of your own claims: whether it qualifies, what the
              window is, and what the gap is worth. Send one denied out of network EOB and you get
              this within one business day.
            </p>
            <div className="cta-row mt-6">
              <Button href={CASE_REVIEW_PATH} showArrow>
                {PRIMARY_CTA_SHORT_LABEL}
              </Button>
              <Button href={CALL_PATH} variant="ghost">
                {CALL_CTA_LABEL}
              </Button>
            </div>
          </div>
          <ClaimReviewSampleDocument />
          <p className="prose-measure mt-12">
            <Button href={CASE_REVIEW_PATH} showArrow>
              {PRIMARY_CTA_SHORT_LABEL}
            </Button>
          </p>
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
