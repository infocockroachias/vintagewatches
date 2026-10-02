"use client";

// ZAMANA — Vintage Timepieces.
// Single-page composition. All catalog/auction state lives here:
//  · GET /api/watches on mount + every 15s (live statuses, bid counts)
//  · selectedId opens the WatchDialog (it fetches its own detail + bids)
//  · successful bids trigger refresh() so cards update immediately

import { useCallback, useEffect, useRef, useState } from "react";
import AuctionSection from "@/components/zamana/auction-section";
import BrandMarquee from "@/components/zamana/brand-marquee";
import CollectionSection from "@/components/zamana/collection-section";
import ConciergeSection from "@/components/zamana/concierge-section";
import ConsignSection from "@/components/zamana/consign-section";
import FeaturedStrip from "@/components/zamana/featured-strip";
import SiteFooter from "@/components/zamana/site-footer";
import SiteHeader from "@/components/zamana/site-header";
import SiteHero from "@/components/zamana/site-hero";
import StorySection from "@/components/zamana/story-section";
import WatchDialog from "@/components/zamana/watch-dialog";
import type { WatchWithAuction } from "@/components/zamana/types";

export default function Home() {
  const [watches, setWatches] = useState<WatchWithAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/watches", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as { watches: WatchWithAuction[] };
      setWatches(json.watches ?? []);
    } catch {
      // keep last good data; the next poll will retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = setInterval(() => void refresh(), 15_000);
    return () => clearInterval(timer);
  }, [refresh]);

  // Remember what opened the dialog so scroll focus returns cleanly.
  const openDialog = useCallback((id: string) => setSelectedId(id), []);
  const closeDialog = useCallback(() => setSelectedId(null), []);
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;
  const onDataChanged = useCallback(() => void refreshRef.current(), []);

  return (
    <div className="zamana-paper flex min-h-screen flex-col bg-[#FBF8F1] text-[#1A1714]">
      <SiteHeader />

      <main className="flex-1">
        <SiteHero />
        <BrandMarquee />
        <FeaturedStrip watches={watches} onSelect={openDialog} />
        <CollectionSection watches={watches} loading={loading} onSelect={openDialog} />
        <AuctionSection watches={watches} onSelect={openDialog} />
        <ConsignSection />
        <StorySection />
        <ConciergeSection />
      </main>

      <SiteFooter />

      <WatchDialog
        watchId={selectedId}
        onClose={closeDialog}
        onDataChanged={onDataChanged}
      />
    </div>
  );
}
