/* Vérifie les renvois dans les textes des pages conseils (src/data/problems.ts et problems.ar.ts), sans lancer le site.
   Usage : `npm run check:renvois`.
     --brouillons                       vérifie aussi les liens des brouillons (docs/brouillons/*.md) : tout lien vers une
                                        page pas encore publiée doit porter la marque [LIEN EN ATTENTE].
     --publier docs/brouillons/x.md     affiche le texte du brouillon prêt à publier : une phrase de renvoi dont tous les
                                        liens sont en attente est retirée entière ; ailleurs, un lien en attente devient du
                                        texte simple. Les marques [À VALIDER] et [SOURCE À TROUVER] restent visibles.
       --aussi /a,/b                    pages publiées en même temps (le même lot) : leurs liens en attente deviennent
                                        des liens actifs.

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
// une formule de renvoi suivie de « : » (« Tout savoir : … », « Le détail, étape par étape : … »), ou « Lis aussi … »
const RENVOI = /^(?:(?:Tout savoir|Plus de détails|Pour en savoir plus|En savoir plus|La liste complète|Le détail|Bien l'appliquer|Pour comprendre)[^.:?!]{0,60} :|(?:Lis|Lire|Voir) aussi\b)/i;
const LINK = /\[[^\]]+\]\((\/[^)]*)\)/g;

const args = process.argv.slice(2);
const PENDING = "[LIEN EN ATTENTE]";
const DRAFT_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)(\[LIEN EN ATTENTE\])?/g;
// --aussi : pages du lot publiées en même temps que le brouillon
const alsoArg = args.includes("--aussi") ? args[args.indexOf("--aussi") + 1] : "";
for (const path of alsoArg.split(",").filter(Boolean)) pages.add(path);
const published = (path) => pages.has(path.split("#")[0]);

/** Phrase de renvoi : elle commence par une formule de renvoi (« Tout savoir : … »), ou n'est faite que d'un intitulé
    court suivi de liens (« Plus de conseils : [a](/x) et [b](/y). »). Le gras et les marques de relecture en tête sont ignorés. */
const ONLY_LINKS = /^[^:\[\]]{1,60} : (?:(?:lis|lire|voir|consulte)(?: aussi)? )?(?:\[[^\]]+\]\(\/[^)\s]*\)(?:\[LIEN EN ATTENTE\])?(?:, | et |\s)*)+[.!?]?$/i;
function isRenvoiSentence(sentence) {
  const plain = sentence.replace(/^\*\*[^*]+\*\*\s*/, "").replace(/^(\[(À VALIDER|SOURCE À TROUVER)[^\]]*\]\s*)+/, "").trim();
  return RENVOI.test(plain) || ONLY_LINKS.test(plain);
}

/** Texte d'un brouillon prêt à publier : liens en attente retirés (voir l'en-tête). */
function publish(md) {
  const warnings = [];
  const out = md.split("\n").map((line) => {
    if (line.startsWith(">") || !line.includes(PENDING)) return line;
    const sentences = line.split(/(?<=[.!?])\s+/);
    const drop = new Set();
    sentences.forEach((sentence, k) => {
      const all = [...sentence.matchAll(DRAFT_LINK)];
      const pending = all.filter((m) => m[3] && !published(m[2]));
      const isRenvoi = isRenvoiSentence(sentence);
      if (isRenvoi && pending.length && pending.length === all.length) {
        drop.add(k); // phrase de renvoi sans lien restant : retirée
        // avec la courte question qui l'annonce (« Enceinte ? Lis … »)
        if (k > 0 && /\?$/.test(sentences[k - 1]) && sentences[k - 1].split(/\s+/).length <= 3) drop.add(k - 1);
      } else if (isRenvoi && pending.length) warnings.push(`phrase de renvoi gardée, avec un lien en attente devenu du texte : « ${sentence} »`);
    });
    const kept = sentences.filter((_, k) => !drop.has(k));
    // lien en attente : actif si sa page est publiée (ou publiée dans le même lot), sinon du texte simple
    return kept.join(" ").replace(DRAFT_LINK, (m, label, path, mark) => (!mark ? m : published(path) ? `[${label}](${path})` : label));
  });
  return { text: out.join("\n").replace(/\n{3,}/g, "\n\n"), warnings };
}

if (args[0] === "--publier") {
  const { readFileSync } = await import("node:fs");
  const { text, warnings } = publish(readFileSync(args[1], "utf8"));
  console.log(text);
  for (const w of warnings) console.error(`⚠ ${w}`);
  process.exit(0);
}

let fails = 0, links = 0, renvois = 0;
const fail = (where, msg) => { fails++; console.log(`✗ ${where} : ${msg}`); };

/** Tous les textes d'une page conseil, avec l'endroit où ils se trouvent. */
function* texts(p) {
  for (const [i, t] of p.intro.entries()) yield [`intro ${i + 1}`, t];
  for (const [i, t] of (p.essentials ?? []).entries()) yield [`l'essentiel ${i + 1}`, t];
  const items = (b) => ("figure" in b ? [] : "steps" in b ? b.steps : "checklist" in b ? b.checklist : "table" in b ? [...b.table.head, ...b.table.rows.flat()] : b.list);
  const blocks = (where, list) => list.flatMap((b, i) => (typeof b === "string" ? [[`${where} §${i + 1}`, b]] : items(b).map((li, k) => [`${where} §${i + 1}.${k + 1}`, li])));
  for (const s of p.sections) yield* blocks(`« ${s.h2} »`, s.body);
  yield* typeof p.advice === "string" ? [["encadré", p.advice]] : blocks("encadré", p.advice);
  if (p.maroc) yield* blocks("encadré « Au Maroc »", p.maroc);
  if (p.solution) yield* blocks(`encadré « ${p.solution.title} »`, p.solution.body);
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
        if (!isRenvoiSentence(sentence)) continue;
        renvois++;
        if (!LINK.test(sentence)) fail(`${page}, ${where}`, `phrase de renvoi sans lien : « ${sentence} »`);
        LINK.lastIndex = 0;
      }
      for (const m of text.matchAll(/\[(\d+)\](?!\()/g)) if (!p.sources || +m[1] < 1 || +m[1] > p.sources.length) fail(`${page}, ${where}`, `renvoi [${m[1]}] sans source correspondante`);
    }
  }
}

let draftLinks = 0, draftPending = 0;
if (args.includes("--brouillons")) {
  const { readFileSync, readdirSync } = await import("node:fs");
  const dir = new URL("../docs/brouillons/", import.meta.url);
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    readFileSync(new URL(f, dir), "utf8").split("\n").forEach((line, i) => {
      if (line.startsWith(">")) return; // brief et notes : pas publiés
      for (const m of line.matchAll(DRAFT_LINK)) {
        draftLinks++;
        if (m[3]) draftPending++;
        if (!published(m[2]) && !m[3]) fail(`docs/brouillons/${f}:${i + 1}`, `lien vers ${m[2]}, page pas encore publiée, sans ${PENDING}`);
        // une marque sur une page publiée depuis n'est pas une erreur : --publier en fait un lien actif
      }
    });
  }
}

console.log(fails ? `\n${fails} problème(s).` : `Renvois : ${renvois} phrase(s) de renvoi, toutes avec un lien ; ${links} lien(s) dans le texte, tous vers une page du site.${args.includes("--brouillons") ? ` Brouillons : ${draftLinks} lien(s), dont ${draftPending} en attente, tous marqués correctement.` : ""}`);
process.exit(fails ? 1 : 0);
