import { shared } from "./shared";

export default function init(cfg) {
  const { TXT, fill } = shared(cfg);
  /* ================= Fenêtre « Voir le soin » ================= */
  (() => {
    const dlg = document.querySelector(".qv");
    if (!dlg || !dlg.showModal) return;
    const hero = document.querySelector(".hero");
    const bigImgs = [...document.querySelectorAll(".big img")];
    const P = cfg.quick;
    const $ = (s) => dlg.querySelector(s);
    let current = 0, opener = null;

    const fill = (i) => {
      const d = P[i];
      current = i;
      $(".qv-media img").src = bigImgs[i].src;
      $(".qv-media img").alt = d.name;
      $(".qv-num span").textContent = d.num;
      $(".qv-title").textContent = d.name;
      $(".qv-size").textContent = d.size;
      $(".qv-lead").textContent = d.lead;
      $(".qv-chips").innerHTML = d.chips.map((c) => `<li>${c}</li>`).join("");
      $(".qv-how").innerHTML = `<b>${TXT.how}</b> ${d.how}`;
      $(".qv-when").innerHTML = d.when;
      $(".qv-buy .o-lbl").textContent = TXT.orderRange;
      $(".qv-more").href = d.url;
    };
    const open = (i, from) => {
      opener = from || null;
      fill(i);
      document.documentElement.classList.add("qv-lock");
      dlg.showModal();
      requestAnimationFrame(() => requestAnimationFrame(() => dlg.classList.add("in")));
    };
    const close = () => {
      if (!dlg.open) return;
      dlg.classList.remove("in");
      const done = () => {
        dlg.close();
        document.documentElement.classList.remove("qv-lock");
        if (opener) opener.focus({ preventScroll: true });
      };
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? done() : setTimeout(done, 380);
    };
    window.OTAGE = window.OTAGE || {};
    OTAGE.openQuick = open;

    $(".qv-close").addEventListener("click", close);
    dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    // clic hors de la carte
    dlg.addEventListener("click", (e) => { if (!e.target.closest(".qv-card")) close(); });
    $(".qv-step").addEventListener("click", () => { const i = current; close(); setTimeout(() => OTAGE.goToStep && OTAGE.goToStep(i), 400); });

    /* Mobile : glisser la fiche vers le bas pour la fermer */
    const card = $(".qv-card");
    let y0 = null, dy = 0;
    card.addEventListener("touchstart", (e) => { if (card.scrollTop <= 0) { y0 = e.touches[0].clientY; dy = 0; card.style.transition = "none"; } }, { passive: true });
    card.addEventListener("touchmove", (e) => {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      if (window.innerWidth < 900) card.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    card.addEventListener("touchend", () => {
      if (y0 === null) return;
      card.style.transition = ""; card.style.transform = "";
      if (dy > 90 && window.innerWidth < 900) close();
      y0 = null;
    });
  })();
}
