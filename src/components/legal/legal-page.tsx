import { PageHero } from "@/components/ui/page-hero";

/** Plain policy page. Copy is a DRAFT until the client's lawyer approves it. */
export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <main>
      <PageHero eyebrow="The fine print" title={title} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="border border-ruby/40 bg-velvet/30 px-4 py-3 text-sm text-parchment">Draft for review. Final wording to be approved by the house.</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display text-lg text-ivory">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-parchment">{s.p}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
