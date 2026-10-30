"use client";

import type { BagLine } from "./bag-store";

/**
 * Demo order storage (this browser only). Replaced by Supabase + the Paystack
 * webhook in phase 2: an order becomes "paid" only when the webhook says so.
 */
export type Order = {
  code: string;
  createdAt: number;
  lines: BagLine[];
  total: number;
  contact: { name: string; phone: string; email: string };
  method: "mpesa" | "card";
  delivery: "door" | "deliver" | null;
  address?: string;
  status: "paid-demo";
};

const KEY = "em-orders-v1";

function readAll(): Record<string, Order> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, Order>;
  } catch {
    return {};
  }
}

export function saveOrder(order: Omit<Order, "createdAt">) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readAll(), [order.code]: { ...order, createdAt: Date.now() } }));
  } catch {
    // Storage blocked: the confirmation page will show a generic message.
  }
}

export function getOrder(code: string): Order | undefined {
  return readAll()[code];
}

/** Short, unambiguous booking code like EM-7KQ4-X9TP. */
export function newOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) => Array.from(crypto.getRandomValues(new Uint32Array(n)), (v) => chars[v % chars.length]).join("");
  return `EM-${pick(4)}-${pick(4)}`;
}
