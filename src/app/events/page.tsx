import type { Metadata } from "next";
import { CalendarList } from "@/components/events/calendar-list";
import { PageHero } from "@/components/ui/page-hero";
import { Countdown, NextNightLabel } from "@/components/time/countdown";

export const metadata: Metadata = {
  title: "The Calendar",
  description: "Every Saturday in Lavington, a different masquerade. Six months of themed nights, ready to book.",
};

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="The calendar"
        title="Every Saturday, a new masquerade"
        intro="Cultural nights, cowboy nights, tastings, strings and our signature black-tie ball. The rotation repeats all year, so you can plan months ahead from anywhere in the world."
      >
        <div className="mx-auto mt-8 max-w-md border border-gold/20 bg-onyx/60 px-4 py-5 backdrop-blur">
          <p className="eyebrow text-parchment">Next</p>
          <NextNightLabel className="mt-1 block font-serif text-lg text-ivory" />
          <Countdown size="compact" className="mt-3" />
        </div>
      </PageHero>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-11">
        <CalendarList />
      </div>
    </main>
  );
}
