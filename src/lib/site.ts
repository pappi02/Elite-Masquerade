export const site = {
  name: "Elite Masquerade Experience",
  short: "Elite Masquerade",
  domain: "elitemasquerade.co.ke", // TODO: confirm with client
  tagline: "Masks on. Names off.",
  description:
    "A private, gents-only masquerade society in Lavington, Nairobi. Weekend soirées with private chefs, live strings and saxophone, themed nights and the city's most discreet network of men.",
  location: "Lavington, Nairobi",
  /** Exact address is only sent with a confirmed ticket. */
  addressNote: "Exact address is shared with confirmed guests only.",
  doorsOpen: "19:30",
  ageLimit: 25,
  email: "concierge@elitemasquerade.co.ke", // TODO: client email
  phone: "+254 700 000 000", // TODO: client number (shown only for emergencies)
  partner: {
    name: "The Gents Games & Entertainment",
    url: "https://gentsgames.co.ke", // TODO: real domain of the games site
  },
  socials: {
    instagram: "#",
    tiktok: "#",
    x: "#",
  },
  /** Shown while prices are placeholders the client has not confirmed. */
  samplePricing: true,
} as const;

export const nav = [
  { href: "/events", label: "Calendar" },
  { href: "/experiences", label: "Experiences" },
  { href: "/membership", label: "Membership" },
  { href: "/private", label: "Private" },
  { href: "/boutique", label: "Boutique" },
  { href: "/the-house", label: "The House" },
] as const;
