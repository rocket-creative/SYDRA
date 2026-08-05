import { Suspense } from "react";

import { CaseReviewLeadForm } from "@/components/landing/case-review-lead-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { CASE_REVIEW_PATH } from "@/lib/case-review";
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
        <Suspense fallback={<div className="min-h-[320px] rounded-sm bg-white" />}>
          <CaseReviewLeadForm />
        </Suspense>
      </div>
    </SydraPageShell>
  );
}
