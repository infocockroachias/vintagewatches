import { NextResponse } from "next/server";
import { WATCHES } from "@/lib/watches-data";
import {
  getStore,
  highBid,
  auctionStatus,
  toPublic,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = getStore();
  const watches = WATCHES.map((w) => {
    const bids = store.bids[w.id] || [];
    const high = highBid(store, w.id);
    return {
      ...toPublic(w),
      auction:
        w.stockType === "auction"
          ? {
              endsAt: store.auctions[w.id]?.endsAt ?? null,
              status: auctionStatus(store, w.id),
              bidCount: bids.length,
              // Until the first real bid arrives the price stays masked.
              currentHigh: high ? high.amount : null,
              lastBidAt: high ? high.at : null,
            }
          : null,
    };
  });
  return NextResponse.json({ watches, count: watches.length });
}
