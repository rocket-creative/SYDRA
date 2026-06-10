import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { Section } from "@/components/ui/section";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.terms;

function pageTitle(): string {
  const meta = PAGE_METADATA.terms;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Terms of Use";
}

function TermsPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.terms]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/terms",
            name: pageTitle(),
            description: PAGE_METADATA.terms.description ?? "",
          }),
        ]}
      />
    </>
  );
}

export default function TermsPage() {
  return (
    <>
      <TermsPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.terms]} headerVariant="funnel">
        <Section ariaLabelledby="heading-terms" tone="white">
          <div className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-terms">
              Terms of use
            </h1>
            <p className={textStyles.pageLead}>
              By using this website you agree to these terms. This site is for informational and
              lead capture purposes. Use of the Sydra software is governed by separate customer
              agreements and BAAs.
            </p>
          </div>
        </Section>

        <Section sidebarLabel="Terms" tone="neutral">
          <article className="prose-measure">
            <h2 className={textStyles.sectionTitle}>No medical or legal advice</h2>
            <p className={`${textStyles.body} mt-3`}>
              Content on this site isn&apos;t medical, legal, or billing advice. Outcomes depend on
              payer behavior, IDRE decisions, and your documentation.
            </p>
            <h2 className={`${textStyles.sectionTitle} mt-10`}>Accuracy</h2>
            <p className={`${textStyles.body} mt-3`}>
              We strive to keep product descriptions current but don&apos;t guarantee every
              statement reflects the latest release. Demo calls confirm fit and capabilities for
              your practice.
            </p>
            <p className={`${textStyles.meta} mt-10`}>
              Questions?{" "}
              <Link className={textStyles.textLink} href="/contact">
                Contact us
              </Link>
              .
            </p>
          </article>
        </Section>
      </SydraPageShell>
    </>
  );
}
