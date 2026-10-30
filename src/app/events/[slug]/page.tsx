import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct } from "@/lib/boutique";
import { getTheme, themes } from "@/lib/themes";
import { formatKES } from "@/lib/utils";
import { BookingWidget } from "@/components/events/booking-widget";
import { AddToBag } from "@/components/boutique/add-to-bag";
import { ProductArt } from "@/components/boutique/product-art";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Diamond, Filigree } from "@/components/ui/ornaments";
import { VideoSlot } from "@/components/video/video-slot";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const theme = getTheme((await params).slug);
  if (!theme) return {};
  return { title: theme.name, description: `${theme.tagline} ${theme.description}` };
}

export default async function ThemePage({ params }: PageProps<"/events/[slug]">) {
  const theme = getTheme((await params).slug);
  if (!theme) notFound();
  const pieces = theme.dressCode.products.map(getProduct).filter((p) => p !== undefined);
  const others = themes.filter((t) => t.slug !== theme.slug && t.family === theme.family).slice(0, 3);

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-gold/15">
        <VideoSlot name={theme.video} label={false} priority className="absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-onyx/60 via-onyx/50 to-onyx" />
        <div className="mx-auto max-w-7xl px-4 pb-9 pt-24 sm:px-6 sm:pt-28 lg:pb-12">
          <Link href="/events" className="eyebrow text-parchment hover:text-gold-bright">
            ← The calendar
          </Link>
          <p className="eyebrow mt-6">{theme.family} night</p>
          <h1 className="mt-2 max-w-3xl font-display text-[clamp(2.2rem,9vw,4.2rem)] leading-[1.02] text-ivory">{theme.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-gold-bright sm:text-2xl">{theme.tagline}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-9 sm:px-6 lg:grid-cols-[1fr_24rem] lg:gap-12 lg:py-12">
        <div className="min-w-0">
          <p className="font-serif text-xl leading-relaxed text-ivory sm:text-[1.4rem]">{theme.description}</p>

          <section className="mt-12">
            <h2 className="eyebrow">The programme</h2>
            <ol className="mt-4 border-t border-gold/15">
              {theme.programme.map((p) => (
                <li key={p.time + p.title} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-gold/15 py-4 sm:grid-cols-[6rem_1fr]">
                  <span className="font-display text-lg text-gold">{p.time}</span>
                  <div>
                    <p className="font-serif text-xl text-ivory">{p.title}</p>
                    {p.note && <p className="mt-0.5 text-sm text-muted">{p.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="dress-code" className="mt-12 scroll-mt-24">
            <h2 className="eyebrow">Dress code</h2>
            <p className="mt-3 font-display text-2xl text-ivory">{theme.dressCode.summary}</p>
            <ul className="mt-4 grid gap-2 text-parchment sm:grid-cols-2">
              {theme.dressCode.items.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <Diamond /> {i}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Your mask stays on from the door to the final toast. No mask? We&apos;ll have one waiting for you.</p>

            {pieces.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Complete the look from the boutique</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {pieces.map((p) => (
                    <div key={p.slug} className="border border-gold/15 bg-lacquer">
                      <ProductArt product={p} className="aspect-[5/4]" />
                      <div className="p-4">
                        <p className="font-serif text-lg leading-tight text-ivory">{p.name}</p>
                        <p className="mt-0.5 text-sm text-gold">
                          {formatKES(p.price)}
                          {p.hire && <span className="text-muted"> · hire</span>}
                        </p>
                        <AddToBag product={p} compact className="mt-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {others.length > 0 && (
            <section className="mt-14">
              <Filigree />
              <h2 className="eyebrow mt-6">More {theme.family.toLowerCase()} nights</h2>
              <ul className="mt-4 border-t border-gold/15">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-gold/15">
                    <Link href={`/events/${o.slug}`} className="group flex items-center justify-between gap-4 py-4">
                      <span>
                        <span className="block font-serif text-xl text-ivory group-hover:text-gold-bright">{o.name}</span>
                        <span className="text-sm text-muted">{o.tagline}</span>
                      </span>
                      <Arrow className="text-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/events" variant="ghost" className="mt-4 px-0">
                Full calendar <Arrow />
              </ButtonLink>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<div className="h-[40rem] border border-gold/25 bg-lacquer" />}>
            <BookingWidget themeSlug={theme.slug} themeName={theme.name} />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}
