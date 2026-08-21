"use client";

import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return () => {};
}

/**
 * False through SSR and the hydration render, true from the commit after it.
 * For anything that cannot exist until the DOM does, such as a portal target,
 * or a start state that must not ship in the server HTML.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
