import type { Metadata } from "next";
import { experiences } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Diamond, Framed } from "@/components/ui/ornaments";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { VideoSlot } from "@/components/video/video-slot";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Private chefs, live strings and saxophone, cage dancers, karaoke, comedy and games, all behind the mask.",
};

export default function ExperiencesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Experiences"
        title="What happens behind the mask"
        intro="Every night is built around one thing: good men in good conversation. Everything else is there to make the conversation better."
        video="cages"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {experiences.map((e, i) => (
          <section key={e.slug} id={e.slug} className="grid scroll-mt-20 items-center gap-8 border-b border-gold/15 py-9 lg:grid-cols-2 lg:gap-12 lg:py-12">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <Framed className="p-3">
                <VideoSlot name={e.video} className="aspect-[4/3] w-full" />
              </Framed>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-display text-sm text-ruby">{String(i + 1).padStart(2, "0")}</p>
              <p className="eyebrow mt-3">{e.kicker}</p>
              <h2 className="mt-2 font-display text-[clamp(1.7rem,6vw,2.6rem)] leading-tight text-ivory">{e.title}</h2>
              <p className="mt-4 font-serif text-lg leading-relaxed text-parchment sm:text-xl">{e.body}</p>
              <ul className="mt-5 grid gap-2 text-sm text-parchment sm:grid-cols-2">
                {e.details.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <Diamond /> {d}
                  </li>
                ))}
              </ul>
              {e.slug === "games" ? (
                <a
                  href={site.partner.url}
                  target="_blank"
                  rel="noopener"
                  className="group/btn mt-7 inline-flex h-11 items-center gap-2 border border-gold/50 px-6 font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-bright hover:bg-gold/10"
                >
                  Book a games session <Arrow />
                </a>
              ) : (
                <ButtonLink href="/events" variant="outline" className="mt-7">
                  Find a night <Arrow />
                </ButtonLink>
              )}
            </Reveal>
          </section>
        ))}
      </div>
    </main>
  );
}
