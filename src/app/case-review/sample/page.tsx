import { ClaimReviewSampleDocument } from "@/components/sydra/claim-review-sample-document";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { CASE_REVIEW_PATH, CASE_REVIEW_SAMPLE_PATH, PRIMARY_CTA_SHORT_LABEL } from "@/lib/case-review";
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
          <ClaimReviewSampleDocument />
          <p className="prose-measure mt-12">
            <Button href={CASE_REVIEW_PATH} showArrow>
              {PRIMARY_CTA_SHORT_LABEL}
            </Button>
          </p>
        </Section>
      </SydraPageShell>
    </>
  );
}
