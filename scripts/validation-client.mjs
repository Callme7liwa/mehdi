/* Génère docs/validation-client.md : chaque donnée et chaque texte que le client (ou le pharmacien) doit valider avant
   la mise en ligne des fiches produits v2, avec une case Validé / À modifier.
   Usage : `npm run validation`. Les valeurs sont lues dans le code (products.ts, product-pages.ts, faq.ts…) :
   le document montre exactement ce que le site affiche. Le relancer écrase le fichier : faire remplir une copie. */
import { registerHooks } from "node:module";
import { writeFileSync } from "node:fs";

// les fichiers de src/data importent leurs voisins sans extension (« ../lib/bidi ») : Node les cherche aussi en .ts
registerHooks({ resolve: (spec, ctx, next) => { try { return next(spec, ctx); } catch (e) { if (spec.startsWith(".")) return next(spec + ".ts", ctx); throw e; } } });
const { products, productByKey, bundle, bundleKeys, bundleUnit, bundleTotal, unitFormats } = await import("../src/data/products.ts");
const { productPages, productUi } = await import("../src/data/product-pages.ts");
const { productFaq } = await import("../src/data/faq.ts");
const { site } = await import("../src/data/site.ts");
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

# Validation avant mise en ligne : fiches produits v2

Document à faire remplir par le client (et par le pharmacien pour les parties indiquées), avant toute mise en ligne.
Pour chaque ligne : cocher **Validé**, ou **À modifier** en écrivant la bonne valeur. Rien n'est en ligne tant que ce document n'est pas validé.

Généré le ${date}, à partir du code : les valeurs sont celles que le site affiche aujourd'hui.

Les traductions arabes ne sont pas reprises ici : elles sont toutes dans \`src/data/ar-relecture.md\`, à faire relire par un natif.

`;

/* ---------- 1. Prix et offres ---------- */
md += `## 1. Prix et offres (client)\n\n`;
md += table(["Donnée", "Valeur affichée sur le site", "Source dans le code"], [
  row(["Sérum contour des yeux N° 05 : prix à l'unité", `${yP} DH (ancien prix : 130 DH), ${yeux.ml.petit} ml`, "src/data/products.ts, produit « yeux », unitPrice"]),
  row(["Sérum contour des yeux : offre 2 + 1", `3 sérums pour ${bundleTotal(yP)} DH au lieu de ${yP * 3} DH (≈ ${bundleUnit(yP)} DH le sérum)`, "src/data/products.ts, bundleKeys"]),
  row(["Déodorant crème N° 06 : prix", `${dP} DH, format unique de ${deo.ml.petit} ml`, "src/data/products.ts, produit « deo », unitPrice et ml"]),
  row(["Déodorant crème : offre 2 + 1", `3 pots pour ${bundleTotal(dP)} DH au lieu de ${dP * 3} DH (≈ ${bundleUnit(dP)} DH le pot)`, "src/data/products.ts, bundleKeys"]),
  row(["Règle de l'offre 2 + 1 à l'unité", `Pour ${bundleKeys.map((k) => `le ${productByKey(k).name.fr.toLowerCase()}`).join(" et ")} : ${bundle.free} article offert pour ${bundle.buy + bundle.free} identiques dans la même commande, cumulable (6 = 2 offerts), y compris quand le soin est ajouté depuis la fiche d'un autre produit. Calculé par le serveur.`, "src/data/products.ts (freeCount), src/lib/order/compute.ts"]),
  row(["Livraison du déodorant et du contour des yeux", `Payante : de ${fee.min} à ${fee.max} DH selon la ville (comme tout achat à l'unité)`, "src/data/site.ts, delivery.unitFee"]),
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
md += `### Allégations : À valider\n\n« 100 % naturel » (et « naturel », « ingrédients naturels ») a été **retiré partout** (fiche, méta, JSON-LD, llms.txt, accueil, arabe) en attendant votre validation. Les allégations ci-dessous sont affichées ; elles restent **à valider**.\n\n`;
md += table(["Allégation", "Où elle apparaît", "Statut"], [
  row(["Sans sels d'aluminium", "fiche (avantage, titre H1, titre Google, description), accueil (carte « odeurs », « À l'unité »), FAQ, llms.txt", "À valider"]),
  row(["Sans parabène", "fiche (avantage)", "À valider"]),
  row(["Ne bloque pas la transpiration (agit sur les odeurs)", "fiche (avantage, « Pour qui ? », FAQ « Est-ce qu'il bloque la transpiration ? »)", "À valider"]),
  row(["Sans sulfate", "fiche (avantage) — venait de la maquette", "À valider"]),
  row(["« Cinq ingrédients, rien d'autre »", "fiche (texte d'accroche), accueil", "À valider (la liste complète est-elle bien de 5 ingrédients ?)"]),
  row(["« 100 % naturel »", "retiré partout", "À rétablir seulement si validé"]),
]);

/* ---------- 3. Textes écrits par nous ---------- */
md += `## 3. Textes que nous avons écrits (absents des maquettes) — client\n\n`;
const deoFaq = productFaq(deo, "fr");
md += table(["Texte", "Contenu affiché", "Source"], [
  row(["Déodorant : titre de la page (H1)", deo.h1.fr, "src/data/products.ts, h1"]),
  row(["Déodorant : titre dans Google", `${deo.metaTitle.fr} | OTAGE`, "src/data/products.ts, metaTitle"]),
  row(["Déodorant : description dans Google (et JSON-LD)", deo.metaDescription.fr, "src/data/products.ts, metaDescription"]),
  row(["Déodorant : « Pour qui ? »", deo.forWho.fr, "src/data/products.ts, forWho"]),
  ...deoFaq.map((f) => row([`Déodorant : FAQ « ${f.q} »`, f.a.join(" "), "src/data/faq.ts (réponse générée) et products.ts"])),
  row(["Accueil : carte « odeurs »", `${h.diagnosticDesOdeursSousLes} — ${h.diagnosticUnDeodorantQuiTient} — ${h.diagnosticBientot}${dP}${h.discoverDh}`, "src/home/text.ts"]),
  row(["Accueil : résultat « odeurs »", `${h.discoverNotreDeodorantArriveBientot} ${h.discoverOnLePrepareAvec}${dP}${h.discoverDh}. Bouton : ${h.discoverCommanderLeDeo}${dP}${h.discoverDh}`, "src/home/text.ts"]),
  row(["Accueil, « À l'unité » : sous-titre du déodorant", h.shopPourDeo, "src/home/text.ts, shopPourDeo"]),
  row(["Fiches : mention sous chaque avis", productUi.reviewNote.fr, "src/data/product-pages.ts, reviewNote"]),
  row(["Fiches : intitulé de l'avis d'Awatef (gel, sérum, crème, écran)", "Avis sur la routine complète", "src/data/reviews.ts"]),
  row(["Fiches : titre des questions", `${productUi.faqTitle.fr} ${productUi.faqTitleEm.fr}`, "src/data/product-pages.ts"]),
  row(["Fiches : case de consentement", `${productUi.agreeA.fr} ${productUi.agreeCgv.fr} ${productUi.agreeAnd.fr} ${productUi.agreeReturns.fr}.`, "src/data/product-pages.ts"]),
  row(["Page /soins : chapeau", "Une routine anti-taches en 4 soins, un sérum contour des yeux et un déodorant crème. Fabriqués au Maroc, livrés en 24 à 72 h, payés à la livraison.", "src/templates/ProductsIndex.tsx"]),
  row(["Description générale du site (Google, JSON-LD, llms.txt)", site.description.fr, "src/data/site.ts, description"]),
  row(["CGV, article 2 « Produits » : liste générée", products.map((p) => `${p.name.fr} (${unitFormats(p).map((f) => `${p.ml[f]} ml`).join(" ou ")})`).join(" ; "), "src/app/(fr)/cgv/page.tsx, depuis products.ts"]),
]);

/* ---------- 4. Rôles des ingrédients ---------- */
md += `## 4. Rôles des ingrédients « [À VALIDER] » des 6 fiches — pharmacien\n\nTextes de la section « L'étiquette, sans filtre », repris des maquettes, où ils étaient marqués « [À VALIDER] ». La mention « Rôles relus par notre pharmacien » reste masquée tant que \`site.medicalReview.validated\` n'est pas à true.\n\n`;
for (const p of products) {
  const x = productPages[p.key];
  md += `### ${p.no} · ${p.name.fr}\n\n`;
  md += table(["Ingrédient", "Rôle affiché", "Ce que ça change (deuxième ligne)"], x.lab.ingredients.map((g) => row([`${g.name.fr} (${g.where.fr})`, g.role.fr, g.why.fr])));
}

/* ---------- 5. Points à trancher ---------- */
md += `## 5. Points à trancher (client)\n\n`;
md += table(["Point", "Situation actuelle", "Fichier"], [
  row(["CGV, article 3 « Prix »", `Non modifié (consigne). Il cite la gamme et le contour des yeux (${yP} DH, ${bundleUnit(yP)} DH avec l'offre 2 + 1), mais ni le déodorant (${dP} DH, offre 2 + 1), ni les prix à l'unité des 4 soins de la gamme.`, "src/app/(fr)/cgv/page.tsx et src/app/(ar)/ar/cgv/page.tsx"]),
  row(["Commandes gardées hors connexion avant la case CGV", "Renvoyées avec cgv: true (les formulaires de l'accueil exigeaient déjà la case avant de les enregistrer).", "src/home/islands/offers.js"]),
]);

writeFileSync(new URL("../docs/validation-client.md", import.meta.url), md);
const lines = (md.match(/☐ Validé/g) || []).length;
console.log(`docs/validation-client.md : ${lines} lignes à valider.`);
