import type { Metadata } from "next";
import { site } from "@/lib/site";

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Reisebus, Doppeldecker und Kleinbus der Heess Reisen GmbH",
};

// Seiten ohne Suchwert: Platzhalter ohne Inhalt und reine Kontodaten. Sie
// bleiben erreichbar, erscheinen aber nicht in Google und nicht in der Sitemap.
export const NOINDEX_PATHS = new Set(["/touristik", "/bankverbindungen"]);

export const DEFAULT_TITLE =
  "Busunternehmen in Troisdorf – Bus mit Fahrer mieten | Heess Reisen";

// Einheitliche Metadaten pro Seite: Titel, Beschreibung, Canonical-URL und
// Vorschau beim Teilen (Open Graph).
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Ohne Firmenname; die Vorlage im Layout hängt „| Heess Reisen“ an */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    ...(NOINDEX_PATHS.has(path)
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: path,
      title: title ? `${title} | Heess Reisen` : DEFAULT_TITLE,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image" },
  };
}
