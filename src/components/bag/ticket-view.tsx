"use client";

import Image from "next/image";
import Link from "next/link";
import { nightById, formatNight } from "@/lib/calendar";
import { getTier } from "@/lib/packages";
import { site } from "@/lib/site";
import { formatKES, seeded } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Diamond, Filigree } from "@/components/ui/ornaments";
import { Countdown } from "@/components/time/countdown";
import { describeLine, useHydrated } from "./bag-store";
import { getOrder } from "./orders";

/** Visual stand-in for the door QR code. Phase 2 swaps this for a real signed QR. */
function DoorCode({ code }: { code: string }) {
  const rnd = seeded(code.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 2147483647 || 1);
  const n = 21;
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const finderOn = (x: number, y: number) => {
    const fx = x >= n - 7 ? x - (n - 7) : x;
    const fy = y >= n - 7 ? y - (n - 7) : y;
    return fx === 0 || fy === 0 || fx === 6 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4);
  };
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="size-36 bg-ivory p-1" aria-label={`Door code ${code}`} role="img">
      {Array.from({ length: n * n }, (_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const on = finder(x, y) ? finderOn(x, y) : rnd() > 0.52;
        return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="#070605" /> : null;
      })}
    </svg>
  );
}

export function TicketView({ code }: { code: string }) {
  const hydrated = useHydrated();
  if (!hydrated) return <div className="min-h-svh" />;
  const order = getOrder(code);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <Filigree className="mx-auto" />
        <h1 className="mt-6 font-display text-3xl text-ivory">Ticket {code}</h1>
        <p className="mt-3 font-serif text-lg text-parchment">
          Open this link on the device you booked with, or check the email and SMS we sent you.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to the house
        </ButtonLink>
      </div>
    );
  }

  const tickets = order.lines.filter((l) => l.kind === "ticket");
  const first = tickets[0] ? nightById(tickets[0].night) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
      <div className="text-center">
        <p className="eyebrow">Payment received</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,7vw,3rem)] text-ivory">
          Welcome to the <span className="gold-text">brotherhood</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg font-serif text-lg text-parchment">
          Your tickets and receipt are on their way to {order.contact.email} and {order.contact.phone}.
        </p>
      </div>

      {first && (
        <div className="mt-10 border border-gold/30 bg-lacquer">
          <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <Image src="/brand/emblem-560.webp" alt="" width={72} height={72} className="-ml-1" />
              <p className="eyebrow mt-3">Door pass · {code}</p>
              <h2 className="mt-1 font-display text-2xl text-ivory">{first.theme.name}</h2>
              <p className="mt-1 font-serif text-lg text-gold-bright">
                {formatNight(first, "long")} · doors {site.doorsOpen}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-parchment">
                {tickets.map((t) => (
                  <li key={t.id} className="flex items-center gap-2">
                    <Diamond /> {t.qty} × {getTier(t.tier)?.name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-parchment">
                <span className="text-ivory">Dress code:</span> {first.theme.dressCode.summary}
              </p>
              <p className="mt-2 text-sm text-muted">The address will be sent to your phone on the morning of the event.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DoorCode code={code} />
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">Test ticket</span>
            </div>
          </div>
          <div className="border-t border-dashed border-gold/30 px-6 py-5">
            <Countdown night={first} size="compact" />
          </div>
        </div>
      )}

      <div className="mt-8 border border-gold/15 p-6">
        <p className="eyebrow">Receipt · {site.name}</p>
        <dl className="mt-4 space-y-2 text-sm">
          {order.lines.map((l) => {
            const d = describeLine(l);
            return (
              <div key={l.id} className="flex justify-between gap-4 text-parchment">
                <dt>
                  {l.qty > 1 && `${l.qty} × `}
                  {d.title}
                </dt>
                <dd>{formatKES(d.unit * l.qty)}</dd>
              </div>
            );
          })}
        </dl>
        <div className="mt-4 flex justify-between border-t border-gold/15 pt-4">
          <span className="text-parchment">Paid by {order.method === "mpesa" ? "M-Pesa" : "card"}</span>
          <span className="font-display text-xl text-gold-bright">{formatKES(order.total)}</span>
        </div>
        {order.delivery && (
          <p className="mt-3 text-xs text-muted">
            Boutique items: {order.delivery === "door" ? "waiting for you at the door" : `delivering to ${order.address}`}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {first && (
          <ButtonLink href={`/events/${first.theme.slug}#dress-code`} variant="outline">
            See the dress code
          </ButtonLink>
        )}
        <ButtonLink href="/boutique" variant="ghost">
          Add a mask or costume
        </ButtonLink>
      </div>
      <p className="mt-8 text-center text-xs text-muted">
        Questions? <Link href="/faq" className="underline underline-offset-2">Read the FAQ</Link> or ask the concierge.
      </p>
    </div>
  );
}
