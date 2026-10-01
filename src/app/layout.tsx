import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-sans-zamana",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ZAMANA — Vintage Timepieces · Bengaluru",
  description:
    "ZAMANA is Bengaluru's boutique for authenticated vintage watches — Seiko, Grand Seiko, HMT, Rolex, Omega and more. Buy rare pieces and bid in live auctions. Time keeps the best stories.",
  keywords: [
    "vintage watches",
    "Seiko vintage",
    "HMT watches",
    "Bangalore watches",
    "watch auction India",
    "ZAMANA",
  ],
  authors: [{ name: "ZAMANA, Bengaluru" }],
  icons: { icon: "/brand/favicon.jpg" },
  openGraph: {
    title: "ZAMANA — Vintage Timepieces · Bengaluru",
    description:
      "50 authenticated vintage watches. Live bidding. Bengaluru. Time keeps the best stories.",
    images: ["/brand/hero.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111110",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${playfair.variable} ${jost.variable} antialiased bg-[#111110] text-[#EDE6D6] font-[family-name:var(--font-sans-zamana)]`}
      >
        {children}
        <Toaster />
        <Sonner position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
