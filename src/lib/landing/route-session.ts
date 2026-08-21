/** First touch route context (state, code) across in site navigation. */

export const ROUTE_SESSION_KEY = "sydra_route_first_touch";

export type PersistedRoute = {
  state: string;
  code: string;
};

const EMPTY: PersistedRoute = { state: "", code: "" };

function normalizeState(value: string): string {
  const trimmed = value.trim().toUpperCase();
  return trimmed.length === 2 ? trimmed : "";
}

function normalizeCode(value: string): string {
  return value.trim().slice(0, 20);
}

export function readRouteSession(): PersistedRoute {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = sessionStorage.getItem(ROUTE_SESSION_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<PersistedRoute>;
    return {
      state: typeof parsed.state === "string" ? normalizeState(parsed.state) : "",
      code: typeof parsed.code === "string" ? normalizeCode(parsed.code) : "",
    };
  } catch {
    return { ...EMPTY };
  }
}

/** Store route params on first touch only. Later empty navigations do not wipe them. */
export function persistRouteFirstTouch(incoming: PersistedRoute): PersistedRoute {
  if (typeof window === "undefined") return incoming;
  const next: PersistedRoute = {
    state: normalizeState(incoming.state),
    code: normalizeCode(incoming.code),
  };
  const existing = readRouteSession();
  if (existing.state || existing.code) {
    return {
      state: existing.state || next.state,
      code: existing.code || next.code,
    };
  }
  if (!next.state && !next.code) return { ...EMPTY };
  try {
    sessionStorage.setItem(ROUTE_SESSION_KEY, JSON.stringify(next));
  } catch {
    // best effort
  }
  return next;
}

/**
 * Pure read of the route context a form should submit: first touch session,
 * then the current URL params, then campaign tracking. Writes nothing, so it is
 * safe to call while rendering.
 */
export function resolveRouteContext(input: {
  urlState: string;
  urlCode: string;
  trackingState: string;
}): PersistedRoute {
  const session = readRouteSession();
  return {
    state:
      session.state || normalizeState(input.urlState) || normalizeState(input.trackingState),
    code: session.code || normalizeCode(input.urlCode),
  };
}

export function mergeRouteForSubmit(trackingState: string): PersistedRoute {
  const session = readRouteSession();
  return {
    state: session.state || normalizeState(trackingState),
    code: session.code,
  };
}
