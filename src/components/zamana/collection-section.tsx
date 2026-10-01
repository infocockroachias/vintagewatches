"use client";

// The Collection — all fifty pieces with client-side search, brand / era
// chips and a stock-type toggle. Skeletons while the catalog loads.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TOTAL_COUNT } from "@/lib/watches-data";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";
import WatchCard from "./watch-card";
import type { StockFilter, WatchWithAuction } from "./types";

function eraValue(era: string): number {
  return parseInt(era, 10) || 0;
}

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
        "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors",
        active
          ? "border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227]"
          : "border-[#2E2B26] text-[#A69F8D] hover:border-[#C9A227]/50 hover:text-[#EDE6D6]"
      )}
    >
      {children}
    </button>
  );
}

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
    () => ["All", ...Array.from(new Set(watches.map((w) => w.era))).sort((a, b) => eraValue(a) - eraValue(b))],
    [watches]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return watches.filter((w) => {
      if (brand !== "All" && w.brand !== brand) return false;
      if (era !== "All" && w.era !== era) return false;
      if (stock !== "all" && w.stockType !== stock) return false;
      if (
        q &&
        !`${w.name} ${w.brand} ${w.ref}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [watches, query, brand, era, stock]);

  const stockOptions: { value: StockFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "fixed", label: "Buy Now" },
    { value: "auction", label: "Auction" },
  ];

  return (
    <section id="collection" aria-label="The collection" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="The Collection" title="Fifty watches. Fifty stories.">
          <p className="mt-4 flex flex-wrap items-baseline gap-2 text-base font-light text-[#A69F8D]">
            <span>
              {loading ? "Opening the cabinets…" : `${filtered.length} of ${TOTAL_COUNT} pieces on display`}
            </span>
            <span aria-hidden className="text-[#C9A227]">◆</span>
            <span>Prices shown as <span className="text-[#EDE6D6]">₹ xxx</span> until confirmed in person.</span>
          </p>
        </SectionHeading>

        {/* Controls */}
        <div className="mt-10 space-y-4">
          <div className="relative max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A69F8D]"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand or ref…"
              aria-label="Search the collection by name, brand or reference"
              className="min-h-11 border-[#2E2B26] bg-[#1A1917] pl-10 text-[#EDE6D6] placeholder:text-[#A69F8D]/70 focus-visible:border-[#C9A227]/60"
            />
          </div>

          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {brands.map((b) => (
                <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
                  {b}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {eras.map((e) => (
                <Chip key={e} active={era === e} onClick={() => setEra(e)}>
                  {e}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2">
              {stockOptions.map((o) => (
                <Chip key={o.value} active={stock === o.value} onClick={() => setStock(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border border-[#2E2B26] bg-[#1A1917] p-0">
                <Skeleton className="aspect-square w-full rounded-none bg-[#201E1B]" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-3 w-1/3 bg-[#201E1B]" />
                  <Skeleton className="h-4 w-4/5 bg-[#201E1B]" />
                  <Skeleton className="h-4 w-1/4 bg-[#201E1B]" />
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
            <SearchX className="size-8 text-[#A69F8D]" aria-hidden />
            <p className="font-[family-name:var(--font-display)] text-xl italic text-[#EDE6D6]">
              Nothing in the cabinet matches that.
            </p>
            <p className="max-w-sm text-sm font-light text-[#A69F8D]">
              Try a different brand, era or search term — or clear the filters to
              see all fifty pieces again.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setBrand("All");
                setEra("All");
                setStock("all");
              }}
              className="mt-2 rounded-md border border-[#C9A227]/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#111110]"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filtered.map((w) => (
              <WatchCard key={w.id} watch={w} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
