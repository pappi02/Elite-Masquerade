import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-display uppercase tracking-[0.2em] transition-[color,background-color,border-color,transform] duration-300 ease-velvet active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-gradient-to-b from-gold-bright via-gold to-gold-deep text-onyx shadow-[0_0_0_1px_rgb(240_212_138/0.4)_inset,0_10px_30px_-12px_rgb(201_161_74/0.6)] hover:brightness-110",
  outline: "border border-gold/50 text-gold-bright hover:border-gold-bright hover:bg-gold/10",
  ghost: "text-parchment hover:text-gold-bright",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.62rem]",
  md: "h-11 px-6 text-[0.68rem]",
  lg: "h-12 px-8 text-[0.72rem] sm:h-13",
};

function Sheen({ variant }: { variant: Variant }) {
  if (variant !== "gold") return null;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-[2px] transition-[left,opacity] duration-500 ease-velvet group-hover/btn:left-[120%] group-hover/btn:opacity-100"
    />
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Sheen variant={variant} />
      {children}
    </Link>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Sheen variant={variant} />
      {children}
    </button>
  );
}

/** Thin arrow drawn to match the hairlines. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 10" fill="none" aria-hidden className={cn("h-2.5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1", className)}>
      <path d="M0 5h22M18 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
