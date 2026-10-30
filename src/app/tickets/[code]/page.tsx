import type { Metadata } from "next";
import { TicketView } from "@/components/bag/ticket-view";

export const metadata: Metadata = { title: "Your ticket", robots: { index: false } };

export default async function TicketPage({ params }: PageProps<"/tickets/[code]">) {
  const { code } = await params;
  return (
    <main className="velvet min-h-svh">
      <TicketView code={code.toUpperCase().slice(0, 20)} />
    </main>
  );
}
