/**
 * Every video slot on the site. While `src` is empty the slot shows an
 * animated placeholder; drop the generated file into public/videos and set
 * `src` to switch it on. Shot descriptions, prompts and lengths for each slot
 * live in video-plan.md, keyed by the same names.
 */
export type VideoKey =
  | "hero"
  | "brotherhood"
  | "chefs"
  | "cages"
  | "karaoke"
  | "strings"
  | "games"
  | "the-house"
  | "boutique"
  | "concierge"
  | "theme-grand"
  | "theme-cowboy"
  | "theme-karaoke"
  | "theme-rhumba"
  | "theme-tasting"
  | "theme-strings"
  | "theme-luo"
  | "theme-comedy"
  | "theme-nigerian"
  | "theme-kikuyu"
  | "theme-country"
  | "theme-indian"
  | "theme-cuisines"
  | "theme-halloween";

export type Video = {
  key: VideoKey;
  title: string;
  /** Path under /public, e.g. "/videos/hero.mp4". Empty = placeholder. */
  src: string;
  poster?: string;
};

const v = (key: VideoKey, title: string, src = ""): Video => ({ key, title, src });

export const videos: Record<VideoKey, Video> = {
  hero: v("hero", "Masks on, names off"),
  brotherhood: v("brotherhood", "Gentlemen talking business behind the mask"),
  chefs: v("chefs", "Our chefs, cooking and serving at your table"),
  cages: v("cages", "Dancers in the gilded cages"),
  karaoke: v("karaoke", "Karaoke Royale"),
  strings: v("strings", "Violin and saxophone, live"),
  games: v("games", "Cards, pool and mini-golf"),
  "the-house": v("the-house", "The house in Lavington"),
  boutique: v("boutique", "Masks and costumes from the boutique"),
  concierge: v("concierge", "Booking with the concierge"),
  "theme-grand": v("theme-grand", "The Grand Masquerade"),
  "theme-cowboy": v("theme-cowboy", "Cowboy Masquerade"),
  "theme-karaoke": v("theme-karaoke", "Karaoke Royale"),
  "theme-rhumba": v("theme-rhumba", "Rhumba Night"),
  "theme-tasting": v("theme-tasting", "The Vintage Tasting"),
  "theme-strings": v("theme-strings", "Strings & Saxophone"),
  "theme-luo": v("theme-luo", "Luo Night"),
  "theme-comedy": v("theme-comedy", "Comedy & Drama Night"),
  "theme-nigerian": v("theme-nigerian", "Nigerian Night"),
  "theme-kikuyu": v("theme-kikuyu", "Kikuyu Night"),
  "theme-country": v("theme-country", "Old-School Country Night"),
  "theme-indian": v("theme-indian", "Indian Night"),
  "theme-cuisines": v("theme-cuisines", "World Cuisines Night"),
  "theme-halloween": v("theme-halloween", "Halloween Masquerade"),
};
