// ZAMANA — shared client-side types.
// The public API strips the hidden `reserve` field, so the client works with
// Omit<WatchSpec, "reserve"> plus the live auction runtime block.

import type { WatchSpec } from "@/lib/watches-data";

export interface AuctionInfo {
  endsAt: string | null;
  status: "live" | "ended";
  bidCount: number;
  currentHigh: number | null;
  lastBidAt: string | null;
}

export type WatchWithAuction = Omit<WatchSpec, "reserve"> & {
  auction: AuctionInfo | null;
};

export interface BidItem {
  id: string;
  watchId: string;
  bidder: string;
  amount: number;
  at: string;
}

export type StockFilter = "all" | "fixed" | "auction";
