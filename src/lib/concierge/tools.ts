import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import { products, deliveryNote } from "../boutique";
import { datesForTheme, formatNight, nightById, upcomingNights } from "../calendar";
import { faqs, houseRules, privateOfferings } from "../content";
import { memberships, tiers } from "../packages";
import { site } from "../site";
import { getTheme, themes } from "../themes";

/** Something the chat UI can render as a button under the reply. */
export type ConciergeAction =
  | { type: "add_tickets"; night: string; tier: "masque" | "vip" | "vvip"; qty: number; label: string }
  | { type: "link"; href: string; label: string };

const nightSummary = (n: ReturnType<typeof upcomingNights>[number]) => ({
  night_id: n.id,
  date: formatNight(n, "long"),
  theme: n.theme.name,
  theme_slug: n.theme.slug,
  tagline: n.theme.tagline,
  doors_open: site.doorsOpen,
});

export const tools: Anthropic.Beta.BetaTool[] = [
  {
    name: "list_upcoming_nights",
    description:
      "List the next event nights (every Saturday) with their theme and date. Use this for 'what's on', 'this weekend', or when a guest names a month. Returns today's date too.",
    input_schema: {
      type: "object",
      properties: { count: { type: "integer", minimum: 1, maximum: 26, description: "How many nights to return (default 6)." } },
      additionalProperties: false,
    },
  },
  {
    name: "get_theme",
    description:
      "Full details of one theme night: description, programme, dress code and its next dates. Use the theme_slug from list_upcoming_nights or list_themes.",
    input_schema: {
      type: "object",
      properties: { theme_slug: { type: "string" } },
      required: ["theme_slug"],
      additionalProperties: false,
    },
  },
  {
    name: "list_themes",
    description: "All theme nights in the rotation with their slugs and families (Signature, Culture, Music, Taste, Revelry).",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_packages",
    description: "Ticket tiers (Masque, VIP, VVIP) with price per gentleman and what each includes, plus memberships and private-event options.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_boutique",
    description: "Masks, costumes and accessories the guest can buy or hire, with prices and sizes, and how delivery works.",
    input_schema: {
      type: "object",
      properties: { category: { type: "string", enum: ["Masks", "Black tie", "Western", "Accessories"] } },
      additionalProperties: false,
    },
  },
  {
    name: "get_policies",
    description: "House rules, discretion, who can attend, venue/address policy and frequently asked questions.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "offer_booking",
    description:
      "Put an 'Add to order' button under your reply for a specific night, tier and number of gentlemen. The guest then pays on the checkout page (M-Pesa or card). Call this once the guest has chosen a night and a tier. It does not take payment and does not confirm a booking.",
    input_schema: {
      type: "object",
      properties: {
        night_id: { type: "string", description: "yyyy-mm-dd from list_upcoming_nights" },
        tier: { type: "string", enum: ["masque", "vip", "vvip"] },
        guests: { type: "integer", minimum: 1, maximum: 20 },
      },
      required: ["night_id", "tier", "guests"],
      additionalProperties: false,
    },
  },
  {
    name: "offer_link",
    description: "Put a button under your reply that opens a page on this site.",
    input_schema: {
      type: "object",
      properties: {
        page: {
          type: "string",
          enum: ["/events", "/membership", "/private", "/boutique", "/experiences", "/the-house", "/faq", "/checkout"],
        },
        theme_slug: { type: "string", description: "Only with page '/events', to open that theme's page." },
        label: { type: "string", description: "Short button text, e.g. 'See the dress code'" },
      },
      required: ["page", "label"],
      additionalProperties: false,
    },
  },
];

type Input = Record<string, unknown>;

/** Runs one tool. Returns the JSON for the model and, optionally, a UI action. */
export function runTool(name: string, input: Input, now: number): { result: unknown; action?: ConciergeAction } {
  switch (name) {
    case "list_upcoming_nights": {
      const count = Math.min(26, Math.max(1, Number(input.count) || 6));
      return {
        result: {
          today: new Date(now + 3 * 3600_000).toISOString().slice(0, 10),
          nights: upcomingNights(now, count).map(nightSummary),
        },
      };
    }
    case "list_themes":
      return { result: themes.map((t) => ({ slug: t.slug, name: t.name, family: t.family, tagline: t.tagline })) };
    case "get_theme": {
      const t = getTheme(String(input.theme_slug));
      if (!t) return { result: { error: "Unknown theme_slug. Call list_themes." } };
      return {
        result: {
          name: t.name,
          family: t.family,
          description: t.description,
          programme: t.programme,
          dress_code: t.dressCode.summary,
          dress_items: t.dressCode.items,
          boutique_pieces: t.dressCode.products,
          next_dates: datesForTheme(t.slug, now, 60).slice(0, 4).map(nightSummary),
        },
      };
    }
    case "get_packages":
      return {
        result: {
          currency: "KES",
          prices_are_samples: site.samplePricing,
          tiers: tiers.map((t) => ({ slug: t.slug, name: t.name, price_per_gentleman: t.price, includes: t.perks, seating: t.seats })),
          memberships: memberships.map((m) => ({ name: m.name, term: m.term, price: m.price, nights: m.nights, perks: m.perks })),
          private_events: privateOfferings.map((p) => ({ name: p.title, from_price: p.from, guests: p.guests, about: p.body })),
        },
      };
    case "get_boutique": {
      const list = input.category ? products.filter((p) => p.category === input.category) : products;
      return {
        result: {
          delivery: deliveryNote,
          items: list.map((p) => ({ slug: p.slug, name: p.name, category: p.category, price: p.price, hire_only: !!p.hire, sizes: p.sizes })),
        },
      };
    }
    case "get_policies":
      return {
        result: {
          location: `${site.location}. ${site.addressNote}`,
          doors_open: site.doorsOpen,
          minimum_age: site.ageLimit,
          house_rules: houseRules,
          faqs,
          payment: "M-Pesa or card on the checkout page. Tickets and a receipt in the name of Elite Masquerade Experience arrive by email and SMS after payment.",
        },
      };
    case "offer_booking": {
      const night = nightById(String(input.night_id));
      const tier = tiers.find((t) => t.slug === input.tier);
      const qty = Math.min(20, Math.max(1, Number(input.guests) || 1));
      if (!night || !tier) return { result: { error: "Unknown night_id or tier." } };
      if (night.startsAt + 7.5 * 3600_000 < now) return { result: { error: "That night has already passed." } };
      return {
        result: { ok: true, shown: `Button for ${qty} × ${tier.name}, ${night.theme.name} on ${formatNight(night, "long")}, total KES ${qty * tier.price}` },
        action: {
          type: "add_tickets",
          night: night.id,
          tier: tier.slug,
          qty,
          label: `Add ${qty} × ${tier.name} · ${formatNight(night)}`,
        },
      };
    }
    case "offer_link": {
      const page = String(input.page);
      const slug = input.theme_slug ? String(input.theme_slug) : "";
      const href = page === "/events" && getTheme(slug) ? `/events/${slug}` : page;
      return { result: { ok: true }, action: { type: "link", href, label: String(input.label).slice(0, 48) } };
    }
    default:
      return { result: { error: `Unknown tool ${name}` } };
  }
}
