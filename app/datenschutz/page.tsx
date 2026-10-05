import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzhinweise der Heess Reisen GmbH: wie wir personenbezogene Daten auf dieser Website verarbeiten und welche Rechte Sie haben.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <main>
      <BrandHero title="Datenschutzhinweise" />
      <article className="mx-auto max-w-3xl px-4 py-16 text-base leading-relaxed sm:px-6">
        <h2 className="font-serif text-2xl text-navy">
          I. Informationen über die Verarbeitung Ihrer Daten gemäß Art. 13 der
          Datenschutz-Grundverordnung (DS-GVO)
        </h2>
        <h3 className="mt-8 text-xl font-semibold">
          1. Verantwortlicher und Datenschutzbeauftragter
        </h3>
        <p className="mt-3 text-muted">
          Verantwortlich für diese Website ist Igor Gorelik, Glockenstr. 83,
          53844 Troisdorf, ig@heess-reisen.de
        </p>
        <p className="mt-3 text-muted">
          Den Datenschutzbeauftragten erreichen Sie per E-Mail unter
          ig@heess-reisen.de oder über die Adresse: Glockenstr. 83, 53844
          Troisdorf
        </p>
        <h3 className="mt-8 text-xl font-semibold">
          2. Daten, die für die Bereitstellung der Website und die Erstellung
          der Protokolldateien verarbeitet werden
        </h3>
        <p className="mt-4 font-medium">
          a. Welche Daten werden für welchen Zweck verarbeitet?
        </p>
        <p className="mt-3 text-muted">
          Bei jedem Zugriff auf Inhalte der Website werden vorübergehend Daten
          gespeichert, die möglicherweise eine Identifizierung zulassen. Die
          folgenden Daten werden hierbei erhoben:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted">
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>IP-Adresse</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Website, von der aus die Website aufgerufen wurde</li>
          <li>Websites, die über die Website aufgerufen werden</li>
          <li>Besuchte Seite auf unserer Website</li>
          <li>Meldung, ob der Abruf erfolgreich war</li>
          <li>Übertragene Datenmenge</li>
          <li>Informationen über den Browsertyp und die verwendete Version</li>
          <li>Betriebssystem</li>
        </ul>
        <p className="mt-3 text-muted">
          Die vorübergehende Speicherung der Daten ist für den Ablauf eines
          Websitebesuchs erforderlich, um eine Auslieferung der Website zu
          ermöglichen. Eine weitere Speicherung in Protokolldateien erfolgt, um
          die Funktionsfähigkeit der Website und die Sicherheit der
          informationstechnischen Systeme sicherzustellen. In diesen Zwecken
          liegt auch unser berechtigtes Interesse an der Datenverarbeitung.
        </p>
        <p className="mt-4 font-medium">
          b. Auf welcher Rechtsgrundlage werden diese Daten verarbeitet?
        </p>
        <p className="mt-3 text-muted">
          Die Daten werden auf der Grundlage des Art. 6 Abs. 1 Buchstabe f
          DS-GVO verarbeitet.
        </p>
        <p className="mt-4 font-medium">
          c. Wie lange werden die Daten gespeichert?
        </p>
        <p className="mt-3 text-muted">
          Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks
          ihrer Erhebung nicht mehr erforderlich sind. Bei der Bereitstellung
          der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist.
          Die Protokolldateien werden maximal bis zu 24 Stunden direkt und
          ausschließlich für Administratoren zugänglich aufbewahrt. Danach sind
          sie nur noch indirekt über die Rekonstruktion von Sicherungsbändern
          verfügbar und werden nach maximal vier Wochen endgültig gelöscht.
        </p>
        <h3 className="mt-8 text-xl font-semibold">3. Betroffenenrechte</h3>
        <p className="mt-4 font-medium">a. Recht auf Auskunft</p>
        <p className="mt-3 text-muted">
          Sie können Auskunft nach Art. 15 DS-GVO über Ihre personenbezogenen
          Daten verlangen, die wir verarbeiten.
        </p>
        <p className="mt-4 font-medium">b. Recht auf Widerspruch</p>
        <p className="mt-3 text-muted">
          Sie haben ein Recht auf Widerspruch aus besonderen Gründen (siehe
          unter Punkt II).
        </p>
        <p className="mt-4 font-medium">c. Recht auf Berichtigung</p>
        <p className="mt-3 text-muted">
          Sollten die Sie betreffenden Angaben nicht (mehr) zutreffend sein,
          können Sie nach Art. 16 DS-GVO eine Berichtigung verlangen. Sollten
          Ihre Daten unvollständig sein, können Sie eine Vervollständigung
          verlangen.
        </p>
        <p className="mt-4 font-medium">d. Recht auf Löschung</p>
        <p className="mt-3 text-muted">
          Sie können nach Art. 17 DS-GVO die Löschung Ihrer personenbezogenen
          Daten verlangen.
        </p>
        <p className="mt-4 font-medium">
          e. Recht auf Einschränkung der Verarbeitung
        </p>
        <p className="mt-3 text-muted">
          Sie haben nach Art. 18 DS-GVO das Recht, eine Einschränkung der
          Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
        </p>
        <p className="mt-4 font-medium">f. Recht auf Beschwerde</p>
        <p className="mt-3 text-muted">
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
          personenbezogenen Daten gegen Datenschutzrecht verstößt, haben Sie
          nach Ar. 77 Abs. 1 DS-GVO das Recht, sich bei einer
          Datenschutzaufsichtsbehörde eigener Wahl zu beschweren. Hierzu gehört
          auch die für den Verantwortlichen zuständige
          Datenschutzaufsichtsbehörde: Landesbeauftragte für Datenschutz und
          Informationsfreiheit Nordrhein-Westfalen,{" "}
          <a
            className="text-blue underline"
            href="https://www.ldi.nrw.de/kontakt/ihre-beschwerde"
          >
            https://www.ldi.nrw.de/kontakt/ihre-beschwerde
          </a>
          .
        </p>
        <p className="mt-4 font-medium">g. Recht auf Datenübertragbarkeit</p>
        <p className="mt-3 text-muted">
          Für den Fall, dass die Voraussetzungen des Art. 20 Abs. 1 DS-GVO
          vorliegen, steht Ihnen das Recht zu, sich Daten, die wir auf Grundlage
          Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert
          verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
          Erfassung der Daten zur Bereitstellung der Website und die Speicherung
          der Protokolldateien sind für den Betrieb der Internetseite zwingend
          erforderlich. Sie beruhen daher nicht auf einer Einwilligung nach Art.
          6 Abs. 1 Buchstabe a DS-GVO oder auf einem Vertrag nach Art. 6 Abs. 1
          Buchstabe b DS-GVO, sondern sind nach Art. 6 Abs. 1 Buchstabe f DS-GVO
          gerechtfertigt. Die Voraussetzungen des Art. 20 Abs. 1 DS GVO sind
          demnach insoweit nicht erfüllt.
        </p>
        <h2 className="mt-10 font-serif text-2xl text-navy">
          II. Recht auf Widerspruch gemäß Art. 21 Abs. 1 DS-GVO
        </h2>
        <p className="mt-3 text-muted">
          Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
          Situation ergeben, jederzeit gegen die Verarbeitung Ihrer
          personenbezogenen Daten, die aufgrund von Artikel 6 Abs. 1 Buchstabe f
          DS-GVO erfolgt, Widerspruch einzulegen. Der Verantwortliche
          verarbeitet die personenbezogenen Daten dann nicht mehr, es sei denn,
          er kann zwingende schutzwürdige Gründe für die Verarbeitung
          nachweisen, die die Interessen, Rechte und Freiheiten der betroffenen
          Person überwiegen, oder die Verarbeitung dient der Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen. Die Erfassung der
          Daten zur Bereitstellung der Website und die Speicherung der
          Protokolldateien sind für den Betrieb der Internetseite zwingend
          erforderlich.
        </p>
      </article>
    </main>
  );
}
