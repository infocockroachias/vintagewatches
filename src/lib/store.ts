// ZAMANA — in-memory data store.
// Works with zero external database: state lives on the server instance via
// globalThis (survives hot reloads in dev, resets on cold start in prod —
// acceptable for a boutique demo and 100% Vercel-compatible).

import { WATCHES, MIN_BID_INCREMENT, type WatchSpec } from "./watches-data";

export interface Bid {
  id: string;
  watchId: string;
  bidder: string;
  amount: number;
  at: string; // ISO
}

export interface Consignment {
  id: string;
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  condition: string;
  notes: string;
  at: string;
}

interface AuctionRuntime {
  endsAt: string; // ISO
}

interface StoreShape {
  auctions: Record<string, AuctionRuntime>;
  bids: Record<string, Bid[]>;
  consignments: Consignment[];
}

 
const g = globalThis as any;

const AUCTION_HOURS = [
  6, 10, 14, 20, 26, 32, 38, 46, 54, 62, 70, 78, 86, 94,
];

function initStore(): StoreShape {
  const store: StoreShape = { auctions: {}, bids: {}, consignments: [] };
  let i = 0;
  for (const w of WATCHES) {
    if (w.stockType === "auction") {
      const hours = AUCTION_HOURS[i % AUCTION_HOURS.length];
      store.auctions[w.id] = {
        endsAt: new Date(Date.now() + hours * 3600_000).toISOString(),
      };
      i++;
    }
  }
  return store;
}

export function getStore(): StoreShape {
  if (!g.__zamanaStore) g.__zamanaStore = initStore();
  return g.__zamanaStore as StoreShape;
}

export function watchById(id: string): WatchSpec | undefined {
  return WATCHES.find((w) => w.id === id);
}

export function highBid(store: StoreShape, watchId: string): Bid | null {
  const list = store.bids[watchId] || [];
  if (!list.length) return null;
  return list.reduce((a, b) => (b.amount > a.amount ? b : a));
}

export function auctionStatus(
  store: StoreShape,
  watchId: string
): "live" | "ended" {
  const a = store.auctions[watchId];
  if (!a) return "ended";
  return new Date(a.endsAt).getTime() > Date.now() ? "live" : "ended";
}

export interface PlaceBidResult {
  ok: boolean;
  error?: string;
  bid?: Bid;
}

export function placeBid(
  watchId: string,
  bidder: string,
  amount: number
): PlaceBidResult {
  const store = getStore();
  const w = watchById(watchId);
  if (!w || w.stockType !== "auction")
    return { ok: false, error: "This piece is not part of the auction." };
  if (auctionStatus(store, watchId) === "ended")
    return { ok: false, error: "This auction has ended." };
  if (!Number.isFinite(amount) || amount <= 0)
    return { ok: false, error: "Enter a valid bid amount." };

  const high = highBid(store, watchId);
  const floor = high
    ? high.amount + MIN_BID_INCREMENT
    : w.reserve; // first bid must meet hidden reserve
  if (amount < floor) {
    return {
      ok: false,
      error: high
        ? `Bid at least ₹${MIN_BID_INCREMENT} above the current highest bid.`
        : "Bid did not meet the minimum opening amount. Try a higher value.",
    };
  }

  const bid: Bid = {
    id: Math.random().toString(36).slice(2, 10),
    watchId,
    bidder: bidder.slice(0, 40),
    amount: Math.round(amount),
    at: new Date().toISOString(),
  };
  store.bids[watchId] = [...(store.bids[watchId] || []), bid];
  return { ok: true, bid };
}

export function addConsignment(c: Omit<Consignment, "id" | "at">): Consignment {
  const store = getStore();
  const entry: Consignment = {
    ...c,
    id: Math.random().toString(36).slice(2, 10),
    at: new Date().toISOString(),
  };
  store.consignments.push(entry);
  return entry;
}

/** Public shape of a watch sent to the client — reserve is stripped. */
export type PublicWatch = Omit<WatchSpec, "reserve">;

export function toPublic(w: WatchSpec): PublicWatch {
  const { reserve, ...rest } = w;
  void reserve;
  return rest;
}
