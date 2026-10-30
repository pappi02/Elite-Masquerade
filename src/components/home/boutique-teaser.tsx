import Link from "next/link";
import { deliveryNote, products } from "@/lib/boutique";
import { formatKES } from "@/lib/utils";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductArt } from "@/components/boutique/product-art";

const featured = ["gilded-venetian-mask", "crimson-feather-mask", "midnight-tuxedo", "stetson-hat"];

export function BoutiqueTeaser() {
  const items = featured.map((s) => products.find((p) => p.slug === s)!);
  return (
    <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-12">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="The boutique" title="Arrive in character" intro={`No mask? No cowboy boots in your size? ${deliveryNote}`} />
        <ButtonLink href="/boutique" variant="outline" className="shrink-0 self-start lg:self-auto">
          Shop the boutique <Arrow />
        </ButtonLink>
      </div>
      <div className="no-scrollbar -mx-4 mt-6 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className="w-[48%] shrink-0 snap-start sm:w-auto">
            <Link href={`/boutique#${p.slug}`} className="group block">
              <ProductArt product={p} className="aspect-square border border-gold/15 transition-colors group-hover:border-gold/50" />
              <p className="mt-3 font-serif text-lg leading-tight text-ivory">{p.name}</p>
              <p className="mt-0.5 text-sm text-gold">
                {formatKES(p.price)}
                {p.hire && <span className="text-muted"> · hire</span>}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
