"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

const hours = Array.from({ length: 24 }, (_, i) => String(i));
const minutes = ["00", "15", "30", "45"];

const dateFields = new Set(["Datum der Abfahrt", "Datum der Rückfahrt"]);

function formatGermanDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function BookingForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pad = (value: string) => value.padStart(2, "0");

    const timeFields = {
      "Uhrzeit Abfahrt Stunde": "Abfahrtzeit",
      "Uhrzeit Abfahrt Minute": "Abfahrtzeit",
      "Uhrzeit Rückfahrt Stunde": "Rückfahrtzeit",
      "Uhrzeit Rückfahrt Minute": "Rückfahrtzeit",
    } as const;
    const combinedTimes = {
      Abfahrtzeit: {
        stunde: String(data.get("Uhrzeit Abfahrt Stunde") ?? "").trim(),
        minute: String(data.get("Uhrzeit Abfahrt Minute") ?? "").trim(),
      },
      Rückfahrtzeit: {
        stunde: String(data.get("Uhrzeit Rückfahrt Stunde") ?? "").trim(),
        minute: String(data.get("Uhrzeit Rückfahrt Minute") ?? "").trim(),
      },
    };
    const insertedTimeLabels = new Set<string>();

    const lines: string[] = [];
    for (const [key, value] of data.entries()) {
      const timeLabel = timeFields[key as keyof typeof timeFields];
      if (timeLabel) {
        if (!insertedTimeLabels.has(timeLabel)) {
          insertedTimeLabels.add(timeLabel);
          const { stunde, minute } = combinedTimes[timeLabel];
          if (stunde) {
            lines.push(`${timeLabel}: ${pad(stunde)}:${pad(minute || "00")} Uhr`);
          }
        }
        continue;
      }
      const stringValue = String(value).trim();
      if (stringValue === "") continue;
      if (dateFields.has(key)) {
        lines.push(`${key}: ${formatGermanDate(stringValue)}`);
        continue;
      }
      lines.push(`${key}: ${value}`);
    }

    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent("Buchungsanfrage Heess Reisen");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "mt-1 w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 outline-none ring-sky/40 transition focus:ring-2";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium">
          Vorname *
          <input name="Vorname" required className={field} />
        </label>
        <label className="text-sm font-medium">
          Nachname *
          <input name="Nachname" required className={field} />
        </label>
        <label className="text-sm font-medium">
          Firma/Organisation
          <input name="Firma/Organisation" className={field} />
        </label>
        <label className="text-sm font-medium">
          Straße und Hausnummer
          <input name="Straße und Hausnummer" className={field} />
        </label>
        <label className="text-sm font-medium">
          PLZ/Ort
          <input name="PLZ/Ort" className={field} />
        </label>
        <label className="text-sm font-medium">
          E-Mail *
          <input name="E-Mail" type="email" required className={field} />
        </label>
        <label className="text-sm font-medium">
          Telefon
          <input name="Telefon" className={field} />
        </label>
        <label className="text-sm font-medium">
          Gruppengröße
          <input name="Gruppengröße" className={field} />
        </label>
        <label className="text-sm font-medium">
          Gruppenname
          <input name="Gruppenname" className={field} />
        </label>
        <label className="text-sm font-medium">
          Gruppenart
          <select name="Gruppenart" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Privat</option>
            <option>Verein</option>
            <option>Schule</option>
            <option>Firma</option>
            <option>Sonstiges</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Bustyp
          <select name="Bustyp" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Reisebus</option>
            <option>barrierefreier Bus</option>
            <option>Sprinter</option>
            <option>Kleinfahrzeug bis Personen</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Abfahrtsort *
          <input name="Abfahrtsort" required className={field} />
        </label>
        <label className="text-sm font-medium">
          Zielort *
          <input name="Zielort" required className={field} />
        </label>
        <label className="text-sm font-medium">
          Datum der Abfahrt
          <input name="Datum der Abfahrt" type="date" className={field} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">
            Uhrzeit Abfahrt (Std)
            <select name="Uhrzeit Abfahrt Stunde" defaultValue="" className={field}>
              <option value="">--</option>
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Minuten
            <select name="Uhrzeit Abfahrt Minute" defaultValue="" className={field}>
              <option value="">--</option>
              {minutes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-sm font-medium">
          Datum der Rückfahrt
          <input name="Datum der Rückfahrt" type="date" className={field} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">
            Uhrzeit Rückfahrt (Std)
            <select name="Uhrzeit Rückfahrt Stunde" defaultValue="" className={field}>
              <option value="">--</option>
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Minuten
            <select name="Uhrzeit Rückfahrt Minute" defaultValue="" className={field}>
              <option value="">--</option>
              {minutes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-sm font-medium">
          Benötigen Sie den Bus vor Ort?
          <select name="Bus vor Ort" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Ja</option>
            <option>Nein</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Hotelangebot erwünscht?
          <select name="Hotelangebot erwünscht" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Ja</option>
            <option>Nein</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Hotelkategorie/Unterbringung
          <select name="Hotelkategorie" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Premium</option>
            <option>gehobene Mittelklasse</option>
            <option>gute Mittelklasse</option>
            <option>Pension</option>
            <option>Jugendherberge</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Verpflegungsart
          <select name="Verpflegungsart" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>keine</option>
            <option>Frühstücksbüffet</option>
            <option>Halbpension</option>
            <option>Vollpension</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Programm/Arrangement vor Ort gewünscht?
          <select name="Programm vor Ort" defaultValue="" className={field}>
            <option value="">– auswählen –</option>
            <option>Ja</option>
            <option>Nein</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Anzahl der Einzelzimmer
          <input name="Anzahl Einzelzimmer" className={field} />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Twins
          <input name="Anzahl Twins" className={field} />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Doppelzimmer
          <input name="Anzahl Doppelzimmer" className={field} />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Triplezimmer
          <input name="Anzahl Triplezimmer" className={field} />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Haben Sie ein Budget?
          <input name="Budget" className={field} />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Weitere Infos/Anmerkungen
          <textarea name="Anmerkungen" rows={5} className={field} />
        </label>
      </div>
      <p className="text-sm text-muted">* Pflichtfelder</p>
      <button
        type="submit"
        className="inline-block max-w-full rounded-full bg-accent px-8 py-3 font-semibold text-white transition hover:brightness-110"
      >
        Absenden
      </button>
      {sent ? (
        <p className="rounded-2xl bg-sand px-4 py-3 text-sm text-navy">
          Ihr E-Mail-Programm öffnet sich mit der Anfrage an {site.email}.
        </p>
      ) : null}
    </form>
  );
}
