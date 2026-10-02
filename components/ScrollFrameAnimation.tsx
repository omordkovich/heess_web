"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type ScrollFrameAnimationProps = {
  /** Ordner unter /public mit frame_000.webp, frame_001.webp, … */
  dir: string;
  frameCount: number;
  /** Pixelmaße der Einzelbilder */
  width: number;
  height: number;
  /** Angezeigte Videobreite ab md als CSS-Länge, z. B. "min(70vw, 852px)" */
  videoWidth: string;
  /** Angezeigte Videobreite unterhalb von md */
  mobileVideoWidth: string;
  label: string;
};

const frameSrc = (dir: string, index: number) =>
  `${dir}/frame_${String(index).padStart(3, "0")}.webp`;

const EDGE_SAMPLE = 8; // gemittelte Randspalten
const EDGE_BLUR = 24; // vertikaler Glättungsradius in Bildpixeln
const EDGE_BLEND = 24; // weicher Übergang ins Video in Bildpixeln

// Erzeugt für eine Bildseite einen Streifen in Randfarbe: Spalte 0 deckend
// (wird über den Seitenrand gestreckt), danach Ausblendung ins Video. Die
// Farbe ist horizontal gemittelt und vertikal geglättet, sonst würden kleine
// Helligkeitssprünge der Randspalte beim Strecken zu harten Linien.
function createEdge(
  img: HTMLImageElement,
  width: number,
  height: number,
  side: "left" | "right",
) {
  const sample = document.createElement("canvas");
  sample.width = EDGE_SAMPLE;
  sample.height = height;
  const sctx = sample.getContext("2d", { willReadFrequently: true })!;
  const sx = side === "left" ? 0 : width - EDGE_SAMPLE;
  sctx.drawImage(img, sx, 0, EDGE_SAMPLE, height, 0, 0, EDGE_SAMPLE, height);
  const src = sctx.getImageData(0, 0, EDGE_SAMPLE, height).data;

  const rows = new Float32Array(height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < EDGE_SAMPLE; x++) {
      const i = (y * EDGE_SAMPLE + x) * 4;
      for (let c = 0; c < 3; c++) rows[y * 3 + c] += src[i + c] / EDGE_SAMPLE;
    }
  }

  const prefix = new Float32Array((height + 1) * 3);
  for (let y = 0; y < height; y++) {
    for (let c = 0; c < 3; c++) {
      prefix[(y + 1) * 3 + c] = prefix[y * 3 + c] + rows[y * 3 + c];
    }
  }

  const edge = document.createElement("canvas");
  edge.width = EDGE_BLEND;
  edge.height = height;
  const ectx = edge.getContext("2d")!;
  const out = ectx.createImageData(EDGE_BLEND, height);
  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - EDGE_BLUR);
    const y1 = Math.min(height, y + EDGE_BLUR + 1);
    const color = [0, 1, 2].map(
      (c) => (prefix[y1 * 3 + c] - prefix[y0 * 3 + c]) / (y1 - y0),
    );
    for (let x = 0; x < EDGE_BLEND; x++) {
      const fromEdge = side === "left" ? x : EDGE_BLEND - 1 - x;
      const t = fromEdge / (EDGE_BLEND - 1);
      const i = (y * EDGE_BLEND + x) * 4;
      out.data[i] = color[0];
      out.data[i + 1] = color[1];
      out.data[i + 2] = color[2];
      out.data[i + 3] = 255 * (1 - t * t * (3 - 2 * t));
    }
  }
  ectx.putImageData(out, 0, 0);
  return edge;
}

// Spielt eine Bildfolge passend zur Scrollposition ab: runterscrollen spielt
// vorwärts, hochscrollen rückwärts, ohne Scrollen bleibt das Bild stehen.
// Erster Frame an der Ursprungsposition (Seitenanfang, tiefster Punkt des
// Videos im Fenster), letzter Frame, wenn nur noch 70 % sichtbar sind, also
// 30 % hinter dem Header verschwunden.
// Das Video steht mittig in einem vollbreiten Band; links und rechts wird die
// äußerste Pixelspalte des aktuellen Frames gestreckt, damit der Hintergrund
// nahtlos zum Video passt.
export function ScrollFrameAnimation({
  dir,
  frameCount,
  width,
  height,
  videoWidth,
  mobileVideoWidth,
  label,
}: ScrollFrameAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let current = -1;
    let drawn = -1;
    let frames: HTMLImageElement[] = [];
    const edges = new Map<number, { left: HTMLCanvasElement; right: HTMLCanvasElement }>();

    const draw = () => {
      const img = frames[current];
      if (current === drawn || !img?.complete || !img.naturalWidth) return;
      let edge = edges.get(current);
      if (!edge) {
        edge = {
          left: createEdge(img, width, height, "left"),
          right: createEdge(img, width, height, "right"),
        };
        edges.set(current, edge);
      }

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = ch / height;
      const vw = Math.min(width * scale, cw);
      const vx = (cw - vw) / 2;
      const blend = EDGE_BLEND * scale;

      // Seitenränder: deckende Randspalte gestreckt
      ctx.drawImage(edge.left, 0, 0, 1, height, 0, 0, Math.ceil(vx) + 1, ch);
      ctx.drawImage(edge.right, EDGE_BLEND - 1, 0, 1, height, Math.floor(vx + vw) - 1, 0, cw - vx - vw + 2, ch);
      // Video, darüber weicher Übergang an beiden Kanten
      ctx.drawImage(img, vx, 0, vw, ch);
      ctx.drawImage(edge.left, vx, 0, blend, ch);
      ctx.drawImage(edge.right, vx + vw - blend, 0, blend, ch);
      drawn = current;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === canvas.width && h === canvas.height) return false;
      canvas.width = w;
      canvas.height = h;
      drawn = -1;
      return true;
    };

    frames = Array.from({ length: reduceMotion ? 1 : frameCount }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === current) draw();
      };
      img.src = frameSrc(dir, i);
      return img;
    });

    const frameForScroll = () => {
      if (reduceMotion) return 0;
      const rect = canvas.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      // Scrollweg, bis 30 % des Videos hinter dem Header liegen
      const end = Math.max(top - headerHeight + rect.height * 0.3, 1);
      const progress = window.scrollY / end;
      return Math.round(Math.min(Math.max(progress, 0), 1) * (frameCount - 1));
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      current = frameForScroll();
      draw();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Größe der Zeichenfläche folgt dem Element (Breakpoints, Scrollbar,
    // Pixeldichte); nach einer Änderung sofort neu zeichnen, da sie geleert wird.
    const observer = new ResizeObserver(() => {
      if (resize()) update();
    });

    resize();
    update();

    observer.observe(canvas);
    window.addEventListener("resize", onScroll);
    if (!reduceMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dir, frameCount, width, height]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className="block h-[calc(var(--video-mobile)*var(--video-ratio))] w-full md:h-[calc(var(--video-desktop)*var(--video-ratio))]"
      style={
        {
          "--video-mobile": mobileVideoWidth,
          "--video-desktop": videoWidth,
          "--video-ratio": height / width,
        } as CSSProperties
      }
    />
  );
}
