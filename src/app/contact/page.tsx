import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { ContactForm } from "@/components/sydra/contact-form-page";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import {
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  supportMailtoHref,
} from "@/lib/contact";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import { organizationContactPoint, sydraOrganizationJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

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
      <SydraPageShell breadcrumb={[...BREADCRUMBS.contact]}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            Contact Sydra.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
            Different questions go to different places. Use the guide below.
          </p>

          <div className="mt-10 space-y-8">
            <section aria-labelledby="routing-new">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="routing-new">
                New to Sydra — want a demo or pricing
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                Use the form below or email {salesEmail}. Response within one business day.
                Include your specialty and estimated monthly OON claim volume for a pricing range.
              </p>
            </section>

            <section aria-labelledby="routing-procurement">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="routing-procurement">
                Evaluating for procurement — need security docs
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                Email {salesEmail} with your compliance contact copied. Subject line: Security
                package request. We send the BAA template, security one pager, and subprocessor
                list the same business day.
              </p>
            </section>

            <section aria-labelledby="routing-support">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="routing-support">
                Existing customers — support
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                Email {supportEmail} for platform questions. Hours: 9 to 5 ET, Monday through
                Friday. Sydra + Kronos Support customers: your Kronos specialist is your first
                call on claim level questions.
              </p>
            </section>

            <section aria-labelledby="routing-full-service">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="routing-full-service">
                Want every claim handled without running software
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                That is Kronos Revenue Full Service on our sister site.{" "}
                <a
                  className="font-medium text-[rgb(0,40,184)] underline"
                  href={kronosCaseReviewUrl()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Get a free IDR review
                </a>
                . Phone: (914) 705 6830 · intake@kronosrevenue.com
              </p>
            </section>
          </div>

          <section aria-labelledby="heading-contact-form" className="mt-14">
            <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-contact-form">
              Schedule a demo or ask a question.
            </h2>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <ContactForm />
            </div>
          </section>

          <section aria-labelledby="heading-direct" className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-direct">
              Direct contacts
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-[#4A5568]">
              <li>
                Sales and demos:{" "}
                <a className="font-medium text-[rgb(0,40,184)] underline" href={salesMailtoHref()}>
                  {salesEmail}
                </a>
              </li>
              <li>
                Customer support:{" "}
                <a className="font-medium text-[rgb(0,40,184)] underline" href={supportMailtoHref()}>
                  {supportEmail}
                </a>
              </li>
              <li>Kronos Revenue full service IDR: intake@kronosrevenue.com</li>
              <li>Phone (Kronos Revenue): (914) 705 6830</li>
              <li>Hours: 9 to 5 ET, Monday through Friday</li>
              <li>
                Mailing: Kronos Health · 244 Westchester Ave, Suite 209 · West Harrison, NY
                10604
              </li>
            </ul>
            <p className="mt-6">
              <Link
                className="text-sm font-semibold text-[rgb(0,40,184)] underline"
                href="/demo"
              >
                Or schedule a demo directly →
              </Link>
            </p>
          </section>

          <SourcesReferences className="mt-12" />
        </div>
      </SydraPageShell>
    </>
  );
}
