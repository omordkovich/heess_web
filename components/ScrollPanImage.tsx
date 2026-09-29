"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

// Verschiebt den sichtbaren Bildausschnitt beim Scrollen horizontal:
// Container unten im Viewport → rechter Bildrand, oben → linker Bildrand.
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
      const x = Math.min(Math.max(progress, 0), 1) * 100;
      img.style.objectPosition = `${x}% 50%`;
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
