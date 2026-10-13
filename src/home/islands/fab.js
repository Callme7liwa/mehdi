export default function init() {
  /* ================= Pour les clientes pressées ================= */
  (() => {
    const fab = document.querySelector(".fab");
    const offers = document.querySelector(".offers");
    const journey = document.querySelector(".journey");
    const hero = document.querySelector(".hero");
    const form = document.querySelector(".cur-form");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.OTAGE = window.OTAGE || {};

    /* les 4 flacons dans la barre */
    fab.querySelector(".fab-pics").innerHTML = ["gel", "serum", "creme", "ecran"].map((k) => `<img src="${document.querySelector(`.pin.${k} img`).src}" alt="">`).join("");

    /* Commander en un geste, depuis n'importe où : on arrive sur le ticket, formulaire ouvert */
    const orderNow = (prodWanted) => {
      if (typeof prodWanted === "string" && OTAGE.setProduct) OTAGE.setProduct(prodWanted);
      const qv = document.querySelector(".qv");
      if (qv && qv.open) qv.querySelector(".qv-close").click();
      offers.classList.add("seen");
      setTimeout(() => OTAGE.detachTicket && OTAGE.detachTicket(), qv && qv.open ? 420 : 0);
    };
    OTAGE.orderNow = orderNow;
    document.querySelectorAll("[data-order]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); e.stopImmediatePropagation(); orderNow("taches"); }, true));

    /* la barre apparaît dès qu'on quitte le hero, disparaît sur la section des offres */
    let offersVisible = false, askVisible = false, footVisible = false, dgVisible = false, done = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { offersVisible = en.isIntersecting; sync(); }, { threshold: 0.12 }).observe(offers);
      const ask = document.querySelector(".chat-zone");
      if (ask) new IntersectionObserver(([en]) => { askVisible = en.isIntersecting; sync(); }).observe(ask);
      const dgSec = document.querySelector(".dg"), dgx = document.querySelector(".dgx");
      let a1 = false, a2 = false;
      if (dgSec) new IntersectionObserver(([en]) => { a1 = en.isIntersecting; dgVisible = a1 || a2; sync(); }, { threshold: 0.15 }).observe(dgSec);
      if (dgx) new IntersectionObserver(([en]) => { a2 = en.isIntersecting; dgVisible = a1 || a2; sync(); }, { threshold: 0.1 }).observe(dgx);
      const footCta = document.querySelector(".foot");
      if (footCta) new IntersectionObserver(([en]) => { footVisible = en.isIntersecting; sync(); }, { threshold: 0.05 }).observe(footCta);
    }
    const sync = () => {
      // après la routine (pendant la routine, chaque étape a déjà son bouton)
      const past = window.scrollY > journey.offsetTop + journey.offsetHeight - window.innerHeight * 0.5;
      const qvOpen = !!document.querySelector("dialog[open]");
      done = offers.classList.contains("done");
      const show = past && !offersVisible && !askVisible && !footVisible && !dgVisible && !qvOpen && !done;
      fab.classList.toggle("show", show);
      fab.setAttribute("aria-hidden", String(!show));
      fab.querySelector(".fab-go").tabIndex = show ? 0 : -1;
    };
    let tick = false;
    window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; sync(); }); } }, { passive: true });
    new MutationObserver(sync).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    sync();

    /* ---- formulaire plus rapide ---- */
    if (!form) return;
    const tel = form.elements.tel, ville = form.elements.ville;
    // téléphone mis en forme pendant la saisie : 06 12 34 56 78
    tel.addEventListener("input", () => {
      const d = tel.value.replace(/[^\d+]/g, "");
      if (d.startsWith("+") || d.startsWith("00")) return;
      const x = d.slice(0, 10);
      tel.value = x.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    });
    // villes en un toucher
    const chips = [...form.querySelectorAll(".city-chips button")];
    const markCity = () => chips.forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === ville.value.trim())));
    chips.forEach((c) => c.addEventListener("click", () => {
      ville.value = c.textContent; ville.removeAttribute("aria-invalid"); markCity();
      (form.elements.adresse.value ? form.querySelector(".tk-send") : form.elements.adresse).focus({ preventScroll: true });
    }));
    ville.addEventListener("input", markCity);
    // on se souvient des infos pour la prochaine commande (sur cet appareil uniquement)
    const KEY = "otage-client";
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s) ["nom", "tel", "ville", "adresse"].forEach((n) => { if (s[n]) form.elements[n].value = s[n]; });
      markCity();
    } catch (e) {}
    form.addEventListener("submit", () => {
      setTimeout(() => {
        if (!offers.classList.contains("done")) return;
        try { localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(["nom", "tel", "ville", "adresse"].map((n) => [n, form.elements[n].value.trim()])))); } catch (e) {}
        sync();
      }, 0);
    });
  })();
}
