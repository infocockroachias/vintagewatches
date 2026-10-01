import { NextResponse } from "next/server";
import {
  getStore,
  highBid,
  placeBid,
  auctionStatus,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const watchId = url.searchParams.get("watchId");
  const store = getStore();
  if (!watchId) {
    // overview of all auctions (for the live strip)
    const overview = Object.keys(store.auctions).map((id) => {
      const bids = store.bids[id] || [];
      const high = highBid(store, id);
      return {
        watchId: id,
        endsAt: store.auctions[id].endsAt,
        status: auctionStatus(store, id),
        bidCount: bids.length,
        currentHigh: high ? high.amount : null,
      };
    });
    return NextResponse.json({ auctions: overview });
  }
  const bids = (store.bids[watchId] || [])
    .slice()
    .sort((a, b) => b.amount - a.amount);
  return NextResponse.json({
    bids: bids.slice(0, 12),
    endsAt: store.auctions[watchId]?.endsAt ?? null,
    status: auctionStatus(store, watchId),
    bidCount: bids.length,
    currentHigh: bids.length ? bids[0].amount : null,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const watchId = String(body?.watchId || "");
    const bidder = String(body?.bidder || "").trim();
    const amount = Number(body?.amount);

    if (!watchId) {
      return NextResponse.json(
        { ok: false, error: "Missing watch." },
        { status: 400 }
      );
    }
    if (!bidder || bidder.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please add your name (min 2 characters)." },
        { status: 400 }
      );
    }

    const result = placeBid(watchId, bidder, amount);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 }
      );
    }

    const store = getStore();
    const bids = (store.bids[watchId] || [])
      .slice()
      .sort((a, b) => b.amount - a.amount);
    return NextResponse.json({
      ok: true,
      bid: result.bid,
      bids: bids.slice(0, 12),
      bidCount: bids.length,
      currentHigh: bids.length ? bids[0].amount : null,
      status: auctionStatus(store, watchId),
      endsAt: store.auctions[watchId]?.endsAt ?? null,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not place bid. Try again." },
      { status: 500 }
    );
  }
}
