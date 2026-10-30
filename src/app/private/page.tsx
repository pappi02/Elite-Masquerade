import type { Metadata } from "next";
import { privateOfferings } from "@/lib/content";
import { formatKES, roman } from "@/lib/utils";
import { PrivateEnquiry } from "@/components/private/enquiry";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Private Events",
  description: "Bachelor parties, private chef dinners and exclusive hire of the Lavington house.",
};

export default function PrivatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Private events"
        title="The house, for you alone"
        intro="Bachelor nights, private chef dinners and full hire of the house, run by the same team, with the same discretion."
        video="chefs"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-9 sm:px-6 lg:grid-cols-[1fr_26rem] lg:gap-12 lg:py-12">
        <ol className="border-t border-gold/15">
          {privateOfferings.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.05} className="grid gap-x-6 border-b border-gold/15 py-8 sm:grid-cols-[3rem_1fr]">
              <span className="font-display text-lg text-gold">{roman(i + 1)}</span>
              <div>
                <h2 className="font-display text-2xl text-ivory sm:text-3xl">{o.title}</h2>
                <p className="mt-3 font-serif text-lg leading-relaxed text-parchment">{o.body}</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm">
                  <span className="text-gold-bright">From {formatKES(o.from)}</span>
                  <span className="text-muted">{o.guests}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <PrivateEnquiry />
        </aside>
      </div>
    </main>
  );
}
