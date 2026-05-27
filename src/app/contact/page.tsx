import type { Metadata } from "next";
import Link from "next/link";

import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import {
  contactMailtoHref,
  formatContactEmailMasked,
  getContactEmail,
  getContactPhoneDisplay,
  getSalesEmail,
  getSupportEmail,
  salesMailtoHref,
  supportMailtoHref,
} from "@/lib/contact";
import { siteUrl } from "@/lib/site";

const description =
  "Schedule a demo, contact sales, or reach customer support. Hours 9:00 to 5:00 ET, Monday through Friday.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: `${siteUrl()}/contact` },
  openGraph: {
    title: "Contact · Sydra",
    description,
    url: `${siteUrl()}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const phone = getContactPhoneDisplay();

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
              Contact and support
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
              Hours: 9:00 to 5:00 ET, Monday through Friday. Email response within
              24 business hours.
            </p>
            {phone ? (
              <p className="mt-3 text-base font-medium text-[#1A2B48]">{phone}</p>
            ) : null}
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12">
            <section aria-labelledby="heading-demo-contact">
              <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-demo-contact">
                Demo request
              </h2>
              <p className="mt-2 text-[15px] text-[#4A5568]">
                {getContactEmail()} · Chelsea joins software focused demos.
              </p>
              <div className="mt-6">
                <DemoFunnelForm />
              </div>
            </section>

            <div className="space-y-10">
              <section aria-labelledby="heading-sales">
                <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-sales">
                  Sales inquiry
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                  Plans, pricing quotes, and partnership questions.
                </p>
                <a
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50"
                  href={salesMailtoHref()}
                >
                  Email {getSalesEmail()}
                </a>
              </section>

              <section aria-labelledby="heading-support">
                <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-support">
                  Customer support
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
                  Existing Tier 1 and Tier 2 customers. {getSupportEmail()}
                </p>
                <a
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50"
                  href={supportMailtoHref()}
                >
                  Email support
                </a>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  General inquiries:{" "}
                  <a className="font-medium text-[#1A2B48] underline" href={contactMailtoHref()}>
                    {formatContactEmailMasked()}
                  </a>
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Already a customer?{" "}
                  <Link className="font-medium text-[#1A2B48] underline" href="https://sydra.health/" rel="noopener noreferrer" target="_blank">
                    Sign in
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
