/* Menu, quilles du hero, ciel du moment (matin / soir) et effet « goutte » des boutons. */
import { shared } from "./shared";

export default function init(cfg) {
  const { TXT } = shared(cfg);
  (() => {
    const btn = document.querySelector(".burger");
    const sheet = document.getElementById("sheet");
    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? TXT.menuClose : TXT.menuOpen);
      sheet.classList.toggle("open", open);
      if (open) sheet.querySelector("a").focus({ preventScroll: true });
    };
    btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
    sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sheet.classList.contains("open")) { setOpen(false); btn.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (sheet.classList.contains("open") && !e.target.closest(".nav")) setOpen(false);
    });
    const lane = document.querySelector(".lane");
    setTimeout(() => lane.classList.add("ready"), 1400);
    /* Quilles : elles vacillent au toucher, puis le lien s'ouvre */
    document.querySelectorAll(".pin").forEach((pin) => {
      const img = pin.querySelector("img");
      const hit = () => {
        pin.classList.remove("hit");
        void img.offsetWidth;
        pin.classList.add("hit");
      };
      const inHero = () => !document.querySelector(".hero").classList.contains("travel");
      pin.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && inHero()) hit(); });
      pin.addEventListener("pointerdown", () => { if (inHero()) hit(); });
      img.addEventListener("animationend", () => pin.classList.remove("hit"));
    });

    /* ---- Ciel du moment ---- */
    const hero = document.querySelector(".hero");
    const routine = document.querySelector(".routine");
    const buttons = document.querySelectorAll(".switch button");
    const COPY = {
      matin: TXT.phaseMatin,
      soir: TXT.phaseSoir,
    };
    const setPhase = (phase, save) => {
      hero.dataset.phase = phase;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.set === phase)));
      routine.innerHTML = COPY[phase];
      const spf = document.querySelector(".pin.ecran");
      spf.classList.toggle("off", phase === "soir");
      spf.setAttribute("aria-hidden", String(phase === "soir"));
      spf.tabIndex = phase === "soir" ? -1 : 0;
      if (save) { try { localStorage.setItem("otage-moment", phase); } catch (e) {} }
    };
    /* Heure du Maroc, quel que soit le fuseau de la visiteuse */
    const moroccoHour = () => {
      try {
        return Number(new Intl.DateTimeFormat("fr-FR", { hour: "numeric", hourCycle: "h23", timeZone: "Africa/Casablanca" }).format(new Date()));
      } catch (e) { return new Date().getHours(); }
    };
    let saved = null;
    try { saved = localStorage.getItem("otage-moment"); } catch (e) {}
    const h = moroccoHour();
    setPhase(saved === "matin" || saved === "soir" ? saved : (h >= 5 && h < 17 ? "matin" : "soir"), false);
    buttons.forEach((b) => b.addEventListener("click", () => setPhase(b.dataset.set, true)));

    /* Position verticale de la gamme, pour y coucher le soleil */
    const pins = document.querySelector(".pins");
    const placeSun = () => {
      const hr = hero.getBoundingClientRect(), pr = pins.getBoundingClientRect();
      hero.style.setProperty("--pins-y", `${Math.round(pr.top - hr.top + pr.height * 0.62)}px`);
    };
    placeSun();
    if ("ResizeObserver" in window) new ResizeObserver(placeSun).observe(hero);
    else window.addEventListener("resize", placeSun);
  })();

  /* Boutons : la goutte part de l'endroit exact du pointeur ou du doigt */
  document.querySelectorAll(".o-btn").forEach((b) => {
    const at = (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--x", `${e.clientX - r.left}px`);
      b.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    b.addEventListener("pointerenter", at);
    b.addEventListener("pointerleave", at);
    b.addEventListener("pointerdown", (e) => {
      at(e);
      if (e.pointerType !== "mouse") { b.classList.remove("tap"); void b.offsetWidth; b.classList.add("tap"); }
    });
    b.addEventListener("animationend", () => b.classList.remove("tap"));
  });

  /* Liens du menu vers une section de la page : le menu se referme, puis la page glisse jusqu'à la section */
  (() => {
    const closeSheet = () => { const s = document.getElementById("sheet"); if (s && s.classList.contains("open")) document.querySelector(".burger").click(); };
    document.querySelectorAll("[data-nav]").forEach((a) => a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href")); if (!t) return;
      e.preventDefault(); closeSheet();
      if (t.classList.contains("offers")) t.classList.add("seen");
      let y = 0; for (let el = t; el; el = el.offsetParent) y += el.offsetTop;
      history.replaceState(null, "", a.getAttribute("href"));
      setTimeout(() => (window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y - 10) : window.scrollTo({ top: y - 10, behavior: "smooth" })), 150);
    }));
  })();
}
