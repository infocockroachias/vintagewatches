"use client";

// Live auction countdown — ticks every second from `endsAt`.
// Turns a warm ember tone with a soft pulse when under one hour.

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

export default function Countdown({
  endsAt,
  className,
}: {
  endsAt: string;
  className?: string;
}) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = new Date(endsAt).getTime() - now;
  const urgent = diff > 0 && diff < 3600_000;

  let label: string;
  if (diff <= 0) {
    label = "Lot closed";
  } else {
    const total = Math.floor(diff / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    label = `${pad(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
  }

  return (
    <span
      role="timer"
      aria-label={diff <= 0 ? "Auction closed" : `Time remaining: ${label}`}
      className={cn(
        "font-[family-name:var(--font-sans-zamana)] tabular-nums tracking-widest text-xs",
        diff <= 0
          ? "text-[#6E635A]"
          : urgent
            ? "animate-pulse text-[#C05621]"
            : "text-[#A8842C]",
        className
      )}
    >
      {label}
    </span>
  );
}
