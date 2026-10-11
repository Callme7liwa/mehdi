/* POST /api/order : la seule porte d'entrée des commandes.
   Le navigateur envoie ce que la cliente a choisi ; le serveur valide, recalcule les prix à partir de
   src/data/products.ts, attribue le numéro de commande, enregistre dans le tableur, renvoie le numéro,
   puis envoie l'e-mail de confirmation (si la cliente a donné son adresse).
   L'adresse du script Google (ORDERS_ENDPOINT) reste côté serveur. */
import { orderNumber, phoneE164, priceOrder, validateOrder } from "@/lib/order/compute";
import { count, limited, remember, replay } from "@/lib/order/guard";
import { after } from "next/server";
import { renderConfirmation } from "@/emails/render";
import { sendEmail } from "@/lib/email/send";
import { noteEmail, recordOrder } from "@/lib/order/sheet";

export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ ok: false, error: "format" }, 400);

  // champ piège, invisible pour une personne : un robot qui le remplit reçoit une réponse normale, et rien n'est enregistré
  if (typeof body.site === "string" && body.site.trim()) return json({ ok: true, numero: orderNumber() });

  const checked = validateOrder(body);
  if (!checked.ok) return json({ ok: false, error: "validation", fields: checked.fields }, 400);
  const order = checked.value;

  // le même formulaire renvoyé (connexion coupée, double clic) ne crée pas une deuxième commande
  const id = typeof body.id === "string" ? body.id.slice(0, 40) : "";
  const before = id && replay(id);
  if (before) return json(before);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
  const phone = phoneE164(order.tel);
  if (limited("phone", phone) || limited("ip", ip)) return json({ ok: false, error: "limite" }, 429);

  const priced = priceOrder(order);
  let numero = orderNumber();
  try {
    numero = await recordOrder({
      ticket: numero, nom: order.nom, tel: order.tel, ville: order.ville, adresse: order.adresse ?? "",
      ...priced.sheet,
      // le total du tableur est celui des produits ; les frais éventuels sont écrits dans la colonne « Offre »
      total: priced.subtotal,
      email: order.email ?? "", langue: order.locale,
      page: typeof body.page === "string" ? body.page.slice(0, 200) : "",
    });
  } catch (e) {
    console.error("Commande non enregistrée :", e);
    return json({ ok: false, error: "enregistrement" }, 502);
  }
  count("phone", phone); count("ip", ip);

  // E-mail de confirmation : envoyé après la réponse, jamais bloquant. La commande est déjà enregistrée ;
  // ce qu'il advient de l'e-mail est noté dans le tableur (« envoyé », « échec : … »).
  const mail = { locale: order.locale, numero, date: new Date(), nom: order.nom, tel: order.tel, ville: order.ville, adresse: order.adresse, priced };
  after(async () => {
    if (!order.email) return;
    const sent = await renderConfirmation(mail).then((m) => sendEmail({ to: order.email!, ...m })).catch((e) => ({ ok: false as const, error: String(e) }));
    if (!sent.ok) console.error("E-mail de confirmation non envoyé :", numero, sent.error);
    await noteEmail(numero, sent.ok ? "envoyé" : `échec : ${sent.error}`.slice(0, 200));
  });

  const response = { ok: true, numero, subtotal: priced.subtotal, fee: priced.fee, total: priced.total, saving: priced.saving };
  if (id) remember(id, response);
  return json(response);
}
