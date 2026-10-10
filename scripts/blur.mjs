/* Génère src/data/blur.json : un aperçu flou (10 px de large, ~200 octets) pour chaque grande photo de public/images.
   Il s'affiche pendant le chargement de l'image (voir src/components/Img.tsx).
   À relancer quand une photo est ajoutée ou remplacée : `npm run blur`. */
import { readdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const DIR = new URL("../public/images/", import.meta.url);
const out = {};
const walk = (sub = "") => readdirSync(new URL(sub, DIR), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${sub}${e.name}/`) : [`${sub}${e.name}`]));
for (const file of walk().sort()) {
  if (!/\.(webp|jpe?g|png)$/.test(file)) continue;
  const img = sharp(new URL(file, DIR).pathname);
  const { width, hasAlpha } = await img.metadata();
  // seulement les grandes photos opaques : ni les flacons détourés, ni les logos, ni les icônes
  if (width < 600 || hasAlpha) continue;
  const buf = await img.resize(10).webp({ quality: 40 }).toBuffer();
  out[`/images/${file}`] = `data:image/webp;base64,${buf.toString("base64")}`;
}
writeFileSync(new URL("../src/data/blur.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`src/data/blur.json : ${Object.keys(out).length} aperçus, ${Math.round(JSON.stringify(out).length / 1024)} Ko.`);
