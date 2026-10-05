"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

const ZOOM = 0.1; // Zoom über die gesamte Scrollstrecke
const PAN_ROOM = 0.12; // zusätzliche Vergrößerung als Spielraum für "up"
const PAN_X = 0.3; // Anteil des seitlichen Spielraums für "right"/"left"

type ScrollPanImageProps = ImageProps & {
  /** Bewegungsrichtung des Bildinhalts beim Runterscrollen */
  pan?: "right" | "left" | "up";
};

// Bewegt den sichtbaren Bildausschnitt beim Scrollen: Fortschritt 0, wenn der
// Container unten ins Fenster kommt, 1, wenn er oben hinausgescrollt ist.
// Dazu leichter Zoom. Alles hängt nur an der Scrollposition, hoch- und
// runterscrollen sehen also gleich aus, nur umgekehrt. Der Container braucht
// overflow-hidden, seine Größe bleibt unverändert.
export function ScrollPanImage({
  className,
  alt,
  pan = "right",
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
      const zoom = 1 + ZOOM * t;

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
  }, [pan]);

  return <Image ref={ref} alt={alt} className={className} {...props} />;
}
