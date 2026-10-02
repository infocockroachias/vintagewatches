# ZAMANA — Vintage Timepieces

> **Time keeps the best stories.**
> An online boutique for authenticated vintage watches — browse fifty curated pieces, bid in live auctions, and consign your own — built as a single, fast, fully self-contained web app.

![ZAMANA](public/brand/logo.png)

## The brand

**ZAMANA** (ज़माना / زمانہ — *"the times, the era"*) is an **online-only** vintage watch marketplace. No showroom, no street address — just a concierge, insured shipping and video viewings.

The name is short, deeply Indian and literally means *"an era"* — exactly what "vintage" is.

## Design — "The Light Atelier" (v2)

The visual direction was rebuilt after a production-code analysis of **titan.co.in** and **jaipur.watch** (see [`design.md`](./design.md) for the full breakdown):

- **Light cream canvas** (`#FBF8F1` / `#F6F1E7`) with warm ink text — following Jaipur Watch Co.'s bone-cream luxury palette and Titan's white conversion canvas. Dark is used only as *rhythm*: the charcoal "bidding room" and "story" bands.
- **Gold ramp** (`#A8842C → #C9A227 → #E4C97A`) on hairline borders, eyebrows and CTAs.
- **Playfair Display** (editorial serif) for emotion + **Jost** (spaced uppercase sans) for chrome.
- Product imagery floats on cream mats inside hairline cards with soft gold hover lifts.

### Upgraded discovery UI

- Big search field matching **name / brand / reference / year**
- **Decade picker** dropdown (All decades · 1910s → 2010s)
- Segmented **All · Buy Now · Live Auction** toggle with a sliding pill and live counts
- Scrollable brand chips, result count and reset
- Gold-shimmer CTA buttons, animated nav underlines, light product dialog

## Features

| Area | What it does |
|---|---|
| **Collection** | 50 curated vintage watches (Seiko, Grand Seiko, HMT, Rolex, Omega, Citizen, Bulova, Longines, Tissot, Rado, Timex, Glycine, Zodiac, Orient, Casio and more), each with era, movement, case specs, condition, service notes and a written story |
| **Live bidding** | 14 lots under the hammer with real-time countdowns, sealed reserves, ₹250 minimum increments, bid history with "Highest" highlighting, and live polling |
| **Buy now** | Fixed-price pieces with an inline enquiry / call-back form |
| **Masked pricing** | Every price renders as **₹ xxx** until the owner confirms real pricing — except bids, which are real amounts |
| **Sell / Consign** | Intake form (brand, model, year, condition, notes) with validation and confirmation toasts |
| **Concierge** | Online-only contact: WhatsApp, video viewings, insured worldwide shipping, email — no physical address anywhere |
| **Favicon & brand** | Gold Z monogram as favicon + header/footer wordmark |

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
| `/api/consign` | POST | Submit a watch for evaluation / purchase enquiry |

Reserve prices are **never** sent to the client — the API strips them (`toPublic`).

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + shadcn/ui (New York) + Lucide icons
- **Framer Motion** — scroll-in reveals, sliding pill toggle, countdown pulse
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
2. In [Vercel](https://vercel.com/new), import the repo — **no environment variables needed**, framework preset *Next.js*, build command `next build` (default).
3. Deploy. The app is 100% self-contained: static catalog + in-memory API routes.

> **Note:** do **not** set `output: "standalone"` in `next.config.ts` — it breaks Vercel's build-output routing (manifests as `404 NOT_FOUND` on the deployment URL). The config intentionally omits it.

> On Vercel, each serverless instance keeps its own memory store. Bidding works fully within an instance; a cold start reseeds timers and clears bids. For persistent auctions, wire a database/KV into `src/lib/store.ts`.

## Project structure

```
design.md                   # design system + Titan/JWC research findings
src/
  app/
    page.tsx                # the single-page experience (client composition)
    layout.tsx              # fonts, light theme, metadata, favicon
    api/
      watches/              # catalog + [id] detail
      bids/                 # GET overview / POST place bid
      consign/              # sell-your-watch intake
  components/zamana/        # header, hero, collection, auction room, dialog,
                            # story, consign, concierge, footer, widgets
  lib/
    watches-data.ts         # 50-piece catalog (static)
    store.ts                # globalThis memory store + bid rules
public/
  watches/w01..w50.jpg      # 50 vintage watch photos (Wikimedia Commons, freely licensed)
  brand/                    # ZAMANA logo, hero, favicon
```

## Image credits

All 50 watch photographs were collected from **Wikimedia Commons** (freely licensed media) via its public API, then curated for subject and quality. Brand assets (logo, hero) are AI-generated for this project.

## Pricing note

All buy-now prices and auction opening values intentionally display as **₹ xxx** pending final pricing from the owner. Placed bids are real numbers and display with `Intl` Indian formatting (e.g. ₹26,000).

---

© 2026 ZAMANA Vintage Timepieces. *Time keeps the best stories.*
