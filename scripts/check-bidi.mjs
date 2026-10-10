/* Vérifie l'ordre d'affichage des nombres, signes et mots latins sur les pages arabes (/ar…).
   Usage : lancer le site (npm run start), puis `npm run check:bidi` (ou BASE=http://localhost:3000 …).

   La règle (src/lib/bidi.ts) :
   - une expression (« 2 + 1 », « 85 % », « 01 / 04 ») se lit dans le sens de la phrase. Dans un texte arabe, de droite à
     gauche : 2 est à droite, puis +, puis 1 ; 85 est à droite de %. Chaque nombre garde ses chiffres dans l'ordre.
   - un numéro de téléphone, un e-mail, un identifiant (« @otage.1 ») restent d'un seul tenant, de gauche à droite.

   Deux contrôles, sur les 17 pages arabes :
   1. HTML servi : l'algorithme bidirectionnel Unicode (UAX 9) appliqué à chaque paragraphe. Rapide, sans navigateur.
   2. Page rendue, dans de vrais navigateurs (Chrome, puis Safari/WebKit et Firefox s'ils sont installés), après
      exécution du JavaScript : on lit la position réelle de chaque caractère à l'écran. Couvre aussi les textes écrits
      par les scripts (ticket, chat, fenêtres), les textes masqués (fenêtres fermées), le contenu CSS ::before / ::after,
      les exemples des champs (placeholder) et le texte des SVG.
      Navigateurs : `npx playwright install chromium webkit firefox`. BROWSERS=chromium,webkit pour choisir ;
      CHROME_PATH=… pour utiliser un Chrome déjà installé. */
import bidiFactory from "bidi-js";
import { EXPRESSION, LTR_UNIT, isolate } from "../src/lib/bidi.ts";

const BASE = process.env.BASE || "http://localhost:3000";
const PAGES = [
  "/ar", "/ar/soins",
  ...["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux"].map((s) => `/ar/soins/${s}`),
  "/ar/taches-pigmentaires", "/ar/cernes", "/ar/taches-acne", "/ar/melasma-grossesse",
  "/ar/avis", "/ar/a-propos", "/ar/livraison-paiement", "/ar/contact", "/ar/mentions-legales", "/ar/cgv",
];
const bidi = bidiFactory();
const LRI = "⁦", RLI = "⁧", FSI = "⁨", PDI = "⁩";
const CONTROLS = /[‪-‮⁦-⁩]/g;
const clean = (t) => t.replace(CONTROLS, "").replace(/\s+/g, " ").trim();

/* ---------- Le contrôle lui-même : le même pour le HTML servi et pour la page rendue ----------
   `pos(i)` donne la position horizontale du caractère i (ou null s'il n'est pas affiché), `line(i)` sa ligne.
   Écrit sans dépendance : la fonction est aussi envoyée telle quelle dans le navigateur. */
function findProblems(text, dir, pos, line, expressionSource, unitSource, dirOf) {
  const problems = [];
  /* sens de l'élément qui contient le caractère i (dir="ltr" sur une balise) ; les caractères de sens glissés dans le
     texte ne comptent pas : une expression forcée de gauche à droite dans une phrase arabe est justement l'erreur à voir */
  const dirAt = (i) => (dirOf ? dirOf(i) : dir);
  const shownChars = (start, end) => { const out = []; for (let i = start; i < end; i++) if (!/\s/.test(text[i]) && pos(i) !== null) out.push(i); return out; };
  const leftToRight = (chars) => chars.every((i, k) => k === 0 || line(i) !== line(chars[k - 1]) || pos(i) > pos(chars[k - 1]) - 0.5);
  /* 1. expressions : chaque morceau garde ses caractères dans l'ordre, et les morceaux se suivent dans le sens de lecture */
  let expressions = 0;
  for (const m of text.matchAll(new RegExp(expressionSource, "g"))) {
    const tokens = [];
    for (const t of m[0].matchAll(/[^\s  ]+/g)) { const chars = shownChars(m.index + t.index, m.index + t.index + t[0].length); if (chars.length) tokens.push(chars); }
    if (tokens.length < 2) continue;
    expressions++;
    const d = dirAt(m.index);
    let ok = tokens.every(leftToRight);
    for (let k = 1; ok && k < tokens.length; k++) {
      const a = tokens[k - 1], b = tokens[k];
      if (line(a[0]) !== line(b[0])) continue; // retour à la ligne entre les deux
      ok = d === "rtl" ? pos(b[b.length - 1]) < pos(a[0]) + 0.5 : pos(b[0]) > pos(a[a.length - 1]) - 0.5;
    }
    if (!ok) problems.push(`« ${m[0]} » ne se lit pas ${d === "rtl" ? "de droite à gauche, comme la phrase" : "de gauche à droite"}`);
  }
  /* 2. téléphones, e-mails, identifiants : d'un seul tenant, de gauche à droite */
  let units = 0;
  for (const m of text.matchAll(new RegExp(unitSource, "g"))) {
    if (!/[A-Za-z]/.test(m[0]) && !/\d[   ]/.test(m[0])) continue;
    const chars = shownChars(m.index, m.index + m[0].length);
    if (chars.length < 2) continue;
    units++;
    if (!leftToRight(chars)) problems.push(`« ${m[0]} » devrait rester de gauche à droite`);
  }
  return { problems, expressions, units };
}

/** HTML servi : positions calculées par l'algorithme bidirectionnel Unicode. */
function checkText(text, dir, dirs) {
  const order = bidi.getReorderedIndices(text, bidi.getEmbeddingLevels(text, dir)), at = new Array(text.length);
  order.forEach((logical, pos) => { at[logical] = pos; });
  return findProblems(text, dir, (i) => at[i], () => 0, EXPRESSION.source, LTR_UNIT.source, dirs && ((i) => dirs[i]));
}

const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const INLINE = new Set(["a", "abbr", "b", "bdi", "bdo", "cite", "code", "em", "i", "mark", "s", "small", "span", "strong", "sub", "sup", "time", "u"]);
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

/** Paragraphes d'une page : [texte, sens de base, sens de chaque caractère]. Les balises en ligne restent dans la phrase, les autres la coupent. */
function paragraphs(html) {
  let body = html.slice(html.indexOf("<body"));
  body = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<template[\s\S]*?<\/template>|<!--[\s\S]*?-->/g, "");
  const out = [], stack = []; // éléments ouverts : { tag, dir (blocs), isolate (balises en ligne) }
  let text = "", dirs = [];
  const base = () => { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].dir) return stack[i].dir; return "rtl"; };
  const here = () => { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].dir || stack[i].inlineDir) return stack[i].dir || stack[i].inlineDir; return "rtl"; };
  const add = (t) => { const d = here(); text += t; for (let i = 0; i < t.length; i++) dirs.push(d); };
  const flush = () => { if (text.trim()) out.push([text, base(), dirs]); text = ""; dirs = []; };
  for (const part of body.split(/(<[^>]+>)/)) {
    if (!part.startsWith("<")) { add(decode(part)); continue; }
    const m = part.match(/^<(\/?)([a-z0-9-]+)/i);
    if (!m) continue;
    const tag = m[2].toLowerCase(), dir = (part.match(/\bdir="(ltr|rtl|auto)"/) || [])[1];
    if (m[1]) { // balise fermante
      const i = stack.map((e) => e.tag).lastIndexOf(tag);
      if (i < 0) continue;
      const el = stack[i];
      if (INLINE.has(tag)) { if (el.isolate) add(PDI); stack.splice(i, 1); } else { flush(); stack.splice(i, 1); }
      continue;
    }
    if (tag === "input" || tag === "textarea") { // seul texte visible : l'exemple affiché dans le champ
      const ph = part.match(/\bplaceholder="([^"]*)"/);
      if (ph) out.push([decode(ph[1]), dir || (/type="tel"/.test(part) ? "ltr" : base())]);
    }
    if (VOID.has(tag) || part.endsWith("/>")) { if ((!INLINE.has(tag) && tag !== "img" && tag !== "input") || tag === "br") flush(); continue; }
    if (INLINE.has(tag)) {
      const iso = tag === "bdi" ? (dir === "ltr" ? LRI : dir === "rtl" ? RLI : FSI) : dir === "ltr" ? LRI : dir === "rtl" ? RLI : dir === "auto" ? FSI : "";
      add(iso);
      stack.push({ tag, isolate: Boolean(iso), inlineDir: dir === "ltr" || dir === "rtl" ? dir : null });
    } else { flush(); stack.push({ tag, dir: dir === "auto" ? null : dir }); }
  }
  flush();
  return out;
}

let failed = 0;
const check = (label, ok) => { console.log(`${ok ? "✓" : "✗"} ${label}`); if (!ok) failed++; };

/* ---------- 1. La règle, sur des exemples ---------- */
const offer = "عرض 2 + 1 مجانًا", rate = "85 % رضا", phone = "الرقم +212 6 88 91 82 01 للطلب", handle = "تابعينا على @otage.1 الآن";
const forced = (t, f) => t.replace(f, LRI + f + PDI); // l'ancienne version du site : le fragment forcé de gauche à droite
const bad = (t) => checkText(t, "rtl").problems.length > 0;
check("« 2 + 1 مجانًا » et « 85 % » se lisent de droite à gauche, comme la phrase", !bad(isolate(offer)) && !bad(isolate(rate)));
check("témoin : forcés de gauche à droite (« 1 + 2 », « % 85 » pour une lectrice arabophone), le test les refuse", bad(forced(offer, "2 + 1")) && bad(forced(rate, "85 %")));
check("un numéro de téléphone et « @otage.1 » restent de gauche à droite avec isolate()", !bad(isolate(phone)) && !bad(isolate(handle)));
check("témoin : sans isolate(), le test refuse le numéro découpé et « otage.1@ »", bad(phone) && bad(handle));
check("isolate() ne touche ni à un texte sans arabe, ni aux balises, ni aux adresses des liens",
  isolate("Offre 2 + 1") === "Offre 2 + 1" && isolate('نص <a href="tel:+212688918201">اتصال</a>') === 'نص <a href="tel:+212688918201">اتصال</a>');

/* ---------- 2. HTML servi ---------- */
let total = 0, seen = 0;
for (const path of PAGES) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const problems = [];
  if (res.status !== 200) problems.push(`statut HTTP ${res.status}`);
  for (const [text, dir, dirs] of paragraphs(html)) {
    const r = checkText(text, dir, dirs);
    seen += r.expressions + r.units;
    for (const p of r.problems) problems.push(`${p} : ${clean(text).slice(0, 70)}`);
  }
  const uniq = [...new Set(problems)];
  total += uniq.length;
  if (uniq.length) console.log(`✗ HTML ${path}\n   ${uniq.slice(0, 20).join("\n   ")}`);
}
check(`HTML servi — ${PAGES.length} pages, ${seen} expressions, numéros et identifiants contrôlés`, seen > 0 && !total);

/* ---------- 3. Pages rendues dans les navigateurs ---------- */
/** Exécutée dans la page : position réelle de chaque caractère. */
function scanRendered([findSource, expressionSource, unitSource]) {
  const find = new Function(`return (${findSource})`)();
  const out = new Set();
  let expressions = 0, units = 0, offers = 0, rates = 0;
  const clean = (t) => t.replace(/[‪-‮⁦-⁩]/g, "").replace(/\s+/g, " ").trim();
  const checkNode = (node, dir, where) => {
    const text = node.textContent, cache = new Map();
    const rect = (i) => { if (!cache.has(i)) { const r = document.createRange(); r.setStart(node, i); r.setEnd(node, i + 1); const b = r.getBoundingClientRect(); cache.set(i, b.width || b.height ? b : null); } return cache.get(i); };
    const res = find(text, dir, (i) => (rect(i) ? rect(i).left : null), (i) => (rect(i) ? Math.round(rect(i).top / 4) : 0), expressionSource, unitSource);
    expressions += res.expressions; units += res.units;
    if (!res.problems.length) { offers += (text.match(/2 \+ 1/g) || []).length; rates += (text.match(/\d+[  ]%/g) || []).length; }
    for (const p of res.problems) out.add(`${p}${where} : ${clean(text).slice(0, 60)}`);
  };
  /* texte non affiché pour l'instant (fenêtre fermée, contenu CSS, exemple d'un champ) : on l'affiche hors écran, dans le même sens */
  const probe = (text, dir, where) => {
    const p = document.createElement("div");
    p.dir = dir; p.style.cssText = "position:fixed;left:0;top:-200px;width:3000px;white-space:nowrap;font:16px Arial;visibility:hidden";
    p.textContent = text; document.body.appendChild(p);
    checkNode(p.firstChild, dir, where); p.remove();
  };
  /* React sépare les morceaux d'une même phrase par des commentaires (« 85 » puis « % ») : on les recolle pour lire la phrase entière */
  const comments = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT), marks = [];
  while (comments.nextNode()) marks.push(comments.currentNode);
  marks.forEach((c) => c.remove());
  document.body.normalize();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const el = node.parentElement;
    if (!el || el.closest("script, style, noscript, template") || !/\d|@/.test(node.textContent)) continue;
    const dir = getComputedStyle(el).direction;
    const r = document.createRange(); r.selectNodeContents(node);
    if (r.getClientRects().length) checkNode(node, dir, "");
    else probe(node.textContent, dir, " (texte masqué)");
  }
  for (const el of document.body.querySelectorAll("*")) {
    for (const pseudo of ["::before", "::after"]) {
      const c = getComputedStyle(el, pseudo).content;
      if (c && /^["']/.test(c) && /\d|@/.test(c)) probe(c.slice(1, -1), getComputedStyle(el).direction, ` (contenu CSS ${pseudo})`);
    }
    if (el.placeholder && /\d|@/.test(el.placeholder)) probe(el.placeholder, getComputedStyle(el).direction, " (exemple du champ)");
  }
  return { problems: [...out], expressions, units, offers, rates };
}

const wanted = (process.env.BROWSERS || "chromium,webkit,firefox").split(",").map((s) => s.trim()).filter(Boolean);
let playwright = null;
try { playwright = await import("playwright"); } catch { /* signalé plus bas */ }
let rendered = 0, engines = 0;
if (!playwright) check("Playwright est installé (npm install)", false);
else for (const name of wanted) {
  let browser;
  try { browser = await playwright[name].launch(name === "chromium" && process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}); }
  catch { console.log(`– ${name} : non installé (npx playwright install ${name}), ignoré`); continue; }
  engines++;
  const version = browser.version();
  const sum = { expressions: 0, units: 0, offers: 0, rates: 0 };
  let pagesBad = 0;
  for (const path of PAGES) {
    const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
    await page.goto(BASE + path, { waitUntil: "load" });
    if (path === PAGES[0]) { // les mêmes témoins, dans ce navigateur
      const w = await page.evaluate(([findSource, e, u, samples]) => {
        const find = new Function(`return (${findSource})`)();
        return samples.map((text) => { const p = document.createElement("p"); p.dir = "rtl"; p.style.cssText = "font:16px Arial;white-space:nowrap"; p.textContent = text; document.body.appendChild(p);
          const n = p.firstChild, x = (i) => { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const b = r.getBoundingClientRect(); return b.width ? b.left : null; };
          const bad = find(text, "rtl", x, () => 0, e, u).problems.length > 0; p.remove(); return bad; });
      }, [findProblems.toString(), EXPRESSION.source, LTR_UNIT.source, [isolate(offer), isolate(rate), forced(offer, "2 + 1"), forced(rate, "85 %"), isolate(phone), isolate(handle), phone, handle]]);
      check(`${name} ${version} — témoins : la règle est respectée par le navigateur, et le test voit les inversions`, w.join() === [false, false, true, true, false, false, true, true].join());
    }
    // tout le JavaScript de la page : on la fait défiler (sections chargées à l'approche), puis une commande en cours (ticket)
    await page.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
    await page.evaluate(() => { try { window.OTAGE?.orderNow?.("taches"); } catch { /* page sans ticket */ } });
    await page.waitForTimeout(700);
    const res = await page.evaluate(scanRendered, [findProblems.toString(), EXPRESSION.source, LTR_UNIT.source]);
    for (const k of Object.keys(sum)) sum[k] += res[k];
    if (process.env.DETAIL) console.log(`  ${name} ${path} : ${res.expressions} expressions, ${res.offers} « 2 + 1 », ${res.rates} pourcentages, ${res.units} numéros ou identifiants`);
    if (res.problems.length) { pagesBad++; rendered += res.problems.length; console.log(`✗ ${name} ${path}\n   ${res.problems.slice(0, 20).join("\n   ")}`); }
    await page.context().close();
  }
  check(`${name} ${version} — ${PAGES.length} pages rendues : ${sum.expressions} expressions (dont ${sum.offers} « 2 + 1 » et ${sum.rates} pourcentages) et ${sum.units} numéros ou identifiants mesurés à l'écran, tous dans le bon ordre`, !pagesBad && sum.offers > 0 && sum.rates > 0);
  await browser.close();
}
if (playwright && !engines) check("au moins un navigateur est installé (npx playwright install chromium webkit)", false);

const all = total + rendered;
console.log(all || failed ? `\n${all} problème(s) d'ordre à corriger (règle et explications : src/lib/bidi.ts).` : `\nTextes mixtes : tout se lit dans le bon ordre sur les ${PAGES.length} pages arabes, dans ${engines} navigateur(s).`);
process.exit(all || failed ? 1 : 0);
