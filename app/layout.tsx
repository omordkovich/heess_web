import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Heess Reisen GmbH",
    template: "%s | Heess Reisen GmbH",
  },
  description:
    "Seit über 45 Jahren Busreisen und Transfers in NRW, Deutschland und ins Ausland. Ihr Weg ist unser Ziel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      // Next.js schaltet smooth scroll beim Seitenwechsel ab, damit die neue
      // Seite oben unter der Navbar beginnt
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
