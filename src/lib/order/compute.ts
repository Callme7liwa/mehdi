/* Une commande, recalculée côté serveur : le navigateur envoie ce que la cliente a choisi (produits, formats,
   quantités), jamais des prix. Tout ce qui est en dirhams vient de src/data/products.ts et src/data/site.ts. */
import { bundle, gamme, productByKey, rangeProducts, unitFormats, yeuxPrice, type FormatKey, type Product, type ProductKey } from "@/data/products";
import { site, type L, type Locale } from "@/data/site";

/** Ce que le formulaire envoie. */
export type OrderInput = {
  locale: Locale;
  /** gamme : la gamme anti-taches complète ; yeux : le sérum contour des yeux ; unite : des soins de la gamme, séparément. */
  kind: "gamme" | "yeux" | "unite";
  format?: FormatKey;
  /** Offre 2 + 1 (gamme ou sérum contour des yeux) : 3 articles, le troisième offert. */
  bundle?: boolean;
  items?: { key: ProductKey; format: FormatKey; qty: number }[];
  nom: string;
  tel: string;
  ville: string;
  adresse?: string;
  email?: string;
};

export type OrderLine = {
  /** Le produit, ou null pour la gamme complète. */
  product: Product | null;
  name: L;
  /** Format et contenance : « Petit format, 15 ml ». */
  detail: L;
  qty: number;
  /** Prix d'un article, puis total de la ligne (0 pour l'article offert). */
  unit: number;
  total: number;
  offered?: boolean;
  /** Ce que contient la ligne (les 4 soins d'une gamme, avec leur contenance). */
  contents: { product: Product; ml: number }[];
};

export type PricedOrder = {
  kind: OrderInput["kind"];
  lines: OrderLine[];
  subtotal: number;
  /** null : livraison offerte (gamme complète). Sinon, la fourchette des frais selon la ville. */
  fee: { min: number; max: number } | null;
  /** Économie réalisée (gamme plutôt que les soins à l'unité, ou article offert). */
  saving: number;
  /** Total à payer à la livraison : un montant, ou une fourchette quand les frais dépendent de la ville. */
  total: { min: number; max: number };
  /** Les soins commandés, dans l'ordre de la routine (pour le rappel d'utilisation). */
  products: Product[];
  /** Libellés en français pour le tableur des commandes. */
  sheet: { produit: string; format: string; quantite: string; offre: string };
};

const ml = (p: Product, f: FormatKey, locale: Locale) => `${p.ml[f]} ${locale === "ar" ? "مل" : "ml"}`;
const both = (fn: (l: Locale) => string): L => ({ fr: fn("fr"), ar: fn("ar") });

/** Prix, lignes et total d'une commande déjà validée. */
export function priceOrder(o: OrderInput): PricedOrder {
  const lines: OrderLine[] = [];
  let saving = 0;
  let sheet: PricedOrder["sheet"];

  if (o.kind === "gamme") {
    const f = o.format ?? "petit", g = gamme.formats[f];
    const contents = rangeProducts.map((p) => ({ product: p, ml: p.ml[f] as number }));
    const line = (qty: number, offered = false): OrderLine => ({ product: null, name: gamme.name, detail: g.label, qty, unit: g.price, total: offered ? 0 : g.price * qty, offered, contents });
    if (o.bundle) { lines.push(line(bundle.buy), line(bundle.free, true)); saving = g.price * bundle.free; }
    else { lines.push(line(1)); saving = g.was - g.price; }
    sheet = { produit: "Gamme anti-taches", format: g.label.fr, quantite: o.bundle ? "3 (2 + 1 offerte)" : "1", offre: `${g.label.fr}, ${o.bundle ? "2 gammes + 1 offerte" : "1 gamme"}` };
  } else if (o.kind === "yeux") {
    const p = productByKey("yeux");
    const line = (qty: number, offered = false): OrderLine => ({ product: p, name: p.name, detail: both((l) => ml(p, "petit", l)), qty, unit: yeuxPrice, total: offered ? 0 : yeuxPrice * qty, offered, contents: [] });
    if (o.bundle) { lines.push(line(bundle.buy), line(bundle.free, true)); saving = yeuxPrice * bundle.free; }
    else lines.push(line(1));
    sheet = { produit: "Sérum contour des yeux", format: `Unique (${p.ml.petit} ml)`, quantite: o.bundle ? "3 (2 + 1 offerte)" : "1", offre: `Sérum contour des yeux, ${o.bundle ? "2 sérums + 1 offert" : "1 sérum"}` };
  } else {
    for (const it of o.items ?? []) {
      const p = productByKey(it.key), price = p.unitPrice[it.format] as number;
      lines.push({ product: p, name: p.name, detail: both((l) => `${gamme.formats[it.format].label[l]}${l === "ar" ? "، " : ", "}${ml(p, it.format, l)}`), qty: it.qty, unit: price, total: price * it.qty, contents: [] });
    }
    sheet = {
      produit: "Soins à l'unité",
      format: [...new Set((o.items ?? []).map((it) => gamme.formats[it.format].label.fr))].join(" + "),
      quantite: String(lines.reduce((n, l) => n + l.qty, 0)),
      offre: lines.map((l) => `${l.qty} × ${l.name.fr}, ${l.detail.fr}, ${l.unit} DH`).join(" ; "),
    };
  }

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  // livraison : offerte pour une gamme complète ; à l'unité (soins séparés, sérum contour des yeux), frais selon la ville
  const fee = o.kind === "gamme" ? null : { ...site.delivery.unitFee };
  const total = { min: subtotal + (fee?.min ?? 0), max: subtotal + (fee?.max ?? 0) };
  const keys = new Set(lines.flatMap((l) => (l.product ? [l.product.key] : l.contents.map((c) => c.product.key))));
  const products = [...rangeProducts, productByKey("yeux")].filter((p) => keys.has(p.key));
  sheet.offre += fee ? ` + livraison ${fee.min} à ${fee.max} DH selon la ville (total de ${total.min} à ${total.max} DH)` : " (livraison offerte)";
  return { kind: o.kind, lines, subtotal, fee, saving, total, products, sheet };
}

/* ---------- validation ---------- */

/** Numéro de mobile marocain : 06 ou 07, écrit 06…, +2126… ou 002126… */
export const PHONE = /^(?:\+212|00212|0)[67]\d{8}$/;
export const cleanPhone = (v: string) => v.replace(/[\s.\-()]/g, "");
/** +2126XXXXXXXX, pour les liens tel: et WhatsApp. */
export const phoneE164 = (v: string) => "+212" + cleanPhone(v).replace(/^(?:\+212|00212|0)/, "");
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[a-z¡-￿]{2,}$/i;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");

export type Invalid = { ok: false; fields: string[] };
/** Vérifie et nettoie ce qu'envoie le formulaire. Renvoie la liste des champs refusés. */
export function validateOrder(body: unknown): { ok: true; value: OrderInput } | Invalid {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const bad: string[] = [];
  const locale: Locale = b.locale === "ar" ? "ar" : "fr";
  const kind = b.kind === "gamme" || b.kind === "yeux" || b.kind === "unite" ? b.kind : null;
  if (!kind) bad.push("kind");
  const format: FormatKey | undefined = b.format === "grand" ? "grand" : b.format === "petit" ? "petit" : undefined;
  if (kind === "gamme" && !format) bad.push("format");

  const nom = text(b.nom, 80), ville = text(b.ville, 60), adresse = text(b.adresse, 200), tel = cleanPhone(text(b.tel, 24)), email = text(b.email, 120).toLowerCase();
  if (nom.length < 2) bad.push("nom");
  if (!PHONE.test(tel)) bad.push("tel");
  if (ville.length < 2) bad.push("ville");
  if (email && !EMAIL.test(email)) bad.push("email");

  let items: OrderInput["items"];
  if (kind === "unite") {
    const raw = Array.isArray(b.items) ? b.items : [];
    const merged = new Map<string, { key: ProductKey; format: FormatKey; qty: number }>();
    for (const r of raw.slice(0, 12)) {
      const it = (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
      const p = rangeProducts.find((x) => x.key === it.key);
      const f = it.format === "grand" ? "grand" : it.format === "petit" ? "petit" : null;
      const qty = Number(it.qty);
      // un soin de la gamme, dans un format vendu à l'unité, de 1 à 9 exemplaires
      if (!p || !f || !unitFormats(p).includes(f) || !Number.isInteger(qty) || qty < 1 || qty > 9) { bad.push("items"); break; }
      const id = `${p.key}-${f}`, prev = merged.get(id);
      merged.set(id, { key: p.key, format: f, qty: Math.min(9, (prev?.qty ?? 0) + qty) });
    }
    items = [...merged.values()];
    if (!items.length && !bad.includes("items")) bad.push("items");
  }
  if (bad.length || !kind) return { ok: false, fields: bad };
  return { ok: true, value: { locale, kind, format: kind === "gamme" ? format : undefined, bundle: kind !== "unite" && b.bundle === true, items, nom, tel, ville, adresse: adresse || undefined, email: email || undefined } };
}

/* ---------- numéro de commande ---------- */

/** Numéro lisible : OTG-AAMM-1234 (année et mois, heure du Maroc, puis 4 chiffres au hasard).
    Le tableur vérifie qu'il n'existe pas déjà et peut en renvoyer un autre : c'est lui qui a le dernier mot. */
export function orderNumber(now = new Date()) {
  const [yy, mm] = new Intl.DateTimeFormat("fr-FR", { year: "2-digit", month: "2-digit", timeZone: "Africa/Casablanca" }).formatToParts(now).filter((p) => p.type === "year" || p.type === "month").sort((a) => (a.type === "year" ? -1 : 1)).map((p) => p.value);
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 9000 + 1000;
  return `OTG-${yy}${mm}-${n}`;
}
