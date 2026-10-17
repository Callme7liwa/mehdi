/* Vérifie les renvois dans les textes des pages conseils (src/data/problems.ts et problems.ar.ts), sans lancer le site.
   Usage : `npm run check:renvois`.

   Règle : aucune phrase de renvoi sans lien. Une phrase du type « Tout savoir : … », « Plus de détails : … »,
   « Lis aussi … » doit contenir un lien [libellé](/chemin) ; quand la page visée n'existe pas encore, on retire la
   phrase entière, et on la remet avec son lien à la création de la page.
   Vérifie aussi que chaque lien du texte mène à une page du site (fiche, page conseil, page de confiance, accueil, /soins),
   et que chaque renvoi [n] correspond à une source de la page. */
import { registerHooks } from "node:module";
// imports sans extension des fichiers de src/data (même résolution que check-overflow.mjs)
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { problems } = await import("../src/data/problems.ts");
const { problemsAr } = await import("../src/data/problems.ar.ts");
const { products } = await import("../src/data/products.ts");
const { trustPages } = await import("../src/data/pages.ts");

const pages = new Set(["/", "/soins", ...products.map((p) => `/soins/${p.slug}`), ...problems.map((p) => `/${p.slug}`), ...trustPages.map((p) => p.path)]);
const RENVOI = /^(Tout savoir|Plus de détails|Pour en savoir plus|En savoir plus|Lis aussi|Lire aussi|Voir aussi|La liste complète|Le détail|Bien l'appliquer|Pour comprendre)\b/i;
const LINK = /\[[^\]]+\]\((\/[^)]*)\)/g;

let fails = 0, links = 0, renvois = 0;
const fail = (where, msg) => { fails++; console.log(`✗ ${where} : ${msg}`); };

/** Tous les textes d'une page conseil, avec l'endroit où ils se trouvent. */
function* texts(p) {
  for (const [i, t] of p.intro.entries()) yield [`intro ${i + 1}`, t];
  const blocks = (where, list) => list.flatMap((b, i) => (typeof b === "string" ? [[`${where} §${i + 1}`, b]] : ("steps" in b ? b.steps : b.list).map((li, k) => [`${where} §${i + 1}.${k + 1}`, li])));
  for (const s of p.sections) yield* blocks(`« ${s.h2} »`, s.body);
  yield* typeof p.advice === "string" ? [["encadré", p.advice]] : blocks("encadré", p.advice);
  for (const f of p.faq) for (const a of f.a) yield [`FAQ « ${f.q} »`, a];
}

for (const [locale, list] of [["fr", problems], ["ar", problemsAr]]) {
  for (const p of list) {
    const page = `${locale === "ar" ? "/ar" : ""}/${p.slug}`;
    for (const [where, text] of texts(p)) {
      for (const m of text.matchAll(LINK)) {
        links++;
        const path = m[1].split("#")[0];
        if (!pages.has(path)) fail(`${page}, ${where}`, `lien vers ${m[1]}, page qui n'existe pas`);
        if (locale === "ar" && path.startsWith("/") && !path.startsWith("/soins") && problems.some((x) => `/${x.slug}` === path) && !problemsAr.some((x) => `/${x.slug}` === path))
          fail(`${page}, ${where}`, `lien vers ${m[1]}, page sans version arabe`);
      }
      // une phrase = jusqu'au point, au point d'interrogation ou d'exclamation (les liens restent dans leur phrase)
      for (const sentence of text.split(/(?<=[.!?])\s+/)) {
        const plain = sentence.replace(/^\*\*[^*]+\*\*\s*/, "");
        if (!RENVOI.test(plain)) continue;
        renvois++;
        if (!LINK.test(sentence)) fail(`${page}, ${where}`, `phrase de renvoi sans lien : « ${sentence} »`);
        LINK.lastIndex = 0;
      }
      for (const m of text.matchAll(/\[(\d+)\](?!\()/g)) if (!p.sources || +m[1] < 1 || +m[1] > p.sources.length) fail(`${page}, ${where}`, `renvoi [${m[1]}] sans source correspondante`);
    }
  }
}

console.log(fails ? `\n${fails} problème(s).` : `Renvois : ${renvois} phrase(s) de renvoi, toutes avec un lien ; ${links} lien(s) dans le texte, tous vers une page du site.`);
process.exit(fails ? 1 : 0);
