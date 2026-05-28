import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.privacy;

function pageTitle(): string {
  const meta = PAGE_METADATA.privacy;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Privacy Policy";
}

function PrivacyPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.privacy]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/privacy",
            name: pageTitle(),
            description: PAGE_METADATA.privacy.description ?? "",
          }),
        ]}
      />
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.privacy]} headerVariant="funnel">
        <article className="prose-measure">
          <h1 className={textStyles.pageTitle}>Privacy policy</h1>
          <p className={textStyles.pageLead}>
            Kronos Health operates the Sydra marketing site. This policy describes how we handle
            information submitted through demo requests, contact forms, and email links on this
            site.
          </p>
          <h2 className={`${textStyles.sectionTitle} mt-10`}>Information we collect</h2>
          <p className={`${textStyles.body} mt-3`}>
            When you schedule a demo or contact us, we collect the information you provide: name,
            work email, practice name, specialty, state, and related qualification fields. We
            don&apos;t collect payment information on this site.
          </p>
          <h2 className={`${textStyles.sectionTitle} mt-10`}>How we use it</h2>
          <p className={`${textStyles.body} mt-3`}>
            We use submitted information to respond to inquiries, schedule demos, and evaluate
            whether Sydra is a fit for your practice. We don&apos;t sell contact information to
            third parties.
          </p>
          <h2 className={`${textStyles.sectionTitle} mt-10`}>PHI on this site</h2>
          <p className={`${textStyles.body} mt-3`}>
            Don&apos;t submit protected health information through this marketing site. PHI belongs
            in the Sydra application under a signed BAA.
          </p>
          <p className={`${textStyles.meta} mt-10`}>
            Questions?{" "}
            <Link className={textStyles.textLink} href="/contact">
              Contact us
            </Link>
            .
          </p>
        </article>
      </SydraPageShell>
    </>
  );
}
