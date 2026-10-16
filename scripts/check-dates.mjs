/* Dates de contenu du sitemap (src/data/updated.ts) : chaque page indexée doit avoir sa date, et on liste les commits
   plus récents qui touchent le contenu de la page (à examiner : contenu → changer la date ; technique → rien).
   Usage : `npm run check:dates` (dans le dépôt complet, pas un clone superficiel). */
import { registerHooks } from "node:module";
import { execFileSync } from "node:child_process";
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { contentUpdated } = await import("../src/data/updated.ts");
const { products } = await import("../src/data/products.ts");

const git = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();
if (git(["rev-parse", "--is-shallow-repository"]) === "true") { console.error("Clone superficiel : historique incomplet, contrôle impossible."); process.exit(1); }

// fichiers (ou blocs de fichier) qui portent le contenu de chaque page ; le CSS n'en fait jamais partie
const home = ["src/home/text.ts", "src/home/text-js.ts", "src/home/sections", "src/home/shop", "src/home/HomePage.tsx", "src/app/(home)/page.tsx", "src/data/faq.ts", "src/data/reviews.ts"];
const sources = {
  "/": home.map((f) => ({ file: f })),
  "/soins": ["src/templates/ProductsIndex.tsx", "src/components/ProductCard.tsx"].map((f) => ({ file: f })),
  "/avis": ["src/templates/ReviewsPage.tsx", "src/data/reviews.ts"].map((f) => ({ file: f })),
  "/a-propos": [{ file: "src/app/(fr)/a-propos/page.tsx" }],
  "/livraison-paiement": [{ file: "src/app/(fr)/livraison-paiement/page.tsx" }],
  "/contact": [{ file: "src/app/(fr)/contact/page.tsx" }],
};
for (const p of products) sources[`/soins/${p.slug}`] = [
  { file: "src/data/product-pages.ts", range: `/^  ${p.key}: {/,/^  },/` },
  { file: "src/data/products.ts", range: `/key: "${p.key}"/,/^  },/` },
  { file: "src/data/faq.ts" }, { file: "src/data/reviews.ts" },
];

// commits déjà examinés, sans changement du contenu français de la page (la date ne bouge pas)
const reviewed = {
  "/soins": { daad349: "alignement des cartes, espace insécable avant « DH » : technique" },
  "/avis": { e4415b4: "texte arabe seulement (l'URL du sitemap est la page française)" },
};

let missing = 0, review = 0;
for (const [path, src] of Object.entries(sources)) {
  const date = contentUpdated[path];
  if (!date) { console.log(`✗ ${path} : pas de date dans src/data/updated.ts`); missing++; continue; }
  const since = new Date(new Date(date).getTime() + 1000).toISOString();
  const lines = new Set();
  for (const s of src) {
    const args = ["log", `--since=${since}`, "--format=%aI %h %s"];
    const out = s.range ? git([...args, "--no-patch", "-L", `${s.range}:${s.file}`]) : git([...args, "--", s.file]);
    out.split("\n").filter(Boolean).filter((l) => !reviewed[path]?.[l.split(" ")[1]]).forEach((l) => lines.add(l));
  }
  if (!lines.size) console.log(`✓ ${path.padEnd(28)} ${date}`);
  else { review++; console.log(`? ${path.padEnd(28)} ${date} : ${lines.size} commit(s) plus récent(s) à examiner`); [...lines].sort().reverse().forEach((l) => console.log(`     ${l.slice(0, 110)}`)); }
}
if (missing) process.exit(1);
console.log(review ? `\n${review} page(s) à examiner : si un de ces commits change le contenu, mettre à jour la date.` : "\nDates de contenu à jour pour les pages indexées.");
