import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { ScrollPanImage } from "@/components/ScrollPanImage";
import { pageMetadata } from "@/lib/seo";
import image04 from "@/public/busfahrer-fahrgast.webp";

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
  { title: "VIP 8-Sitzer", text: "VIP-Fahrzeug mit 8 Sitzplätzen" },
  { title: "Sprinter", text: "Sprinter mit 19 Sitzplätzen" },
  { title: "Einstöckig", text: "Einstöckige Reisebusse" },
  {
    title: "Doppelstock",
    text: "Doppelstöckige Reisebusse mit bis zu 91 Sitzplätzen",
  },
];

export default function FuhrparkPage() {
  return (
    <main>
      <BrandHero kicker="Unser Leistungsangebot" title="Fuhrpark & Services" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid overflow-hidden rounded-[32px] bg-navy text-white md:min-h-[26rem] md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-72 overflow-hidden md:min-h-full">
            <ScrollPanImage
              src={image04}
              alt="Busfahrer im Gespräch mit einem Fahrgast"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
              pan="left"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl">
              Unsere Leistungen
            </h2>
            <ul className="mt-8 grid gap-3">
              {services.map((item) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] size-2.5 shrink-0 rounded-full bg-sky"
                  />
                  <p className="text-lg leading-snug text-white/90">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed text-white/80">
              Fragen Sie jetzt nach Ihrem ganz persönlichen Angebot an und wir
              liefern Ihnen eine auf Ihre Bedürfnisse zugeschnittene Lösung
              für Ihr Vorhaben.
            </p>
          </div>
        </div>
        <h2 className="mt-14 font-serif text-3xl text-navy">
          Unser Fuhrpark reicht von:
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fleet.map((item) => (
            <li key={item.title} className="rounded-[24px] bg-sand p-6">
              <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
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
