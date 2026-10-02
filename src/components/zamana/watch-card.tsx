"use client";

// WatchCard — the shared product card used in the Featured strip and the
// Collection grid. Prices stay masked ("₹ xxx") unless a live auction has
// real bids, in which case the actual high bid is shown via formatINR.
// Light "atelier" card: hairline border, image floats on a cream mat,
// gold hover lift.

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
          "group block w-full overflow-hidden rounded-sm border border-[rgba(26,23,20,0.12)] bg-white text-left",
          "transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/70",
          "hover:shadow-[0_24px_48px_-24px_rgba(26,23,20,0.28)]",
          "focus-visible:border-[#C9A227]",
          wide ? "grid md:grid-cols-2" : "flex flex-col"
        )}
      >
        {/* Image on a mat — watch floats, never cropped harshly */}
        <div
          className={cn(
            "relative overflow-hidden bg-[#F1EADC]",
            wide ? "aspect-[4/3] md:aspect-auto md:min-h-[360px]" : "aspect-square"
          )}
        >
          <img
            src={watch.image}
            alt={`${watch.brand} ${watch.name}, ${watch.year}, ${watch.condition}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          {/* Ref chip */}
          <span className="absolute left-3 top-3 hidden rounded-full border border-[#C9A227]/40 bg-[#FBF8F1]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#A8842C] backdrop-blur-sm sm:inline-block">
            {watch.ref}
          </span>
          {/* Stock badge */}
          {watch.stockType === "auction" ? (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#1A1714] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E4C97A]">
              <Gavel className="size-3" aria-hidden />
              Live Auction
            </span>
          ) : (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(26,23,20,0.15)] bg-[#FBF8F1]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1A1714] backdrop-blur-sm">
              <Tag className="size-3" aria-hidden />
              Buy Now
            </span>
          )}
          {auction?.status === "ended" && (
            <span className="absolute inset-x-0 bottom-0 bg-[#1A1714]/85 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C97A] backdrop-blur-sm">
              Lot ended
            </span>
          )}
        </div>

        {/* Details */}
        <div className={cn("flex flex-1 flex-col gap-1 p-4 md:p-5", wide && "justify-center md:p-8")}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#6E635A]">
            {watch.brand} · {watch.era}
          </p>
          <h3
            className={cn(
              "font-[family-name:var(--font-display)] text-[#1A1714]",
              wide ? "text-2xl md:text-3xl" : "text-lg leading-snug"
            )}
          >
            {watch.name}
          </h3>
          <p className="text-sm font-light text-[#6E635A]">{watch.year} · {watch.movement.split("(")[0].trim()}</p>

          <div className={cn("mt-auto flex flex-wrap items-baseline justify-between gap-2 border-t border-[rgba(26,23,20,0.08)]", wide ? "pt-5" : "pt-3")}>
            {liveBids ? (
              <p className="text-[#A8842C]">
                <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6E635A]">Current bid</span>
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {formatINR(auction!.currentHigh as number)}
                </span>
                <span className="ml-1.5 text-xs text-[#6E635A]">
                  · {auction!.bidCount} {auction!.bidCount === 1 ? "bid" : "bids"}
                </span>
              </p>
            ) : watch.stockType === "auction" ? (
              <p className="text-[#1A1714]">
                <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6E635A]">Opening bid</span>
                <span className="font-[family-name:var(--font-display)] text-lg">{watch.price}</span>
              </p>
            ) : (
              <p className="font-[family-name:var(--font-display)] text-lg text-[#A8842C]">{watch.price}</p>
            )}
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6E635A] transition-colors group-hover:text-[#A8842C]">
              View →
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
