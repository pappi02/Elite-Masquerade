import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy & discretion"
      sections={[
        { h: "What we collect", p: "The name you book under (an alias is fine), a phone number and email for your tickets, and a delivery address if you order from the boutique. Card and M-Pesa details go directly to the payment provider; we never see or store them." },
        { h: "What we never do", p: "We never share the guest list, never publish photos of guests and never sell or rent your details. Staff sign confidentiality agreements." },
        { h: "The concierge", p: "Conversations with the concierge are used only to answer you and help you book. Please don't share payment details or ID in chat." },
        { h: "How long we keep it", p: "Booking records are kept for as long as Kenyan tax law requires. Ask the concierge to delete anything else at any time." },
        { h: "Your rights", p: "Under the Kenya Data Protection Act 2019 you can ask to see, correct or delete your data. Contact the concierge and we'll handle it within 7 days." },
      ]}
    />
  );
}
