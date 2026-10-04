"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

const ZOOM = 0.1; // Zoom über die gesamte Scrollstrecke
const PAN_ROOM = 0.12; // zusätzliche Vergrößerung als Spielraum für "up"
const BLUR = 10; // maximale Unschärfe in px
const PAN_X = 0.3; // Anteil des seitlichen Spielraums für "right"/"left"
const SHARP_FROM = 0.8; // ab diesem sichtbaren Anteil ist das Bild scharf
const ZOOM_RESET_MS = 600; // Dauer der Rück-Animation bei zoomDownOnly

type ScrollPanImageProps = ImageProps & {
  /** Bewegungsrichtung des Bildinhalts beim Runterscrollen */
  pan?: "right" | "left" | "up";
  /** Unscharf und ausgeblendet, solange weniger als SHARP_FROM des Bildes sichtbar ist */
  blur?: boolean;
  /**
   * Zoom 90 % → 100 % nur beim Runterscrollen. Beim Hochscrollen bleibt er
   * stehen, bis die Unterkante des Bildes unter den Fensterrand rutscht; dann
   * animiert er zurück auf 90 %.
   */
  zoomDownOnly?: boolean;
};

const easeOut = (p: number) => 1 - (1 - p) ** 3;

// Bewegt den sichtbaren Bildausschnitt beim Scrollen: Fortschritt 0, wenn der
// Container unten ins Fenster kommt, 1, wenn er oben hinausgescrollt ist.
// Dazu leichter Zoom und optional Unschärfe abhängig von der Sichtbarkeit.
// Der Container braucht overflow-hidden, seine Größe bleibt unverändert.
export function ScrollPanImage({
  className,
  alt,
  pan = "right",
  blur = false,
  zoomDownOnly = false,
  ...props
}: ScrollPanImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const blurLayer = blurRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Container messen, nicht das transformierte Bild
    const box = img.parentElement ?? img;

    let rect = box.getBoundingClientRect();
    const progressOf = (r: DOMRect) =>
      Math.min(Math.max(1 - r.bottom / (window.innerHeight + r.height), 0), 1);
    let t = progressOf(rect);
    let zoomT = t;
    let lastT = t;
    let lastScrollY = window.scrollY;

    const render = () => {
      // Unschärfe über eine Ebene mit backdrop-filter: die spiegelt das Bild an
      // den Kanten, es scheint also kein Hintergrund durch
      if (blurLayer) {
        const visible =
          (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) /
          rect.height;
        const fade = Math.min(
          Math.max((SHARP_FROM - visible) / SHARP_FROM, 0),
          1,
        );
        const amount = BLUR * fade;
        const value = amount > 0.05 ? `blur(${amount}px)` : "none";
        blurLayer.style.backdropFilter = value;
        blurLayer.style.setProperty("-webkit-backdrop-filter", value);
        // Mit der Unschärfe ein- und ausblenden
        img.style.opacity = String(1 - fade);
      }

      // zoomDownOnly: 90 % → 100 % der Bildgröße, bei 90 % deckt es genau
      const zoom = zoomDownOnly
        ? (1 - ZOOM + ZOOM * zoomT) / (1 - ZOOM)
        : 1 + ZOOM * zoomT;

      if (pan === "up") {
        const scale = zoom * (1 + PAN_ROOM);
        const range = ((scale - 1) / 2) * rect.height;
        img.style.objectPosition = "50% 50%";
        img.style.transform = `translateY(${range * (1 - 2 * t)}px) scale(${scale})`;
      } else {
        const x = 0.5 + PAN_X * (pan === "left" ? t - 0.5 : 0.5 - t);
        img.style.objectPosition = `${x * 100}% 50%`;
        img.style.transform = `scale(${zoom})`;
      }
    };

    // Rück-Animation des Zooms (zeitbasiert, unabhängig vom Scrollen)
    let resetFrame = 0;
    const startReset = () => {
      const from = zoomT;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / ZOOM_RESET_MS, 1);
        zoomT = from * (1 - easeOut(p));
        render();
        resetFrame = p < 1 ? requestAnimationFrame(step) : 0;
      };
      resetFrame = requestAnimationFrame(step);
    };
    const stopReset = () => {
      cancelAnimationFrame(resetFrame);
      resetFrame = 0;
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      rect = box.getBoundingClientRect();
      t = progressOf(rect);
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      if (!zoomDownOnly) {
        zoomT = t;
      } else if (delta > 0 && t > lastT) {
        // Runter: vom aktuellen Stand so weiterzoomen, dass oben 100 % erreicht sind
        stopReset();
        zoomT += ((1 - zoomT) * (t - lastT)) / (1 - lastT);
      } else if (
        delta < 0 &&
        rect.bottom > window.innerHeight &&
        zoomT > 0 &&
        !resetFrame
      ) {
        startReset();
      }
      lastT = t;
      render();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      stopReset();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pan, blur, zoomDownOnly]);

  return (
    <>
      <Image ref={ref} alt={alt} className={className} {...props} />
      {blur && (
        <div ref={blurRef} className="pointer-events-none absolute inset-0" />
      )}
    </>
  );
}
