"use client";

import { useState } from "react";
import { useConcierge } from "@/components/concierge/concierge";
import { Arrow, Button } from "@/components/ui/button";

const kinds = ["Bachelor party", "Private chef dinner", "Hire the house", "Something else"];

/**
 * Collects the basics, then hands them to the concierge as a ready-made
 * request. (Will post to the admin inbox once the backend exists.)
 */
export function PrivateEnquiry() {
  const { open } = useConcierge();
  const [kind, setKind] = useState(kinds[0]);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("12");
  const [notes, setNotes] = useState("");

  const field = "mt-1.5 h-11 w-full border border-gold/25 bg-onyx px-3 text-base text-ivory focus:border-gold focus:outline-none sm:text-sm";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        open(
          `I'd like to plan a ${kind.toLowerCase()} for about ${guests} guests${date ? ` around ${date}` : ""}.${notes ? ` ${notes}` : ""} What would you suggest?`,
        );
      }}
      className="border border-gold/25 bg-lacquer p-5 sm:p-7"
    >
      <p className="eyebrow">Plan a private event</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.18em] text-muted sm:col-span-2">
          Occasion
          <select value={kind} onChange={(e) => setKind(e.target.value)} className={field}>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="text-xs uppercase tracking-[0.18em] text-muted">
          Preferred date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </label>
        <label className="text-xs uppercase tracking-[0.18em] text-muted">
          Guests
          <input type="number" min={2} max={200} value={guests} onChange={(e) => setGuests(e.target.value)} className={field} />
        </label>
        <label className="text-xs uppercase tracking-[0.18em] text-muted sm:col-span-2">
          Anything we should know
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 600))}
            rows={3}
            placeholder="Theme, food, performers, surprises…"
            className="mt-1.5 w-full border border-gold/25 bg-onyx px-3 py-2.5 text-base text-ivory placeholder:text-muted focus:border-gold focus:outline-none sm:text-sm"
          />
        </label>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full">
        Plan it with the concierge <Arrow />
      </Button>
      <p className="mt-3 text-center text-xs text-muted">Complete discretion. Nothing is shared outside the house.</p>
    </form>
  );
}
