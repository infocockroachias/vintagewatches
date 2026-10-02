# ZAMANA — Design System & UI Direction

> Version 2.0 — "The Light Atelier" redesign
> References analysed: **titan.co.in** (Titan Watches) and **jaipur.watch** (Jaipur Watch Company)

---

## 1. Why we redesigned

The previous ZAMANA site was a full-dark theme (`#111110` canvas with gold text).
Feedback: *"background is dark not appealing… it is looking very common."*

A production-code analysis of Titan and Jaipur Watch Company — the two benchmarks the
brand admires — shows that both premium Indian watch houses sell from **light canvases**:

| Finding | Titan (titan.co.in) | Jaipur Watch Co (jaipur.watch) |
| --- | --- | --- |
| Canvas | White `#fff` / grey `#f9f9f9` | Bone-cream `#f6f2ea`, `#fbf8f1` |
| Text | Near-black `#050505` | Warm ink `#1a1714` |
| Accent | Heritage maroon `#832729` + gold `#dda243` | Gold ramp `#a8842c → #c9a24b → #e4c97a` |
| Dark usage | Only promo strip `#222` + footer `#010101` | Only storytelling bands `#0b0908–#161311` |
| Product imagery | Borderless white tiles | Watch floats on cream, never cropped |
| Typography | Poppins, uppercase micro-labels | Playfair Display (emotion) + Inter/Jost (chrome) |
| Motifs | Chips, ribbons, marquees, mega-menus | Hairlines, `.18em` tracked eyebrows, museum rhythm |

**Conclusion:** light luxury — cream + ink + antique gold, with charcoal reserved for
storytelling rhythm — is the direction. Dark is a *seasoning*, never the *plate*.

---

## 2. Brand tokens

### 2.1 Color system ("Light Atelier" palette)

```css
/* Canvas */
--cream-50:  #FBF8F1;  /* page background, cards                */
--cream-100: #F6F1E7;  /* alternate band background             */
--cream-200: #ECE6D9;  /* image mats, hover fills               */

/* Ink */
--ink-900:   #1A1714;  /* headings & body text                  */
--ink-700:   #3A332D;  /* secondary text                        */
--ink-500:   #6E635A;  /* muted text, captions                  */

/* Gold ramp */
--gold-600:  #A8842C;  /* deep gold — hover, pressed            */
--gold-500:  #C9A227;  /* primary brand gold — CTAs, eyebrows   */
--gold-300:  #E4C97A;  /* light gold — borders, highlights      */

/* Charcoal (storytelling bands only) */
--charcoal:  #161311;  /* story / auction-theatre sections      */

/* Hairlines */
--hairline:  rgba(26, 23, 20, 0.12);
```

**Rule of 70-20-10:** ~70% cream canvas, ~20% ink text/hairlines, ~10% gold accents.
Charcoal appears in **at most 2 sections** per page (hero overlay + auction room / story)
to create rhythm, mirroring JWC's cream↔charcoal alternation.

### 2.2 Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display / headlines | **Playfair Display** (serif) | editorial, italic gold emphasis words |
| UI / body / labels | **Jost** (geometric sans) | 300–600 |
| Eyebrows | Jost 500 · 11–12px · UPPERCASE · `tracking 0.28em` | gold |
| Body | Jost 300/400 · 15–16px · `leading-relaxed` | ink-700 |
| Buttons | Jost 500/600 · 12–13px · UPPERCASE · `tracking 0.16em` | |

Pattern (from JWC): **serif for emotion, spaced-uppercase sans for chrome.**

### 2.3 Surfaces & lines

- Cards: `bg-cream-50`, `1px` hairline border `rgba(26,23,20,0.12)`, **no heavy shadows**
  — hover lifts with `shadow-[0_18px_40px_-20px_rgba(26,23,20,0.25)]` + gold border.
- Product images sit on a **mat** (`#F1EADC`/white) so watches "float" (JWC pattern).
- Section padding: generous — `py-20 md:py-28` (JWC uses 96–128px).
- Max container: `max-w-7xl` (1280px) consistent across sections.

### 2.4 Motion

- Scroll-reveal: `translateY(24px→0) + opacity`, 0.5–0.7s, `ease-out`, staggered (Framer Motion).
- Easing signature: `cubic-bezier(.16,1,.3,1)` for carousels/dialogs.
- Hover on card imagery: `scale(1.04)` over 0.7s.
- `prefers-reduced-motion` respected (Framer handles automatically for `whileInView`).

---

## 3. Component specifications

### 3.1 Header
- Sticky, `cream-50/85` blur, bottom hairline.
- Left: **logo mark + "ZAMANA" wordmark only** (no city tagline in the header).
- Center-right: uppercase nav (Collection · Live Auctions · Sell Yours · Our Story · Contact).
- Gold outline "Bid Now" pill → solid gold on hover.
- Mobile: hamburger → full-width dropdown panel.

### 3.2 Hero (light editorial)
- Cream canvas; left = eyebrow + Playfair headline with italic gold word + copy + CTAs.
- Right: hero photograph inside a **double-frame** (gold hairline offset frame, JWC collage style).
- Stats strip along the bottom with hairline dividers (50 pieces · 15+ brands · 1919–2008 · 6-mo warranty).

### 3.3 Collection & search (upgraded)
The user asked for a visibly upgraded search + buy-now/auction UI:

- **Toolbar card** (`bg-cream-50`, hairline border, sticky feel):
  - Big search field (name / brand / reference / **year**).
  - **Decade select** dropdown (All decades · 1940s…2000s) — searching by year.
  - **Segmented toggle** for stock type: `All · Buy Now · Live Auction`
    (pill slider, gold active state) — replaces flat chips row.
  - Brand chips row (scrollable, gold active).
  - Result count + "Reset" link.
- Empty state: icon + serif italic line + reset button.
- Grid: 2 / 3 / 4 columns.

### 3.4 Watch card (light)
- Hairline card, image on white/cream mat, ref chip top-left, stock badge top-right
  (gold "Live Auction" with gavel / ink outline "Buy Now" with tag).
- Serif name, muted meta, price in gold serif.
- Hover: border→gold, subtle lift, image scale.

### 3.5 Auction room (the one dark band)
- Charcoal `#161311` band — the "bidding theatre".
- Lot cards: dark card, cream image mat, countdown (tabular, turns ember < 1h).
- Current bid in gold serif; opening bid masked `₹ xxx`.
- CTA: solid gold "Place a Bid" → opens detail dialog.

### 3.6 Watch dialog
- Light `cream-50` panel, image left on mat, details right.
- Spec table with hairlines. Fixed price → enquiry form; auction → bid form + history
  (highest row highlighted in gold tint).

### 3.7 Story band (dark, JWC founder-section style)
- Charcoal with grain, serif editorial copy, heritage timeline (1919→Today).
- **No physical address anywhere** — the brand is presented as an online boutique;
  copy references India/heritage, never a street address.

### 3.8 Contact (replaces "Visit Us")
Since ZAMANA is an **online marketplace**, the old address/map section is replaced by a
concierge section: insured insured shipping, video-call viewings, WhatsApp, email —
four hairline cards + a note. No MapPin, no hours, no street.

### 3.9 Footer
- Deep ink `#12100E` (Titan-style dark footer) with cream text.
- Brand blurb + tagline, quick links, **contact = email + socials only** (no address, no hours).
- Legal line: `© {year} ZAMANA · Prices shown as ₹ xxx until confirmed · Bids are live amounts`.

### 3.10 Favicon & brand
- `/brand/favicon.jpg` (gold Z monogram) wired in `layout.tsx` icons + `apple-icon`.
- Logo used in header/footer.

---

## 4. Copy rules

1. **No physical address, no store hours, no map references** — online market only.
2. Prices remain `₹ xxx` until the owner confirms real numbers.
3. Auctions: reserve stays sealed; increments ₹250; highest bid wins when reserve met.
4. Tone: warm, editorial, slightly playful ("Time keeps the best stories.").

---

## 5. Accessibility & responsiveness

- Semantic landmarks (`header/main/footer/nav/section`), `aria-*` on all icon buttons,
  `aria-pressed` on chips, `role="timer"` on countdowns, `sr-only` where needed.
- Touch targets ≥ 44px (`min-h-11`), focus-visible gold outline, safe-area footer padding.
- Mobile-first: single column → 2 → 3 → 4 grid; segmented controls scroll horizontally;
  dialogs become full-height sheets on small screens.
