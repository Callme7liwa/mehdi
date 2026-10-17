/* Exporte les brouillons de docs/brouillons/*.md en PDF de relecture pour le pharmacien : docs/brouillons/relecture-pharmacien.pdf.
   Usage : `node scripts/brouillons-pdf.mjs` (HTML=fichier.html pour écrire aussi la page HTML). A4 portrait, polices du site intégrées (même mise en page que validation-pdf.mjs).
   Une ligne par bloc (title, meta description, paragraphe, puce, étape, question de FAQ, source), avec deux cases
   (Validé / À modifier) et une zone de commentaire. Les lignes « > » (fiche de la page, notes) sont des informations, sans case.
   Rien de ces brouillons n'est dans le site. */
import { createRequire } from "node:module";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("../", import.meta.url);
const dir = new URL("docs/brouillons/", root);
const font = (file) => `url(data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString("base64")}) format("woff2")`;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Gras, liens (interne : souligné ; externe : l'adresse en clair), marqueurs [À VALIDER] et [SOURCE À TROUVER] en pastille. */
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  .replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, '<u>$1</u> <span class="url">($2)</span>')
  .replace(/(https?:\/\/[^\s<]+)/g, '<span class="url">$1</span>')
  .replace(/\[À VALIDER\]/g, '<span class="tag v">À VALIDER</span>')
  .replace(/\[SOURCE À TROUVER\]/g, '<span class="tag s">SOURCE À TROUVER</span>');

const files = readdirSync(dir).filter((f) => /^\d+-.*\.md$/.test(f)).sort();
let html = "", total = 0;
const box = '<td class="ck"><span class="box"></span></td><td class="ck"><span class="box"></span></td><td class="cm"></td>';

for (const f of files) {
  const lines = readFileSync(new URL(f, dir), "utf8").split("\n");
  let rows = "", info = [], n = 0, inSources = false;
  const row = (label, text, cls = "") => { n++; rows += `<tr${cls ? ` class="${cls}"` : ""}><td class="k">${label}</td><td>${text}</td>${box}</tr>`; };
  const head = (text) => { rows += `<tr class="h"><td colspan="5">${text}</td></tr>`; };
  const note = (text) => { rows += `<tr class="n"><td colspan="5">${text}</td></tr>`; };
  let h1 = "", para = [];
  const flush = () => { if (para.length) row(inSources ? "Source" : "§", inline(para.join(" "))); para = []; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("# ")) { h1 = l.slice(2); continue; }
    if (l.startsWith("> ")) {
      flush();
      const t = l.slice(2);
      if (!rows) info.push(inline(t)); else note(/^Encadré/.test(t) ? `<b>${inline(t)}</b>` : inline(t));
      continue;
    }
    const h2 = l.match(/^## (.*)/);
    if (h2) { flush(); inSources = h2[1] === "Sources"; if (inSources) head(inline(h2[1])); else row("H2", inline(h2[1]), "h2"); continue; }
    const meta = l.match(/^(Title|Meta description) : (.*)/);
    if (meta) { flush(); row(meta[1] === "Title" ? "Title" : "Meta", `${inline(meta[2])} <span class="url">(${meta[2].length} car.)</span>`); continue; }
    const li = l.match(/^(?:- |(\d+)\. )(.*)/);
    if (li) { flush(); row(inSources ? `Source ${li[1] ?? ""}`.trim() : li[1] ? `Étape ${li[1]}` : "Puce", inline(li[2])); continue; }
    const q = l.match(/^\*\*(.+\?)\*\*$/);
    if (q) { flush(); const a = []; while (lines[i + 1]?.trim() && !lines[i + 1].startsWith("**")) a.push(lines[++i]); row("FAQ", `<b>${inline(q[1])}</b><br>${inline(a.join(" "))}`); continue; }
    if (!l.trim()) { flush(); continue; }
    para.push(l);
  }
  flush();
  total += n;
  html += `<section><h1>${inline(h1)}</h1><div class="intro">${info.map((x) => `<p>${x}</p>`).join("")}</div>
<table><thead><tr><th class="k">Bloc</th><th>Texte proposé</th><th class="ck">Validé</th><th class="ck">À modifier</th><th class="cm">Commentaire / correction</th></tr></thead><tbody>${rows}</tbody></table>
<div class="sign"><div>Relu par (nom, qualité)</div><div>Signature</div><div>Date</div></div><p class="cnt">${n} blocs à relire.</p></section>`;
}

const page = `<!doctype html><html lang="fr"><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";font-weight:100 1000;src:${font("dm-sans-latin-v1.woff2")};unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:"DM Sans";font-weight:100 1000;src:${font("dm-sans-latin-ext-v1.woff2")};unicode-range:U+0100-02BA,U+02BD-02C5,U+1E00-1EFF,U+2020,U+20A0-20C4,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"Bodoni Moda";font-weight:400 900;src:${font("bodoni-moda-latin-v1.woff2")}}
@page{size:A4;margin:14mm 11mm 16mm}
:root{--ink:#3b0d12;--red:#c8202f;--line:#d9c9bd;--soft:#faf4ee}
body{font:8.8pt/1.4 "DM Sans",Arial,sans-serif;color:#2a1a1a;margin:0}
section+section{break-before:page}
h1{font:600 18pt/1.15 "Bodoni Moda",serif;color:var(--ink);margin:0 0 8pt}
.intro{border:1pt solid var(--line);background:var(--soft);padding:6pt 9pt;margin-bottom:8pt}.intro p{margin:0 0 3pt}
.cover{border:1pt solid var(--line);padding:10pt 12pt;margin-bottom:10pt}.cover p{margin:0 0 5pt}
table{width:100%;border-collapse:collapse;margin:4pt 0 8pt}
thead{display:table-header-group}
tr{break-inside:avoid}
th{background:var(--ink);color:#fff;font-weight:600;text-align:left;padding:4pt 5pt;font-size:8pt}
td{border:0.6pt solid var(--line);padding:4.5pt 5pt;vertical-align:top}
td.k,th.k{width:48pt;font-weight:600;color:var(--ink);font-size:7.8pt}
tr.h td{background:var(--ink);color:#fff;font:600 10pt/1.3 "Bodoni Moda",serif;border-color:var(--ink);break-after:avoid}
tr.h2 td{background:#f3e6dc;font:600 9.6pt/1.3 "DM Sans",sans-serif;color:var(--ink);break-after:avoid}tr.h2 td.cm{background:#fff}
tr.n td{background:var(--soft);font-size:8pt;color:#5a4040;font-style:italic}
.ck{width:40pt;text-align:center}th.ck{font-size:7.2pt}
.box{display:inline-block;width:11pt;height:11pt;border:1pt solid var(--ink);border-radius:2pt;margin-top:1pt}
.cm{width:24%}td.cm{background:#fff}
.url{color:#7a6a6a;font-size:7.4pt;word-break:break-all}
.tag{display:inline-block;font-size:6.8pt;font-weight:700;padding:0 3pt;border-radius:2pt;letter-spacing:.02em;white-space:nowrap}
.tag.v{background:#fde3e5;color:var(--red);border:0.6pt solid var(--red)}
.tag.s{background:#fff4d6;color:#8a5a00;border:0.6pt solid #c9922e}
.sign{margin-top:18pt;display:flex;gap:24pt}.sign div{flex:1;border-top:0.8pt solid var(--ink);padding-top:4pt;font-size:8.2pt}
.cnt{font-size:7.6pt;color:#777;margin-top:6pt}
</style><body>
<section><h1>Relecture pharmacien : 4 brouillons « taches brunes du visage »</h1>
<div class="cover">
<p><b>Pour Dr Seddiki El Mehdi, pharmacien.</b> Quatre textes en préparation, d'après la carte thématique (docs/carte-thematique.md) : le guide « Taches brunes du visage », puis Mélasma, Taches d'acné et Routine matin et soir. <b>Aucun n'est en ligne.</b> Chaque page restera hors de Google (noindex) jusqu'à ta validation ; la mention « Relu par » n'apparaîtra qu'ensuite, avec la date de ta relecture.</p>
<p><b>Comment relire.</b> Une ligne par bloc : coche <b>Validé</b> ou <b>À modifier</b>, et écris la correction à droite. <span class="tag v">À VALIDER</span> = la phrase affirme un effet (sur la peau ou d'un soin) : merci de la valider ou de la corriger. <span class="tag s">SOURCE À TROUVER</span> = aucune source vérifiée, la phrase ne sera pas publiée sans une source. Les chiffres [1], [2]… renvoient aux sources listées en fin de chaque texte : merci de les relire aussi.</p>
<p><b>Règles suivies.</b> Aucun délai ni chiffre de résultat ; pas de promesse de disparition ; aucun des mots « blanchir », « éclaircir » ni leurs équivalents ; grossesse et allaitement : toujours l'avis du médecin ou du pharmacien. Les rôles des ingrédients (alpha-arbutine, niacinamide, AHA) attendent encore ta validation dans le document de validation client, partie 4.</p>
</div></section>
${html}</body></html>`;

// HTML=chemin : écrit aussi la page HTML, pour vérifier le rendu
if (process.env.HTML) writeFileSync(process.env.HTML, page);
const b = await chromium.launch();
const pg = await b.newPage();
await pg.setContent(page, { waitUntil: "load" });
await pg.evaluate(() => document.fonts.ready);
await pg.pdf({
  path: new URL("relecture-pharmacien.pdf", dir).pathname, format: "A4", printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: `<div style="font:7pt Arial;color:#777;width:100%;padding:0 11mm;display:flex;justify-content:space-between"><span>OTAGE · Brouillons, relecture pharmacien · non publiés</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
await b.close();
console.log(`docs/brouillons/relecture-pharmacien.pdf : ${files.length} textes, ${total} blocs à relire.`);
