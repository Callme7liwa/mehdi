import Link from "next/link";
import FaqList from "@/components/FaqList";
import { faq } from "@/data/faq";
import { abs, site, waLink } from "@/data/site";
import { faqLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/livraison-paiement",
  label: "Livraison et paiement",
  title: "Livraison, paiement à la livraison et retours | OTAGE",
  description: `Livraison OTAGE en ${site.delivery.label.fr} partout au Maroc : offerte pour la gamme complète, de ${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH à l'unité. Paiement à la livraison, en espèces.`,
  h1: "Livraison et paiement",
};
export const metadata = textMetadata(info);

const questions = ["Je paie quand ?", "La livraison est payante ?", "Je suis livrée en combien de temps ?", "Et après ma commande ?", "Et si j'ai un problème avec ma commande ?", "Je peux retourner ma commande ?"];
const items = faq.fr.filter((f) => questions.includes(f.q));

export default function Page() {
  return (
    <TextPage info={info} lead={`Livraison en ${site.delivery.label.fr} partout au Maroc, offerte pour la gamme complète. Tu paies à la réception, en espèces.`} extraLd={[faqLd(items, `${abs(info.path)}#faq`)]}>
      <h2>Comment se passe une commande</h2>
      <ol>
        <li><b>Tu commandes</b> sur le site en 20 secondes (nom, téléphone, ville) ou sur WhatsApp.</li>
        <li><b>On t'appelle</b> pour confirmer ta commande et ton adresse.</li>
        <li><b>Ton colis part</b> et arrive en {site.delivery.label.fr}, partout au Maroc.</li>
        <li><b>Tu paies à la réception</b>, en espèces, quand le livreur te remet ton colis.</li>
      </ol>

      <h2>Livraison</h2>
      <ul>
        <li>Zone : tout le Maroc.</li>
        <li>Délai : {site.delivery.label.fr}.</li>
        <li>Gamme complète : livraison <b>offerte</b>, quel que soit le format ou le nombre de gammes.</li>
        <li>Achat à l'unité (un ou plusieurs soins séparés, sérum contour des yeux) : <b>de {site.delivery.unitFee.min} à {site.delivery.unitFee.max} DH selon la ville</b>, ajoutés au total. On te confirme le montant exact par téléphone, avant l'envoi.</li>
      </ul>

      <h2>Paiement</h2>
      <ul>
        <li>À la livraison, en espèces.</li>
        <li>Rien à payer en ligne, pas besoin de carte bancaire.</li>
      </ul>

      <h2 id="retours">Retours et droit de rétractation</h2>
      <p><b>{site.returns.right.fr}</b></p>
      <ul>
        <li>Tu as {site.returns.days} jours après la réception de ton colis pour nous dire que tu veux le retourner, même si tu as simplement changé d'avis.</li>
        <li>Les produits doivent être non ouverts et non utilisés.</li>
        <li>Les frais de retour sont pris en charge par OTAGE.</li>
        <li>Tu choisis : remboursement ou échange.</li>
      </ul>
      <p>Pour lancer un retour, écris-nous sur <a href={waLink("Bonjour OTAGE, je souhaite retourner ma commande.")} target="_blank" rel="noopener">WhatsApp au <span dir="ltr">{site.whatsapp.display}</span></a> avec ton nom et ton numéro de commande. Le détail est dans les <Link href="/cgv">conditions générales de vente</Link>.</p>

      <h2>Réclamations</h2>
      <p>{site.claims.fr}</p>
      <p>Écris-nous sur <a href={waLink("Bonjour OTAGE, j'ai une réclamation concernant ma commande.")} target="_blank" rel="noopener">WhatsApp au <span dir="ltr">{site.whatsapp.display}</span></a>, on regarde ça avec toi.</p>

      <h2 id="faq">Questions fréquentes</h2>
      <FaqList items={items} />
    </TextPage>
  );
}
