"use client";

// Visit us — address, hours, masked phone, and a stylised map panel.

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SectionHeading from "./section-heading";

export default function VisitSection() {
  return (
    <section id="visit" aria-label="Visit us" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading kicker="Visit Us" title="Find us in Indiranagar">
          <p className="mt-4 max-w-2xl text-base font-light text-[#A69F8D]">
            The door is heavy, the bell is loud, the chai is sweet. Come put a
            loupe on anything that catches your eye.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Address card */}
          <div className="flex flex-col justify-between gap-8 rounded-lg border border-[#2E2B26] bg-[#1A1917] p-6 md:p-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#EDE6D6]">
                ZAMANA <span className="italic text-[#C9A227]">Vintage Timepieces</span>
              </h3>
              <ul className="mt-6 space-y-5 text-sm font-light text-[#EDE6D6]/90">
                <li className="flex gap-3.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#C9A227]" aria-hidden />
                  <span>
                    100 Feet Road, Indiranagar,<br />
                    Bengaluru 560038, Karnataka, India
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-[#C9A227]" aria-hidden />
                  <span>
                    Tue–Sun · 11 am – 8 pm (IST)<br />
                    <span className="text-[#A69F8D]">Mondays by appointment</span>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-[#C9A227]" aria-hidden />
                  <span>
                    +91 xxxxx xxxxx (call / WhatsApp)
                    <br />
                    <span className="text-[#A69F8D]">Number shared once a viewing is booked</span>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#C9A227]" aria-hidden />
                  <span>hello@zamana.watch</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={() => toast("We'll keep a stool for you at the workbench.")}
              className="min-h-11 self-start bg-gradient-to-b from-[#E0B93E] to-[#C9A227] font-semibold uppercase tracking-[0.16em] text-[#111110] transition-all hover:from-[#C9A227] hover:to-[#B08F1F]"
            >
              <MapPin className="size-4" aria-hidden />
              Plan a Visit
            </Button>
          </div>

          {/* Stylised map panel */}
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-lg border border-[#2E2B26] bg-[#201E1B]">
            {/* radial rings */}
            <div className="absolute inset-0" aria-hidden>
              <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/10" />
              <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/15" />
              <div className="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/25" />
              <div className="absolute left-1/2 top-1/2 size-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A227]/40" />
              {/* crosshair lines */}
              <div className="absolute left-1/2 top-0 h-full w-px bg-[#C9A227]/10" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-[#C9A227]/10" />
            </div>

            <div className="relative flex flex-col items-center gap-4 px-6 text-center">
              <span className="relative flex size-16 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#111110] shadow-[0_0_36px_-6px_rgba(201,162,39,0.45)]">
                <MapPin className="size-7 text-[#C9A227]" aria-hidden />
                <span className="absolute -inset-2 animate-ping rounded-full border border-[#C9A227]/25" aria-hidden />
              </span>
              <p className="font-[family-name:var(--font-display)] text-xl text-[#EDE6D6]">
                100 Feet Road, Indiranagar
              </p>
              <p className="text-sm font-light text-[#A69F8D]">
                Walk-ins welcome · Chai always on
              </p>
            </div>

            <span
              className="absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.3em] text-[#A69F8D]/70"
              aria-hidden
            >
              12°58′ N · 77°38′ E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
