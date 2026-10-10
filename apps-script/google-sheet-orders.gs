/* OTAGE — reçoit les commandes de la page et les ajoute au Google Sheet.
   À coller dans le tableur : Extensions → Apps Script, puis Déployer → Nouveau déploiement
   → Application web (Exécuter en tant que : Moi, Accès : Tout le monde). */

const COLUMNS = [
  ["Date", (o) => new Date()],
  ["Ticket", (o) => o.ticket],
  ["Nom", (o) => o.nom],
  ["Téléphone", (o) => o.tel],
  ["Ville", (o) => o.ville],
  ["Adresse", (o) => o.adresse],
  ["Produit", (o) => o.produit],
  ["Format", (o) => o.format],
  ["Quantité", (o) => o.quantite],
  ["Total (DH)", (o) => Number(o.total) || 0],
  ["Offre", (o) => o.offre],
  ["Statut", (o) => "Nouvelle"],
  ["Page", (o) => o.page],
  ["ID", (o) => o.id],
];
const TEXT_COLUMNS = ["Ticket", "Téléphone", "Quantité", "ID"]; // sinon le 0 du numéro disparaît
const col = (name) => COLUMNS.findIndex((c) => c[0] === name) + 1;

// une cellule qui commence par = + - @ serait lue comme une formule
const clean = (v) => {
  if (typeof v !== "string") return v == null ? "" : v;
  const s = v.trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
};

function getSheet() {
  const ss = SpreadsheetApp.openById("14SBpJ9umRZwCV0hEGe-Mw40MaOFobzwyyOSuBJslhGw");
  const sheet = ss.getSheets().find((s) => s.getSheetId() === 0) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map((c) => c[0]));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    TEXT_COLUMNS.forEach((n) => sheet.getRange(1, col(n), sheet.getMaxRows(), 1).setNumberFormat("@"));
    sheet.getRange(1, col("Date"), sheet.getMaxRows(), 1).setNumberFormat("dd/MM/yyyy HH:mm");
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // deux commandes en même temps ne s'écrasent pas
  try {
    const o = JSON.parse(e.postData.contents);
    if (!o.nom || !o.tel) return ContentService.createTextOutput("ignored");
    const sheet = getSheet();
    // la page renvoie une commande restée en attente : on ne l'écrit pas deux fois
    const last = sheet.getLastRow();
    if (o.id && last > 1) {
      const n = Math.min(200, last - 1);
      const ids = sheet.getRange(last - n + 1, col("ID"), n, 1).getValues().map((r) => String(r[0]));
      if (ids.indexOf(String(o.id)) !== -1) return ContentService.createTextOutput("duplicate");
    }
    sheet.appendRow(COLUMNS.map((c) => clean(c[1](o))));
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}

// ouvrir l'URL /exec dans le navigateur doit afficher ce message
function doGet() {
  return ContentService.createTextOutput("OTAGE commandes : OK");
}
