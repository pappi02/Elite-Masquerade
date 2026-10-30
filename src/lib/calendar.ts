import { getTheme, type Theme } from "./themes";

/**
 * Every Saturday is an event night. Themes follow this rotation week by week,
 * starting from ROTATION_START, and loop forever. Fixed-date nights (Halloween)
 * replace whatever the rotation would have put on that weekend.
 * Admin overrides will come from the database later; this file is the rule.
 */
export const rotation = [
  "grand-masquerade",
  "cowboy-masquerade",
  "rhumba-night",
  "vintage-tasting",
  "karaoke-royale",
  "luo-night",
  "strings-and-sax",
  "nigerian-night",
  "comedy-and-skits",
  "kikuyu-night",
  "world-cuisines",
  "country-classics",
  "indian-night",
];

/** First Saturday of the rotation (local Nairobi date). */
const ROTATION_START = Date.UTC(2026, 10, 7); // Sat 7 Nov 2026
const DAY = 86_400_000;
const WEEK = 7 * DAY;
/** Nairobi is UTC+3 all year (no daylight saving). */
const NAIROBI_OFFSET = 3 * 60 * 60 * 1000;
/** Doors open at 19:30 Nairobi time. */
const DOORS_MINUTES = 19 * 60 + 30;
/** An event stays "current" until 03:00 the next morning. */
const EVENT_LENGTH = 7.5 * 60 * 60 * 1000;

export type EventNight = {
  id: string; // e.g. 2026-11-07
  theme: Theme;
  /** Doors-open instant in ms since epoch. */
  startsAt: number;
  /** yyyy-mm-dd in Nairobi. */
  date: string;
};

function isoDate(utcMidnight: number) {
  return new Date(utcMidnight).toISOString().slice(0, 10);
}

/** Last Saturday of October in a given year, as a UTC-midnight timestamp. */
function halloweenSaturday(year: number) {
  const oct31 = Date.UTC(year, 9, 31);
  const dow = new Date(oct31).getUTCDay(); // 0 Sun … 6 Sat
  return oct31 - ((dow + 1) % 7) * DAY;
}

function themeForSaturday(utcMidnight: number): Theme {
  const year = new Date(utcMidnight).getUTCFullYear();
  if (utcMidnight === halloweenSaturday(year)) return getTheme("halloween-masquerade")!;
  const weeks = Math.round((utcMidnight - ROTATION_START) / WEEK);
  const i = ((weeks % rotation.length) + rotation.length) % rotation.length;
  return getTheme(rotation[i])!;
}

function nightFor(utcMidnight: number): EventNight {
  return {
    id: isoDate(utcMidnight),
    theme: themeForSaturday(utcMidnight),
    date: isoDate(utcMidnight),
    startsAt: utcMidnight + DOORS_MINUTES * 60_000 - NAIROBI_OFFSET,
  };
}

/**
 * Event nights from `now` onwards. The current night is included until it ends
 * (03:00 the morning after), so the countdown flips to "Tonight" during the party.
 */
export function upcomingNights(now: number, count: number): EventNight[] {
  const nairobiNow = now + NAIROBI_OFFSET;
  const todayMidnight = Math.floor(nairobiNow / DAY) * DAY;
  const dow = new Date(todayMidnight).getUTCDay();
  let saturday = todayMidnight + ((6 - dow + 7) % 7) * DAY;
  // If the night before (last Saturday) is still running, start there.
  const last = nightFor(saturday - WEEK);
  if (now < last.startsAt + EVENT_LENGTH) saturday -= WEEK;
  const out: EventNight[] = [];
  for (let i = 0; out.length < count; i++) {
    const night = nightFor(saturday + i * WEEK);
    if (now < night.startsAt + EVENT_LENGTH) out.push(night);
  }
  return out;
}

export function nextNight(now: number) {
  return upcomingNights(now, 1)[0];
}

/** Upcoming dates for one theme, looking ahead `weeks` weekends. */
export function datesForTheme(slug: string, now: number, weeks = 60) {
  return upcomingNights(now, weeks).filter((n) => n.theme.slug === slug);
}

export function nightById(id: string) {
  const t = Date.parse(`${id}T00:00:00Z`);
  if (Number.isNaN(t) || new Date(t).getUTCDay() !== 6) return undefined;
  return nightFor(t);
}

export function isLive(night: EventNight, now: number) {
  return now >= night.startsAt && now < night.startsAt + EVENT_LENGTH;
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const longFmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export function formatNight(night: EventNight, style: "short" | "long" = "short") {
  const d = Date.parse(`${night.date}T00:00:00Z`);
  return (style === "long" ? longFmt : dateFmt).format(d);
}

export function monthLabel(night: EventNight) {
  return monthFmt.format(Date.parse(`${night.date}T00:00:00Z`));
}

export function dayNumber(night: EventNight) {
  return night.date.slice(8, 10);
}
