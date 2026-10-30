# Elite Masquerade Experience

Website for a private, gents-only masquerade society in Lavington, Nairobi. It is a sister brand
of The Gents Playhouse and The Gents Games & Entertainment (`~/Gents Games and Ent`).

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · motion · Claude API (concierge).

## Run it

```bash
cp .env.example .env.local   # add ANTHROPIC_API_KEY for the concierge
npm install
npm run dev                  # http://localhost:3000 (or: npx next dev -p 3200)
npm run build && npm start
```

## Where things live

| What | File |
|---|---|
| Brand tokens, fonts, keyframes | `src/app/globals.css`, `src/app/layout.tsx` |
| Site name, contact, partner link, `samplePricing` flag | `src/lib/site.ts` |
| Theme nights (copy, programme, dress code) | `src/lib/themes.ts` |
| Weekly rotation + Halloween rule, countdown maths | `src/lib/calendar.ts` |
| Ticket tiers + memberships (**sample prices**) | `src/lib/packages.ts` |
| Boutique catalogue (**sample items**) | `src/lib/boutique.ts` |
| Experiences, house rules, FAQ, private events | `src/lib/content.ts` |
| Video slots (placeholders until `src` is set) | `src/lib/videos.ts` + `video-plan.md` |
| Concierge: prompt, tools, API route | `src/lib/concierge/*`, `src/app/api/concierge/route.ts` |
| Order bag (tickets, boutique, membership) | `src/components/bag/*` |

## How the calendar works

Every Saturday is an event night. Themes follow `rotation` in `calendar.ts` week by week from
7 Nov 2026 and loop forever. The last Saturday of October is always the Halloween Masquerade.
All dates and countdowns are computed in the browser (Nairobi time, doors 19:30), so static
pages never go stale.

## Concierge

`POST /api/concierge` runs Claude (`claude-opus-5-5`, low effort, server-side refusal fallback)
with read-only tools over the site data. It can put **Add to order** and page-link buttons under
its replies. It never takes payment; checkout does. Simple per-IP rate limit, 1,500 characters per
message, last 30 turns.

## Demo limitations (phase 1)

- **Payments are not connected.** Checkout runs in a clearly labelled test mode, stores the order in
  the browser and shows a test ticket. Phase 2: Supabase orders + Paystack (M-Pesa + cards) +
  webhook confirmation + signed QR tickets + admin (events, prices, stock, door check-in).
- Prices, boutique items, the domain, contact details and the games-site URL are placeholders
  (marked `TODO` in `src/lib/site.ts`).
- Videos are animated placeholders; see `video-plan.md`.
- Legal pages are drafts for the client to approve.
