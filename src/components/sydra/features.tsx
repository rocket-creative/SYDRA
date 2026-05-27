import { StaggerChild, StaggerParent } from "@/components/motion/reveal";

const groups = [
  {
    id: "previsit",
    number: "01",
    label: "Pre-visit",
    heading: "Catch problems before the patient walks in",
    features: [
      {
        title: "Patient lookup",
        badge: "New",
        body: "Structured search by last name, first name, DOB, or MRN. Pulls patient and subscriber identity straight from your EMR.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        ),
      },
      {
        title: "Real-time eligibility (270/271)",
        badge: "New",
        body: "ModMed to Stedi clearinghouse round-trip. Verify benefits at case intake; see coverage, copay, deductible, and out-of-network status instantly.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        title: "Prior authorization drafting",
        badge: "New",
        body: "AI-drafted PA narratives, appeals, and peer-to-peer prep with payer policy embedded. One-click DOCX export.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        title: "Compliance check",
        badge: "New",
        body: "AI gap analysis against payer criteria, embedded as a built-in audit step inside Prior Auth. Documents in, verdict out.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l2.25 2.25 4.5-4.5M12 3l8.485 4.243v5.514c0 4.97-3.515 9.272-8.485 10.243C7.03 22.029 3.515 17.727 3.515 12.757V7.243L12 3z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "clinical",
    number: "02",
    label: "Clinical & Coding",
    heading: "Turn documents into structured data",
    features: [
      {
        title: "CPT assessor",
        badge: "New",
        body: "Upload a PDF op note. Bedrock multimodal Converse reads the document directly and proposes the correct CPT codes. No OCR step.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5" />
          </svg>
        ),
      },
      {
        title: "Document intake",
        badge: null,
        body: "Op notes, radiology reads, EOBs, denials, imaging. Structured extraction of diagnoses, dates, charges, and payers runs automatically.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        ),
      },
      {
        title: "Provider profile + CV ingest",
        badge: "Updated",
        body: "Drop in a CV (DOCX with tables supported). Sydra pulls credentials, training, publications, and procedure volume to strengthen submissions.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        ),
      },
      {
        title: "Payer guidelines library",
        badge: "New",
        body: "Payer-specific medical-necessity rules indexed and embedded directly into both PA narratives and IDR drafts.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "dispute",
    number: "03",
    label: "Dispute Resolution",
    heading: "Win the case once the insurer underpays",
    features: [
      {
        title: "AI-drafted federal IDR",
        badge: null,
        body: "Claude Sonnet 4 generates executive summary, market-rate justification, and clinical-necessity narrative. Citations to prior winning determinations.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        ),
      },
      {
        title: "State IDR pathway",
        badge: "New",
        body: "Federal IDR available in all states. State-specific pathways: TX live; NY, CA, NJ, FL, AZ rolling out in 2026.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        ),
      },
      {
        title: "CPT-matched determination library",
        badge: null,
        body: "213+ ingested determinations, over 90% provider wins. Drafts prioritize cases that share your CPT codes, deepest on spine and ortho.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        ),
      },
      {
        title: "DOCX export + guided checklist",
        badge: null,
        body: "One-click submission-ready DOCX. Copy-to-clipboard for the federal IDRE portal. Step-by-step checklist so nothing is missed.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "platform",
    number: "04",
    label: "Platform",
    heading: "Built to run inside a real practice",
    features: [
      {
        title: "Multi-tenant security",
        badge: null,
        body: "Strict per-practice isolation enforced at every table. Tenant-scoped audit logs. Role-based access for billing, clinical, and admin staff.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        ),
      },
      {
        title: "EMR & clearinghouse integration",
        badge: "Updated",
        body: "ModMed today; more EMRs on the roadmap. Stedi clearinghouse for real-time 270/271 eligibility and EDI flow. No copy-paste between systems.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5z" />
          </svg>
        ),
      },
      {
        title: "Encrypted document store",
        badge: "New",
        body: "Documents land in S3 with correct content type, encryption at rest, and signed-URL retrieval. Loud, actionable errors instead of silent failures.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        ),
      },
      {
        title: "Bedrock Claude Sonnet 4",
        badge: null,
        body: "All generation runs on AWS Bedrock with HIPAA-eligible Claude Sonnet 4. PHI stays inside your AWS BAA scope. No external LLM calls.",
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        ),
      },
    ],
  },
] as const;

function Badge({ label }: { label: string }) {
  return (
    <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wider text-blue-700">
      {label}
    </span>
  );
}

export function SydraFeatures() {
  return (
    <section
      aria-labelledby="heading-features"
      className="border-b border-slate-100 bg-white py-16 md:py-24"
      id="features"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 sm:text-xs">
          Also included
        </p>
        <h2
          className="mx-auto mt-3 max-w-3xl text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.1rem]"
          id="heading-features"
        >
          NSA IDR is the focus. The platform goes further when you need it.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Most practices buy Sydra for federal and state IDR. Under 5 minutes per
          claim, specialty trained, one CPT per file. Eligibility, prior auth, CPT
          review, and compliance are included for teams that want upstream support
          in the same system.
        </p>

        {/* Pill nav */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#feat-${g.id}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-[#1A2B48] transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {g.label}
            </a>
          ))}
        </div>

        {/* Feature groups */}
        <div className="mt-14 space-y-16">
          {groups.map((g) => (
            <div key={g.id} id={`feat-${g.id}`} className="scroll-mt-24">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-700">
                  {g.number} · {g.label}
                </span>
                <h3 className="text-xl font-semibold text-[#1A2B48] md:text-2xl">
                  {g.heading}
                </h3>
              </div>
              <StaggerParent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {g.features.map((f) => (
                  <StaggerChild key={f.title}>
                    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-colors duration-300 group-hover:bg-blue-100">
                        {f.icon}
                      </div>
                      <h4 className="mt-4 font-semibold text-[#1A2B48] transition-colors duration-300 group-hover:text-[rgb(0,40,184)]">
                        {f.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
                        {f.body}
                      </p>
                      {f.badge && <Badge label={f.badge} />}
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
