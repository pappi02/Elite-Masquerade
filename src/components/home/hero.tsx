"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { dayNumber, formatNight, nextNight } from "@/lib/calendar";
import { site } from "@/lib/site";
import { Arrow, Button, ButtonLink } from "@/components/ui/button";
import { Diamond } from "@/components/ui/ornaments";
import { Countdown } from "@/components/time/countdown";
import { useMinute } from "@/components/time/use-now";
import { VideoSlot } from "@/components/video/video-slot";
import { useConcierge } from "@/components/concierge/concierge";

const ease = [0.22, 1, 0.36, 1] as const;

/** Engraved ring with tick marks that turns slowly behind the emblem. */
function Ring() {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    // The wrapper rotates as its own composited layer; rotating the SVG itself repaints every tick each frame.
    <div aria-hidden className="absolute inset-0 animate-orbit will-change-transform">
      <svg viewBox="0 0 200 200" className="size-full text-gold">
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth=".4" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth=".3" strokeDasharray="1 2.2" />
        {ticks.map((i) => (
          <line
            key={i}
            x1="100"
            y1="3"
            x2="100"
            y2={i % 6 === 0 ? 8.5 : 5.5}
            stroke="currentColor"
            strokeOpacity={i % 6 === 0 ? 0.7 : 0.3}
            strokeWidth=".45"
            transform={`rotate(${i * 5} 100 100)`}
          />
        ))}
        {[0, 90, 180, 270].map((a) => (
          <path key={a} d="M100 0.5l2.2 3-2.2 3-2.2-3z" fill="var(--color-ruby)" transform={`rotate(${a} 100 100)`} />
        ))}
      </svg>
    </div>
  );
}

/** The emblem set in a gilded medallion, with two small engraved labels. */
function Medallion() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="relative mx-auto aspect-square w-[min(54vw,14rem)] sm:w-[min(44vw,19rem)] lg:w-full lg:max-w-[27rem]"
    >
      <div aria-hidden className="absolute -inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(142_15_29/0.45),rgb(92_10_20/0.18)_40%,transparent_68%)]" />
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-gold/15 bg-[radial-gradient(circle_at_50%_40%,rgb(23_17_15/0.9),rgb(7_6_5/0.95))] shadow-[inset_0_0_60px_rgb(0_0_0/0.8),0_30px_80px_-30px_rgb(0_0_0/0.9)]" />
      <Ring />
      <Image
        src="/brand/emblem.webp"
        alt={site.name}
        width={900}
        height={900}
        priority
        sizes="(max-width: 1024px) 64vw, 430px"
        className="absolute inset-[9%] size-[82%] drop-shadow-[0_18px_40px_rgb(0_0_0/0.75)]"
      />
      <span className="absolute left-[2%] top-[14%] hidden -rotate-12 border border-gold/30 bg-onyx px-2.5 py-1 font-display text-[0.55rem] uppercase tracking-[0.3em] text-gold sm:block">
        Est. MMXXVI
      </span>
      <span className="absolute bottom-[12%] right-[0%] hidden rotate-[-8deg] border border-gold/30 bg-onyx px-2.5 py-1 font-display text-[0.55rem] uppercase tracking-[0.3em] text-gold sm:block">
        Nº 01 · Lavington
      </span>
    </motion.div>
  );
}

/** Ticket-style card for the next event night, with the live countdown. */
function NextNightCard() {
  const now = useMinute();
  const night = now ? nextNight(now) : undefined;
  const month = night ? formatNight(night).split(" ").pop() : "";

  return (
    <div className="relative border border-gold/25 bg-onyx/90">
      {/* ticket notches */}
      <span aria-hidden className="absolute -left-2 top-[3.75rem] size-4 rounded-full border border-gold/25 bg-onyx sm:top-[4.25rem]" />
      <span aria-hidden className="absolute -right-2 top-[3.75rem] size-4 rounded-full border border-gold/25 bg-onyx sm:top-[4.25rem]" />
      <div className="grid grid-cols-[auto_1fr] items-center">
        <div className="flex h-[7.5rem] w-20 flex-col items-center justify-center border-r border-gold/20 sm:h-[8.5rem] sm:w-24">
          <span className="font-display text-[0.55rem] uppercase tracking-[0.3em] text-muted">Sat</span>
          <span className="font-display text-4xl leading-none text-gold-bright sm:text-5xl">{night ? dayNumber(night) : "··"}</span>
          <span className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.3em] text-parchment">{month}</span>
        </div>
        <div className="min-w-0 px-4 sm:px-5">
          <p className="eyebrow text-[0.58rem]">The next unmasking</p>
          <p className="mt-1 font-display text-lg leading-tight tracking-[0.06em] text-ivory sm:truncate sm:text-xl">{night?.theme.name ?? " "}</p>
          <p className="mt-0.5 font-serif text-base italic leading-snug text-parchment sm:truncate">{night?.theme.tagline ?? " "}</p>
          {night && (
            <Link
              href={`/events/${night.theme.slug}?night=${night.id}`}
              className="group/btn mt-2 inline-flex items-center gap-2 font-display text-[0.58rem] uppercase tracking-[0.22em] text-gold hover:text-gold-bright"
            >
              Programme & dress code <Arrow className="h-2 w-4" />
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-dashed border-gold/25 px-4 py-3.5">
        <Countdown size="compact" />
      </div>
    </div>
  );
}

const facts = [
  { k: "Every Saturday", v: `Doors ${site.doorsOpen}` },
  { k: "Gentlemen only", v: `${site.ageLimit} and over` },
  { k: "Lavington", v: "Address on booking" },
];

export function Hero() {
  const { open } = useConcierge();
  return (
    <section className="relative isolate overflow-hidden border-b border-gold/15 pb-8 pt-[4.5rem] lg:pb-14 lg:pt-24">
      <VideoSlot name="hero" label={false} priority className="absolute inset-0 -z-20 opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_6_5/0.2),rgb(7_6_5/0.75)_55%,rgb(7_6_5/0.9))]" />
      {/* Gilded frame rules on wide screens, so the hero reads as a composed panel */}
      <div aria-hidden className="pointer-events-none absolute inset-y-16 left-1/2 -z-10 hidden w-full max-w-7xl -translate-x-1/2 border-x border-gold/10 xl:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 xl:gap-16">
        <Medallion />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="text-center lg:text-left"
        >
          <p className="eyebrow flex items-center justify-center gap-3 lg:justify-start">
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            A private gentlemen&apos;s society
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.3rem,7.5vw,4.4rem)] leading-[0.98] tracking-[0.02em] text-ivory">
            Masks on.
            <span className="gold-text gold-text-live block">Names off.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-serif text-[1.1rem] leading-relaxed text-parchment sm:text-[1.2rem] lg:mx-0">
            Every Saturday a private house in Lavington opens to men of calibre. Chefs at your table, strings and saxophone, a new theme each
            weekend, and a network you keep long after the masks come off.
          </p>

          <div className="mx-auto mt-6 max-w-xl text-left lg:mx-0">
            <NextNightCard />
          </div>

          <div className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row lg:mx-0">
            <ButtonLink href="/events" size="lg" className="sm:flex-1">
              Reserve your mask <Arrow />
            </ButtonLink>
            <Button variant="outline" size="lg" className="sm:flex-1" onClick={() => open()}>
              Ask the concierge
            </Button>
          </div>

          <dl className="mx-auto mt-6 grid max-w-xl grid-cols-3 border-t border-gold/15 pt-4 lg:mx-0">
            {facts.map((f, i) => (
              <div key={f.k} className={i > 0 ? "border-l border-gold/15 pl-3 sm:pl-4" : "pr-3"}>
                <dt className="flex items-center justify-center gap-1.5 font-display text-[0.6rem] uppercase tracking-[0.18em] text-ivory sm:text-[0.65rem] lg:justify-start">
                  <Diamond className="hidden size-1.5 sm:block" />
                  {f.k}
                </dt>
                <dd className="mt-1 text-center text-[0.7rem] text-muted sm:text-xs lg:text-left">{f.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
