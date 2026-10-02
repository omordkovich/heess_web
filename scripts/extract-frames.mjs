// Zerlegt ein animiertes WebP in Einzelbilder für die Scroll-Animation.
// Aufruf: node scripts/extract-frames.mjs <animation.webp> public/car_tilt [schritt]
// schritt: nur jedes n-te Bild übernehmen (Standard 2), Ausgabe lückenlos nummeriert.
// frameCount in app/page.tsx an die ausgegebene Anzahl anpassen.
// Die Quelldatei liegt bewusst nicht in public/, nur die Frames werden ausgeliefert.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [input, outDir, stepArg = "2"] = process.argv.slice(2);
const step = Number(stepArg);
if (!input || !outDir || !Number.isInteger(step) || step < 1) {
  console.error(
    "Aufruf: node scripts/extract-frames.mjs <input.webp> <ausgabe-ordner> [schritt]",
  );
  process.exit(1);
}

const { pages = 1 } = await sharp(input, { animated: true }).metadata();
await mkdir(outDir, { recursive: true });

let count = 0;
for (let page = 0; page < pages; page += step) {
  const file = path.join(outDir, `frame_${String(count).padStart(3, "0")}.webp`);
  await sharp(input, { page }).webp({ quality: 80 }).toFile(file);
  count++;
}

console.log(`${count} von ${pages} Frames nach ${outDir} geschrieben.`);
