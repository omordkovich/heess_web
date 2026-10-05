import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Städtereisen & Pauschalreisen",
  description:
    "Städte-Kurztrips und Pauschalreisen mit dem Reisebus von Heess Reisen aus Troisdorf. Angebote folgen in Kürze – Gruppenreisen schon jetzt anfragen.",
  path: "/touristik",
});

export default function TouristikPage() {
  return (
    <main>
      <BrandHero title="Touristik" />
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="font-serif text-3xl leading-snug text-navy">
          Der Webauftritt für Angebot an Städte- Kurztrips und Pauschalreisen
          ist noch in der Entwicklung. Weitere Informationen werden bald zur
          Verfügung gestellt.
        </p>
        <Link
          href="/kontakt"
          className="mt-10 inline-block max-w-full rounded-full bg-accent px-8 py-3 font-semibold text-white hover:brightness-110"
        >
          Buchungsanfrage senden
        </Link>
      </section>
    </main>
  );
}
