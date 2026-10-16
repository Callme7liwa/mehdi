import { site, waLink, abs } from "@/data/site";
import type { Faq } from "@/data/faq";
import { faqLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

const info = {
  path: "/livraison-paiement",
  label: "Livraison et paiement",
  title: `Livraison ${site.delivery.label.fr}, paiement à la livraison | OTAGE`,
  description: `Livraison en ${site.delivery.label.fr} partout au Maroc : offerte pour la gamme complète, ${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH à l'unité. Paiement à la livraison, retour sous ${site.returns.days} jours.`,
  h1: "Livraison et paiement à la livraison",
};
export const metadata = textMetadata(info);

const wa = (msg: string) => `<a href="${waLink(msg)}" target="_blank" rel="noopener">WhatsApp au <span dir="ltr">${site.whatsapp.display}</span></a>`;

/* Chaque section de la page est une question : le même texte sert au HTML et au JSON-LD FAQPage (aucun doublon).
   Le droit de rétractation (site.returns) et les réclamations (site.claims) sont repris mot pour mot des CGV. */
const items: (Faq & { id?: string })[] = [
  { q: "En combien de temps suis-je livrée ?", a: [`<b>${site.delivery.label.fr}</b>, partout au Maroc. On t'appelle d'abord pour confirmer.`] },
  { q: "Combien coûte la livraison ?", a: [`Offerte pour une gamme complète. À l'unité : <b>${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH</b> selon ta ville, confirmés par téléphone.`] },
  { q: "Comment je paie ?", a: ["À la livraison, en espèces. Rien à payer en ligne."] },
  {
    id: "retours",
    q: "Puis-je retourner ma commande ?",
    a: [
      `<b>${site.returns.right.fr}</b>`,
      `Préviens-nous sous ${site.returns.days} jours après réception. Produits non ouverts et non utilisés, retour à nos frais, remboursement ou échange.`,
      `Écris-nous sur ${wa("Bonjour OTAGE, je souhaite retourner ma commande.")}, avec ton nom et ton numéro de commande. Détails dans les <a href="/cgv">conditions générales de vente</a>.`,
    ],
  },
  { q: "Et si mon colis a un problème ?", a: [site.claims.fr, `Écris-nous sur ${wa("Bonjour OTAGE, j'ai une réclamation concernant ma commande.")}.`] },
];

export default function Page() {
  return (
    <TextPage info={info} lead={`Livraison en ${site.delivery.label.fr} partout au Maroc, offerte pour la gamme complète. Paiement à la livraison, en espèces.`} extraLd={[faqLd(items, `${abs(info.path)}#faq`)]}>
      <h2>Comment se passe une commande ?</h2>
      <ol>
        <li><b>Tu commandes</b> sur le site en 20 secondes (nom, téléphone, ville) ou sur WhatsApp.</li>
        <li><b>On t'appelle</b> pour confirmer ta commande et ton adresse.</li>
        <li><b>Ton colis part</b> et arrive en {site.delivery.label.fr}, partout au Maroc.</li>
        <li><b>Paiement à la livraison</b>, en espèces, quand le livreur te remet ton colis.</li>
      </ol>

      <div id="faq">
        {items.map((f) => (
          <section key={f.q}>
            <h2 id={f.id}>{f.q}</h2>
            {f.a.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
          </section>
        ))}
      </div>
    </TextPage>
  );
}
