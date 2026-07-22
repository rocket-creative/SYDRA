import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client for lead writes and the admin leads view.
 * Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY. Anon key is not enough
 * because landing_leads has RLS with no public policies.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabaseService(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
