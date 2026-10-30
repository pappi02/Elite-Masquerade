import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { ConciergeButton } from "@/components/concierge/concierge";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Questions",
  description: "Who can attend, how booking works, what to wear and how discretion is kept.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero eyebrow="Questions" title="Before you arrive" intro="If your question isn't here, the concierge answers in seconds." />
      <div className="mx-auto max-w-3xl px-4 py-9 sm:px-6 lg:py-12">
        <div className="border-t border-gold/15">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-gold/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-serif text-xl text-ivory transition-colors hover:text-gold-bright [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative size-3 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-gold" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-gold transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-parchment">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ConciergeButton className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-gold-bright underline-offset-8 hover:underline">
            Ask the concierge →
          </ConciergeButton>
        </div>
      </div>
    </main>
  );
}
