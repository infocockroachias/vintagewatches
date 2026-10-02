"use client";

// Sticky site header — cream glass, hairline, gold accents, mobile menu.
// Brand = the ZAMANA wordmark only; the boutique is presented as online-only.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#auctions", label: "Live Auctions" },
  { href: "#sell", label: "Sell Yours" },
  { href: "#story", label: "Our Story" },
  { href: "#concierge", label: "Contact" },
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
        "sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled
          ? "border-[rgba(26,23,20,0.12)] bg-[#FBF8F1]/90 shadow-[0_10px_30px_-22px_rgba(26,23,20,0.4)]"
          : "border-transparent bg-[#FBF8F1]/60"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 md:h-[72px]">
        {/* Brand — wordmark only */}
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-3"
          aria-label="ZAMANA — Vintage Timepieces, back to top"
        >
          <img
            src="/brand/favicon.jpg"
            alt="ZAMANA gold monogram"
            className="h-10 w-10 rounded-full border border-[#C9A227]/40 object-cover transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.18em] text-[#1A1714]">
              ZAMANA
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-[#6E635A]">
              Vintage Timepieces
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="zamana-navlink text-[13px] font-medium uppercase tracking-[0.16em] text-[#3A332D] transition-colors hover:text-[#A8842C]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#auctions"
            className="hidden min-h-11 items-center rounded-full bg-[#1A1714] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#F6F1E7] transition-colors hover:bg-[#C9A227] hover:text-[#1A1714] sm:inline-flex"
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
            className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(26,23,20,0.12)] text-[#1A1714] transition-colors hover:border-[#C9A227]/60 hover:text-[#A8842C] md:hidden"
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
          className="border-t border-[rgba(26,23,20,0.12)] bg-[#FBF8F1]/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-b border-[rgba(26,23,20,0.08)] last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between py-3 text-sm uppercase tracking-[0.16em] text-[#1A1714] transition-colors hover:text-[#A8842C]"
                >
                  {l.label}
                  <span className="text-[#A8842C]" aria-hidden>→</span>
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href="#auctions"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center rounded-full bg-[#1A1714] text-sm font-medium uppercase tracking-[0.18em] text-[#F6F1E7] transition-colors hover:bg-[#C9A227] hover:text-[#1A1714]"
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
