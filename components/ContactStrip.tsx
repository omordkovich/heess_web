import { site } from "@/lib/site";

export function ContactStrip() {
  return (
    <section className="border-t border-sand bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
        <article className="min-w-0 rounded-3xl bg-sand p-6">
          <h2 className="font-serif text-2xl text-navy">Rufen Sie uns an</h2>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-3 block text-xl font-semibold text-blue"
          >
            {site.phoneDisplay}
          </a>
        </article>
        <article className="min-w-0 rounded-3xl bg-sand p-6">
          <h2 className="font-serif text-2xl text-navy">
            Gerne können Sie uns schreiben:
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block text-xl font-semibold text-blue break-all"
          >
            {site.email}
          </a>
        </article>
        <article className="min-w-0 rounded-3xl bg-sand p-6">
          <h2 className="font-serif text-2xl text-navy">So finden Sie uns:</h2>
          <p className="mt-3 text-lg leading-relaxed">
            {site.name}
            <br />
            {site.addressLine} {site.city}
          </p>
        </article>
      </div>
    </section>
  );
}
