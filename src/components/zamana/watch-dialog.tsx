"use client";

// WatchDialog — product theatre for a single piece (light atelier styling).
// Fixed pieces: masked price + inline enquiry (POST /api/consign).
// Auction pieces: live bid panel (POST /api/bids) + bid history,
// polling GET /api/watches/{id} every 8s while open.

import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, Gavel, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { formatINR, MIN_BID_INCREMENT } from "@/lib/watches-data";
import Countdown from "./countdown";
import type { BidItem, WatchWithAuction } from "./types";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const SPEC_ROWS: { label: string; key: keyof WatchWithAuction }[] = [
  { label: "Movement", key: "movement" },
  { label: "Case", key: "caseMaterial" },
  { label: "Size", key: "caseSize" },
  { label: "Dial", key: "dial" },
  { label: "Strap", key: "strap" },
  { label: "Condition", key: "condition" },
  { label: "Service", key: "serviceNote" },
];

export default function WatchDialog({
  watchId,
  onClose,
  onDataChanged,
}: {
  watchId: string | null;
  onClose: () => void;
  onDataChanged: () => void;
}) {
  const open = watchId !== null;
  const [watch, setWatch] = useState<WatchWithAuction | null>(null);
  const [bids, setBids] = useState<BidItem[]>([]);
  const [failed, setFailed] = useState(false);

  const [bidder, setBidder] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [eqName, setEqName] = useState("");
  const [eqPhone, setEqPhone] = useState("");
  const [eqBusy, setEqBusy] = useState(false);

  // Load + poll the detail endpoint while open.
  useEffect(() => {
    if (!watchId) {
      setWatch(null);
      setBids([]);
      setFailed(false);
      return;
    }
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/watches/${watchId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("not found");
        const json = (await res.json()) as { watch: WatchWithAuction; bids: BidItem[] };
        if (!alive) return;
        setWatch(json.watch);
        setBids(json.bids ?? []);
        setFailed(false);
      } catch {
        if (alive) setFailed(true);
      }
    };
    void load();
    const timer = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [watchId]);

  // Reset forms whenever a different piece is opened.
  useEffect(() => {
    setBidder("");
    setAmount("");
    setEnquiryOpen(false);
    setEqName("");
    setEqPhone("");
  }, [watchId]);

  const submitBid = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!watchId || !watch) return;
      const name = bidder.trim();
      const value = Number(amount);
      if (name.length < 2) {
        toast.error("Please add your name (min 2 characters).");
        return;
      }
      if (!Number.isFinite(value) || value <= 0) {
        toast.error("Enter a valid bid amount in rupees.");
        return;
      }
      setSubmitting(true);
      try {
        const res = await fetch("/api/bids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ watchId, bidder: name, amount: value }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          toast.error(json.error || "Could not place your bid — try again.");
          return;
        }
        toast.success(`You're the highest bidder, ${name}!`);
        setAmount("");
        setBids(json.bids ?? []);
        setWatch((prev) =>
          prev && prev.auction
            ? {
                ...prev,
                auction: {
                  ...prev.auction,
                  bidCount: json.bidCount ?? prev.auction.bidCount,
                  currentHigh: json.currentHigh ?? prev.auction.currentHigh,
                  status: json.status ?? prev.auction.status,
                  endsAt: json.endsAt ?? prev.auction.endsAt,
                  lastBidAt: new Date().toISOString(),
                },
              }
            : prev
        );
        onDataChanged();
      } catch {
        toast.error("Network hiccup — please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [watchId, watch, bidder, amount, onDataChanged]
  );

  const submitEnquiry = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!watch) return;
      if (eqName.trim().length < 2 || eqPhone.trim().length < 6) {
        toast.error("Add your name and a callable phone number.");
        return;
      }
      setEqBusy(true);
      try {
        const res = await fetch("/api/consign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: eqName.trim(),
            phone: eqPhone.trim(),
            brand: watch.brand,
            model: `${watch.ref} — ${watch.name}`,
            year: watch.year,
            condition: watch.condition,
            notes: "Purchase enquiry from the online collection.",
          }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          toast.error(json.error || "Could not send your enquiry — try again.");
          return;
        }
        toast.success("Our curator will call you within 24 hrs (IST)");
        setEnquiryOpen(false);
        setEqName("");
        setEqPhone("");
      } catch {
        toast.error("Network hiccup — please try again.");
      } finally {
        setEqBusy(false);
      }
    },
    [watch, eqName, eqPhone]
  );

  const auction = watch?.auction ?? null;
  const live = auction?.status === "live" && !!auction.endsAt;
  const ended = auction?.status === "ended";
  const hasBids = !!auction && auction.bidCount > 0 && auction.currentHigh != null;
  const minNext =
    hasBids && auction?.currentHigh != null
      ? formatINR(auction.currentHigh + MIN_BID_INCREMENT)
      : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-md border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] p-0 text-[#1A1714] sm:max-w-3xl">
        {failed ? (
          <div className="px-6 py-16 text-center">
            <DialogTitle className="font-[family-name:var(--font-display)] text-2xl text-[#1A1714]">
              This piece stepped out of the cabinet.
            </DialogTitle>
            <DialogDescription className="mt-3 text-[#6E635A]">
              It may have been sold since you loaded the page — browse the collection for its cousins.
            </DialogDescription>
          </div>
        ) : !watch ? (
          <div className="grid gap-0 md:grid-cols-2">
            <DialogTitle className="sr-only">Loading watch details</DialogTitle>
            <DialogDescription className="sr-only">
              Fetching the latest details and bid state from the workshop.
            </DialogDescription>
            <Skeleton className="aspect-square w-full rounded-none bg-[#F1EADC]" />
            <div className="space-y-4 p-6">
              <Skeleton className="h-3 w-24 bg-[#F1EADC]" />
              <Skeleton className="h-7 w-4/5 bg-[#F1EADC]" />
              <Skeleton className="h-4 w-full bg-[#F1EADC]" />
              <Skeleton className="h-4 w-full bg-[#F1EADC]" />
              <Skeleton className="h-24 w-full bg-[#F1EADC]" />
            </div>
          </div>
        ) : (
          <div>
            {/* Two columns: image + details */}
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden bg-[#F1EADC]">
                <img
                  src={watch.image}
                  alt={`${watch.brand} ${watch.name}, ${watch.year}, ${watch.condition}`}
                  className="aspect-square h-full w-full object-cover"
                />
                {ended && (
                  <span className="absolute left-3 top-3 border border-[#C9A227]/50 bg-[#161311]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E4C97A]">
                    Lot closed
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 p-5 md:p-7">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#A8842C]">
                    {watch.ref} · {watch.era} · {watch.year}
                  </p>
                  <DialogTitle className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#1A1714] md:text-3xl">
                    {watch.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1.5 text-sm font-light text-[#6E635A]">
                    {watch.brand} · {watch.movement}
                  </DialogDescription>
                </div>

                <p className="text-sm font-light leading-relaxed text-[#3A332D]">
                  {watch.story}
                </p>

                {/* Spec table */}
                <dl className="border-t border-[rgba(26,23,20,0.12)]">
                  {SPEC_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-6 border-b border-[rgba(26,23,20,0.08)] py-2.5"
                    >
                      <dt className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#6E635A]">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm font-light text-[#1A1714]">
                        {String(watch[row.key])}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Price / bid block */}
                {watch.stockType === "fixed" ? (
                  <div className="mt-auto rounded-sm border border-[rgba(26,23,20,0.12)] bg-white p-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#6E635A]">Buy now — fixed price</p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#A8842C]">
                      {watch.price}
                    </p>
                    <p className="mt-2 text-xs font-light text-[#6E635A]">
                      Final pricing on request — enquire and we&apos;ll confirm, ship insured.
                    </p>

                    {!enquiryOpen ? (
                      <Button
                        onClick={() => setEnquiryOpen(true)}
                        className="zamana-cta mt-4 min-h-11 w-full rounded-full font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.01]"
                      >
                        <BadgeCheck className="size-4" aria-hidden />
                        Buy Now / Enquire
                      </Button>
                    ) : (
                      <form onSubmit={submitEnquiry} className="mt-4 space-y-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="eq-name" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                            Your name
                          </Label>
                          <Input
                            id="eq-name"
                            value={eqName}
                            onChange={(e) => setEqName(e.target.value)}
                            placeholder="e.g. Ananya Rao"
                            autoComplete="name"
                            className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="eq-phone" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                            Phone (India)
                          </Label>
                          <Input
                            id="eq-phone"
                            type="tel"
                            inputMode="tel"
                            value={eqPhone}
                            onChange={(e) => setEqPhone(e.target.value)}
                            placeholder="+91 …"
                            autoComplete="tel"
                            className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={eqBusy}
                          className="zamana-cta min-h-11 w-full rounded-full font-semibold uppercase tracking-[0.16em]"
                        >
                          {eqBusy && <Loader2 className="size-4 animate-spin" aria-hidden />}
                          Request a Call
                        </Button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto rounded-sm border border-[rgba(26,23,20,0.12)] bg-white p-5">
                    {auction && auction.endsAt && (
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-[#6E635A]">
                          {live ? "Closes in" : "Closed"}
                        </span>
                        <Countdown endsAt={auction.endsAt} />
                      </div>
                    )}

                    {hasBids ? (
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p>
                          <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6E635A]">Current bid</span>
                          <span className="font-[family-name:var(--font-display)] text-2xl text-[#A8842C]">
                            {formatINR(auction!.currentHigh as number)}
                          </span>
                        </p>
                        <p className="text-xs text-[#6E635A]">
                          {auction!.bidCount} {auction!.bidCount === 1 ? "bid" : "bids"}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p>
                          <span className="mr-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6E635A]">Opening bid</span>
                          <span className="font-[family-name:var(--font-display)] text-2xl text-[#A8842C]">{watch.price}</span>
                        </p>
                        <span className="rounded-full border border-[#C9A227]/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#A8842C]">
                          Reserve sealed
                        </span>
                      </div>
                    )}

                    {ended ? (
                      <p className="mt-4 border-t border-[rgba(26,23,20,0.12)] pt-4 text-sm font-light text-[#6E635A]">
                        This lot has closed and bidding is sealed — like all good
                        stories, the ending stays between us and the gavel.
                        {hasBids && auction?.currentHigh != null && (
                          <> Final standing bid: <span className="text-[#A8842C]">{formatINR(auction.currentHigh)}</span>.</>
                        )}
                      </p>
                    ) : (
                      <form onSubmit={submitBid} noValidate className="mt-4 space-y-3">
                        {minNext && (
                          <p className="text-xs text-[#6E635A]">
                            Minimum next bid <span className="text-[#A8842C]">{minNext}</span> (₹{MIN_BID_INCREMENT} increments)
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label htmlFor="bid-name" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                              Name
                            </Label>
                            <Input
                              id="bid-name"
                              value={bidder}
                              onChange={(e) => setBidder(e.target.value)}
                              placeholder="Your name"
                              autoComplete="name"
                              className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="bid-amount" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                              Bid (₹)
                            </Label>
                            <Input
                              id="bid-amount"
                              type="number"
                              inputMode="numeric"
                              min={1}
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="25000"
                              className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          aria-label="Place your bid"
                          className="zamana-cta min-h-11 w-full rounded-full font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.01]"
                        >
                          {submitting ? (
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                          ) : (
                            <Gavel className="size-4" aria-hidden />
                          )}
                          Place Bid
                        </Button>
                        <p className="flex items-center gap-1.5 text-[11px] font-light text-[#6E635A]">
                          <ShieldCheck className="size-3.5 text-[#A8842C]" aria-hidden />
                          Bids are binding intentions — our curator confirms each lot by phone.
                        </p>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bid history */}
            {watch.stockType === "auction" && (
              <div className="border-t border-[rgba(26,23,20,0.12)] p-5 md:p-7">
                <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[#A8842C]">
                  Bid History
                </h3>
                {bids.length === 0 ? (
                  <p className="text-sm font-light italic text-[#6E635A]">
                    No strikes yet — the first bid breaks the seal.
                  </p>
                ) : (
                  <ol className="max-h-64 space-y-1 overflow-y-auto pr-1">
                    {bids.map((b, i) => (
                      <li
                        key={b.id}
                        className={
                          i === 0
                            ? "flex items-center justify-between gap-4 rounded-md border border-[#C9A227]/40 bg-[#C9A227]/[0.08] px-3 py-2.5"
                            : "flex items-center justify-between gap-4 rounded-md px-3 py-2.5 hover:bg-[#F1EADC]"
                        }
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span
                            className="size-1.5 shrink-0 rounded-full bg-[#A8842C]"
                            aria-hidden
                          />
                          <span className="truncate text-sm font-light text-[#1A1714]">{b.bidder}</span>
                          {i === 0 && (
                            <span className="shrink-0 rounded-full bg-[#1A1714] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#E4C97A]">
                              Highest
                            </span>
                          )}
                        </span>
                        <span className="flex shrink-0 items-baseline gap-3">
                          <span className="font-[family-name:var(--font-display)] text-sm text-[#A8842C]">
                            {formatINR(b.amount)}
                          </span>
                          <span className="w-16 text-right text-[11px] text-[#6E635A]">{timeAgo(b.at)}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
