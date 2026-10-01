# ZAMANA — Vintage Timepieces · Bengaluru

> **Time keeps the best stories.**
> A boutique marketplace for authenticated vintage watches — browse fifty curated pieces, bid in live auctions, and consign your own — built as a single, fast, fully self-contained web app.

![ZAMANA](public/brand/logo.png)

## The brand

**ZAMANA** (ज़माना / زمانہ — *"the times, the era"*) is a Bengaluru-based vintage watch boutique concept, designed with inspiration from the dark-luxury editorial style of [jaipur.watch](https://jaipur.watch/): near-black charcoal, brass-gold accents, serif display type (Playfair Display) paired with Jost, and a heritage-storytelling layout.

The name was chosen after researching the space: it is short, deeply Indian, literally means *"an era"* (exactly what "vintage" is), and — unlike "Patina" or "Bangalore Watch Company" — is unclaimed by existing Indian watch brands.

## Features

| Area | What it does |
|---|---|
| **Collection** | 50 curated vintage watches (Seiko, Grand Seiko, HMT, Rolex, Omega, Citizen, Bulova, Longines, Tissot, Rado, Timex, Glycine, Zodiac, Orient, Casio and more), each with era, movement, case specs, condition, service notes and a written story |
| **Live bidding** | 14 lots under the hammer with real-time countdowns, sealed reserve prices, ₹250 minimum increments, bid history with "Highest" highlighting, and live polling |
| **Masked pricing** | Every price renders as **₹ xxx** until the owner confirms real pricing — except bids, which are real amounts |
| **Sell / Consign** | Intake form (brand, model, year, condition, notes) with validation and confirmation toasts |
| **Search & filters** | Search by name/brand/reference, brand chips, era chips, stock-type toggle (All / Buy Now / Auction) |
| **Story & Visit** | Bengaluru heritage narrative, timeline (1919 → today), Indiranagar store section, sticky footer |

## Running without a database (by design)

The brief requires the site to function **without any external database, API service or LLM** — including on Vercel's serverless platform. That's why:

- All state lives in a **process-memory store** (`src/lib/store.ts`) attached to `globalThis`.
- Watch **catalog data is static code** (`src/lib/watches-data.ts`) — it survives cold starts by definition.
- **Bids, auction timers and consignments** are held in memory: they work across every user of a running server instance, and re-seed cleanly on a fresh cold start (new auction end-times, cleared bids). This is ideal for a boutique demo and requires **zero configuration**.
- Auction end-times are assigned relative to server boot (6h–94h spread), so the bidding room is always alive.

> Swapping to a durable store later is a one-file change: replace the helpers in `src/lib/store.ts` with any DB/KV backend — every API route already talks only to those helpers.

## API

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/watches` | GET | Full catalog + per-lot auction state (endsAt, status, bidCount, currentHigh) |
| `/api/watches/[id]` | GET | One watch + its bid history |
| `/api/bids` | GET | Bid list per `?watchId=`, or all-lot overview |
| `/api/bids` | POST | Place a bid `{ watchId, bidder, amount }` — validates reserve + ₹250 increment |
| `/api/consign` | POST | Submit a watch for evaluation |

Reserve prices are **never** sent to the client — the API strips them (`toPublic`).

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + shadcn/ui (New York) + Lucide icons
- **Framer Motion** — scroll-in reveals, countdown pulse
- **Sonner** toasts
- In-memory state via `globalThis` (no DB, no env vars)

## Run locally

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint       # ESLint
```

## Deploy to Vercel

1. Push this repository to GitHub (already done).
2. In [Vercel](https://vercel.com/new), import the repo — **no environment variables needed**.
3. Deploy. The app is 100% self-contained: static catalog + in-memory API routes.

> On Vercel, each serverless instance keeps its own memory store. Bidding works fully within an instance; a cold start reseeds timers and clears bids. For persistent auctions, wire a database/KV into `src/lib/store.ts`.

## Project structure

```
src/
  app/
    page.tsx               # the single-page experience (client composition)
    layout.tsx             # fonts, theme, metadata
    api/
      watches/             # catalog + [id] detail
      bids/                # GET overview / POST place bid
      consign/             # sell-your-watch intake
  components/zamana/       # 14 section & widget components
  lib/
    watches-data.ts        # 50-piece catalog (static)
    store.ts               # globalThis memory store + bid rules
public/
  watches/w01..w50.jpg     # 50 vintage watch photos (Wikimedia Commons, freely licensed)
  brand/                   # ZAMANA logo, hero, favicon
```

## Image credits

All 50 watch photographs were collected from **Wikimedia Commons** (freely licensed media) via its public API, then curated for subject and quality. Brand assets (logo, hero) are AI-generated for this project.

## Pricing note

All buy-now prices and auction opening values intentionally display as **₹ xxx** pending final pricing from the owner. Placed bids are real numbers and display with `Intl` Indian formatting (e.g. ₹34,500).

---

© 2026 ZAMANA Vintage Timepieces · Bengaluru. *Time keeps the best stories.*
