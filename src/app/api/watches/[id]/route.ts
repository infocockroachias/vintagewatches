import { NextResponse } from "next/server";
import { WATCHES } from "@/lib/watches-data";
import {
  getStore,
  highBid,
  auctionStatus,
  toPublic,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const w = WATCHES.find((x) => x.id === id);
  if (!w) {
    return NextResponse.json({ error: "Watch not found" }, { status: 404 });
  }
  const bids = (store.bids[w.id] || [])
    .slice()
    .sort((a, b) => b.amount - a.amount);
  const high = highBid(store, w.id);
  return NextResponse.json({
    watch: {
      ...toPublic(w),
      auction:
        w.stockType === "auction"
          ? {
              endsAt: store.auctions[w.id]?.endsAt ?? null,
              status: auctionStatus(store, w.id),
              bidCount: bids.length,
              currentHigh: high ? high.amount : null,
              lastBidAt: high ? high.at : null,
            }
          : null,
    },
    bids: bids.slice(0, 12),
  });
}
