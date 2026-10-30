"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deliveryNote, products } from "@/lib/boutique";
import { site } from "@/lib/site";
import { cn, formatKES } from "@/lib/utils";
import { Arrow, Button, ButtonLink } from "@/components/ui/button";
import { Diamond, Filigree } from "@/components/ui/ornaments";
import { ProductArt } from "@/components/boutique/product-art";
import { bag, bagTotal, describeLine, useBag, useHydrated } from "./bag-store";
import { newOrderCode, saveOrder } from "./orders";

const field =
  "mt-1.5 h-11 w-full border border-gold/25 bg-onyx px-3 text-base text-ivory placeholder:text-muted focus:border-gold focus:outline-none sm:text-sm";

function Qty({ id, qty }: { id: string; qty: number }) {
  const b = "flex size-8 items-center justify-center text-gold-bright hover:bg-gold/10";
  return (
    <div className="flex items-center border border-gold/25">
      <button type="button" className={b} onClick={() => bag.setQty(id, qty - 1)} aria-label="Decrease">
        −
      </button>
      <span className="w-7 text-center text-sm tabular-nums">{qty}</span>
      <button type="button" className={b} onClick={() => bag.setQty(id, Math.min(20, qty + 1))} aria-label="Increase">
        +
      </button>
    </div>
  );
}

export function Checkout() {
  const lines = useBag();
  const hydrated = useHydrated();
  const router = useRouter();
  const [method, setMethod] = useState<"mpesa" | "card">("mpesa");
  const [delivery, setDelivery] = useState<"door" | "deliver">("door");
  const [paying, setPaying] = useState(false);

  const total = bagTotal(lines);
  const hasTickets = lines.some((l) => l.kind === "ticket");
  const hasProducts = lines.some((l) => l.kind === "product");
  const hasMask = lines.some((l) => l.kind === "product" && products.find((p) => p.slug === l.slug)?.category === "Masks");

  if (!hydrated) return <div className="min-h-svh" />;

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Filigree className="mx-auto" />
        <h1 className="mt-6 font-display text-3xl text-ivory">Your order is empty</h1>
        <p className="mt-3 font-serif text-lg text-parchment">Choose a night, a package, or something from the boutique.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/events">See the calendar</ButtonLink>
          <ButtonLink href="/boutique" variant="outline">
            Visit the boutique
          </ButtonLink>
        </div>
      </div>
    );
  }

  const suggestions = hasTickets && !hasMask ? products.filter((p) => p.category === "Masks") : [];

  return (
    <form
      className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1fr_26rem] lg:gap-14 lg:pt-32"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setPaying(true);
        // Phase 2: create the order on the server and open Paystack here.
        const code = newOrderCode();
        saveOrder({
          code,
          lines,
          total,
          contact: { name: String(data.get("name")), phone: String(data.get("phone")), email: String(data.get("email")) },
          method,
          delivery: hasProducts ? delivery : null,
          address: hasProducts && delivery === "deliver" ? String(data.get("address") ?? "") : undefined,
          status: "paid-demo",
        });
        setTimeout(() => {
          bag.clear();
          router.push(`/tickets/${code}`);
        }, 900);
      }}
    >
      <div className="min-w-0">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,6vw,2.6rem)] text-ivory">Your order</h1>

        <ul className="mt-6 border-t border-gold/15">
          {lines.map((l) => {
            const d = describeLine(l);
            return (
              <li key={l.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-gold/15 py-4 sm:flex-nowrap">
                <span className="flex size-12 shrink-0 items-center justify-center border border-gold/20 bg-lacquer font-display text-xs text-gold">
                  {l.kind === "ticket" ? "TKT" : l.kind === "membership" ? "MBR" : "BTQ"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg leading-tight text-ivory">{d.title}</p>
                  <p className="text-xs text-muted">{d.sub}</p>
                </div>
                <div className="flex w-full items-center gap-4 pl-16 sm:w-auto sm:pl-0">
                  <button type="button" onClick={() => bag.remove(l.id)} className="text-xs text-muted underline-offset-2 hover:text-ruby hover:underline sm:order-last">
                    Remove
                  </button>
                  {l.kind !== "membership" && <Qty id={l.id} qty={l.qty} />}
                  <p className="ml-auto w-24 text-right font-display text-sm text-gold-bright">{formatKES(d.unit * l.qty)}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {suggestions.length > 0 && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Need a mask for the night?</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {suggestions.map((p) => (
                <button key={p.slug} type="button" onClick={() => bag.addProduct(p.slug)} className="group text-left">
                  <ProductArt product={p} className="aspect-square border border-gold/15 transition-colors group-hover:border-gold/60" />
                  <p className="mt-2 text-sm leading-tight text-ivory">{p.name}</p>
                  <p className="text-xs text-gold">+ {formatKES(p.price)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <fieldset className="mt-10">
          <legend className="eyebrow">Your details</legend>
          <p className="mt-2 text-sm text-muted">Use any name you like. Tickets and your receipt are sent to your phone and email.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.18em] text-muted sm:col-span-2">
              Name or alias
              <input name="name" required autoComplete="nickname" maxLength={60} className={field} placeholder="e.g. Mr. K" />
            </label>
            <label className="text-xs uppercase tracking-[0.18em] text-muted">
              Phone (M-Pesa)
              <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="^(\+?254|0)?[17]\d{8}$|^\+\d{8,15}$" className={field} placeholder="07XX XXX XXX" />
            </label>
            <label className="text-xs uppercase tracking-[0.18em] text-muted">
              Email
              <input name="email" required type="email" autoComplete="email" className={field} placeholder="you@example.com" />
            </label>
          </div>
        </fieldset>

        {hasProducts && (
          <fieldset className="mt-8">
            <legend className="eyebrow">Boutique items</legend>
            <p className="mt-2 text-sm text-muted">{deliveryNote}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["door", "Waiting at the door", "Collect on the night"],
                  ["deliver", "Deliver to me", "Nairobi, within 48 hours"],
                ] as const
              ).map(([v, t, s]) => (
                <label key={v} className={cn("flex cursor-pointer gap-3 border px-4 py-3", delivery === v ? "border-gold bg-gold/10" : "border-gold/20")}>
                  <input type="radio" name="delivery" checked={delivery === v} onChange={() => setDelivery(v)} className="accent-[#c9a14a]" />
                  <span>
                    <span className="block text-sm text-ivory">{t}</span>
                    <span className="block text-xs text-muted">{s}</span>
                  </span>
                </label>
              ))}
            </div>
            {delivery === "deliver" && (
              <label className="mt-4 block text-xs uppercase tracking-[0.18em] text-muted">
                Delivery address
                <input name="address" required maxLength={160} className={field} placeholder="Building, street, area" />
              </label>
            )}
          </fieldset>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border border-gold/25 bg-lacquer p-5 sm:p-6">
          <p className="eyebrow">Payment</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {(
              [
                ["mpesa", "M-Pesa", "Prompt on your phone"],
                ["card", "Card", "Visa · Mastercard"],
              ] as const
            ).map(([v, t, s]) => (
              <label key={v} className={cn("cursor-pointer border px-3 py-3 text-center", method === v ? "border-gold bg-gold/10" : "border-gold/20")}>
                <input type="radio" name="method" checked={method === v} onChange={() => setMethod(v)} className="sr-only" />
                <span className="block font-display text-sm tracking-[0.12em] text-ivory">{t}</span>
                <span className="block text-[0.68rem] text-muted">{s}</span>
              </label>
            ))}
          </div>

          <dl className="mt-6 space-y-2 border-t border-gold/15 pt-4 text-sm">
            {lines.map((l) => {
              const d = describeLine(l);
              return (
                <div key={l.id} className="flex justify-between gap-4 text-parchment">
                  <dt className="truncate">
                    {l.qty > 1 && `${l.qty} × `}
                    {d.title}
                  </dt>
                  <dd className="shrink-0">{formatKES(d.unit * l.qty)}</dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-gold/15 pt-4">
            <span className="text-parchment">Total</span>
            <span className="font-display text-2xl text-gold-bright">{formatKES(total)}</span>
          </div>

          <Button type="submit" size="lg" className="mt-5 w-full" disabled={paying}>
            {paying ? "Processing…" : `Pay ${formatKES(total)}`} {!paying && <Arrow />}
          </Button>
          <p className="mt-3 text-center text-[0.68rem] leading-relaxed text-muted">
            Secured by Paystack. Your receipt comes from {site.name}.
          </p>
          <p className="mt-3 border border-ruby/40 bg-velvet/30 px-3 py-2 text-center text-[0.68rem] text-parchment">
            Test mode: payments aren&apos;t connected yet, so no money is taken.
          </p>
          <ul className="mt-5 space-y-1.5 text-xs text-parchment">
            <li className="flex items-center gap-2">
              <Diamond /> Move your ticket up to 72 hours before
            </li>
            <li className="flex items-center gap-2">
              <Diamond /> Address sent with your ticket
            </li>
          </ul>
          <p className="mt-4 text-center text-[0.68rem] text-muted">
            By paying you accept the{" "}
            <Link href="/terms" className="underline underline-offset-2">
              terms
            </Link>
            .
          </p>
        </div>
      </aside>
    </form>
  );
}
