/* IndexNow : prévient Bing (et les moteurs associés) des pages nouvelles ou modifiées, à partir du sitemap en ligne.
   À lancer APRÈS un déploiement en production :

     npm run indexnow              # montre ce qui serait envoyé, sans rien envoyer
     npm run indexnow -- --send    # envoie
     npm run indexnow -- --send --since 2026-10-01   # pages modifiées depuis cette date
     npm run indexnow -- --send --all                # toutes les pages du sitemap

   Par défaut : les pages dont la date de modification (lastmod) est la plus récente du sitemap, c'est-à-dire celles
   de la dernière mise à jour du contenu (src/data/updated.ts). La clé est dans src/data/site.ts et servie par public/<clé>.txt. */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/data/site.ts", import.meta.url), "utf8");
const pick = (name) => (src.match(new RegExp(`${name}: "([^"]+)"`)) || [])[1];
const SITE = process.env.SITE || pick("url"), KEY = pick("indexNowKey");
const args = process.argv.slice(2), send = args.includes("--send"), all = args.includes("--all");
const sinceArg = args.includes("--since") ? args[args.indexOf("--since") + 1] : null;
if (!SITE || !KEY) { console.error("Adresse du site ou clé IndexNow introuvable dans src/data/site.ts."); process.exit(1); }

const host = new URL(SITE).host;
const key = await fetch(`${SITE}/${KEY}.txt`).then((r) => (r.ok ? r.text() : ""), () => "");
if (key.trim() !== KEY) { console.error(`Le fichier de clé ${SITE}/${KEY}.txt ne répond pas avec la clé : le site est-il déployé ?`); process.exit(1); }

const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1], lastmod: ((m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || "").slice(0, 10) })).filter((e) => e.loc);
if (!entries.length) { console.error("Sitemap vide : rien à envoyer."); process.exit(1); }
const since = sinceArg || entries.map((e) => e.lastmod).sort().pop();
const urls = (all ? entries : entries.filter((e) => e.lastmod >= since)).map((e) => e.loc);

console.log(`${urls.length} adresse(s) ${all ? "(toutes)" : `modifiée(s) depuis le ${since}`} sur ${entries.length} dans le sitemap :`);
urls.forEach((u) => console.log("  " + u));
if (!send) { console.log("\nRien n'a été envoyé. Ajouter --send pour prévenir IndexNow."); process.exit(0); }

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(res.ok || res.status === 202 ? `\nEnvoyé à IndexNow (HTTP ${res.status}).` : `\nRefusé par IndexNow : HTTP ${res.status} ${await res.text()}`);
process.exit(res.ok || res.status === 202 ? 0 : 1);
