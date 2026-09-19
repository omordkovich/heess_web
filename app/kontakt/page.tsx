import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { BrandHero } from "@/components/BrandHero";
import { ContactStrip } from "@/components/ContactStrip";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buchungsanfrage & Kontakt",
};

export default function KontaktPage() {
  return (
    <main>
      <BrandHero title="Öffnungszeiten" />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-center font-serif text-3xl text-navy">{site.hours}</p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted">
          Gerne erstellen wir Ihnen ein persönliches Angebot. Füllen Sie hierfür
          bitte das Formular aus.
        </p>
        <div className="mt-10 rounded-[32px] border border-navy/10 bg-white p-6 sm:p-10">
          <BookingForm />
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}
