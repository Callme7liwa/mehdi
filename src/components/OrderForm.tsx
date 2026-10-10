"use client";

import { useEffect, useId, useState } from "react";
import { BagIcon } from "./icons";

export type OrderData = {
  endpoint: string;
  /** Produit commandé : la gamme anti-taches (2 formats) ou le sérum contour des yeux. */
  product: "taches" | "yeux";
  formats: Record<"petit" | "grand", { label: string; labelFr: string; price: number; was: number; content: string }>;
  yeuxPrice: number;
  /** Villes proposées, dans la langue de la page. */
  cities: string[];
};
export type OrderText = Record<
  | "chooseFormat" | "chooseOffer" | "chooseOfferOnly" | "yourInfo" | "perRange" | "perSerum" | "rangeWord" | "rangesWord" | "serumWord" | "serumsWord"
  | "free" | "freeM" | "save" | "total" | "name" | "namePh" | "phone" | "phonePh" | "city" | "cityPh" | "address" | "addressOpt" | "addressPh"
  | "dh" | "submit" | "payNote" | "youPay" | "errPhone" | "errFields" | "thanks" | "done" | "insteadOf" | "bundle",
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
  const [err, setErr] = useState("");
  const [bad, setBad] = useState<string[]>([]);
  const [doneName, setDoneName] = useState<string | null>(null);

  const price = yeux ? data.yeuxPrice : data.formats[fmt].price;
  const per = Math.round((price * 2) / 3);
  const total = qty === 3 ? price * 2 : price;
  const word = yeux ? t.serumWord : t.rangeWord, words = yeux ? t.serumsWord : t.rangesWord;

  const flush = async () => {
    const left: object[] = [];
    for (const o of readQ()) {
      try {
        const r = await fetch(data.endpoint, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(o) });
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
    setErr("");
    if (v("site")) return; // robot détecté (champ piège rempli)
    const what = yeux ? "Sérum contour des yeux" : data.formats[fmt].labelFr;
    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ticket: String(Math.floor(1000 + Math.random() * 9000)),
      nom: v("nom"), tel: v("tel"), ville: v("ville"), adresse: v("adresse"),
      produit: yeux ? "Sérum contour des yeux" : "Gamme anti-taches",
      format: yeux ? "Unique (15 ml)" : data.formats[fmt].labelFr,
      quantite: qty === 3 ? "3 (2 + 1 offerte)" : "1",
      total,
      offre: `${what}, ${qty === 3 ? (yeux ? "2 sérums + 1 offert" : "2 gammes + 1 offerte") : yeux ? "1 sérum" : "1 gamme"}`,
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
      {!yeux && (
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
      <fieldset>
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
      </fieldset>
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
      <p className="order-total"><span>{t.total}</span><b>{total} {t.dh}</b></p>
      <p className="order-err" role="alert">{err}</p>
      <button type="submit" className="btn btn-primary">{t.submit}<BagIcon /></button>
      <p className="order-note">{t.youPay} <b>{total} {t.dh}</b> {t.payNote}</p>
    </form>
  );
}
