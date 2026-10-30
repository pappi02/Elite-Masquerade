"use client";

import { useSyncExternalStore } from "react";

/**
 * One shared one-second clock for the whole page. Server render (and the first
 * client render) get `null`, so time-based UI renders a stable placeholder and
 * only shows real dates once the browser takes over. No hydration mismatches.
 */
// getSnapshot must return the same value between ticks, so it reads this
// variable rather than calling Date.now() itself.
let now = typeof window === "undefined" ? 0 : Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

const getServer = () => null;

/** Current time, updated every second. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, () => now, getServer);
}

/** Current time rounded down to the minute. Re-renders once a minute, not every second. */
export function useMinute(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(now / 60_000) * 60_000,
    getServer,
  );
}
