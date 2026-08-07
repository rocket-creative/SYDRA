import type { Metadata } from "next";

import { LeadExportLists } from "@/components/admin/lead-export-lists";
import { buildLeadLists, listLandingLeads } from "@/lib/leads/list-leads";

export const metadata: Metadata = {
  title: "Leads admin | Sydra",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function fieldEntries(fields: Record<string, unknown>): [string, string][] {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).length > 0)
    .map(([k, v]) => [k, String(v)]);
}

export default async function AdminLeadsPage() {
  const { rows, error } = await listLandingLeads(500);
  const { consented, notConsented } = buildLeadLists(rows);

  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--color-text)]">
      <div className="mx-auto max-w-6xl bg-white px-5 py-10 md:px-10 md:py-14">
        <header className="border-b border-rule pb-6">
          <p className="type-caption uppercase tracking-[0.12em] text-body/70">Internal</p>
          <h1 className="mt-2 type-h2 text-brand">Lead lists</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
            Two lists by marketing consent. Copy or download new emails, then they grey out so you
            do not upload the same contact twice. Rows stay in the database.
          </p>
        </header>

        {error ? (
          <p className="mt-8 rounded-[2px] border border-rule bg-neutral-section px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        {!error ? (
          <LeadExportLists consented={consented} notConsented={notConsented} />
        ) : null}

        <details className="mt-12 border-t border-rule pt-8">
          <summary className="cursor-pointer text-sm font-medium text-brand">
            Full submission log ({rows.length})
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
            Raw fallback log written before notification email. Partial and full submissions both
            appear here.
          </p>

          {!error && rows.length === 0 ? (
            <p className="mt-8 text-sm text-body">No leads logged yet.</p>
          ) : null}

          <ul className="mt-6 divide-y divide-[var(--color-rule)] border-y border-rule">
            {rows.map((row) => (
              <li key={row.id} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-brand">
                    {row.subject}
                    <span className="ml-2 font-normal text-body/70">
                      {row.kind} · {row.source}
                    </span>
                  </p>
                  <time className="text-xs text-body/70" dateTime={row.submitted_at}>
                    {formatWhen(row.submitted_at)} ET
                  </time>
                </div>
                <p className="mt-1 text-sm text-body">
                  {row.email ?? "no email"}
                  {row.state ? ` · ${row.state}` : ""}
                  {" · "}
                  marketing consent:{" "}
                  {row.marketing_consent || row.fields.marketingConsent === true ? "yes" : "no"}
                  {row.exported_at ? " · exported" : ""}
                </p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs uppercase tracking-[0.08em] text-body/70">
                    Fields
                  </summary>
                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    {fieldEntries(row.fields).map(([key, value]) => (
                      <div key={key} className="min-w-0">
                        <dt className="text-xs text-body/60">{key}</dt>
                        <dd className="break-words text-brand">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
