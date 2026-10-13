import { shared } from "./shared";

export default function init(cfg) {
  const { RTL, D } = shared(cfg);
  /* ================= La campagne : le mur défile avec le scroll ================= */
  (() => {
    const sec = document.querySelector(".camp");
    if (!sec) return;
    const track = sec.querySelector(".camp-track");
    const posters = [...track.querySelectorAll(".poster")];
    const video = track.querySelector("video");
    const cc = sec.querySelector("[data-cc]"), bar = sec.querySelector(".camp-bar i");
    sec.querySelector("[data-ct]").textContent = String(posters.length).padStart(2, "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ouvrir le soin, ou aller aux offres */
    let dragged = false;
    posters.forEach((p) => p.addEventListener("click", (e) => {
      if (dragged) { e.preventDefault(); e.stopImmediatePropagation(); return; }
      if (p.dataset.open != null) OTAGE.openQuick && OTAGE.openQuick(Number(p.dataset.open), p);
      else if (p.hasAttribute("data-offres")) {
        const o = document.querySelector(".offers");
        OTAGE.glideTo(o.getBoundingClientRect().top + window.scrollY - 10);
      }
    }, true));

    /* l'affiche vidéo ne joue que lorsqu'elle est à l'écran */
    /* l'image d'attente de la vidéo n'est chargée qu'à l'approche du mur d'affiches */
    if (video && video.dataset.poster) {
      const setPoster = () => { video.poster = video.dataset.poster; };
      if ("IntersectionObserver" in window) { const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setPoster(); io.disconnect(); } }, { rootMargin: "150% 0px" }); io.observe(sec); } else setPoster();
    }
    if (video) video.muted = true; // React ne pose pas l'attribut muted : sans lui, la lecture automatique est bloquée
    if (video && "IntersectionObserver" in window && !reduce) {
      new IntersectionObserver(([en]) => { en.isIntersecting ? video.play().catch(() => {}) : video.pause(); }, { threshold: 0.4 }).observe(video);
    }
    if (reduce) return;

    let W = 0, H = 0, span = 1, top = 0, total = 1, centers = [];
    const measure = () => {
      track.style.transform = "none";
      W = window.innerWidth; H = sec.querySelector(".camp-pin").clientHeight;
      span = Math.max(0, track.scrollWidth - W);
      sec.style.height = (H + span * 1.15) + "px";       // 1 px de scroll vertical ≈ 0,87 px de déplacement
      top = sec.getBoundingClientRect().top + window.scrollY;
      total = Math.max(1, sec.offsetHeight - H);
      centers = posters.map((p) => { if (!RTL) return p.offsetLeft + p.offsetWidth / 2; const r = p.getBoundingClientRect(); return r.left + r.width / 2; });
      cur = target = read();
      apply(cur);
    };
    const read = () => Math.min(1, Math.max(0, (window.scrollY - top) / total));

    let last = -1;
    const apply = (k) => {
      const x = -span * k * D;                            // en RTL, le mur part de la droite et avance vers la droite
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      bar.style.setProperty("--cp", k.toFixed(4));
      let best = 0, bd = 1e9;
      posters.forEach((p, i) => {
        const cs = centers[i] + x;                        // centre de l'affiche à l'écran
        const c = RTL ? W - cs : cs;                      // en RTL on raisonne en miroir : les affiches arrivent par la gauche
        const d = (c - W / 2) / W;                        // -0.5 … 0.5 quand elle est visible
        // collée en arrivant par la droite : elle se déroule et se pose
        const enter = Math.min(1, Math.max(0, (W * 1.05 - c) / (W * 0.45)));
        const e = 1 - Math.pow(1 - enter, 3);
        p.style.setProperty("--op", (0.35 + 0.65 * e).toFixed(3));
        p.style.setProperty("--sc", (0.94 + 0.06 * e).toFixed(4));
        p.style.setProperty("--lift", ((1 - e) * 26).toFixed(1) + "px");
        // profondeur : l'image glisse un peu dans son cadre
        p.style.setProperty("--px", (-d * 26 * D).toFixed(1) + "px");
        if (Math.abs(c - W / 2) < bd) { bd = Math.abs(c - W / 2); best = i; }
      });
      if (best !== last) { last = best; cc.textContent = String(best + 1).padStart(2, "0"); }
      sec.classList.toggle("moved", k > 0.02);
    };

    /* même inertie douce que le reste du site */
    let target = 0, cur = 0, raf = 0, lt = 0;
    const frame = (now) => {
      const dt = Math.min(0.05, (now - (lt || now)) / 1000); lt = now;
      target = read();
      cur += (target - cur) * (1 - Math.exp(-dt / 0.2));
      if (Math.abs(target - cur) < 0.00005) cur = target;
      apply(cur);
      if (cur !== target) raf = requestAnimationFrame(frame); else { raf = 0; lt = 0; }
    };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });

    /* glisser le mur à la main (souris ou doigt à l'horizontale) */
    let sx = null, sy = 0, sScroll = 0, horiz = null;
    track.addEventListener("pointerdown", (e) => { sx = e.clientX; sy = e.clientY; sScroll = window.scrollY; horiz = null; dragged = false; });
    window.addEventListener("pointermove", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (horiz === null && Math.hypot(dx, dy) > 8) horiz = Math.abs(dx) > Math.abs(dy) || e.pointerType === "mouse";
      if (!horiz) return;
      dragged = Math.abs(dx) > 6;
      window.scrollTo(0, sScroll - (dx * D / 0.87) * (e.pointerType === "mouse" ? 1 : 1.1));
    }, { passive: true });
    const up = () => { sx = null; setTimeout(() => (dragged = false), 0); };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    track.addEventListener("dragstart", (e) => e.preventDefault());

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(measure, 150); });
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  })();
}
