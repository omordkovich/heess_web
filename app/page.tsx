import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { ScrollFrameAnimation } from "@/components/ScrollFrameAnimation";
import { ScrollPanImage } from "@/components/ScrollPanImage";
// Statisch importiert: die URL enthält einen Hash des Inhalts, ein neu
// gespeichertes Bild wird daher nie aus einem Cache alt ausgeliefert
import image01 from "@/public/reisebus-heess-reisen.webp";
import image02 from "@/public/werkstatt-bus-kontrolle.webp";
import image03 from "@/public/kundenservice-heess-reisen.webp";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  description:
    "Busunternehmen in Troisdorf seit über 45 Jahren: Reisebusse, Sprinter und VIP-Fahrzeuge mit Fahrer für Transfers, Ausflüge und Busreisen in NRW und Europa.",
  path: "/",
});

const intro = [
  "Seit über 45 Jahren fahren wir im Auftrag unserer Kunden in NRW, Deutschland, nahem und fernem Ausland.",
  "Gerne beraten wir Sie und beantworten alle Ihre Fragen. Sprechen Sie unser Personal auf Ihre Anliegen an.",
  "Ob ein kurzer Transfer oder eine mehrtägige Fahrt - es gibt keinen Auftrag, dem wir nicht gewachsen sind. Prüfen Sie unsere Möglichkeiten und unser Können!",
  "Zufriedene Kundschaft ist unsere oberste Priorität. Ihr Weg ist nämlich unser Ziel!",
];

const pillars = [
  "Kompetenz im Fahren",
  "Komfortable Beförderungs\u00adkonditionen",
  "Sicherheit unserer Gäste",
  "Auf die Wünsche unserer Kunden zugeschnittener Service",
];

const services = [
  "Bus mit Fahrer mieten",
  "Transferfahrten",
  "Betriebsausflüge",
  "Schulfahrten",
  "Vereinsfahrten",
  "Mehrtägige und mehrwöchige Auslandsfahrten",
];

// Strukturierte Daten für Google und KI-Assistenten: lokaler Betrieb mit
// Adresse, Kontakt, Öffnungszeiten und Leistungen (wichtig für die lokale
// Suche, Google Maps und Empfehlungen), dazu die Website selbst
const localBusiness = {
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  legalName: site.name,
  alternateName: "Heess Reisen",
  slogan: site.slogan,
  vatID: "DE814185403",
  description:
    "Busunternehmen in Troisdorf: Reisebusse, Sprinter und VIP-Fahrzeuge mit Fahrer für Transferfahrten, Betriebsausflüge, Schul- und Vereinsfahrten sowie mehrtägige Auslandsfahrten.",
  url: site.url,
  logo: `${site.url}/heess_logo_s-v2.webp`,
  image: `${site.url}/og-image.jpg`,
  telephone: site.phoneTel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLine,
    postalCode: site.postalCode,
    addressLocality: site.locality,
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "18:00",
  },
  areaServed: [
    "Troisdorf",
    "Bonn",
    "Köln",
    "Rhein-Sieg-Kreis",
    "Nordrhein-Westfalen",
  ],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${site.addressLine}, ${site.city}`,
  )}`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Buchungsanfragen",
    telephone: site.phoneTel,
    email: site.email,
    url: `${site.url}/kontakt`,
    availableLanguage: "de",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Busvermietung mit Fahrer",
    url: `${site.url}/fuhrpark`,
    itemListElement: services.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": `${site.url}/#business` },
      },
    })),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    localBusiness,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Heess Reisen",
      inLanguage: "de-DE",
      publisher: { "@id": `${site.url}/#business` },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <BrandHero
        kicker="Herzlich Willkommen bei"
        title="Heess Reisen GmbH"
        subtitle="Ihr Busunternehmen in Troisdorf"
      />

      <ScrollFrameAnimation
        dir="/car_tilt"
        frameCount={25}
        width={1284}
        height={716}
        videoWidth="min(70vw, 852px)"
        mobileVideoWidth="97vw"
        label="Reisebus, Doppeldecker und Kleinbus der Heess Reisen GmbH"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2 md:gap-x-12">
          {intro.map((text) => (
            <li key={text} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[0.7em] size-2.5 shrink-0 rounded-full bg-sky"
              />
              <p className="text-lg leading-relaxed text-navy">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid overflow-hidden rounded-[32px] bg-navy text-white md:min-h-[26rem] md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-72 overflow-hidden md:min-h-full">
            <ScrollPanImage
              src={image03}
              alt="Mitarbeiterin mit Headset im Kundenservice"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
              pan="left"
            />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl">
              Fragen Sie jetzt unverbindlich an!
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Kontaktieren Sie uns und lassen Sie sich ein persönliches Angebot
              erstellen. Nutzen Sie dafür gerne unser Buchungsformular.
            </p>
            <Link
              href="/kontakt"
              className="mt-8 inline-block max-w-full rounded-full bg-accent px-8 py-3 font-semibold transition hover:brightness-110"
            >
              Zum Buchungsformular
            </Link>
          </div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[32px] border border-navy/10 bg-white shadow-[0_12px_40px_rgba(11,39,68,0.06)] md:min-h-[26rem] md:grid-cols-[3fr_2fr]">
          <div className="relative min-h-72 overflow-hidden md:order-last md:min-h-full">
            <ScrollPanImage
              src={image02}
              alt="Mechaniker prüft den Motor eines Fahrzeugs"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
              pan="up"
            />
          </div>
          <div className="flex flex-col justify-center gap-10 px-6 py-12 sm:px-12">
            <div>
              <h2 className="font-serif text-3xl text-navy">
                Wir investieren viel Zeit in die Ausbildung unserer Fahrer.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Es ist uns extrem wichtig, dass unsere Fahrzeuge nur Führern mit
                entsprechender Erfahrung, Ausbildungsniveau und Ortskenntnissen
                überlassen werden.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl text-navy">
                Unsere Busse werden periodisch kontrolliert.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Ständige technische Kontrollen und Überprüfungen, um
                sicherzustellen, dass unsere Fahrzeuge den Standards entsprechen
                und sicher sind, sind für uns eine Selbstverständlichkeit.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[32px] bg-navy text-white md:min-h-[26rem] md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-72 overflow-hidden md:min-h-full">
            <ScrollPanImage
              src={image01}
              alt="Reisebus der Heess Reisen GmbH"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl">
              Die 4 Grundfesten unseres Handelns
            </h2>
            <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {pillars.map((item, index) => (
                <li key={item} className="flex gap-4">
                  {/* Nummer nur optisch, die Liste ist bereits nummeriert */}
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none text-sky"
                  >
                    0{index + 1}
                  </span>
                  <p className="text-lg leading-snug text-white/90">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <blockquote className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-serif text-2xl leading-snug text-navy">
            „Der wohlfeile, schnelle, sichere und regelmäßige Transport von
            Personen und Gütern ist einer der mächtigsten Hebel des
            Nationalwohlstandes und der Zivilisation nach allen ihren
            Verzweigungen.“
          </p>
          <footer className="mt-4 text-muted">Friedrich List</footer>
        </blockquote>
      </section>
    </main>
  );
}
