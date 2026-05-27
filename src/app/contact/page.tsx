import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import {
  getContactPhoneDisplay,
  getContactPhoneTel,
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  supportMailtoHref,
} from "@/lib/contact";
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
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();
  const salesEmail = getSalesEmail();

  return (
    <>
      <ContactPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.contact]}>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            Contact and support
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
            Hours: 9:00 to 5:00 ET, Monday through Friday. Form submissions and
            sales inquiries go to {salesEmail}. You will receive a confirmation at
            your work email within a few minutes.
          </p>
          {phone && phoneTel ? (
            <p className="mt-3 text-base font-medium text-[#1A2B48]">
              <a
                className="underline decoration-slate-300 underline-offset-2 hover:decoration-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                href={phoneTel}
              >
                {phone}
              </a>
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <section aria-labelledby="heading-demo-contact">
            <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-demo-contact">
              Schedule a demo
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
              Tell us about your practice. Our sales team reviews every request and
              replies within one business day.
            </p>
            <div className="mt-6">
              <DemoFunnelForm />
            </div>
          </section>

          <div className="mt-14 grid gap-10 border-t border-slate-200 pt-14 sm:grid-cols-2">
            <section aria-labelledby="heading-sales">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-sales">
                Sales inquiry
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                Plans, pricing quotes, partnerships, or security documentation for
                procurement.
              </p>
              <a
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                href={salesMailtoHref()}
              >
                Email {salesEmail}
              </a>
            </section>

            <section aria-labelledby="heading-support">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-support">
                Existing customers
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                Tier 1 and Tier 2 support: {getSupportEmail()}
              </p>
              <a
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                href={supportMailtoHref()}
              >
                Email support
              </a>
              <p className="mt-6 text-sm text-slate-500">
                <Link
                  className="font-medium text-[#1A2B48] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  href="https://sydra.health/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sign in to Sydra
                </Link>
              </p>
            </section>
          </div>
        </div>
      </SydraPageShell>
    </>
  );
}
