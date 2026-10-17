/* Vérifie qu'aucun texte français ne reste visible sur les pages arabes (/ar…).
   Usage : lancer le site (npm run start), puis `npm run check:ar` (ou BASE=http://localhost:3000 node scripts/check-arabic.mjs).
   Contrôle, pour chaque page /ar : le texte, les attributs lus à l'écran (alt, aria-label, placeholder, title),
   les balises title / description / Open Graph et les textes du JSON-LD.
   Sont ignorés : les éléments marqués lang="fr" / lang="en" ou dir="ltr" (messages de clientes, adresse de
   l'hébergeur, identifiants), et la liste ALLOW ci-dessous (marque, sigles, unités). */
const BASE = process.env.BASE || "http://localhost:3000";
const ALLOW = new Set(["OTAGE", "otage", "Mouldwa", "Google", "Analytics", "SPF", "UVA", "UVB", "AHA", "ICE", "N", "WhatsApp"]); // Mouldwa : nom de la société (JSON-LD parentOrganization)
const PAGES = [
  "/ar", "/ar/soins",
  ...["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux", "deodorant-creme"].map((s) => `/ar/soins/${s}`),
  "/ar/cernes", "/ar/taches-acne",
  "/ar/avis", "/ar/a-propos", "/ar/livraison-paiement", "/ar/contact", "/ar/mentions-legales", "/ar/cgv",
];
const LATIN = /[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/g;
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
/* noms de domaine et adresses e-mail : ce ne sont pas des textes à traduire */
const bad = (text) => (decode(text).replace(/[\w.-]+@[\w.-]+|\b[\w-]+\.(?:ma|com|app)\b/g, " ").match(LATIN) || []).filter((w) => !ALLOW.has(w));

/** Retire les sous-arbres marqués comme non arabes (lang="fr|en") ou écrits de gauche à droite (dir="ltr"). */
function stripForeign(html) {
  const open = /<([a-z0-9]+)\b[^>]*\b(?:lang="(?:fr|en)"|dir="ltr")[^>]*>/gi;
  let out = html, m;
  while ((m = open.exec(out))) {
    const tag = m[1].toLowerCase();
    if (["img", "input", "br", "meta", "link"].includes(tag) || m[0].endsWith("/>")) { out = out.slice(0, m.index) + out.slice(m.index + m[0].length); open.lastIndex = m.index; continue; }
    const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, "gi");
    re.lastIndex = m.index + m[0].length;
    let depth = 1, x, end = out.length;
    while ((x = re.exec(out))) { depth += x[0].startsWith("</") ? -1 : x[0].endsWith("/>") ? 0 : 1; if (!depth) { end = x.index + x[0].length; break; } }
    out = out.slice(0, m.index) + out.slice(end);
    open.lastIndex = m.index;
  }
  return out;
}

let total = 0;
for (const path of PAGES) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const problems = [];
  if (res.status !== 200) problems.push(`statut HTTP ${res.status}`);
  if (!/<html[^>]*lang="ar"[^>]*dir="rtl"|<html[^>]*dir="rtl"[^>]*lang="ar"/.test(html)) problems.push('<html lang="ar" dir="rtl"> absent');

  // JSON-LD : toutes les valeurs de texte, sauf adresses, types et énumérations schema.org
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const walk = (v, k) => {
      if (typeof v === "string") { if (!k.startsWith("@") && !/^https?:|^\+?\d/.test(v) && !["priceCurrency", "currency", "unitCode", "dayOfWeek", "opens", "closes", "email", "addressCountry", "applicableCountry", "returnPolicyCountry", "alternateName", "sku", "inLanguage", "contactType", "availableLanguage", "areaServed"].includes(k)) for (const w of bad(v)) problems.push(`JSON-LD ${k} : « ${w} »`); }
      else if (Array.isArray(v)) v.forEach((x) => walk(x, k));
      else if (v && typeof v === "object") { if (v["@type"] === "Person") return; /* nom propre du fondateur */ for (const [kk, vv] of Object.entries(v)) walk(vv, kk); }
    };
    walk(JSON.parse(json), "");
  }
  // balises du <head>
  for (const m of html.matchAll(/<title>([^<]*)<\/title>/g)) for (const w of bad(m[1])) problems.push(`title : « ${w} »`);
  for (const m of html.matchAll(/<meta (?:name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description)" content="([^"]*)"/g)) for (const w of bad(m[2])) problems.push(`${m[1]} : « ${w} »`);

  // corps de la page
  let body = html.slice(html.indexOf("<body"));
  body = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->/g, " ");
  body = stripForeign(body);
  for (const m of body.matchAll(/\b(alt|aria-label|placeholder|title)="([^"]*)"/g)) for (const w of bad(m[2])) problems.push(`${m[1]} : « ${w} » (${decode(m[2]).slice(0, 50)})`);
  const text = body.replace(/<[^>]+>/g, "\n");
  for (const line of text.split("\n")) for (const w of bad(line)) problems.push(`texte : « ${w} » (${decode(line).trim().slice(0, 60)})`);

  const uniq = [...new Set(problems)];
  total += uniq.length;
  console.log(`${uniq.length ? "✗" : "✓"} ${path}${uniq.length ? "\n   " + uniq.slice(0, 15).join("\n   ") : ""}`);
}
console.log(total ? `\n${total} texte(s) non arabes à corriger.` : `\nAucun texte français visible sur les ${PAGES.length} pages arabes.`);
process.exit(total ? 1 : 0);
