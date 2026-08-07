import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PrivacyRequestForm } from "@/components/sydra/privacy-request-form";
import { Section } from "@/components/ui/section";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.doNotSell;

function pageTitle(): string {
  const meta = PAGE_METADATA.doNotSell;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Do Not Sell or Share My Personal Information | Sydra";
}

function DoNotSellJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.doNotSell]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/do-not-sell",
            name: pageTitle(),
            description: PAGE_METADATA.doNotSell.description ?? "",
          }),
        ]}
      />
    </>
  );
}

export default function DoNotSellPage() {
  return (
    <>
      <DoNotSellJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.doNotSell]} headerVariant="funnel">
        <Section ariaLabelledby="heading-do-not-sell" tone="white">
          <div className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-do-not-sell">
              Do not sell or share my personal information
            </h1>
            <p className={textStyles.pageLead}>
              Use this form to opt out of sale or sharing of your personal information for
              advertising (including Google Customer Match), unsubscribe from marketing emails, or
              request deletion of marketing site data. Details are in our{" "}
              <Link className={textStyles.textLink} href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section sidebarLabel="Privacy request" tone="neutral">
          <div className="max-w-xl">
            <PrivacyRequestForm />
          </div>
        </Section>
      </SydraPageShell>
    </>
  );
}
