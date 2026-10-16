import { googleMaps } from "@/data/google";
import Link from "next/link";
import { WaIcon } from "@/components/icons";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/contact",
  label: "Contact",
  title: "Contacter OTAGE : WhatsApp, e-mail et Instagram",
  description: `Une question sur ta peau, un soin ou ta commande ? Écris à OTAGE sur WhatsApp, par e-mail ou sur Instagram ${site.instagram.handle}. On te répond ${site.availability.fr}, 7 j/7.`,
  h1: "Contacter OTAGE",
  schemaType: "ContactPage",
};
export const metadata = textMetadata(info);

export default function Page() {
  return (
    <TextPage info={info} lead="Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, on te répond nous-mêmes.">
      <h2>WhatsApp</h2>
      <p>Le plus rapide : <b dir="ltr">{site.whatsapp.display}</b> (<span dir="ltr">{site.whatsapp.e164}</span>).</p>
      <p><a className="btn btn-wa" href={waLink("Bonjour OTAGE, j'ai une question.")} target="_blank" rel="noopener">Écrire sur WhatsApp<WaIcon /></a></p>

      <h2>E-mail</h2>
      <p><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></p>

      <h2>Disponibilité</h2>
      <p>Nous répondons {site.availability.fr}, 7 jours sur 7.</p>

      <h2>Instagram</h2>
      <p><a href={site.instagram.url} target="_blank" rel="noopener">{site.instagram.handle}</a> : nos nouveautés, et les messages privés pour nous écrire.</p>

      <h2>Google Maps</h2>
      <p><a href={googleMaps} target="_blank" rel="noopener">OTAGE.MA sur Google Maps</a> : notre fiche Google, pour nous trouver et laisser un avis.</p>

      <h2>Commander</h2>
      <p>Commande <Link href="/#offres">sur le site</Link> ou sur WhatsApp. Livraison en {site.delivery.label.fr}, paiement à la livraison.</p>
      {/* TODO : adresse postale, si OTAGE souhaite l'afficher. */}
    </TextPage>
  );
}
