"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Filigree } from "@/components/ui/ornaments";
import { bagCount, useBag } from "@/components/bag/bag-store";
import { NextNightLabel } from "@/components/time/countdown";

function Wordmark() {
  return (
    <Link href="/" className="group -my-1 flex items-center" aria-label={`${site.name}, home`}>
      <Image
        src="/brand/emblem-240.webp"
        alt={site.name}
        width={240}
        height={240}
        priority
        className="size-14 drop-shadow-[0_4px_14px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-105 lg:size-16"
      />
    </Link>
  );
}

function BagLink() {
  const lines = useBag();
  const n = bagCount(lines);
  return (
    <Link
      href="/checkout"
      className="relative flex size-10 items-center justify-center text-parchment transition-colors hover:text-gold-bright"
      aria-label={n ? `Your order, ${n} items` : "Your order"}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
        <path d="M5 8h14l-1.2 12H6.2z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 8V6.5a3 3 0 016 0V8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 12.2l1.4 1.8-1.4 1.8-1.4-1.8z" fill="var(--color-ruby)" />
      </svg>
      {n > 0 && (
        <span className="absolute right-0.5 top-0.5 flex min-w-4 items-center justify-center rounded-full bg-ruby px-1 text-[0.6rem] font-semibold leading-4 text-ivory">
          {n}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    // Lets the floating concierge button get out of the way of the menu.
    root.dataset.menu = open ? "open" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-gold/15 bg-onyx/85 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18">
          <Wordmark />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 font-display text-[0.66rem] uppercase tracking-[0.24em] transition-colors",
                        active ? "text-gold-bright" : "text-parchment hover:text-ivory",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-gold transition-[width] duration-300",
                          active ? "w-full" : "w-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <BagLink />
            <ButtonLink href="/events" size="sm" className="hidden sm:inline-flex">
              Reserve
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex size-10 items-center justify-center text-gold-bright lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300", open && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 right-0 h-px bg-current transition-all duration-300", open ? "w-6 -translate-y-1.5 -rotate-45" : "w-4")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="velvet fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-10 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-baseline gap-4 border-b border-gold/10 py-3.5 font-display text-2xl tracking-[0.06em]",
                        pathname === item.href ? "text-gold-bright" : "text-ivory",
                      )}
                    >
                      <span className="w-6 font-sans text-[0.6rem] tracking-[0.2em] text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-10 text-center">
              <Filigree className="mx-auto" />
              <p className="eyebrow mt-4">Next night</p>
              <NextNightLabel className="mt-2 block font-serif text-lg text-ivory" />
              <ButtonLink href="/events" size="lg" className="mt-6 w-full">
                Reserve your mask
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
