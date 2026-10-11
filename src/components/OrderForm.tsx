"use client";

import { useEffect, useId, useState } from "react";
import { BagIcon } from "./icons";

export type OrderData = {
  endpoint: string;
  /** Produit commandé : la gamme anti-taches (2 formats) ou le sérum contour des yeux. */
  product: "taches" | "yeux";
  formats: Record<"petit" | "grand", { label: string; labelFr: string; price: number; was: number; content: string }>;
  yeuxPrice: number;
  /** Vente à l'unité : les soins de la gamme, chacun dans ses formats. Absent : seule la gamme (ou le sérum contour des yeux) se commande. */
  units?: { key: string; name: string; nameFr: string; formats: Partial<Record<"petit" | "grand", { label: string; labelFr: string; size: string; sizeFr: string; price: number }>> }[];
  /** Le soin de la page : présélectionné dans la vente à l'unité. */
  unitDefault?: string;
  /** Frais de livraison d'un achat à l'unité, en DH (la gamme complète est livrée gratuitement). */
  fee: { min: number; max: number; label: string };
  /** Villes proposées, dans la langue de la page. */
  cities: string[];
};
export type OrderText = Record<
  | "chooseWhat" | "unitAlone" | "fullRange" | "from" | "quantity" | "less" | "more" | "chooseProducts" | "unitHint" | "errEmpty" | "chooseFormat" | "chooseOffer" | "chooseOfferOnly" | "yourInfo" | "perRange" | "perSerum" | "rangeWord" | "rangesWord" | "serumWord" | "serumsWord"
  | "free" | "freeM" | "save" | "total" | "name" | "namePh" | "phone" | "phonePh" | "city" | "cityPh" | "address" | "addressOpt" | "addressPh"
  | "delivery" | "deliveryFree" | "subtotal" | "totalFrom" | "totalTo" | "feeNote" | "dh" | "submit" | "payNote" | "youPay" | "errPhone" | "errFields" | "thanks" | "done" | "insteadOf" | "bundle",
  string
>;

const QUEUE = "otage-commandes-en-attente"; // même file d'attente que la page d'accueil
const CLIENT = "otage-client";
const telOk = (v: string) => /^(?:\+212|00212|0)[5-7]\d{8}$/.test(v.replace(/[\s.-]/g, ""));

const readQ = (): object[] => { try { return JSON.parse(localStorage.getItem(QUEUE) || "[]"); } catch { return []; } };
const writeQ = (q: object[]) => { try { localStorage.setItem(QUEUE, JSON.stringify(q)); } catch {} };

/** Formulaire de commande : même envoi que le ticket de l'accueil (Google Sheet + e-mail via Apps Script). */
export default function OrderForm({ data, t }: { data: OrderData; t: OrderText }) {
  const id = useId();
  const yeux = data.product === "yeux";
  const [fmt, setFmt] = useState<"petit" | "grand">("petit");
  const [qty, setQty] = useState<1 | 3>(3);
  /* sur la page d'un soin de la gamme : des soins à l'unité (par défaut) ou la gamme complète */
  const [what, setWhat] = useState<"unit" | "gamme">(data.units ? "unit" : "gamme");
  /* panier à l'unité : pour chaque soin, un format et une quantité (0 = pas dans la commande) */
  const [cart, setCart] = useState<Record<string, { fmt: "petit" | "grand"; qty: number }>>(() =>
    Object.fromEntries((data.units ?? []).map((u) => [u.key, { fmt: (u.formats.petit ? "petit" : "grand") as "petit" | "grand", qty: u.key === data.unitDefault ? 1 : 0 }])));
  const unitMode = what === "unit" && Boolean(data.units);
  const picked = unitMode ? (data.units ?? []).filter((u) => cart[u.key].qty > 0).map((u) => ({ u, f: u.formats[cart[u.key].fmt]!, qty: cart[u.key].qty })) : [];
  const setItem = (key: string, change: Partial<{ fmt: "petit" | "grand"; qty: number }>) => setCart((c) => ({ ...c, [key]: { ...c[key], ...change } }));
  const [err, setErr] = useState("");
  const [bad, setBad] = useState<string[]>([]);
  const [doneName, setDoneName] = useState<string | null>(null);

  const price = yeux ? data.yeuxPrice : data.formats[fmt].price;
  const per = Math.round((price * 2) / 3);
  const total = unitMode ? picked.reduce((sum, x) => sum + x.f.price * x.qty, 0) : qty === 3 ? price * 2 : price;
  /* livraison : offerte pour une gamme complète ; à l'unité (soins séparés, sérum contour des yeux), frais selon la ville */
  const fee = unitMode || yeux ? data.fee : null;
  const toPay = fee ? `${t.totalFrom} ${total + fee.min} ${t.totalTo} ${total + fee.max} ${t.dh}` : `${total} ${t.dh}`;
  const word = yeux ? t.serumWord : t.rangeWord, words = yeux ? t.serumsWord : t.rangesWord;

  const flush = async () => {
    const left: object[] = [];
    for (const o of readQ()) {
      try {
        const r = await fetch(data.endpoint, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(o).replace(/[\u2066\u2069]/g, "") });
        if (!r.ok) throw new Error("HTTP " + r.status);
      } catch { left.push(o); }
    }
    writeQ(left);
  };
  useEffect(() => {
    flush();
    window.addEventListener("online", flush);
    return () => window.removeEventListener("online", flush);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (n: string) => String(fd.get(n) || "").trim();
    const wrong = ["nom", "tel", "ville"].filter((n) => (n === "tel" ? !telOk(v(n)) : v(n).length < 2));
    setBad(wrong);
    if (wrong.length) {
      setErr(wrong.length === 1 && wrong[0] === "tel" ? t.errPhone : t.errFields);
      (e.currentTarget.elements.namedItem(wrong[0]) as HTMLInputElement).focus();
      return;
    }
    if (unitMode && !picked.length) { setErr(t.errEmpty); return; }
    setErr("");
    if (v("site")) return; // robot détecté (champ piège rempli)
    const label = yeux ? "Sérum contour des yeux" : data.formats[fmt].labelFr;
    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ticket: String(Math.floor(1000 + Math.random() * 9000)),
      nom: v("nom"), tel: v("tel"), ville: v("ville"), adresse: v("adresse"),
      // le tableur des commandes reçoit toujours des libellés en français
      produit: unitMode ? "Soins à l'unité" : yeux ? "Sérum contour des yeux" : "Gamme anti-taches",
      format: unitMode ? [...new Set(picked.map((x) => x.f.labelFr))].join(" + ") : yeux ? "Unique (15 ml)" : data.formats[fmt].labelFr,
      quantite: unitMode ? String(picked.reduce((n, x) => n + x.qty, 0)) : qty === 3 ? "3 (2 + 1 offerte)" : "1",
      total,
      offre: (unitMode
        ? picked.map((x) => `${x.qty} × ${x.u.nameFr}, ${x.f.labelFr} (${x.f.sizeFr}), ${x.f.price} DH`).join(" ; ")
        : `${label}, ${qty === 3 ? (yeux ? "2 sérums + 1 offert" : "2 gammes + 1 offerte") : yeux ? "1 sérum" : "1 gamme"}`)
        + (fee ? ` + livraison ${fee.min} à ${fee.max} DH selon la ville (total de ${total + fee.min} à ${total + fee.max} DH)` : " (livraison offerte)"),
      page: location.href.split("#")[0],
    };
    writeQ([...readQ(), order]);
    flush();
    try { localStorage.setItem(CLIENT, JSON.stringify({ nom: order.nom, tel: order.tel, ville: order.ville, adresse: order.adresse })); } catch {} // repris par l'accueil à la prochaine commande
    setDoneName(order.nom.split(/\s+/)[0]);
  };

  if (doneName !== null) {
    return (
      <div className="order order-done" role="status">
        <h3>{t.thanks}, {doneName} !</h3>
        <p>{t.done}</p>
      </div>
    );
  }

  const invalid = (n: string) => (bad.includes(n) ? { "aria-invalid": true as const } : {});
  return (
    <form className="order" onSubmit={submit} noValidate>
      {data.units && (
        <fieldset>
          <legend>{t.chooseWhat}</legend>
          <div className="opts">
            <label className="opt">
              <input type="radio" name={`${id}-what`} checked={what === "unit"} onChange={() => setWhat("unit")} />
              <b>{t.unitAlone}</b>
              <span>{t.unitHint}</span>
            </label>
            <label className="opt">
              <input type="radio" name={`${id}-what`} checked={what === "gamme"} onChange={() => setWhat("gamme")} />
              <b>{t.fullRange}</b>
              <span>{t.from} <em>{data.formats.petit.price} {t.dh}</em> {t.insteadOf} <s>{data.formats.petit.was} {t.dh}</s></span>
            </label>
          </div>
        </fieldset>
      )}
      {unitMode && (
        <fieldset>
          <legend>{t.chooseProducts}</legend>
          <ul className="ulist">
            {data.units!.map((u) => {
              const it = cart[u.key];
              return (
                <li key={u.key} className={it.qty ? "on" : undefined}>
                  <b>{u.name}</b>
                  <div className="ufmt" role="group" aria-label={`${t.chooseFormat} : ${u.name}`}>
                    {(["petit", "grand"] as const).filter((f) => u.formats[f]).map((f) => (
                      <label key={f}>
                        <input type="radio" name={`${id}-${u.key}-fmt`} checked={it.fmt === f} onChange={() => setItem(u.key, { fmt: f, qty: Math.max(1, it.qty) })} />
                        <span>{u.formats[f]!.label}, {u.formats[f]!.size}<em>{u.formats[f]!.price} {t.dh}</em></span>
                      </label>
                    ))}
                  </div>
                  <div className="stepper" role="group" aria-label={`${t.quantity} : ${u.name}`}>
                    <button type="button" aria-label={t.less} disabled={it.qty <= 0} onClick={() => setItem(u.key, { qty: Math.max(0, it.qty - 1) })}>−</button>
                    <output aria-live="polite">{it.qty}</output>
                    <button type="button" aria-label={t.more} disabled={it.qty >= 9} onClick={() => setItem(u.key, { qty: Math.min(9, it.qty + 1) })}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}
      {!yeux && !unitMode && (
        <fieldset>
          <legend>{t.chooseFormat}</legend>
          <div className="opts">
            {(["petit", "grand"] as const).map((f) => (
              <label className="opt" key={f}>
                <input type="radio" name={`${id}-fmt`} checked={fmt === f} onChange={() => setFmt(f)} />
                <b>{data.formats[f].label}</b>
                <span><em>{data.formats[f].price} {t.dh}</em> {t.insteadOf} <s>{data.formats[f].was} {t.dh}</s></span>
                <span>{data.formats[f].content}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {!unitMode && <fieldset>
        <legend>{yeux ? t.chooseOfferOnly : t.chooseOffer}</legend>
        <div className="opts">
          <label className="opt">
            <input type="radio" name={`${id}-qty`} checked={qty === 3} onChange={() => setQty(3)} />
            <span className="tag">{t.bundle}</span>
            <b>3 {words} : {price * 2} {t.dh}</b>
            <span><em>{per} {t.dh}</em> {yeux ? t.perSerum : t.perRange}, {t.save} {price} {t.dh}</span>
          </label>
          <label className="opt">
            <input type="radio" name={`${id}-qty`} checked={qty === 1} onChange={() => setQty(1)} />
            <b>1 {word} : {price} {t.dh}</b>
            {!yeux && <span>{t.insteadOf} <s>{data.formats[fmt].was} {t.dh}</s></span>}
          </label>
        </div>
      </fieldset>}
      <fieldset>
        <legend>{t.yourInfo}</legend>
        <div className="fields">
          <label className="field">{t.name}<input name="nom" autoComplete="name" placeholder={t.namePh} {...invalid("nom")} /></label>
          <label className="field">{t.phone}<input name="tel" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder={t.phonePh} {...invalid("tel")} /></label>
          <label className="field">{t.city}<input name="ville" list={`${id}-villes`} autoComplete="address-level2" placeholder={t.cityPh} {...invalid("ville")} /></label>
          <label className="field"><span>{t.address} <small>{t.addressOpt}</small></span><input name="adresse" autoComplete="address-line1" placeholder={t.addressPh} /></label>
          <datalist id={`${id}-villes`}>{data.cities.map((c) => <option key={c}>{c}</option>)}</datalist>
        </div>
        <input className="hp" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </fieldset>
      <div className="order-sum">
        {fee && <p><span>{t.subtotal}</span><b>{total} {t.dh}</b></p>}
        <p><span>{t.delivery}</span><b>{fee ? fee.label : t.deliveryFree}</b></p>
        <p className="order-total"><span>{t.total}</span><b>{toPay}</b></p>
      </div>
      <p className="order-err" role="alert">{err}</p>
      <button type="submit" className="btn btn-primary">{t.submit}<BagIcon /></button>
      <p className="order-note">{t.youPay} <b>{toPay}</b> {t.payNote}{fee ? ` ${t.feeNote}` : ""}</p>
    </form>
  );
}
