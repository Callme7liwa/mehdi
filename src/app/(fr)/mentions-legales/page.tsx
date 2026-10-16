import { gtmId } from "@/data/google";
import { site } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

const L = site.legal;
const info = {
  path: "/mentions-legales",
  label: "Mentions légales",
  title: "Mentions légales | OTAGE",
  description: "Mentions légales du site otage.ma : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  h1: "Mentions légales",
  // tant que les informations juridiques ne sont pas renseignées dans src/data/site.ts, la page reste hors de l'index
  draft: !L.raisonSociale || !L.formeJuridique || !L.ice || !L.rc || !L.adresse || !L.cndp,
};
export const metadata = textMetadata(info);

/* Structure à faire valider par un juriste. Les informations manquantes se renseignent dans src/data/site.ts (legal). */
export default function Page() {
  return (
    <TextPage info={info}>
      {/* Champs retirés de la page tant que l'information manque (aucun « À compléter » visible) :
          raison sociale, forme juridique, ICE, registre du commerce, siège social, e-mail, directeur de la publication.
          Chaque ligne réapparaît toute seule dès que sa valeur est renseignée dans src/data/site.ts (bloc legal). */}
      <h2>Éditeur du site</h2>
      <ul>
        {L.raisonSociale && <li>Raison sociale : {L.raisonSociale}</li>}
        {L.formeJuridique && <li>Forme juridique : {L.formeJuridique}</li>}
        {L.ice && <li>ICE : {L.ice}</li>}
        {L.rc && <li>Registre du commerce : {L.rc}</li>}
        {L.adresse && <li>Siège social : {L.adresse}</li>}
        {L.email && <li>E-mail : {L.email}</li>}
        <li>Téléphone / WhatsApp : <span dir="ltr">{site.whatsapp.e164}</span></li>
        {L.directeurPublication && <li>Directeur de la publication : {L.directeurPublication}</li>}
      </ul>

      <h2>Hébergeur</h2>
      <p>{L.hebergeur}</p>

      <h2>Propriété intellectuelle</h2>
      <p>La marque OTAGE, le logo, les textes, les photos et les vidéos de ce site appartiennent à l'éditeur. Toute reproduction sans autorisation écrite est interdite.</p>

      <h2>Données personnelles</h2>
      <p>Quand tu passes une commande, nous recueillons ton nom, ton numéro de téléphone, ta ville et, si tu la donnes, ton adresse. Ces informations servent uniquement à confirmer et livrer ta commande. Elles sont enregistrées dans un tableur Google (Google Sheets) et transmises au transporteur pour la livraison. Elles ne sont pas vendues.</p>
      <p>Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, tu peux demander l'accès, la rectification ou la suppression de tes données en nous écrivant sur WhatsApp.</p>
      {/* numéro CNDP : la phrase réapparaît dès que legal.cndp est renseigné */}
      {L.cndp && <p>Déclaration à la CNDP : {L.cndp}</p>}

      <h2 id="cookies">Cookies et mesure d'audience</h2>
      <p>Ce site n'utilise pas de cookies publicitaires. Il enregistre seulement, dans ton navigateur, tes préférences d'affichage et les informations de livraison que tu as saisies, pour t'éviter de les retaper.</p>
      {/* affiché seulement quand la mesure d'audience est configurée (GTM ou GA4) */}
      {(gtmId || site.gaId) && (
        <>
          <p><b>Mesure d'audience (Google Analytics), seulement avec ton accord.</b> Quand tu cliques sur « Accepter », nous utilisons Google Analytics, chargé par Google Tag Manager, pour mesurer la fréquentation du site : pages vues, provenance des visites (Instagram, Google, assistant IA…), type d'appareil, pays ou ville approximatifs, clics vers WhatsApp, offres choisies et commandes envoyées (montant, offre et numéro de commande). Ton nom, ton téléphone, ta ville et ton adresse ne sont jamais transmis.</p>
          <p>Finalité : comprendre comment le site est utilisé, pour l'améliorer. Ces données sont traitées par Google (Google Ireland Limited et Google LLC), y compris hors du Maroc. Les cookies de mesure (_ga, _ga_…) sont conservés 13 mois au plus ; les statistiques, 14 mois au plus.</p>
          <p>Tu peux refuser : sans ton accord, aucun script Google n'est chargé et aucun cookie de mesure n'est déposé, et le site fonctionne de la même façon. Ton choix est gardé dans ton navigateur. Tu peux le changer à tout moment avec le lien « <a href="#cookies" data-cookies="">Gérer les cookies</a> », en bas de chaque page.</p>
        </>
      )}

      <h2>Produits cosmétiques</h2>
      <p>Les soins OTAGE sont des produits cosmétiques. Ils ne remplacent pas un avis médical. En cas de doute, de grossesse, d'allaitement ou de réaction cutanée, demande l'avis d'un médecin ou d'un pharmacien.</p>
    </TextPage>
  );
}
