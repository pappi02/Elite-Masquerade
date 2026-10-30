import type { VideoKey } from "@/lib/videos";
import { Filigree } from "@/components/ui/ornaments";
import { VideoSlot } from "@/components/video/video-slot";

/** Shorter hero for inner pages: film behind, engraved title in front. */
export function PageHero({
  eyebrow,
  title,
  intro,
  video,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  video?: VideoKey;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-gold/15 px-4 pb-9 pt-24 text-center sm:px-6 sm:pt-28 lg:pb-12">
      {video ? (
        <VideoSlot name={video} label={false} priority className="absolute inset-0 -z-10" />
      ) : (
        <div className="velvet grain absolute inset-0 -z-10" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-onyx/70 via-onyx/40 to-onyx" />
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mx-auto mt-3 max-w-4xl font-display text-[clamp(2rem,8vw,3.6rem)] leading-[1.04] tracking-[0.02em] text-ivory">{title}</h1>
      <Filigree className="mx-auto mt-5" />
      {intro && <div className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-relaxed text-parchment sm:text-xl">{intro}</div>}
      {children}
    </section>
  );
}
