"use client";

/* Îlot « À l'unité » : carrousel des soins, panier et commande.
   Les cartes sont rendues par le serveur (présentes sans JavaScript, avec un lien vers chaque fiche produit).
   Le navigateur n'envoie que les choix (produit, format, quantité) à /api/order : les prix sont recalculés par le serveur,
   comme pour la gamme. Les montants affichés ici viennent de src/data/products.ts et src/data/site.ts. */
import { useEffect, useRef, useState, type FormEvent } from "react";
import Img from "@/components/Img";
import type { FormatKey, ProductKey } from "@/data/products";
import type { Locale } from "@/data/site";

export type ShopItem = {
  key: ProductKey;
  no: string;
  name: string;
  tag: string;
  url: string;
  img: { src: string; w: number; h: number };
  /** Pot plus large que haut (déodorant) : affiché plus petit que les flacons. */
  wide?: boolean;
  formats: { f: FormatKey; ml: number; price: number }[];
};
type Props = { items: ShopItem[]; locale: Locale; fee: { min: number; max: number }; links: { cgv: string; returns: string }; t: Record<string, string> };
type Done = { name: string; numero: string; lines: string[]; subtotal: number };

const BAG = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg>;
const QUEUE = "otage-commandes-en-attente"; // même file d'attente hors connexion que la gamme (islands/offers.js la renvoie)
const telOk = (v: string) => /^(?:\+212|00212|0)[67]\d{8}$/.test(v.replace(/[\s.\-()]/g, ""));
/** Identifiant de l'envoi : un renvoi du même formulaire ne crée pas de doublon. */
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const fill = (tpl: string, vars: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k]);

export default function ShopIsland({ items, locale, fee, links, t }: Props) {
  const rtl = locale === "ar";
  const [sel, setSel] = useState<Record<string, FormatKey>>(() => Object.fromEntries(items.map((p) => [p.key, p.formats[0].f])));
  const [cart, setCart] = useState<Record<string, number>>({}); // clé « produit:format » → quantité
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [bump, setBump] = useState(0);
  const sec = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  const entries = Object.entries(cart).map(([k, qty]) => {
    const [key, f] = k.split(":") as [ProductKey, FormatKey];
    const p = items.find((x) => x.key === key)!;
    return { k, p, f, qty, v: p.formats.find((x) => x.f === f)! };
  });
  const count = entries.reduce((n, e) => n + e.qty, 0);
  const subtotal = entries.reduce((n, e) => n + e.qty * e.v.price, 0);
  const fmtName = (p: ShopItem, f: FormatKey) => (p.formats.length > 1 ? (f === "petit" ? t.petit : t.grand) : t.unique);
  const feeText = `${t.feeA}${fee.min}${t.feeB}${fee.max}${t.feeC}`;

  const change = (k: string, by: number) => {
    setCart((c) => {
      const next = { ...c, [k]: Math.max(0, (c[k] || 0) + by) };
      if (!next[k]) delete next[k];
      return next;
    });
    setBump((n) => n + 1);
  };

  /* barre du panier : visible quand la section est à l'écran et que le panier n'est pas vide */
  useEffect(() => {
    const el = sec.current?.closest(".shop");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const barOn = inView && count > 0 && !open;

  /* carrousel : barre de progression et flèches */
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth, x = Math.abs(el.scrollLeft), k = max > 0 ? Math.min(1, x / max) : 1;
    prog.current?.style.setProperty("--sp", (0.2 + 0.8 * k).toFixed(3));
    setEdge((e) => (e.start === x < 8 && e.end === x > max - 8 ? e : { start: x < 8, end: x > max - 8 }));
  };
  useEffect(onScroll, []);
  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * (rtl ? -1 : 1) * Math.max(300, el.clientWidth * 0.8), behavior: "smooth" });
  };

  /* fenêtre du panier */
  const show = () => {
    setOpen(true);
    document.documentElement.classList.add("qv-lock");
    dlg.current?.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => dlg.current?.classList.add("in")));
  };
  const hide = () => {
    const d = dlg.current;
    if (!d) return;
    d.classList.remove("in");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      d.close();
      document.documentElement.classList.remove("qv-lock");
      setOpen(false);
      if (done) { setDone(null); setCart({}); }
    }, reduce ? 0 : 380);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || !count) return;
    const form = e.currentTarget, fd = new FormData(form);
    const val = (n: string) => String(fd.get(n) || "").trim();
    const bad = ["nom", "tel", "ville", "email"].filter((n) => (n === "tel" ? !telOk(val(n)) : n === "email" ? val(n) !== "" && !/^\S+@\S+\.\S{2,}$/.test(val(n)) : val(n).length < 2));
    setInvalid(bad);
    const focus = (n: string) => (form.elements.namedItem(n) as HTMLElement | null)?.focus();
    if (bad.length) {
      setError(bad.length === 1 && bad[0] === "tel" ? t.errPhone : bad.length === 1 && bad[0] === "email" ? t.errEmail : t.errFields);
      focus(bad[0]);
      return;
    }
    // case obligatoire : CGV et politique de retour
    if (!fd.get("cgv")) { setError(t.errTerms); focus("cgv"); return; }
    setError("");
    const order = {
      id: newId(),
      locale,
      kind: "unite",
      items: entries.map((x) => ({ key: x.p.key, format: x.f, qty: x.qty })),
      nom: val("nom"), tel: val("tel"), ville: val("ville"), adresse: val("adresse"), email: val("email"),
      site: val("site"), // champ piège : vide pour une personne
      cgv: true, // case CGV cochée (vérifiée juste au-dessus, et de nouveau par le serveur)
      page: location.href.split("#")[0],
    };
    setSending(true);
    const res: { ok: boolean; numero?: string; error?: string; fields?: string[] } | null = await fetch("/api/order", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) })
      .then((r) => (r.status >= 500 ? null : r.json()), () => null);
    setSending(false);
    if (res && !res.ok) { // refusée par le serveur : on explique, rien n'est enregistré
      const fields = res.fields || [];
      setInvalid(fields);
      setError(res.error === "limite" ? t.errLimit : fields.length === 1 && fields[0] === "cgv" ? t.errTerms : fields.length === 1 && fields[0] === "tel" ? t.errPhone : fields.length === 1 && fields[0] === "email" ? t.errEmail : fields.length ? t.errFields : t.errServer);
      if (fields.length) focus(fields[0]);
      return;
    }
    if (!res) { // panne ou hors connexion : gardée sur l'appareil, renvoyée plus tard
      try { localStorage.setItem(QUEUE, JSON.stringify([...JSON.parse(localStorage.getItem(QUEUE) || "[]"), order])); } catch { /* stockage indisponible */ }
    }
    window.dispatchEvent(new CustomEvent("otage:order", { detail: { type: "unite", format: [...new Set(entries.map((x) => x.f))].join("+"), value: subtotal } })); // mesure d'audience, si acceptée
    setDone({ name: val("nom").split(/\s+/)[0], numero: res?.numero || "", subtotal, lines: entries.map((x) => `${x.qty} × ${x.p.name}${t.comma}${fmtName(x.p, x.f)} ${x.v.ml} ${t.ml}`) });
    dlg.current?.querySelector(".qv-card")?.scrollTo(0, 0);
  };
  const bad = (n: string) => (invalid.includes(n) ? { "aria-invalid": true as const } : {});
  const clear = (e: FormEvent<HTMLFormElement>) => { const n = (e.target as HTMLInputElement).name; if (invalid.includes(n)) setInvalid((l) => l.filter((x) => x !== n)); };

  return (
    <div ref={sec}>
      <div className="shop-in">
        <div className="shop-rail">
          <button type="button" className="car-nav shop-prev" aria-label={t.prev} disabled={edge.start} onClick={() => slide(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
          <div className="shop-track" ref={track} tabIndex={0} role="group" aria-label={t.track} onScroll={onScroll}>
            {items.map((p) => {
              const f = sel[p.key], v = p.formats.find((x) => x.f === f)!, k = `${p.key}:${f}`, qty = cart[k] || 0;
              return (
                <article key={p.key} className={`sp${entries.some((x) => x.p.key === p.key) ? " in" : ""}`}>
                  <a className="sp-pic" href={p.url}>
                    <span className="sp-no" aria-hidden="true">N°{p.no}</span>
                    <span className="sp-see">{t.see}</span>
                    <span className="sp-tag">{v.ml} {t.ml}</span>
                    <Img className={p.wide ? "wide" : undefined} src={p.img.src} alt={p.name} width={p.img.w} height={p.img.h} sizes="200px" style={{ "--z": p.formats.length > 1 && f === "petit" ? 0.88 : 1 } as React.CSSProperties} draggable={false} />
                  </a>
                  <div className="sp-body">
                    <h3><a className="sp-ttl" href={p.url}>{p.name}</a></h3>
                    <span className="sp-for">{p.tag}</span>
                    {p.formats.length > 1 ? (
                      <span className="sp-fmt" role="radiogroup" aria-label={`${t.format}, ${p.name}`}>
                        {p.formats.map((x) => (
                          <button key={x.f} type="button" role="radio" aria-checked={x.f === f} onClick={() => setSel((s) => ({ ...s, [p.key]: x.f }))}>{x.f === "petit" ? t.petit : t.grand} <small>{x.ml} {t.ml}</small></button>
                        ))}
                      </span>
                    ) : (
                      <span className="sp-fmt one"><span>{t.unique} <small>{v.ml} {t.ml}</small></span></span>
                    )}
                    <div className="sp-row">
                      <span className="sp-price">{v.price}<small>{t.dh}</small></span>
                      <span className="sp-ctl">
                        {qty ? (
                          <span className="sp-step">
                            <button type="button" aria-label={`${t.minus} ${p.name}`} onClick={() => change(k, -1)}>−</button>
                            <b aria-live="polite">{qty}</b>
                            <button type="button" aria-label={`${t.plus} ${p.name}`} onClick={() => change(k, 1)}>+</button>
                          </span>
                        ) : (
                          <button type="button" className="sp-add" aria-label={`${t.add} ${p.name}`} onClick={() => change(k, 1)}><span className="pl" aria-hidden="true">+</span>{t.add}</button>
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <button type="button" className="car-nav shop-next" aria-label={t.next} disabled={edge.end} onClick={() => slide(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
        </div>
        <div className="shop-prog" aria-hidden="true"><i ref={prog}></i></div>
      </div>

      <div key={bump} className={`cart${barOn ? (bump ? " bump" : "") : " off"}`} role="status">
        <span className="cart-txt"><b>{count} {count > 1 ? t.articles : t.article}</b><span><span>{subtotal}</span> {t.dh} <small>{t.plusDelivery}</small></span></span>
        <button type="button" className="mini-go cart-go" tabIndex={barOn ? 0 : -1} onClick={show}><span>{t.order}</span><i>{BAG}</i></button>
      </div>

      <dialog className="qv sd" ref={dlg} aria-labelledby="sd-title" onCancel={(e) => { e.preventDefault(); hide(); }} onClick={(e) => { if (!(e.target as HTMLElement).closest(".qv-card")) hide(); }}>
        <div className="qv-card sd-card">
          <button type="button" className="qv-close sd-close" aria-label={t.close} onClick={hide}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
          {/* le contenu n'est rendu qu'à l'ouverture : le formulaire ne pèse pas dans le HTML de la page */}
          {!open ? null : done ? (
            <div className="cur-done sd-done">
              <svg className="od-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
              <h3 id="sd-title" className="cur-t">{done.name ? fill(t.thanks, { name: done.name }) : t.thanksDefault}</h3>
              <p>{t.done}</p>
              <p className="done-recap">
                <span>{done.numero ? fill(t.orderNo, { n: done.numero }) : t.offline}</span>
                {done.lines.map((l) => <span key={l}>{l}</span>)}
                <span>{t.delivery}{rtl ? ": " : " : "}{feeText}</span>
                <span>{t.total}{rtl ? ": " : " : "}{done.subtotal + fee.min}{t.to}{done.subtotal + fee.max} {t.dh}</span>
              </p>
            </div>
          ) : (
            <form className="sd-form cur-form" noValidate onSubmit={submit} onInput={clear}>
              <h3 id="sd-title" className="cur-t">{t.cart}</h3>
              <ul className="sd-lines">
                {entries.map((x) => (
                  <li key={x.k}>
                    <Img src={x.p.img.src} alt="" width={x.p.img.w} height={x.p.img.h} sizes="40px" />
                    <span className="nm">{x.p.name}<small>{fmtName(x.p, x.f)} {x.v.ml} {t.ml} × {x.qty}</small></span>
                    <span className="pr">{x.qty * x.v.price} {t.dh}</span>
                  </li>
                ))}
              </ul>
              <p className="sd-sub"><span>{t.delivery}</span><span>{feeText}</span></p>
              <p className="sd-tot"><span>{t.subtotal}</span><b>{subtotal} {t.dh}</b></p>
              <p className="sd-note">{t.note}</p>
              <label className="fld"><span>{t.nom}</span><input name="nom" autoComplete="name" placeholder={t.nomEx} {...bad("nom")} /></label>
              <label className="fld"><span>{t.tel}</span><input name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...bad("tel")} /></label>
              <label className="fld"><span>{t.ville}</span><input name="ville" list="villes" autoComplete="address-level2" placeholder={t.villeEx} aria-describedby="sd-ville-info" {...bad("ville")} /><small id="sd-ville-info" className="fld-info">{t.villeInfo}</small></label>
              <label className="fld"><span>{t.adresse}<small>{t.adresseOpt}</small></span><input name="adresse" autoComplete="address-line1" placeholder={t.adresseEx} /></label>
              <label className="fld"><span>{t.email}<small>{t.emailOpt}</small></span><input name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" placeholder="prenom@exemple.com" aria-describedby="sd-email-info" {...bad("email")} /><small id="sd-email-info" className="fld-info"><b>{t.emailHint}</b> {t.emailConsent}</small></label>
              <input className="hp" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label className="agree">
                <input type="checkbox" name="cgv" />
                <span>{t.agreeA} <a href={links.cgv} target="_blank" rel="noopener">{t.agreeCgv}</a> {t.agreeAnd} <a href={links.returns} target="_blank" rel="noopener">{t.agreeReturns}</a>.</span>
              </label>
              <p className="tk-err sd-err" role="alert">{error}</p>
              <button type="submit" className="o-btn o-primary o-lg tk-send sd-send" disabled={sending} aria-busy={sending || undefined}><span className="o-lbl">{t.send}</span><span className="o-cap">{BAG}</span></button>
              <p className="cur-note">{t.pay}<b>{subtotal + fee.min}{t.to}{subtotal + fee.max} {t.dh}</b></p>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
