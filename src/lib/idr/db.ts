import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase read client for entity benchmark data.
 *
 * Returns null when Supabase is not provisioned (no env vars). In that case the
 * query layer falls back to the in-repo seed dataset, so the whole entity
 * surface still renders in dev and preview before a database exists. Once
 * SUPABASE_URL + a read key are set and the schema is seeded, queries read from
 * Postgres instead.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL?.trim();
  // Prefer the service role on the server; fall back to anon for public reads.
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null;
}
