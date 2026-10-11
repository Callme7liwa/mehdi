/**
 * OTAGE : enregistre chaque commande du site dans ce Google Sheet.
 * Le fichier s'ouvre dans Excel (Fichier > Télécharger > Microsoft Excel .xlsx).
 *
 * Le site n'appelle plus ce script depuis le navigateur : c'est le serveur (route /api/order) qui le fait.
 * L'adresse du script (…/exec) se met dans la variable d'environnement ORDERS_ENDPOINT, sur Vercel.
 *
 * Mise à jour d'un script déjà installé : remplacer tout le code par celui-ci, puis
 * Déployer > Gérer les déploiements > (crayon) > Version : Nouvelle version > Déployer. L'adresse ne change pas.
 * Les colonnes « E-mail », « E-mail de confirmation » et « Langue » s'ajoutent toutes seules à droite du tableau.
 */

const ONGLET = "Commandes";
// Facultatif : alerte par e-mail envoyée par Google à chaque commande (laisse "" : le site envoie déjà sa notification).
const EMAIL_ALERTE = "";

const COLONNES = [
  "Date", "N° de commande", "Nom", "Téléphone", "Ville", "Adresse",
  "Produit", "Format", "Quantité", "Total (DH)", "Offre", "Statut", "Page",
  "E-mail", "E-mail de confirmation", "Langue",
];
const COL = { ticket: 2, emailStatut: 15 };

function doPost(e) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000); // deux commandes en même temps ne s'écrasent pas
  try {
    const c = JSON.parse(e.postData.contents);
    const feuille = onglet();

    // le site note ce qu'il est advenu de l'e-mail de confirmation : « envoyé », « échec : … », « pas d'adresse »
    if (c && c.action === "email") {
      const ligne = trouver(feuille, c.ticket);
      if (!ligne) return reponse({ ok: false, erreur: "commande introuvable" });
      feuille.getRange(ligne, COL.emailStatut).setValue(c.statut || "");
      return reponse({ ok: true });
    }

    if (!c || !c.nom || !c.tel) return reponse({ ok: false, erreur: "commande incomplète" });

    // numéro de commande unique : si celui du site existe déjà, on change ses 4 derniers chiffres
    let ticket = String(c.ticket || "");
    for (let essai = 0; ticket && trouver(feuille, ticket) && essai < 20; essai++) {
      ticket = ticket.replace(/\d{4}$/, String(Math.floor(1000 + Math.random() * 9000)));
    }

    feuille.appendRow([
      new Date(),
      ticket,
      c.nom,
      "'" + c.tel,            // l'apostrophe garde le 0 du début (06…)
      c.ville || "",
      c.adresse || "",
      c.produit || "",
      c.format || "",
      c.quantite || "",
      Number(c.total) || "",
      c.offre || "",
      "À confirmer",          // ton équipe change ce statut après l'appel
      c.page || "",
      c.email || "",
      c.email ? "en cours" : "pas d'adresse",
      c.langue || "",
    ]);

    if (EMAIL_ALERTE) {
      MailApp.sendEmail(
        EMAIL_ALERTE,
        "Nouvelle commande OTAGE " + ticket + " : " + c.nom + ", " + c.total + " DH",
        [c.offre, "Téléphone : " + c.tel, "Ville : " + c.ville, "Adresse : " + (c.adresse || "à demander")].join("\n")
      );
    }
    return reponse({ ok: true, ticket: ticket });
  } catch (err) {
    return reponse({ ok: false, erreur: String(err) });
  } finally {
    verrou.releaseLock();
  }
}

/* Ligne d'une commande, d'après son numéro (0 si elle n'existe pas) */
function trouver(feuille, ticket) {
  if (!ticket || feuille.getLastRow() < 2) return 0;
  const trouve = feuille.getRange(2, COL.ticket, feuille.getLastRow() - 1, 1).createTextFinder(String(ticket)).matchEntireCell(true).findNext();
  return trouve ? trouve.getRow() : 0;
}

/* Crée l'onglet et la ligne de titres la première fois ; ajoute les nouvelles colonnes à un tableau existant */
function onglet() {
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  let f = classeur.getSheetByName(ONGLET);
  if (!f) f = classeur.insertSheet(ONGLET);
  if (f.getLastRow() === 0) {
    f.appendRow(COLONNES);
    f.setFrozenRows(1);
    f.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");
    // liste déroulante pour le statut
    const regle = SpreadsheetApp.newDataValidation()
      .requireValueInList(["À confirmer", "Confirmée", "Expédiée", "Livrée", "Annulée"], true).build();
    f.getRange("L2:L").setDataValidation(regle);
  } else if (f.getRange(1, COLONNES.length).getValue() !== COLONNES[COLONNES.length - 1]) {
    f.getRange(1, 1, 1, COLONNES.length).setValues([COLONNES]);
  }
  f.getRange(1, 1, 1, COLONNES.length).setFontWeight("bold").setBackground("#4a0d16").setFontColor("#f7efe6");
  return f;
}

function reponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Pour tester sans le site : Exécuter > testerCommande */
function testerCommande() {
  doPost({ postData: { contents: JSON.stringify({
    ticket: "OTG-0000-0000", nom: "Test", tel: "06 12 34 56 78", ville: "Fès", adresse: "",
    produit: "Gamme anti-taches", format: "Petit format", quantite: "3 (2 + 1 offerte)",
    total: 598, offre: "Petit format, 2 gammes + 1 offerte (livraison offerte)", page: "test", email: "", langue: "fr",
  }) } });
}
