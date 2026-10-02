"use client";

// Shared section heading — gold kicker + Playfair display title.
// tone="light" (default) renders ink text for cream bands;
// tone="dark" renders cream text for the charcoal theatre bands.

import { motion } from "framer-motion";

export default function SectionHeading({
  kicker,
  title,
  align = "left",
  tone = "light",
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={centered ? "text-center" : undefined}
    >
      <p
        className={`mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] ${dark ? "text-[#E4C97A]" : "text-[#A8842C]"} ${centered ? "justify-center" : ""}`}
      >
        <span className="inline-block h-px w-8 bg-[#C9A227]/70" aria-hidden />
        {kicker}
        {centered && <span className="inline-block h-px w-8 bg-[#C9A227]/70" aria-hidden />}
      </p>
      <h2
        className={`font-[family-name:var(--font-display)] text-3xl md:text-5xl ${dark ? "text-[#F6F1E7]" : "text-[#1A1714]"}`}
      >
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
