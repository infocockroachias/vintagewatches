"use client";

// Under the hammer — live auction lots in a snap-scrolling rail.
// Live lots first, ended lots after. Polling of statuses happens upstream
// (page.tsx re-fetches /api/watches every 15s).

import { useMemo } from "react";
import { Gavel } from "lucide-react";
import { formatINR } from "@/lib/watches-data";
import { Button } from "@/components/ui/button";
import Countdown from "./countdown";
import SectionHeading from "./section-heading";
import type { WatchWithAuction } from "./types";

function AuctionCard({
  watch,
  onSelect,
}: {
  watch: WatchWithAuction;
  onSelect: (id: string) => void;
}) {
  const auction = watch.auction;
  const ended = auction?.status === "ended";
  const live = auction?.status === "live";
  const hasBids = !!auction && auction.bidCount > 0 && auction.currentHigh != null;
  const endsAt = auction?.endsAt;

  return (
    <article className="group flex w-[280px] shrink-0 snap-start flex-col border border-[#2E2B26] bg-[#1A1917] transition-colors hover:border-[#C9A227]/60 sm:w-[320px]">
      <div className="relative overflow-hidden bg-[#EDE6D6]">
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.name}, ${watch.year}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-[#C9A227]/40 bg-[#111110]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C9A227] backdrop-blur-sm">
          Lot {watch.ref.replace("ZM-", "")} · {watch.ref}
        </span>
        {ended && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111110]/70 backdrop-blur-[2px]">
            <span className="border border-[#C9A227]/50 bg-[#111110]/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
              Sold / Ended
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="min-h-11">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#A69F8D]">
            {watch.brand} · {watch.era}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg leading-snug text-[#EDE6D6]">
            {watch.name}
          </h3>
        </div>

        {endsAt && <Countdown endsAt={endsAt} className={live ? "" : "text-[#A69F8D]"} />}

        <div className="border-t border-[#2E2B26] pt-3">
          {hasBids ? (
            <p className="text-[#EDE6D6]">
              <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Current bid</span>
              <span className="font-[family-name:var(--font-display)] text-xl text-[#C9A227]">
                {formatINR(auction!.currentHigh as number)}
              </span>
            </p>
          ) : (
            <p className="text-[#EDE6D6]">
              <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Opening bid</span>
              <span className="font-[family-name:var(--font-display)] text-xl text-[#C9A227]">{watch.price}</span>
            </p>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#A69F8D]">
            {hasBids && (
              <span>
                {auction!.bidCount} {auction!.bidCount === 1 ? "bid" : "bids"}
              </span>
            )}
            {live && (
              <span className="rounded-full border border-[#C9A227]/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#C9A227]">
                {hasBids ? "Reserve met & sealed" : "Reserve sealed"}
              </span>
            )}
            {ended && !hasBids && <span>Reserve not met — lot withdrawn</span>}
          </div>
        </div>

        <Button
          onClick={() => onSelect(watch.id)}
          disabled={ended}
          aria-label={ended ? `Bidding closed for ${watch.name}` : `Place a bid on ${watch.name}`}
          className="mt-auto min-h-11 w-full bg-gradient-to-b from-[#E0B93E] to-[#C9A227] font-semibold uppercase tracking-[0.16em] text-[#111110] transition-all hover:from-[#C9A227] hover:to-[#B08F1F] disabled:cursor-not-allowed disabled:border disabled:border-[#2E2B26] disabled:from-transparent disabled:to-transparent disabled:text-[#A69F8D]"
        >
          <Gavel className="size-4" aria-hidden />
          {ended ? "Bidding Closed" : "Place a Bid"}
        </Button>
      </div>
    </article>
  );
}

export default function AuctionSection({
  watches,
  onSelect,
}: {
  watches: WatchWithAuction[];
  onSelect: (id: string) => void;
}) {
  const auctions = useMemo(() => {
    const list = watches.filter((w) => w.stockType === "auction");
    const rank = (w: WatchWithAuction) =>
      w.auction?.status === "live" ? 0 : 1;
    return list
      .slice()
      .sort((a, b) => {
        const r = rank(a) - rank(b);
        if (r !== 0) return r;
        const ea = a.auction?.endsAt ? Date.parse(a.auction.endsAt) : Infinity;
        const eb = b.auction?.endsAt ? Date.parse(b.auction.endsAt) : Infinity;
        return ea - eb;
      });
  }, [watches]);

  const liveCount = auctions.filter((w) => w.auction?.status === "live").length;

  return (
    <section id="auctions" aria-label="Live auctions" className="scroll-mt-20 border-y border-[#2E2B26] bg-[#0D0C0B]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="Under the Hammer" title="Live bidding room">
          <p className="mt-4 max-w-2xl text-base font-light text-[#A69F8D]">
            Place your bid — reserve prices stay sealed until the first strike.
            {liveCount > 0 ? (
              <>
                {" "}
                <span className="text-[#C9A227]">{liveCount} lot{liveCount === 1 ? "" : "s"} on the block right now</span>, decided in Indian Standard Time.
              </>
            ) : (
              " The gavel rests for the moment — new lots go up regularly."
            )}
          </p>
        </SectionHeading>

        {auctions.length === 0 ? (
          <p className="mt-12 font-[family-name:var(--font-display)] text-lg italic text-[#A69F8D]">
            No lots on the block right now — the next auction room opens soon.
          </p>
        ) : (
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {auctions.map((w) => (
              <AuctionCard key={w.id} watch={w} onSelect={onSelect} />
            ))}
          </div>
        )}

        <p className="mt-4 text-xs font-light text-[#A69F8D]">
          Bid increments of ₹250 · Lots close on IST clock · Highest bid wins once the reserve is met
        </p>
      </div>
    </section>
  );
}
