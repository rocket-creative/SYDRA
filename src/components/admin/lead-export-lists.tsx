"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import type { LeadListEntry } from "@/lib/leads/list-leads";

type LeadExportListsProps = {
  consented: LeadListEntry[];
  notConsented: LeadListEntry[];
};

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

function toCsv(entries: LeadListEntry[]): string {
  const header = ["Email", "Name", "Phone", "Practice", "State", "Submitted At (ET)", "Exported"];
  const lines = entries.map((entry) =>
    [
      entry.email,
      entry.name ?? "",
      entry.phone ?? "",
      entry.practiceName ?? "",
      entry.state ?? "",
      formatWhen(entry.submittedAt),
      entry.exportedAt ? formatWhen(entry.exportedAt) : "",
    ]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

async function markExported(ids: string[]): Promise<string | null> {
  if (ids.length === 0) return new Date().toISOString();
  const res = await fetch("/admin/api/mark-exported", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Could not mark leads as exported");
  }
  const data = (await res.json()) as { exportedAt?: string };
  return data.exportedAt ?? new Date().toISOString();
}

function LeadListPanel({
  title,
  description,
  entries,
  listKey,
  onExported,
}: {
  title: string;
  description: string;
  entries: LeadListEntry[];
  listKey: "consented" | "not_consented";
  onExported: (emails: string[], exportedAt: string) => void;
}) {
  const [busy, setBusy] = useState<"copy" | "download" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fresh = useMemo(() => entries.filter((e) => !e.exportedAt), [entries]);
  const exported = useMemo(() => entries.filter((e) => e.exportedAt), [entries]);

  async function handleCopyNew() {
    if (fresh.length === 0) {
      setMessage("No new emails to copy.");
      return;
    }
    setBusy("copy");
    setMessage(null);
    try {
      const text = fresh.map((e) => e.email).join("\n");
      const ok = await copyText(text);
      if (!ok) throw new Error("Clipboard permission denied");
      const ids = fresh.flatMap((e) => e.ids);
      const exportedAt = await markExported(ids);
      onExported(
        fresh.map((e) => e.email),
        exportedAt ?? new Date().toISOString(),
      );
      setMessage(`Copied ${fresh.length} new email${fresh.length === 1 ? "" : "s"}. Marked as exported.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Copy failed");
    } finally {
      setBusy(null);
    }
  }

  async function handleDownloadNew() {
    if (fresh.length === 0) {
      setMessage("No new emails to download.");
      return;
    }
    setBusy("download");
    setMessage(null);
    try {
      const stamp = new Date().toISOString().slice(0, 10);
      downloadCsv(`sydra-${listKey}-new-${stamp}.csv`, toCsv(fresh));
      const ids = fresh.flatMap((e) => e.ids);
      const exportedAt = await markExported(ids);
      onExported(
        fresh.map((e) => e.email),
        exportedAt ?? new Date().toISOString(),
      );
      setMessage(
        `Downloaded ${fresh.length} new email${fresh.length === 1 ? "" : "s"}. Marked as exported.`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Download failed");
    } finally {
      setBusy(null);
    }
  }

  function handleDownloadAll() {
    if (entries.length === 0) {
      setMessage("Nothing to download.");
      return;
    }
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`sydra-${listKey}-all-${stamp}.csv`, toCsv(entries));
    setMessage(`Downloaded all ${entries.length} email${entries.length === 1 ? "" : "s"} (does not mark exported).`);
  }

  return (
    <section className="border border-rule bg-white">
      <div className="border-b border-rule px-5 py-5 md:px-6">
        <h2 className="text-lg font-semibold text-brand">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-body/70">
          {fresh.length} new · {exported.length} already exported · {entries.length} total
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="min-h-11 border border-brand bg-brand px-4 text-xs font-medium uppercase tracking-[0.08em] text-white transition-opacity disabled:opacity-40"
            disabled={busy !== null || fresh.length === 0}
            type="button"
            onClick={handleCopyNew}
          >
            {busy === "copy" ? "Copying…" : "Copy new emails"}
          </button>
          <button
            className="min-h-11 border border-brand bg-white px-4 text-xs font-medium uppercase tracking-[0.08em] text-brand transition-opacity disabled:opacity-40"
            disabled={busy !== null || fresh.length === 0}
            type="button"
            onClick={handleDownloadNew}
          >
            {busy === "download" ? "Downloading…" : "Download new CSV"}
          </button>
          <button
            className="min-h-11 border border-rule bg-white px-4 text-xs font-medium uppercase tracking-[0.08em] text-body transition-opacity disabled:opacity-40"
            disabled={busy !== null || entries.length === 0}
            type="button"
            onClick={handleDownloadAll}
          >
            Download all CSV
          </button>
        </div>
        {message ? <p className="mt-3 text-sm text-body">{message}</p> : null}
      </div>

      {entries.length === 0 ? (
        <p className="px-5 py-8 text-sm text-body md:px-6">No emails in this list yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)]">
          {entries.map((entry) => {
            const isExported = Boolean(entry.exportedAt);
            return (
              <li
                key={entry.email}
                className={`px-5 py-4 md:px-6 ${isExported ? "bg-neutral-section/60 opacity-50" : ""}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p
                    className={`text-sm font-medium break-all ${isExported ? "text-body" : "text-brand"}`}
                  >
                    {entry.email}
                  </p>
                  {isExported ? (
                    <span className="text-xs uppercase tracking-[0.08em] text-body/60">
                      Exported {entry.exportedAt ? formatWhen(entry.exportedAt) : ""}
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-[0.08em] text-[var(--color-hero)]">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-body">
                  {[entry.name, entry.practiceName, entry.state, entry.phone]
                    .filter(Boolean)
                    .join(" · ") || "No extra details"}
                </p>
                <p className="mt-1 text-xs text-body/60">
                  Submitted {formatWhen(entry.submittedAt)} ET
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function LeadExportLists({ consented, notConsented }: LeadExportListsProps) {
  const [consentedEntries, setConsentedEntries] = useState(consented);
  const [notConsentedEntries, setNotConsentedEntries] = useState(notConsented);

  function markLocal(
    setter: Dispatch<SetStateAction<LeadListEntry[]>>,
    emails: string[],
    exportedAt: string,
  ) {
    const set = new Set(emails.map((e) => e.toLowerCase()));
    setter((prev) =>
      prev.map((entry) =>
        set.has(entry.email) && !entry.exportedAt ? { ...entry, exportedAt } : entry,
      ),
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <LeadListPanel
        description="Checked the marketing box. Safe for promo emails and Google Customer Match uploads."
        entries={consentedEntries}
        listKey="consented"
        title="Consented"
        onExported={(emails, exportedAt) =>
          markLocal(setConsentedEntries, emails, exportedAt)
        }
      />
      <LeadListPanel
        description="Submitted a form but did not opt in. Sales follow up only. Do not upload to Customer Match."
        entries={notConsentedEntries}
        listKey="not_consented"
        title="Did not consent"
        onExported={(emails, exportedAt) =>
          markLocal(setNotConsentedEntries, emails, exportedAt)
        }
      />
    </div>
  );
}
