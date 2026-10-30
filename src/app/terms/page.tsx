import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of attendance"
      sections={[
        { h: "Who may attend", p: `Events are for gentlemen aged ${site.ageLimit} and over. ID is checked at the door and not stored. The house may refuse entry to anyone not following the house rules.` },
        { h: "Tickets", p: "A ticket admits the number of gentlemen shown, for the night and package shown. Tickets are personal to the booking and may not be resold." },
        { h: "Changes and refunds", p: "Tickets may be moved to another night up to 72 hours before doors open. Within 72 hours, tickets are non-refundable. If the house cancels a night, you choose a full refund or another night." },
        { h: "Boutique", p: "Purchased items can be returned unworn within 7 days. Hired items must be returned by the Monday after the event in the condition received; damage or late return may be charged." },
        { h: "Conduct and discretion", p: "Masks stay on, phones stay away, and no guest may photograph or record another. Breaking this rule ends the night and the membership." },
        { h: "Payment", p: `Payments are processed securely by our payment provider (M-Pesa and cards). Receipts are issued in the name of ${site.name}.` },
      ]}
    />
  );
}
