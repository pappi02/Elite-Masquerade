"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "@/lib/boutique";
import { nightById } from "@/lib/calendar";
import { getTier, memberships, type TierSlug } from "@/lib/packages";

export type TicketLine = { kind: "ticket"; id: string; night: string; tier: TierSlug; qty: number };
export type ProductLine = { kind: "product"; id: string; slug: string; size?: string; qty: number };
export type MembershipLine = { kind: "membership"; id: string; slug: string; qty: 1 };
export type BagLine = TicketLine | ProductLine | MembershipLine;

const KEY = "em-bag-v1";
const EMPTY: BagLine[] = [];
let lines: BagLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) lines = JSON.parse(raw) as BagLine[];
  } catch {
    lines = EMPTY;
  }
}

function save(next: BagLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage blocked: the bag still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useBag() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return lines;
    },
    () => EMPTY,
  );
}

export const bag = {
  addTicket(night: string, tier: TierSlug, qty = 1) {
    load();
    const id = `t:${night}:${tier}`;
    const existing = lines.find((l) => l.id === id);
    save(
      existing
        ? lines.map((l) => (l.id === id && l.kind === "ticket" ? { ...l, qty: Math.min(20, l.qty + qty) } : l))
        : [...lines, { kind: "ticket", id, night, tier, qty }],
    );
  },
  addProduct(slug: string, size?: string, qty = 1) {
    load();
    const id = `p:${slug}:${size ?? ""}`;
    const existing = lines.find((l) => l.id === id);
    save(
      existing
        ? lines.map((l) => (l.id === id && l.kind === "product" ? { ...l, qty: Math.min(10, l.qty + qty) } : l))
        : [...lines, { kind: "product", id, slug, size, qty }],
    );
  },
  setMembership(slug: string) {
    load();
    save([...lines.filter((l) => l.kind !== "membership"), { kind: "membership", id: `m:${slug}`, slug, qty: 1 }]);
  },
  setQty(id: string, qty: number) {
    load();
    save(qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id && l.kind !== "membership" ? { ...l, qty } : l)));
  },
  remove(id: string) {
    load();
    save(lines.filter((l) => l.id !== id));
  },
  clear() {
    save(EMPTY);
  },
};

/** Price and display name for one line. */
export function describeLine(line: BagLine) {
  if (line.kind === "ticket") {
    const tier = getTier(line.tier);
    const night = nightById(line.night);
    return {
      title: `${tier?.name ?? "Ticket"} · ${night?.theme.name ?? "Event night"}`,
      sub: night ? new Date(`${night.date}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }) : line.night,
      unit: tier?.price ?? 0,
    };
  }
  if (line.kind === "product") {
    const p = getProduct(line.slug);
    return {
      title: p?.name ?? line.slug,
      sub: [p?.hire ? "Hire for the night" : null, line.size ? `Size ${line.size}` : null].filter(Boolean).join(" · "),
      unit: p?.price ?? 0,
    };
  }
  const m = memberships.find((x) => x.slug === line.slug);
  return { title: `${m?.name ?? "Membership"} membership`, sub: m?.term ?? "", unit: m?.price ?? 0 };
}

export function bagTotal(all: BagLine[]) {
  return all.reduce((sum, l) => sum + describeLine(l).unit * l.qty, 0);
}

export function bagCount(all: BagLine[]) {
  return all.reduce((n, l) => n + l.qty, 0);
}

const noop = () => () => {};
/** False during server render and hydration, true once the browser has taken over. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
