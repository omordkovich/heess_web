import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { BrandHero } from "@/components/BrandHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Buchungsanfrage & Kontakt",
  description:
    "Jetzt unverbindlich ein Angebot für Ihre Busfahrt anfragen: Heess Reisen in Troisdorf, Telefon 0228 97150, Mo.–Fr. 10–18 Uhr.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <main>
      <BrandHero title="Buchungsanfrage & Kontakt" />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-sky">
          Öffnungszeiten
        </h2>
        <p className="mt-2 text-center font-serif text-3xl text-navy">
          {site.hours}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted">
          Gerne erstellen wir Ihnen ein persönliches Angebot. Füllen Sie hierfür
          bitte das Formular aus.
        </p>
        <div className="mt-10 rounded-[32px] border border-navy/10 bg-white p-6 sm:p-10">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
