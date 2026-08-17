import { ClaimReviewForm } from "@/components/landing/claim-review-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { CtaLink } from "@/components/ui/cta-link";
import { CASE_REVIEW_PATH, CASE_REVIEW_SAMPLE_PATH } from "@/lib/case-review";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.caseReview;

export default function CaseReviewPage() {
  return (
    <SydraPageShell
      breadcrumb={[...BREADCRUMBS.caseReview]}
      headerVariant="funnel"
      mainClassName="px-5 py-12 md:px-10 md:py-16"
    >
      <BreadcrumbJsonLd items={[...BREADCRUMBS.caseReview]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: CASE_REVIEW_PATH,
            name: "Get Your Free Claim Review | Sydra",
            description: PAGE_METADATA.caseReview.description ?? "",
          }),
        ]}
      />
      <div className="mx-auto max-w-xl">
        <ClaimReviewForm source="case-review" />
        <p className="mt-6">
          <CtaLink href={CASE_REVIEW_SAMPLE_PATH}>See a sample review</CtaLink>
        </p>
      </div>
    </SydraPageShell>
  );
}
