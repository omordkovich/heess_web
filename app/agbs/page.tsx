import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AGB & Reisebedingungen",
  description:
    "Allgemeine Geschäftsbedingungen und Reisebedingungen für Pauschalreisen der Heess Reisen GmbH als PDF zum Download.",
  path: "/agbs",
});

export default function AgbsPage() {
  return (
    <main>
      <BrandHero title="Allgemeine Geschäftsbedingungen" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-center text-muted">(stand Mai 2024)</p>
        <div className="mt-8 grid gap-4">
          <a
            href="/AGB_Heess_Reisen_GmbH.pdf"
            type="application/pdf"
            className="rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(11,39,68,0.06)] transition hover:-translate-y-0.5"
          >
            <p className="font-semibold text-navy">AGB_Heess_Reisen_GmbH.pdf</p>
            <p className="mt-1 text-sm text-muted">236 KB · Download</p>
          </a>
          <a
            href="/Reisebedingungen_Pauschalreisen.pdf"
            type="application/pdf"
            className="rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(11,39,68,0.06)] transition hover:-translate-y-0.5"
          >
            <p className="font-semibold text-navy">
              Reisebedingungen für Pauschalreisen der Firma Heess Reisen
              GmbH.pdf
            </p>
            <p className="mt-1 text-sm text-muted">221 KB · Download</p>
          </a>
        </div>
      </section>
    </main>
  );
}
