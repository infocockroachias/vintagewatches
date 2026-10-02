"use client";

// Sell / Consign — estate buys & consignment pitch + intake form
// posting to POST /api/consign. Light atelier styling.

import { useState } from "react";
import { Camera, Gavel, Loader2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./section-heading";

const STEPS = [
  {
    n: "01",
    icon: Camera,
    title: "Photograph",
    copy: "Snap the dial, caseback and clasp — daylight on a windowsill is perfect.",
  },
  {
    n: "02",
    icon: Wrench,
    title: "Evaluate",
    copy: "Our watchmaker authenticates, times and values it with you — over a video call or a chai.",
  },
  {
    n: "03",
    icon: Gavel,
    title: "List or Auction",
    copy: "Fixed price on our shelves, or under the hammer in the live bidding room.",
  },
] as const;

const CONDITIONS = ["Mint", "Excellent", "Very Good", "Good", "Fair"] as const;

const emptyForm = {
  name: "",
  phone: "",
  brand: "",
  model: "",
  year: "",
  condition: "",
  notes: "",
};

export default function ConsignSection() {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return void toast.error("Please add your name.");
    if (form.phone.trim().length < 6) return void toast.error("Please add a callable phone number.");
    if (!form.brand.trim() || !form.model.trim())
      return void toast.error("Tell us the brand and model of your piece.");

    setBusy(true);
    try {
      const res = await fetch("/api/consign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          brand: form.brand,
          model: form.model,
          year: form.year,
          condition: form.condition,
          notes: form.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast.error(json.error || "Could not submit — try again.");
        return;
      }
      toast.success(json.message || "Thank you! Our watchmaker will call you within 24 hours (IST).");
      setForm(emptyForm);
    } catch {
      toast.error("Network hiccup — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="sell" aria-label="Sell or consign your watch" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Pitch */}
          <div>
            <SectionHeading kicker="Sell / Consign" title="Your drawer holds our next treasure.">
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-[#6E635A]">
                Every month we buy and consign estate watches across India —
                grandfather&apos;s HMT, a soldier&apos;s Seiko, a retired pilot&apos;s
                Glycine. If it ticks and it has a story, we would love to see it.
                Photograph it, send it over, and we handle the rest — fully online.
              </p>
            </SectionHeading>

            <ol className="mt-10 space-y-7">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl italic text-[#A8842C]">
                    {s.n}
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg text-[#1A1714]">
                      {s.title}
                      <s.icon className="size-4 text-[#A8842C]/80" aria-hidden />
                    </span>
                    <span className="mt-1 block max-w-md text-sm font-light text-[#6E635A]">{s.copy}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-[rgba(26,23,20,0.12)] bg-white p-6 shadow-[0_24px_48px_-36px_rgba(26,23,20,0.3)] md:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[#1A1714]">
              Tell us about your piece
            </h3>
            <p className="mt-1 text-sm font-light text-[#6E635A]">
              No obligation — we reply within a day, IST.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Name *
                  </Label>
                  <Input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-phone" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Phone / WhatsApp *
                  </Label>
                  <Input
                    id="c-phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="+91 …"
                    autoComplete="tel"
                    required
                    className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-brand" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Brand *
                  </Label>
                  <Input
                    id="c-brand"
                    value={form.brand}
                    onChange={(e) => set("brand")(e.target.value)}
                    placeholder="HMT, Seiko, Omega…"
                    required
                    className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-model" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Model *
                  </Label>
                  <Input
                    id="c-model"
                    value={form.model}
                    onChange={(e) => set("model")(e.target.value)}
                    placeholder="Janata, SKX007, 16013…"
                    required
                    className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-year" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Year (approx.)
                  </Label>
                  <Input
                    id="c-year"
                    value={form.year}
                    onChange={(e) => set("year")(e.target.value)}
                    placeholder="e.g. 1974"
                    className="min-h-11 border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-condition" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                    Condition
                  </Label>
                  <Select value={form.condition} onValueChange={set("condition")}>
                    <SelectTrigger
                      id="c-condition"
                      className="min-h-11 w-full border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714]"
                    >
                      <SelectValue placeholder="How does it wear?" />
                    </SelectTrigger>
                    <SelectContent className="border-[rgba(26,23,20,0.12)] bg-white text-[#1A1714]">
                      {CONDITIONS.map((c) => (
                        <SelectItem key={c} value={c} className="focus:bg-[#C9A227]/15 focus:text-[#A8842C]">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-notes" className="text-[11px] uppercase tracking-[0.18em] text-[#6E635A]">
                  Anything we should know?
                </Label>
                <Textarea
                  id="c-notes"
                  value={form.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                  placeholder="Service history, box & papers, the story of the watch…"
                  rows={4}
                  className="resize-none border-[rgba(26,23,20,0.14)] bg-[#FBF8F1] text-[#1A1714] placeholder:text-[#6E635A]/60"
                />
              </div>

              <Button
                type="submit"
                disabled={busy}
                className="zamana-cta min-h-11 w-full rounded-full font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.01]"
              >
                {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Submit for Evaluation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
