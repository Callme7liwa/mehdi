/* Aucune page plus large que l'écran : à 390 px (mobile), document.documentElement.scrollWidth et la largeur du
   viewport de mise en page (innerWidth) doivent rester à 390, sur toutes les pages FR et AR.
   Un débordement (même invisible, ex. un texte masqué en position absolue hors d'un carrousel) élargit la page :
   défilement horizontal, et les éléments fixes (barre « Commander ») se retrouvent décalés.
   Usage : lancer le site (npm run start), puis `npm run check:overflow` (ou BASE=https://otage.ma …). */
import { createRequire, registerHooks } from "node:module";
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { chromium } = createRequire(import.meta.url)("playwright");
const { products } = await import("../src/data/products.ts");
const { problems } = await import("../src/data/problems.ts");
const { trustPages } = await import("../src/data/pages.ts");
const { hasArProblem } = await import("../src/data/problems.ar.ts");

const BASE = process.env.BASE || "http://localhost:3000";
const W = 390;
const fr = ["/", "/soins", ...products.map((p) => `/soins/${p.slug}`), ...problems.map((p) => `/${p.slug}`), ...trustPages.map((p) => p.path)];
// en arabe : pas les pages conseils qui n'ont pas encore de version arabe
const PAGES = [...fr, ...fr.filter((p) => !problems.some((x) => `/${x.slug}` === p && !hasArProblem(x.slug))).map((p) => (p === "/" ? "/ar" : `/ar${p}`))];

const b = await chromium.launch();
let bad = 0;
for (const path of PAGES) {
  const ctx = await b.newContext({ viewport: { width: W, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const pg = await ctx.newPage();
  const res = await pg.goto(BASE + path, { waitUntil: "networkidle" });
  if (!res || res.status() >= 400) { console.log(`✗ ${path} : HTTP ${res?.status()}`); bad++; await ctx.close(); continue; }
  // descendre jusqu'en bas pour charger les images et les contenus différés, puis remonter
  await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await pg.waitForTimeout(600);
  const m = await pg.evaluate((W) => {
    const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
    let culprits = [];
    if (sw > W || iw > W) {
      // éléments qui sortent de l'écran sans être contenus par un ancêtre qui les coupe (overflow ≠ visible)
      const clipped = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (o.overflowX !== "visible" && a.getBoundingClientRect().right <= W + 1) return true; } return false; };
      culprits = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > W + 1 || r.left < -1) && !clipped(e) && getComputedStyle(e).position !== "fixed"; })
        .slice(0, 5).map((e) => `${e.tagName.toLowerCase()}${e.className ? "." + String(e.className).trim().split(/\s+/).join(".") : ""} (${Math.round(e.getBoundingClientRect().left)} → ${Math.round(e.getBoundingClientRect().right)})`);
    }
    return { sw, iw, culprits };
  }, W);
  const ok = m.sw === W && m.iw === W;
  if (!ok) { bad++; console.log(`✗ ${path.padEnd(32)} scrollWidth ${m.sw}, innerWidth ${m.iw}${m.culprits.length ? "\n     " + m.culprits.join("\n     ") : ""}`); }
  else console.log(`✓ ${path.padEnd(32)} ${m.sw} px`);
  await ctx.close();
}
await b.close();
if (bad) { console.error(`\n${bad} page(s) plus large(s) que l'écran à ${W} px.`); process.exit(1); }
console.log(`\nAucune page plus large que l'écran à ${W} px (${PAGES.length} pages FR et AR).`);
