"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { datesForTheme, formatNight } from "@/lib/calendar";
import { tiers, type TierSlug } from "@/lib/packages";
import { cn, formatKES } from "@/lib/utils";
import { bag } from "@/components/bag/bag-store";
import { Arrow, Button } from "@/components/ui/button";
import { Diamond } from "@/components/ui/ornaments";
import { Countdown } from "@/components/time/countdown";
import { useMinute } from "@/components/time/use-now";
import { useConcierge } from "@/components/concierge/concierge";

function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const btn = "flex size-10 items-center justify-center text-lg text-gold-bright transition-colors hover:bg-gold/10 disabled:opacity-30";
  return (
    <div className="flex items-center border border-gold/30">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="One fewer gentleman">
        −
      </button>
      <span className="w-10 text-center font-display text-lg tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= 20} aria-label="One more gentleman">
        +
      </button>
    </div>
  );
}

/** Pick a date, a tier and a party size, then add to the order. */
export function BookingWidget({ themeSlug, themeName }: { themeSlug: string; themeName: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const { open } = useConcierge();
  const now = useMinute();
  const dates = now ? datesForTheme(themeSlug, now, 60).slice(0, 4) : [];

  const [picked, setPicked] = useState<string | null>(params.get("night"));
  const [tier, setTier] = useState<TierSlug>(() => {
    const t = params.get("tier");
    return t === "masque" || t === "vip" || t === "vvip" ? t : "vip";
  });
  const [qty, setQty] = useState(1);

  const night = dates.find((d) => d.id === picked) ?? dates[0];
  const t = tiers.find((x) => x.slug === tier)!;

  return (
    <div className="border border-gold/25 bg-lacquer/90 p-5 shadow-[0_30px_80px_-40px_rgb(0_0_0)] backdrop-blur sm:p-6">
      <p className="eyebrow">Reserve</p>
      <h2 className="mt-1 font-display text-xl text-ivory">{themeName}</h2>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Night</legend>
        <div className="grid grid-cols-2 gap-2">
          {dates.length
            ? dates.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setPicked(d.id)}
                  aria-pressed={night?.id === d.id}
                  className={cn(
                    "border px-3 py-2.5 text-left text-sm transition-colors",
                    night?.id === d.id ? "border-gold bg-gold/10 text-gold-bright" : "border-gold/20 text-parchment hover:border-gold/50",
                  )}
                >
                  {formatNight(d)}
                </button>
              ))
            : Array.from({ length: 2 }, (_, i) => <div key={i} className="h-11 border border-gold/10" />)}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Package</legend>
        <div className="space-y-2">
          {tiers.map((x) => (
            <label
              key={x.slug}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 border px-4 py-3 transition-colors",
                tier === x.slug ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50",
              )}
            >
              <span className="flex items-center gap-3">
                <input type="radio" name="tier" value={x.slug} checked={tier === x.slug} onChange={() => setTier(x.slug)} className="sr-only" />
                <span className={cn("flex size-4 items-center justify-center rounded-full border", tier === x.slug ? "border-gold-bright" : "border-gold/40")}>
                  {tier === x.slug && <span className="size-2 rounded-full bg-gold-bright" />}
                </span>
                <span>
                  <span className="block font-display text-sm tracking-[0.16em] text-ivory">{x.name}</span>
                  <span className="block text-xs text-muted">{x.line}</span>
                </span>
              </span>
              <span className="font-display text-sm text-gold-bright">{formatKES(x.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Gentlemen</span>
        <Stepper value={qty} onChange={(n) => setQty(Math.min(20, Math.max(1, n)))} />
      </div>

      <ul className="mt-5 space-y-1.5 border-t border-gold/15 pt-4 text-xs text-parchment">
        {t.perks.slice(0, 3).map((p) => (
          <li key={p} className="flex items-center gap-2">
            <Diamond /> {p}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-baseline justify-between border-t border-gold/15 pt-4">
        <span className="text-sm text-parchment">Total</span>
        <span className="font-display text-2xl text-gold-bright">{formatKES(t.price * qty)}</span>
      </div>

      <Button
        size="lg"
        className="mt-4 w-full"
        disabled={!night}
        onClick={() => {
          if (!night) return;
          bag.addTicket(night.id, tier, qty);
          router.push("/checkout");
        }}
      >
        Add to order <Arrow />
      </Button>
      <button
        type="button"
        onClick={() => open(`I'd like to book ${themeName}${night ? ` on ${formatNight(night)}` : ""}. Can you help?`)}
        className="mt-3 w-full text-center text-xs text-parchment underline-offset-4 hover:text-gold-bright hover:underline"
      >
        Prefer to ask? Book with the concierge
      </button>

      {night && (
        <div className="mt-5 border-t border-gold/15 pt-5">
          <Countdown night={night} size="compact" />
        </div>
      )}
    </div>
  );
}
