import type { Metadata } from "next";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { contactMailtoHref } from "@/lib/contact";
import { siteUrl } from "@/lib/site";

const description =
  "HIPAA compliant infrastructure, BAA on request, encryption at rest and in transit, and SOC 2 aligned controls for surgical billing teams.";

export const metadata: Metadata = {
  title: "Security and HIPAA",
  description,
  alternates: { canonical: `${siteUrl()}/security` },
  openGraph: {
    title: "Security and HIPAA · Sydra",
    description,
    url: `${siteUrl()}/security`,
    type: "website",
  },
};

const sections = [
  {
    title: "HIPAA and BAA",
    body: "Sydra handles PHI under HIPAA controls. Business Associate Agreements are available on request for covered entities and their billing teams.",
  },
  {
    title: "Hosting and infrastructure",
    body: "Production workloads run on AWS with region appropriate data residency. Infrastructure is designed for healthcare workloads with BAA coverage.",
  },
  {
    title: "Encryption",
    body: "Data is encrypted in transit (TLS) and at rest. Keys are managed through cloud provider controls.",
  },
  {
    title: "Access controls and audit logs",
    body: "Role based access for practice staff. Tenant isolation between customers. Audit logging on sensitive operations.",
  },
  {
    title: "SOC 2 posture",
    body: "Controls aligned with SOC 2 requirements. Formal report available to qualified prospects during evaluation.",
  },
  {
    title: "Data retention and deletion",
    body: "Retention follows contract terms and applicable regulations. Deletion requests are handled on written instruction from authorized practice contacts.",
  },
] as const;

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)]">
              Security
            </p>
            <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
              Security and HIPAA
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
              Billing managers need to know PHI is safe before they book a demo.
              Here is how Sydra handles data.
            </p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-[#1A2B48]">{section.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1A2B48]">Security one-pager</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                Request our security summary for your compliance team. We will send
                the one-pager and schedule a walkthrough if you need one.
              </p>
              <a
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#1A2B48] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                href={contactMailtoHref()}
              >
                Request security one-pager
              </a>
            </div>
          </div>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
