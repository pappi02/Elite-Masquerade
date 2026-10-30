import type { Product } from "@/lib/boutique";
import { cn } from "@/lib/utils";

/**
 * Line-art stand-ins for product photos, drawn in gold over velvet.
 * Swap for real photography when the client sends it.
 */
const shapes: Record<string, React.ReactNode> = {
  mask: (
    <>
      <path d="M10 40c14-6 30-4 42 6 3 2.5 9 2.5 12 0 12-10 28-12 42-6-2 22-12 36-29 36-10 0-15-8-20-8s-10 8-20 8C22 76 12 62 10 40z" />
      <path d="M28 52c5-4 13-4 18 1-5 5-13 5-18-1zM100 52c-5-4-13-4-18 1 5 5 13 5 18-1z" fill="currentColor" />
      <path d="M64 46V28M64 28l-5-8 5-6 5 6z" />
    </>
  ),
  feather: (
    <>
      <path d="M14 58c12-5 28-4 40 5 3 2 8 2 11 0 12-9 27-10 39-5-2 18-11 30-26 30-9 0-13-7-18-7s-9 7-18 7c-15 0-25-12-28-30z" />
      <path d="M30 66c4-3 11-3 15 1-4 4-11 4-15-1zM98 66c-4-3-11-3-15 1 4 4 11 4 15-1z" fill="currentColor" />
      <path d="M58 52C50 34 52 18 62 6c4 14 2 30-4 46zM66 52c4-16 14-28 28-34-4 14-14 26-28 34zM56 54c-10-10-24-16-36-14 8 10 22 14 36 14z" />
    </>
  ),
  tux: (
    <>
      <path d="M40 16l24 18 24-18 18 8 6 66H16l6-66z" />
      <path d="M40 16l14 50 10-32M88 16L74 66 64 34" />
      <path d="M58 30l6 4 6-4-6 8z" fill="currentColor" />
      <circle cx="64" cy="56" r="1.6" fill="currentColor" />
      <circle cx="64" cy="66" r="1.6" fill="currentColor" />
    </>
  ),
  hat: (
    <>
      <path d="M12 66c18 10 86 10 104 0-8-2-16-4-22-4" />
      <path d="M34 62c-2-14 2-34 10-40 6-4 12 4 20 4s14-8 20-4c8 6 12 26 10 40-20 6-40 6-60 0z" />
      <path d="M36 54c18 4 38 4 56 0" />
    </>
  ),
  boot: (
    <>
      <path d="M40 10h34l-4 50c10 4 26 8 36 14 6 4 6 12 0 14H38c-4 0-6-4-6-8l8-70z" />
      <path d="M44 22h26M46 34h22" />
      <path d="M32 88h18v6" />
    </>
  ),
  bow: (
    <>
      <path d="M58 46L22 28c-6 8-6 28 0 36zM70 46l36-18c6 8 6 28 0 36z" />
      <rect x="56" y="38" width="16" height="16" rx="3" />
    </>
  ),
  square: (
    <>
      <path d="M30 40h68v48H30z" />
      <path d="M40 40l14-24 10 18 10-22 14 28" />
    </>
  ),
  bandana: (
    <>
      <path d="M18 30h92L64 86z" />
      <path d="M40 30l24 34 24-34" />
      <circle cx="64" cy="44" r="4" />
    </>
  ),
};

const shapeFor: Record<string, keyof typeof shapes> = {
  "gilded-venetian-mask": "mask",
  "onyx-half-mask": "mask",
  "crimson-feather-mask": "feather",
  "midnight-tuxedo": "tux",
  "velvet-dinner-jacket": "tux",
  "velvet-bow-tie": "bow",
  "silk-pocket-square": "square",
  "stetson-hat": "hat",
  "leather-cowboy-boots": "boot",
  "silk-bandana": "bandana",
};

export function ProductArt({ product, className }: { product: Product; className?: string }) {
  const [a, b] = product.palette;
  return (
    <div
      className={cn("relative isolate flex items-center justify-center overflow-hidden", className)}
      style={{ background: `radial-gradient(80% 70% at 50% 35%, ${a}55, transparent 70%), radial-gradient(60% 50% at 80% 100%, ${b}55, transparent 70%), #0d0a09` }}
    >
      <svg viewBox="0 0 128 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="w-3/5 text-gold-bright drop-shadow-[0_6px_20px_rgb(0_0_0/0.6)]" aria-hidden>
        {shapes[shapeFor[product.slug] ?? "mask"]}
      </svg>
    </div>
  );
}
