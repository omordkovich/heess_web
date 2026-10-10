import type { NextConfig } from "next";

// Adressen der alten Website (Strato-Baukasten), z. B. /de/Fuhrpark-Services/
// oder /de/Impressum/index.php/. Dauerhafte Weiterleitung, damit Google die
// bisherigen Rankings und Links auf die neuen Seiten überträgt.
const legacyPages: Record<string, string> = {
  Home: "/",
  "Fuhrpark-Services": "/fuhrpark",
  "Buchungsanfrage-Kontakt": "/kontakt",
  Jobs: "/jobs",
  Touristik: "/touristik",
  AGBs: "/agbs",
  Bankverbindungen: "/bankverbindungen",
  Datenschutz: "/datenschutz",
  Impressum: "/impressum",
};

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/de", destination: "/", permanent: true },
      ...Object.entries(legacyPages).map(([page, destination]) => ({
        source: `/de/${page}/:rest*`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
