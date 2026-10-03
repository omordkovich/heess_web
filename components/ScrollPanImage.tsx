"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

// Verschiebt den sichtbaren Bildausschnitt beim Scrollen horizontal:
// Container unten im Viewport → rechter Bildrand, oben → linker Bildrand.
// Zusätzlich zoomt das Bild beim Runterscrollen leicht hinein; der Container
// braucht overflow-hidden, seine Größe bleibt unverändert.
const ZOOM = 0.1;

export function ScrollPanImage({ className, alt, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = img.getBoundingClientRect();
      const progress = rect.bottom / (window.innerHeight + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      img.style.objectPosition = `${clamped * 100}% 50%`;
      img.style.transform = `scale(${1 + ZOOM * (1 - clamped)})`;
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
  }, []);

  return <Image ref={ref} alt={alt} className={className} {...props} />;
}
