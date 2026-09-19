import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { ContactStrip } from "@/components/ContactStrip";

export const metadata: Metadata = {
  title: "Bankverbindungen",
};

export default function BankPage() {
  return (
    <main>
      <BrandHero title="Bankverbindungen" />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-lg text-muted">
          Unten sind unsere Bankverbindungen für den geschäftlichen Verkehr zu
          finden.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] bg-navy p-8 text-white">
            <h2 className="font-serif text-3xl">Deutsche Bank</h2>
            <p className="mt-4 text-white/80">
              IBAN: DE18370700240313040800
              <br />
              BIC: DEUTDEDBKOE
            </p>
          </article>
          <article className="rounded-[28px] bg-navy p-8 text-white">
            <h2 className="font-serif text-3xl">KSK Köln</h2>
            <p className="mt-4 text-white/80">
              IBAN: DE34370502990034001114
              <br />
              BIC: COKSDE33
            </p>
          </article>
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}
