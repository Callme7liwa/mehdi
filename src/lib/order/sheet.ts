/* Enregistrement des commandes dans le Google Sheet, par le script Apps Script (apps-script/otage-commandes.gs).
   L'adresse du script est dans la variable d'environnement ORDERS_ENDPOINT : elle n'est jamais envoyée au navigateur. */
type Row = Record<string, string | number>;

async function call(body: Row): Promise<Record<string, unknown>> {
  const url = process.env.ORDERS_ENDPOINT;
  if (!url) throw new Error("ORDERS_ENDPOINT n'est pas défini");
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body).replace(/[⁦⁩]/g, ""), redirect: "follow", signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`tableur : HTTP ${res.status}`);
  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (!data || data.ok !== true) throw new Error(`tableur : ${String(data?.erreur ?? "réponse illisible")}`);
  return data;
}

/** Ajoute la commande au tableur. Renvoie le numéro retenu par le tableur (il le change s'il existe déjà). */
export async function recordOrder(row: Row & { ticket: string }) {
  const data = await call(row);
  return typeof data.ticket === "string" && data.ticket ? data.ticket : row.ticket;
}

/** Note dans le tableur ce qu'il est advenu de l'e-mail de confirmation. N'échoue jamais. */
export async function noteEmail(ticket: string, statut: string) {
  try { await call({ action: "email", ticket, statut }); } catch (e) { console.error("Statut de l'e-mail non noté dans le tableur :", ticket, statut, e); }
}
