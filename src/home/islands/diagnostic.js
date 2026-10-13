import { shared } from "./shared";

export default function init(cfg) {
  const { D, startGap } = shared(cfg);
  /* ================= Qu'est-ce qui te gêne ? ================= */
  (() => {
    const sec = document.querySelector(".dg");
    if (!sec) return;
    const offers = document.querySelector(".offers");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glide = (y) => (window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" }));

    /* carrousel : points + flèches */
    const cars = [...document.querySelectorAll(".dg-car")].map((art) => {
      const track = art.querySelector(".car-track"), items = [...track.children];
      const dots = art.querySelector(".car-dots"), prev = art.querySelector(".car-prev"), next = art.querySelector(".car-next");
      if (dots) dots.innerHTML = items.map(() => "<i></i>").join("");
      const upd = () => {
        const pl = parseFloat(getComputedStyle(track).paddingLeft);
        let idx = 0, best = 1e9;
        items.forEach((c, i) => { const d = Math.abs(startGap(track, c)); if (d < best) { best = d; idx = i; } });
        if (dots) [...dots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
        if (prev) { const x = Math.abs(track.scrollLeft); prev.disabled = x < 4; next.disabled = x > track.scrollWidth - track.clientWidth - 4; }
      };
      const go = (i) => { const c = items[Math.max(0, Math.min(items.length - 1, i))]; track.scrollBy({ left: D * startGap(track, c), behavior: reduce ? "auto" : "smooth" }); };
      prev && prev.addEventListener("click", () => track.scrollBy({ left: -D * (items[0].offsetWidth + 12), behavior: "smooth" }));
      next && next.addEventListener("click", () => track.scrollBy({ left: D * (items[0].offsetWidth + 12), behavior: "smooth" }));
      let t = false;
      track.addEventListener("scroll", () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; upd(); }); } }, { passive: true });
      window.addEventListener("resize", upd);
      return { art, go, upd };
    });

    /* choix du problème */
    const cards = [...sec.querySelectorAll(".dg-card")];
    const res = [...document.querySelectorAll(".dg-r")];
    const pick = (pb, opts = {}) => {
      cards.forEach((c) => { const on = c.dataset.pb === pb; c.setAttribute("aria-checked", String(on)); c.tabIndex = on ? 0 : -1; if (on && opts.focus) c.focus(); });
      res.forEach((r) => (r.hidden = r.dataset.r !== pb));
      cars.forEach((c) => c.upd());
      // l'offre en dessous suit le problème choisi
      if (pb !== "odeurs" && window.OTAGE && OTAGE.setProduct) OTAGE.setProduct(pb);
      if (opts.toOffer && pb !== "odeurs") {
        // achat facilité : on descend tout de suite sur la première étape de la commande
        const first = offers.querySelector(".tk-choose .ch");
        offers.classList.add("seen");
        // position réelle (sans l'animation d'entrée de la section)
        let y = 0; for (let el = first; el; el = el.offsetParent) y += el.offsetTop;
        setTimeout(() => glide(y - 28), reduce ? 0 : 180);
        return;
      }
      if (opts.reveal !== false) {
        const r = document.querySelector(`.dg-r[data-r="${pb}"]`);
        const top = r.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.7 || top < 0) glide(window.scrollY + top - 80);
      }
    };
    cards.forEach((c, i) => {
      c.addEventListener("click", () => pick(c.dataset.pb, { toOffer: true }));
      c.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        const n = cards[(i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + cards.length) % cards.length];
        pick(n.dataset.pb, { focus: true, reveal: false });
      });
    });
    document.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.pick, { focus: true })));
    /* « Voir l'offre » : on descend sur l'offre du bon produit */
    document.querySelectorAll("[data-see-offer]").forEach((b) => b.addEventListener("click", () => {
      window.OTAGE && OTAGE.setProduct && OTAGE.setProduct(b.dataset.seeOffer);
      glide(offers.getBoundingClientRect().top + window.scrollY - 10);
    }));
    pick("taches", { reveal: false });
    OTAGE.pick = pick;

    /* « Revoir la routine » : la routine du haut de page, où les 4 soins sont présentés (une seule fois) */
    document.querySelectorAll("[data-routine]").forEach((b) => b.addEventListener("click", () => window.OTAGE && OTAGE.goToStep && OTAGE.goToStep(0)));

    // le bouton « Trouver mon soin » du hero mène ici
    document.querySelectorAll('[data-glide-to="#diagnostic"]').forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      glide(sec.getBoundingClientRect().top + window.scrollY - 10);
    }));
  })();

  /* Arrivée depuis une page produit : /?produit=yeux#offres ouvre l'offre du sérum contour des yeux */
  if (new URLSearchParams(location.search).get("produit") === "yeux" && window.OTAGE && OTAGE.pick) {
    OTAGE.pick("yeux", { reveal: false });
  }
}
