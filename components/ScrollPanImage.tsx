"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

const ZOOM = 0.1; // Zoom über die gesamte Scrollstrecke
const PAN_ROOM = 0.12; // zusätzliche Vergrößerung als Spielraum für "up"
const BLUR = 10; // maximale Unschärfe in px

type ScrollPanImageProps = ImageProps & {
  /** Bewegungsrichtung des Bildinhalts beim Runterscrollen */
  pan?: "right" | "left" | "up";
  /** Bild schrumpft von 100 % auf 90 % statt von 100 % auf 110 % zu wachsen */
  zoomOut?: boolean;
  /** Unscharf, solange das Bild nicht vollständig im Fenster sichtbar ist */
  blur?: boolean;
};

// Bewegt den sichtbaren Bildausschnitt beim Scrollen: Fortschritt 0, wenn der
// Container unten ins Fenster kommt, 1, wenn er oben hinausgescrollt ist.
// Dazu leichter Zoom (hinein bzw. mit `zoomOut` heraus, dann am Anfang stärker
// angeschnitten) und optional Unschärfe abhängig von der Sichtbarkeit.
// Der Container braucht overflow-hidden, seine Größe bleibt unverändert.
export function ScrollPanImage({
  className,
  alt,
  pan = "right",
  zoomOut = false,
  blur = false,
  ...props
}: ScrollPanImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Container messen, nicht das transformierte Bild
    const box = img.parentElement ?? img;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = box.getBoundingClientRect();
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height);
      const t = Math.min(Math.max(progress, 0), 1);

      let amount = 0;
      if (blur) {
        const visible =
          (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) /
          rect.height;
        amount = BLUR * (1 - Math.min(Math.max(visible, 0), 1));
        img.style.filter = amount > 0.05 ? `blur(${amount}px)` : "none";
      }

      // zoomOut: Ausgangsgröße so, dass das Bild bei 90 % noch deckt
      const zoom = zoomOut ? (1 - ZOOM * t) / (1 - ZOOM) : 1 + ZOOM * t;

      if (pan === "up") {
        const base = zoom * (1 + PAN_ROOM);
        const range = ((base - 1) / 2) * rect.height;
        // Für die Unschärfe minimal vergrößern, damit an den Kanten kein
        // Hintergrund durchscheint
        const scale = base + (4 * amount) / rect.height;
        img.style.objectPosition = "50% 50%";
        img.style.transform = `translateY(${range * (1 - 2 * t)}px) scale(${scale})`;
      } else {
        const x = pan === "left" ? t : 1 - t;
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
  }, [pan, zoomOut, blur]);

  return <Image ref={ref} alt={alt} className={className} {...props} />;
}
