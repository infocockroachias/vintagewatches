"use client";

// Curator's picks — first featured piece gets a wide editorial card,
// the rest fill the grid beneath it.

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import WatchCard from "./watch-card";
import type { WatchWithAuction } from "./types";

export default function FeaturedStrip({
  watches,
  onSelect,
}: {
  watches: WatchWithAuction[];
  onSelect: (id: string) => void;
}) {
  const featured = watches.filter((w) => w.featured).slice(0, 4);
  const [first, ...rest] = featured;

  return (
    <section id="featured" aria-label="Curator's picks" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="The Curator's Picks" title="Signature timepieces">
          <p className="mt-4 max-w-2xl text-base font-light text-[#A69F8D]">
            Hand-picked by our watchmaker — the pieces we would happily wear
            ourselves. Ask us anything in person; the kettle is always warm.
          </p>
        </SectionHeading>

        {first ? (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <WatchCard
              watch={first}
              onSelect={onSelect}
              variant="wide"
              className="md:col-span-3"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:col-span-3 md:gap-6">
              {rest.map((w) => (
                <WatchCard key={w.id} watch={w} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-12 font-[family-name:var(--font-display)] text-lg italic text-[#A69F8D]">
            The curator is re-stocking this shelf — check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}
