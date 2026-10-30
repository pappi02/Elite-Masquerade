import Link from "next/link";
import { pillars } from "@/lib/content";
import { tiers } from "@/lib/packages";
import { site } from "@/lib/site";
import { themes } from "@/lib/themes";
import { cn, formatKES, roman } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Diamond, Filigree, Framed } from "@/components/ui/ornaments";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoSlot } from "@/components/video/video-slot";

/** Slow band of theme names under the hero. */
export function ThemeMarquee() {
  const names = themes.map((t) => t.name);
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-lacquer py-3" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap" style={{ ["--marquee-duration" as string]: "70s" }}>
        {[...names, ...names].map((n, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-[0.72rem] uppercase tracking-[0.3em] text-parchment">
            {n}
            <Diamond />
          </span>
        ))}
      </div>
    </div>
  );
}

/** The four reasons, as an editorial index with a film beside it. */
export function Manifesto() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-9 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:py-12">
      <div>
        <SectionHeading
          eyebrow="The society"
          title={
            <>
              A brotherhood <span className="gold-text">behind the mask</span>
            </>
          }
          intro="Once a week, the most interesting men in Nairobi put on a mask and leave their titles at the door. What's left is conversation, appetite and a very good night."
        />
        <ol className="mt-6 border-t border-gold/15">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-gold/15 py-3 sm:grid-cols-[3rem_8rem_1fr] sm:gap-x-5">
              <span className="font-display text-sm text-gold">{roman(i + 1)}</span>
              <h3 className="font-display text-base tracking-[0.14em] text-ivory sm:text-[0.95rem]">{p.title}</h3>
              <p className="col-start-2 mt-1 text-sm leading-relaxed text-parchment sm:col-start-3 sm:mt-0">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      <Reveal className="relative">
        <Framed className="p-3">
          <VideoSlot name="brotherhood" className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]" />
        </Framed>
        <p className="mt-3 text-right font-serif text-sm italic text-muted">Every face you&apos;d recognise. None you will.</p>
      </Reveal>
    </section>
  );
}

/** Masque / VIP / VVIP as an engraved price list, not cards. */
export function Packages({ compact = false }: { compact?: boolean }) {
  return (
    <section id="packages" className={cn("relative", !compact && "velvet grain border-y border-gold/15")}>
      <div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6", compact ? "py-0" : "py-9 lg:py-12")}>
        {!compact && (
          <SectionHeading
            align="center"
            eyebrow="Every package is an experience"
            title="Choose how you arrive"
            intro="Prices are per gentleman, for one night. Book a table or a lounge for your group."
          />
        )}
        <div
          className={cn(
            "no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-px md:overflow-hidden md:border md:border-gold/20 md:bg-gold/20 md:px-0",
            !compact && "mt-7",
          )}
        >
          {tiers.map((t, i) => {
            const featured = t.slug === "vip";
            return (
              <Reveal key={t.slug} delay={i * 0.05} className={cn("relative flex w-[84%] shrink-0 snap-start flex-col border border-gold/20 bg-lacquer p-5 sm:w-[60%] md:w-auto md:border-0 lg:p-7", featured && "bg-smoke")}>
                {featured && <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright to-transparent" />}
                <div className="flex items-baseline justify-between">
                  <h3 className={cn("font-display text-2xl tracking-[0.18em]", featured ? "gold-text" : "text-ivory")}>{t.name}</h3>
                  {featured && <span className="eyebrow text-[0.55rem] text-ruby">Most booked</span>}
                </div>
                <p className="mt-1 font-serif text-lg italic text-parchment">{t.line}</p>
                <p className="mt-4 font-display text-3xl text-gold-bright">
                  {formatKES(t.price)}
                  <span className="ml-2 font-sans text-xs tracking-normal text-muted">/ gentleman</span>
                </p>
                {t.seats && <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{t.seats}</p>}
                <ul className="mt-5 space-y-2 text-sm text-parchment">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Diamond className="mt-1.5" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <ButtonLink href={`/events?tier=${t.slug}`} variant={featured ? "gold" : "outline"} className="w-full">
                    Choose {t.name} <Arrow />
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[0.7rem] text-muted">
          <span className="md:hidden">Swipe for VIP and VVIP · </span>
          {site.samplePricing && "Introductory prices, being finalised."}
        </p>
      </div>
    </section>
  );
}

/** Lavington house + games partner, side by side. */
export function HouseAndGames() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-9 sm:px-6 md:grid-cols-2 lg:py-12">
      <Reveal className="group relative isolate flex min-h-[19rem] lg:min-h-[22rem] flex-col justify-end overflow-hidden border border-gold/15 p-6 sm:p-8">
        <VideoSlot name="the-house" label={false} className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-onyx via-onyx/60 to-transparent" />
        <p className="eyebrow">The house</p>
        <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">A private residence in Lavington</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-parchment">
          Gardens, a candlelit dining hall, cigar lounges and a stage. The address arrives with your ticket.
        </p>
        <Link href="/the-house" className="group/btn mt-5 inline-flex items-center gap-2 font-display text-[0.68rem] uppercase tracking-[0.22em] text-gold-bright">
          Step inside <Arrow />
        </Link>
      </Reveal>
      <Reveal delay={0.05} className="group relative isolate flex min-h-[19rem] lg:min-h-[22rem] flex-col justify-end overflow-hidden border border-gold/15 p-6 sm:p-8">
        <VideoSlot name="games" label={false} className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-onyx via-onyx/60 to-transparent" />
        <p className="eyebrow">In partnership</p>
        <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">Games with The Gents</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-parchment">
          Pool, darts, cards, blindfold games, mini-golf and bowling. Book a full games session with our partners, then join us for the night.
        </p>
        <a
          href={site.partner.url}
          target="_blank"
          rel="noopener"
          className="group/btn mt-5 inline-flex items-center gap-2 font-display text-[0.68rem] uppercase tracking-[0.22em] text-gold-bright"
        >
          See all the games <Arrow />
        </a>
      </Reveal>
    </section>
  );
}

export function MembershipBand() {
  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-lacquer">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-11">
        <div className="max-w-2xl">
          <p className="eyebrow">Membership</p>
          <h2 className="mt-2 font-display text-[clamp(1.5rem,5vw,2.3rem)] leading-tight text-ivory">
            Every weekend, <span className="gold-text">one price.</span>
          </h2>
          <p className="mt-3 font-serif text-lg text-parchment">
            Monthly, quarterly, half-year and yearly memberships with priority booking, guest passes and your own engraved mask.
          </p>
        </div>
        <ButtonLink href="/membership" variant="outline" size="lg" className="shrink-0">
          See memberships <Arrow />
        </ButtonLink>
      </div>
      <Filigree className="absolute -bottom-1 left-1/2 hidden -translate-x-1/2 opacity-40 lg:block" />
    </section>
  );
}
