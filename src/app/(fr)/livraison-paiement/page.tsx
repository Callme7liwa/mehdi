import FaqList from "@/components/FaqList";
import { faq } from "@/data/faq";
import { abs, site, waLink } from "@/data/site";
import { faqLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/livraison-paiement",
  label: "Livraison et paiement",
  title: "Livraison offerte et paiement à la livraison | OTAGE",
  description: `Livraison OTAGE offerte partout au Maroc en ${site.delivery.label.fr}. Paiement à la livraison, en espèces : rien à payer en ligne. On t'appelle pour confirmer ta commande.`,
  h1: "Livraison et paiement",
};
export const metadata = textMetadata(info);

const questions = ["Je paie quand ?", "La livraison est payante ?", "Je suis livrée en combien de temps ?", "Et après ma commande ?", "Et si j'ai un problème avec ma commande ?"];
const items = faq.fr.filter((f) => questions.includes(f.q));

export default function Page() {
  return (
    <TextPage info={info} lead={`Livraison offerte partout au Maroc en ${site.delivery.label.fr}. Tu paies à la réception, en espèces.`} extraLd={[faqLd(items, `${abs(info.path)}#faq`)]}>
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
        <li>Frais : offerts, quel que soit le format ou le nombre de gammes.</li>
      </ul>

      <h2>Paiement</h2>
      <ul>
        <li>À la livraison, en espèces.</li>
        <li>Rien à payer en ligne, pas besoin de carte bancaire.</li>
      </ul>

      <h2>Réclamations</h2>
      {/* TODO : délai de retour et frais à définir par OTAGE (site.returns). */}
      <p>{site.claims.fr}</p>
      <p>Écris-nous sur <a href={waLink("Bonjour OTAGE, j'ai une réclamation concernant ma commande.")} target="_blank" rel="noopener">WhatsApp au <span dir="ltr">{site.whatsapp.display}</span></a>, on regarde ça avec toi.</p>

      <h2 id="faq">Questions fréquentes</h2>
      <FaqList items={items} />
    </TextPage>
  );
}
