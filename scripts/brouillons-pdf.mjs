/* Exporte les brouillons de docs/brouillons/*.md en PDF de relecture pour le pharmacien.
   Usage : `node scripts/brouillons-pdf.mjs [lot]` (HTML=fichier.html pour écrire aussi la page HTML).
     lot 1 (par défaut) : docs/brouillons/relecture-pharmacien.pdf (pilier, mélasma, acné, routine)
     lot 2              : docs/brouillons/relecture-lot-2.pdf (sommaire, consignes, puis les pages par priorité)
   A4 portrait, polices du site intégrées (même mise en page que validation-pdf.mjs).
   Une ligne par bloc (title, meta description, paragraphe, puce, étape, ligne de tableau, case, question de FAQ, source),
   avec deux cases (Validé / À modifier) et une zone de commentaire. Les lignes « > » du brief et les notes sont des
   informations, sans case. « L'avis du pharmacien » devient une zone d'écriture ; les versions A / B se terminent par
   une case de choix bien visible. Rien de ces brouillons n'est dans le site. */
import { createRequire } from "node:module";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("../", import.meta.url);
const dir = new URL("docs/brouillons/", root);
const font = (file) => `url(data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString("base64")}) format("woff2")`;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Gras, liens (interne : souligné ; externe : l'adresse en clair), marques de relecture en pastille. */
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  .replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, '<u>$1</u> <span class="url">($2)</span>')
  .replace(/(https?:\/\/[^\s<]+)/g, '<span class="url">$1</span>')
  .replace(/\[À VALIDER([^\]]*)\]/g, '<span class="tag v">À VALIDER$1</span>')
  .replace(/\[SOURCE À TROUVER\]/g, '<span class="tag s">SOURCE À TROUVER</span>')
  .replace(/\[LIEN EN ATTENTE\]/g, '<span class="tag l">LIEN EN ATTENTE</span>')
  .replace(/\[À REMPLIR([^\]]*)\]/g, '<span class="tag r">À REMPLIR$1</span>');

const LOTS = {
  1: {
    out: "relecture-pharmacien.pdf",
    files: readdirSync(dir).filter((f) => /^\d+-.*\.md$/.test(f)).sort(),
    footer: "OTAGE · Brouillons, relecture pharmacien · non publiés",
    cover: `<section><h1>Relecture pharmacien : 4 brouillons « taches brunes du visage »</h1>
<div class="cover">
<p><b>Pour Dr Seddiki El Mehdi, pharmacien.</b> Quatre textes en préparation, d'après la carte thématique (docs/carte-thematique.md) : le guide « Taches brunes du visage », puis Mélasma, Taches d'acné et Routine matin et soir. <b>Aucun n'est en ligne.</b> Chaque page restera hors de Google (noindex) jusqu'à ta validation ; la mention « Relu par » n'apparaîtra qu'ensuite, avec la date de ta relecture.</p>
<p><b>Comment relire.</b> Une ligne par bloc : coche <b>Validé</b> ou <b>À modifier</b>, et écris la correction à droite. <span class="tag v">À VALIDER</span> = la phrase affirme un effet (sur la peau ou d'un soin) : merci de la valider ou de la corriger. <span class="tag s">SOURCE À TROUVER</span> = aucune source vérifiée, la phrase ne sera pas publiée sans une source. Les chiffres [1], [2]… renvoient aux sources listées en fin de chaque texte : merci de les relire aussi.</p>
<p><b>Règles suivies.</b> Aucun délai ni chiffre de résultat ; pas de promesse de disparition ; aucun des mots « blanchir », « éclaircir » ni leurs équivalents ; grossesse et allaitement : toujours l'avis du médecin ou du pharmacien. Les rôles des ingrédients (alpha-arbutine, niacinamide, AHA) attendent encore ta validation dans le document de validation client, partie 4.</p>
</div></section>`,
  },
  2: {
    out: "relecture-lot-2.pdf",
    // par priorité : sécurité d'abord, puis les pages les plus attendues, puis les compléments du lot 1
    files: ["taches-quand-consulter.md", "appliquer-ecran-solaire.md", "erreurs-taches-visage.md", "taches-peau-mate.md", "taches-solaires.md", "soleil-maroc-taches.md", "masque-de-grossesse.md", "choisir-creme-anti-taches.md", "02-melasma.md", "03-taches-acne.md", "04-routine-taches-matin-soir.md", "pilier-ajouts.md", "dr-seddiki-el-mehdi.md"],
    footer: "OTAGE · Lot 2, relecture pharmacien · non publié",
  },
};
const lot = process.argv[2] ?? "1";
const conf = LOTS[lot];
if (!conf) { console.error(`Lot inconnu : ${lot} (1 ou 2).`); process.exit(1); }

const box = '<td class="ck"><span class="box"></span></td><td class="ck"><span class="box"></span></td><td class="cm"></td>';
let html = "", total = 0;
const toc = [];

for (const [index, f] of conf.files.entries()) {
  const lines = readFileSync(new URL(f, dir), "utf8").split("\n");
  let rows = "", info = [], n = 0, inSources = false, avis = false, version = null;
  const counts = { valider: 0, source: 0 };
  const row = (label, text, cls = "") => { n++; rows += `<tr${cls ? ` class="${cls}"` : ""}><td class="k">${label}</td><td>${text}</td>${box}</tr>`; };
  const head = (text, cls = "h") => { rows += `<tr class="${cls}"><td colspan="5">${text}</td></tr>`; };
  const note = (text) => { rows += `<tr class="n"><td colspan="5">${text}</td></tr>`; };
  let h1 = "", para = [], url = "";
  const flush = () => {
    if (!para.length) return;
    const text = para.join(" ");
    if (version) { row(`Version ${version}`, inline(text), `ver v${version.toLowerCase()}`); if (version === "B") rows += `<tr class="choice"><td colspan="5"><b>Choix de Dr Seddiki pour toute la page :</b> <span class="box"></span> Version A « produits dépigmentants non autorisés » &nbsp; <span class="box"></span> Version B « vendus comme "blanchissants" », entre guillemets</td></tr>`; version = null; }
    else row(inSources ? "Source" : "§", inline(text));
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    counts.valider += (l.match(/\[À VALIDER/g) || []).length;
    counts.source += (l.match(/\[SOURCE À TROUVER\]/g) || []).length;
    if (l.startsWith("# ")) { h1 = l.slice(2); continue; }
    if (l.startsWith("> ")) {
      flush();
      const t = l.slice(2);
      url ||= (t.match(/URL(?: prévue)? : (\/[^\s·(]*)/) || [])[1] || "";
      if (!rows) info.push(inline(t));
      else if (avis) rows += `<tr class="guide"><td colspan="5">${inline(t)}</td></tr>`;
      else note(/^Encadré/.test(t) ? `<b>${inline(t)}</b>` : inline(t));
      continue;
    }
    if (avis && /^\[À REMPLIR/.test(l)) { rows += `<tr class="write"><td colspan="5">${inline(l)}<div class="lines"></div></td></tr>`; continue; }
    const h3 = l.match(/^### (.*)/);
    if (h3) { flush(); avis = /avis du pharmacien/i.test(h3[1]); head(`Encadré · ${inline(h3[1])}`, avis ? "h3 avis" : "h3"); continue; }
    const h2 = l.match(/^## (.*)/);
    if (h2) { flush(); avis = false; inSources = h2[1] === "Sources"; if (inSources || h2[1] === "Ajouts proposés") head(inline(h2[1])); else row("H2", inline(h2[1]), "h2"); continue; }
    const ver = l.match(/^\*\*Version (A|B)\*\*$/);
    if (ver) { flush(); version = ver[1]; continue; }
    const meta = l.match(/^(Title|Meta description) : (.*)/);
    if (meta) { flush(); row(meta[1] === "Title" ? "Title" : "Meta", `${inline(meta[2])} <span class="url">(${meta[2].length} car.)</span>`); continue; }
    if (l.startsWith("|")) {
      flush();
      const cells = (x) => x.trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
      const headCells = cells(l); i++; // ligne de séparation
      rows += `<tr class="th"><td class="k">Tableau</td><td colspan="4">${headCells.filter(Boolean).join(" · ")}</td></tr>`;
      while (lines[i + 1]?.startsWith("|")) { const c = cells(lines[++i]); row("Ligne", c.map((x, k) => (headCells[k] ? `<b>${headCells[k]}</b> : ${x}` : `<b>${x}</b>`)).join("<br>")); }
      continue;
    }
    const check = l.match(/^- \[ \] (.*)/);
    if (check) { flush(); row("Case", inline(check[1])); continue; }
    const li = l.match(/^(?:- |(\d+)\. )(.*)/);
    if (li) { flush(); row(inSources ? `Source ${li[1] ?? ""}`.trim() : li[1] ? `Étape ${li[1]}` : "Puce", inline(li[2])); continue; }
    const q = l.match(/^\*\*(.+\?)\*\*$/);
    if (q) { flush(); const a = []; while (lines[i + 1]?.trim() && !lines[i + 1].startsWith("**")) a.push(lines[++i]); row("FAQ", `<b>${inline(q[1])}</b><br>${inline(a.join(" "))}`); continue; }
    if (!l.trim()) { flush(); continue; }
    para.push(l);
  }
  flush();
  total += n;
  const id = `p${index + 1}`;
  toc.push({ id, h1, url, f, n, ...counts });
  html += `<section id="${id}"><p class="kick">${lot === "2" ? `Priorité ${index + 1} / ${conf.files.length}${url ? ` · ${url}` : ""}` : ""}</p><h1>${inline(h1)}</h1>${info.length ? `<div class="intro"><p class="brief">Brief pour l'équipe (pas à valider)</p>${info.map((x) => `<p>${x}</p>`).join("")}</div>` : ""}
<table><thead><tr><th class="k">Bloc</th><th>Texte proposé</th><th class="ck">Validé</th><th class="ck">À modifier</th><th class="cm">Commentaire / correction</th></tr></thead><tbody>${rows}</tbody></table>
<div class="sign"><div>Relu par (nom, qualité)</div><div>Signature</div><div>Date</div></div><p class="cnt">${n} blocs à relire.</p></section>`;
}

/** Temps estimé : environ 20 secondes par bloc, arrondi aux 5 minutes. */
const minutes = (blocks) => Math.max(5, Math.round((blocks * 20) / 60 / 5) * 5);

if (lot === "2") {
  const rowsToc = toc.map((t, i) => `<tr><td>${i + 1}</td><td><a href="#${t.id}">${inline(t.h1)}</a><br><span class="url">${t.url || t.f}</span></td><td class="num">${t.n}</td><td class="num">${t.valider}</td><td class="num">${t.source}</td><td class="num">${minutes(t.n)} min</td></tr>`).join("");
  conf.cover = `<section><h1>Relecture pharmacien · Lot 2 « taches brunes »</h1>
<div class="cover">
<p><b>Pour Dr Seddiki El Mehdi, pharmacien.</b> Huit nouvelles pages, les compléments des trois brouillons du lot 1, les phrases à ajouter au pilier et ta page auteur. <b>Rien n'est en ligne.</b> Chaque page restera hors de Google (noindex) jusqu'à ta validation, puis affichera « Relu par Dr Seddiki El Mehdi » avec la date, et un lien vers ta page.</p>
</div>
<h2 class="toc">Sommaire</h2>
<table class="toc"><thead><tr><th>#</th><th>Page</th><th class="num">Blocs</th><th class="num">À valider</th><th class="num">Sans source</th><th class="num">Temps estimé</th></tr></thead><tbody>${rowsToc}</tbody>
<tfoot><tr><td></td><td><b>Total</b></td><td class="num"><b>${total}</b></td><td class="num"><b>${toc.reduce((a, t) => a + t.valider, 0)}</b></td><td class="num"><b>${toc.reduce((a, t) => a + t.source, 0)}</b></td><td class="num"><b>${minutes(total)} min</b></td></tr></tfoot></table>
</section>
<section><h1>Consignes</h1>
<div class="cover">
<p><b>Temps estimé.</b> Environ ${(Math.round(minutes(total) / 60 * 2) / 2).toLocaleString("fr-FR")} heures au total, à raison d'environ 20 secondes par bloc. Tu peux relire en plusieurs fois : chaque page est indépendante et porte sa signature.</p>
<p><b>Ce qui est prioritaire, dans cet ordre.</b></p>
<ol>
<li><b>La page « Quand consulter »</b> (priorité 1) : c'est une page de sécurité, sans vente. Les autres pages renvoient vers elle.</li>
<li><b>Le choix A / B</b> sur la page « Erreurs » (priorité 3) : une seule version pour toute la page. A = « produits dépigmentants non autorisés » ; B = « vendus comme "blanchissants" », toujours entre guillemets, comme mise en garde. Coche la case de choix, bien visible, juste après la version B.</li>
<li><b>Les pastilles <span class="tag v">À VALIDER</span></b> : chaque phrase qui affirme un effet. Valide, corrige ou barre.</li>
<li><b>Les encadrés « L'avis du pharmacien »</b> : 3 à 5 lignes par page, avec tes mots. Deux questions-guides t'aident à démarrer. Rien n'est inventé à ta place.</li>
<li><b>Ta page auteur</b> (dernière page) : les cases <span class="tag r">À REMPLIR</span> (faculté, année du diplôme, officine, années d'exercice, spécialités, photo).</li>
</ol>
<p><b>Les autres marques.</b> <span class="tag s">SOURCE À TROUVER</span> : aucune source vérifiée ; la phrase ne sera pas publiée sans source, sauf si tu en connais une. <span class="tag l">LIEN EN ATTENTE</span> : le lien vise une page pas encore publiée ; il sera retiré automatiquement à la publication. Le cadre « Brief pour l'équipe » en haut de chaque page n'est pas à valider.</p>
<p><b>Règles suivies.</b> Aucun délai, pourcentage ou concentration ; pas de promesse de disparition ; aucun des mots interdits (sauf la version B, entre guillemets) ; grossesse, allaitement, traitement en cours : toujours le médecin ou le pharmacien ; aucun diagnostic. Chaque affirmation renvoie à une source numérotée, lue et vérifiée (Académie américaine de dermatologie, DermNet, OMS, revues scientifiques).</p>
<p><b>Questions pour toi</b> (réponds dans la marge, sur la page concernée, ou à part) :</p>
<ol>
<li>L'écran OTAGE SPF 50 est-il teinté ? Minéral (oxyde de zinc, dioxyde de titane) ou à filtres chimiques ? Les pages ne l'affirment pas tant que ce n'est pas confirmé.</li>
<li>Quels AHA contient la crème, à quelle concentration ? Peux-tu fournir la liste INCI complète des 4 soins ?</li>
<li>Statut de l'hydroquinone au Maroc (interdite en cosmétique, sur ordonnance ?), et texte officiel qui encadre les cosmétiques (AMMPS, circulaires) à citer.</li>
<li>Faut-il une ordonnance ou une orientation pour voir un dermatologue au Maroc ? (FAQ de la page « Quand consulter »)</li>
<li>Le hammam pendant la grossesse : quelle consigne donner ? La phrase sur la routine pendant le ramadan te convient-elle ?</li>
<li>Version A ou B pour les produits vendus sans contrôle ?</li>
</ol>
</div></section>`;
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
h2.toc{font:600 13pt/1.2 "Bodoni Moda",serif;color:var(--ink);margin:10pt 0 4pt}
.kick{margin:0 0 3pt;font-size:7.8pt;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--red)}
.intro{border:1pt solid var(--line);background:var(--soft);padding:6pt 9pt;margin-bottom:8pt;font-size:7.8pt;color:#5a4040}.intro p{margin:0 0 3pt}
.intro .brief{font-weight:700;color:var(--ink);text-transform:uppercase;letter-spacing:.05em;font-size:7pt}
.cover{border:1pt solid var(--line);padding:10pt 12pt;margin-bottom:10pt}.cover p{margin:0 0 6pt}.cover ol{margin:0 0 8pt;padding-inline-start:16pt}.cover li{margin:0 0 4pt}
table{width:100%;border-collapse:collapse;margin:4pt 0 8pt}
thead{display:table-header-group}
tr{break-inside:avoid}
th{background:var(--ink);color:#fff;font-weight:600;text-align:left;padding:4pt 5pt;font-size:8pt}
td{border:0.6pt solid var(--line);padding:4.5pt 5pt;vertical-align:top}
td.k,th.k{width:48pt;font-weight:600;color:var(--ink);font-size:7.8pt}
table.toc td{font-size:8.4pt}table.toc .num{text-align:right;width:52pt;white-space:nowrap}table.toc a{color:var(--ink)}table.toc tfoot td{background:var(--soft)}
tr.h td{background:var(--ink);color:#fff;font:600 10pt/1.3 "Bodoni Moda",serif;border-color:var(--ink);break-after:avoid}
tr.h2 td{background:#f3e6dc;font:600 9.6pt/1.3 "DM Sans",sans-serif;color:var(--ink);break-after:avoid}tr.h2 td.cm{background:#fff}
tr.h3 td{background:#fbeff0;color:var(--red);font-weight:700;font-size:8.6pt;border-color:#f0c9cd;break-after:avoid}
tr.h3.avis td{background:var(--red);color:#fff}
tr.guide td{font-style:italic;color:#5a4040;background:#fff;border-bottom:none}
tr.write td{background:#fff}tr.write .lines{height:78pt;margin-top:4pt;background:repeating-linear-gradient(#fff 0 15pt,#d9c9bd 15pt 15.6pt)}
tr.th td{background:var(--soft);font-size:7.8pt;color:#5a4040}
tr.ver td{border-left:2.5pt solid #c9922e}tr.vb td{border-left-color:var(--red)}
tr.choice td{background:#fff4d6;border:1.4pt solid #c9922e;font-size:9.4pt;padding:8pt}
tr.n td{background:var(--soft);font-size:8pt;color:#5a4040;font-style:italic}
.ck{width:40pt;text-align:center}th.ck{font-size:7.2pt}
.box{display:inline-block;width:11pt;height:11pt;border:1pt solid var(--ink);border-radius:2pt;margin-top:1pt;vertical-align:middle}
.cm{width:24%}td.cm{background:#fff}
.url{color:#7a6a6a;font-size:7.4pt;word-break:break-all}
.tag{display:inline-block;font-size:6.8pt;font-weight:700;padding:0 3pt;border-radius:2pt;letter-spacing:.02em}
.tag.v{background:#fde3e5;color:var(--red);border:0.6pt solid var(--red)}
.tag.s{background:#fff4d6;color:#8a5a00;border:0.6pt solid #c9922e}
.tag.l{background:#eef0f3;color:#4a5260;border:0.6pt solid #a9b0bb}
.tag.r{background:#e6f3ea;color:#24613a;border:0.6pt solid #5aa874}
.sign{margin-top:18pt;display:flex;gap:24pt}.sign div{flex:1;border-top:0.8pt solid var(--ink);padding-top:4pt;font-size:8.2pt}
.cnt{font-size:7.6pt;color:#777;margin-top:6pt}
</style><body>
${conf.cover}
${html}</body></html>`;

// HTML=chemin : écrit aussi la page HTML, pour vérifier le rendu
if (process.env.HTML) writeFileSync(process.env.HTML, page);
const b = await chromium.launch();
const pg = await b.newPage();
await pg.setContent(page, { waitUntil: "load" });
await pg.evaluate(() => document.fonts.ready);
await pg.pdf({
  path: new URL(conf.out, dir).pathname, format: "A4", printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: `<div style="font:7pt Arial;color:#777;width:100%;padding:0 11mm;display:flex;justify-content:space-between"><span>${conf.footer}</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
await b.close();
console.log(`docs/brouillons/${conf.out} : ${conf.files.length} textes, ${total} blocs à relire.`);
