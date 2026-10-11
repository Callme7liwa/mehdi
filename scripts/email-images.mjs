/* Génère public/images/email/ : les images des e-mails, en JPEG (le WebP n'est pas lu par toutes les messageries).
   Chaque flacon est posé sur un carré crème, aux couleurs du site. À relancer si une photo de produit change :
   `node scripts/email-images.mjs`. */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const IN = new URL("../public/images/", import.meta.url).pathname, OUT = IN + "email/";
mkdirSync(OUT, { recursive: true });
const CREAM = { r: 247, g: 239, b: 230 };
const PACKS = {
  gel: "gel-nettoyant-anti-taches-n01-200ml.webp", serum: "serum-anti-taches-n02-30ml.webp", creme: "creme-anti-taches-n03-50ml.webp",
  ecran: "ecran-solaire-spf50-n04-50ml.webp", yeux: "serum-contour-des-yeux-n05-15ml.webp",
};
const S = 192; // affiché à 64 ou 96 px : net sur les écrans à haute densité
for (const [key, file] of Object.entries(PACKS)) {
  const bottle = await sharp(IN + file).resize({ height: S - 28, width: S - 28, fit: "inside" }).toBuffer();
  await sharp({ create: { width: S, height: S, channels: 3, background: CREAM } }).composite([{ input: bottle, gravity: "center" }]).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}${key}.jpg`);
}
await sharp(IN + "gamme-anti-taches-otage-trousse-vignette.webp").resize(S, S, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(OUT + "gamme.jpg");
await sharp(IN + "dr-seddiki-el-mehdi-portrait.webp").resize(160, 160, { fit: "cover" }).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT + "fondateur.jpg");
// logo sur fond crème (lisible en mode clair comme en mode sombre, dans le bandeau crème de l'e-mail)
await sharp({ create: { width: 412, height: 192, channels: 3, background: CREAM } }).composite([{ input: await sharp(IN + "logo-otage.png").resize({ width: 412, height: 192, fit: "inside" }).toBuffer(), gravity: "center" }]).png({ compressionLevel: 9, palette: true }).toFile(OUT + "logo.png");
console.log("public/images/email/ : images des e-mails générées.");
