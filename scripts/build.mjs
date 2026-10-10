/* Build du site OTAGE (sans dépendance) : copie public/ vers dist/
   et remplace {{SITE_URL}} par l'adresse définie dans site.config.json. */
import { readFileSync, writeFileSync, rmSync, cpSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const { siteUrl } = JSON.parse(readFileSync(join(root, "site.config.json"), "utf8"));
if (!/^https:\/\/[^/]+$/.test(siteUrl)) throw new Error(`siteUrl invalide : "${siteUrl}" (https://domaine, sans / à la fin)`);

const src = join(root, "public"), out = join(root, "dist");
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true, filter: (p) => !p.endsWith(".DS_Store") });

const TEXT = new Set([".html", ".xml", ".txt", ".webmanifest", ".json"]);
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]));
for (const file of walk(out).filter((f) => TEXT.has(extname(f)))) {
  const before = readFileSync(file, "utf8");
  const after = before.replaceAll("{{SITE_URL}}", siteUrl);
  if (after.includes("{{SITE_URL}}")) throw new Error(`{{SITE_URL}} non remplacé dans ${file}`);
  if (after !== before) writeFileSync(file, after);
}
/* FAQPage : générée à partir de la FAQ visible (#faq-all), pour que les deux textes restent identiques */
const page = join(out, "index.html");
let html = readFileSync(page, "utf8");
const text = (h) => h.replace(/<\/p>\s*<p>/g, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const faqBlock = html.match(/<div class="faq-all" id="faq-all">([\s\S]*?)\n    <\/div>/);
if (!faqBlock) throw new Error("FAQ #faq-all introuvable dans index.html");
const faq = [...faqBlock[1].matchAll(/<details><summary>([\s\S]*?)<\/summary><div class="a">([\s\S]*?)<\/div><\/details>/g)]
  .map(([, q, a]) => ({ "@type": "Question", name: text(q), acceptedAnswer: { "@type": "Answer", text: text(a) } }));
if (!faq.length) throw new Error("Aucune question trouvée dans la FAQ");
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${siteUrl}/#faq`, mainEntity: faq };
html = html.replace("<!--FAQ_JSONLD-->", `<script type="application/ld+json">\n${JSON.stringify(faqLd, null, 1).replaceAll("</", "<\\/")}\n</script>`);
/* chaque bloc JSON-LD doit être du JSON valide */
for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
writeFileSync(page, html);

console.log(`dist/ prêt pour ${siteUrl} (FAQ : ${faq.length} questions)`);
