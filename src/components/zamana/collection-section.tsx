"use client";

// The Collection — fifty pieces with an upgraded discovery toolbar:
//   · search field matching name / brand / reference / year
//   · decade (year) picker dropdown
//   · segmented "All · Buy Now · Live Auction" toggle with sliding pill
//   · brand chips, result count, reset
// Skeletons while the catalog loads; light atelier styling throughout.

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TOTAL_COUNT } from "@/lib/watches-data";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";
import WatchCard from "./watch-card";
import type { StockFilter, WatchWithAuction } from "./types";

function eraValue(era: string): number {
  return parseInt(era, 10) || 0;
}

/* ——— Brand chip ——— */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-all",
        active
          ? "border-[#C9A227] bg-[#1A1714] text-[#E4C97A]"
          : "border-[rgba(26,23,20,0.14)] bg-white text-[#6E635A] hover:border-[#C9A227]/60 hover:text-[#1A1714]"
      )}
    >
      {children}
    </button>
  );
}

/* ——— Segmented stock toggle with sliding gold pill ——— */
const STOCK_OPTIONS: { value: StockFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fixed", label: "Buy Now" },
  { value: "auction", label: "Live Auction" },
];

function StockToggle({
  value,
  onChange,
  counts,
}: {
  value: StockFilter;
  onChange: (v: StockFilter) => void;
  counts: Record<StockFilter, number>;
}) {
  const activeIndex = STOCK_OPTIONS.findIndex((o) => o.value === value);

  return (
    <div
      role="tablist"
      aria-label="Filter by listing type"
      className="relative grid w-full grid-cols-3 rounded-full border border-[rgba(26,23,20,0.14)] bg-white p-1 sm:w-auto"
    >
      {/* sliding pill */}
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-[#1A1714] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {STOCK_OPTIONS.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative z-10 flex min-h-10 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors sm:gap-1.5 sm:px-4 sm:text-[12px] sm:tracking-[0.14em]",
              active ? "text-[#E4C97A]" : "text-[#6E635A] hover:text-[#1A1714]"
            )}
          >
            {o.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] leading-none tabular-nums sm:text-[10px]",
                active ? "bg-[#C9A227]/25 text-[#E4C97A]" : "bg-[#F1EADC] text-[#6E635A]"
              )}
            >
              {counts[o.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ——— Section ——— */
export default function CollectionSection({
  watches,
  loading,
  onSelect,
}: {
  watches: WatchWithAuction[];
  loading: boolean;
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");
  const [era, setEra] = useState("All");
  const [stock, setStock] = useState<StockFilter>("all");

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(watches.map((w) => w.brand))).sort()],
    [watches]
  );
  const eras = useMemo(
    () => [
      "All",
      ...Array.from(new Set(watches.map((w) => w.era))).sort((a, b) => eraValue(a) - eraValue(b)),
    ],
    [watches]
  );

  const counts = useMemo(
    () => ({
      all: watches.length,
      fixed: watches.filter((w) => w.stockType === "fixed").length,
      auction: watches.filter((w) => w.stockType === "auction").length,
    }),
    [watches]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return watches.filter((w) => {
      if (brand !== "All" && w.brand !== brand) return false;
      if (era !== "All" && w.era !== era) return false;
      if (stock !== "all" && w.stockType !== stock) return false;
      if (q && !`${w.name} ${w.brand} ${w.ref} ${w.year} ${w.era}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [watches, query, brand, era, stock]);

  const hasFilters = query.trim() !== "" || brand !== "All" || era !== "All" || stock !== "all";
  const reset = () => {
    setQuery("");
    setBrand("All");
    setEra("All");
    setStock("all");
  };

  return (
    <section id="collection" aria-label="The collection" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="The Collection" title="Fifty watches. Fifty stories.">
          <p className="mt-4 flex flex-wrap items-baseline gap-2 text-base font-light text-[#6E635A]">
            <span>
              {loading ? "Opening the cabinets…" : `${filtered.length} of ${TOTAL_COUNT} pieces on display`}
            </span>
            <span aria-hidden className="text-[#A8842C]">◆</span>
            <span>Prices shown as <span className="text-[#1A1714]">₹ xxx</span> until confirmed in person.</span>
          </p>
        </SectionHeading>

        {/* ——— Discovery toolbar ——— */}
        <div className="mt-10 rounded-lg border border-[rgba(26,23,20,0.12)] bg-white/70 p-4 shadow-[0_20px_44px_-32px_rgba(26,23,20,0.35)] backdrop-blur-sm md:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search by name / brand / ref / year */}
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6E635A]"
                aria-hidden
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, brand, reference or year…"
                aria-label="Search the collection by name, brand, reference or year"
                className="min-h-12 rounded-full border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] pl-11 pr-4 text-[#1A1714] placeholder:text-[#6E635A]/70 focus-visible:border-[#C9A227]"
              />
            </div>

            {/* Decade / year picker */}
            <div className="lg:w-52">
              <Select value={era} onValueChange={setEra}>
                <SelectTrigger
                  aria-label="Filter by decade"
                  className="min-h-12 w-full rounded-full border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] px-4 text-[12px] uppercase tracking-[0.14em] text-[#1A1714] focus-visible:border-[#C9A227]"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="size-3.5 text-[#A8842C]" aria-hidden />
                    <SelectValue placeholder="Decade" />
                  </span>
                </SelectTrigger>
                <SelectContent className="rounded-lg border-[rgba(26,23,20,0.12)] bg-white text-[#1A1714]">
                  {eras.map((e) => (
                    <SelectItem
                      key={e}
                      value={e}
                      className="rounded-md text-[12px] uppercase tracking-[0.12em] focus:bg-[#C9A227]/15 focus:text-[#A8842C]"
                    >
                      {e === "All" ? "All decades" : e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Segmented Buy Now / Auction toggle */}
            <StockToggle value={stock} onChange={setStock} counts={counts} />
          </div>

          {/* Brand chips */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {brands.map((b) => (
              <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
                {b}
              </Chip>
            ))}
          </div>

          {/* Result meta row */}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[rgba(26,23,20,0.08)] pt-4">
            <p aria-live="polite" className="text-xs tracking-wide text-[#6E635A]">
              {loading
                ? "Loading the catalog…"
                : `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"} found`}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={reset}
                className="text-xs font-medium uppercase tracking-[0.16em] text-[#A8842C] underline-offset-4 transition-colors hover:text-[#1A1714] hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* ——— Grid ——— */}
        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-sm border border-[rgba(26,23,20,0.12)] bg-white">
                <Skeleton className="aspect-square w-full rounded-none bg-[#F1EADC]" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-3 w-1/3 bg-[#F1EADC]" />
                  <Skeleton className="h-4 w-4/5 bg-[#F1EADC]" />
                  <Skeleton className="h-4 w-1/4 bg-[#F1EADC]" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex flex-col items-center gap-4 py-16 text-center"
          >
            <SearchX className="size-8 text-[#6E635A]" aria-hidden />
            <p className="font-[family-name:var(--font-display)] text-xl italic text-[#1A1714]">
              Nothing in the cabinet matches that.
            </p>
            <p className="max-w-sm text-sm font-light text-[#6E635A]">
              Try a different brand, decade or search term — or reset the filters to
              see all fifty pieces again.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-full border border-[#C9A227] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#A8842C] transition-colors hover:bg-[#1A1714] hover:text-[#E4C97A]"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((w) => (
                <WatchCard key={w.id} watch={w} onSelect={onSelect} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
