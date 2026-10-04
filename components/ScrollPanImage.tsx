"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

const ZOOM = 0.1; // Zoom über die gesamte Scrollstrecke
const PAN_ROOM = 0.12; // zusätzliche Vergrößerung als Spielraum für "up"
const BLUR = 10; // maximale Unschärfe in px
const PAN_X = 0.3; // Anteil des seitlichen Spielraums für "right"/"left"
const SHARP_FROM = 0.8; // ab diesem sichtbaren Anteil ist das Bild scharf

type ScrollPanImageProps = ImageProps & {
  /** Bewegungsrichtung des Bildinhalts beim Runterscrollen */
  pan?: "right" | "left" | "up";
  /**
   * Unscharf und ausgeblendet, solange weniger als SHARP_FROM des Bildes
   * sichtbar ist; der Zoom läuft dann nur im scharfen Abschnitt
   */
  blur?: boolean;
};

// Bewegt den sichtbaren Bildausschnitt beim Scrollen: Fortschritt 0, wenn der
// Container unten ins Fenster kommt, 1, wenn er oben hinausgescrollt ist.
// Dazu leichter Zoom und optional Unschärfe abhängig von der Sichtbarkeit.
// Alles hängt nur an der Scrollposition, hoch- und runterscrollen sehen also
// gleich aus, nur umgekehrt. Der Container braucht overflow-hidden, seine
// Größe bleibt unverändert.
export function ScrollPanImage({
  className,
  alt,
  pan = "right",
  blur = false,
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

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = box.getBoundingClientRect();
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height);
      const t = Math.min(Math.max(progress, 0), 1);

      // Zoomfortschritt: mit Unschärfe nur im scharfen Abschnitt (Einblenden
      // fertig bis Ausblenden beginnt), damit Zoom und Unschärfe/Fade getrennt
      // laufen
      let z = t;
      if (blurLayer) {
        const start = window.innerHeight - SHARP_FROM * rect.height;
        const end = SHARP_FROM * rect.height - rect.height;
        z = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

        // Unschärfe über eine Ebene mit backdrop-filter: die spiegelt das Bild
        // an den Kanten, es scheint also kein Hintergrund durch
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

      const zoom = 1 + ZOOM * z;

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
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pan, blur]);

  return (
    <>
      <Image ref={ref} alt={alt} className={className} {...props} />
      {blur && (
        <div ref={blurRef} className="pointer-events-none absolute inset-0" />
      )}
    </>
  );
}
