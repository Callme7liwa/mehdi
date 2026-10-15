"use client";

/* Fiche produit : carrousels, étiquette des ingrédients, questions, et les effets de la page
   (barre du haut, apparitions, curseur à étiquette et boutons aimantés à la souris). */
import { Children, useEffect, useId, useRef, useState } from "react";
import { useCart } from "./cart";
import { Back, Next } from "./icons";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => window.matchMedia("(max-width:1020px)").matches;

/** Carrousel horizontal : flèches, points, glisser à la souris, flèches du clavier. */
export function Carousel({ title, note, headClass, trackClass, label, prev, next, children }: {
  title: React.ReactNode; note?: React.ReactNode; headClass: string; trackClass: string; label: string; prev: string; next: string; children: React.ReactNode;
}) {
  const car = useRef<HTMLDivElement>(null);
  const n = Children.count(children);
  const [state, setState] = useState({ i: 0, start: true, end: n < 2 });
  const rtl = () => getComputedStyle(car.current!).direction === "rtl";
  const stepW = () => ((car.current?.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 300) + 16;
  const upd = () => {
    const el = car.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth, x = Math.abs(el.scrollLeft);
    const i = max <= 0 ? 0 : Math.round((x / max) * (n - 1));
    setState((s) => (s.i === i && s.start === x < 4 && s.end === x > max - 4 ? s : { i, start: x < 4, end: x > max - 4 }));
  };
  const go = (dir: 1 | -1, smooth = true) => car.current?.scrollBy({ left: dir * (rtl() ? -1 : 1) * stepW(), behavior: smooth && !reduced() ? "smooth" : "auto" });

  useEffect(() => {
    const el = car.current;
    if (!el) return;
    upd();
    window.addEventListener("resize", upd);
    // glisser à la souris (le doigt fait défiler tout seul)
    let sx: number | null = null, sl = 0, moved = false;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse" || (e.target as Element).closest("button,a")) return; sx = e.clientX; sl = el.scrollLeft; moved = false; el.style.scrollSnapType = "none"; el.style.scrollBehavior = "auto"; };
    const move = (e: PointerEvent) => { if (sx === null) return; const d = e.clientX - sx; if (Math.abs(d) > 5) moved = true; el.scrollLeft = sl - d; };
    const up = () => { if (sx === null) return; sx = null; el.style.scrollBehavior = ""; const w = stepW(), i = Math.round(el.scrollLeft / w); el.scrollTo({ left: i * w, behavior: "smooth" }); setTimeout(() => (el.style.scrollSnapType = ""), 450); };
    const click = (e: MouseEvent) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => { window.removeEventListener("resize", upd); el.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); el.removeEventListener("click", click, true); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nav = (
    <div className="car-nav">
      <button type="button" className="car-b" aria-label={prev} disabled={state.start} onClick={() => go(-1)}><Back /></button>
      <button type="button" className="car-b" aria-label={next} disabled={state.end} onClick={() => go(1)}><Next /></button>
    </div>
  );
  return (
    <>
      <div className={headClass}>
        {title}
        {note ? <div className="revs-r">{note}{n > 1 && nav}</div> : n > 1 && nav}
      </div>
      <div className={`car ${trackClass}`} ref={car} tabIndex={0} role="group" aria-label={label} onScroll={() => requestAnimationFrame(upd)}
        onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go((e.key === "ArrowRight") !== rtl() ? 1 : -1, false); } }}>
        {children}
      </div>
      {n > 1 && <div className="car-dots" aria-hidden="true">{Array.from({ length: n }, (_, k) => <i key={k} className={k === state.i ? "on" : undefined} />)}</div>}
    </>
  );
}

/** L'étiquette : la liste des ingrédients, synchronisée avec les points posés sur la photo.
    Sur ordinateur, l'ingrédient ouvert avance tout seul au défilement (sauf juste après un clic). */
export function Ingredients({ items, spots, photo }: { items: { n: string; name: string; where: string; role: string; why?: string }[]; spots?: { x: number; y: number; tip: string }[]; photo: React.ReactNode }) {
  const [on, setOn] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  // après un clic, l'avance automatique se met en pause 4 s
  const paused = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pick = (i: number) => { if (paused.current) clearTimeout(paused.current); paused.current = setTimeout(() => (paused.current = null), 4000); setOn(i); };

  useEffect(() => {
    let ticking = false;
    const frame = () => {
      ticking = false;
      const el = grid.current;
      if (!el || isMobile() || paused.current) return;
      const vh = window.innerHeight, r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, (vh * 0.55 - r.top) / Math.max(1, r.height - vh * 0.2)));
      if (r.top < vh * 0.55 && r.bottom > vh * 0.3) setOn(Math.floor(p * items.length));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <div className="lab-g" ref={grid}>
      <div className={`jar${spots ? "" : " is-pack"}`}>
        {photo}
        {spots?.map((s, i) => (
          <button key={i} type="button" className="hs" style={{ left: `${s.x}%`, top: `${s.y}%` }} aria-pressed={i === on} aria-label={s.tip}
            onClick={() => { pick(i); if (isMobile()) document.getElementById(`ix${i}`)?.closest("li")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" }); }}>
            <span className="hs-tip">{s.tip}</span>
          </button>
        ))}
      </div>
      <div>
        <ul className="ings">
          {items.map((g, i) => (
            <li key={g.name}>
              <button type="button" className="ing-b" aria-expanded={i === on} aria-controls={`ix${i}`} onClick={() => pick(i)}>
                <span className="n" dir="ltr">{g.n}</span><span className="t">{g.name}</span><span className="w">{g.where}</span>
              </button>
              <div className="ing-x" id={`ix${i}`}><div><p>{g.role}</p>{g.why && <p>{g.why}</p>}</div></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Une question, qui s'ouvre au clic (le texte est dans la page, pour les moteurs aussi). */
export function Question({ q, children, first }: { q: string; children: React.ReactNode; first?: boolean }) {
  const [open, setOpen] = useState(Boolean(first));
  const id = useId();
  return (
    <div className="q">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>{q}<i aria-hidden="true">+</i></button>
      <div className="a" id={id}><div>{children}</div></div>
    </div>
  );
}

/** Effets de la page : barre du haut opaque au défilement, apparitions, curseur à étiquette et boutons aimantés. */
export function Fx() {
  const { open } = useCart();
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const onScroll = () => nav?.classList.toggle("solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io!.unobserve(en.target); } }), { threshold: 0.15 }) : null;
    document.querySelectorAll(".rv").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

    const media = document.querySelector<HTMLElement>(".hz-media");
    const openFromMedia = (e: MouseEvent) => { if (!(e.target as Element).closest("button,a")) open(); };
    media?.addEventListener("click", openFromMedia);

    const off: (() => void)[] = [];
    if (window.matchMedia("(pointer:fine)").matches && !reduced()) {
      document.documentElement.classList.add("has-cur");
      const c = document.querySelector<HTMLElement>(".cur"), lab = c?.querySelector("span");
      let tx = -200, ty = -200, x = -200, y = -200, sc = 0, ts = 0, raf = 0;
      // la boucle ne tourne que pendant que le curseur rattrape la souris : rien à l'arrêt
      const loop = () => {
        x += (tx - x) * 0.2; y += (ty - y) * 0.2; sc += (ts - sc) * 0.18;
        if (c) c.style.transform = `translate3d(${x}px,${y}px,0) scale(${sc.toFixed(3)})`;
        raf = Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(ts - sc) > 0.2 ? requestAnimationFrame(loop) : 0;
      };
      const move = (e: PointerEvent) => {
        tx = e.clientX; ty = e.clientY;
        const z = (e.target as Element).closest?.<HTMLElement>("[data-cursor]");
        if (z && !(e.target as Element).closest("button,a,input")) { if (lab) lab.textContent = z.dataset.cursor ?? ""; ts = 1; } else ts = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      };
      window.addEventListener("pointermove", move, { passive: true });
      off.push(() => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); });
      // boutons aimantés : délégation, pour suivre aussi les boutons rendus plus tard
      let cur: HTMLElement | null = null;
      const mag = (e: PointerEvent) => {
        const el = (e.target as Element).closest?.<HTMLElement>("[data-mag]") ?? null;
        if (cur && cur !== el) cur.style.translate = "0 0";
        cur = el;
        if (!el) return;
        if (!el.dataset.magOn) { el.dataset.magOn = "1"; el.style.transition = (getComputedStyle(el).transition ? getComputedStyle(el).transition + "," : "") + "translate .35s cubic-bezier(.2,.8,.2,1)"; }
        const r = el.getBoundingClientRect();
        el.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 14}px ${((e.clientY - r.top) / r.height - 0.5) * 12}px`;
      };
      window.addEventListener("pointermove", mag, { passive: true });
      off.push(() => window.removeEventListener("pointermove", mag));
    }
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); media?.removeEventListener("click", openFromMedia); off.forEach((f) => f()); };
  }, [open]);
  return null;
}
