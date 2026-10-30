import type { Metadata } from "next";
import { memberships } from "@/lib/packages";
import { site } from "@/lib/site";
import { cn, formatKES } from "@/lib/utils";
import { JoinButton } from "@/components/membership/join-button";
import { Diamond } from "@/components/ui/ornaments";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Packages } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Membership",
  description: "Monthly, quarterly, half-year and yearly memberships to the Elite Masquerade society.",
};

export default function MembershipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Membership"
        title="Join the inner circle"
        intro="Members come every weekend for one price, book before anyone else, bring guests and keep an engraved mask with their member number. Never their name."
        video="brotherhood"
      />

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-12">
        <div className="grid gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-2 xl:grid-cols-4">
          {memberships.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.04} className={cn("relative flex flex-col bg-lacquer p-6 sm:p-7", m.featured && "bg-smoke")}>
              {m.featured && <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright to-transparent" />}
              <p className="eyebrow text-muted">{m.term}</p>
              <h2 className={cn("mt-2 font-display text-xl tracking-[0.08em]", m.featured ? "gold-text" : "text-ivory")}>{m.name}</h2>
              <p className="mt-4 font-display text-[1.7rem] text-gold-bright">{formatKES(m.price)}</p>
              <p className="text-xs text-muted">
                {m.months === 1 ? "per month" : `for ${m.months} months · ${formatKES(Math.round(m.price / m.months / 100) * 100)} a month`}
              </p>
              <p className="mt-5 font-serif text-lg leading-snug text-ivory">{m.nights}</p>
              <ul className="mt-4 space-y-2 text-sm text-parchment">
                {m.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Diamond className="mt-1.5" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <JoinButton slug={m.slug} name={m.name} featured={m.featured} />
              </div>
            </Reveal>
          ))}
        </div>
        {site.samplePricing && <p className="mt-4 text-center text-[0.7rem] text-muted">Introductory prices, being finalised.</p>}
      </section>

      <section className="border-t border-gold/15 pt-12 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="eyebrow">Not ready to join?</p>
          <h2 className="mt-2 font-display text-[clamp(1.5rem,5vw,2.2rem)] text-ivory">Come for one night first</h2>
        </div>
        <div className="py-10">
          <Packages compact />
        </div>
      </section>
    </main>
  );
}
