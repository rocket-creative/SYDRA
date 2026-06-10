import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { ContactForm } from "@/components/sydra/contact-form-page";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import {
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  supportMailtoHref,
} from "@/lib/contact";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import {
  localBusinessJsonLd,
  organizationContactPoint,
  sydraOrganizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.contact;

function pageTitle(): string {
  const meta = PAGE_METADATA.contact;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Contact Sydra";
}

function ContactPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.contact]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/contact",
            name: pageTitle(),
            description: PAGE_METADATA.contact.description ?? "",
          }),
          {
            ...sydraOrganizationJsonLd(),
            contactPoint: organizationContactPoint(),
          },
          localBusinessJsonLd(),
        ]}
      />
    </>
  );
}

export default function ContactPage() {
  const salesEmail = getSalesEmail();
  const supportEmail = getSupportEmail();

  return (
    <>
      <ContactPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.contact]}>
        <Section ariaLabelledby="heading-contact" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-contact">
              Contact Sydra.
            </h1>
            <p className={textStyles.pageLead}>
              Different questions go to different places. Use the guide below.
            </p>
          </header>
        </Section>

        <Section sidebarLabel="Routing" tone="neutral">
        <div className="space-y-8 prose-measure">
          <section aria-labelledby="routing-new">
            <h2 className={textStyles.subsectionTitle} id="routing-new">
              New to Sydra: demo or pricing
            </h2>
            <p className={`${textStyles.body} mt-2`}>
              Use the form below or email {salesEmail}. Response within one business day. Include
              your specialty and estimated monthly OON claim volume for a pricing range.
            </p>
          </section>

          <section aria-labelledby="routing-procurement">
            <h2 className={textStyles.subsectionTitle} id="routing-procurement">
              Evaluating for procurement: security docs
            </h2>
            <p className={`${textStyles.body} mt-2`}>
              Email {salesEmail} with your compliance contact copied. Subject line: Security package
              request. We send the BAA template, security one pager, and subprocessor list the same
              business day.
            </p>
          </section>

          <section aria-labelledby="routing-support">
            <h2 className={textStyles.subsectionTitle} id="routing-support">
              Existing customers: support
            </h2>
            <p className={`${textStyles.body} mt-2`}>
              Email {supportEmail} for platform questions. Hours: 9 to 5 ET, Monday through Friday.
              Sydra + Kronos Support customers: your Kronos specialist is your first call on claim
              level questions.
            </p>
          </section>

          <section aria-labelledby="routing-full-service">
            <h2 className={textStyles.subsectionTitle} id="routing-full-service">
              Want every claim handled without running software
            </h2>
            <p className={`${textStyles.body} mt-2`}>
              That&apos;s Kronos Revenue Full Service on our sister site.{" "}
              <a
                className={textStyles.textLink}
                href={kronosCaseReviewUrl()}
                rel="noopener noreferrer"
                target="_blank"
              >
                Get a free IDR review
              </a>
              . Phone:{" "}
              <a className={textStyles.textLink} href="tel:+19147056830">
                (914) 705 6830
              </a>{" "}
              · intake@kronosrevenue.com
            </p>
          </section>
        </div>
        </Section>

        <Section sidebarLabel="Demo" tone="white">
        <section aria-labelledby="heading-contact-form" className="prose-measure">
          <h2 className={textStyles.sectionTitle} id="heading-contact-form">
            Schedule a demo or ask a question.
          </h2>
          <div className="mt-6 border-t border-rule pt-8">
            <ContactForm />
          </div>
        </section>
        </Section>

        <Section tone="neutral">
        <section aria-labelledby="heading-direct" className="prose-measure">
          <h2 className={textStyles.sectionTitle} id="heading-direct">
            Direct contacts
          </h2>
          <ul className={`${textStyles.listNone} mt-4`}>
            <li>
              Sales and demos:{" "}
              <a className={textStyles.textLink} href={salesMailtoHref()}>
                {salesEmail}
              </a>
            </li>
            <li>
              Customer support:{" "}
              <a className={textStyles.textLink} href={supportMailtoHref()}>
                {supportEmail}
              </a>
            </li>
            <li>Kronos Revenue full service IDR: intake@kronosrevenue.com</li>
            <li>
              Phone (Kronos Revenue):{" "}
              <a className={textStyles.textLink} href="tel:+19147056830">
                (914) 705 6830
              </a>
            </li>
            <li>Hours: 9 to 5 ET, Monday through Friday</li>
            <li>
              Mailing: Kronos Health · 244 Westchester Ave, Suite 209 · West Harrison, NY 10604
            </li>
          </ul>
          <p className="mt-6">
            <Link className={textStyles.textLink} href="/demo">
              Or schedule a demo directly
            </Link>
          </p>
        </section>
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
