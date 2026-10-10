/* Vérifie que les fragments latins ou numériques s'affichent dans le bon ordre sur les pages arabes (/ar…) :
   « 2 + 1 » ne doit pas devenir « 1 + 2 », ni « 85 % » devenir « % 85 », ni un numéro de téléphone s'inverser.
   Usage : lancer le site (npm run start), puis `npm run check:bidi` (ou BASE=http://localhost:3000 …).

   Le test applique l'algorithme bidirectionnel Unicode (UAX 9, celui des navigateurs) à chaque paragraphe du HTML servi
   et contrôle que chaque fragment (src/lib/bidi.ts, FRAGMENT) s'affiche de gauche à droite, tel qu'il est écrit.
   Sont pris en compte : dir="ltr" / dir="rtl", <bdi> et les caractères d'isolement Unicode.
   Limite : les textes écrits par les scripts de l'accueil après une action (ticket de commande) ne sont pas dans le HTML ;
   ils passent par la même fonction `isolate` (voir src/home/HomePage.tsx). */
import bidiFactory from "bidi-js";
import { FRAGMENT, isolate } from "../src/lib/bidi.ts";

const BASE = process.env.BASE || "http://localhost:3000";
const PAGES = [
  "/ar", "/ar/soins",
  ...["gel-nettoyant", "serum-anti-taches", "creme-anti-taches", "ecran-solaire-spf50", "contour-des-yeux"].map((s) => `/ar/soins/${s}`),
  "/ar/taches-pigmentaires", "/ar/cernes", "/ar/taches-acne", "/ar/melasma-grossesse",
  "/ar/avis", "/ar/a-propos", "/ar/livraison-paiement", "/ar/contact", "/ar/mentions-legales", "/ar/cgv",
];
const bidi = bidiFactory();
const LRI = "\u2066", RLI = "\u2067", FSI = "\u2068", PDI = "\u2069";
const ARABIC = /[؀-ۿ]/;

/** Texte tel qu'il s'affiche, de gauche à droite. */
function visual(text, dir) {
  const levels = bidi.getEmbeddingLevels(text, dir);
  return bidi.getReorderedIndices(text, levels);
}
const shown = (text, dir = "rtl") => visual(text, dir).map((i) => text[i]).join("").replace(/[\u2066-\u2069]/g, "");

/** Fragments d'un paragraphe qui ne s'affichent pas dans l'ordre où ils sont écrits. */
function misordered(text, dir) {
  if (!ARABIC.test(text) && dir === "ltr") return [];
  const order = visual(text, dir), at = new Array(text.length);
  order.forEach((logical, pos) => { at[logical] = pos; });
  const out = [];
  for (const m of text.matchAll(FRAGMENT)) {
    let last = -1, ok = true;
    for (let i = m.index; i < m.index + m[0].length; i++) {
      if (/\s/.test(text[i])) continue;
      if (at[i] < last) { ok = false; break; }
      last = at[i];
    }
    if (!ok) out.push(m[0]);
  }
  return out;
}

const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, "\u00A0");
const INLINE = new Set(["a", "abbr", "b", "bdi", "bdo", "cite", "code", "em", "i", "mark", "s", "small", "span", "strong", "sub", "sup", "time", "u"]);
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

/** Paragraphes d'une page : [texte, sens de base]. Les balises en ligne restent dans la phrase, les autres la coupent. */
function paragraphs(html) {
  let body = html.slice(html.indexOf("<body"));
  body = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<template[\s\S]*?<\/template>|<!--[\s\S]*?-->/g, "");
  const out = [], stack = []; // éléments ouverts : { tag, dir (blocs), isolate (balises en ligne) }
  let text = "";
  const base = () => { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].dir) return stack[i].dir; return "rtl"; };
  const flush = () => { if (text.trim()) out.push([text, base()]); text = ""; };
  for (const part of body.split(/(<[^>]+>)/)) {
    if (!part.startsWith("<")) { text += decode(part); continue; }
    const m = part.match(/^<(\/?)([a-z0-9-]+)/i);
    if (!m) continue;
    const tag = m[2].toLowerCase(), dir = (part.match(/\bdir="(ltr|rtl|auto)"/) || [])[1];
    if (m[1]) { // balise fermante
      const i = stack.map((e) => e.tag).lastIndexOf(tag);
      if (i < 0) continue;
      const el = stack[i];
      if (INLINE.has(tag)) { if (el.isolate) text += PDI; stack.splice(i, 1); } else { flush(); stack.splice(i, 1); }
      continue;
    }
    if (tag === "input" || tag === "textarea") { // seul texte visible : l'exemple affiché dans le champ
      const ph = part.match(/\bplaceholder="([^"]*)"/);
      if (ph) out.push([decode(ph[1]), dir || (/type="tel"/.test(part) ? "ltr" : base())]);
    }
    if (VOID.has(tag) || part.endsWith("/>")) { if (!INLINE.has(tag) && tag !== "img" && tag !== "input") flush(); else if (tag === "br") flush(); continue; }
    if (INLINE.has(tag)) {
      const iso = tag === "bdi" ? (dir === "ltr" ? LRI : dir === "rtl" ? RLI : FSI) : dir === "ltr" ? LRI : dir === "rtl" ? RLI : dir === "auto" ? FSI : "";
      text += iso;
      stack.push({ tag, isolate: Boolean(iso) });
    } else { flush(); stack.push({ tag, dir: dir === "auto" ? null : dir }); }
  }
  flush();
  const title = html.match(/<title>([^<]*)<\/title>/);
  if (title) out.push([decode(title[1]), "rtl"]);
  return out;
}

/* ---------- 1. La règle : « 2 + 1 » ---------- */
let failed = 0;
const check = (label, ok) => { console.log(`${ok ? "✓" : "✗"} ${label}`); if (!ok) failed++; };
const sample = "عرض 2 + 1 مجانًا";
check("témoin : sans isolement, « 2 + 1 » s'affiche bien « 1 + 2 » dans une phrase arabe (le test voit le problème)", shown(sample).includes("1 + 2"));
check("isolate() : « 2 + 1 » s'affiche « 2 + 1 »", shown(isolate(sample)).includes("2 + 1"));
check("isolate() : « 85 % », « \u221250 », « @otage.1 » et un numéro de téléphone s'affichent tels qu'ils sont écrits",
  ["85 %", "\u221250", "@otage.1", "+212 6 88 91 82 01"].every((f) => shown(isolate(`نص ${f} نص`)).includes(f) && !misordered(isolate(`نص ${f} نص`), "rtl").length));
check("isolate() : un texte sans arabe, une balise ou une adresse ne sont pas modifiés",
  isolate("Offre 2 + 1") === "Offre 2 + 1" && isolate('نص <a href="tel:+212688918201">اتصال</a>') === 'نص <a href="tel:+212688918201">اتصال</a>');

/* ---------- 2. Toutes les pages arabes ---------- */
let total = 0, offers = 0;
for (const path of PAGES) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const problems = [];
  if (res.status !== 200) problems.push(`statut HTTP ${res.status}`);
  for (const [text, dir] of paragraphs(html)) {
    if (dir === "rtl") offers += (text.match(/2 \+ 1/g) || []).length;
    for (const f of misordered(text, dir)) problems.push(`« ${f} » s'affiche dans le désordre : ${text.replace(/[\u2066-\u2069]/g, "").replace(/\s+/g, " ").trim().slice(0, 70)}`);
  }
  const uniq = [...new Set(problems)];
  total += uniq.length;
  console.log(`${uniq.length ? "✗" : "✓"} ${path}${uniq.length ? "\n   " + uniq.slice(0, 20).join("\n   ") : ""}`);
}
check(`« 2 + 1 » : ${offers} occurrence(s) sur les pages arabes, toutes dans le bon ordre`, offers > 0 && !total);
console.log(total || failed ? `\n${total} fragment(s) à isoler (src/lib/bidi.ts : isolate, ou <bdi> / dir="ltr" dans la page).` : `\nTextes mixtes : tout s'affiche dans le bon ordre sur les ${PAGES.length} pages arabes.`);
process.exit(total || failed ? 1 : 0);
