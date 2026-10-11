import Link from "next/link";
import { bundleUnit, gamme, yeuxPrice } from "@/data/products";
import { site } from "@/data/site";
import TextPage, { textMetadata, Todo } from "@/templates/TextPage";

const L = site.legal;
const info = {
  path: "/cgv",
  label: "CGV",
  title: "Conditions générales de vente | OTAGE",
  description: "Conditions générales de vente OTAGE : produits, prix en dirhams, commande, livraison au Maroc, paiement à la livraison, retour sous 7 jours.",
  h1: "Conditions générales de vente",
  draft: !L.raisonSociale,
};
export const metadata = textMetadata(info);
const P = gamme.formats.petit, G = gamme.formats.grand;

/* Structure à faire valider par un juriste. Les TODO correspondent aux informations qu'OTAGE doit fournir. */
export default function Page() {
  return (
    <TextPage info={info}>
      <h2>1. Objet</h2>
      <p>Les présentes conditions régissent les ventes de produits cosmétiques OTAGE conclues sur le site {site.url.replace("https://", "")} ou par WhatsApp, entre {L.raisonSociale ?? <Todo>raison sociale du vendeur</Todo>} et ses clientes et clients au Maroc.</p>

      <h2>2. Produits</h2>
      <p>Les produits proposés sont ceux présentés sur le site au jour de la commande : la gamme anti-taches (gel nettoyant, sérum, crème, écran solaire SPF 50), en Petit ou Grand format, et le sérum contour des yeux. Les photos ne sont pas contractuelles.</p>

      <h2>3. Prix</h2>
      <p>Les prix sont indiqués en dirhams marocains (DH). <Todo>préciser si les prix sont TTC</Todo></p>
      <ul>
        <li>Gamme anti-taches Petit format : {P.price} DH. Grand format : {G.price} DH.</li>
        <li>Offre 2 + 1 : pour 2 gammes achetées, la 3e est offerte (soit {bundleUnit(P.price)} DH la gamme en Petit format, {bundleUnit(G.price)} DH en Grand format).</li>
        <li>Sérum contour des yeux : {yeuxPrice} DH, ou {bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1.</li>
      </ul>
      <p>Les prix applicables sont ceux affichés au moment de la commande.</p>

      <h2>4. Commande</h2>
      <p>La commande se passe sur le site (nom, téléphone, ville, adresse) ou par WhatsApp. Elle devient définitive après confirmation par téléphone avec OTAGE.</p>

      <h2>5. Livraison</h2>
      <p>La livraison se fait partout au Maroc. Elle est offerte pour l'achat d'une gamme complète. Pour un achat à l'unité, les frais de livraison sont de {site.delivery.unitFee.min} à {site.delivery.unitFee.max} DH selon la ville ; ils s'ajoutent au total et sont confirmés à la cliente avant l'envoi. Le délai indicatif est de {site.delivery.label.fr} après confirmation de la commande.</p>

      <h2>6. Paiement</h2>
      <p>Le paiement se fait à la livraison, en espèces, à la remise du colis. Aucun paiement n'est demandé en ligne.</p>

      <h2 id="retours">7. Droit de rétractation, retours et réclamations</h2>
      <p><b>{site.returns.right.fr}</b></p>
      <p>La cliente dispose d'un délai de {site.returns.days} jours à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à se justifier ni à payer de pénalité. Il suffit de prévenir OTAGE dans ce délai, sur WhatsApp au <span dir="ltr">{site.whatsapp.display}</span> ou par e-mail à <span dir="ltr">{site.email}</span>, en indiquant son nom et son numéro de commande.</p>
      {/* À faire valider par un juriste : exception des produits cosmétiques ouverts.
          Le site écrit « produits non ouverts et non utilisés » ; vérifier que cette condition est compatible avec les
          exceptions au droit de rétractation prévues par la loi 31-08 (produits descellés ne pouvant être repris pour des
          raisons d'hygiène) et la formuler comme la loi l'exige. */}
      <p>Les produits retournés doivent être non ouverts et non utilisés, dans leur emballage d'origine. Les frais de retour sont pris en charge par OTAGE.</p>
      {/* À faire valider par un juriste : délai de remboursement.
          La loi 31-08 encadre le délai dans lequel le vendeur doit rembourser après une rétractation ; le délai exact
          et son point de départ sont à confirmer avant d'être écrits ici. */}
      <p>Au choix de la cliente, OTAGE rembourse les sommes versées ou échange le produit. <Todo>délai de remboursement (à valider par un juriste)</Todo></p>
      <p>{site.claims.fr}</p>

      <h2>8. Précautions d'emploi</h2>
      <p>Les soins OTAGE sont des produits cosmétiques, à usage externe. Fais un essai sur une petite zone avant la première utilisation. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Enceinte ou allaitante, demande d'abord l'avis de ton médecin ou de ton pharmacien.</p>

      <h2>9. Données personnelles</h2>
      <p>Les données recueillies servent uniquement à traiter la commande. Voir les <Link href="/mentions-legales">mentions légales</Link>.</p>

      <h2>10. Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit marocain. <Todo>tribunal compétent en cas de litige</Todo></p>
    </TextPage>
  );
}
