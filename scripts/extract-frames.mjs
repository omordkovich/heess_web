// Zerlegt ein animiertes WebP in Einzelbilder für die Scroll-Animation.
// Aufruf: node scripts/extract-frames.mjs <animation.webp> public/car_tilt
// Die Quelldatei liegt bewusst nicht in public/, nur die Frames werden ausgeliefert.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [input, outDir] = process.argv.slice(2);
if (!input || !outDir) {
  console.error("Aufruf: node scripts/extract-frames.mjs <input.webp> <ausgabe-ordner>");
  process.exit(1);
}

const { pages = 1 } = await sharp(input, { animated: true }).metadata();
await mkdir(outDir, { recursive: true });

for (let page = 0; page < pages; page++) {
  const file = path.join(outDir, `frame_${String(page).padStart(3, "0")}.webp`);
  await sharp(input, { page }).webp({ quality: 80 }).toFile(file);
}

console.log(`${pages} Frames nach ${outDir} geschrieben.`);
