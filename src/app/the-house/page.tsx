import type { Metadata } from "next";
import { houseRules } from "@/lib/content";
import { site } from "@/lib/site";
import { roman } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Framed } from "@/components/ui/ornaments";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { VideoSlot } from "@/components/video/video-slot";

export const metadata: Metadata = {
  title: "The House",
  description: "A private residence in Lavington, Nairobi: gardens, a candlelit dining hall, cigar lounges and a stage.",
};

const rooms = [
  { name: "The Dining Hall", body: "One long candlelit table and private alcoves, where the chefs serve every course by hand.", video: "chefs" as const },
  { name: "The Gilded Stage", body: "Live bands, strings and saxophone, karaoke nights and the cages above the floor.", video: "cages" as const },
  { name: "The Cigar Lounge", body: "Leather chairs, cards and quiet corners for the conversations that matter.", video: "brotherhood" as const },
  { name: "The Gardens", body: "Fire pits, the grill on cowboy nights and the tandoor on Indian nights.", video: "the-house" as const },
];

export default function HousePage() {
  return (
    <main>
      <PageHero
        eyebrow={site.location}
        title="The House"
        intro="A private residence, opened only to members and their guests. The address arrives with your confirmed ticket, never before."
        video="the-house"
      />

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-12">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {rooms.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.04}>
              <Framed className="p-2.5">
                <VideoSlot name={r.video} className="aspect-[3/2] w-full" label={false} />
              </Framed>
              <h2 className="mt-4 font-display text-xl text-ivory">{r.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-parchment">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="rules" className="velvet grain relative border-y border-gold/15">
        <div className="relative mx-auto max-w-3xl px-4 py-9 sm:px-6 lg:py-12">
          <p className="eyebrow text-center">House rules</p>
          <h2 className="mt-2 text-center font-display text-[clamp(1.7rem,6vw,2.6rem)] text-ivory">Five rules. No exceptions.</h2>
          <ol className="mt-10 border-t border-gold/20">
            {houseRules.map((r, i) => (
              <li key={r} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-gold/20 py-5">
                <span className="font-display text-lg text-gold">{roman(i + 1)}</span>
                <p className="font-serif text-xl leading-snug text-ivory">{r}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ButtonLink href="/events" size="lg">
              Reserve your mask <Arrow />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
