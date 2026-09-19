import Link from "next/link";
import { legal, nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2 text-white/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sky">
            Kontakt
          </h2>
          <ul className="mt-4 space-y-2 text-white/80">
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-white">
                ☎ {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              {site.name}
              <br />
              {site.addressLine}
              <br />
              {site.city}
            </li>
            <li>Öffnungszeiten: {site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-white/55 sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/kontakt" className="hover:text-white">
              Buchungsformular
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
