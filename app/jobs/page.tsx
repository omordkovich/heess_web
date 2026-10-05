import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Jobs als Busfahrer & Bürokraft in Troisdorf",
  description:
    "Jobs bei Heess Reisen in Troisdorf: Wir suchen Busfahrer und Bürokräfte für unser Busunternehmen. Jetzt unverbindlich bei uns anfragen.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <main>
      <BrandHero title="Wir stellen ein!" />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {["Busfahrer", "Bürokräfte"].map((role) => (
            <article
              key={role}
              className="min-w-0 rounded-[28px] bg-navy p-8 text-white"
            >
              <h2 className="break-words font-serif text-3xl">{role}</h2>
              <p className="mt-3 text-white/75">Fragen Sie gerne bei uns an.</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-lg text-muted">Fragen Sie gerne bei uns an.</p>
        <Link
          href="/kontakt"
          className="mt-6 inline-block max-w-full rounded-full bg-accent px-8 py-3 font-semibold text-white hover:brightness-110"
        >
          Jetzt anfragen
        </Link>
      </section>
    </main>
  );
}
