/* Fabrique les e-mails d'une commande : objet, HTML et version texte.
   La version texte est écrite à partir des mêmes données que le HTML, à chaque envoi : mêmes informations, sans mise en forme. */
import { render } from "@react-email/render";
import { site } from "@/data/site";
import OrderConfirmation, { amount, firstName, orderDate, type OrderEmail } from "./OrderConfirmation";
import ShopNotification, { confirmMessage, shopSubject, type ShopEmail } from "./ShopNotification";
import { phoneE164 } from "@/lib/order/compute";
import { emailText, fill } from "./text";

export type Rendered = { subject: string; html: string; text: string };

/** Pré-en-tête de la confirmation. */
export const preheader = (o: OrderEmail) => fill(emailText[o.locale].preheader, { total: amount(o.priced.total, o.locale), delay: site.delivery.label[o.locale] });

/** La confirmation en texte brut. */
export function textConfirmation(o: OrderEmail) {
  const t = emailText[o.locale], l = o.locale, ar = l === "ar", p = o.priced;
  const path = (x: string) => `${site.url}${ar ? "/ar" : ""}${x}`;
  const kv = (k: string, v: string | number) => `${k}${t.colon}${v}`;
  const rule = "----------------------------------------";
  return [
    fill(t.hello, { name: firstName(o.nom) }),
    t.intro,
    "",
    kv(t.orderNo.replace(/ n°$/, " n°"), o.numero).replace(`n°${t.colon}`, "n° "),
    kv(t.date, orderDate(o.date, l)),
    kv(t.status, t.statusValue),
    "",
    t.recap.toUpperCase(),
    rule,
    ...p.lines.flatMap((x) => [
      `${x.qty} × ${x.name[l]}${t.comma}${x.detail[l]}${t.colon}${x.offered ? (x.product ? t.offeredM : t.offered) : `${x.total} ${t.dh}`}`,
      ...(x.contents.length ? [`   ${t.contains}${t.colon}${x.contents.map((c) => `${c.product.name[l]} ${c.ml} ${ar ? "مل" : "ml"}`).join(t.comma)}`] : []),
    ]),
    rule,
    kv(t.subtotal, `${p.subtotal} ${t.dh}`),
    kv(t.delivery, p.fee ? fill(t.deliveryFee, p.fee) : t.deliveryFree),
    ...(p.saving > 0 ? [kv(t.saving, `${p.saving} ${t.dh}`)] : []),
    kv(t.total.toUpperCase(), amount(p.total, l)),
    ...(p.fee ? [t.feeNote] : []),
    "",
    t.shipTitle.toUpperCase(),
    kv(t.shipTo, o.adresse || t.addressLater),
    kv(t.shipCity, o.ville),
    kv(t.shipPhone, o.tel),
    kv(t.shipDelay, fill(t.shipDelayValue, { delay: site.delivery.label[l] })),
    t.shipNote,
    "",
    t.routineTitle.toUpperCase(),
    ...p.products.map((x, i) => `${p.products.length > 1 ? `${i + 1}. ` : ""}${x.name[l]}${t.colon}${x.when[l].toLowerCase()}. ${path(`/soins/${x.slug}`)}`),
    ...(p.products.some((x) => x.key === "ecran") && p.products.length > 1 ? [`${t.routineEvening} ${t.routineSun}`] : []),
    t.routineTest,
    "",
    `${t.question}${t.colon}https://wa.me/${site.whatsapp.wa}?text=${encodeURIComponent(fill(t.waMessage, { n: o.numero }))}`,
    "",
    t.rightsTitle.toUpperCase(),
    ...t.rights.map((r) => `- ${r}`),
    `${t.cgv}${t.colon}${path("/cgv")}`,
    "",
    `${ar ? site.founder.nameAr : site.founder.name}${t.comma}${t.signRole}`,
    "",
    rule,
    site.brand[l],
    `${t.footContact}${t.colon}WhatsApp ${site.whatsapp.display} · ${site.email}`,
    `Instagram ${site.instagram.handle} · ${t.footLegal}${t.colon}${path("/mentions-legales")}`,
    t.footWhy,
  ].join("\n");
}

export async function renderConfirmation(o: OrderEmail): Promise<Rendered> {
  return { subject: fill(emailText[o.locale].subject, { n: o.numero }), html: await render(<OrderConfirmation {...o} />), text: textConfirmation(o) };
}

/** La notification interne de la boutique (toujours en français). */
export async function renderShopNotification(o: ShopEmail): Promise<Rendered> {
  const p = o.priced, tel = phoneE164(o.tel);
  const text = [
    `Nouvelle commande ${o.numero}${o.locale === "ar" ? " (page en arabe)" : ""}`,
    "",
    `Cliente : ${o.nom}`, `Téléphone : ${o.tel} (${tel})`, `Ville : ${o.ville}`, `Adresse : ${o.adresse || "à demander au téléphone"}`, `E-mail : ${o.email || "non renseigné"}`, `Date : ${orderDate(o.date, "fr")}`,
    "",
    ...p.lines.map((l) => `${l.qty} × ${l.name.fr}, ${l.detail.fr} : ${l.offered ? "offert" : `${l.total} DH`}`),
    `Sous-total : ${p.subtotal} DH`,
    `Livraison : ${p.fee ? `${p.fee.min} à ${p.fee.max} DH selon la ville (à confirmer à la cliente)` : "offerte"}`,
    `Total à encaisser : ${amount(p.total, "fr")}`,
    "",
    `Confirmer sur WhatsApp : https://wa.me/${tel.slice(1)}?text=${encodeURIComponent(confirmMessage(o))}`,
  ].join("\n");
  return { subject: shopSubject(o), html: await render(<ShopNotification {...o} />), text };
}
