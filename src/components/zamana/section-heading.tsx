"use client";

// Shared section heading — gold kicker + Playfair display title.

import { motion } from "framer-motion";

export default function SectionHeading({
  kicker,
  title,
  align = "left",
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={centered ? "text-center" : undefined}
    >
      <p
        className={`mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227] ${centered ? "justify-center" : ""}`}
      >
        <span className="inline-block h-px w-8 bg-[#C9A227]/60" aria-hidden />
        {kicker}
        {centered && <span className="inline-block h-px w-8 bg-[#C9A227]/60" aria-hidden />}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#EDE6D6] md:text-5xl">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
