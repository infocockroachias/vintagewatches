"use client";

// WatchCard — the shared product card used in the Featured strip and the
// Collection grid. Prices stay masked ("₹ xxx") unless a live auction has
// real bids, in which case the actual high bid is shown via formatINR.

import { motion } from "framer-motion";
import { Gavel, Tag } from "lucide-react";
import { formatINR } from "@/lib/watches-data";
import { cn } from "@/lib/utils";
import type { WatchWithAuction } from "./types";

export default function WatchCard({
  watch,
  onSelect,
  variant = "default",
  className,
}: {
  watch: WatchWithAuction;
  onSelect: (id: string) => void;
  variant?: "default" | "wide";
  className?: string;
}) {
  const wide = variant === "wide";
  const auction = watch.auction;
  const liveBids = auction && auction.bidCount > 0 && auction.currentHigh;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("min-w-0", className)}
    >
      <button
        type="button"
        onClick={() => onSelect(watch.id)}
        aria-label={`View details for ${watch.name}, ${watch.brand}, ${watch.era}`}
        className={cn(
          "group block w-full border border-[#2E2B26] bg-[#1A1917] text-left",
          "transition-all duration-300 hover:border-[#C9A227]/60 hover:shadow-[0_0_28px_-8px_rgba(201,162,39,0.35)]",
          "focus-visible:border-[#C9A227]",
          wide ? "grid md:grid-cols-2" : "flex flex-col"
        )}
      >
        {/* Image area on cream */}
        <div
          className={cn(
            "relative overflow-hidden bg-[#EDE6D6]",
            wide ? "aspect-[4/3] md:aspect-auto md:min-h-[340px]" : "aspect-square"
          )}
        >
          <img
            src={watch.image}
            alt={`${watch.brand} ${watch.name}, ${watch.year}, ${watch.condition}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          {/* Ref chip */}
          <span className="absolute left-3 top-3 hidden rounded-full border border-[#C9A227]/40 bg-[#111110]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C9A227] backdrop-blur-sm sm:inline-block">
            {watch.ref}
          </span>
          {/* Stock badge */}
          {watch.stockType === "auction" ? (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#E0B93E] to-[#C9A227] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111110]">
              <Gavel className="size-3" aria-hidden />
              Live Auction
            </span>
          ) : (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#2E2B26] bg-[#111110]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#EDE6D6] backdrop-blur-sm">
              <Tag className="size-3" aria-hidden />
              Fixed Price
            </span>
          )}
          {auction?.status === "ended" && (
            <span className="absolute inset-x-0 bottom-0 bg-[#111110]/85 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A69F8D] backdrop-blur-sm">
              Lot ended
            </span>
          )}
        </div>

        {/* Details */}
        <div className={cn("flex flex-1 flex-col gap-1 p-4 md:p-5", wide && "justify-center md:p-8")}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#A69F8D]">
            {watch.brand} · {watch.era}
          </p>
          <h3
            className={cn(
              "font-[family-name:var(--font-display)] text-[#EDE6D6]",
              wide ? "text-2xl md:text-3xl" : "text-lg leading-snug"
            )}
          >
            {watch.name}
          </h3>
          <p className="text-sm font-light text-[#A69F8D]">{watch.year} · {watch.movement.split("(")[0].trim()}</p>

          <div className={cn("mt-auto flex flex-wrap items-baseline justify-between gap-2", wide ? "pt-5" : "pt-3")}>
            {liveBids ? (
              <p className="text-[#C9A227]">
                <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Current bid</span>
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {formatINR(auction!.currentHigh as number)}
                </span>
                <span className="ml-1.5 text-xs text-[#A69F8D]">
                  · {auction!.bidCount} {auction!.bidCount === 1 ? "bid" : "bids"}
                </span>
              </p>
            ) : watch.stockType === "auction" ? (
              <p className="text-[#EDE6D6]">
                <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A69F8D]">Opening bid</span>
                <span className="font-[family-name:var(--font-display)] text-lg">{watch.price}</span>
              </p>
            ) : (
              <p className="font-[family-name:var(--font-display)] text-lg text-[#C9A227]">{watch.price}</p>
            )}
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A69F8D] transition-colors group-hover:text-[#C9A227]">
              View →
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
