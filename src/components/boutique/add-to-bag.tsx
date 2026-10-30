"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/boutique";
import { cn } from "@/lib/utils";
import { bag } from "@/components/bag/bag-store";

/** Size picker (when needed) and an add button that turns into a checkout link. */
export function AddToBag({ product, compact = false, className }: { product: Product; compact?: boolean; className?: string }) {
  const [size, setSize] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);
  const needsSize = Boolean(product.sizes?.length);

  return (
    <div className={className}>
      {needsSize && (
        <div className="mb-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Size for ${product.name}`}>
          {product.sizes!.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => {
                setSize(s);
                setAdded(false);
              }}
              className={cn(
                "min-w-9 border px-2 py-1.5 text-xs transition-colors",
                size === s ? "border-gold bg-gold text-onyx" : "border-gold/25 text-parchment hover:border-gold/60",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      {added ? (
        <Link
          href="/checkout"
          className="flex h-10 w-full items-center justify-center border border-gold bg-gold font-display text-[0.6rem] uppercase tracking-[0.2em] text-onyx"
        >
          Added · Checkout →
        </Link>
      ) : (
        <button
          type="button"
          disabled={needsSize && !size}
          onClick={() => {
            bag.addProduct(product.slug, size);
            setAdded(true);
          }}
          className={cn(
            "flex h-10 w-full items-center justify-center border border-gold/50 font-display text-[0.6rem] uppercase tracking-[0.2em] text-gold-bright transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          {needsSize && !size ? "Choose a size" : product.hire ? (compact ? "Hire" : "Hire for the night") : compact ? "Add" : "Add to order"}
        </button>
      )}
    </div>
  );
}
