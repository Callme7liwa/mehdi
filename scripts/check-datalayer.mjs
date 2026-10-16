/* Mesure d'audience : contenu exact des événements poussés dans le dataLayer de GTM, consentement accepté.
   - /api/order est simulé (aucune commande réelle) : « value » vaut volontairement 999, différent du prix affiché,
     pour prouver que le montant vient du serveur et pas du navigateur.
   - gtm.js est remplacé par un script vide : aucune requête vers Google.
   Vérifie : commande_envoyee depuis les 3 formulaires (offre et « À l'unité » de l'accueil, ticket d'une fiche),
   clic_whatsapp, choix_offre, aucune donnée personnelle, et aucun événement après « Refuser ».
   Usage : lancer le site (npm run start), puis `npm run check:datalayer` (ou BASE=http://localhost:3000 …). */
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = process.env.BASE || "http://localhost:3000";
const ORDER = { ok: true, numero: "OTG-TEST-0001", subtotal: 999, fee: null, total: { min: 999, max: 999 }, saving: 0 };
const PERSON = { nom: "Salma Test", tel: "0612345678", ville: "Khouribga" };
const OURS = new Set(["commande_envoyee", "clic_whatsapp", "choix_offre", "visite_ia"]);

const b = await chromium.launch();
let failed = 0;
const check = (label, ok, detail = "") => { console.log(`${ok ? "✓" : "✗"} ${label}${ok ? "" : `\n   ${detail}`}`); if (!ok) failed++; };
const same = (a, e) => JSON.stringify(a) === JSON.stringify(e);

async function page(consent) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.route("**/api/order", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(ORDER) }));
  await ctx.route((u) => u.hostname.endsWith("googletagmanager.com"), (r) => r.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  const pg = await ctx.newPage();
  await pg.goto(BASE + "/", { waitUntil: "networkidle" });
  await pg.evaluate(() => window.scrollBy(0, 5)); // le bandeau s'affiche à la première interaction
  await pg.getByRole("button", { name: consent ? "Accepter" : "Refuser", exact: true }).click();
  await pg.waitForTimeout(300);
  return pg;
}
/** Nos événements dans le dataLayer (sans les événements internes de GTM, ni les champs « gtm.* » que GTM ajoute lui-même). */
const events = (pg) => pg.evaluate((ours) => (window.dataLayer || []).filter((x) => x && ours.includes(x.event)).map((x) => Object.fromEntries(Object.entries(x).filter(([k]) => !k.startsWith("gtm.")))), [...OURS]);
const fillPerson = async (pg, scope) => {
  await pg.fill(`${scope} [name=nom]`, PERSON.nom); await pg.fill(`${scope} [name=tel]`, PERSON.tel); await pg.fill(`${scope} [name=ville]`, PERSON.ville);
  await pg.check(`${scope} [name=cgv]`);
};

/* 1. Accueil : clic WhatsApp, choix d'offre, commande depuis l'offre */
{
  const pg = await page(true);
  await pg.evaluate(() => { const a = document.querySelector('a[href*="wa.me"]'); a.addEventListener("click", (e) => e.preventDefault(), { once: true }); a.click(); });
  await pg.locator('.dg-card[data-pb="yeux"]').scrollIntoViewIfNeeded(); await pg.locator('.dg-card[data-pb="yeux"]').click(); await pg.waitForTimeout(400);
  await pg.evaluate(() => window.OTAGE.setProduct("taches")); await pg.waitForTimeout(200);
  await pg.locator(".cur-form").scrollIntoViewIfNeeded(); await pg.waitForTimeout(1200);
  await fillPerson(pg, ".cur-form"); await pg.click(".cur-form .tk-send"); await pg.waitForTimeout(1200);
  const ev = await events(pg);
  check("clic_whatsapp = { event, page }", same(ev.find((e) => e.event === "clic_whatsapp"), { event: "clic_whatsapp", page: "/" }), JSON.stringify(ev));
  check("choix_offre = { event, offre: \"contour_des_yeux\" }", same(ev.find((e) => e.event === "choix_offre"), { event: "choix_offre", offre: "contour_des_yeux" }), JSON.stringify(ev));
  check("commande_envoyee (offre de l'accueil) = { event, value: 999 (serveur), currency: \"MAD\", offre, numero }",
    same(ev.find((e) => e.event === "commande_envoyee"), { event: "commande_envoyee", value: 999, currency: "MAD", offre: "gamme_petit_x3", numero: "OTG-TEST-0001" }), JSON.stringify(ev));
  const all = JSON.stringify(await pg.evaluate(() => window.dataLayer));
  check("aucune donnée personnelle dans le dataLayer (nom, téléphone, ville)", !Object.values(PERSON).some((v) => all.includes(v)), all.slice(0, 300));
  await pg.context().close();
}
/* 2. Accueil, « À l'unité » */
{
  const pg = await page(true);
  await pg.locator("#unite").scrollIntoViewIfNeeded(); await pg.waitForTimeout(600);
  await pg.locator(".sp-add").first().click(); await pg.waitForTimeout(300); await pg.locator(".cart-go").click(); await pg.waitForTimeout(800);
  await fillPerson(pg, ".sd-form"); await pg.locator("dialog[open] .sd-send").click(); await pg.waitForTimeout(1200);
  const ev = await events(pg);
  check("commande_envoyee (« À l'unité ») = { event, value: 999, currency: \"MAD\", offre: \"unite:gel-petitx1\", numero }",
    same(ev.find((e) => e.event === "commande_envoyee"), { event: "commande_envoyee", value: 999, currency: "MAD", offre: "unite:gel-petitx1", numero: "OTG-TEST-0001" }), JSON.stringify(ev));
  await pg.context().close();
}
/* 3. Fiche produit : le choix est mémorisé, GTM se charge dès l'arrivée ; commande depuis le ticket */
{
  const pg = await page(true);
  await pg.goto(BASE + "/soins/serum-anti-taches", { waitUntil: "networkidle" }); await pg.waitForTimeout(1200);
  await pg.evaluate(() => document.querySelector(".sheet-h").click()); await pg.waitForTimeout(800);
  await pg.fill("#f-nom", PERSON.nom); await pg.fill("#f-tel", PERSON.tel); await pg.fill("#f-ville", PERSON.ville); await pg.check("#f-cgv");
  await pg.evaluate(() => document.querySelector("button.go").click()); await pg.waitForTimeout(1200);
  const ev = await events(pg);
  check("commande_envoyee (ticket d'une fiche) = { event, value: 999, currency: \"MAD\", offre: \"unite:serum-petitx1\", numero }",
    same(ev.find((e) => e.event === "commande_envoyee"), { event: "commande_envoyee", value: 999, currency: "MAD", offre: "unite:serum-petitx1", numero: "OTG-TEST-0001" }), JSON.stringify(ev));
  await pg.context().close();
}
/* 4. Refus : aucun de nos événements, aucun conteneur */
{
  const pg = await page(false);
  await pg.evaluate(() => { const a = document.querySelector('a[href*="wa.me"]'); a.addEventListener("click", (e) => e.preventDefault(), { once: true }); a.click(); });
  await pg.evaluate(() => window.OTAGE.setProduct("yeux")); await pg.waitForTimeout(300);
  const ev = await events(pg), gtm = await pg.evaluate(() => Boolean(document.getElementById("gtm-js")));
  check("après « Refuser » : aucun événement envoyé, GTM non chargé", ev.length === 0 && !gtm, JSON.stringify(ev));
  await pg.context().close();
}
await b.close();
if (failed) { console.error(`\n${failed} contrôle(s) en échec.`); process.exit(1); }
console.log("\ndataLayer : contenu exact des événements vérifié (accord donné, refus), aucune donnée personnelle.");
