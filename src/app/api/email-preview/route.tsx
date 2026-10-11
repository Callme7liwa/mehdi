/* Aperçu local des e-mails : GET /api/email-preview (liste), puis ?mail=cliente|boutique&locale=fr|ar&cas=…
   Rien n'est envoyé. Désactivé sur le site en production (404). Voir `npm run email:preview`. */
import { renderConfirmation, renderShopNotification, type Rendered } from "@/emails/render";
import { priceOrder, validateOrder, type OrderInput } from "@/lib/order/compute";
import type { Locale } from "@/data/site";

export const dynamic = "force-dynamic";

/** Commandes d'exemple : chaque cas du formulaire. */
const CASES: Record<string, { label: string; order: Partial<OrderInput> & { kind: OrderInput["kind"] } }> = {
  "gamme-petit": { label: "Gamme Petit format", order: { kind: "gamme", format: "petit" } },
  "gamme-grand-3": { label: "3 gammes Grand format (offre 2 + 1)", order: { kind: "gamme", format: "grand", bundle: true } },
  unite: { label: "Soins à l'unité (frais de livraison)", order: { kind: "unite", items: [{ key: "serum", format: "grand", qty: 1 }, { key: "ecran", format: "petit", qty: 2 }] } },
  yeux: { label: "Sérum contour des yeux", order: { kind: "yeux" } },
};
const WHO = { fr: { nom: "Salma Bennani", ville: "Casablanca", adresse: "12 rue des Orangers, Maârif" }, ar: { nom: "سلمى بناني", ville: "الدار البيضاء", adresse: "12 زنقة البرتقال، المعاريف" } };

export async function GET(req: Request) {
  if (process.env.VERCEL_ENV === "production") return new Response("Not found", { status: 404 });
  const url = new URL(req.url), q = url.searchParams;
  const mail = q.get("mail");
  if (!mail) {
    const rows = Object.entries(CASES).flatMap(([k, c]) => (["fr", "ar"] as const).map((l) => `<li><a href="?mail=cliente&locale=${l}&cas=${k}">Cliente, ${l === "fr" ? "français" : "arabe"} : ${c.label}</a> (<a href="?mail=cliente&locale=${l}&cas=${k}&format=texte">texte brut</a>)</li>`));
    rows.push(...Object.entries(CASES).map(([k, c]) => `<li><a href="?mail=boutique&locale=fr&cas=${k}">Boutique (notification interne) : ${c.label}</a></li>`), `<li><a href="?mail=boutique&locale=ar&cas=unite">Boutique : commande passée sur la page arabe</a></li>`);
    return new Response(`<!doctype html><meta charset="utf-8"><title>Aperçu des e-mails OTAGE</title><body style="font:16px/1.6 system-ui;max-width:720px;margin:40px auto;padding:0 16px"><h1>Aperçu des e-mails</h1><p>Rien n'est envoyé. Pour le mode sombre : régler l'apparence du système sur « sombre ».</p><ul>${rows.join("")}</ul></body>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  const locale: Locale = q.get("locale") === "ar" ? "ar" : "fr";
  const c = CASES[q.get("cas") ?? ""] ?? CASES["gamme-petit"];
  const checked = validateOrder({ locale, ...c.order, ...WHO[locale], tel: "06 12 34 56 78", email: "cliente@example.com" });
  if (!checked.ok) return new Response("Cas invalide : " + checked.fields.join(", "), { status: 500 });
  const data = { locale, numero: "OTG-2610-4821", date: new Date("2026-10-11T14:32:00+01:00"), nom: checked.value.nom, tel: "06 12 34 56 78", ville: checked.value.ville, adresse: checked.value.adresse, priced: priceOrder(checked.value), base: url.origin };
  const out: Rendered = mail === "boutique" ? await renderShopNotification({ ...data, email: "cliente@example.com", page: `${url.origin}${locale === "ar" ? "/ar" : ""}/soins/serum-anti-taches` }) : await renderConfirmation(data);
  if (q.get("format") === "texte") return new Response(`Objet : ${out.subject}\n\n${out.text}`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(out.html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Email-Subject": encodeURIComponent(out.subject), "X-Email-Bytes": String(Buffer.byteLength(out.html)) } });
}
