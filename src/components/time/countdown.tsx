"use client";

import { formatNight, isLive, nextNight, type EventNight } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { useNow } from "./use-now";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/** One digit that slides in when it changes. */
function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block w-[0.62em] overflow-hidden text-center align-top">
      <span key={value} className="inline-block animate-[digit_.35s_cubic-bezier(.22,1,.36,1)]">
        {value}
      </span>
    </span>
  );
}

function Unit({ value, label, size }: { value: number | null; label: string; size: "hero" | "compact" }) {
  const text = value === null ? "––" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "font-display tabular-nums leading-none text-gold-bright",
          size === "hero" ? "text-[clamp(2.3rem,11vw,4.6rem)]" : "text-[1.7rem] sm:text-[2rem]",
        )}
      >
        {text.split("").map((c, i) => (
          <Digit key={i} value={c} />
        ))}
      </div>
      <div className={cn("eyebrow mt-2 text-parchment", size === "compact" && "text-[0.55rem]")}>{label}</div>
    </div>
  );
}

function Colon({ size }: { size: "hero" | "compact" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex animate-flicker flex-col justify-center gap-[0.22em] leading-none",
        size === "hero" ? "h-[1em] text-[clamp(2.3rem,11vw,4.6rem)]" : "h-[1em] text-[1.7rem] sm:text-[2rem]",
      )}
    >
      <span className="size-[0.07em] min-h-1 min-w-1 rotate-45 bg-gold/70" />
      <span className="size-[0.07em] min-h-1 min-w-1 rotate-45 bg-gold/70" />
    </span>
  );
}

/**
 * Counts down to doors-open of the next event night (or a given one).
 * During the party it switches to "Tonight — doors are open".
 */
export function Countdown({ night, size = "hero", className }: { night?: EventNight; size?: "hero" | "compact"; className?: string }) {
  const now = useNow();
  const target = night ?? (now ? nextNight(now) : undefined);
  const live = target && now ? isLive(target, now) : false;
  const parts = target && now ? split(target.startsAt - now) : null;

  if (live) {
    return (
      <div className={cn("text-center", className)} role="status">
        <p className="eyebrow">Tonight</p>
        <p className="mt-2 font-display text-2xl text-gold-bright sm:text-3xl">Doors are open</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={cn("flex items-start justify-center", size === "hero" ? "gap-3 sm:gap-6" : "gap-2.5 sm:gap-4")}
        role="timer"
        aria-label={parts && target ? `${parts.d} days ${parts.h} hours ${parts.m} minutes until ${target.theme.name}, ${formatNight(target)}` : "Countdown loading"}
      >
        <Unit value={parts?.d ?? null} label="Days" size={size} />
        <Colon size={size} />
        <Unit value={parts?.h ?? null} label="Hours" size={size} />
        <Colon size={size} />
        <Unit value={parts?.m ?? null} label="Mins" size={size} />
        <Colon size={size} />
        <Unit value={parts?.s ?? null} label="Secs" size={size} />
      </div>
    </div>
  );
}

/** "Cowboy Masquerade · Sat 7 Nov" for the next night, rendered on the client. */
export function NextNightLabel({ className }: { className?: string }) {
  const now = useNow();
  const n = now ? nextNight(now) : undefined;
  return (
    <span className={className}>
      {n ? (
        <>
          {n.theme.name} <span className="text-gold/60">·</span> {formatNight(n)}
        </>
      ) : (
        <span className="opacity-0">Loading next night</span>
      )}
    </span>
  );
}
