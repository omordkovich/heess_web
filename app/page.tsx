import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { ContactStrip } from "@/components/ContactStrip";
import { ScrollFrameAnimation } from "@/components/ScrollFrameAnimation";
import { ScrollPanImage } from "@/components/ScrollPanImage";

const intro = [
  "Seit über 45 Jahren fahren wir im Auftrag unserer Kunden in NRW, Deutschland, nahem und fernem Ausland.",
  "Gerne beraten wie Sie und beantworten alle Ihre Fragen. Sprechen Sie unser Personal auf Ihre Anliegen an.",
  "Ob ein kurzer Transfer oder eine mehrtägige Fahrt - es gibt keinen Auftrag, dem wir nicht gewachsen sind. Prüfen Sie unsere Möglichkeiten und unser Können!",
  "Zufriedene Kundschaft ist unsere oberste Priorität. Ihr Weg ist nämlich unser Ziel!",
];

const pillars = [
  "Kompetenz im Fahren",
  "Komfortable Beförderungs-konditionen",
  "Sicherheit unserer Gäste",
  "Auf die Wünsche unserer Kunden zugeschnittener Service",
];

export default function Home() {
  return (
    <main>
      <BrandHero
        kicker="Herzlich Willkommen bei"
        title="Heess Reisen GmbH"
      />

      <ScrollFrameAnimation
        dir="/car_tilt"
        frameCount={48}
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
              src="/image_01.webp"
              alt="Reisebus der Heess Reisen GmbH"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-12">
            <p className="font-serif text-3xl sm:text-4xl">
              Fragen Sie jetzt unverbindlich an!
            </p>
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
              src="/image_02.webp"
              alt="Mechaniker prüft den Motor eines Fahrzeugs"
              fill
              sizes="(min-width: 1280px) 512px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
              pan="up"
              blur
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
                Ständige technische Kotrollen und Überprüfungen, um
                sicherzustellen, dass unsere Fahrzeuge den Standards entsprechen
                und sicher sind, sind für uns eine Selbstverständlichkeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-4xl text-navy">
          Die 4 Grundfesten unser es Handelns
        </h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, index) => (
            <li
              key={item}
              className="rounded-[28px] bg-navy p-6 text-white"
            >
              <span className="font-serif text-4xl text-sky">
                0{index + 1}
              </span>
              <p className="mt-4 text-lg leading-snug">{item}</p>
            </li>
          ))}
        </ol>
        <blockquote className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-serif text-2xl leading-snug text-navy">
            „Der wohlfeile, schnelle, sichere und regelmäßige Transport von
            Personen und Gütern ist einer der mächtigsten Hebel des
            Nationalwohlstandes und der Zivilisation nach allen ihren
            Verzweigungen.“
          </p>
          <footer className="mt-4 text-muted">Friedrich List</footer>
        </blockquote>
        <p className="mt-12 text-center font-serif text-3xl text-navy">
          Sprechen Sie uns an!
        </p>
        <p className="mt-2 text-center text-lg text-muted">
          Wir freuen uns auf Sie!
        </p>
      </section>

      <ContactStrip />
    </main>
  );
}
