import type { VideoKey } from "./videos";

export type ThemeFamily = "Signature" | "Culture" | "Music" | "Taste" | "Revelry";

export type Theme = {
  slug: string;
  name: string;
  family: ThemeFamily;
  /** One line under the title. */
  tagline: string;
  description: string;
  /** What happens on the night, in order. */
  programme: { time: string; title: string; note?: string }[];
  dressCode: {
    summary: string;
    items: string[];
    /** Boutique items that complete the look. */
    products: string[];
  };
  video: VideoKey;
  /** Accent used on cards and the event page. */
  accent: "gold" | "ruby";
};

export const themes: Theme[] = [
  {
    slug: "grand-masquerade",
    name: "The Grand Masquerade",
    family: "Signature",
    tagline: "Black tie. Gold masks. No names.",
    description:
      "Our signature night. Candlelit tables, a private chef's tasting menu, champagne on arrival and a string quartet that slides into saxophone as the night deepens. The room is full of men worth knowing, and not one of them knows who you are.",
    programme: [
      { time: "19:30", title: "Champagne arrival", note: "Masks fitted at the door if you need one" },
      { time: "20:30", title: "Chef's tasting menu", note: "Five courses, served at the table" },
      { time: "22:00", title: "Strings & saxophone" },
      { time: "23:30", title: "The cages open", note: "Performance by our resident dancers" },
      { time: "01:00", title: "Cigars, cards & conversation" },
    ],
    dressCode: {
      summary: "Black tie with a full masquerade mask.",
      items: ["Black tuxedo or dinner suit", "Bow tie (black or deep red)", "Full or half Venetian mask", "Polished black shoes"],
      products: ["gilded-venetian-mask", "midnight-tuxedo", "velvet-bow-tie"],
    },
    video: "theme-grand",
    accent: "gold",
  },
  {
    slug: "cowboy-masquerade",
    name: "Cowboy Masquerade",
    family: "Revelry",
    tagline: "Hats low. Masks on. Whiskey neat.",
    description:
      "The house turns saloon. Whiskey flights, flame-grilled ribs from the chef's pit, line dancers on the floor and country classics from the band. Boots, hats and bandanas are part of the deal, and the boutique has your size.",
    programme: [
      { time: "19:30", title: "Whiskey welcome" },
      { time: "20:30", title: "Chef's open-fire grill" },
      { time: "21:30", title: "Line dancers & the cages" },
      { time: "23:00", title: "Live country band" },
      { time: "00:30", title: "Poker tables open" },
    ],
    dressCode: {
      summary: "Western, sharp, masked.",
      items: ["Cowboy hat", "Leather boots", "Denim or dark trousers", "Bandana or scarf", "Masquerade mask"],
      products: ["stetson-hat", "leather-cowboy-boots", "silk-bandana", "onyx-half-mask"],
    },
    video: "theme-cowboy",
    accent: "ruby",
  },
  {
    slug: "karaoke-royale",
    name: "Karaoke Royale",
    family: "Music",
    tagline: "The stage is yours. The identity is not.",
    description:
      "Our singers open the night and hand the microphone over. Request a song from the live band, take the stage behind your mask, or sit back while the dancers move in the cages above the room.",
    programme: [
      { time: "19:30", title: "Cocktail hour" },
      { time: "20:30", title: "Opening set by our singers" },
      { time: "21:30", title: "Open stage", note: "Request any song from the band" },
      { time: "23:00", title: "Cage performances" },
      { time: "00:30", title: "Last song of the night" },
    ],
    dressCode: {
      summary: "Smart evening wear with a statement mask.",
      items: ["Dark suit or velvet blazer", "Open collar allowed", "Statement mask"],
      products: ["crimson-feather-mask", "velvet-dinner-jacket"],
    },
    video: "theme-karaoke",
    accent: "ruby",
  },
  {
    slug: "rhumba-night",
    name: "Rhumba Night",
    family: "Culture",
    tagline: "Lingala guitars until sunrise.",
    description:
      "A night for the classics, from Franco to Koffi. A live rhumba band, dancers who teach the steps, and a menu of grilled tilapia, ugali and Congolese favourites from our chefs.",
    programme: [
      { time: "19:30", title: "Welcome & palm wine" },
      { time: "20:30", title: "Chef's Congolese table" },
      { time: "21:30", title: "Live rhumba band" },
      { time: "23:00", title: "Dancers on the floor" },
    ],
    dressCode: {
      summary: "Sharp and colourful. Think sapeur.",
      items: ["Tailored suit in a bold colour", "Pocket square", "Polished shoes", "Masquerade mask"],
      products: ["gilded-venetian-mask", "silk-pocket-square"],
    },
    video: "theme-rhumba",
    accent: "gold",
  },
  {
    slug: "vintage-tasting",
    name: "The Vintage Tasting",
    family: "Taste",
    tagline: "Six wines. Six courses. One table.",
    description:
      "Our sommelier pours six wines from four continents, each matched with a course from the chef. Talk business over the reds, settle it over the port.",
    programme: [
      { time: "19:30", title: "Sparkling reception" },
      { time: "20:00", title: "Six-course pairing", note: "Chef and sommelier at the table" },
      { time: "22:30", title: "Cheese, port & cigars" },
      { time: "23:30", title: "Violin in the lounge" },
    ],
    dressCode: {
      summary: "Black tie optional, tuxedo preferred.",
      items: ["Tuxedo or dark suit", "Tie or bow tie", "Half mask (easier for tasting)"],
      products: ["onyx-half-mask", "midnight-tuxedo"],
    },
    video: "theme-tasting",
    accent: "gold",
  },
  {
    slug: "strings-and-sax",
    name: "Strings & Saxophone",
    family: "Music",
    tagline: "A live orchestra in a private house.",
    description:
      "A violinist, a cellist and a saxophonist play everything from Vivaldi to Sade while the chefs serve a slow, long dinner. The quietest night on our calendar and often the best conversations.",
    programme: [
      { time: "19:30", title: "Aperitivo" },
      { time: "20:30", title: "Dinner with strings" },
      { time: "22:00", title: "Saxophone set" },
      { time: "23:30", title: "Lounge & late requests" },
    ],
    dressCode: {
      summary: "Black tie.",
      items: ["Tuxedo", "Bow tie", "Full mask"],
      products: ["gilded-venetian-mask", "midnight-tuxedo", "velvet-bow-tie"],
    },
    video: "theme-strings",
    accent: "gold",
  },
  {
    slug: "luo-night",
    name: "Luo Night",
    family: "Culture",
    tagline: "Benga, fish and brotherhood.",
    description:
      "Benga and ohangla played live, whole fried fish and kuon from the chef, and traditional artists who bring the lake to Lavington.",
    programme: [
      { time: "19:30", title: "Welcome" },
      { time: "20:30", title: "Lakeside feast" },
      { time: "21:30", title: "Traditional artists" },
      { time: "23:00", title: "Live benga band" },
    ],
    dressCode: {
      summary: "Traditional or modern Luo attire with your mask.",
      items: ["Traditional attire or a sharp suit", "Masquerade mask"],
      products: ["gilded-venetian-mask"],
    },
    video: "theme-luo",
    accent: "ruby",
  },
  {
    slug: "comedy-and-skits",
    name: "Comedy & Drama Night",
    family: "Revelry",
    tagline: "Laugh as loud as you like. No one knows it's you.",
    description:
      "Kenya's sharpest comedians and a drama troupe performing short skits between courses. Expect the room to get roasted, gently.",
    programme: [
      { time: "19:30", title: "Cocktails" },
      { time: "20:30", title: "Dinner & first set" },
      { time: "22:00", title: "Drama skits" },
      { time: "23:00", title: "Headline comedian" },
    ],
    dressCode: {
      summary: "Smart evening wear.",
      items: ["Suit or blazer", "Masquerade mask"],
      products: ["onyx-half-mask", "velvet-dinner-jacket"],
    },
    video: "theme-comedy",
    accent: "gold",
  },
  {
    slug: "nigerian-night",
    name: "Nigerian Night",
    family: "Culture",
    tagline: "Owambe, but masked.",
    description:
      "Jollof made by a Lagos chef, suya off the grill, and Afrobeats and highlife from a live band. Dress like the party is in Lekki.",
    programme: [
      { time: "19:30", title: "Chapman & palm wine" },
      { time: "20:30", title: "Jollof, suya & pepper soup" },
      { time: "22:00", title: "Live Afrobeats band" },
      { time: "23:30", title: "Dancers & the cages" },
    ],
    dressCode: {
      summary: "Agbada, kaftan or a sharp suit, plus your mask.",
      items: ["Agbada or kaftan", "Fila cap (optional)", "Masquerade mask"],
      products: ["gilded-venetian-mask"],
    },
    video: "theme-nigerian",
    accent: "ruby",
  },
  {
    slug: "kikuyu-night",
    name: "Kikuyu Night",
    family: "Culture",
    tagline: "Mugithi until the last train.",
    description:
      "A live mugithi band, nyama choma carved at the table and mukimo made the way your grandmother did. The loudest sing-along of the season.",
    programme: [
      { time: "19:30", title: "Welcome" },
      { time: "20:30", title: "Nyama choma & mukimo" },
      { time: "22:00", title: "Live mugithi" },
    ],
    dressCode: {
      summary: "Smart casual with a cultural touch.",
      items: ["Smart shirt or blazer", "Cultural accessory", "Masquerade mask"],
      products: ["onyx-half-mask"],
    },
    video: "theme-kikuyu",
    accent: "gold",
  },
  {
    slug: "country-classics",
    name: "Old-School Country Night",
    family: "Music",
    tagline: "Kenny, Dolly, and a whiskey in your hand.",
    description:
      "The country songs every Kenyan uncle knows by heart, played live. Pool tables, darts, and a chef's barbecue that runs all night.",
    programme: [
      { time: "19:30", title: "Bourbon welcome" },
      { time: "20:30", title: "Barbecue opens" },
      { time: "21:30", title: "Live country band" },
      { time: "23:00", title: "Pool, darts & cards" },
    ],
    dressCode: {
      summary: "Western casual.",
      items: ["Denim or chinos", "Check shirt", "Boots", "Masquerade mask"],
      products: ["stetson-hat", "leather-cowboy-boots"],
    },
    video: "theme-country",
    accent: "ruby",
  },
  {
    slug: "indian-night",
    name: "Indian Night",
    family: "Culture",
    tagline: "Sherwanis, spice and Bollywood.",
    description:
      "A tandoor in the garden, biryani served in copper pots, live tabla and a Bollywood dance performance. Every gentleman arrives in Indian attire, mask fully on.",
    programme: [
      { time: "19:30", title: "Lassi & cocktails" },
      { time: "20:30", title: "The tandoor feast" },
      { time: "22:00", title: "Tabla & Bollywood dancers" },
    ],
    dressCode: {
      summary: "Sherwani or kurta with your mask.",
      items: ["Sherwani or kurta", "Masquerade mask"],
      products: ["gilded-venetian-mask"],
    },
    video: "theme-indian",
    accent: "gold",
  },
  {
    slug: "world-cuisines",
    name: "World Cuisines Night",
    family: "Taste",
    tagline: "Eight stations. Eight countries. One night.",
    description:
      "Our male and female chefs cook live at eight stations, from Japanese robata to Moroccan tagine to Ethiopian injera. Walk the room, taste everything, and meet the men at every station.",
    programme: [
      { time: "19:30", title: "Welcome cocktail" },
      { time: "20:00", title: "Chef stations open", note: "Cooked live in front of you" },
      { time: "22:00", title: "Dessert theatre" },
      { time: "23:00", title: "Lounge & live sax" },
    ],
    dressCode: {
      summary: "Smart evening wear.",
      items: ["Suit or blazer", "Masquerade mask"],
      products: ["onyx-half-mask"],
    },
    video: "theme-cuisines",
    accent: "gold",
  },
  {
    slug: "halloween-masquerade",
    name: "Halloween Masquerade",
    family: "Signature",
    tagline: "The one night the mask gets darker.",
    description:
      "Once a year, on the last weekend of October, the house goes dark. Candle-only lighting, a gothic menu, performers in the cages and costumes that go beyond black tie.",
    programme: [
      { time: "19:30", title: "Doors open by candlelight" },
      { time: "21:00", title: "Gothic dinner" },
      { time: "22:30", title: "Cage performances" },
      { time: "00:00", title: "Midnight reveal", note: "Best costume crowned" },
    ],
    dressCode: {
      summary: "Dark costume and a full mask.",
      items: ["Costume or dark formal wear", "Full mask (darker is better)"],
      products: ["crimson-feather-mask", "midnight-tuxedo"],
    },
    video: "theme-halloween",
    accent: "ruby",
  },
];

export function getTheme(slug: string) {
  return themes.find((t) => t.slug === slug);
}
