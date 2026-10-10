export function BrandHero({
  title,
  kicker,
  subtitle,
}: {
  title: string;
  kicker?: string;
  /** Zweite, kleinere Zeile innerhalb der H1, z. B. für den Suchbegriff */
  subtitle?: string;
}) {
  return (
    <section className="bg-blue">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6">
        {kicker ? (
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
            {kicker}
          </p>
        ) : null}
        <h1 className="break-words font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
          {subtitle ? (
            <>
              {/* Trennzeichen für Suchmaschinen und Screenreader, sonst
                  liefe der Text beider Zeilen ohne Pause ineinander */}
              <span className="sr-only"> – </span>
              <span className="mt-3 block text-xl text-white/85 sm:text-2xl lg:text-3xl">
                {subtitle}
              </span>
            </>
          ) : null}
        </h1>
      </div>
    </section>
  );
}
