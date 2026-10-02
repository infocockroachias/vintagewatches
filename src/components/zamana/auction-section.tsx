"use client";

// Under the hammer — the one dark band on the page: the "bidding theatre".
// Live lots first, ended lots after. Polling of statuses happens upstream
// (page.tsx re-fetches /api/watches every 15s).

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Gavel, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/watches-data";
import { Button } from "@/components/ui/button";
import Countdown from "./countdown";
import SectionHeading from "./section-heading";
import type { WatchWithAuction } from "./types";

function AuctionCard({
  watch,
  onSelect,
  index,
}: {
  watch: WatchWithAuction;
  onSelect: (id: string) => void;
  index: number;
}) {
  const auction = watch.auction;
  const ended = auction?.status === "ended";
  const live = auction?.status === "live";
  const hasBids = !!auction && auction.bidCount > 0 && auction.currentHigh != null;
  const endsAt = auction?.endsAt;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.55, ease: "easeOut" }}
      className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-[rgba(228,201,122,0.18)] bg-[#1D1915] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/60 hover:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.8)] sm:w-[320px]"
    >
      <div className="relative overflow-hidden bg-[#F1EADC]">
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.name}, ${watch.year}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-[#C9A227]/40 bg-[#161311]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#E4C97A] backdrop-blur-sm">
          Lot {watch.ref.replace("ZM-", "")} · {watch.ref}
        </span>
        {live && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#C9A227] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#161311]">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#161311] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#161311]" />
            </span>
            Live
          </span>
        )}
        {ended && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#161311]/70 backdrop-blur-[2px]">
            <span className="border border-[#C9A227]/50 bg-[#161311]/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#E4C97A]">
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
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg leading-snug text-[#F6F1E7]">
            {watch.name}
          </h3>
        </div>

        {endsAt && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">
              {live ? "Closes in" : "Closed"}
            </span>
            <Countdown endsAt={endsAt} className={live ? "" : "text-[#A69F8D]"} />
          </div>
        )}

        <div className="border-t border-[rgba(228,201,122,0.14)] pt-3">
          {hasBids ? (
            <p className="text-[#F6F1E7]">
              <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Current bid</span>
              <span className="font-[family-name:var(--font-display)] text-xl text-[#E4C97A]">
                {formatINR(auction!.currentHigh as number)}
              </span>
              <span className="ml-1.5 text-xs text-[#A69F8D]">
                · {auction!.bidCount} {auction!.bidCount === 1 ? "bid" : "bids"}
              </span>
            </p>
          ) : (
            <p className="text-[#F6F1E7]">
              <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Opening bid</span>
              <span className="font-[family-name:var(--font-display)] text-xl text-[#E4C97A]">{watch.price}</span>
            </p>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#A69F8D]">
            {live && (
              <span className="rounded-full border border-[#C9A227]/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#E4C97A]">
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
          className="zamana-cta mt-auto min-h-11 w-full rounded-full font-semibold uppercase tracking-[0.16em] transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:border disabled:border-[rgba(228,201,122,0.2)] disabled:from-transparent disabled:to-transparent disabled:text-[#A69F8D] disabled:after:hidden"
        >
          <Gavel className="size-4" aria-hidden />
          {ended ? "Bidding Closed" : "Place a Bid"}
        </Button>
      </div>
    </motion.article>
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
    const rank = (w: WatchWithAuction) => (w.auction?.status === "live" ? 0 : 1);
    return list.slice().sort((a, b) => {
      const r = rank(a) - rank(b);
      if (r !== 0) return r;
      const ea = a.auction?.endsAt ? Date.parse(a.auction.endsAt) : Infinity;
      const eb = b.auction?.endsAt ? Date.parse(b.auction.endsAt) : Infinity;
      return ea - eb;
    });
  }, [watches]);

  const liveCount = auctions.filter((w) => w.auction?.status === "live").length;

  return (
    <section
      id="auctions"
      aria-label="Live auctions"
      className="zamana-grain relative scroll-mt-20 border-y border-[#161311] bg-[#161311] text-[#F6F1E7]"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="Under the Hammer" title="The bidding room" tone="dark">
          <p className="mt-4 max-w-2xl text-base font-light text-[#A69F8D]">
            Place your bid — reserve prices stay sealed until the first strike.
            {liveCount > 0 ? (
              <>
                {" "}
                <span className="text-[#E4C97A]">
                  {liveCount} lot{liveCount === 1 ? "" : "s"} on the block right now
                </span>
                , decided on the IST clock.
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
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {auctions.map((w, i) => (
              <AuctionCard key={w.id} watch={w} onSelect={onSelect} index={i} />
            ))}
          </div>
        )}

        <p className="mt-6 flex flex-wrap items-center gap-2 text-xs font-light text-[#A69F8D]">
          <ShieldCheck className="size-3.5 text-[#C9A227]" aria-hidden />
          Bid increments of ₹250 · Lots close on IST clock · Highest bid wins once the reserve is met
        </p>
      </div>
    </section>
  );
}
