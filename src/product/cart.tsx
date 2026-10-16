"use client";

/* Fiche produit : l'état du ticket, partagé par l'offre du haut, les cartes « Le reste de la maison » et le ticket.
   Les prix affichés viennent de src/data/products.ts (transmis par la page) ; à l'envoi, le serveur ne reçoit que les choix
   (soin, format, quantité) et recalcule tout, offre 2 + 1 comprise (src/lib/order/compute.ts). */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Img from "@/components/Img";
import type { FormatKey, ProductKey } from "@/data/products";
import type { Locale } from "@/data/site";
import type { ProductUi } from "./ui";
import { fill, freeOf, type CartItem, type Line } from "./shared";

export { fill, freeOf, type CartItem, type Line };
import { Check, Pot } from "./icons";

type Ctx = {
  locale: Locale;
  t: ProductUi;
  main: CartItem;
  others: CartItem[];
  item: (key: ProductKey) => CartItem;
  lines: Line[];
  lastAdded: string | null;
  feed: number;
  sel: Record<string, FormatKey>;
  pick: (key: ProductKey, f: FormatKey) => void;
  setMain: (patch: Partial<Pick<Line, "f" | "qty">>) => void;
  toggle: (key: ProductKey) => void;
  step: (i: number, by: 1 | -1) => void;
  reset: () => void;
  isIn: (key: ProductKey) => boolean;
  price: (l: Line) => number;
  lineTotal: (l: Line) => number;
  total: number;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
const CartContext = createContext<Ctx | null>(null);
export const useCart = () => useContext(CartContext)!;

export function CartProvider({ main, others, locale, t, children }: { main: CartItem; others: CartItem[]; locale: Locale; t: ProductUi; children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([{ key: main.key, f: main.formats[0].f, qty: 1, main: true }]);
  const [sel, setSel] = useState<Record<string, FormatKey>>(() => Object.fromEntries(others.map((o) => [o.key, o.formats[0].f])));
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [feed, setFeed] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const all = useMemo(() => [main, ...others], [main, others]);
  const item = useCallback((key: ProductKey) => all.find((x) => x.key === key)!, [all]);
  const price = useCallback((l: Line) => item(l.key).formats.find((x) => x.f === l.f)!.price, [item]);
  const lineTotal = useCallback((l: Line) => (l.qty - freeOf(item(l.key), l.qty)) * price(l), [item, price]);
  const total = lines.reduce((s, l) => s + lineTotal(l), 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const buzz = (p: number | number[]) => { try { navigator.vibrate?.(p); } catch { /* vibration indisponible */ } };

  const setMain = (patch: Partial<Pick<Line, "f" | "qty">>) => { setLines((ls) => ls.map((l) => (l.main ? { ...l, ...patch } : l))); setLastAdded(null); buzz(10); };
  const toggle = (key: ProductKey) => {
    const f = sel[key];
    setLines((ls) => (ls.some((l) => !l.main && l.key === key && l.f === f) ? ls.filter((l) => l.main || l.key !== key || l.f !== f) : [...ls, { key, f, qty: 1 }]));
    setLastAdded(lines.some((l) => !l.main && l.key === key && l.f === f) ? null : `${key}:${f}`);
    setFeed((n) => n + 1);
    buzz(12);
  };
  const step = (i: number, by: 1 | -1) => {
    setLines((ls) => ls.flatMap((l, k) => (k !== i ? [l] : by > 0 ? [{ ...l, qty: Math.min(9, l.qty + 1) }] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : l.main ? [l] : [])));
    setLastAdded(null);
    buzz(8);
  };
  const pick = (key: ProductKey, f: FormatKey) => { setSel((s) => ({ ...s, [key]: f })); buzz(6); };
  const isIn = (key: ProductKey) => lines.some((l) => !l.main && l.key === key && l.f === sel[key]);
  const reset = () => setLines([{ key: main.key, f: main.formats[0].f, qty: 1, main: true }]);

  const mobile = () => window.matchMedia("(max-width:1020px)").matches;
  const open = useCallback(() => {
    if (mobile()) { setOpen(true); document.body.style.overflow = "hidden"; }
    else document.querySelector(".tk")?.animate([{ transform: "scale(1)" }, { transform: "scale(1.015)" }, { transform: "scale(1)" }], { duration: 450, easing: "ease-out" });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => (document.getElementById("f-nom") as HTMLInputElement | null)?.focus({ preventScroll: true }), reduce ? 0 : 500);
  }, []);
  const close = useCallback(() => { setOpen(false); document.body.style.overflow = ""; }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  const value: Ctx = { locale, t, main, others, item, lines, lastAdded, feed, sel, pick, setMain, toggle, step, reset, isIn, price, lineTotal, total, count, isOpen, open, close };
  return (
    <CartContext.Provider value={value}>
      <div className={`shell${isOpen ? " open" : ""}`} id="top">
        {children}
        <div className="scrim" onClick={close} aria-hidden="true" />
      </div>
    </CartContext.Provider>
  );
}

/** Le total qui défile comme un compteur. */
export function Total({ value }: { value?: number }) {
  const { total } = useCart();
  const to = value ?? total;
  const [shown, setShown] = useState(to);
  const from = useRef(to);
  useEffect(() => {
    const start = from.current;
    from.current = to;
    if (start === to || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(to); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 520);
      setShown(Math.round(start + (to - start) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span className="num">{shown}</span>;
}

/** Bouton qui ouvre le ticket (badge, grands boutons). */
export function OpenButton({ className, label, children, mag }: { className: string; label?: string; children: React.ReactNode; mag?: boolean }) {
  const { open } = useCart();
  return <button type="button" className={className} aria-label={label} data-mag={mag ? "" : undefined} onClick={open}>{children}</button>;
}

/** Texte d'un bouton avec le total : « Commander · 163 DH ». */
export function TotalLabel({ tpl }: { tpl: string }) {
  const [a, b] = tpl.split("{t}");
  return <span>{a}<Total />{b}</span>;
}

/** Le choix du haut de fiche : Petit / Grand format, ou 1 / 3 articles (offre 2 + 1). */
export function Offer({ upsellFlag, unitWord }: { upsellFlag?: string; unitWord?: { one: string; many: string } }) {
  const { main, lines, setMain, t } = useCart();
  const m = lines[0];
  if (main.bundle) {
    const p = main.formats[0];
    return (
      <div className="offer" role="radiogroup" aria-label={t.chooseOffer}>
        <button type="button" className="pk" role="radio" aria-checked={m.qty < 3} onClick={() => setMain({ qty: 1 })}>
          <span className="pk-dot" aria-hidden="true"></span>
          <span className="pk-main"><b>1 {unitWord?.one}</b><small>{main.key === "deo" ? t.toTryCap : `${p.ml} ${t.ml} · ${t.toTry}`}</small></span>
          <span className="pk-price"><b>{p.price}</b> {t.dh}</span>
        </button>
        <button type="button" className="pk pk-best" role="radio" aria-checked={m.qty >= 3} onClick={() => setMain({ qty: 3 })}>
          <span className="pk-flag">{t.bundleFlag}</span>
          <span className="pk-dot" aria-hidden="true"></span>
          <span className="pk-main"><b>3 {unitWord?.many}</b><small><span className="pots" aria-hidden="true"><Pot /><Pot /><span className="free"><Pot /><i>{t.offered}</i></span></span> {fill(t.perUnit, { p: Math.round((p.price * 2) / 3), u: unitWord?.one ?? "" })}</small></span>
          <span className="pk-price"><s>{p.price * 3}</s><b>{p.price * 2}</b> {t.dh}</span>
        </button>
      </div>
    );
  }
  return (
    <div className="offer" role="radiogroup" aria-label={t.chooseFormat}>
      {main.formats.map((x, i) => (
        <button key={x.f} type="button" className={`pk${i ? " pk-best" : ""}`} role="radio" aria-checked={m.f === x.f} onClick={() => setMain({ f: x.f })}>
          {i > 0 && upsellFlag && <span className="pk-flag">{upsellFlag}</span>}
          <span className="pk-dot" aria-hidden="true"></span>
          <span className="pk-main"><b>{x.f === "petit" ? t.petit : t.grand}</b><small>{x.ml} {t.ml} · {x.f === "petit" ? t.toTry : t.bestMl}</small></span>
          <span className="pk-price"><b>{x.price}</b> {t.dh}</span>
        </button>
      ))}
    </div>
  );
}

/** Petit / Grand format d'un autre soin (carte ou ticket). */
export function FormatSwitch({ it, small }: { it: CartItem; small?: boolean }) {
  const { sel, pick, t } = useCart();
  if (it.formats.length < 2) {
    const v = it.formats[0];
    return <div className={`fsw one${small ? " sm" : ""}`}><span><b>{t.unique}</b><span>{v.ml} {t.ml} · {v.price} {t.dh}</span></span></div>;
  }
  return (
    <div className={`fsw${small ? " sm" : ""}`} role="radiogroup" aria-label={fill(t.formatOf, { x: it.name })}>
      {it.formats.map((v) => (
        <button key={v.f} type="button" role="radio" aria-checked={sel[it.key] === v.f} onClick={() => sel[it.key] !== v.f && pick(it.key, v.f)}>
          <b>{v.f === "petit" ? t.petitShort : t.grandShort}</b><span>{v.ml} {t.ml} · {v.price} {t.dh}</span>
        </button>
      ))}
    </div>
  );
}

export function AddButton({ it, className }: { it: CartItem; className: string }) {
  const { isIn, toggle, t } = useCart();
  const on = isIn(it.key);
  return (
    <button type="button" className={`${className}${on ? " on" : ""}`} aria-pressed={on}
      onClick={() => {
        toggle(it.key);
        if (window.matchMedia("(max-width:1020px)").matches) document.querySelector(".sheet-h")?.animate([{ transform: "none" }, { transform: "translateY(-8px)" }, { transform: "none" }], { duration: 380, easing: "ease-out" });
      }}>
      {/* nom accessible = texte visible + nom du soin (règle « label in name ») */}
      {on ? <><Check />{t.added}</> : t.add}<span className="sr"> {it.name}</span>
    </button>
  );
}

/** Carte « Le reste de la maison ». */
export function MoreCard({ it }: { it: CartItem }) {
  const { sel, t } = useCart();
  const v = it.formats.find((x) => x.f === sel[it.key])!;
  return (
    <article className="ms-c">
      <a className="ms-pic" href={it.url} aria-label={`N° ${it.no} · ${t.see} : ${it.name}`}>{/* le libellé commence par le texte visible (« N° 01 ») */}
        <span className="ms-no mono" dir="ltr">N° {it.no}</span>
        <Img className={it.wide ? "wide" : undefined} src={it.img.src} alt={it.name} width={it.img.w} height={it.img.h} sizes="200px" style={{ "--z": it.formats.length > 1 && sel[it.key] === "grand" ? 1.1 : 1 } as React.CSSProperties} draggable={false} />
      </a>
      <div className="ms-row"><b><a href={it.url}>{it.name}</a></b><span>{v.price} {t.dh}</span></div>
      <FormatSwitch it={it} />
      <AddButton it={it} className="ms-add up-add" />
    </article>
  );
}
