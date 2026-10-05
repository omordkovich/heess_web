import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <main>
      <BrandHero title="Impressum" />
      <article className="prose-legal mx-auto max-w-3xl px-4 py-16 text-base leading-relaxed sm:px-6">
        <p>
          Anbieter: Heess Reisen GmbH Glockenstr. 83 53844 Troisdorf
        </p>
        <p className="mt-4">
          Eingetragen in das Handelsregister beim Amtsgericht Siegburg unter HRB
          920
        </p>
        <p className="mt-4">
          USt.-Id.-Nr. gemäß § 27 UStG: DE814185403
        </p>
        <p className="mt-4">
          Vertretungsberechtigter Geschäftsführer: Oleksiy Kolomatskiy
        </p>
        <p className="mt-4">
          Kontakt: Telefon: 0228/97150 E-Mail: info@heess-reisen.de Website:
          www.heess-reisen.de
        </p>
        <p className="mt-4">
          Bei redaktionellen Inhalten: Verantwortlich nach § 18 Abs. 2 MStV Igor
          Gorelik Glockenstr. 83 53844 Troisdorf
        </p>
        <h2 className="mt-10 font-serif text-3xl text-navy">
          Disclaimer – rechtliche Hinweise
        </h2>
        <h3 className="mt-8 text-xl font-semibold">§ 1 Warnhinweis zu Inhalten</h3>
        <p className="mt-3 text-muted">
          Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden
          mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite
          übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der
          bereitgestellten kostenlosen und frei zugänglichen journalistischen
          Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben
          die Meinung des jeweiligen Autors und nicht immer die Meinung des
          Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei
          zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem
          Nutzer und dem Anbieter zustande, insoweit fehlt es am
          Rechtsbindungswillen des Anbieters.
        </p>
        <h3 className="mt-8 text-xl font-semibold">§ 2 Externe Links</h3>
        <p className="mt-3 text-muted">
          Diese Website enthält Verknüpfungen zu Websites Dritter
          (&quot;externe Links&quot;). Diese Websites unterliegen der Haftung
          der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen
          Verknüpfung der externen Links die fremden Inhalte daraufhin
          überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren
          keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss
          auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der
          verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass
          sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte
          zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den
          Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei
          Kenntnis von Rechtsverstößen werden jedoch derartige externe Links
          unverzüglich gelöscht.
        </p>
        <h3 className="mt-8 text-xl font-semibold">
          § 3 Urheber- und Leistungsschutzrechte
        </h3>
        <p className="mt-3 text-muted">
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem
          deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen
          Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf
          der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen
          Rechteinhabers. Dies gilt insbesondere für Vervielfältigung,
          Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe
          von Inhalten in Datenbanken oder anderen elektronischen Medien und
          Systemen. Inhalte und Rechte Dritter sind dabei als solche
          gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe
          einzelner Inhalte oder kompletter Seiten ist nicht gestattet und
          strafbar. Lediglich die Herstellung von Kopien und Downloads für den
          persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
          Die Darstellung dieser Website in fremden Frames ist nur mit
          schriftlicher Erlaubnis zulässig.
        </p>
        <h3 className="mt-8 text-xl font-semibold">
          § 4 Besondere Nutzungsbedingungen
        </h3>
        <p className="mt-3 text-muted">
          Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von
          den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle
          ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen
          Einzelfall die besonderen Nutzungsbedingungen.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-navy">
          Hinweis gemäß Online-Streitbeilegungs-Verordnung
        </h2>
        <p className="mt-3 text-muted">
          Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die
          Existenz der Europäischen Online-Streitbeilegungs-Plattform
          hinzuweisen, die für die Beilegung von Streitigkeiten genutzt werden
          kann, ohne dass ein Gericht eingeschaltet werden muss. Für die
          Einrichtung der Plattform ist die Europäische Kommission zuständig.
        </p>
        <p className="mt-3 text-muted">
          Die Europäische Online-Streitbeilegungs-Plattform ist hier zu finden:{" "}
          <a
            className="text-blue underline"
            href="http://ec.europa.eu/odr"
          >
            http://ec.europa.eu/odr
          </a>
          .
        </p>
        <p className="mt-3 text-muted">
          Unsere E-Mail lautet: ig@heess-reisen.de
        </p>
        <p className="mt-3 text-muted">
          Wir weisen aber darauf hin, dass wir nicht bereit sind, uns am
          Streitbeilegungsverfahren im Rahmen der Europäischen
          Online-Streitbeilegungs-Plattform zu beteiligen. Nutzen Sie zur
          Kontaktaufnahme bitte unsere obige E-Mail und Telefonnummer.
        </p>
      </article>
    </main>
  );
}
