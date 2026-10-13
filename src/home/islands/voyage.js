import { shared } from "./shared";

export default function init(cfg) {
  const { TXT, fill } = shared(cfg);
  /* ================= Voyage : ciel → nuage → routine ================= */
  (() => {
    const journey = document.querySelector(".journey");
    const hero = document.querySelector(".hero");
    const nav = document.querySelector(".nav");
    const canvas = document.querySelector(".sky-gl");
    const ground = document.querySelector(".ground");
    const mist = document.querySelector(".mist");
    const ui = document.querySelector(".routine-ui");
    const head = document.querySelector(".rh-phase");
    const steps = [...document.querySelectorAll(".step")];
    const railBtns = [...document.querySelectorAll(".rail button")];
    const pins = ["gel", "serum", "creme", "ecran"].map((k) => document.querySelector(".pin." + k));
    const lane = document.querySelector(".lane");
    const bigs = [...document.querySelectorAll(".big")];
    const ratio = [255 / 1000, 381 / 1000, 243 / 1000, 245 / 1000];
    let bigBox = [];
    const above = [".proof", ".title", ".arabic"].map((s) => document.querySelector(s));
    const below = [".moment", ".ctas", ".perks"].map((s) => document.querySelector(s));
    const fades = [...document.querySelectorAll(".side, .pins .laurel, .sky, .sun")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.OTAGE = window.OTAGE || { fly: 0 };

    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const seg = (x, a, b) => clamp((x - a) / (b - a));
    const ease = (k) => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const sstep = (k) => k * k * (3 - 2 * k);
    const soft = (k) => 0.5 - 0.5 * Math.cos(Math.PI * k);
    const mix = (a, b, k) => a + (b - a) * k;

    /* Repères du scénario (fraction de la piste) */
    const ROUTINE = false; // false : le voyage s'arrête après le nuage, sur la section des problèmes
    const T = ROUTINE
      ? { outA: 0, outB: 0.1, flyA: 0.04, flyB: 0.3, mistIn: 0.2, mistPeak: 0.3, mistOut: 0.4, moveA: 0.24, moveB: 0.42, uiA: 0.36, uiB: 0.44, stepsA: 0.44 }
      : { outA: 0, outB: 0.2, flyA: 0.06, flyB: 0.8, mistIn: 0.5, mistPeak: 0.8, mistOut: 1.04, moveA: 2, moveB: 3, uiA: 2, uiB: 3, stepsA: 0.99 };

    let base = [], slots = [], W = 0, H = 0, vh = 0, total = 1, jTop = 0, mobile = true, mob = null;

    const measure = () => {
      vh = hero.clientHeight;
      journey.style.setProperty("--vh", vh + "px");
      pins.forEach((p) => (p.style.transform = "none"));
      const hr = hero.getBoundingClientRect();
      W = hr.width; H = hr.height;
      mobile = W < 900;
      base = pins.map((p) => {
        const r = p.getBoundingClientRect();
        return { cx: r.left - hr.left + r.width / 2, bottom: r.bottom - hr.top, h: r.height };
      });
      hero.style.setProperty("--nav-h", Math.round(nav.getBoundingClientRect().bottom - hr.top) + "px");
      total = journey.offsetHeight - vh;
      jTop = journey.getBoundingClientRect().top + window.scrollY;
      slots = railBtns.map((b, i) => {
        const r = b.getBoundingClientRect();
        const sh = mobile ? Math.min(H * 0.085, 70) : Math.min(H * 0.1, 92);
        return { cx: r.left - hr.left + r.width / 2, bottom: r.top - hr.top - 6, h: sh * (i === 1 ? 0.7 : 1) };
      });
      placeSnaps();
      /* Mobile : on range tout du bas vers le haut pour que rien ne se chevauche
         (rail → texte de l'étape → flacon), quelle que soit la hauteur de l'écran */
      mob = null;
      if (mobile) {
        const ui = document.querySelector(".routine-ui");
        const head = ui.querySelector(".routine-head");
        ui.classList.remove("tight", "tighter");
        const headBottom = head.offsetTop + head.offsetHeight;
        const thumbTop = Math.min(...slots.map((s) => s.bottom - s.h));
        const fit = () => {
          const stepH = Math.max(...steps.map((s) => s.offsetHeight));
          const stepTop = thumbTop - 20 - stepH;
          return { stepTop, avail: stepTop - 16 - (headBottom + 12) };
        };
        let f = fit();
        if (f.avail < H * 0.2) { ui.classList.add("tight"); f = fit(); }
        if (f.avail < H * 0.15) { ui.classList.add("tighter"); f = fit(); }
        ui.style.setProperty("--step-top", Math.round(f.stepTop) + "px");
        mob = { bottom: f.stepTop - 16, h: Math.max(64, Math.min(H * 0.27, f.avail)) };
      }
      /* boîte fixe de chaque grand flacon (on n'anime ensuite que transform) */
      bigBox = bigs.map((el, i) => {
        const t = bigTarget(i), w = t.h * ratio[i];
        el.style.height = t.h + "px";
        el.style.width = w + "px";
        el.style.left = (t.cx - w / 2) + "px";
        el.style.top = (t.bottom - t.h) + "px";
        return t;
      });
      cur = target = readTarget();
      update(cur);
    };

    /* Cibles : produit actif en grand, les autres posés au-dessus du rail */
    const slotTarget = (i) => slots[i];
    const bigTarget = (i) => {
      const k = i === 1 ? 0.72 : 1; // le sérum est plus petit en vrai
      if (mobile) return mob ? { cx: W / 2, bottom: mob.bottom, h: mob.h * k } : { cx: W / 2, bottom: H * 0.43, h: H * 0.25 * k };
      const C = Math.min(W * 0.86, 1080);
      return { cx: W / 2 - C * 0.24, bottom: H * 0.755, h: H * 0.52 * k };
    };
    const lerpT = (a, b, k) => ({ cx: mix(a.cx, b.cx, k), bottom: mix(a.bottom, b.bottom, k), h: mix(a.h, b.h, k) });

    const place = (i, t) => {
      const b = base[i];
      const s = t.h / b.h;
      pins[i].style.transform = `translate3d(${(t.cx - b.cx).toFixed(1)}px, ${(t.bottom - b.bottom + (t.lift || 0)).toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
    };

    /* Points d'arrêt doux : on se pose naturellement sur le hero et sur chaque étape */
    const STEP_HOLD = 0.27; // centre de la zone de repos de chaque étape
    const snapAt = [0, ...[0, 1, 2, 3].map((i) => T.stepsA + (1 - T.stepsA) * ((i + STEP_HOLD) / 4))];
    const snaps = snapAt.map(() => {
      const m = document.createElement("i");
      m.className = "snap";
      m.setAttribute("aria-hidden", "true");
      journey.appendChild(m);
      return m;
    });
    function placeSnaps() { snaps.forEach((m, i) => (m.style.top = Math.round(snapAt[i] * total) + "px")); }

    let lastActive = -1;
    const hinted = [false, false, false, false];
    let wasTravel = null;
    const update = (p) => {
      /* 1. le contenu du hero s'en va */
      const out = ease(seg(p, T.outA, T.outB));
      above.forEach((el) => { el.style.transform = `translate3d(0, ${(-out * 40).toFixed(1)}px, 0)`; el.style.opacity = (1 - out).toFixed(3); });
      below.forEach((el) => { el.style.transform = `translate3d(0, ${(out * 40).toFixed(1)}px, 0)`; el.style.opacity = (1 - out).toFixed(3); });
      hero.classList.toggle("travel", p > 0.02);
      const tr = p > 0.02;
      if (tr !== wasTravel) {
        wasTravel = tr;
        pins.forEach((pin, i) => pin.setAttribute("aria-label", tr ? fill(TXT.goToStep, { n: i + 1 }) : pin.querySelector("img").alt));
      }
      content.style.pointerEvents = p > 0.05 ? "none" : "";

      /* 2. traversée du nuage */
      const fly = reduce ? 0 : ease(seg(p, T.flyA, T.flyB));
      OTAGE.flyMoving = Math.abs(fly - OTAGE.fly) > 0.0005;
      OTAGE.fly = fly;
      const mIn = sstep(seg(p, T.mistIn, T.mistPeak)), mOut = sstep(seg(p, T.mistPeak + 0.02, T.mistOut));
      mist.style.opacity = (mIn * (1 - mOut)).toFixed(3);
      const gone = seg(p, T.mistPeak - 0.02, T.mistPeak + 0.02);
      ground.style.opacity = gone.toFixed(3);
      canvas.style.opacity = hero.classList.contains("gl") ? (1 - gone).toFixed(3) : "";
      const f = (1 - Math.max(gone, out * 0.6)).toFixed(3);
      fades.forEach((el) => (el.style.opacity = f));
      OTAGE.skyHidden = gone >= 1;

      if (!ROUTINE) {
        // les flacons s'élèvent et se fondent dans le nuage
        const fade = sstep(seg(p, T.mistIn - 0.12, T.mistPeak));
        pins.forEach((pin) => {
          pin.style.transform = `translate3d(0, ${(-fade * 40).toFixed(1)}px, 0) scale(${(1 - 0.08 * fade).toFixed(4)})`;
          pin.style.opacity = (1 - fade).toFixed(3);
        });
        return;
      }

      /* 3. étapes */
      const sp = seg(p, T.stepsA, 1) * 4;
      const k = Math.min(Math.floor(sp), 3);
      const blend = k < 3 ? seg(sp - k, 0.35, 1) : 0;       // la transition occupe les deux tiers de chaque étape
      const grow = seg(p, 0.36, 0.46);
      const active = blend > 0.5 ? k + 1 : k;
      const bigVis = [0, 0, 0, 0];
      const uiReady = seg(p, T.uiA, T.uiB) > 0.9;

      bigs.forEach((el, i) => {
        const t = bigBox[i], slot = slotTarget(i);
        let o = 0, ty = 0, s = 1, tx = 0;
        if (i === k) {
          if (k === 0 && grow < 1) { o = soft(grow); ty = 24 * (1 - soft(grow)); s = 0.97 + 0.03 * soft(grow); }
          else o = 1;
          if (blend > 0) {
            const b1 = soft(seg(blend, 0, 0.5));          // le flacon actuel s'efface d'abord
            o *= 1 - b1; ty -= 14 * b1; s *= 1 - 0.02 * b1;
          }
        } else if (i === k + 1 && blend > 0) {
          const b2 = soft(seg(blend, 0.5, 1));            // puis le suivant apparaît
          o = b2; ty = 14 * (1 - b2); s = 0.98 + 0.02 * b2;
        }
        bigVis[i] = o;
        const vis = o > 0.6 && uiReady;
        if (vis !== el.classList.contains("vis")) {
          el.classList.toggle("vis", vis);
          el.tabIndex = vis ? 0 : -1;
          if (vis && !hinted[i]) { hinted[i] = true; el.classList.add("hint"); }
        }
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o > 0.001 ? "visible" : "hidden";
        el.style.transform = `translate3d(${tx}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
      });

      /* les flacons du hero rejoignent le rail en arc, l'un après l'autre */
      pins.forEach((pin, i) => {
        const mv = soft(seg(p, T.moveA, T.moveB));
        const t = lerpT(base[i], slotTarget(i), mv);
        place(i, t);
        pin.style.opacity = (1 - 0.65 * bigVis[i]).toFixed(3);
      });

      /* 4. textes des étapes */
      const uiOn = sstep(seg(p, T.uiA, T.uiB));
      ui.style.opacity = uiOn.toFixed(3);
      ui.classList.toggle("live", uiOn > 0.5);
      const outT = soft(seg(blend, 0, 0.5)), inT = soft(seg(blend, 0.5, 1));
      steps.forEach((s, i) => {
        let o = 0, dy = 0;
        if (i === k) { o = 1 - outT; dy = -10 * outT; }
        if (i === k + 1) { o = inT; dy = 10 * (1 - inT); }
        s.style.opacity = o.toFixed(3);
        s.style.setProperty("--ty", dy.toFixed(1) + "px");
        s.classList.toggle("on", o > 0.02 && uiOn > 0.02);
        s.setAttribute("aria-hidden", String(!(o > 0.5 && uiOn > 0.5)));
      });
      if (active !== lastActive) {
        railBtns.forEach((b, i) => (i === active ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
        lastActive = active;
      }
    };

    /* Défilement lissé : la scène rattrape le scroll avec une inertie douce,
       indépendante de la fréquence d'écran (60, 90 ou 120 Hz) */
    const content = document.querySelector(".content");
    let target = 0, cur = 0, raf = 0, lastT = 0;
    const readTarget = () => clamp((window.scrollY - jTop) / total);
    const frame = (now) => {
      const dt = Math.min(0.05, (now - (lastT || now)) / 1000);
      lastT = now;
      target = readTarget();
      if (reduce) cur = target;
      else cur += (target - cur) * (1 - Math.exp(-dt / 0.22));
      if (Math.abs(target - cur) < 0.00005) cur = target;
      update(cur);
      if (cur !== target) raf = requestAnimationFrame(frame);
      else { raf = 0; lastT = 0; OTAGE.flyMoving = false; }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener("scroll", kick, { passive: true });

    /* Défilement automatique doux vers une étape (même courbe que le reste) */
    let auto = 0;
    const glideTo = (y) => {
      cancelAnimationFrame(auto);
      if (reduce) { window.scrollTo(0, y); return; }
      const y0 = window.scrollY, dy = y - y0;
      const dur = Math.min(1600, Math.max(800, Math.abs(dy) * 0.45));
      const t0 = performance.now();
      const stepF = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, y0 + dy * soft(k));
        if (k < 1) auto = requestAnimationFrame(stepF);
      };
      auto = requestAnimationFrame(stepF);
    };
    // l'utilisateur reprend la main dès qu'il touche ou fait défiler
    ["wheel", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, () => cancelAnimationFrame(auto), { passive: true }));
    const goToStep = (i) => glideTo(jTop + snapAt[i + 1] * total);
    OTAGE.goToStep = (i) => (OTAGE.showRoutine ? OTAGE.showRoutine(i) : goToStep(i));
    OTAGE.glideTo = glideTo;
    railBtns.forEach((b) => b.addEventListener("click", () => goToStep(Number(b.dataset.go))));

    /* Flacons du rail : cliquer amène à l'étape ; dans le hero, ouvre le détail */
    pins.forEach((pin, i) => pin.addEventListener("click", (e) => {
      e.preventDefault();
      if (hero.classList.contains("travel")) goToStep(i);
      else OTAGE.openQuick && OTAGE.openQuick(i, pin);
    }));
    /* Flacon vedette : ouvre le détail */
    bigs.forEach((b, i) => b.addEventListener("click", () => OTAGE.openQuick && OTAGE.openQuick(i, b)));

    /* Titre de la routine selon le moment choisi */
    const syncHead = () => (head.textContent = hero.dataset.phase === "soir" ? TXT.routineSoir : TXT.routineMatin);
    new MutationObserver(syncHead).observe(hero, { attributes: true, attributeFilter: ["data-phase"] });
    syncHead();

    /* Mesures : après le chargement des images et à chaque changement de taille */
    let rt;
    /* après l'apparition du ciel, c'est le scroll seul qui pilote son opacité */
    setTimeout(() => (canvas.style.transition = "none"), 900);
    const remeasure = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
    window.addEventListener("resize", remeasure);
    window.addEventListener("orientationchange", remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("load", measure);
    measure();
  })();
}
