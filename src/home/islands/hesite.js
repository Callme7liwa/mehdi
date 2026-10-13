export default function init() {
  /* ================= « Tu hésites ? » ================= */
  (() => {
    const dlg = document.querySelector(".hz");
    if (!dlg || !dlg.showModal) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tabs = [...dlg.querySelectorAll(".hz-tab")], panels = { avis: dlg.querySelector("#hz-avis"), res: dlg.querySelector("#hz-res"), ceo: dlg.querySelector("#hz-ceo") };
    dlg.querySelector(".ceo-av img").src = document.querySelector(".logo img").src;
    // même numéro WhatsApp que la FAQ (constante WHATSAPP de la section des questions)
    const faqWa = document.querySelector(".faq .wa");
    if (faqWa && !faqWa.hidden) { const w = dlg.querySelector(".ceo-wa"); w.href = faqWa.href; w.hidden = false; dlg.querySelector(".ceo-faq").hidden = true; }

    let opener = null;
    const show = (tab) => {
      tabs.forEach((t) => { const on = t.dataset.tab === tab; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      Object.entries(panels).forEach(([k, p]) => (p.hidden = k !== tab));
      if (tab === "avis") window.dispatchEvent(new Event("resize")); // recalcule le carrousel des avis
      if (tab === "res") {
        const fg = dlg.querySelector(".rg-fg"), num = dlg.querySelector("[data-pct-count]"), target = 85;
        fg.style.strokeDashoffset = 327;
        requestAnimationFrame(() => requestAnimationFrame(() => (fg.style.strokeDashoffset = 327 * (1 - target / 100))));
        if (reduce) num.textContent = target;
        else { const t0 = performance.now(); const f = (now) => { const k = Math.min(1, (now - t0) / 1400); num.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }
      }
    };
    const open = (tab, from) => {
      opener = from || null;
      document.documentElement.classList.add("qv-lock");
      dlg.showModal();
      show(tab || "avis");
      requestAnimationFrame(() => requestAnimationFrame(() => dlg.classList.add("in")));
    };
    const close = (then) => {
      if (!dlg.open) return;
      dlg.classList.remove("in");
      setTimeout(() => { dlg.close(); document.documentElement.classList.remove("qv-lock"); if (opener && !then) opener.focus({ preventScroll: true }); then && then(); }, reduce ? 0 : 380);
    };
    window.OTAGE = window.OTAGE || {};
    OTAGE.openHesite = open;

    document.querySelectorAll(".hz-open").forEach((b) => b.addEventListener("click", () => open(b.dataset.hz, b)));
    document.querySelectorAll("[data-hz-link]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); open("avis", a); }));
    /* badge « 85 % » du hero : ouvre l'onglet des résultats (le chiffre et sa source) */
    document.querySelectorAll("[data-hz-res]").forEach((b) => b.addEventListener("click", () => open("res", b)));
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => show(t.dataset.tab));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        show(n.dataset.tab); n.focus();
      });
    });
    dlg.querySelector(".hz-close").addEventListener("click", () => close());
    dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    dlg.addEventListener("click", (e) => { if (!e.target.closest(".hz-card")) close(); });
    dlg.querySelector(".hz-go").addEventListener("click", () => close(() => OTAGE.detachTicket && OTAGE.detachTicket()));
    dlg.querySelector(".ceo-faq").addEventListener("click", () => close(() => {
      const q = document.querySelector(".faq");
      OTAGE.glideTo ? OTAGE.glideTo(q.getBoundingClientRect().top + window.scrollY - 10) : q.scrollIntoView();
    }));
    // glisser la fiche vers le bas pour la fermer (mobile)
    const card = dlg.querySelector(".hz-card");
    let y0 = null, dy = 0;
    card.addEventListener("touchstart", (e) => { if (card.scrollTop <= 0 && !e.target.closest(".rv-track")) { y0 = e.touches[0].clientY; dy = 0; card.style.transition = "none"; } }, { passive: true });
    card.addEventListener("touchmove", (e) => { if (y0 === null) return; dy = Math.max(0, e.touches[0].clientY - y0); if (window.innerWidth < 900) card.style.transform = `translateY(${dy}px)`; }, { passive: true });
    card.addEventListener("touchend", () => { if (y0 === null) return; card.style.transition = ""; card.style.transform = ""; if (dy > 90 && window.innerWidth < 900) close(); y0 = null; });
  })();
}
