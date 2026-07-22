import "server-only";

import { getSupabaseService } from "@/lib/leads/supabase-admin";

export type LandingLeadRow = {
  id: string;
  kind: "partial" | "full";
  source: "postcard" | "demo";
  subject: string;
  email: string | null;
  state: string | null;
  fields: Record<string, unknown>;
  submitted_at: string;
  created_at: string;
};

export async function listLandingLeads(limit = 100): Promise<{
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
    .select("id, kind, source, subject, email, state, fields, submitted_at, created_at")
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as LandingLeadRow[], error: null };
}
