/* Offre de l'accueil : pour chaque choix (Petit ou Grand, 1 ou 3 gammes), les prix et le « Tu économises … » affichés
   (cartes, ticket, note sous le bouton) sont comparés au calcul attendu depuis products.ts. FR et AR.
   Usage : lancer le site (npm run start), puis `npm run check:savings` (ou BASE=http://localhost:3000 …). */
import { createRequire, registerHooks } from "node:module";
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { chromium } = createRequire(import.meta.url)("playwright");
const { gamme, bundleTotal, bundleUnit } = await import("../src/data/products.ts");
const base = process.env.BASE || "http://localhost:3000";
const PRICES = gamme.formats;
const b = await chromium.launch(); let bad = 0;
for (const path of ["/", "/ar"]) {
  const pg = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
  await pg.goto(base + path, { waitUntil: "networkidle" });
  await pg.locator("#offres").scrollIntoViewIfNeeded(); await pg.waitForTimeout(800);
  for (const f of ["petit", "grand"]) for (const q of [1, 3]) {
    await pg.click(`.fsw[data-f="${f}"]`); await pg.waitForTimeout(300);
    await pg.click(`.qopt.q${q}`); await pg.waitForTimeout(2200);
    const v = await pg.evaluate(() => {
      const n = (s) => { const e = document.querySelector(s); return e ? Number(e.textContent.replace(/[^\d]/g, "")) : null; };
      return { fswPrice: n('.fsw[aria-checked="true"] em'), fswWas: n('.fsw[aria-checked="true"] s'), q3per: n("[data-o-per]"), q3total: n("[data-o-total]"), q3save: n("[data-o-save]"), q1price: n("[data-s-price]"), q1total: n("[data-s-total]"),
        tkTotal: n("[data-total]"), tkSave: n("[data-save]"), tkSaveShown: getComputedStyle(document.querySelector(".tk-save")).visibility !== "hidden", note: n("[data-total3]"), saveTxt: document.querySelector(".tk-save")?.textContent.trim().replace(/\s+/g, " ") };
    });
    // 3 gammes : 2 payées, 1 offerte (l'économie est la gamme offerte) ; 1 gamme : économie par rapport aux 4 soins à l'unité
    const P = PRICES[f], total = q === 3 ? bundleTotal(P.price) : P.price, save = q === 3 ? P.price : P.was - P.price;
    const ok = v.fswPrice === P.price && v.fswWas === P.was && v.q3per === bundleUnit(P.price) && v.q3total === bundleTotal(P.price) && v.q3save === P.price && v.q1price === P.price && v.q1total === P.price && v.tkTotal === total && v.tkSave === save && v.tkSaveShown && v.note === total;
    if (!ok) bad++;
    console.log(`${path.padEnd(3)} ${f.padEnd(5)} ${q} gamme(s) : affiché ${v.fswPrice} (au lieu de ${v.fswWas}) · carte 3 = ${v.q3per}/gamme, total ${v.q3total}, éco ${v.q3save} · carte 1 = ${v.q1price} · ticket total ${v.tkTotal}, « ${v.saveTxt} » · note ${v.note} → attendu total ${total}, éco ${save} ${ok ? "✓" : "✗"}`);
  }
}
await b.close();
if (bad) { console.error(`${bad} écart(s) dans le récapitulatif de l'offre.`); process.exit(1); }
console.log("Récapitulatif de l'offre : prix et économies justes pour les 8 choix (FR et AR).");
