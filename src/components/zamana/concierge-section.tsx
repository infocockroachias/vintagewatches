"use client";

// Concierge — ZAMANA is an online marketplace, so there is no showroom,
// no address and no map. This section replaces the old "Visit Us" with the
// ways collectors reach us: email, WhatsApp, video viewings, insured shipping.

import { motion } from "framer-motion";
import { Globe2, Mail, MessageCircle, Video } from "lucide-react";
import SectionHeading from "./section-heading";

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp concierge",
    copy: "Message us any day between 10 am and 8 pm IST — a human curator replies, not a bot.",
    action: "Start a chat",
    href: "mailto:hello@zamana.watch?subject=WhatsApp%20concierge",
  },
  {
    icon: Video,
    title: "Live video viewings",
    copy: "Book a private video call and we'll put any piece on the timing machine in front of you, macro lens and all.",
    action: "Book a viewing",
    href: "mailto:hello@zamana.watch?subject=Video%20viewing",
  },
  {
    icon: Globe2,
    title: "Insured worldwide shipping",
    copy: "Fully insured, tracked delivery across India in 2–4 days and worldwide in about a week. Returns accepted within 7 days.",
    action: "Shipping details",
    href: "mailto:hello@zamana.watch?subject=Shipping",
  },
  {
    icon: Mail,
    title: "hello@zamana.watch",
    copy: "For valuations, estate purchases and everything in between — we answer within 24 hours, IST.",
    action: "Write to us",
    href: "mailto:hello@zamana.watch",
  },
] as const;

export default function ConciergeSection() {
  return (
    <section id="concierge" aria-label="Contact the concierge" className="scroll-mt-20 bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="Concierge" title="A boutique that travels to you." align="center">
          <p className="mx-auto mt-4 max-w-2xl text-center text-base font-light text-[#6E635A]">
            ZAMANA is an online maison — no showroom queue, no crowded vitrine.
            Every watch comes to you authenticated, serviced and insured.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
              className="group flex flex-col rounded-sm border border-[rgba(26,23,20,0.12)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/70 hover:shadow-[0_24px_48px_-24px_rgba(26,23,20,0.25)]"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#FBF8F1] text-[#A8842C] transition-colors group-hover:bg-[#1A1714] group-hover:text-[#E4C97A]">
                <c.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg text-[#1A1714]">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[#6E635A]">
                {c.copy}
              </p>
              <span className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A8842C] transition-colors group-hover:text-[#1A1714]">
                {c.action} →
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-10 text-center text-xs font-light text-[#6E635A]">
          Prefer email? Write to{" "}
          <a
            href="mailto:hello@zamana.watch"
            className="text-[#A8842C] underline-offset-4 transition-colors hover:text-[#1A1714] hover:underline"
          >
            hello@zamana.watch
          </a>{" "}
          — our curators read every line themselves.
        </p>
      </div>
    </section>
  );
}
