"use client";

import Link from "next/link";
import { useState } from "react";
import { dayNumber, formatNight, monthLabel, upcomingNights, type EventNight } from "@/lib/calendar";
import type { ThemeFamily } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/button";
import { useMinute } from "@/components/time/use-now";

const families: ("All" | ThemeFamily)[] = ["All", "Signature", "Culture", "Music", "Taste", "Revelry"];

/** Downloads a one-event .ics file so diaspora guests can hold the date. */
function icsHref(n: EventNight) {
  const start = new Date(n.startsAt);
  const end = new Date(n.startsAt + 7.5 * 3600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Elite Masquerade//EN",
    "BEGIN:VEVENT",
    `UID:${n.id}@elitemasquerade`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${n.theme.name} · Elite Masquerade`,
    "LOCATION:Lavington\\, Nairobi",
    `DESCRIPTION:${n.theme.tagline} Dress code: ${n.theme.dressCode.summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

/** Six months of Saturdays, grouped by month, filterable by family. */
export function CalendarList({ weeks = 26 }: { weeks?: number }) {
  const now = useMinute();
  const [family, setFamily] = useState<(typeof families)[number]>("All");
  const nights = now ? upcomingNights(now, weeks) : [];
  const shown = nights.filter((n) => family === "All" || n.theme.family === family);

  const groups: { month: string; nights: EventNight[] }[] = [];
  for (const n of shown) {
    const m = monthLabel(n);
    if (groups.at(-1)?.month !== m) groups.push({ month: m, nights: [] });
    groups.at(-1)!.nights.push(n);
  }

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by type of night">
        {families.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={family === f}
            onClick={() => setFamily(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 font-display text-[0.62rem] uppercase tracking-[0.2em] transition-colors",
              family === f ? "border-gold bg-gold text-onyx" : "border-gold/25 text-parchment hover:border-gold/60",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {!now && <div className="mt-10 h-96" />}

      {groups.map((g) => (
        <section key={g.month} className="mt-10">
          <h2 className="eyebrow sticky top-16 z-10 -mx-4 bg-onyx/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0 lg:top-18">{g.month}</h2>
          <ol className="border-t border-gold/15">
            {g.nights.map((n) => (
              <li key={n.id} className="group border-b border-gold/15">
                <div className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-x-4 py-4 sm:grid-cols-[4.5rem_1fr_9rem_auto] sm:gap-x-6">
                  <div className="text-center">
                    <p className="font-display text-3xl leading-none text-gold-bright sm:text-4xl">{dayNumber(n)}</p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted">Sat</p>
                  </div>
                  <div className="min-w-0">
                    <Link href={`/events/${n.theme.slug}?night=${n.id}`} className="font-serif text-xl leading-tight text-ivory transition-colors group-hover:text-gold-bright sm:text-2xl">
                      {n.theme.name}
                    </Link>
                    <p className="mt-0.5 truncate text-sm text-parchment">{n.theme.tagline}</p>
                  </div>
                  <p className="hidden font-display text-[0.6rem] uppercase tracking-[0.24em] text-gold/80 sm:block">{n.theme.family}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={icsHref(n)}
                      download={`elite-masquerade-${n.id}.ics`}
                      className="hidden text-[0.65rem] uppercase tracking-[0.18em] text-muted hover:text-gold-bright md:inline"
                      aria-label={`Add ${n.theme.name} on ${formatNight(n)} to your calendar`}
                    >
                      + Calendar
                    </a>
                    <Link
                      href={`/events/${n.theme.slug}?night=${n.id}`}
                      className="group/btn inline-flex h-9 items-center gap-2 border border-gold/40 px-3 font-display text-[0.58rem] uppercase tracking-[0.2em] text-gold-bright transition-colors hover:bg-gold/10 sm:px-4"
                    >
                      <span className="hidden sm:inline">Reserve</span> <Arrow />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
