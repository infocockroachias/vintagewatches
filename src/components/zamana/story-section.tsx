"use client";

// Our story — editorial band with collage, heritage timeline and value props.

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Wrench } from "lucide-react";
import SectionHeading from "./section-heading";

const TIMELINE = [
  { year: "1919", label: "Elgin era" },
  { year: "1950s", label: "Golden age" },
  { year: "1970s", label: "Quartz revolution" },
  { year: "1990s", label: "JDM icons" },
  { year: "Today", label: "Your wrist" },
] as const;

const VALUES = [
  { icon: BadgeCheck, label: "Authenticated originals" },
  { icon: Wrench, label: "Serviced & timed" },
  { icon: ShieldCheck, label: "6-month warranty" },
] as const;

export default function StorySection() {
  return (
    <section
      id="story"
      aria-label="Our story"
      className="zamana-grain relative scroll-mt-20 border-y border-[#2E2B26] bg-[#1A1917]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <SectionHeading
              kicker="Where Heritage Meets Wrist"
              title="Born in Bengaluru, ticking since forever."
            >
              <div className="mt-6 space-y-5 text-base font-light leading-relaxed text-[#A69F8D]">
                <p>
                  ZAMANA began with three collectors, one borrowed loupe and a
                  shared weakness for the watch cabinets of Indiranagar. What
                  started as Sunday hunts through Commercial Street drawers grew
                  into this room — a boutique where Japanese and Swiss
                  mechanicals are restored the slow way, by hand, on this side
                  of the city.
                </p>
                <p>
                  We hold a soft spot for HMT, the timekeeper of the nation,
                  whose factory stood right here in Bengaluru. Every piece that
                  leaves us — from a ₹ xxx Timex LED to a pre-Moon Speedmaster —
                  is authenticated, serviced and timed by our watchmaker, and
                  carries a six-month written warranty. Time keeps the best
                  stories; we just make sure they keep ticking too.
                </p>
              </div>
            </SectionHeading>

            {/* Timeline */}
            <div className="mt-12" aria-label="Heritage timeline">
              <div className="relative flex items-start justify-between gap-2">
                <span className="absolute left-0 right-0 top-[7px] h-px bg-[#C9A227]/30" aria-hidden />
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="relative flex flex-1 flex-col items-center gap-2 text-center"
                  >
                    <span
                      className={`z-10 size-[15px] rounded-full border-2 ${i === TIMELINE.length - 1 ? "border-[#C9A227] bg-[#C9A227]" : "border-[#C9A227] bg-[#1A1917]"}`}
                      aria-hidden
                    />
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#EDE6D6]">{t.year}</span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#A69F8D]">{t.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Value props */}
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {VALUES.map((v) => (
                <li key={v.label} className="flex items-center gap-2.5 text-sm text-[#EDE6D6]">
                  <v.icon className="size-4 text-[#C9A227]" aria-hidden />
                  {v.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Collage */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="grid grid-cols-5 gap-4 md:gap-5">
              {/* Main image */}
              <figure className="relative col-span-3 row-span-2">
                <span
                  className="absolute inset-0 translate-x-3 translate-y-3 border border-[#C9A227]/40"
                  aria-hidden
                />
                <img
                  src="/watches/w21.jpg"
                  alt="1950s Rolex Oyster Perpetual with tropical patina dial"
                  loading="lazy"
                  className="relative h-full w-full border border-[#2E2B26] object-cover"
                />
                <figcaption className="sr-only">A patina-dial Oyster Perpetual from the 1950s</figcaption>
              </figure>
              {/* Top right */}
              <figure className="relative col-span-2">
                <span
                  className="absolute inset-0 -translate-x-2.5 translate-y-2.5 border border-[#C9A227]/40"
                  aria-hidden
                />
                <img
                  src="/watches/w22.jpg"
                  alt="Omega Speedmaster Broad Arrow chronograph from 1959"
                  loading="lazy"
                  className="relative aspect-square w-full border border-[#2E2B26] object-cover"
                />
              </figure>
              {/* Bottom right */}
              <figure className="relative col-span-2">
                <span
                  className="absolute inset-0 -translate-x-2.5 translate-y-2.5 border border-[#C9A227]/40"
                  aria-hidden
                />
                <img
                  src="/watches/w04.jpg"
                  alt="HMT Janata hand-wound watch made in Bangalore"
                  loading="lazy"
                  className="relative aspect-square w-full border border-[#2E2B26] object-cover"
                />
              </figure>
            </div>
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-[#A69F8D]">
              Indiranagar · Bengaluru · 560038
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
