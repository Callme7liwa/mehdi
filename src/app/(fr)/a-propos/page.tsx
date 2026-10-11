import Link from "next/link";
import Img from "@/components/Img";
import { ingredientList, products } from "@/data/products";
import { site, waLink } from "@/data/site";
import { founderLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

const F = site.founder;
const info = {
  path: "/a-propos",
  label: "À propos",
  title: "À propos d'OTAGE et de son fondateur, le Dr Seddiki El Mehdi",
  description: "OTAGE est une marque marocaine de cosmétique fondée par le Dr Seddiki El Mehdi, pharmacien, sur une volonté de transparence, d'honnêteté et de confiance.",
  h1: "OTAGE : des soins honnêtes, fabriqués au Maroc",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info);

/* TODO (à fournir par OTAGE, rien n'est inventé ici) : année de création, parcours détaillé du fondateur. */
export default function Page() {
  return (
    <TextPage info={info} extraLd={[founderLd("fr")]} lead="OTAGE est une marque marocaine de cosmétique naturelle. Notre promesse tient en une phrase : on ne vend pas du rêve, on vend le résultat.">
      <h2>Le fondateur</h2>
      <Img className="founder" src={F.photo} alt={F.alt.fr} width={900} height={1125} sizes="(max-width: 700px) 70vw, 320px" />
      <p><b>{F.name}</b> est {F.jobTitle.fr.toLowerCase()}, {F.specialty.fr}. Il a fondé OTAGE.</p>
      <blockquote className="quote">
        <p>« {F.story.fr} »</p>
        <footer>{F.name}, fondateur d'OTAGE</footer>
      </blockquote>

      <h2>Ce que nous faisons</h2>
      <p>Nous proposons une routine anti-taches en 4 soins, pensée pour les taches brunes, les taches pigmentaires et le teint irrégulier, ainsi qu'un sérum contour des yeux pour les cernes.</p>
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
        <li><b>Livraison en {site.delivery.label.fr}</b> partout au Maroc : offerte pour la gamme complète, de {site.delivery.unitFee.min} à {site.delivery.unitFee.max} DH selon la ville à l'unité.</li>
      </ul>

      <h2>Fabriqué au Maroc, avec un laboratoire partenaire</h2>
      <p>Nos soins sont fabriqués au Maroc, en collaboration avec un laboratoire partenaire, avec des ingrédients comme la figue de Barbarie et le louban. « ما كنبيعوش الوهم، كنبيعو النتيجة » : c'est notre devise, en darija.</p>

      <h2>Une question ? On te répond</h2>
      <p>Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, {site.availability.fr} : <a href={waLink()} target="_blank" rel="noopener">WhatsApp <span dir="ltr">{site.whatsapp.display}</span></a>, <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> ou <a href={site.instagram.url} target="_blank" rel="noopener">Instagram <span dir="ltr">{site.instagram.handle}</span></a>.</p>
    </TextPage>
  );
}
