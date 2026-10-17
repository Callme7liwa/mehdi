/* Budget de performance : échoue si une page dépasse son poids autorisé au premier chargement.
   Usage : lancer le site construit (npm run build && npm run start), puis `npm run check:budget`
   (ou BASE=http://localhost:3000 node scripts/check-budget.mjs).

   Pour chaque page, le script lit le HTML servi et additionne le poids compressé (gzip) de ce que le navigateur
   télécharge avant toute action : le HTML, les scripts (hors repli « nomodule » des vieux navigateurs), les feuilles
   de style et les polices préchargées. Il vérifie aussi qu'une seule image est préchargée en priorité haute
   et qu'aucun script ne vient d'un autre site.
   Les budgets sont fixés un peu au-dessus des valeurs mesurées : ils signalent une régression, pas un idéal.
   Le socle de Next.js et React pèse à lui seul environ 130 Ko de JavaScript compressé. */
import { gzipSync } from "node:zlib";

const BASE = process.env.BASE || "http://localhost:3000";
/* Ko compressés (gzip) : [JavaScript, CSS, HTML, polices préchargées] */
// HTML : relevé de 46 à 48 Ko (accueil) et de 20 à 22 Ko (pages) avec la liste des 92 villes du formulaire de commande
// accueil v2 : relevé à 55 à 56 Ko avec les sections « À l'unité » (5 cartes produit) et « Conseils »
const HOME = { js: 165, css: 26, html: 57, fonts: 64 };
const PAGE = { js: 155, css: 8, html: 22, fonts: 64 };
// fiches produits (maquette « le ticket ») : leur propre feuille de style, plus riche que celle des pages intérieures (9,1 Ko mesurés)
// fiches : +1 Ko de HTML depuis que le ticket propose les 92 villes (liste rendue dans le HTML, pas dans le JS)
// design-fiches : +1,5 Ko de HTML avec le nouveau mode d'emploi (pictogrammes, frise) et la carte WhatsApp de la FAQ
// + 0,2 Ko de JS : chargement de Google Tag Manager après l'accord de la visiteuse (Analytics.tsx)
const PRODUCT = { js: 156, css: 10, html: 25, fonts: 64 };
const PAGES = [
  ["/", HOME], ["/ar", HOME],
  ["/soins/serum-anti-taches", PRODUCT], ["/ar/soins/serum-anti-taches", PRODUCT], ["/soins/deodorant-creme", PRODUCT],
  ["/taches-brunes-visage", PAGE], ["/ar/taches-acne", PAGE],
  ["/avis", PAGE], ["/ar/avis", PAGE],
];

const get = async (url) => Buffer.from(await (await fetch(url, { headers: { "Accept-Encoding": "identity" } })).arrayBuffer());
const gz = (buf) => gzipSync(buf).length;
const size = new Map();
const weigh = async (path, compress = true) => {
  if (!size.has(path)) { const b = await get(BASE + path); size.set(path, compress ? gz(b) : b.length); }
  return size.get(path);
};
const ko = (n) => (n / 1024).toFixed(1);

let failed = 0;
console.log("page                              JS      CSS     HTML    polices   (Ko compressés, mesuré / budget)");
for (const [path, budget] of PAGES) {
  const html = (await get(BASE + path)).toString();
  const problems = [];
  const scripts = [...html.matchAll(/<script\b([^>]*)\bsrc="([^"]+)"([^>]*)>/g)].filter((m) => !/nomodule/i.test(m[1] + m[3])).map((m) => m[2]);
  const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
  const fonts = [...new Set([...html.matchAll(/<link\b[^>]*rel="preload"[^>]*>/g)].filter((m) => /as="font"/.test(m[0])).map((m) => m[0].match(/href="([^"]+)"/)[1]))];
  const external = [...scripts, ...styles].filter((u) => /^https?:\/\//.test(u));
  if (external.length) problems.push(`fichier chargé depuis un autre site : ${external.join(", ")}`);
  const high = [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g)].filter((m) => /fetchPriority="high"/i.test(m[0])).length;
  if (high > 1) problems.push(`${high} images préchargées en priorité haute (une seule attendue : l'image principale)`);

  const got = { js: 0, css: 0, html: gz(Buffer.from(html)), fonts: 0 };
  for (const u of scripts) got.js += await weigh(u);
  for (const u of styles) got.css += await weigh(u);
  for (const u of fonts) got.fonts += await weigh(u, false); // woff2 : déjà compressé
  for (const k of Object.keys(got)) if (got[k] > budget[k] * 1024) problems.push(`${k} : ${ko(got[k])} Ko pour un budget de ${budget[k]} Ko`);
  failed += problems.length;
  const cell = (k) => `${ko(got[k]).padStart(5)}/${String(budget[k]).padEnd(3)}`;
  console.log(`${problems.length ? "✗" : "✓"} ${path.padEnd(30)} ${cell("js")} ${cell("css")} ${cell("html")} ${cell("fonts")}${problems.map((p) => "\n   " + p).join("")}`);
}
console.log(failed ? `\n${failed} dépassement(s) du budget de performance.` : `\nBudget de performance respecté sur les ${PAGES.length} pages.`);
process.exit(failed ? 1 : 0);
