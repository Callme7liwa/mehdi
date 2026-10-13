import { shared } from "./shared";

export default function init(cfg) {
  const { TXT, RTL, D, fill, startGap } = shared(cfg);
  /* ================= Avis clientes ================= */
  (() => {
    const sec = document.querySelector(".rv");
    if (!sec) return;
    /*
      AVIS À REMPLIR AVEC DE VRAIS MESSAGES DE CLIENTES (avec leur accord).
      - prenom, ville : ce que la cliente accepte d'afficher
      - soin : 0 gel, 1 sérum, 2 crème, 3 écran solaire, ou "gamme"
      - messages : { de: "cliente" | "otage", texte, heure, rtl: true pour l'arabe, photo: "url" facultatif }
      - exemple: true affiche l'étiquette « Exemple ». Supprime ces exemples avant la mise en ligne.
    */
    const AVIS = cfg.reviews;
    const NOMS = TXT.reviewNames;
    const KEYS = ["gel", "serum", "creme", "ecran"];
    const track = sec.querySelector(".rv-track"), dots = sec.querySelector(".rv-dots");
    if (!AVIS.length) { sec.hidden = true; return; }
    sec.querySelector(".rv-demo").hidden = !AVIS.some((a) => a.exemple);
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    if (!track.children.length) track.innerHTML = AVIS.map((a, i) => {
      const ini = (a.prenom || "?").trim().charAt(0).toUpperCase();
      const gamme = a.soin === "gamme";
      const thumb = gamme ? document.querySelector(".pin.gel img").src : document.querySelector(`.pin.${KEYS[a.soin]} img`).src;
      const msgs = a.messages.map((m) => `<div class="rb ${m.de === "otage" ? "o" : "c"}"${m.rtl ? ' dir="rtl" lang="ar"' : ' dir="ltr" lang="fr"'}>${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(fill(TXT.photoBy, { name: a.prenom }))}" loading="lazy">` : ""}${esc(m.texte)}<time dir="ltr" lang="fr">${esc(m.heure || "")}</time></div>`).join("");
      return `<article class="rcard" aria-label="${esc(fill(TXT.reviewOf, { name: a.prenom, city: a.ville }))}">
        <div class="rc-top"><span class="rc-av" aria-hidden="true">${esc(ini)}</span><span class="rc-who"><b dir="ltr" lang="fr">${esc(a.prenom)}</b><span>${esc(a.ville)}</span></span>${a.exemple ? `<span class="rc-demo">${TXT.example}</span>` : ""}</div>
        <div class="rc-log">${msgs}</div>
        <button type="button" class="rc-prod" data-i="${i}"><img src="${thumb}" alt=""><span>${gamme ? TXT.fullRange : NOMS[a.soin]}</span><i aria-hidden="true">+</i></button>
      </article>`;
    }).join("");
    track.querySelectorAll(".rc-prod").forEach((b) => b.addEventListener("click", () => {
      const a = AVIS[Number(b.dataset.i)];
      if (a.soin === "gamme") window.OTAGE && OTAGE.orderNow ? OTAGE.orderNow() : null;
      else window.OTAGE && OTAGE.openQuick && OTAGE.openQuick(a.soin, b);
    }));

    /* points de progression + flèches (souris) */
    const cards = [...track.children];
    dots.innerHTML = cards.map(() => "<i></i>").join("");
    const prev = sec.querySelector(".rv-prev"), next = sec.querySelector(".rv-next");
    const upd = () => {
      const x = Math.abs(track.scrollLeft), max = track.scrollWidth - track.clientWidth - 2; // scrollLeft est négatif en RTL
      let idx = 0, best = 1e9;
      cards.forEach((c, i) => { const d = Math.abs(startGap(track, c)); if (d < best) { best = d; idx = i; } });
      [...dots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
      prev.disabled = x < 4; next.disabled = x > max;
    };
    const step = (dir) => track.scrollBy({ left: D * dir * (cards[0].offsetWidth + 16), behavior: "smooth" });
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    let t = false;
    track.addEventListener("scroll", () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; upd(); }); } }, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  })();
}
