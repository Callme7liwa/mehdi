import Link from "next/link";
import { ingredientList, products } from "@/data/products";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/a-propos",
  label: "À propos",
  title: "À propos d'OTAGE, soins honnêtes fabriqués au Maroc",
  description: "OTAGE est une marque marocaine de cosmétique naturelle : une routine anti-taches en 4 soins et un sérum contour des yeux, fabriqués au Maroc, payés à la livraison.",
  h1: "OTAGE : des soins honnêtes, fabriqués au Maroc",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info);

/* TODO (à fournir par OTAGE, rien n'est inventé ici) : histoire de la marque, année de création,
   présentation des fondateurs et du docteur partenaire, lieu de fabrication, photo d'équipe. */
export default function Page() {
  return (
    <TextPage info={info} lead="OTAGE est une marque marocaine de cosmétique naturelle. Notre promesse tient en une phrase : on ne vend pas du rêve, on vend le résultat.">
      <h2>Ce que nous faisons</h2>
      <p>Nous fabriquons au Maroc une routine anti-taches en 4 soins, pensée pour les taches brunes, les taches pigmentaires et le teint irrégulier, ainsi qu'un sérum contour des yeux pour les cernes.</p>
      <ul>
        {products.map((p) => (
          <li key={p.slug}><Link href={`/soins/${p.slug}`}>{p.name.fr}</Link> ({p.no}) : {ingredientList(p)}.</li>
        ))}
      </ul>

      <h2>Honnêtes, concrètement</h2>
      <ul>
        <li><b>Des prix affichés.</b> Le ticket de commande s'écrit sous tes yeux : tout est affiché, rien n'est caché.</li>
        <li><b>Pas de promesse miracle.</b> Les taches s'estompent petit à petit, pas du jour au lendemain. Nous le disons clairement.</li>
        <li><b>Tu paies à la livraison.</b> Rien à avancer en ligne, pas besoin de carte bancaire.</li>
        <li><b>Livraison offerte</b> partout au Maroc, en {site.delivery.label.fr}.</li>
      </ul>

      <h2>Fabriqué au Maroc, avec des ingrédients d'ici</h2>
      <p>Nos soins sont fabriqués au Maroc, avec des ingrédients comme la figue de Barbarie et le louban. « ما كنبيعوش الوهم، كنبيعو النتيجة » : c'est notre devise, en darija.</p>

      <h2>Les fondateurs te répondent</h2>
      <p>Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, on te répond nous-mêmes : <a href={waLink()} target="_blank" rel="noopener">WhatsApp {site.whatsapp.display}</a> ou <a href={site.instagram.url} target="_blank" rel="noopener">Instagram {site.instagram.handle}</a>.</p>
    </TextPage>
  );
}
