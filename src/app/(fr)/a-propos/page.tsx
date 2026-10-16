import Link from "next/link";
import Img from "@/components/Img";
import { site, waLink } from "@/data/site";
import { founderLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

const F = site.founder;
const info = {
  path: "/a-propos",
  label: "À propos",
  title: "À propos d'OTAGE : soins créés par un pharmacien",
  description: `OTAGE, marque marocaine de soins créée par le ${site.founder.name}, pharmacien : prix affichés, pas de promesse miracle, paiement à la livraison.`,
  h1: "OTAGE : des soins honnêtes, fabriqués au Maroc",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info);

/* TODO (à fournir par OTAGE, rien n'est inventé ici) : année de création, parcours détaillé du fondateur. */
export default function Page() {
  return (
    <TextPage info={info} extraLd={[founderLd("fr")]} lead="OTAGE est une marque marocaine de soins, créée par un pharmacien. On te dit ce que fait chaque soin, sans promesse miracle.">
      <h2>Le fondateur</h2>
      <Img className="founder" src={F.photo} alt={F.alt.fr} width={900} height={1125} sizes="(max-width: 700px) 70vw, 320px" />
      <p><b>{F.name}</b> est {F.jobTitle.fr.toLowerCase()}, {F.specialty.fr}. Il a fondé OTAGE.</p>
      <blockquote className="quote">
        <p>« {F.story.fr} »</p>
        <footer>{F.name}, fondateur d'OTAGE</footer>
      </blockquote>

      <h2>Ce que nous faisons</h2>
      <p>Une routine anti-taches en 4 soins, un sérum contour des yeux et un déodorant crème. <Link href="/soins">Voir les 6 soins et leurs actifs</Link>.</p>

      <h2>Honnêtes, concrètement</h2>
      <ul>
        <li><b>Prix affichés :</b> le ticket se remplit sous tes yeux.</li>
        <li><b>Pas de promesse miracle :</b> les taches s'atténuent petit à petit.</li>
        <li><b>Paiement à la livraison :</b> rien à avancer en ligne.</li>
        <li><b>Livraison en {site.delivery.label.fr}</b>, offerte avec la gamme complète.</li>
      </ul>

      <h2>Fabriqué au Maroc, avec un laboratoire partenaire</h2>
      <p>Fabriqués au Maroc avec un laboratoire partenaire, à partir d'ingrédients comme le louban.</p>
      {/* la devise en darija reste la signature de la marque ; sa paraphrase française (« on vend le résultat ») est retirée */}
      <p lang="ar" dir="rtl">« ما كنبيعوش الوهم، كنبيعو النتيجة »</p>

      <h2>Une question ? On te répond</h2>
      <p>Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, {site.availability.fr} : <a href={waLink()} target="_blank" rel="noopener">WhatsApp <span dir="ltr">{site.whatsapp.display}</span></a>, <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> ou <a href={site.instagram.url} target="_blank" rel="noopener">Instagram <span dir="ltr">{site.instagram.handle}</span></a>.</p>
    </TextPage>
  );
}
