/* /llms.txt : résumé du site pour les assistants IA, généré à partir de src/data/. */
import { faq, plain } from "@/data/faq";
import { problems } from "@/data/problems";
import { problemsAr } from "@/data/problems.ar";
import { bundleTotal, bundleUnit, gamme, ingredientList, products, rangeProducts, yeuxPrice } from "@/data/products";
import { trustPages } from "@/data/pages";
import { abs, formatDate, site } from "@/data/site";

export const dynamic = "force-static";

export function GET() {
  const P = gamme.formats.petit, G = gamme.formats.grand;
  const yeux = products.find((p) => p.key === "yeux")!;
  const ml = (f: "petit" | "grand") => rangeProducts.map((p) => `${p.name.fr.replace(" anti-taches", "").toLowerCase()} ${p.ml[f]} ml`).join(", ");
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} est une marque marocaine de cosmétique naturelle. Elle vend une gamme anti-taches en 4 soins (gel nettoyant, sérum anti-taches, crème anti-taches, écran solaire SPF 50) et un sérum contour des yeux, fabriqués au Maroc. Vente en ligne au Maroc, livraison offerte en ${site.delivery.label.fr}, paiement à la livraison.`,
    "",
    `Devise : « ${site.slogan.fr} » Site en français, avec une version arabe complète sous /ar. Dernière mise à jour : ${formatDate(site.updated, "fr")}.`,
    "",
    "## La gamme anti-taches",
    "",
    "Pour les taches brunes, les taches pigmentaires (hyperpigmentation) et le teint irrégulier. Une gamme = les 4 soins ci-dessous, vendus ensemble. Routine du matin : les 4 soins. Routine du soir : les 3 premiers, sans écran solaire.",
    "",
    ...rangeProducts.map((p) => `- [${p.no} ${p.name.fr}](${abs(`/soins/${p.slug}`)}) : ${p.lead.fr} Ingrédients : ${ingredientList(p)}. Mode d'emploi : ${p.how.fr} Contenance : ${p.ml.petit} ml (Petit format), ${p.ml.grand} ml (Grand format). Prix à l'unité en Petit format : ${p.unitPrice.petit} DH.`),
    "",
    "### Prix de la gamme (en dirhams marocains, livraison comprise)",
    "",
    "| Format | Contenances | Prix de la gamme | Prix boutique | Avec l'offre 2 + 1 |",
    "|---|---|---|---|---|",
    `| Petit format | ${ml("petit")} | ${P.price} DH | ${P.was} DH | ${bundleTotal(P.price)} DH les 3 gammes (${bundleUnit(P.price)} DH la gamme) |`,
    `| Grand format | ${ml("grand")} | ${G.price} DH | ${G.was} DH | ${bundleTotal(G.price)} DH les 3 gammes (${bundleUnit(G.price)} DH la gamme) |`,
    "",
    "Offre 2 + 1 : pour 2 gammes achetées, la 3e est offerte.",
    "",
    `## ${yeux.name.fr} ${yeux.no}`,
    "",
    `[Page du produit](${abs(`/soins/${yeux.slug}`)}). ${yeux.forWho.fr} ${yeux.ml.petit} ml, applicateur bille. Ingrédients : ${ingredientList(yeux)}. ${yeux.when.fr} : ${yeux.how.fr} Prix : ${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1.`,
    "",
    "## Bientôt",
    "",
    "- Déodorant : en préparation, pas encore en vente.",
    "",
    "## Commander, livraison et paiement",
    "",
    "- Commande sur le site (nom, téléphone, ville, adresse facultative) ou sur WhatsApp.",
    "- OTAGE appelle la cliente pour confirmer la commande et l'adresse, puis le colis part.",
    `- Livraison offerte partout au Maroc, en ${site.delivery.label.fr}.`,
    "- Paiement à la livraison, en espèces. Rien à payer en ligne.",
    `- Réclamations : ${site.claims.fr}`,
    `- Contact (${site.availability.fr}) : WhatsApp ${site.whatsapp.e164}, e-mail ${site.email}, Instagram ${site.instagram.handle} (${site.instagram.url}).`,
    "",
    "## Conseils peau",
    "",
    ...problems.map((p) => `- [${p.label}](${abs(`/${p.slug}`)}) : ${p.metaDescription}`),
    "",
    "## Questions fréquentes",
    "",
    ...faq.fr.map((f) => `- **${f.q}** ${plain(f)}`),
    "",
    "## Pages",
    "",
    `- [Accueil](${abs("/")}) : présentation et commande`,
    `- [Tous les soins](${abs("/soins")})`,
    ...trustPages.map((p) => `- [${p.label.fr}](${abs(p.path)})`),
    "",
    "## النسخة العربية (version arabe)",
    "",
    `> ${site.description.ar} ${site.slogan.ar}`,
    "",
    `- [الصفحة الرئيسية](${abs("/ar")})`,
    `- [كل المنتجات](${abs("/ar/soins")})`,
    ...products.map((p) => `- [${p.name.ar} ${p.no}](${abs(`/ar/soins/${p.slug}`)}) : ${p.lead.ar} ${ingredientList(p, "ar")}.`),
    ...problemsAr.map((p) => `- [${p.label}](${abs(`/ar/${p.slug}`)}) : ${p.metaDescription}`),
    ...trustPages.map((p) => `- [${p.label.ar}](${abs(`/ar${p.path}`)})`),
    "",
    `الأسعار بالدرهم المغربي: مجموعة العناية ضد البقع ${P.price} درهم (الحجم الصغير) أو ${G.price} درهم (الحجم الكبير)؛ سيروم محيط العين ${yeuxPrice} درهم. التوصيل خلال ${site.delivery.label.ar}، والدفع عند الاستلام.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
