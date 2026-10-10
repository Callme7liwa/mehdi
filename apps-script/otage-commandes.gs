/**
 * OTAGE : enregistre chaque commande du site dans ce Google Sheet.
 * Le fichier s'ouvre dans Excel (Fichier > Télécharger > Microsoft Excel .xlsx).
 *
 * Installation : voir les étapes dans la conversation.
 */

const ONGLET = "Commandes";
// Facultatif : mets ton email pour recevoir une alerte à chaque commande (laisse "" pour désactiver).
const EMAIL_ALERTE = "";

const COLONNES = [
  "Date", "N° ticket", "Nom", "Téléphone", "Ville", "Adresse",
  "Produit", "Format", "Quantité", "Total (DH)", "Offre", "Statut", "Page",
];

function doPost(e) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000); // deux commandes en même temps ne s'écrasent pas
  try {
    const c = JSON.parse(e.postData.contents);
    if (!c || !c.nom || !c.tel) return reponse({ ok: false, erreur: "commande incomplète" });

    const feuille = onglet();
    feuille.appendRow([
      new Date(),
      c.ticket || "",
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
    ]);

    if (EMAIL_ALERTE) {
      MailApp.sendEmail(
        EMAIL_ALERTE,
        "Nouvelle commande OTAGE : " + c.nom + ", " + c.total + " DH",
        [c.offre, "Téléphone : " + c.tel, "Ville : " + c.ville, "Adresse : " + (c.adresse || "à demander")].join("\n")
      );
    }
    return reponse({ ok: true });
  } catch (err) {
    return reponse({ ok: false, erreur: String(err) });
  } finally {
    verrou.releaseLock();
  }
}

/* Crée l'onglet et la ligne de titres la première fois */
function onglet() {
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  let f = classeur.getSheetByName(ONGLET);
  if (!f) f = classeur.insertSheet(ONGLET);
  if (f.getLastRow() === 0) {
    f.appendRow(COLONNES);
    f.setFrozenRows(1);
    f.getRange(1, 1, 1, COLONNES.length).setFontWeight("bold").setBackground("#4a0d16").setFontColor("#f7efe6");
    f.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");
    // liste déroulante pour le statut
    const regle = SpreadsheetApp.newDataValidation()
      .requireValueInList(["À confirmer", "Confirmée", "Expédiée", "Livrée", "Annulée"], true).build();
    f.getRange("L2:L").setDataValidation(regle);
  }
  return f;
}

function reponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Pour tester sans le site : Exécuter > testerCommande */
function testerCommande() {
  doPost({ postData: { contents: JSON.stringify({
    ticket: "0000", nom: "Test", tel: "06 12 34 56 78", ville: "Fès", adresse: "",
    produit: "Gamme anti-taches", format: "Petit format", quantite: "3 (2 + 1 offerte)",
    total: 598, offre: "Petit format, 2 gammes + 1 offerte", page: "test",
  }) } });
}
