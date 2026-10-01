"use client";

// Sticky site header — blur, hairline, gold accents, mobile menu.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#auctions", label: "Live Auctions" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#story", label: "Our Story" },
  { href: "#visit", label: "Visit Us" },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[#2E2B26] backdrop-blur-md transition-colors duration-300",
        scrolled ? "bg-[#111110]/90" : "bg-[#111110]/60"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Brand */}
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3"
          aria-label="ZAMANA — Vintage Timepieces, back to top"
        >
          <img
            src="/brand/logo.png"
            alt="ZAMANA gold monogram"
            className="h-10 w-auto rounded"
          />
          <span className="sr-only">ZAMANA — Vintage Timepieces</span>
          <span className="hidden min-[420px]:block text-[10px] uppercase tracking-[0.3em] text-[#A69F8D]">
            Bengaluru
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-normal uppercase tracking-[0.16em] text-[#EDE6D6]/85 transition-colors hover:text-[#C9A227]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#auctions"
            className="hidden items-center rounded-md border border-[#C9A227]/70 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#111110] sm:inline-flex"
          >
            Bid Now
          </a>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="zamana-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-md border border-[#2E2B26] text-[#EDE6D6] transition-colors hover:border-[#C9A227]/60 hover:text-[#C9A227] md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <nav
          id="zamana-mobile-nav"
          aria-label="Mobile"
          className="border-t border-[#2E2B26] bg-[#111110]/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-b border-[#2E2B26]/60 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between py-3 text-sm uppercase tracking-[0.16em] text-[#EDE6D6] transition-colors hover:text-[#C9A227]"
                >
                  {l.label}
                  <span className="text-[#C9A227]" aria-hidden>→</span>
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#auctions"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center rounded-md bg-gradient-to-b from-[#E0B93E] to-[#C9A227] text-sm font-semibold uppercase tracking-[0.18em] text-[#111110]"
              >
                Bid Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
