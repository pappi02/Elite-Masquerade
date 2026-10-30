import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number as Kenyan shillings, e.g. KSh 30,000 */
export function formatKES(amount: number) {
  return `KSh ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/** Roman numerals for section and list markers (1–39 is all we need). */
export function roman(n: number) {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

/** Seeded random numbers so decorative layouts match on server and client. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
