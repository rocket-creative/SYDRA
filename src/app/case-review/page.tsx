import { ClaimReviewForm } from "@/components/landing/claim-review-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { CtaLink } from "@/components/ui/cta-link";
import {
  CASE_REVIEW_PATH,
  CASE_REVIEW_SAMPLE_PATH,
  CLAIM_REVIEW_OFFER,
} from "@/lib/case-review";
import {
  FOUNDER_ORIGIN_ATTRIBUTION,
  FOUNDER_ORIGIN_LINE,
  FOUNDER_ORIGIN_ROLE,
} from "@/lib/content/founder-lines";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.caseReview;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function resolveClaimReviewSource(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const trimmed = value?.trim() ?? "";
  if (trimmed.length > 0 && trimmed.length <= 80) return trimmed;
  return "case-review";
}

export default async function CaseReviewPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const source = resolveClaimReviewSource(query.source);
  return (
    <SydraPageShell
      breadcrumb={[...BREADCRUMBS.caseReview]}
      headerVariant="funnel"
      mainClassName="px-4 py-12 md:px-10 md:py-16"
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
        <header>
          <h1 className={textStyles.pageTitle}>See what one denied claim is worth.</h1>
          <p className={textStyles.pageLead}>{CLAIM_REVIEW_OFFER}</p>
        </header>
        <figure className="mt-8">
          <blockquote className="type-body text-body">{FOUNDER_ORIGIN_LINE}</blockquote>
          <figcaption className="mt-3 text-sm text-body">
            <strong className="font-medium text-brand">{FOUNDER_ORIGIN_ATTRIBUTION}</strong>
            {" — "}
            {FOUNDER_ORIGIN_ROLE}
          </figcaption>
        </figure>
        <p className="mt-8">
          <CtaLink href={CASE_REVIEW_SAMPLE_PATH}>See a sample review</CtaLink>
        </p>
        <div className="mt-8">
          <ClaimReviewForm source={source} />
        </div>
      </div>
    </SydraPageShell>
  );
}
