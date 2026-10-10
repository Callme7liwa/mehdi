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
console.log(`dist/ prêt pour ${siteUrl}`);
