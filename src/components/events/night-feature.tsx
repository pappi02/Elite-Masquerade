"use client";

import Link from "next/link";
import { formatNight, upcomingNights, dayNumber, type EventNight } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Diamond } from "@/components/ui/ornaments";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMinute } from "@/components/time/use-now";
import { VideoSlot } from "@/components/video/video-slot";

/** The next event night, large: film, programme, dress code, countdown. */
export function ThisWeekend() {
  const now = useMinute();
  const night = now ? upcomingNights(now, 1)[0] : undefined;

  return (
    <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-12">
      <SectionHeading eyebrow="This weekend" title={night ? night.theme.name : <span className="opacity-0">Loading</span>} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <Reveal className="relative">
          {night ? (
            <VideoSlot name={night.theme.video} className="aspect-[16/10] w-full border border-gold/15" />
          ) : (
            <div className="aspect-[16/10] w-full border border-gold/15 bg-lacquer" />
          )}
          {night && (
            <div className="absolute left-4 top-4 bg-onyx/80 px-3 py-2 backdrop-blur">
              <p className="font-display text-3xl leading-none text-gold-bright">{dayNumber(night)}</p>
              <p className="eyebrow mt-1 text-[0.55rem]">{formatNight(night).split(" ").filter((_, i) => i !== 1).join(" · ")}</p>
            </div>
          )}
        </Reveal>
        <div className="lg:min-h-[22rem]">
          {night && (
            <>
              <p className="font-serif text-xl italic text-gold-bright">{night.theme.tagline}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-parchment">{night.theme.description}</p>
              <ol className="mt-6 border-t border-gold/15">
                {night.theme.programme.map((p) => (
                  <li key={p.time + p.title} className="grid grid-cols-[3.5rem_1fr] gap-3 border-b border-gold/10 py-2 text-sm">
                    <span className="font-display text-gold">{p.time}</span>
                    <span className="text-ivory">
                      {p.title}
                      {p.note && <span className="block text-xs text-muted">{p.note}</span>}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-start gap-3 text-sm text-parchment">
                <Diamond className="mt-1.5" />
                <span>
                  <span className="text-ivory">Dress code:</span> {night.theme.dressCode.summary}
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/events/${night.theme.slug}?night=${night.id}`}>
                  Reserve this night <Arrow />
                </ButtonLink>
                <ButtonLink href={`/events/${night.theme.slug}#dress-code`} variant="outline">
                  What to wear
                </ButtonLink>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function NightTile({ night, index }: { night: EventNight; index: number }) {
  const month = formatNight(night).split(" ").pop();
  return (
    <Link
      href={`/events/${night.theme.slug}?night=${night.id}`}
      className={cn(
        "group relative flex w-[11.5rem] shrink-0 snap-start flex-col border-r border-gold/15 px-5 py-6 transition-colors hover:bg-smoke sm:w-[13rem]",
        index === 0 && "bg-smoke/60",
      )}
    >
      <span className="eyebrow text-[0.55rem] text-muted">{index === 0 ? "Next" : night.theme.family}</span>
      <span className="mt-3 font-display text-5xl leading-none text-gold-bright transition-transform duration-300 group-hover:-translate-y-0.5">
        {dayNumber(night)}
      </span>
      <span className="mt-1 font-display text-[0.65rem] uppercase tracking-[0.3em] text-parchment">{month}</span>
      <span className="mt-5 font-serif text-lg leading-tight text-ivory">{night.theme.name}</span>
      <span className="mt-auto flex items-center gap-2 pt-5 font-display text-[0.58rem] uppercase tracking-[0.22em] text-gold opacity-70 transition-opacity group-hover:opacity-100">
        Reserve <Arrow />
      </span>
    </Link>
  );
}

/** Horizontal strip of the next weekends. */
export function CalendarStrip({ count = 10 }: { count?: number }) {
  const now = useMinute();
  const nights = now ? upcomingNights(now, count) : [];
  return (
    <section className="py-9 lg:py-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
        <SectionHeading
          eyebrow="The calendar"
          title="Plan your weekends"
          intro="A new theme every Saturday, announced months ahead, so you never miss the one you're flying in for."
        />
        <ButtonLink href="/events" variant="ghost" className="hidden shrink-0 sm:inline-flex">
          Full calendar <Arrow />
        </ButtonLink>
      </div>
      <div className="no-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto border-y border-gold/15 [scroll-padding-inline:1rem] sm:[scroll-padding-inline:1.5rem]">
        <div className="w-4 shrink-0 sm:w-6 xl:w-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]" />
        {nights.length
          ? nights.map((n, i) => <NightTile key={n.id} night={n} index={i} />)
          : Array.from({ length: 6 }, (_, i) => <div key={i} className="h-[15.5rem] w-[11.5rem] shrink-0 border-r border-gold/15 sm:w-[13rem]" />)}
      </div>
      <div className="mt-6 px-4 sm:hidden">
        <ButtonLink href="/events" variant="outline" className="w-full">
          Full calendar <Arrow />
        </ButtonLink>
      </div>
    </section>
  );
}
