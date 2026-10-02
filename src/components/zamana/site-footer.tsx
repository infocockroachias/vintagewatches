"use client";

// Sticky-bottom footer — deep ink (Titan-style), cream text.
// ZAMANA is online-only: contact is email + socials, no street address.

import { Instagram, Mail, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#auctions", label: "Live Auctions" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#story", label: "Our Story" },
  { href: "#concierge", label: "Contact" },
] as const;

const SOCIALS = [
  { icon: Instagram, label: "ZAMANA on Instagram", href: "#top" },
  { icon: Youtube, label: "ZAMANA on YouTube", href: "#top" },
  { icon: Mail, label: "Email ZAMANA", href: "mailto:hello@zamana.watch" },
] as const;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#12100E] text-[#F6F1E7] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="Back to top">
              <img
                src="/brand/favicon.jpg"
                alt="ZAMANA gold monogram"
                loading="lazy"
                className="h-11 w-11 rounded-full border border-[#C9A227]/40 object-cover"
              />
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.18em] text-[#F6F1E7]">
                  ZAMANA
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-[#A69F8D]">
                  Vintage Timepieces
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs font-[family-name:var(--font-display)] text-lg italic text-[#F6F1E7]/90">
              Time keeps the best stories.
            </p>
            <p className="mt-2 text-xs font-light tracking-wide text-[#A69F8D]">
              An online boutique for authenticated vintage watches — bought ·
              serviced · auctioned, then shipped insured to your door.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-light text-[#A69F8D] transition-colors hover:text-[#E4C97A]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — online only */}
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
              Contact
            </h2>
            <div className="mt-4 space-y-2 text-sm font-light text-[#A69F8D]">
              <p>
                <a
                  href="mailto:hello@zamana.watch"
                  className="transition-colors hover:text-[#E4C97A]"
                >
                  hello@zamana.watch
                </a>
              </p>
              <p>Concierge hours · 10 am – 8 pm IST, all days</p>
              <p className="text-[#A69F8D]/80">
                We operate entirely online — worldwide insured shipping, video
                viewings on request.
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full border border-[rgba(246,241,231,0.18)] text-[#A69F8D] transition-colors hover:border-[#C9A227]/60 hover:text-[#E4C97A]"
                >
                  <s.icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgba(246,241,231,0.12)] pt-6 text-xs font-light text-[#A69F8D] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ZAMANA Vintage Timepieces</p>
          <p>Prices shown as ₹ xxx until confirmed · Bids are live amounts</p>
        </div>
      </div>
    </footer>
  );
}
