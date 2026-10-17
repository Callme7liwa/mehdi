/* Génère docs/relecture-pharmacien.docx : le document de relecture des contenus « santé » par le pharmacien.
   Usage : lancer le site (npm run build && npm run start), puis `npm run relecture:pharmacien`
   (ou BASE=http://localhost:3000 node scripts/relecture-pharmacien.mjs).

   Le contenu est lu dans les pages servies : le document montre exactement ce que le site affiche.
   - Partie 1 : les 4 pages conseils en français, complètes (titres, textes, encadré, soins cités, FAQ).
   - Partie 2 : les questions de santé de la FAQ générale (ce sont aussi les réponses du chat de l'accueil).
   - Partie 3 : les questions des fiches produits (usage, précautions).
   - Annexe : les mêmes contenus en arabe.
   Chaque section est suivie d'un cadre « Commentaires du pharmacien ». */
import { mkdirSync, writeFileSync } from "node:fs";
import { AlignmentType, BorderStyle, Document, HeadingLevel, Packer, PageBreak, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";

const BASE = process.env.BASE || "http://localhost:3000";
// le pilier « taches brunes du visage » a sa propre relecture (docs/brouillons/relecture-pharmacien.pdf)
const ADVICE = [["cernes", "Cernes"], ["taches-acne", "Taches d'acné"]];
const PRODUCTS = ["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux"];
/* questions de la FAQ générale qui touchent à la santé (position dans src/data/faq.ts, identique en FR et en AR) */
const HEALTH = [6, 7, 8, 9, 10, 11, 12]; // routine, ingrédients, résultats, écran solaire, peau sensible, grossesse, contour des yeux

const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/[⁦⁩]/g, "");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Blocs de texte d'une zone de page, dans l'ordre : { tag, text }. */
function blocks(html) {
  const out = [];
  const clean = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->/g, "");
  for (const m of clean.matchAll(/<(h1|h2|h3|p|li|summary|dt|dd)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    if (/<(p|li|h2|h3|ul|ol)\b/.test(m[2])) continue; // conteneur : ses enfants sont lus à part
    const t = text(m[2]);
    if (t) out.push({ tag: m[1], text: t });
  }
  return out;
}
const page = async (path) => { const r = await fetch(BASE + path); if (!r.ok) throw new Error(`${path} : HTTP ${r.status}`); return r.text(); };
const main = (html) => html.slice(html.indexOf("<main"), html.indexOf("</main>"));
const meta = (html) => ({ title: decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || ""), description: decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "") });
/** Questions et réponses d'une liste <details> (FAQ). */
const faqOf = (html) => [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map((m) => ({ q: text(m[1]), a: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((x) => text(x[1])) }));

/* ---------- mise en forme ---------- */
const FONT = "Arial";
const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, ...o });
const para = (t, o = {}, rtl = false) => new Paragraph({ children: [run(t, { rightToLeft: rtl, ...(o.run || {}) })], spacing: { after: 120 }, bidirectional: rtl, alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT, ...o, run: undefined });
const heading = (t, level, rtl = false) => new Paragraph({ children: [run(t, { bold: true, size: level === HeadingLevel.HEADING_1 ? 34 : level === HeadingLevel.HEADING_2 ? 28 : 24, color: "4A0D16", rightToLeft: rtl })], heading: level, spacing: { before: 280, after: 140 }, bidirectional: rtl, alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT });
const bullet = (t, rtl = false) => new Paragraph({ children: [run(t, { rightToLeft: rtl })], bullet: { level: 0 }, spacing: { after: 60 }, bidirectional: rtl, alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT });
const small = (t) => new Paragraph({ children: [run(t, { size: 18, color: "666666", italics: true })], spacing: { after: 100 } });
const border = { style: BorderStyle.SINGLE, size: 8, color: "B8A9A0" };
/** Cadre vide à remplir : « Commentaires du pharmacien ». */
const comments = (label = "Commentaires du pharmacien") => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [new TableRow({ children: [new TableCell({
    borders: { top: border, bottom: border, left: border, right: border },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [new Paragraph({ children: [run(label, { bold: true, size: 20, color: "4A0D16" })] }), new Paragraph({ children: [run("☐ Validé tel quel     ☐ À corriger (préciser ci-dessous)", { size: 20 })], spacing: { before: 80, after: 80 } }), ...Array.from({ length: 4 }, () => new Paragraph({ children: [run(" ")], spacing: { after: 160 } }))],
  })] })],
});
const gap = () => new Paragraph({ children: [run("")], spacing: { after: 160 } });

/** Une page conseil complète, découpée en sections (un cadre de commentaires par section). */
async function advicePage(slug, label, locale) {
  const rtl = locale === "ar", path = `${rtl ? "/ar" : ""}/${slug}`;
  const html = await page(path), m = meta(html), body = main(html);
  const out = [heading(rtl ? text((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || label) : label, HeadingLevel.HEADING_2, rtl), small(`Adresse : ${path}`)];
  out.push(para(`${rtl ? "عنوان الصفحة في غوغل" : "Titre affiché dans Google"} : ${m.title}`, {}, rtl), para(`${rtl ? "الوصف في غوغل" : "Description affichée dans Google"} : ${m.description}`, {}, rtl));
  const faqStart = body.search(/<details/);
  const sections = []; let cur = { title: rtl ? "المقدمة" : "Introduction", items: [] };
  for (const b of blocks(faqStart > 0 ? body.slice(0, faqStart) : body)) {
    if (b.tag === "h2" || b.tag === "h3") { if (cur.items.length || cur.title) sections.push(cur); cur = { title: b.text, items: [], level: b.tag }; }
    else cur.items.push(b);
  }
  sections.push(cur);
  for (const s of sections.filter((x) => x.items.length || x.level === "h2")) {
    out.push(heading(s.title, HeadingLevel.HEADING_3, rtl));
    for (const it of s.items) out.push(it.tag === "li" ? bullet(it.text, rtl) : it.tag === "h1" ? para(it.text, { run: { bold: true } }, rtl) : para(it.text, {}, rtl));
    if (s.items.length) out.push(comments(rtl ? "Commentaires du pharmacien (version arabe)" : undefined), gap());
  }
  const faq = faqOf(body);
  if (faq.length) {
    out.push(heading(rtl ? "أسئلة الصفحة" : "Questions de la page", HeadingLevel.HEADING_3, rtl));
    for (const f of faq) { out.push(para(f.q, { run: { bold: true } }, rtl)); f.a.forEach((a) => out.push(para(a, {}, rtl))); }
    out.push(comments(rtl ? "Commentaires du pharmacien (version arabe)" : undefined), gap());
  }
  return out;
}

async function generalFaq(locale) {
  const rtl = locale === "ar";
  const all = faqOf(await page(rtl ? "/ar" : "/"));
  const out = [];
  for (const i of HEALTH) { const f = all[i]; if (!f) continue; out.push(para(f.q, { run: { bold: true } }, rtl)); f.a.forEach((a) => out.push(para(a, {}, rtl))); out.push(comments(rtl ? "Commentaires du pharmacien (version arabe)" : undefined), gap()); }
  return out;
}
async function productFaqs(locale) {
  const rtl = locale === "ar", out = [];
  for (const slug of PRODUCTS) {
    const html = await page(`${rtl ? "/ar" : ""}/soins/${slug}`), body = main(html);
    out.push(heading(text((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || slug), HeadingLevel.HEADING_3, rtl), small(`Adresse : ${rtl ? "/ar" : ""}/soins/${slug}`));
    for (const f of faqOf(body)) { out.push(para(f.q, { run: { bold: true } }, rtl)); f.a.forEach((a) => out.push(para(a, {}, rtl))); }
    out.push(comments(rtl ? "Commentaires du pharmacien (version arabe)" : undefined), gap());
  }
  return out;
}

const today = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
const children = [
  new Paragraph({ children: [run("OTAGE", { bold: true, size: 44, color: "D42235" })], spacing: { after: 80 } }),
  heading("Relecture des contenus santé par le pharmacien", HeadingLevel.HEADING_1),
  para(`Document généré le ${today} à partir du site (version de travail, non publiée).`),
  para("Relecteur : Dr Seddiki El Mehdi, pharmacien."),
  heading("Comment relire", HeadingLevel.HEADING_3),
  bullet("Chaque section est suivie d'un cadre « Commentaires du pharmacien » : cocher « Validé tel quel » ou « À corriger » et noter la correction."),
  bullet("Points à vérifier : exactitude scientifique, absence de promesse médicale, conseils de prudence (essai sur une petite zone, avis médical), grossesse et allaitement."),
  bullet("Vocabulaire : le site parle d'« atténuer les taches » et d'« unifier le teint », jamais de blanchiment de la peau."),
  bullet("Ces pages restent hors de Google tant que la relecture n'est pas confirmée. Une fois validées, elles afficheront « Relu par Dr Seddiki El Mehdi, pharmacien » avec la date."),
  heading("Questions ouvertes pour le pharmacien", HeadingLevel.HEADING_3),
  bullet("Grossesse et allaitement : le site renvoie toujours vers le médecin ou le pharmacien avant d'utiliser un soin OTAGE. Faut-il nommer des soins ou des ingrédients précis (alpha-arbutine, AHA, niacinamide, caféine) à éviter ou à autoriser ?"),
  bullet("Crème anti-taches (AHA) : faut-il ajouter une précaution sur le soleil ou sur les peaux irritées ?"),
  bullet("Peau qui a encore des boutons : la consigne « demander l'avis d'un dermatologue ou d'un pharmacien » est-elle suffisante ?"),
  bullet("Délais : le site ne donne aucun délai de résultat. Souhaitez-vous indiquer un ordre de grandeur ?"),
  comments("Réponses et remarques générales"),
  new Paragraph({ children: [new PageBreak()] }),
  heading("Partie 1 — Pages conseils (français)", HeadingLevel.HEADING_1),
];
for (const [slug, label] of ADVICE) { children.push(...(await advicePage(slug, label, "fr")), new Paragraph({ children: [new PageBreak()] })); }
children.push(heading("Partie 2 — Questions de santé de la FAQ (ce sont aussi les réponses du chat de l'accueil)", HeadingLevel.HEADING_1), ...(await generalFaq("fr")), new Paragraph({ children: [new PageBreak()] }));
children.push(heading("Partie 3 — Questions des fiches produits", HeadingLevel.HEADING_1), ...(await productFaqs("fr")), new Paragraph({ children: [new PageBreak()] }));
children.push(heading("Annexe — Version arabe", HeadingLevel.HEADING_1), small("Mêmes contenus, dans le même ordre. La traduction arabe est aussi à relire par un locuteur natif."));
for (const [slug, label] of ADVICE) { children.push(...(await advicePage(slug, label, "ar")), new Paragraph({ children: [new PageBreak()] })); }
children.push(heading("الأسئلة الصحية في الأسئلة الشائعة (وهي أيضًا أجوبة المحادثة)", HeadingLevel.HEADING_2, true), ...(await generalFaq("ar")));
children.push(heading("أسئلة صفحات المنتجات", HeadingLevel.HEADING_2, true), ...(await productFaqs("ar")));

const doc = new Document({ creator: "OTAGE", title: "Relecture des contenus santé par le pharmacien", styles: { default: { document: { run: { font: FONT, size: 22 } } } }, sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children }] });
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
const file = new URL("../docs/relecture-pharmacien.docx", import.meta.url);
writeFileSync(file, await Packer.toBuffer(doc));
console.log(`docs/relecture-pharmacien.docx : ${children.length} blocs.`);
