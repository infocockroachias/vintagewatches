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
  metadataBase: new URL("https://vintagewatches.vercel.app"),
  title: "ZAMANA — Vintage Timepieces · Buy, Bid & Collect Online",
  description:
    "ZAMANA is an online boutique for authenticated vintage watches — Seiko, Grand Seiko, HMT, Rolex, Omega and more. Buy rare pieces outright or bid in live auctions. Time keeps the best stories.",
  keywords: [
    "vintage watches",
    "Seiko vintage",
    "HMT watches",
    "watch auction India",
    "buy vintage watches online",
    "ZAMANA",
  ],
  authors: [{ name: "ZAMANA" }],
  icons: {
    icon: [{ url: "/brand/favicon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/brand/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "ZAMANA — Vintage Timepieces",
    description:
      "50 authenticated vintage watches. Buy now or bid live. Time keeps the best stories.",
    images: ["/brand/hero.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jost.variable} antialiased bg-[#FBF8F1] text-[#1A1714] font-[family-name:var(--font-sans-zamana)]`}
      >
        {children}
        <Toaster />
        <Sonner position="top-center" richColors theme="light" />
      </body>
    </html>
  );
}
