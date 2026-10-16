/* POST /api/order : la seule porte d'entrée des commandes.
   Le navigateur envoie ce que la cliente a choisi ; le serveur valide, recalcule les prix à partir de
   src/data/products.ts, attribue le numéro de commande, enregistre dans le tableur, renvoie le numéro,
   puis envoie l'e-mail de confirmation (si la cliente a donné son adresse).
   L'adresse du script Google (ORDERS_ENDPOINT) reste côté serveur. */
import { orderNumber, phoneE164, priceOrder, validateOrder } from "@/lib/order/compute";
import { count, limited, remember, replay } from "@/lib/order/guard";
import { after } from "next/server";
import { renderConfirmation, renderShopNotification } from "@/emails/render";
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
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";
  let numero = orderNumber();
  const mail = { locale: order.locale, numero, date: new Date(), nom: order.nom, tel: order.tel, ville: order.ville, adresse: order.adresse, priced };
  /* Règle : la cliente ne voit une confirmation que si la commande est enregistrée quelque part.
     - tableur OK : succès ;
     - tableur en panne, e-mail de secours à la boutique (SHOP_EMAIL) OK : succès + alerte dans les journaux ;
     - les deux en panne : 500, la cliente est invitée à commander sur WhatsApp. */
  let recorded = true;
  try {
    numero = await recordOrder({
      ticket: numero, nom: order.nom, tel: order.tel, ville: order.ville, adresse: order.adresse ?? "",
      ...priced.sheet,
      // le total du tableur est celui des produits ; les frais éventuels sont écrits dans la colonne « Offre »
      total: priced.subtotal,
      email: order.email ?? "", langue: order.locale,
      page,
    });
    mail.numero = numero;
  } catch (e) {
    recorded = false;
    console.error("ALERTE commande non enregistrée dans le tableur :", numero, e);
  }
  if (!recorded) {
    const shop = process.env.SHOP_EMAIL;
    const rescue = shop
      ? await renderShopNotification({ ...mail, email: order.email, page })
        .then((m) => sendEmail({
          to: shop, replyTo: order.email,
          subject: `[NON ENREGISTRÉE DANS LE TABLEUR] ${m.subject}`,
          html: `<p style="color:#c41e30;font-weight:700">⚠ Tableur indisponible : cette commande n'y est pas. À saisir à la main.</p>${m.html}`,
          text: `⚠ Tableur indisponible : cette commande n'y est pas. À saisir à la main.\n\n${m.text}`,
        }))
        .catch((e) => ({ ok: false as const, error: String(e) }))
      : { ok: false as const, error: "SHOP_EMAIL absent" };
    if (!rescue.ok) {
      console.error("COMMANDE PERDUE : ni tableur ni e-mail de secours :", numero, rescue.error);
      return json({ ok: false, error: "enregistrement" }, 500);
    }
    console.error("ALERTE commande", numero, "envoyée seulement par e-mail à la boutique (tableur indisponible)");
  }
  count("phone", phone); count("ip", ip);

  // E-mails : envoyés après la réponse, jamais bloquants. La commande est déjà enregistrée (tableur ou e-mail de secours).
  after(async () => {
    // notification interne de la boutique (SHOP_EMAIL), pour chaque commande (déjà envoyée en secours si le tableur est en panne)
    const shop = process.env.SHOP_EMAIL;
    if (shop && recorded) {
      const told = await renderShopNotification({ ...mail, email: order.email, page }).then((m) => sendEmail({ to: shop, ...m, replyTo: order.email })).catch((e) => ({ ok: false as const, error: String(e) }));
      if (!told.ok) console.error("Notification interne non envoyée :", numero, told.error);
    }
    if (!order.email) return;
    const sent = await renderConfirmation(mail).then((m) => sendEmail({ to: order.email!, ...m })).catch((e) => ({ ok: false as const, error: String(e) }));
    if (!sent.ok) console.error("E-mail de confirmation non envoyé :", numero, sent.error);
    if (recorded) await noteEmail(numero, sent.ok ? "envoyé" : `échec : ${sent.error}`.slice(0, 200));
  });

  const response = { ok: true, numero, subtotal: priced.subtotal, fee: priced.fee, total: priced.total, saving: priced.saving };
  if (id) remember(id, response);
  return json(response);
}

/* GET /api/order : diagnostic des variables d'environnement des commandes, hors production seulement (preview, local).
   Renvoie seulement si chaque variable est définie (oui / non), jamais sa valeur. */
export async function GET() {
  if (process.env.VERCEL_ENV === "production") return new Response("Not found", { status: 404 });
  const names = ["ORDERS_ENDPOINT", "SHOP_EMAIL", "RESEND_API_KEY", "EMAIL_FROM"] as const;
  return json({ environnement: process.env.VERCEL_ENV ?? "local", variables: Object.fromEntries(names.map((n) => [n, Boolean(process.env[n])])) });
}
