/* Exporte docs/validation-client.md en PDF à envoyer au client : docs/validation-client.pdf.
   Usage : `npm run validation:pdf` (après `npm run validation`). A4 paysage, polices du site intégrées.
   Pour le client, les colonnes techniques (« Source », « Fichier ») sont retirées ; chaque ligne garde deux cases
   à cocher (Validé / À modifier) et une zone de commentaire. */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("../", import.meta.url);
const md = readFileSync(new URL("docs/validation-client.md", root), "utf8");
const font = (file) => `url(data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString("base64")}) format("woff2")`;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s.replace(/\\\|/g, "|"))
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  .replace(/`([^`]+)`/g, "<code>$1</code>");
const cells = (line) => line.trim().replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => c.trim());
const TECH = /^(Source|Fichier)/;

let html = "", para = [], n = 0;
const flush = () => { if (para.length) html += `<p>${inline(para.join(" "))}</p>`; para = []; };
const lines = md.split("\n");
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // la note « fichier généré… » et le chemin du fichier arabe concernent l'équipe, pas le client
  if (l.startsWith("> ") || l.includes("ar-relecture.md")) { flush(); continue; }
  const h = l.match(/^(#{1,4}) (.*)/);
  // « Ce qu'on attend de toi » reste seule sur la première page : la partie 1 commence une nouvelle page
  if (h) { flush(); const pb = h[1] === "##" && /^1\. /.test(h[2]) ? ' class="pb"' : ""; html += `<h${h[1].length}${pb}>${inline(h[2])}</h${h[1].length}>`; continue; }
  if (l.startsWith("|")) {
    flush();
    const head = cells(l); i++; // ligne de séparation
    const rows = [];
    while (lines[i + 1]?.startsWith("|")) rows.push(cells(lines[++i]));
    const keep = head.map((c, k) => k < head.length - 2 && !TECH.test(c));
    html += `<table><thead><tr>${head.map((c, k) => (keep[k] ? `<th>${inline(c)}</th>` : "")).join("")}<th class="ck">Validé</th><th class="ck">À modifier</th><th class="cm">Commentaire / correction</th></tr></thead><tbody>`;
    for (const r of rows) {
      n++;
      html += `<tr>${r.map((c, k) => (keep[k] ? `<td${k === 0 ? ' class="k"' : ""}>${inline(c)}</td>` : "")).join("")}<td class="ck"><span class="box"></span></td><td class="ck"><span class="box"></span></td><td class="cm"></td></tr>`;
    }
    html += "</tbody></table>";
    continue;
  }
  if (/^\d+\. /.test(l)) { // liste numérotée
    flush(); const items = [l];
    while (/^\d+\. /.test(lines[i + 1] || "")) items.push(lines[++i]);
    html += `<ol>${items.map((x) => `<li>${inline(x.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
    continue;
  }
  if (!l.trim()) { flush(); continue; }
  para.push(l);
}
flush();

const page = `<!doctype html><html lang="fr"><meta charset="utf-8"><style>
@font-face{font-family:"DM Sans";font-weight:100 1000;src:${font("dm-sans-latin-v1.woff2")};unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:"DM Sans";font-weight:100 1000;src:${font("dm-sans-latin-ext-v1.woff2")};unicode-range:U+0100-02BA,U+02BD-02C5,U+1E00-1EFF,U+2020,U+20A0-20C4,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"Bodoni Moda";font-weight:400 900;src:${font("bodoni-moda-latin-v1.woff2")}}
@page{size:A4 landscape;margin:14mm 12mm 16mm}
:root{--ink:#3b0d12;--red:#c8202f;--line:#d9c9bd;--soft:#faf4ee}
body{font:9.2pt/1.4 "DM Sans",Arial,sans-serif;color:#2a1a1a;margin:0}
h1{font:600 22pt/1.15 "Bodoni Moda",serif;color:var(--ink);margin:0 0 8pt}
h2{font:600 14pt/1.2 "Bodoni Moda",serif;color:var(--ink);margin:18pt 0 6pt;padding-bottom:3pt;border-bottom:1.5pt solid var(--red);break-after:avoid}
h3{font-size:10.5pt;color:var(--red);margin:12pt 0 4pt;break-after:avoid}
h4{font-size:9.6pt;color:var(--ink);margin:10pt 0 4pt;break-after:avoid}
p{margin:0 0 5pt}
h2.pb{break-before:page}
ol{margin:0 0 8pt;padding-inline-start:18pt}ol li{margin:0 0 4pt}
code{font-size:8.5pt;background:var(--soft);padding:0 2pt}
table{width:100%;border-collapse:collapse;margin:4pt 0 8pt;table-layout:auto}
thead{display:table-header-group}
tr{break-inside:avoid}
th{background:var(--ink);color:#fff;font-weight:600;text-align:left;padding:4pt 5pt;font-size:8.6pt}
td{border:0.6pt solid var(--line);padding:5pt;vertical-align:top}
tbody tr:nth-child(even) td:not(.cm){background:var(--soft)}
td.k{font-weight:600;color:var(--ink);width:22%}
.ck{width:46pt;text-align:center}
th.ck{font-size:7.8pt}
.box{display:inline-block;width:11pt;height:11pt;border:1pt solid var(--ink);border-radius:2pt;margin-top:1pt}
.cm{width:24%}
td.cm{background:#fff;min-height:28pt;height:30pt}
.intro{border:1pt solid var(--line);background:var(--soft);padding:8pt 10pt;margin-bottom:10pt}
.sign{margin-top:22pt;display:flex;gap:30pt}.sign div{flex:1;border-top:0.8pt solid var(--ink);padding-top:4pt;font-size:8.6pt}
</style><body>${html.replace(/(<\/h1>)([\s\S]*?)(<h2>)/, '$1<div class="intro">$2</div>$3')}
<div class="sign"><div>Nom et signature du client</div><div>Nom et signature du pharmacien</div><div>Date</div></div>
</body></html>`;

const b = await chromium.launch();
const pg = await b.newPage();
await pg.setContent(page, { waitUntil: "load" });
await pg.evaluate(() => document.fonts.ready);
await pg.pdf({
  path: new URL("docs/validation-client.pdf", root).pathname, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: `<div style="font:7pt Arial;color:#777;width:100%;padding:0 12mm;display:flex;justify-content:space-between"><span>OTAGE · Validation client</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
await b.close();
console.log(`docs/validation-client.pdf : ${n} lignes à valider.`);
