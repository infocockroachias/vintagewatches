"use client";

// Sticky-bottom footer — mt-auto is applied by the page root.

import { Instagram, Mail, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#auctions", label: "Live Auctions" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#story", label: "Our Story" },
  { href: "#visit", label: "Visit Us" },
] as const;

const SOCIALS = [
  { icon: Instagram, label: "ZAMANA on Instagram", href: "#top" },
  { icon: Youtube, label: "ZAMANA on YouTube", href: "#top" },
  { icon: Mail, label: "Email ZAMANA", href: "mailto:hello@zamana.watch" },
] as const;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#C9A227]/30 bg-[#0D0C0B] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="Back to top">
              <img
                src="/brand/logo.png"
                alt="ZAMANA gold monogram"
                loading="lazy"
                className="h-10 w-auto rounded"
              />
            </a>
            <p className="mt-4 max-w-xs font-[family-name:var(--font-display)] text-lg italic text-[#EDE6D6]/85">
              Time keeps the best stories.
            </p>
            <p className="mt-2 text-xs font-light tracking-wide text-[#A69F8D]">
              Vintage timepieces, bought · serviced · auctioned in Bengaluru.
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
                    className="text-sm font-light text-[#A69F8D] transition-colors hover:text-[#C9A227]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
              Contact
            </h2>
            <address className="mt-4 space-y-2 text-sm font-light not-italic text-[#A69F8D]">
              <p>
                100 Feet Road, Indiranagar,<br />
                Bengaluru 560038, Karnataka
              </p>
              <p>Tue–Sun · 11 am – 8 pm (IST)</p>
              <p>
                <a href="mailto:hello@zamana.watch" className="transition-colors hover:text-[#C9A227]">
                  hello@zamana.watch
                </a>
              </p>
            </address>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-md border border-[#2E2B26] text-[#A69F8D] transition-colors hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                >
                  <s.icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#2E2B26] pt-6 text-xs font-light text-[#A69F8D] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ZAMANA Vintage Timepieces · Bengaluru</p>
          <p>Prices shown as ₹ xxx until confirmed · Bids are live amounts</p>
        </div>
      </div>
    </footer>
  );
}
