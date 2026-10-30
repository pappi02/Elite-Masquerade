import type { Metadata } from "next";
import { deliveryNote, productCategories, products } from "@/lib/boutique";
import { formatKES } from "@/lib/utils";
import { AddToBag } from "@/components/boutique/add-to-bag";
import { ProductArt } from "@/components/boutique/product-art";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "The Boutique",
  description: "Masquerade masks, tuxedo hire, cowboy hats and boots, delivered in Nairobi or waiting at the door.",
};

export default function BoutiquePage() {
  return (
    <main>
      <PageHero eyebrow="The boutique" title="Arrive in character" intro={deliveryNote} video="boutique">
        <nav aria-label="Boutique sections" className="mt-7 flex flex-wrap justify-center gap-2">
          {productCategories.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase().replace(/\s/g, "-")}`}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-display text-[0.62rem] uppercase tracking-[0.2em] text-parchment hover:border-gold-bright hover:text-ivory"
            >
              {c}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {productCategories.map((c) => {
          const items = products.filter((p) => p.category === c);
          return (
            <section key={c} id={c.toLowerCase().replace(/\s/g, "-")} className="scroll-mt-20 pt-12 lg:pt-16">
              <div className="flex items-baseline justify-between border-b border-gold/15 pb-3">
                <h2 className="font-display text-2xl text-ivory">{c}</h2>
                <span className="text-xs text-muted">{items.length} pieces</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
                {items.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.04} className="flex flex-col">
                    <div id={p.slug} className="scroll-mt-24">
                      <ProductArt product={p} className="aspect-[4/5] border border-gold/15" />
                    </div>
                    <h3 className="mt-3 font-serif text-lg leading-tight text-ivory sm:text-xl">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-gold">
                      {formatKES(p.price)}
                      {p.hire && <span className="text-muted"> · hire for the night</span>}
                    </p>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-parchment sm:text-sm">{p.description}</p>
                    <AddToBag product={p} className="mt-auto pt-4" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
