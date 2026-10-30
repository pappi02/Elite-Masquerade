"use client";

import { useConcierge } from "@/components/concierge/concierge";
import { Button } from "@/components/ui/button";
import { Filigree, MaskGlyph } from "@/components/ui/ornaments";
import { Reveal } from "@/components/ui/reveal";

const sample = [
  { who: "guest", text: "Four of us are flying in for the Cowboy night. What should we book?" },
  {
    who: "concierge",
    text: "A VIP table for four would suit you: reserved seating near the stage, premium spirits, and the chef serves you personally. Shall I add it for Saturday?",
  },
  { who: "guest", text: "Yes, and we need hats." },
];

const prompts = ["Book a VIP table for 4", "What's on in December?", "Plan a bachelor party"];

export function ConciergeCta() {
  const { open } = useConcierge();
  return (
    <section className="velvet grain relative overflow-hidden border-y border-gold/15">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-9 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-12">
        <div>
          <p className="eyebrow">The concierge</p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,6vw,2.75rem)] leading-[1.08] text-ivory">
            No WhatsApp. <span className="gold-text">No waiting.</span>
          </h2>
          <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-parchment">
            Our concierge answers in seconds, any hour. Ask about a night, choose a package, add a mask, and pay by M-Pesa or card. Your receipt arrives in the name of the house.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => open(p)}
                className="rounded-full border border-gold/30 px-4 py-2 text-sm text-parchment transition-colors hover:border-gold-bright hover:text-ivory"
              >
                {p}
              </button>
            ))}
          </div>
          <Button size="lg" className="mt-7" onClick={() => open()}>
            Speak to the concierge
          </Button>
        </div>

        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="border border-gold/20 bg-onyx/70 p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur">
            <div className="flex items-center gap-3 border-b border-gold/15 pb-4">
              <span className="flex size-9 items-center justify-center rounded-full border border-gold/40">
                <MaskGlyph className="h-3.5 w-7" />
              </span>
              <p className="font-display text-sm tracking-[0.16em]">The Concierge</p>
            </div>
            <div className="space-y-3 pt-4" aria-hidden>
              {sample.map((m, i) => (
                <div key={i} className={m.who === "guest" ? "flex justify-end" : "flex"}>
                  <p
                    className={
                      m.who === "guest"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-crimson/70 px-4 py-2.5 text-sm"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-gold/15 bg-smoke px-4 py-2.5 font-serif text-[0.98rem]"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <span className="border border-gold/60 bg-gold/10 px-3 py-2 font-display text-[0.58rem] uppercase tracking-[0.18em] text-gold-bright">
                  Add 4 × VIP · Sat
                </span>
                <span className="border border-gold/40 px-3 py-2 font-display text-[0.58rem] uppercase tracking-[0.18em] text-gold-bright">
                  Shop hats →
                </span>
              </div>
            </div>
          </div>
          <Filigree className="mx-auto mt-5" />
        </Reveal>
      </div>
    </section>
  );
}
