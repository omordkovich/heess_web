import Image from "next/image";

export function BrandHero({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-sand">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(61,143,212,0.16),transparent_42%)]" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-[32px] border border-navy/10 bg-white shadow-[0_24px_80px_rgba(11,39,68,0.12)]">
          <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[280px]">
            <Image
              src="/heess-hero.jpg"
              alt="heeß tours & travel services – Fuhrpark, Telefon und Kontakt"
              fill
              priority
              className="object-contain object-center"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6">
          {kicker ? (
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
              {kicker}
            </p>
          ) : null}
          <h1 className="font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
