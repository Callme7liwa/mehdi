/* Vérifie les fiches produits pour les moteurs de recherche, sur le site construit.
   Usage : lancer le site (npm run build && npm run start), puis `npm run check:seo`
   (ou BASE=http://localhost:3000 node scripts/check-seo.mjs).

   Pour chaque fiche, en français et en arabe : statut 200, canonical, hreflang, Open Graph, robots, et le JSON-LD
   Product (offres en MAD avec le prix affiché dans la page, shippingDetails, hasMerchantReturnPolicy, aucun
   Review ni aggregateRating). Les pages arabes restent hors du sitemap et en noindex tant que site.arIndexable
   est faux ; avec AR_INDEXABLE=1 au build, elles doivent y entrer avec leurs hreflang.
   Vérifie aussi les liens vers chaque fiche (accueil, /soins, pied de page) et le fichier de clé IndexNow. */
const BASE = process.env.BASE || "http://localhost:3000";
const SITE = "https://otage.ma";
const INDEXNOW_KEY = "65dc62b65bf579e0df3674fa69bed1fc"; // même clé que site.indexNowKey
const SLUGS = ["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux", "deodorant-creme"];

const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
const meta = (html, key) => { const t = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]).find((m) => attr(m, "property") === key || attr(m, "name") === key); return t && attr(t, "content"); };
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log(`   ✗ ${msg}`); } };

const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

for (const loc of ["fr", "ar"]) for (const slug of SLUGS) {
  const path = `${loc === "ar" ? "/ar" : ""}/soins/${slug}`, self = SITE + path;
  const res = await fetch(BASE + path), html = await res.text();
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]);
  const canonical = attr(links.find((l) => attr(l, "rel") === "canonical") || "", "href");
  const hreflang = links.filter((l) => attr(l, "rel") === "alternate" && attr(l, "hrefLang")).map((l) => attr(l, "hrefLang"));
  const robots = meta(html, "robots") || "";
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const nodes = ld.flatMap((d) => d["@graph"] || [d]);
  const product = nodes.find((n) => n["@type"] === "Product");
  const offers = product ? [].concat(product.offers) : [];
  const policyIds = new Set(nodes.map((n) => n.hasMerchantReturnPolicy).filter((p) => p?.["@type"] === "MerchantReturnPolicy").map((p) => p["@id"]));
  const inSitemap = locs.includes(self);
  console.log(`${res.status === 200 ? "✓" : "✗"} ${path.padEnd(32)} sitemap ${inSitemap ? "oui" : "non"} · hreflang [${hreflang.join(", ")}] · ${robots.includes("noindex") ? "noindex" : "index"} · ${offers.map((o) => `${Number(o.price)} ${o.priceCurrency}`).join(" / ")}`);
  ok(res.status === 200, `statut ${res.status}`);
  ok(canonical === self, `canonical : ${canonical}`);
  ok(meta(html, "og:url") === self && meta(html, "og:title") && meta(html, "og:description") && meta(html, "og:image"), "Open Graph incomplet");
  ok(product && product.url === self, "JSON-LD Product absent ou mauvaise url");
  ok(offers.length && offers.every((o) => o.price && o.priceCurrency === "MAD" && o.availability && o.shippingDetails && o.hasMerchantReturnPolicy), "offres incomplètes (prix, devise, disponibilité, shippingDetails, hasMerchantReturnPolicy)");
  ok(offers.every((o) => !o.hasMerchantReturnPolicy?.["@id"] || policyIds.has(o.hasMerchantReturnPolicy["@id"])), "politique de retour citée mais absente du graphe");
  ok(offers.every((o) => html.includes(`>${Number(o.price)}<`)), "prix du JSON-LD absent de la page");
  ok(!/"(?:Review|AggregateRating)"|"aggregateRating"|"review"/.test(JSON.stringify(ld)), "Review ou aggregateRating dans le JSON-LD");
  if (loc === "fr") ok(inSitemap && !robots.includes("noindex") && hreflang.includes("fr-MA") && hreflang.includes("x-default"), "page française : sitemap, index et hreflang attendus");
  else if (robots.includes("noindex")) ok(!inSitemap && !hreflang.length, "page arabe en noindex : ni sitemap ni hreflang attendus");
  else ok(inSitemap && hreflang.includes("ar-MA"), "page arabe indexable : sitemap et hreflang ar-MA attendus");
}

console.log("\nLiens vers chaque fiche :");
for (const [path, where] of [["/", "accueil"], ["/soins", "liste des soins"], ["/avis", "pied de page des pages intérieures"], ["/ar", "accueil arabe"], ["/ar/soins", "liste arabe"], ["/ar/avis", "pied de page arabe"]]) {
  const html = await (await fetch(BASE + path)).text();
  const missing = SLUGS.filter((s) => !html.includes(`href="${path.startsWith("/ar") ? "/ar" : ""}/soins/${s}"`));
  console.log(`${missing.length ? "✗" : "✓"} ${path.padEnd(10)} ${where}${missing.length ? ` : manque ${missing.join(", ")}` : " : les 6 fiches"}`);
  fails += missing.length;
}

const key = await fetch(`${BASE}/${INDEXNOW_KEY}.txt`), keyText = (await key.text()).trim();
console.log(`\n${key.status === 200 && keyText === INDEXNOW_KEY ? "✓" : "✗"} IndexNow : /${INDEXNOW_KEY}.txt répond ${key.status}`);
if (key.status !== 200 || keyText !== INDEXNOW_KEY) fails++;

console.log(fails ? `\n${fails} problème(s).` : "\nFiches produits : tout est conforme.");
process.exit(fails ? 1 : 0);
