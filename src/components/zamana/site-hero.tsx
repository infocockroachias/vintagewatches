"use client";

// Full-viewport hero — hero photo on the right, editorial copy on the left,
// staggered entrance, stat strip, subtle scroll cue.

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
    <section id="top" aria-label="ZAMANA — vintage timepieces, Bengaluru" className="relative">
      <div className="relative flex min-h-[92vh] flex-col overflow-hidden">
        {/* Backdrop */}
        <img
          src="/brand/hero.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111110] via-[#111110]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/60" />
        <div className="zamana-grain absolute inset-0" aria-hidden />

        {/* Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-10 md:px-6"
        >
          <motion.p
            variants={item}
            className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]"
          >
            <span className="inline-block h-px w-10 bg-[#C9A227]/60" aria-hidden />
            Bengaluru · Est. for the timeless
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-[#EDE6D6] sm:text-6xl lg:text-7xl"
          >
            Time keeps the best{" "}
            <em className="text-[#C9A227]">stories</em>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#EDE6D6]/80 md:text-lg"
          >
            Authenticated vintage watches — Seiko, HMT, Omega, Rolex and quieter
            legends — each serviced, timed and warrantied in our Indiranagar
            workshop. Every piece from <span className="text-[#EDE6D6]">₹ xxx</span>,
            every story worth wearing.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="inline-flex min-h-11 items-center rounded-md bg-gradient-to-b from-[#E0B93E] to-[#C9A227] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#111110] transition-all hover:from-[#C9A227] hover:to-[#B08F1F]"
            >
              Explore the Collection
            </a>
            <a
              href="#auctions"
              className="inline-flex min-h-11 items-center rounded-md border border-[#EDE6D6]/30 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#EDE6D6] transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              Join Live Bidding
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.dl
            variants={item}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#C9A227]/30 pt-6 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[10px] uppercase tracking-[0.22em] text-[#A69F8D]">
                  {s.label}
                </dt>
                <dd className="order-1 font-[family-name:var(--font-display)] text-2xl text-[#EDE6D6] md:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#featured"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-label="Scroll to the curator's picks"
          className="group absolute bottom-5 right-6 hidden flex-col items-center gap-2 text-[#A69F8D] transition-colors hover:text-[#C9A227] lg:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="size-4" aria-hidden />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
