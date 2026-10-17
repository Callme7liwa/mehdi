/* Dates de contenu (src/data/updated.ts) : la date d'une page doit changer quand, et seulement quand, son contenu affiché change.
   Usage : lancer le site (npm run build && npm run start), puis `npm run check:dates` (ou BASE=… node scripts/check-dates.mjs).
     --enregistrer   enregistre l'empreinte du contenu affiché de chaque page indexée, avec sa date actuelle
                     (src/data/updated.empreintes.json). À lancer après avoir changé un contenu ET sa date.

   Pour chaque page du sitemap : elle doit avoir sa date dans updated.ts ; on calcule l'empreinte (SHA-256) de son contenu
   affiché, tel que le serveur l'envoie : title, meta description, et le texte de <main> (pour l'accueil, la page sans
   l'en-tête ni le pied de page), sans les scripts ni les dates (<time>), qui viennent elles-mêmes de updated.ts.
   On la compare à l'empreinte enregistrée :
   - même contenu, même date : ✓ ;
   - même contenu, date changée : ? la date a bougé sans changement de contenu (commit technique ?) ;
   - contenu changé, même date : ? changer la date de la page, puis --enregistrer ;
   - contenu changé, date changée : ? lancer --enregistrer.
   Un commit technique (CSS, code, refactor) ne change pas le contenu affiché : il ne déclenche plus d'alerte. */
import { registerHooks } from "node:module";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { contentUpdated } = await import("../src/data/updated.ts");

const BASE = process.env.BASE || "http://localhost:3000";
const FILE = new URL("../src/data/updated.empreintes.json", import.meta.url);
const save = process.argv.includes("--enregistrer");

const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const attr = (html, re) => decode((html.match(re) || [])[1] || "");

/** Le contenu affiché d'une page, sans ce qui ne dépend pas d'elle (en-tête, pied de page, scripts, dates). */
function content(html) {
  const title = attr(html, /<title>([\s\S]*?)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  let body = (html.match(/<main\b[\s\S]*<\/main>/) || [])[0];
  if (!body) body = html.replace(/<header class="nav"[\s\S]*?<\/header>/, "").replace(/<footer class="foot"[\s\S]*?<\/footer>/, "");
  const text = decode(body
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<time\b[\s\S]*?<\/time>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return `${title}\n${description}\n${text}`;
}
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/");
if (!paths.length) { console.error(`Sitemap vide ou introuvable sur ${BASE} : le site est-il lancé ?`); process.exit(1); }

const saved = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};
const now = {};
let missing = 0, review = 0;
for (const path of paths) {
  const date = contentUpdated[path];
  if (!date) { console.log(`✗ ${path} : pas de date dans src/data/updated.ts`); missing++; continue; }
  const res = await fetch(BASE + path);
  if (!res.ok) { console.log(`✗ ${path} : HTTP ${res.status}`); missing++; continue; }
  const print = hash(content(await res.text()));
  now[path] = { date, empreinte: print };
  if (save) continue;
  const old = saved[path];
  const sameContent = old?.empreinte === print, sameDate = old?.date === date;
  let msg = null;
  if (!old) msg = "pas encore d'empreinte : lancer --enregistrer";
  else if (sameContent && !sameDate) msg = `date changée (${old.date} → ${date}) sans changement du contenu affiché : remettre ${old.date}, ou --enregistrer si c'est voulu`;
  else if (!sameContent && sameDate) msg = "contenu affiché changé, date inchangée : mettre à jour sa date dans src/data/updated.ts, puis --enregistrer";
  else if (!sameContent) msg = "contenu et date changés : lancer --enregistrer";
  if (msg) { review++; console.log(`? ${path.padEnd(28)} ${date} : ${msg}`); }
  else console.log(`✓ ${path.padEnd(28)} ${date}`);
}
if (save) {
  writeFileSync(FILE, JSON.stringify(now, null, 2) + "\n");
  console.log(`Empreintes enregistrées : ${Object.keys(now).length} page(s) (src/data/updated.empreintes.json).`);
}
if (missing) process.exit(1);
if (!save) console.log(review ? `\n${review} page(s) à examiner.` : `\nDates de contenu à jour : contenu affiché inchangé depuis la date de chacune des ${paths.length} pages indexées.`);
