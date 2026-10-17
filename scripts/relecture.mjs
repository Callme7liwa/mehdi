/* Génère src/data/ar-relecture.md : tous les textes arabes du site, page par page, avec le français en regard.
   Usage : lancer le site (npm run start), puis `npm run relecture`.
   Les textes sont lus dans les pages servies (français et arabe), dans l'ordre d'affichage : rien n'est oublié.
   Les textes écrits par les animations de l'accueil (ticket, fenêtres…) viennent de src/home/text-js.ts,
   ceux du chat des questions de src/home/chat/chat-text.ts. Ceux du ticket des fiches produits qui n'apparaissent
   qu'après un geste (rappels, erreurs, confirmation) sont dans productUi, src/data/product-pages.ts. */
import { writeFileSync } from "node:fs";
import { homeJsText } from "../src/home/text-js.ts";
import { chatText } from "../src/home/chat/chat-text.ts";
import { registerHooks } from "node:module";

// src/data/product-pages.ts importe ses voisins sans extension (« ../lib/bidi ») : Node les cherche aussi en .ts
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { productUi } = await import("../src/data/product-pages.ts");

const BASE = process.env.BASE || "http://localhost:3000";
const PAGES = [
  ["/", "Accueil", "src/home/text.ts (sections), src/data/products.ts (fiches), src/data/faq.ts (FAQ)"],
  ["/soins", "Tous les soins", "src/templates/ProductsIndex.tsx, src/data/products.ts"],
  ...["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux", "deodorant-creme"].map((s) => [`/soins/${s}`, `Fiche produit : ${s}`, "src/data/product-pages.ts (textes de la fiche et du ticket), src/data/products.ts, src/data/faq.ts"]),
  ...["cernes", "taches-acne", "melasma-grossesse"].map((s) => [`/${s}`, `Conseils peau : ${s}`, "src/data/problems.ar.ts"]),
  ["/avis", "Avis de clientes", "src/templates/ReviewsPage.tsx, src/data/reviews.ts"],
  ["/a-propos", "À propos", "src/app/(ar)/ar/a-propos/page.tsx"],
  ["/livraison-paiement", "Livraison et paiement", "src/app/(ar)/ar/livraison-paiement/page.tsx"],
  ["/contact", "Contact", "src/app/(ar)/ar/contact/page.tsx"],
  ["/mentions-legales", "Mentions légales", "src/app/(ar)/ar/mentions-legales/page.tsx"],
  ["/cgv", "Conditions générales de vente", "src/app/(ar)/ar/cgv/page.tsx"],
];

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/[‪‬‎‏]/g, "");
const cell = (s) => s.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();

/** Textes d'une page, dans l'ordre : balises du <head>, puis blocs de texte et attributs lus à l'écran. */
async function texts(path) {
  const html = await (await fetch(BASE + path)).text();
  const head = [];
  const title = html.match(/<title>([^<]*)<\/title>/); if (title) head.push(["Titre de l'onglet (title)", decode(title[1])]);
  const desc = html.match(/<meta name="description" content="([^"]*)"/); if (desc) head.push(["Description (Google)", decode(desc[1])]);
  let body = html.slice(html.indexOf("<body"));
  body = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->/g, "");
  // fiches produits : messages des clientes et leur traduction (relus sur la page /avis, où ils sont aussi affichés ;
  // la fiche arabe ne traduit pas un message déjà en arabe, ce qui décalerait l'alignement)
  body = body.replace(/<blockquote class="q-dar"[\s\S]*?<\/blockquote>|<p class="q-fr q-tr">[\s\S]*?<\/p>/g, "");
  // les balises de mise en forme restent dans la phrase ; les autres (liens, blocs) séparent les textes
  body = body.replace(/<span\b[^>]*dir="ltr"[^>]*>([^<]*)<\/span>/g, "$1");
  body = body.replace(/<\/?(?:b|bdi|em|s|mark|small|strong|time|i|u)\b[^>]*>/g, "");
  const out = [];
  for (const part of body.split(/(<[^>]+>)/)) {
    if (part.startsWith("<")) {
      for (const m of part.matchAll(/\b(alt|aria-label|placeholder)="([^"]+)"/g)) out.push(decode(m[2]).trim());
    } else for (const t of part.split("\u0001")) { const v = decode(t).replace(/\s+/g, " ").trim(); if (v) out.push(v); }
  }
  return { head, body: out };
}

const hasLetters = (s) => /[A-Za-zÀ-ÿ؀-ۿ]/.test(s);
let md = `# Relecture de l'arabe : tous les textes, page par page

Ce fichier est généré par \`npm run relecture\` à partir du site construit. **Ne le corrige pas directement** :
note tes corrections ici si tu veux, mais elles doivent être reportées dans le fichier source indiqué sous chaque page.

- Colonne de gauche : le texte français de la page. Colonne de droite : le texte arabe affiché à la même place.
- Tous les textes arabes sont « À relire par un natif ».
- Les lignes identiques dans les deux langues (OTAGE, prix, numéros) ne sont pas listées.
- Un texte répété sur plusieurs pages (menu, pied de page, boutons) n'est listé qu'une fois, à sa première apparition.
- Les messages des clientes (avis) restent dans leur langue d'origine et ne sont pas traduits.

`;
let total = 0;
const seenAll = new Set();
for (const [path, name, source] of PAGES) {
  const arPath = path === "/" ? "/ar" : `/ar${path}`;
  const [fr, ar] = await Promise.all([texts(path), texts(arPath)]);
  md += `\n## ${name}\n\nFrançais : \`${path}\` · Arabe : \`${arPath}\` · Source de l'arabe : ${source}\n\n| Français | العربية |\n|---|---|\n`;
  for (let i = 0; i < Math.max(fr.head.length, ar.head.length); i++) md += `| **${fr.head[i]?.[0] ?? ""}** ${cell(fr.head[i]?.[1] ?? "")} | ${cell(ar.head[i]?.[1] ?? "")} |\n`;
  if (fr.body.length === ar.body.length) {
    for (let i = 0; i < fr.body.length; i++) {
      const a = fr.body[i], b = ar.body[i];
      // un même texte (menu, pied de page, boutons) n'est listé qu'une fois, à sa première apparition
      if (a === b || !hasLetters(a + b) || seenAll.has(a + "\u0000" + b)) continue;
      seenAll.add(a + "\u0000" + b); total++;
      md += `| ${cell(a)} | ${cell(b)} |\n`;
    }
  } else {
    // structure différente : on liste les deux colonnes telles quelles et on le signale
    console.warn(`⚠ ${path} : ${fr.body.length} blocs en français, ${ar.body.length} en arabe (alignement approximatif)`);
    md += `| _(structure différente : ${fr.body.length} blocs / ${ar.body.length} blocs, alignement approximatif)_ | |\n`;
    for (let i = 0; i < Math.max(fr.body.length, ar.body.length); i++) { total++; md += `| ${cell(fr.body[i] ?? "")} | ${cell(ar.body[i] ?? "")} |\n`; }
  }
}

// textes écrits par les animations de l'accueil
md += `\n## Accueil : textes écrits par les animations (ticket, chat, fenêtres)\n\nSource de l'arabe : src/home/text-js.ts. \`{n}\`, \`{s}\`, \`{name}\`… sont remplacés à l'affichage : ne pas les traduire.\n\n| Français | العربية |\n|---|---|\n`;
const flat = (o, p = "") => Object.entries(o).flatMap(([k, v]) => (typeof v === "string" ? [[p + k, v]] : flat(v, `${p}${k}.`)));
const frJs = Object.fromEntries(flat(homeJsText.fr)), arJs = Object.fromEntries(flat(homeJsText.ar));
for (const k of Object.keys(frJs)) { if (frJs[k] === arJs[k]) continue; total++; md += `| ${cell(decode(frJs[k]))} | ${cell(decode(arJs[k]))} |\n`; }

// textes du chat des questions (les questions et les réponses sont listées plus haut, dans la page d'accueil)
md += `\n## Accueil : textes du chat des questions\n\nSource de l'arabe : src/home/chat/chat-text.ts.\n\n| Français | العربية |\n|---|---|\n`;
const frChat = Object.fromEntries(flat(chatText.fr)), arChat = Object.fromEntries(flat(chatText.ar));
for (const k of Object.keys(frChat)) { if (frChat[k] === arChat[k] || seenAll.has(frChat[k] + "\u0000" + arChat[k])) continue; total++; md += `| ${cell(frChat[k])} | ${cell(arChat[k])} |\n`; }

// textes du ticket des fiches produits, dont ceux qui n'apparaissent qu'après un geste (rappels, erreurs, confirmation)
md += `\n## Fiches produits : textes du ticket et de l'interface\n\nSource de l'arabe : src/data/product-pages.ts (productUi). \`{n}\`, \`{p}\`, \`{u}\`… sont remplacés à l'affichage : ne pas les traduire.\n\n| Français | العربية |\n|---|---|\n`;
for (const v of Object.values(productUi).flat()) { const fr = decode(v.fr), ar = decode(v.ar); if (fr === ar || seenAll.has(fr + "\u0000" + ar)) continue; seenAll.add(fr + "\u0000" + ar); total++; md += `| ${cell(fr)} | ${cell(ar)} |\n`; }

md += `\n---\n\n${total} textes à relire.\n`;
writeFileSync(new URL("../src/data/ar-relecture.md", import.meta.url), md);
console.log(`src/data/ar-relecture.md : ${total} textes, ${PAGES.length} pages.`);
