import type { VideoKey } from "./videos";

/** The four reasons men come. Used on the home page manifesto. */
export const pillars = [
  {
    title: "Connect",
    body: "The main event. Exchange ideas and business with men of real calibre, and leave with friendships and opportunities that outlast the night.",
  },
  {
    title: "Dine",
    body: "Private chefs cook in front of you and serve you at the table. Tastings, world cuisines and champagne that never runs dry.",
  },
  {
    title: "Revel",
    body: "Live bands, strings and saxophone, dancers in gilded cages, comedians, karaoke and a different theme every weekend.",
  },
  {
    title: "Play",
    body: "Pool, darts, cards, blindfold games, mini-golf and bowling with our partners at The Gents Games & Entertainment.",
  },
];

export type Experience = {
  slug: string;
  title: string;
  kicker: string;
  body: string;
  details: string[];
  video: VideoKey;
};

export const experiences: Experience[] = [
  {
    slug: "network",
    title: "The Network",
    kicker: "Why the masks exist",
    body: "Behind a mask, titles fall away. Founders, directors, diaspora investors and creatives meet as equals, trade ideas over dinner, and decide for themselves when to exchange names.",
    details: ["Hosted introductions on request", "Quiet lounges for real conversations", "Members' directory (opt-in, masked)"],
    video: "brotherhood",
  },
  {
    slug: "dine",
    title: "Dine & Wine",
    kicker: "Chefs at your table",
    body: "Our male and female chefs cook live and serve every course by hand. Tasting nights, open-fire grills and food from every corner of the world.",
    details: ["Chef's tasting menus", "Wine & food pairing nights", "World cuisine stations", "Champagne & cocktails all night"],
    video: "chefs",
  },
  {
    slug: "performances",
    title: "The Performances",
    kicker: "Something to watch, always",
    body: "Dancers in gilded cages above the room, comedians and drama skits between courses, and traditional artists on our cultural nights.",
    details: ["Cage dancers", "Comedians & drama skits", "Traditional artists", "Concerts on selected nights"],
    video: "cages",
  },
  {
    slug: "music",
    title: "Live Music",
    kicker: "Real people, real instruments",
    body: "A classical violinist, a saxophonist who knows every Sade song, and full live bands for rhumba, benga, country and Afrobeats nights.",
    details: ["Violin & saxophone", "Full live bands", "Karaoke with the band", "Request your song"],
    video: "strings",
  },
  {
    slug: "karaoke",
    title: "Karaoke Royale",
    kicker: "Sing behind the mask",
    body: "Our singers open the night, then the stage is yours. Nobody will ever know it was you who took on Luther Vandross.",
    details: ["Live band backing", "Private karaoke lounges", "Singers on stage all night"],
    video: "karaoke",
  },
  {
    slug: "games",
    title: "Games & Play",
    kicker: "With The Gents Games & Entertainment",
    body: "Pool, darts, cards, blindfold games, table tennis, mini-golf and bowling. Book a full games session with our partners, then join us for the party.",
    details: ["Pool & darts", "Card tables", "Mini-golf & bowling", "Blindfold challenges"],
    video: "games",
  },
];

export const privateOfferings = [
  {
    title: "Bachelor Parties",
    body: "The last night as a free man deserves the house to himself and his brothers. Chef, performers, cages and a band. We handle everything and say nothing.",
    from: 250_000,
    guests: "10–40 gentlemen",
  },
  {
    title: "Private Chef Dinners",
    body: "A chef and a sommelier cook a tasting menu for you and your guests, at the house or at your home.",
    from: 120_000,
    guests: "4–16 guests",
  },
  {
    title: "Hire the House",
    body: "Book the whole Lavington house for a launch, a birthday or a deal worth celebrating. Bring your own theme or choose one of ours.",
    from: 600_000,
    guests: "Up to 120 guests",
  },
];

export const houseRules = [
  "Gentlemen only. Ladies are part of the staff and performers.",
  "Masks on from the door to the final toast.",
  "No photos or video of other guests. Phones stay in your pocket.",
  `Over-25s only. ID is checked at the door, never stored.`,
  "What happens behind the mask stays behind the mask.",
];

export const faqs = [
  {
    q: "Who can attend?",
    a: "Gentlemen aged 25 and over who are comfortable with the house rules. It's a brotherhood: ladies are part of the staff and the performances, not the guest list.",
  },
  {
    q: "How do I book?",
    a: "Choose a night on the calendar, pick Masque, VIP or VVIP, and pay by M-Pesa or card. The concierge can do all of it for you in a chat. There's no need to message anyone on WhatsApp.",
  },
  {
    q: "What do I wear?",
    a: "Every night has its own dress code, listed on the event page. A mask is always required. If you don't have one, the boutique can deliver it before the weekend or leave it at the door for you.",
  },
  {
    q: "Will anyone know who I am?",
    a: "Not unless you tell them. Everyone stays masked, phones stay away, and we only share the address with confirmed guests. Your booking details are never shown to anyone else.",
  },
  {
    q: "I live abroad. Can I plan ahead?",
    a: "Yes. The calendar runs months ahead, so you can pick the weekend you'll be in Nairobi and book from anywhere with a card.",
  },
  {
    q: "Can I bring friends?",
    a: "Yes. Book several tickets in one order, or reserve a VIP table or VVIP lounge for your group.",
  },
  {
    q: "What if I can't make it?",
    a: "Tickets can be moved to another night up to 72 hours before doors open. Refunds follow our terms.",
  },
];
