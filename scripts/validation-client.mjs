/* Génère docs/validation-client.md : chaque donnée et chaque texte que le client (ou le pharmacien) doit valider avant
   la mise en ligne des fiches produits v2, avec une case Validé / À modifier.
   Usage : `npm run validation`. Les valeurs sont lues dans le code (products.ts, product-pages.ts, faq.ts…) :
   le document montre exactement ce que le site affiche. Le relancer écrase le fichier : faire remplir une copie. */
import { registerHooks } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";

// les fichiers de src/data importent leurs voisins sans extension (« ../lib/bidi ») : Node les cherche aussi en .ts
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { products, productByKey, bundle, bundleKeys, bundleUnit, bundleTotal, unitFormats, gamme, rangeProducts, productDescription } = await import("../src/data/products.ts");
const { productPages, productUi } = await import("../src/data/product-pages.ts");
const { productFaq, faq, plain } = await import("../src/data/faq.ts");
const { site } = await import("../src/data/site.ts");
const { problems } = await import("../src/data/problems.ts");
const { homeText } = await import("../src/home/text.ts");
const h = homeText.fr;

const clean = (s) => String(s).replace(/[⁦-⁩‎‏]/g, "").replace(/<[^>]+>/g, "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const BOX = "☐ Validé", FIX = "☐ À modifier :";
const row = (cells) => `| ${cells.map(clean).join(" | ")} | ${BOX} | ${FIX} |\n`;
const table = (head, rows) => `| ${head.join(" | ")} | Validé | À modifier (préciser) |\n|${head.map(() => "---").join("|")}|---|---|\n${rows.join("")}\n`;

const yeux = productByKey("yeux"), deo = productByKey("deo");
const yP = yeux.unitPrice.petit, dP = deo.unitPrice.petit;
const fee = site.delivery.unitFee;
const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Casablanca" }).format(new Date());

let md = `> **Fichier généré par \`npm run validation\` : le copier avant de le remplir.** Le relancer écrase ce fichier, cases cochées comprises.

# Validation client : le site otage.ma

Document à faire remplir par le client (et par le pharmacien pour les parties indiquées).
Pour chaque ligne : cocher **Validé**, ou **À modifier** en écrivant la bonne valeur. Toute correction sera reportée sur le site.

Généré le ${date}, à partir du code : les valeurs sont celles que le site affiche aujourd'hui.

Les traductions arabes ne sont pas reprises ici : elles sont toutes dans \`src/data/ar-relecture.md\`, à faire relire par un natif.

`;

/* ---------- 0. Ce qu'on attend de toi ---------- */
md += `## Ce qu'on attend de toi

Ce document reprend ce que le site otage.ma affiche aujourd'hui. Pour chaque ligne, coche **Validé**, ou **À modifier** en écrivant la correction. Merci de nous le rendre complet : tant qu'une ligne n'est pas validée, elle peut être fausse sur le site.

1. **Valider les prix** (partie 1) : gamme, soins à l'unité, offres 2 + 1, livraison.
2. **Valider les allégations** (partie 2) : ce que l'on dit des soins (« sans sulfate », « ne bloque pas la transpiration », etc.). Si une allégation n'est pas prouvée, elle doit être retirée.
3. **Faire relire par le pharmacien** les rôles des ingrédients (partie 4), le mode d'emploi et les résultats de chaque fiche (partie 6) et les **4 pages conseils** (partie 6). Ces pages restent invisibles sur Google tant qu'il ne les a pas validées.
4. **Donner le parcours du pharmacien** (tableau ci-dessous), pour la page « À propos » et la mention « Relu par notre pharmacien ».

### Le parcours du pharmacien (page « À propos »)

`;
md += table(["Information", "À compléter"], [
  row(["Nom tel qu'il doit apparaître", site.founder.name]),
  row(["Faculté de pharmacie (ville, pays)", "…"]),
  row(["Année du diplôme", "…"]),
  row(["Officine (nom, ville) et années d'exercice", "…"]),
  row(["Autres formations ou spécialités (dermocosmétique, etc.)", "…"]),
  row(["Phrase de présentation souhaitée (facultatif)", "…"]),
]);

/* ---------- 1. Prix et offres ---------- */
md += `## 1. Prix et offres (client)\n\n### La gamme anti-taches (4 soins)\n\n`;
md += table(["Donnée", "Valeur affichée sur le site", "Source dans le code"], [
  ...["petit", "grand"].map((f) => row([`Gamme ${gamme.formats[f].label.fr}`, `${gamme.formats[f].price} DH (au lieu de ${gamme.formats[f].was} DH, le prix des 4 soins à l'unité) ; offre 2 + 1 : 3 gammes pour ${bundleTotal(gamme.formats[f].price)} DH (≈ ${bundleUnit(gamme.formats[f].price)} DH la gamme)`, "src/data/products.ts, gamme"])),
  row(["Livraison de la gamme", "Offerte", "src/data/site.ts, delivery"]),
]);
md += `### Les soins à l'unité\n\n`;
md += table(["Soin", "Prix affiché", "Source dans le code"], [
  ...rangeProducts.map((p) => row([`${p.name.fr} (${p.no})`, unitFormats(p).map((f) => `${f === "petit" ? "Petit" : "Grand"} ${p.ml[f]} ml : ${p.unitPrice[f]} DH`).join(" ; "), `src/data/products.ts, produit « ${p.key} », unitPrice`])),
  row(["Sérum contour des yeux N° 05", `${yP} DH (ancien prix : 130 DH), ${yeux.ml.petit} ml`, "src/data/products.ts, produit « yeux », unitPrice"]),
  row(["Sérum contour des yeux : offre 2 + 1", `3 sérums pour ${bundleTotal(yP)} DH au lieu de ${yP * 3} DH (≈ ${bundleUnit(yP)} DH le sérum)`, "src/data/products.ts, bundleKeys"]),
  row(["Déodorant crème N° 06", `${dP} DH, format unique de ${deo.ml.petit} ml`, "src/data/products.ts, produit « deo », unitPrice et ml"]),
  row(["Déodorant crème : offre 2 + 1", `3 pots pour ${bundleTotal(dP)} DH au lieu de ${dP * 3} DH (≈ ${bundleUnit(dP)} DH le pot)`, "src/data/products.ts, bundleKeys"]),
  row(["Règle de l'offre 2 + 1 à l'unité", `Pour ${bundleKeys.map((k) => `le ${productByKey(k).name.fr.toLowerCase()}`).join(" et ")} : ${bundle.free} article offert pour ${bundle.buy + bundle.free} identiques dans la même commande, cumulable (6 = 2 offerts). Calculé par le serveur.`, "src/data/products.ts (freeCount)"]),
  row(["Livraison d'un achat à l'unité", `De ${fee.min} à ${fee.max} DH selon la ville`, "src/data/site.ts, delivery.unitFee"]),
]);

/* ---------- 2. Déodorant ---------- */
const photos = [deo.pack, ...deo.photos];
md += `## 2. Déodorant crème N° 06 (client, pharmacien pour les allégations)\n\n### Fiche\n\n`;
md += table(["Donnée", "Valeur affichée", "Source"], [
  row(["Nom et numéro", `${deo.name.fr}, ${deo.no}`, "src/data/products.ts"]),
  row(["Contenance", `${deo.ml.petit} ml, un seul format`, "src/data/products.ts"]),
  row(["Ingrédients (liste complète affichée)", deo.ingredients.map((i) => i.fr).join(", "), "src/data/products.ts, ingredients"]),
  row(["Moment d'utilisation", deo.when.fr, "src/data/products.ts, when (texte écrit par nous, pas dans la maquette)"]),
  row(["Mode d'emploi", deo.how.fr, "src/data/products.ts, how (texte écrit par nous, pas dans la maquette)"]),
  row(["Photos (le texte de l'étiquette doit correspondre au produit vendu)", photos.map((p) => p.src.replace("/images/", "")).join(" ; "), "public/images/"]),
]);
md += `### Allégations : à valider\n\nUne allégation non prouvée doit être retirée du site. État au ${date}, relevé sur les pages en ligne :\n\n`;
md += table(["Allégation", "Soin", "Où elle apparaît aujourd'hui"], [
  row(["Sans sulfate", "Gel nettoyant", "fiche du gel, accueil, /soins, llms.txt (aussi écrit sur l'étiquette)"]),
  row(["Ne bloque pas la transpiration (agit sur les odeurs)", "Déodorant", "fiche du déodorant (« Pour qui ? », description Google), llms.txt"]),
  row(["5 ingrédients", "Déodorant", "carte et fiche du déodorant, accueil, titre Google"]),
  row(["Sans sels d'aluminium", "Déodorant", "nulle part : retiré du site en attendant votre validation"]),
  row(["Sans parabène", "Déodorant", "nulle part : retiré du site en attendant votre validation"]),
  row(["« 100 % naturel »", "Tous", "nulle part : retiré du site ; à rétablir seulement si validé"]),
]);

/* ---------- 3. Textes écrits par nous ---------- */
md += `## 3. Textes que nous avons écrits (absents des maquettes) — client\n\n`;
const deoFaq = productFaq(deo, "fr");
md += table(["Texte", "Contenu affiché", "Source"], [
  row(["Déodorant : titre de la page (H1), neutre", productPages.deo.title.map((t) => t.fr).join(" "), "src/data/product-pages.ts, deo.title"]),
  row(["Déodorant : variante du H1, activée seulement après validation de « sans aluminium »", "Déodorant crème sans aluminium.", "src/data/product-pages.ts (commentaire au-dessus de deo.title)"]),
  row(["Déodorant : titre dans Google", `${deo.metaTitle.fr} | OTAGE`, "src/data/products.ts, metaTitle"]),
  row(["Déodorant : description dans Google (et JSON-LD)", productDescription(deo, "fr"), "src/data/products.ts, metaDescription"]),
  row(["Déodorant : « Pour qui ? »", deo.forWho.fr, "src/data/products.ts, forWho"]),
  ...deoFaq.map((f) => row([`Déodorant : FAQ « ${f.q} »`, f.a.join(" "), "src/data/faq.ts (réponse générée) et products.ts"])),
  row(["Accueil : carte « odeurs »", `${h.diagnosticDesOdeursSousLes} — ${h.diagnosticUnDeodorantQuiTient} — ${h.diagnosticBientot}${dP}${h.discoverDh}`, "src/home/text.ts"]),
  row(["Accueil : résultat « odeurs »", `${h.discoverNotreDeodorantArriveBientot} ${h.discoverOnLePrepareAvec}${dP}${h.discoverDh}. Bouton : ${h.discoverCommanderLeDeo}${dP}${h.discoverDh}`, "src/home/text.ts"]),
  row(["Accueil et /soins : bénéfice du déodorant sur sa carte", deo.benefit.fr, "src/data/products.ts, benefit"]),
  row(["Fiches : mention sous chaque avis", productUi.reviewNote.fr, "src/data/product-pages.ts, reviewNote"]),
  row(["Fiches : intitulé de l'avis d'Awatef (gel, sérum, crème, écran)", "Avis sur la routine complète", "src/data/reviews.ts"]),
  row(["Fiches : titre des questions", productUi.faqH.fr.replace("{x}", "le déodorant crème"), "src/data/product-pages.ts"]),
  row(["Fiches : case de consentement", `${productUi.agreeA.fr} ${productUi.agreeCgv.fr} ${productUi.agreeAnd.fr} ${productUi.agreeReturns.fr}.`, "src/data/product-pages.ts"]),
  row(["Page /soins : chapeau", "Fabriqués au Maroc, livrés en 24 à 72 h, paiement à la livraison.", "src/templates/ProductsIndex.tsx"]),
  row(["Description générale du site (Google, JSON-LD, llms.txt)", site.description.fr, "src/data/site.ts, description"]),
  row(["CGV, article 2 « Produits » : liste générée", products.map((p) => `${p.name.fr} (${unitFormats(p).map((f) => `${p.ml[f]} ml`).join(" ou ")})`).join(" ; "), "src/app/(fr)/cgv/page.tsx, depuis products.ts"]),
]);

/* ---------- 4. Rôles des ingrédients ---------- */
md += `## 4. Rôles des ingrédients « [À VALIDER] » des 6 fiches — pharmacien\n\nTextes de la section « L'étiquette, sans filtre », raccourcis à une ligne (contenu v3). La mention « Rôles relus par notre pharmacien » reste masquée sur chaque fiche tant que sa relecture n'est pas confirmée (\`labReviewed\` dans src/data/product-pages.ts).\n\n`;
for (const p of products) {
  const x = productPages[p.key];
  md += `### ${p.no} · ${p.name.fr}\n\n`;
  md += table(["Ingrédient", "Rôle affiché (une ligne)"], x.lab.ingredients.map((g) => row([`${g.name.fr} (${g.where.fr})`, g.role.fr])));
}

/* ---------- 5. Points à trancher ---------- */
md += `## 5. Points à trancher (client)\n\n`;
md += table(["Point", "Situation actuelle", "Fichier"], [
  row(["CGV, article 3 « Prix »", `Liste générée depuis products.ts : la gamme (Petit et Grand format, offre 2 + 1), puis ${bundleKeys.map((k) => { const p = productByKey(k); return `${p.name.fr.toLowerCase()} ${p.unitPrice.petit} DH (${bundleUnit(p.unitPrice.petit)} DH avec l'offre 2 + 1)`; }).join(" et ")}. Les prix à l'unité des 4 soins de la gamme n'y figurent pas.`, "src/app/(fr)/cgv/page.tsx et src/app/(ar)/ar/cgv/page.tsx"]),
]);

/* ---------- 6. Contenu v3 : nouveaux textes ---------- */
md += `## 6. Contenu v3 : nouveaux textes courts (client, pharmacien pour les fiches et les conseils)\n\n### Bénéfice et « Pour qui ? / Comment l'utiliser ? / Résultats » de chaque fiche\n\n`;
for (const p of products) {
  const u = productPages[p.key].use;
  md += `#### ${p.no} · ${p.name.fr}\n\n`;
  md += table(["Texte", "Contenu affiché"], [
    row(["Titre de la page (H1)", productPages[p.key].title.map((x) => x.fr).join(" ")]),
    row(["Titre dans Google", `${p.metaTitle.fr} | OTAGE`]),
    row(["Description dans Google", productDescription(p, "fr")]),
    row(["Bénéfice (cartes, accueil, /soins)", p.benefit.fr]),
    row(["Accroche de la fiche", productPages[p.key].lede.fr]),
    ...(u ? [row(["Pour qui ?", u.forWho.fr]), row(["Comment l'utiliser ?", u.steps.map((s, i) => `${i + 1}. ${s.fr}`).join(" ")]), row(["Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée)", u.timeline.map((e) => `${e.when.fr} : ${e.what.fr}`).join(" · ")])] : []),
  ]);
}
md += `### Citation du fondateur (À propos)\n\nLa version actuelle reste en ligne ; la version courte ne remplace l'actuelle qu'après votre accord.\n\n`;
md += table(["Version", "Texte"], [row(["Actuelle (en ligne)", site.founder.story.fr]), row(["Courte (proposée)", site.founder.storyShort.fr])]);
md += `### Pages conseils réécrites : pharmacien\n\nChacune reste en noindex tant que sa relecture n'est pas confirmée (champ \`reviewed\` dans src/data/problems.ts). Une ligne par bloc de la page.\n\n`;
const blk = (b) => (typeof b === "string" ? b : (b.list ?? b.steps).map((x) => `• ${x}`).join(" "));
for (const p of problems) {
  md += `#### /${p.slug} : ${p.h1}\n\n`;
  md += table(["Bloc", "Texte affiché"], [
    row(["Réponse directe (en haut de page)", p.intro.join(" ")]),
    ...p.sections.map((x) => row([x.h2, x.body.map(blk).join(" ")])),
    row([p.adviceTitle ?? "Avis d'un professionnel", p.advice]),
    row([p.productsTitle, [p.productsIntro, ...p.products.map((x) => `${productByKey(x.key).name.fr} : ${x.why}`)].filter(Boolean).join(" ")]),
    ...p.faq.map((q) => row([`FAQ : ${q.q}`, q.a.join(" ")])),
  ]);
}


/* ---------- 7. Questions fréquentes ---------- */
md += `## 7. Questions fréquentes (client, pharmacien pour les questions de peau)\n\nLes réponses telles qu'affichées sur le site (et lues par Google : données structurées FAQ).\n\n### Accueil\n\n`;
md += table(["Question", "Réponse affichée"], faq.fr.map((q) => row([q.q, plain(q)])));
for (const p of products) {
  md += `### ${p.no} · ${p.name.fr}\n\n`;
  md += table(["Question", "Réponse affichée"], productFaq(p, "fr").map((q) => row([q.q, plain(q)])));
}

/* ---------- 8. Mentions légales : cookies et mesure d'audience ---------- */
const legal = readFileSync(new URL("../src/app/(fr)/mentions-legales/page.tsx", import.meta.url), "utf8");
const cookies = legal.slice(legal.indexOf('id="cookies"'), legal.indexOf("<h2", legal.indexOf('id="cookies"') + 10));
const paras = [...cookies.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1].replace(/\{[^}]*\}/g, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()).filter(Boolean);
md += `## 8. Mentions légales : cookies et mesure d'audience (client)\n\nTexte de la section « Cookies et mesure d'audience » (page Mentions légales, FR ; même contenu en arabe). Les durées doivent correspondre aux réglages de Google Analytics.\n\n`;
md += table(["Paragraphe", "Texte affiché"], paras.map((t, i) => row([`§ ${i + 1}`, t])));

writeFileSync(new URL("../docs/validation-client.md", import.meta.url), md);
const lines = (md.match(/☐ Validé/g) || []).length;
console.log(`docs/validation-client.md : ${lines} lignes à valider.`);
