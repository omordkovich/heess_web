import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reisebus & Sprinter mit Fahrer mieten",
  description:
    "Bus mit Fahrer mieten in Troisdorf: VIP-8-Sitzer, Sprinter mit 19 Plätzen und Doppelstockbusse bis 91 Plätze für Betriebsausflüge, Schul- und Vereinsfahrten.",
  path: "/fuhrpark",
});

const services = [
  "Transferfahrten",
  "Betriebsausflüge",
  "Schulfahrten",
  "Mehrtägige/mehrwöchige Auslandsfahrten",
  "Vereinsfahrten u.v.m",
];

const fleet = [
  { title: "VIP 8-Sitzer", text: "VIP 8 - Sitzern" },
  { title: "Sprinter", text: "Sprinter mit 19 Sitzplätzen" },
  { title: "Einstöckig", text: "einstöckigen -" },
  {
    title: "Doppelstock",
    text: "doppelstöckigen Reisebussen mit bis zu 91 Sitzplätzen.",
  },
];

export default function FuhrparkPage() {
  return (
    <main>
      <BrandHero kicker="Unser Leistungsangebot" title="Fuhrpark & Services" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <li
              key={item}
              className="rounded-[24px] border border-navy/10 bg-white px-6 py-5 text-lg font-medium text-navy"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted">
          Fragen Sie jetzt nach Ihrem ganz persönlichen Angebot an und wir
          liefern Ihnen eine, auf Ihre Bedürfnisse zugeschnittene Lösung, für
          Ihr Vorhaben.
        </p>
        <h2 className="mt-14 font-serif text-3xl text-navy">
          Unser Fuhrpark reicht von:
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fleet.map((item) => (
            <article key={item.title} className="rounded-[24px] bg-sand p-6">
              <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 text-muted">* {item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-lg text-navy">
          Sprechen Sie mit unseren Mitarbeitern. Wir finden ganz sicher für
          jeden Anlass das richtige Fahrzeug.
        </p>
        <Link
          href="/kontakt"
          className="mt-8 inline-block max-w-full rounded-full bg-accent px-8 py-3 font-semibold text-white hover:brightness-110"
        >
          Persönliches Angebot anfragen
        </Link>
      </section>
    </main>
  );
}
