import { site } from "@/data/site";
import TextPage, { textMetadata, Todo } from "@/templates/TextPage";

const L = site.legal;
const info = {
  path: "/mentions-legales",
  label: "Mentions légales",
  title: "Mentions légales | OTAGE",
  description: "Mentions légales du site otage.ma : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  h1: "Mentions légales",
  // tant que les informations juridiques ne sont pas renseignées dans src/data/site.ts, la page reste hors de l'index
  draft: !L.raisonSociale || !L.ice || !L.adresse,
};
export const metadata = textMetadata(info);
const v = (value: string | null, what: string) => value ?? <Todo>{what}</Todo>;

/* Structure à faire valider par un juriste. Les informations manquantes se renseignent dans src/data/site.ts (legal). */
export default function Page() {
  return (
    <TextPage info={info}>
      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : {v(L.raisonSociale, "raison sociale")}</li>
        <li>Forme juridique : {v(L.formeJuridique, "forme juridique et capital")}</li>
        <li>ICE : {v(L.ice, "numéro ICE")}</li>
        <li>Registre du commerce : {v(L.rc, "numéro RC et ville")}</li>
        <li>Siège social : {v(L.adresse, "adresse")}</li>
        <li>E-mail : {v(L.email, "adresse e-mail")}</li>
        <li>Téléphone / WhatsApp : <span dir="ltr">{site.whatsapp.e164}</span></li>
        <li>Directeur de la publication : {v(L.directeurPublication, "nom du responsable")}</li>
      </ul>

      <h2>Hébergeur</h2>
      <p>{L.hebergeur}</p>

      <h2>Propriété intellectuelle</h2>
      <p>La marque OTAGE, le logo, les textes, les photos et les vidéos de ce site appartiennent à l'éditeur. Toute reproduction sans autorisation écrite est interdite.</p>

      <h2>Données personnelles</h2>
      <p>Quand tu passes une commande, nous recueillons ton nom, ton numéro de téléphone, ta ville et, si tu la donnes, ton adresse. Ces informations servent uniquement à confirmer et livrer ta commande. Elles sont enregistrées dans un tableur Google (Google Sheets) et transmises au transporteur pour la livraison. Elles ne sont pas vendues.</p>
      <p>Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, tu peux demander l'accès, la rectification ou la suppression de tes données en nous écrivant sur WhatsApp.</p>
      <p>Déclaration à la CNDP : <Todo>numéro de déclaration ou d'autorisation CNDP</Todo></p>

      <h2>Cookies</h2>
      <p>Ce site n'utilise pas de cookies publicitaires. Il enregistre seulement, dans ton navigateur, tes préférences d'affichage et les informations de livraison que tu as saisies, pour t'éviter de les retaper.</p>

      <h2>Produits cosmétiques</h2>
      <p>Les soins OTAGE sont des produits cosmétiques. Ils ne remplacent pas un avis médical. En cas de doute, de grossesse, d'allaitement ou de réaction cutanée, demande l'avis d'un médecin ou d'un pharmacien.</p>
    </TextPage>
  );
}
