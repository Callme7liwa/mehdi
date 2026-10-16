"use client";

/* Le ticket : la commande, toujours à portée de main. Colonne collante sur ordinateur, feuille qui monte du bas sur mobile.
   Trois cases (nom, téléphone, ville) ; l'envoi passe par /api/order comme les autres formulaires du site. */
import { useEffect, useRef, useState, type FormEvent } from "react";
import CityField from "@/components/CityField";
import Reassure from "@/components/Reassure";
import Img from "@/components/Img";
import { AddButton, FormatSwitch, fill, freeOf, Total, TotalLabel, useCart } from "./cart";
import { Arrow, Close, Up, Wa } from "./icons";

type Props = {
  fee: { min: number; max: number };
  wa: string;
  links: { cgv: string; returns: string };
  /** Rappel « Passe au grand format » (soins en deux formats), déjà chiffré. */
  upsell?: string;
  unitWord?: { one: string; many: string };
  thumb: { src: string; w: number; h: number };
  logo: { src: string; w: number; h: number };
};
type Done = { name: string; numero: string; tel: string; email: string };

const CLIENT = "otage-client";
/** E-mail facultatif : vide, ou une adresse plausible (le serveur vérifie de nouveau). */
const emailOk = (v: string) => v.trim() === "" || /^\S+@\S+\.\S{2,}$/.test(v.trim());
const telOk = (v: string) => /^(?:\+212|00212|0)[67]\d{8}$/.test(v.replace(/[\s.\-()]/g, ""));
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = (v: string) => v.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
const buzz = (p: number | number[]) => { try { navigator.vibrate?.(p); } catch { /* vibration indisponible */ } };

export default function Ticket({ fee, wa, links, upsell, unitWord, thumb, logo }: Props) {
  const c = useCart();
  const { t, lines, item, others, total, count, locale } = c;
  const [no, setNo] = useState("····");
  const [date, setDate] = useState("");
  const [vals, setVals] = useState({ nom: "", tel: "", ville: "", email: "" });
  const [agree, setAgree] = useState(false);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [failWa, setFailWa] = useState(""); // commande non enregistrée : lien WhatsApp avec le ticket
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [shake, setShake] = useState(0);
  const tk = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const main = lines[0], mainItem = c.main;

  /* numéro du ticket, date du jour et coordonnées déjà saisies sur cet appareil : seulement dans le navigateur */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setNo(String(Math.floor(1000 + Math.random() * 9000)));
      setDate(new Date().toLocaleDateString(locale === "ar" ? "ar-MA" : "fr-MA", { day: "2-digit", month: "short", year: "numeric" }));
      try { const s = JSON.parse(localStorage.getItem(CLIENT) || "null"); if (s) setVals((v) => ({ ...v, nom: s.nom || "", tel: s.tel || "", ville: s.ville || "" })); } catch { /* stockage indisponible */ }
    });
    return () => cancelAnimationFrame(raf);
  }, [locale]);

  /* le ticket « avance » quand un soin est ajouté */
  useEffect(() => {
    if (!c.feed) return;
    const el = tk.current;
    if (!el) return;
    el.classList.remove("feed"); void el.offsetWidth; el.classList.add("feed");
  }, [c.feed]);

  const set = (n: keyof typeof vals, v: string) => {
    if (n === "tel") { const d = v.replace(/[^\d+]/g, ""); if (!d.startsWith("+") && !d.startsWith("00")) v = d.slice(0, 10).replace(/(\d{2})(?=\d)/g, "$1 ").trim(); }
    setVals((s) => ({ ...s, [n]: v }));
    if (invalid.includes(n)) { const rest = invalid.filter((x) => x !== n); setInvalid(rest); if (!rest.length) setError(""); }
    // 10 chiffres tapés : on passe tout seul à la ville
    if (n === "tel" && telOk(v) && !vals.ville) document.getElementById("f-ville")?.focus();
  };
  const okCls = (n: keyof typeof vals) => (n === "tel" ? telOk(vals.tel) : n === "email" ? vals.email.trim() !== "" && emailOk(vals.email) : vals[n].trim().length > 1) ? "is-ok" : undefined;

  /* nom affiché d'une ligne */
  const lineName = (i: number) => { const l = lines[i], it = item(l.key); return it.name + (it.formats.length > 1 && l.f === "grand" ? t.grandSuffix : ""); };
  const fmt = (i: number) => item(lines[i].key).formats.find((x) => x.f === lines[i].f)!;

  /* rappel sous les articles : grand format, ou offre 2 + 1 */
  let nudge: React.ReactNode = null;
  if (!mainItem.bundle && upsell && main.f === "petit" && mainItem.formats.length > 1) {
    nudge = <><span dangerouslySetInnerHTML={{ __html: fill(t.nudgeGrand, { x: upsell }) }} /><button type="button" onClick={() => c.setMain({ f: "grand" })}>{t.grand}</button></>;
  } else if (mainItem.bundle && unitWord) {
    const p = mainItem.formats[0].price;
    if (main.qty % 3 === 1 && main.qty < 3) nudge = <><span dangerouslySetInnerHTML={{ __html: fill(t.nudgeTake3, { p: p * 2, u: unitWord.many }) }} /><button type="button" onClick={() => c.setMain({ qty: 3 })}>{t.passTo3}</button></>;
    else if (main.qty % 3 === 2) nudge = <><span dangerouslySetInnerHTML={{ __html: fill(t.nudgeAdd1, { u: unitWord.one }) }} /><button type="button" onClick={() => c.setMain({ qty: main.qty + 1 })}>{t.plusOneFree}</button></>;
  }

  /* glisser la feuille vers le haut / le bas (mobile) */
  const drag = useRef<{ y: number; t: number; open: boolean; dy: number } | null>(null);
  const dragged = useRef(false);
  const mobile = () => window.matchMedia("(max-width:1020px)").matches;
  const peek = () => (tk.current?.offsetHeight ?? 0) - ((tk.current?.querySelector(".sheet-h") as HTMLElement | null)?.offsetHeight ?? 96);
  const onDown = (e: React.PointerEvent) => { if (!mobile()) return; drag.current = { y: e.clientY, t: performance.now(), open: c.isOpen, dy: 0 }; dragged.current = false; };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current, el = tk.current;
    if (!d || !el) return;
    d.dy = e.clientY - d.y;
    if (!dragged.current && Math.abs(d.dy) < 6) return;
    if (!dragged.current) { dragged.current = true; try { (e.target as Element).setPointerCapture(e.pointerId); } catch { /* déjà capturé */ } }
    const base = d.open ? 0 : peek(), v = Math.min(peek(), Math.max(0, base + d.dy));
    el.style.transition = "none"; el.style.transform = `translateY(${v}px)`;
  };
  const onUp = () => {
    const d = drag.current, el = tk.current;
    if (!d || !el) return;
    drag.current = null;
    el.style.transition = ""; el.style.transform = "";
    if (!dragged.current) return;
    const vel = d.dy / Math.max(1, performance.now() - d.t);
    if (!d.open && (d.dy < -60 || vel < -0.45)) { c.open(); buzz(10); }
    else if (d.open && (d.dy > 90 || vel > 0.45)) c.close();
  };
  const handle = { onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp };

  /* WhatsApp : le message est déjà écrit, avec le ticket */
  const waHref = () => {
    const rows = lines.map((l, i) => { const f = freeOf(item(l.key), l.qty); return `• ${l.qty} × ${lineName(i)} ${fmt(i).ml} ${t.ml} : ${c.lineTotal(l)} ${t.dh}${f ? ` (${fill(f > 1 ? t.freeOfs : t.freeOf, { n: f })})` : ""}`; });
    const msg = [`${t.waHello} (${t.ticketNo} N° ${no})`, ...rows, fill(t.waTotal, { t: total }), vals.nom.trim() && fill(t.waName, { v: vals.nom.trim() }), vals.ville.trim() && fill(t.waCity, { v: vals.ville.trim() })].filter(Boolean).join("\n");
    return `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const f = form.current!;
    if ((f.elements.namedItem("site") as HTMLInputElement).value) return; // champ piège
    const bad = (["nom", "tel", "ville", "email"] as const).filter((n) => (n === "tel" ? !telOk(vals.tel) : n === "email" ? !emailOk(vals.email) : vals[n].trim().length < 2));
    setInvalid(bad);
    if (bad.length) {
      setError(bad.length === 1 && bad[0] === "tel" ? t.errPhone : bad.length === 1 && bad[0] === "email" ? t.errEmail : t.errFields);
      setShake((n) => n + 1); buzz([30, 40, 30]);
      if (mobile() && !c.isOpen) c.open();
      document.getElementById(`f-${bad[0]}`)?.focus();
      return;
    }
    // case obligatoire : CGV et politique de retour (vérifiée aussi par le serveur)
    if (!agree) {
      setInvalid(["cgv"]); setError(t.errTerms);
      setShake((n) => n + 1); buzz([30, 40, 30]);
      if (mobile() && !c.isOpen) c.open();
      document.getElementById("f-cgv")?.focus();
      return;
    }
    setError("");
    const order = {
      id: newId(), locale, kind: "unite",
      items: lines.map((l) => ({ key: l.key, format: l.f, qty: l.qty })),
      nom: vals.nom.trim(), tel: vals.tel.trim(), ville: vals.ville.trim(), email: vals.email.trim(), site: "", cgv: true,
      page: location.href.split("#")[0],
    };
    try { localStorage.setItem(CLIENT, JSON.stringify({ nom: order.nom, tel: order.tel, ville: order.ville })); } catch { /* stockage indisponible */ }
    setSending(true); setFailWa("");
    const res: { ok: boolean; numero?: string; error?: string; fields?: string[] } | null = await fetch("/api/order", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) })
      .then((r) => (r.status >= 500 ? null : r.json()), () => null);
    setSending(false);
    if (res && !res.ok) { // refusée par le serveur : on explique, rien n'est enregistré
      const fields = (res.fields || []).filter((x) => ["nom", "tel", "ville", "email", "cgv"].includes(x));
      setInvalid(fields);
      setError(res.error === "limite" ? t.errLimit : fields.length === 1 && fields[0] === "cgv" ? t.errTerms : fields.length === 1 && fields[0] === "email" ? t.errEmail : fields.length === 1 && fields[0] === "tel" ? t.errPhone : fields.length ? t.errFields : t.errServer);
      if (fields.length) document.getElementById(`f-${fields[0]}`)?.focus();
      return;
    }
    if (!res) { // panne du serveur ou hors connexion : la commande n'est enregistrée nulle part, pas de confirmation
      setError(t.errServer); setFailWa(waHref());
      return;
    }
    window.dispatchEvent(new CustomEvent("otage:order", { detail: { type: "unite", format: [...new Set(lines.map((l) => l.f))].join("+"), value: total } })); // mesure d'audience, si acceptée
    if (mobile() && !c.isOpen) c.open();
    buzz([12, 60, 24]);
    // le ticket se détache, puis le tampon tombe
    const parts = [tk.current?.querySelector(".tk-body"), tk.current?.querySelector(".tk-foot")].filter(Boolean) as HTMLElement[];
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      await Promise.all(parts.map((el, i) => el.animate([{ transform: "none", opacity: 1 }, { transform: `translateY(40px) rotate(${i ? 1.5 : -1.5}deg)`, opacity: 0 }], { duration: 420, delay: i * 70, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" }).finished));
    }
    setDone({ name: order.nom.split(/\s+/)[0], numero: res?.numero || "", tel: order.tel, email: order.email });
  };
  const again = () => {
    c.close();
    if (!done) return;
    setDone(null); setAgree(false); c.reset();
    tk.current?.querySelectorAll<HTMLElement>(".tk-body,.tk-foot").forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  };

  const inv = (n: string) => (invalid.includes(n) ? { "aria-invalid": true as const } : {});

  return (
    <aside className="tk-wrap" aria-label={t.ticket}>
      <div className="tk" id="ticket" ref={tk}>
        <button type="button" className="sheet-h" aria-controls="ticket" aria-expanded={c.isOpen} {...handle}
          onClick={(e) => { if (dragged.current) { e.preventDefault(); dragged.current = false; return; } c.open(); }}>
          <Img src={thumb.src} alt="" width={thumb.w} height={thumb.h} sizes="52px" />
          <span className="sh-t"><b><Total /> {t.dh}</b><small>{count > 1 ? fill(t.articlesPlus, { n: count }) : t.paidOnDelivery}</small></span>
          <span className="sh-go">{t.order} <Up /></span>
        </button>
        <div className="tk-head" {...handle}>
          <Img src={logo.src} alt="otage" width={logo.w} height={logo.h} style={{ filter: "brightness(0) invert(1)" }} sizes="96px" />
          <span className="mono">{t.ticketNo} <span dir="ltr">N° {no}</span><br /><span>{date}</span></span>
          <button type="button" className="tk-close" aria-label={t.closeTicket} onClick={again}><Close /></button>
        </div>
        <div className="perf" aria-hidden="true"></div>

        <form className="tk-body" noValidate id="order" ref={form} onSubmit={submit}>
          <div className="tk-sec">
            <div className="tk-k mono"><span>{t.ticket}</span><span>{fill(count > 1 ? t.articles : t.article, { n: count })}</span></div>
            <div className="items">
              {lines.map((l, i) => {
                const it = item(l.key), v = fmt(i), free = freeOf(it, l.qty), name = lineName(i), k = `${l.key}:${l.f}`;
                return (
                  <div key={l.main ? "main" : k} className={`item${c.lastAdded === k && !l.main ? " new" : ""}`}>
                    <Img src={it.img.src} alt="" width={it.img.w} height={it.img.h} sizes="52px" className="pack" />
                    <div>
                      <b>{name}</b>
                      <small>{v.ml} {t.ml} · {v.price} {t.dh}{free > 0 && <span className="free">{fill(free > 1 ? t.freeOfs : t.freeOf, { n: free })}</span>}</small>
                      <div className="qs" role="group" aria-label={fill(t.qty, { x: name })}>
                        <button type="button" onClick={() => c.step(i, -1)} aria-label={fill(l.qty === 1 && !l.main ? t.remove : t.less, { x: name })}>{l.qty === 1 && !l.main ? "×" : "−"}</button>
                        <output aria-live="polite">{l.qty}</output>
                        <button type="button" onClick={() => c.step(i, 1)} aria-label={fill(t.more, { x: name })}>+</button>
                      </div>
                    </div>
                    <span className="item-p">{free > 0 && <s>{l.qty * v.price}</s>}{c.lineTotal(l)}</span>
                  </div>
                );
              })}
            </div>
            {nudge && <div className="nudge">{nudge}</div>}
          </div>

          <div className="tk-sec up">
            <div className="tk-k mono"><span>{t.addTo}</span><span>{t.oneTap}</span></div>
            <div className="ups" role="list">
              {others.map((it) => (
                <div key={it.key} className="up-c" role="listitem">
                  <Img src={it.img.src} alt="" width={it.img.w} height={it.img.h} sizes="150px" />
                  <b>{it.name}</b>
                  <FormatSwitch it={it} small />
                  <AddButton it={it} className="up-add" />
                </div>
              ))}
            </div>
          </div>

          <div className="tk-sec sums">
            <div><span>{t.subtotal}</span><span><span className="num">{total}</span> {t.dh}</span></div>
            <div><span>{t.delivery} {vals.ville.trim() && fill(t.deliveryTo, { v: vals.ville.trim() })}</span><span>{fill(t.fee, { a: fee.min, b: fee.max })}</span></div>
            <div className="tot"><span className="mono">{t.totalProducts}</span><b><Total /><small>{t.dh}</small></b></div>
          </div>

          <div className="tk-sec">
            <div className="tk-k mono"><span>{t.weDeliver}</span><span>{t.threeBoxes}</span></div>
            <div className="f"><label htmlFor="f-nom">{t.nom}</label><input id="f-nom" name="nom" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder={t.nomEx} value={vals.nom} className={okCls("nom")} onChange={(e) => set("nom", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("f-tel")?.focus(); } }} {...inv("nom")} /></div>
            <div className="f"><label htmlFor="f-tel">{t.tel} <small>{t.telHint}</small></label><input id="f-tel" name="tel" type="tel" inputMode="numeric" autoComplete="tel-national" enterKeyHint="next" placeholder="06 12 34 56 78" dir="ltr" value={vals.tel} className={okCls("tel")} onChange={(e) => set("tel", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("f-ville")?.focus(); } }} {...inv("tel")} /></div>
            <CityField locale={locale} id="f" look="product" listId="f-villes" input={{ value: vals.ville, className: okCls("ville"), onChange: (e) => set("ville", e.target.value), ...inv("ville") }} />
            <div className="f"><label htmlFor="f-email">{t.email} <small>{t.emailOpt}</small></label><input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" enterKeyHint="done" dir="ltr" placeholder="prenom@exemple.com" aria-describedby="f-email-info" value={vals.email} className={okCls("email")} onChange={(e) => set("email", e.target.value)} {...inv("email")} /><small id="f-email-info" className="f-info"><b>{t.emailHint}</b> {t.emailConsent}</small></div>
            <input name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1 }} />
            <label className="agree">
              <input id="f-cgv" type="checkbox" name="cgv" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (invalid.includes("cgv")) { const rest = invalid.filter((x) => x !== "cgv"); setInvalid(rest); if (!rest.length) setError(""); } }} {...inv("cgv")} />
              <span>{t.agreeA} <a href={links.cgv} target="_blank" rel="noopener">{t.agreeCgv}</a> {t.agreeAnd} <a href={links.returns} target="_blank" rel="noopener">{t.agreeReturns}</a>.</span>
            </label>
            <p className="err" role="alert">{error}{error && failWa && <> <a href={failWa} target="_blank" rel="noopener">WhatsApp</a></>}</p>
          </div>
        </form>

        <div className="tk-foot">
          <div className="ctas">
            <button key={shake} type="submit" form="order" className={`go${shake ? " buzz" : ""}`} data-mag="" disabled={sending} aria-busy={sending || undefined}><TotalLabel tpl={t.validate} /><i aria-hidden="true"><Arrow /></i></button>
            <a className="wa-btn" data-mag="" href={`https://wa.me/${wa}`} target="_blank" rel="noopener" aria-label={t.whatsapp} onClick={(e) => { e.currentTarget.href = waHref(); buzz(10); }}><Wa /><span>WhatsApp</span></a>
          </div>
          <Reassure locale={locale} className="tk-reass" />
        </div>

        {done && (
          <div className="ok">
            <div className="stamp" aria-hidden="true"><span>{t.confirmed}</span></div>
            <h3>{done.name ? fill(t.thanks, { n: done.name }) : t.thanksDefault}</h3>
            <p dangerouslySetInnerHTML={{ __html: fill(done.numero ? t.done : t.doneOffline, { no: esc(done.numero), tel: esc(done.tel) }).replace(/<b>([^<]*)<\/b>/g, (m, x) => (/^[\d\s+-]+$|^OTG/.test(x) ? `<b dir="ltr">${x}</b>` : m)) }} />
            {done.email && <p dangerouslySetInnerHTML={{ __html: fill(t.doneEmail, { email: `<bdi dir="ltr">${esc(done.email)}</bdi>` }) }} />}
            <button type="button" className="btn-ghost" onClick={again}>{t.continue}</button>
          </div>
        )}
      </div>
    </aside>
  );
}
