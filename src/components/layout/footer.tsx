import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Filigree } from "@/components/ui/ornaments";
import { SignOff } from "./sign-off";

const more = [
  { href: "/faq", label: "Questions" },
  { href: "/house-rules", label: "House rules" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-onyx">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:pb-10 lg:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:block">
            <Image src="/brand/emblem-560.webp" alt={site.name} width={140} height={140} className="-ml-2 size-24 shrink-0 lg:size-[140px]" />
            <p className="max-w-xs font-serif text-base leading-relaxed text-parchment lg:mt-3">
              A private gentlemen&apos;s society in {site.location}. Masks on, names off, every weekend.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">The society</p>
            <ul className="space-y-2.5 text-sm text-parchment">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-gold-bright">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Good to know</p>
            <ul className="space-y-2.5 text-sm text-parchment">
              {more.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-gold-bright">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.partner.url} target="_blank" rel="noopener" className="transition-colors hover:text-gold-bright">
                  {site.partner.name} ↗
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="eyebrow mb-4">Discretion</p>
            <p className="text-sm leading-relaxed text-parchment">
              Gentlemen only, {site.ageLimit}+. {site.addressNote} Every booking goes through the concierge on this site, so there&apos;s no
              need to message anyone.
            </p>
            <div className="mt-5 flex gap-5 text-[0.65rem] uppercase tracking-[0.24em] text-muted">
              <a href={site.socials.instagram} className="hover:text-gold-bright">Instagram</a>
              <a href={site.socials.tiktok} className="hover:text-gold-bright">TikTok</a>
              <a href={site.socials.x} className="hover:text-gold-bright">X</a>
            </div>
          </div>
        </div>
        <Filigree className="mx-auto mt-8" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.68rem] tracking-wide text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-display uppercase tracking-[0.3em] text-gold/70">{site.tagline}</p>
          <SignOff />
        </div>
      </div>
    </footer>
  );
}
