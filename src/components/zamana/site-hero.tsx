"use client";

// Light editorial hero — cream canvas, serif headline with gold italics,
// hero photograph in a double gold frame (atelier collage style), stat strip.

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const STATS = [
  { value: "50", label: "Curated pieces" },
  { value: "15+", label: "Heritage brands" },
  { value: "1919–2008", label: "c. span of eras" },
  { value: "6-mo", label: "Warranty on service" },
] as const;

export default function SiteHero() {
  return (
    <section id="top" aria-label="ZAMANA — vintage timepieces" className="relative overflow-hidden">
      {/* soft gold glow, top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.14),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 top-1/3 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-14 md:px-6 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#A8842C]"
            >
              <span className="inline-block h-px w-10 bg-[#C9A227]/70" aria-hidden />
              An online boutique for time itself
            </motion.p>

            <motion.h1
              variants={item}
              className="max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-[#1A1714] sm:text-6xl lg:text-7xl"
            >
              Time keeps the best{" "}
              <em className="text-[#A8842C]">stories</em>.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#3A332D] md:text-lg"
            >
              Authenticated vintage watches — Seiko, HMT, Omega, Rolex and quieter
              legends — each serviced, timed and warrantied before it reaches your
              door. Every piece from <span className="text-[#1A1714]">₹ xxx</span>,
              every story worth wearing.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="zamana-cta inline-flex min-h-11 items-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform hover:scale-[1.02]"
              >
                Explore the Collection
              </a>
              <a
                href="#auctions"
                className="inline-flex min-h-11 items-center rounded-full border border-[#1A1714]/70 px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#1A1714] transition-colors hover:border-[#A8842C] hover:text-[#A8842C]"
              >
                Join Live Bidding
              </a>
            </motion.div>
          </motion.div>

          {/* Framed editorial image */}
          <motion.figure
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
            aria-label="A trio of vintage gold-cased watches on dark leather straps"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm border border-[#C9A227]/50"
            />
            <span
              aria-hidden
              className="absolute -left-6 -top-6 size-24 rounded-tl-sm border-l border-t border-[#C9A227]/40"
            />
            <img
              src="/brand/hero.jpg"
              alt="Vintage watches with gold dials and leather straps arranged on dark walnut"
              className="relative aspect-[4/3] w-full rounded-sm border border-[rgba(26,23,20,0.15)] object-cover shadow-[0_40px_80px_-40px_rgba(26,23,20,0.45)]"
            />
            <figcaption className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-[rgba(26,23,20,0.12)] bg-[#FBF8F1] px-5 py-2.5 shadow-[0_16px_32px_-20px_rgba(26,23,20,0.4)]">
              <span className="size-1.5 rounded-full bg-[#C9A227]" aria-hidden />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#3A332D]">
                Serviced · Timed · Warrantied
              </span>
              <span className="size-1.5 rounded-full bg-[#C9A227]" aria-hidden />
            </figcaption>
          </motion.figure>
        </div>

        {/* Stat strip */}
        <motion.dl
          variants={item}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[rgba(26,23,20,0.12)] pt-8 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-[10px] uppercase tracking-[0.22em] text-[#6E635A]">
                {s.label}
              </dt>
              <dd className="order-1 font-[family-name:var(--font-display)] text-2xl text-[#1A1714] md:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll to the curator's picks"
        className="group absolute bottom-5 right-6 hidden flex-col items-center gap-2 text-[#6E635A] transition-colors hover:text-[#A8842C] lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
