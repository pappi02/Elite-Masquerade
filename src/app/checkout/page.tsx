import type { Metadata } from "next";
import { Checkout } from "@/components/bag/checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="velvet min-h-svh">
      <Checkout />
    </main>
  );
}
