"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Bei Seitenwechsel (auch Zurück-Button) Menü schließen
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Geöffnetes Menü: Seite nicht scrollbar, Inhalte darunter inaktiv,
  // Escape oder Wechsel auf Desktop-Breite schließt das Menü
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    root.style.paddingRight = scrollbar ? `${scrollbar}px` : "";

    const inert = [...document.body.children].filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        el !== headerRef.current &&
        el !== overlayRef.current,
    );
    inert.forEach((el) => (el.inert = true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      root.style.overflow = "";
      root.style.paddingRight = "";
      inert.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-navy-deep/40 transition-[opacity,backdrop-filter] duration-300 ease-in-out lg:hidden ${
          open
            ? "opacity-100 backdrop-blur-sm"
            : "pointer-events-none opacity-0 backdrop-blur-none"
        }`}
      />
      <header ref={headerRef} className="sticky top-0 z-50 text-white">
        {/* Platzhalter in Höhe der Leiste: das aufgeklappte Menü verschiebt keinen Inhalt */}
        <div
          aria-hidden="true"
          className="invisible border-b border-transparent px-4 py-3 sm:px-6"
        >
          <div className="aspect-[256/95] w-[108px] sm:w-[129px]" />
        </div>

        {/* Leiste und Menü auf einer gemeinsamen Hintergrundfläche, damit beide
            gleich aussehen und keine Kante dazwischen entsteht */}
        <div
          className={`absolute inset-x-0 top-0 border-b border-white/10 bg-navy/95 backdrop-blur-xl transition-shadow duration-300 ease-in-out ${
            open ? "shadow-[0_24px_48px_rgba(7,25,44,0.35)]" : ""
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex min-w-0 items-center"
            >
              <Image
                src="/heess_logo_s-v2.webp"
                alt="heeß tours & travel services"
                width={256}
                height={95}
                priority
                className="h-auto w-[108px] min-w-0 shrink sm:w-[129px]"
              />
            </Link>

            <nav
              aria-label="Hauptnavigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-sm transition ${
                      active
                        ? "bg-sky text-white"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={`tel:${site.phoneTel}`}
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 lg:inline-flex"
            >
              ☎ {site.phoneDisplay}
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
              aria-label="Menü"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menü</span>
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute inset-x-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    open ? "top-[7px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[7px] h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    open ? "top-[7px] -rotate-45" : "top-[14px]"
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <nav
                id="mobile-menu"
                aria-label="Hauptnavigation"
                className="flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`break-words rounded-2xl px-3 py-3 transition ${
                        active
                          ? "bg-sky text-white"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={`tel:${site.phoneTel}`}
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-2xl bg-accent px-3 py-3 text-center font-semibold"
                >
                  ☎ {site.phoneDisplay}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
