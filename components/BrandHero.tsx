export function BrandHero({ title, kicker }: { title: string; kicker?: string }) {
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
        </h1>
      </div>
    </section>
  );
}
