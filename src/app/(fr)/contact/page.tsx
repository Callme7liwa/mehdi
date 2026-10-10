import { WaIcon } from "@/components/icons";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/contact",
  label: "Contact",
  title: "Contacter OTAGE : WhatsApp et Instagram",
  description: `Une question sur ta peau, un soin ou ta commande ? Écris à OTAGE sur WhatsApp au ${site.whatsapp.display} ou sur Instagram ${site.instagram.handle}. Les fondateurs répondent eux-mêmes.`,
  h1: "Nous contacter",
  schemaType: "ContactPage",
};
export const metadata = textMetadata(info);

export default function Page() {
  return (
    <TextPage info={info} lead="Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, on te répond nous-mêmes.">
      <h2>WhatsApp</h2>
      <p>Le plus rapide : <b dir="ltr">{site.whatsapp.display}</b> (<span dir="ltr">{site.whatsapp.e164}</span>).</p>
      <p><a className="btn btn-wa" href={waLink("Bonjour OTAGE, j'ai une question.")} target="_blank" rel="noopener">Écrire sur WhatsApp<WaIcon /></a></p>

      <h2>Instagram</h2>
      <p><a href={site.instagram.url} target="_blank" rel="noopener">{site.instagram.handle}</a> : nos nouveautés, et les messages privés pour nous écrire.</p>

      <h2>Commander</h2>
      <p>Tu peux commander <a href="/#offres">sur le site</a> ou directement sur WhatsApp. Livraison offerte partout au Maroc en {site.delivery.label.fr}, paiement à la livraison.</p>
      {/* TODO : horaires de réponse, adresse e-mail et adresse postale, si OTAGE souhaite les afficher. */}
    </TextPage>
  );
}
