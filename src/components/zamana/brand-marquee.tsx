"use client";

// Thin heritage-brand marquee — seamless CSS loop, gold diamond separators.

const BRANDS = [
  "Seiko",
  "Grand Seiko",
  "HMT",
  "Rolex",
  "Omega",
  "Citizen",
  "Bulova",
  "Longines",
  "Tissot",
  "Rado",
  "Timex",
  "Glycine",
  "Zodiac",
  "Orient",
  "Casio",
] as const;

function MarqueeRun({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {BRANDS.map((b) => (
        <span key={b} className="flex items-center">
          <span className="px-7 text-sm font-normal uppercase tracking-[0.3em] text-[#A69F8D]">
            {b}
          </span>
          <span className="text-[9px] text-[#C9A227]">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section
      aria-label="Brands in our collection"
      className="marquee-paused overflow-hidden border-y border-[#2E2B26] bg-[#0D0C0B] py-4"
    >
      <div className="animate-zamana-marquee flex w-max">
        <MarqueeRun />
        <MarqueeRun hidden />
      </div>
    </section>
  );
}
