"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import { site } from "@/lib/site";

const dateFields = new Set(["Datum der Abfahrt", "Datum der Rückfahrt"]);
const timeFields: Record<string, string> = {
  "Uhrzeit Abfahrt": "Abfahrtzeit",
  "Uhrzeit Rückfahrt": "Rückfahrtzeit",
};

function formatGermanDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

function stripNonDigits(event: FormEvent<HTMLInputElement>) {
  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
}

function blockNonDigitKeys(event: KeyboardEvent<HTMLInputElement>) {
  if (["e", "E", "+", "-", "."].includes(event.key)) {
    event.preventDefault();
  }
}

export function BookingForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const lines: string[] = [];
    for (const [key, value] of data.entries()) {
      const stringValue = String(value).trim();
      if (stringValue === "") continue;
      if (dateFields.has(key)) {
        lines.push(`${key}: ${formatGermanDate(stringValue)}`);
        continue;
      }
      if (timeFields[key]) {
        lines.push(`${timeFields[key]}: ${stringValue} Uhr`);
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
        <label className="text-sm font-medium">
          Uhrzeit Abfahrt
          <input name="Uhrzeit Abfahrt" type="time" className={field} />
        </label>
        <label className="text-sm font-medium">
          Datum der Rückfahrt
          <input name="Datum der Rückfahrt" type="date" className={field} />
        </label>
        <label className="text-sm font-medium">
          Uhrzeit Rückfahrt
          <input name="Uhrzeit Rückfahrt" type="time" className={field} />
        </label>
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
          <input
            name="Anzahl Einzelzimmer"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            onKeyDown={blockNonDigitKeys}
            onInput={stripNonDigits}
            className={field}
          />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Twins
          <input
            name="Anzahl Twins"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            onKeyDown={blockNonDigitKeys}
            onInput={stripNonDigits}
            className={field}
          />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Doppelzimmer
          <input
            name="Anzahl Doppelzimmer"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            onKeyDown={blockNonDigitKeys}
            onInput={stripNonDigits}
            className={field}
          />
        </label>
        <label className="text-sm font-medium">
          Anzahl der Triplezimmer
          <input
            name="Anzahl Triplezimmer"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            onKeyDown={blockNonDigitKeys}
            onInput={stripNonDigits}
            className={field}
          />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Haben Sie ein Budget?
          <input
            name="Budget"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={stripNonDigits}
            className={field}
          />
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
