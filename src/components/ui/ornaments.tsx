import { cn } from "@/lib/utils";

/** Gold filigree rule with a ruby diamond in the middle, after the emblem's base. */
export function Filigree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 24" fill="none" aria-hidden className={cn("h-5 w-64 text-gold", className)}>
      <path d="M0 12h118M202 12h118" stroke="currentColor" strokeWidth=".75" opacity=".55" />
      <path
        d="M118 12c8-7 16-7 22-2 4 3 7 2 9-1M202 12c-8-7-16-7-22-2-4 3-7 2-9-1M118 12c8 7 16 7 22 2 4-3 7-2 9 1M202 12c-8 7-16 7-22 2-4-3-7-2-9 1"
        stroke="currentColor"
        strokeWidth=".9"
      />
      <path d="M160 2l9 10-9 10-9-10z" stroke="currentColor" strokeWidth=".9" />
      <path d="M160 6.5l4.5 5.5-4.5 5.5-4.5-5.5z" fill="var(--color-ruby)" />
    </svg>
  );
}

/** A tiny ruby diamond for lists and separators. */
export function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className={cn("size-2 shrink-0", className)}>
      <path d="M5 0l5 5-5 5-5-5z" fill="var(--color-ruby)" />
      <path d="M5 1.6L8.4 5 5 8.4 1.6 5z" fill="none" stroke="var(--color-gold-bright)" strokeWidth=".6" opacity=".7" />
    </svg>
  );
}

/** Fleur-de-lis crown from the top of the emblem's mask. */
export function Fleur({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden className={cn("h-10 w-8 text-gold", className)}>
      <path
        d="M20 2c4 6 6 11 0 20C14 13 16 8 20 2zM20 22c-6-6-14-7-16-1-1 4 3 7 7 5M20 22c6-6 14-7 16-1 1 4-3 7-7 5M12 30h16M20 22v24M14 46h12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M20 31l3 4-3 4-3-4z" fill="var(--color-ruby)" />
    </svg>
  );
}

/** Line drawing of a Venetian mask, used as a small mark (brand glyph). */
export function MaskGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" fill="none" aria-hidden className={cn("h-4 w-8 text-gold", className)}>
      <path
        d="M2 6c8-3 18-2 26 4 2 1.5 6 1.5 8 0 8-6 18-7 26-4-1 12-7 21-17 21-6 0-9-5-12-5s-6 5-12 5C9 27 3 18 2 6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 13c3-2 8-2 11 1-3 3-8 3-11-1zM52 13c-3-2-8-2-11 1 3 3 8 3 11-1z" fill="currentColor" />
    </svg>
  );
}

/** Ornate corner bracket for framed panels. Rotate for the other corners. */
export function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("size-7 text-gold/70", className)}>
      <path d="M1 39V12C1 6 6 1 12 1h27" stroke="currentColor" strokeWidth=".9" />
      <path d="M6 39V16c0-6 4-10 10-10h23" stroke="currentColor" strokeWidth=".5" opacity=".6" />
      <circle cx="12" cy="12" r="2" fill="var(--color-ruby)" />
    </svg>
  );
}

/** Four gilded corners around whatever is inside. */
export function Framed({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Corner className="absolute left-2 top-2" />
      <Corner className="absolute right-2 top-2 rotate-90" />
      <Corner className="absolute bottom-2 right-2 rotate-180" />
      <Corner className="absolute bottom-2 left-2 -rotate-90" />
      {children}
    </div>
  );
}
