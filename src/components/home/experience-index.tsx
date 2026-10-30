"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experiences } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Diamond, Framed } from "@/components/ui/ornaments";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoSlot } from "@/components/video/video-slot";

/**
 * Numbered index of experiences. Desktop: hover or focus a row to change the
 * film beside it. Phone: tap a row to open it in place.
 */
export function ExperienceIndex() {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-12">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="What awaits"
          title="Six reasons to clear your Saturday"
          intro="Chefs who feed you by hand, strings and saxophone, dancers in gilded cages and a stage that's yours for a song."
        />
        <ButtonLink href="/experiences" variant="ghost" className="hidden shrink-0 lg:inline-flex">
          All experiences <Arrow />
        </ButtonLink>
      </div>

      <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <ol className="border-t border-gold/15">
          {experiences.map((e, i) => {
            const on = i === active;
            return (
              <li key={e.slug} className="border-b border-gold/15">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group flex w-full items-baseline gap-4 py-3 text-left sm:gap-6"
                >
                  <span className={cn("w-6 font-display text-xs transition-colors", on ? "text-ruby" : "text-gold/60")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-[1.3rem] tracking-[0.04em] transition-colors sm:text-2xl",
                        on ? "text-gold-bright" : "text-ivory group-hover:text-gold-bright",
                      )}
                    >
                      {e.title}
                    </span>
                    <span className="mt-0.5 block font-serif text-base italic text-muted">{e.kicker}</span>
                  </span>
                  <span className={cn("h-px bg-gold transition-[width] duration-300", on ? "w-10" : "w-0 group-hover:w-5")} aria-hidden />
                </button>
                {/* Phone: details open under the row */}
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden lg:hidden"
                    >
                      <div className="pb-6">
                        <VideoSlot name={e.video} className="aspect-video w-full" />
                        <p className="mt-4 text-sm leading-relaxed text-parchment">{e.body}</p>
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-parchment">
                          {e.details.map((d) => (
                            <li key={d} className="flex items-center gap-2">
                              <Diamond /> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {/* Desktop: sticky film and copy that follow the active row */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Framed className="p-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <VideoSlot name={current.video} className="aspect-[4/3] w-full" />
                </motion.div>
              </AnimatePresence>
            </Framed>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-parchment">{current.body}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-parchment">
              {current.details.map((d) => (
                <li key={d} className="flex items-center gap-2.5">
                  <Diamond /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
