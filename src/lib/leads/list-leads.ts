import "server-only";

import { getSupabaseService } from "@/lib/leads/supabase-admin";

export type LandingLeadRow = {
  id: string;
  kind: "partial" | "full";
  source: "postcard" | "demo" | "contact" | "privacy_request";
  subject: string;
  email: string | null;
  state: string | null;
  fields: Record<string, unknown>;
  marketing_consent?: boolean;
  consent_text_version?: string | null;
  exported_at?: string | null;
  submitted_at: string;
  created_at: string;
};

/** One unique email for the export lists (newest submission wins display fields). */
export type LeadListEntry = {
  ids: string[];
  email: string;
  name: string | null;
  phone: string | null;
  practiceName: string | null;
  state: string | null;
  submittedAt: string;
  exportedAt: string | null;
  marketingConsent: boolean;
};

function fieldString(fields: Record<string, unknown>, key: string): string | null {
  const value = fields[key];
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : null;
}

function hasMarketingConsent(row: LandingLeadRow): boolean {
  return row.marketing_consent === true || row.fields.marketingConsent === true;
}

function toListEntry(row: LandingLeadRow): LeadListEntry | null {
  const email = row.email?.trim().toLowerCase();
  if (!email) return null;
  return {
    ids: [row.id],
    email,
    name: fieldString(row.fields, "name"),
    phone: fieldString(row.fields, "phone"),
    practiceName: fieldString(row.fields, "practiceName"),
    state: row.state || fieldString(row.fields, "state") || fieldString(row.fields, "route_state"),
    submittedAt: row.submitted_at,
    exportedAt: row.exported_at ?? null,
    marketingConsent: hasMarketingConsent(row),
  };
}

/**
 * Deduplicate by email. Newest row wins display fields. exportedAt is set if
 * any row for that email was already exported. All matching ids are kept so
 * mark-exported covers every duplicate submission.
 */
export function buildLeadLists(rows: LandingLeadRow[]): {
  consented: LeadListEntry[];
  notConsented: LeadListEntry[];
} {
  const byEmail = new Map<string, LeadListEntry>();

  // rows are newest-first from the query
  for (const row of rows) {
    if (row.source === "privacy_request") continue;
    const entry = toListEntry(row);
    if (!entry) continue;

    const existing = byEmail.get(entry.email);
    if (!existing) {
      byEmail.set(entry.email, entry);
      continue;
    }

    existing.ids.push(...entry.ids);
    if (!existing.exportedAt && entry.exportedAt) {
      existing.exportedAt = entry.exportedAt;
    }
    if (entry.exportedAt && existing.exportedAt) {
      // keep earliest export stamp for display
      if (entry.exportedAt < existing.exportedAt) {
        existing.exportedAt = entry.exportedAt;
      }
    }
    // Prefer non-null display fields from newer row (already first) or fill gaps
    if (!existing.name && entry.name) existing.name = entry.name;
    if (!existing.phone && entry.phone) existing.phone = entry.phone;
    if (!existing.practiceName && entry.practiceName) {
      existing.practiceName = entry.practiceName;
    }
    if (!existing.state && entry.state) existing.state = entry.state;
  }

  const consented: LeadListEntry[] = [];
  const notConsented: LeadListEntry[] = [];

  for (const entry of byEmail.values()) {
    if (entry.marketingConsent) consented.push(entry);
    else notConsented.push(entry);
  }

  return { consented, notConsented };
}

export async function listLandingLeads(limit = 500): Promise<{
  rows: LandingLeadRow[];
  error: string | null;
}> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      rows: [],
      error:
        "Supabase service role is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("landing_leads")
    .select(
      "id, kind, source, subject, email, state, fields, marketing_consent, consent_text_version, exported_at, submitted_at, created_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as LandingLeadRow[], error: null };
}

export async function markLeadsExported(ids: string[]): Promise<{
  ok: boolean;
  error: string | null;
  marked: number;
}> {
  const unique = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
  if (unique.length === 0) {
    return { ok: true, error: null, marked: 0 };
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Supabase service role is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      marked: 0,
    };
  }

  const exportedAt = new Date().toISOString();
  const { data, error } = await supabase
    .from("landing_leads")
    .update({ exported_at: exportedAt })
    .in("id", unique)
    .is("exported_at", null)
    .select("id");

  if (error) {
    return { ok: false, error: error.message, marked: 0 };
  }

  return { ok: true, error: null, marked: data?.length ?? 0 };
}
