/**
 * Ticket tiers and memberships. ALL PRICES ARE SAMPLES until the client
 * confirms them (see site.samplePricing).
 */

export type TierSlug = "masque" | "vip" | "vvip";

export type Tier = {
  slug: TierSlug;
  name: string;
  price: number; // per gentleman, KES
  line: string;
  perks: string[];
  /** Tables of this size or larger get a group note. */
  seats?: string;
};

export const tiers: Tier[] = [
  {
    slug: "masque",
    name: "Masque",
    price: 15_000,
    line: "Your way into the room.",
    perks: [
      "Entry for one gentleman",
      "Champagne on arrival",
      "Chef's shared dinner",
      "Live entertainment all night",
      "House mask if you arrive without one",
    ],
  },
  {
    slug: "vip",
    name: "VIP",
    price: 30_000,
    line: "A seat at the table that matters.",
    perks: [
      "Everything in Masque",
      "Reserved table near the stage",
      "Chef serves your table personally",
      "Premium spirits & cocktails, open bar",
      "Priority karaoke requests",
    ],
    seats: "Tables of 4–6",
  },
  {
    slug: "vvip",
    name: "VVIP",
    price: 60_000,
    line: "The house, at your service.",
    perks: [
      "Everything in VIP",
      "Private lounge overlooking the cages",
      "Dedicated chef & butler",
      "Bottle of vintage champagne",
      "Bespoke gilded mask to keep",
      "Driver pick-up within Nairobi",
    ],
    seats: "Lounges of 4–8",
  },
];

export function getTier(slug: string) {
  return tiers.find((t) => t.slug === slug);
}

export type Membership = {
  slug: string;
  name: string;
  term: string;
  months: number;
  price: number;
  nights: string;
  perks: string[];
  featured?: boolean;
};

export const memberships: Membership[] = [
  {
    slug: "monthly",
    name: "The Initiate",
    term: "Monthly",
    months: 1,
    price: 50_000,
    nights: "All weekend nights that month at Masque level",
    perks: ["Priority booking 7 days early", "One guest pass per month", "Members' concierge line, answered first"],
  },
  {
    slug: "quarterly",
    name: "The Brother",
    term: "Quarterly",
    months: 3,
    price: 135_000,
    nights: "Every night for 3 months, upgraded to VIP once a month",
    perks: ["Everything in Initiate", "Engraved member mask", "Private chef dinner for you + 3", "10% off the boutique"],
  },
  {
    slug: "half-year",
    name: "The Patron",
    term: "Half a year",
    months: 6,
    price: 250_000,
    nights: "Every night for 6 months at VIP level",
    perks: ["Everything in Brother", "Two guest passes per month", "One free bachelor-party booking", "Reserved table on request"],
    featured: true,
  },
  {
    slug: "yearly",
    name: "The Inner Circle",
    term: "Yearly",
    months: 12,
    price: 450_000,
    nights: "Every night of the year, VVIP lounge twice a month",
    perks: [
      "Everything in Patron",
      "Name on the founders' wall (masked, of course)",
      "Host one private party a year",
      "First look at new themes and the annual Halloween ball",
    ],
  },
];
