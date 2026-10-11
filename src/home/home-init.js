/* Animations et interactions de la page d'accueil OTAGE.
   Code repris tel quel du site d'origine (public/js/otage.js) pour garder un rendu identique :
   il pilote directement le HTML rendu par les composants de src/home/sections/.
   Seules les données (prix, contenances, avis, WhatsApp…) viennent maintenant de `cfg`,
   construit dans HomePage.tsx à partir de src/data/. */
export function initHome(cfg) {
  /* TXT : textes de l'interface dans la langue de la page (src/home/text-js.ts).
     RTL : page en arabe, lecture de droite à gauche. D vaut -1 en RTL : il inverse les déplacements horizontaux. */
  const TXT = cfg.t;
  const RTL = cfg.rtl;
  const D = RTL ? -1 : 1;
  const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  /* distance entre le début de la piste (gauche en LTR, droite en RTL) et le début d'un élément */
  const startGap = (track, item) => {
    const cs = getComputedStyle(track), tr = track.getBoundingClientRect(), ir = item.getBoundingClientRect();
    return RTL ? (tr.right - parseFloat(cs.paddingRight)) - ir.right : ir.left - (tr.left + parseFloat(cs.paddingLeft));
  };
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

  /* ================= Ciel réaliste (WebGL) =================
     Dégradé atmosphérique, soleil avec halo, et nuages volumétriques
     (bruit fractal + éclairage dirigé vers le soleil). Rendu en demi-résolution,
     ~30 i/s, en pause quand le hero n'est pas visible. Sans WebGL : le ciel CSS reste. */
  (() => {
    const hero = document.querySelector(".hero");
    const canvas = document.querySelector(".sky-gl");
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;
    const fs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec2 uRes; uniform float uTime;
    uniform vec3 uZen, uMid, uHor, uSun, uLit, uShade;
    uniform vec2 uSunPos; uniform float uSunR, uGlow, uCover, uFly;

    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      for (int i = 0; i < 6; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
      return v;
    }
    // densité de nuage : bruit déformé (domain warping) pour des formes de cumulus
    float field(vec2 p, float t){
      vec2 q = vec2(fbm(p + vec2(0.0, t * 0.3)), fbm(p + vec2(5.2, 1.3) - t * 0.2));
      return fbm(p + 1.4 * q + vec2(t, 0.0));
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      float asp = uRes.x / uRes.y;
      vec2 p = vec2(uv.x * asp, uv.y);
      // traversée : la caméra avance vers le centre des nuages
      vec2 fc = vec2(0.5 * asp, 0.6);
      p = fc + (p - fc) * (1.0 - 0.82 * uFly);

      // ciel : horizon → milieu → zénith
      float y = uv.y;
      vec3 sky = mix(uHor, uMid, smoothstep(0.0, 0.55, y));
      sky = mix(sky, uZen, smoothstep(0.5, 1.05, y));

      // soleil + diffusion
      vec2 sp = vec2(uSunPos.x * asp, uSunPos.y);
      float d = length(p - sp);
      sky += uSun * (exp(-d * 2.2) * 0.42 + exp(-d * 8.0) * 0.55 + exp(-d * 28.0) * 0.6) * uGlow;
      // disque aux bords diffus, plus brillant au centre (comme à travers la brume)
      float disk = 1.0 - smoothstep(uSunR * 0.55, uSunR * 1.25, d);
      vec3 core = mix(uSun, vec3(1.0, 0.99, 0.95), 0.85);
      sky = mix(sky, core, disk * 0.92);

      float t = uTime * 0.012 + uFly * 1.6;
      vec3 col = sky;

      // deux couches : lointaine (petite, lente) puis proche (grande, plus rapide)
      for (int L = 0; L < 2; L++){
        float fl = float(L);
        float sc = mix(2.6, 1.35, fl);
        vec2 cp = vec2(p.x * sc, p.y * sc * 1.9) + vec2(fl * 17.0, fl * 3.0);
        float tt = t * mix(0.6, 1.0, fl);
        float f = field(cp, tt);
        float cover = uCover + mix(0.04, 0.0, fl) - uFly * 0.32;
        float dens = smoothstep(cover, cover + 0.22, f);
        // moins de nuages tout en bas (zone des boutons) et sur le disque solaire
        dens *= mix(smoothstep(0.12, 0.42, y), 1.0, uFly) * mix(0.75, 1.0, fl);
        if (dens < 0.003) continue;
        // éclairage : côté tourné vers le soleil plus clair, base plus sombre
        vec2 toSun = normalize(sp - p) * 0.06;
        float f2 = field(cp + vec2(toSun.x * sc, toSun.y * sc * 1.9), tt);
        float lit = clamp(0.55 + (f - f2) * 3.2, 0.0, 1.0);
        float thick = smoothstep(cover, cover + 0.45, f);
        vec3 cc = mix(uShade, uLit, lit * (1.0 - 0.45 * thick));
        // liseré lumineux près du soleil
        cc += uSun * exp(-d * 3.5) * (1.0 - thick) * 0.9 * uGlow;
        // perspective atmosphérique : la couche lointaine se fond dans le ciel
        cc = mix(cc, sky, mix(0.35, 0.08, fl));
        col = mix(col, cc, dens * mix(0.8, 0.95, fl));
      }

      // au cœur du nuage : tout devient blanc laiteux
      col = mix(col, mix(uLit, vec3(1.0, 0.985, 0.97), 0.6), smoothstep(0.55, 1.0, uFly) * 0.85);

      // grain très léger pour éviter les bandes de dégradé
      col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0 * 2.0;
      gl_FragColor = vec4(col, 1.0);
    }`;

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : (console.warn(gl.getShaderInfoLog(s)), null); };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return;
    const prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ["uRes","uTime","uZen","uMid","uHor","uSun","uLit","uShade","uSunPos","uSunR","uGlow","uCover","uFly"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

    const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
    const PAL = {
      matin: { zen: hex("#6f9ccc"), mid: hex("#b4cde6"), hor: hex("#f4e2d4"), sun: hex("#fff1d2"),
               lit: hex("#ffffff"), shade: hex("#aab7cb"), sunR: 0.035, glow: 0.7, cover: 0.5 },
      soir:  { zen: hex("#6d6593"), mid: hex("#e2958a"), hor: hex("#ffc786"), sun: hex("#ffb25a"),
               lit: hex("#ffd6a8"), shade: hex("#8f5d78"), sunR: 0.055, glow: 1.15, cover: 0.52 },
    };
    const keys = ["zen", "mid", "hor", "sun", "lit", "shade", "sunR", "glow", "cover"];
    const clone = (o) => JSON.parse(JSON.stringify(o));
    let cur = clone(PAL[hero.dataset.phase] || PAL.matin), from = clone(cur), target = cur, tStart = 0, phase = hero.dataset.phase;
    let sunCur = null, sunFrom = null;
    const lerp = (a, b, k) => Array.isArray(a) ? a.map((x, i) => x + (b[i] - x) * k) : a + (b - a) * k;
    const ease = (k) => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

    const sunTarget = () => {
      if (hero.dataset.phase === "soir") {
        const py = parseFloat(hero.style.getPropertyValue("--pins-y")) || hero.clientHeight * 0.62;
        return [0.5, 1 - py / hero.clientHeight];
      }
      return [0.8, 0.86];
    };

    let W = 0, H = 0;
    const resize = () => {
      const r = hero.getBoundingClientRect();
      const scale = Math.min(0.55 * (window.devicePixelRatio || 1), 1) ;
      W = Math.max(2, Math.round(Math.min(r.width * scale, 960)));
      H = Math.max(2, Math.round(r.height * (W / r.width)));
      canvas.width = W; canvas.height = H;
      gl.viewport(0, 0, W, H);
      if (!sunCur) sunCur = sunTarget();
      render(performance.now());
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const render = (now) => {
      if (hero.dataset.phase !== phase) {
        phase = hero.dataset.phase; from = clone(cur); target = PAL[phase]; tStart = now; sunFrom = sunCur.slice();
      }
      const k = tStart ? Math.min((now - tStart) / 1600, 1) : 1;
      const e = ease(k);
      keys.forEach((n) => (cur[n] = lerp(from[n], target[n], e)));
      sunCur = sunFrom && k < 1 ? lerp(sunFrom, sunTarget(), e) : sunTarget();
      const time = reduce ? 40 : (now - t0) / 1000 + 40;
      gl.uniform2f(U.uRes, W, H);
      gl.uniform1f(U.uTime, time);
      gl.uniform3fv(U.uZen, cur.zen); gl.uniform3fv(U.uMid, cur.mid); gl.uniform3fv(U.uHor, cur.hor);
      gl.uniform3fv(U.uSun, cur.sun); gl.uniform3fv(U.uLit, cur.lit); gl.uniform3fv(U.uShade, cur.shade);
      gl.uniform2f(U.uSunPos, sunCur[0], sunCur[1]);
      gl.uniform1f(U.uSunR, cur.sunR); gl.uniform1f(U.uGlow, cur.glow); gl.uniform1f(U.uCover, cur.cover);
      gl.uniform1f(U.uFly, (window.OTAGE && OTAGE.fly) || 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      return k < 1;
    };

    let visible = true, last = 0, raf = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (window.OTAGE && OTAGE.skyHidden) return; // ciel masqué : pas de calcul
      const transitioning = (tStart && now - tStart < 1700) || (window.OTAGE && OTAGE.flyMoving);
      if (reduce && !transitioning && hero.dataset.phase === phase) return;
      if (!transitioning && now - last < 33) return; // ~30 i/s, les nuages sont lents
      last = now;
      render(now);
    };

    resize();
    hero.classList.add("gl");
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(hero); else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(hero);
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); cancelAnimationFrame(raf); hero.classList.remove("gl"); });
    raf = requestAnimationFrame(loop);
  })();

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
    const above = [".avatar", ".proof", ".title", ".arabic"].map((s) => document.querySelector(s));
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

  /* ================= Le ticket honnête ================= */
  (() => {
    const sec = document.querySelector(".offers");
    if (!sec) return;
    const $ = (s) => sec.querySelector(s);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Contenances de chaque format : à modifier ici uniquement (null = contenance à compléter) */
    const F = cfg.formats;
    const NOMS = TXT.noms;
    const mlTxt = (v) => (v ? `${v} ${TXT.ml}` : "");
    /* liste des contenances sur chaque carte de format */
    sec.querySelectorAll(".fmt-card").forEach((c) => {
      const f = F[c.dataset.fmt];
      const ul = document.createElement("ul");
      ul.className = "fmt-ml";
      ul.innerHTML = Object.keys(NOMS).map((k) => `<li><span>${NOMS[k]}</span><b>${mlTxt(f.ml[k])}</b></li>`).join("");
      c.querySelector(".fmt-txt").appendChild(ul);
    });
    let fmt = "petit", qty = 3; // l'offre 2 + 1 est proposée d'emblée, on peut repasser à 1 gamme
    /* Produits vendus : la gamme anti-taches (2 formats) et le sérum contour des yeux */
    let prod = "taches";
    const YEUX = { name: TXT.yeuxName, price: cfg.yeuxPrice, was: null, s: TXT.yeuxWord, pl: TXT.yeuxWords, offert: TXT.yeuxFree, content: TXT.yeuxContent };
    const P = () => prod === "yeux" ? YEUX : {
      name: fill(TXT.gammeName, { label: F[fmt].label }), price: F[fmt].price, was: F[fmt].was, s: TXT.gammeWord, pl: TXT.gammeWords, offert: TXT.gammeFree,
      content: Object.keys(NOMS).map((k) => `${NOMS[k]}${F[fmt].ml[k] ? " " + F[fmt].ml[k] + " " + TXT.ml : ""}`).join(TXT.comma),
    };
    const fmtCh = sec.querySelector(".fmt").closest(".ch");
    /* Galerie : photos du produit avec ses avantages (une galerie par problème) */
    let galFor = null;
    const pic = (file) => [...document.querySelectorAll(".camp img")].find((i) => decodeURIComponent(i.src).includes(file))?.src;
    const GAL = () => prod === "yeux" ? [
      { img: document.querySelector('.src-yeux-life')?.src, ...TXT.galYeux[0] },
      { img: sec.style.getPropertyValue("--ypack").replace(/^url\(['"]?|['"]?\)$/g, "").trim(), pack: true, ...TXT.galYeux[1] },
      { img: pic("flacons-otage-trousse"), ...TXT.galYeux[2] },
    ] : [
      { img: pic("affiche-eclat"), ...TXT.galTaches[0] },
      { img: pic("femme-serum"), ...TXT.galTaches[1] },
      { img: pic("gel-nettoyant-anti-taches-mains"), ...TXT.galTaches[2] },
      { img: pic("plage-bouee"), ...TXT.galTaches[3] },
      { img: pic("papier-rouge"), ...TXT.galTaches[4] },
    ];
    const ogTrack = document.querySelector(".og-track"), ogDots = document.querySelector(".og-dots");
    const buildGallery = () => {
      const g = GAL().filter((x) => x.img);
      ogTrack.innerHTML = g.map((x) => `<figure class="og-s${x.pack ? " pack" : ""}" style="margin:0"><img src="${x.img}" alt="${x.t}" loading="lazy"><figcaption class="og-cap"><b>${x.t}</b><span>${x.s}</span></figcaption></figure>`).join("");
      ogDots.innerHTML = g.map(() => "<i></i>").join("");
      ogTrack.scrollLeft = 0;
      ogUpd();
    };
    const ogUpd = () => {
      const items = [...ogTrack.children]; if (!items.length) return;
      const pl = parseFloat(getComputedStyle(ogTrack).paddingLeft);
      let idx = 0, best = 1e9;
      items.forEach((c, i) => { const d = Math.abs(startGap(ogTrack, c)); if (d < best) { best = d; idx = i; } });
      [...ogDots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
    };
    let ogT = false;
    ogTrack.addEventListener("scroll", () => { if (!ogT) { ogT = true; requestAnimationFrame(() => { ogT = false; ogUpd(); }); } }, { passive: true });

    /* en-tête du ticket : vrai logo, numéro, date et heure du Maroc */
    $(".tk-logo").src = document.querySelector(".logo img").src;
    $("[data-tkno]").textContent = String(Math.floor(1000 + Math.random() * 9000));
    try {
      const stamp = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Casablanca" }).format(new Date()).replace(" ", "  ");
      $("[data-tkdate]").textContent = stamp;
    } catch (e) {}
    $("[data-inside]").innerHTML = ["gel", "serum", "creme", "ecran"].map((k) => `<li><img src="${document.querySelector(`.pin.${k} img`).src}" alt=""></li>`).join("");

    const money = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const tweens = new Map();
    const count = (el, to) => {
      const from = Number(el.dataset.v ?? el.textContent) || 0;
      el.dataset.v = to;
      if (reduce || from === to) { el.textContent = to; return; }
      cancelAnimationFrame(tweens.get(el));
      const t0 = performance.now();
      const f = (now) => {
        const k = Math.min(1, (now - t0) / 560), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (to - from) * e);
        if (k < 1) tweens.set(el, requestAnimationFrame(f));
      };
      tweens.set(el, requestAnimationFrame(f));
    };

    /* lignes du ticket : on n'imprime que ce qui change */
    const list = $(".tk-lines");
    const lines = () => {
      const f = P();
      const L = [];
      if (qty === 1) {
        L.push({ k: "main", l: `1 × ${f.name}`, r: money(f.price) });
        if (f.was) L.push({ k: "was", cls: "sub", l: TXT.shopPrice, r: `<s>${money(f.was)}</s>` });
      } else {
        L.push({ k: "main", l: `2 × ${f.name}`, r: money(f.price * 2) });
        L.push({ k: "gift", l: `1 × ${f.name}`, r: `<s>${money(f.price)}</s>0,00`, stamp: f.offert });
        L.push({ k: "per", cls: "sub per", l: fill(TXT.perItem, { s: f.s }), r: `<s>${money(f.price)}</s>${money(Math.round((f.price * 2) / 3))}` });
      }
      L.push({ k: "ml", cls: "sub", l: (qty === 3 ? fill(TXT.each, { s: f.s }) : TXT.content) + f.content, r: "" });
      // gamme complète : livraison offerte ; sérum contour des yeux (achat à l'unité) : frais selon la ville
      L.push(prod === "yeux" ? { k: "liv", l: `${TXT.delivery} <small>(${TXT.deliveryFeeNote})</small>`, r: TXT.deliveryFee } : { k: "liv", l: TXT.delivery, r: TXT.deliveryFree });
      L.push({ k: "pay", l: TXT.payment, r: TXT.paymentCod });
      return L;
    };
    const html = (x) => `<span>${x.l}</span><span class="r">${x.r}</span>${x.stamp ? `<span class="stamp">${x.stamp}</span>` : ""}`;
    const print = (first) => {
      const want = lines();
      const keys = want.map((x) => x.k);
      [...list.children].forEach((li) => {
        if (!keys.includes(li.dataset.k)) {
          if (reduce || first) li.remove();
          else { li.classList.add("out"); li.addEventListener("animationend", () => li.remove(), { once: true }); }
        }
      });
      let prev = null;
      want.forEach((x) => {
        let li = list.querySelector(`li[data-k="${x.k}"]:not(.out)`);
        const content = html(x);
        if (!li) {
          li = document.createElement("li");
          li.dataset.k = x.k;
          if (x.cls) li.className = x.cls;
          li.innerHTML = content;
          if (!first && !reduce) li.classList.add("new");
          prev ? prev.after(li) : list.prepend(li);
        } else if (li.dataset.c !== content) {
          li.innerHTML = content;
          if (!first && !reduce) { li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash"); }
        }
        li.dataset.c = content;
        prev = li;
      });
    };

    const totals = () => {
      const f = P();
      const total = qty === 3 ? f.price * 2 : f.price;
      const save = qty === 3 ? f.price : (f.was ? f.was - f.price : 0);
      const what = prod === "yeux" ? TXT.yeuxName : F[fmt].label;
      // recapFr : toujours en français, c'est ce qui est écrit dans le tableur des commandes
      const whatFr = prod === "yeux" ? "Sérum contour des yeux" : F[fmt].labelFr;
      const recapFr = `${whatFr}, ${qty === 3 ? (prod === "yeux" ? "2 sérums + 1 offert" : "2 gammes + 1 offerte") : prod === "yeux" ? "1 sérum" : "1 gamme"}`;
      return { total, save, recapFr, recap: `${what}${TXT.comma}${qty === 3 ? fill(TXT.recapBundle, { pl: f.pl, free: f.offert }) : fill(TXT.recapOne, { s: f.s })}` };
    };
    const render = (first) => {
      sec.querySelectorAll(".fmt-card").forEach((c) => {
        const on = c.dataset.fmt === fmt;
        c.setAttribute("aria-checked", String(on));
        c.tabIndex = on ? 0 : -1;
      });
      sec.classList.toggle("three", qty === 3);
      sec.querySelectorAll(".qopt").forEach((o) => {
        const on = Number(o.dataset.q) === qty;
        o.setAttribute("aria-checked", String(on));
        o.tabIndex = on ? 0 : -1;
      });
      sec.classList.toggle("p-yeux", prod === "yeux");
      if (galFor !== prod) { galFor = prod; buildGallery(); }
      $("[data-offer-for]").textContent = prod === "yeux" ? TXT.offerForYeux : TXT.offerForTaches;
      sec.querySelectorAll(".psw").forEach((b) => { const on = b.dataset.prod === prod; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
      fmtCh.hidden = true; // le format se change dans le formulaire (bouton Grand format)
      print(first);
      const t = totals();
      $(".tk-save").style.visibility = t.save ? "" : "hidden";
      count($("[data-total]"), t.total);
      count($("[data-save]"), t.save);
      count($("[data-mini]"), t.total);
      $("[data-recap]").textContent = t.recap;
      const f = P(), per = Math.round((f.price * 2) / 3);
      $("[data-badge]").textContent = fill(TXT.badge, { free: f.offert });
      $("[data-n3]").textContent = fill(TXT.three, { pl: f.pl });
      $("[data-n1]").textContent = fill(TXT.one, { s: f.s });
      $("[data-unit]").textContent = prod === "yeux" ? TXT.unitYeux : TXT.unitGamme;
      // option 3 gammes
      $("[data-o-old]").textContent = f.price;
      count($("[data-o-per]"), per);
      count($("[data-o-total]"), f.price * 2);
      count($("[data-o-save]"), f.price);
      // option 1 gamme
      count($("[data-s-price]"), f.price);
      count($("[data-s-total]"), f.price);
      // les cartes de format affichent le prix qui correspond au choix fait au-dessus
      sec.querySelectorAll(".fmt-card").forEach((c) => {
        const g = F[c.dataset.fmt], gp = Math.round((g.price * 2) / 3);
        c.querySelector(".fmt-price").innerHTML = qty === 3
          ? fill(TXT.fmtPer, { p: gp })
          : fill(TXT.fmtOne, { p: g.price });
        c.querySelector(".fmt-was").innerHTML = qty === 3
          ? fill(TXT.fmtTotal3, { t: g.price * 2 })
          : fill(TXT.fmtWas, { was: g.was, diff: g.was - g.price });
      });
      $("[data-mini-lbl]").textContent = qty === 3 ? fill(TXT.three, { pl: f.pl }) : fill(TXT.one, { s: f.s });
      $("[data-total2]").textContent = t.total;
      $("[data-total3]").textContent = t.total;
      $("[data-pay-note]").textContent = prod === "yeux" ? TXT.payNoteFee : TXT.payNoteFree;
      sec.querySelectorAll(".fsw").forEach((b) => { const on = b.dataset.f === fmt; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
      {
        const ups = $(".ups"), G = F.grand, Pt = F.petit;
        ups.hidden = prod === "yeux";
        const grand = fmt === "grand";
        ups.setAttribute("aria-pressed", String(grand));
        $("[data-ups-t]").textContent = grand ? TXT.upsOn : TXT.upsOff;
        $("[data-ups-s]").textContent = grand
          ? (qty === 3 ? fill(TXT.upsBackBundle, { gel: G.ml.gel, serum: G.ml.serum, creme: G.ml.creme, total: Pt.price * 2 }) : fill(TXT.upsBack, { total: Pt.price }))
          : (qty === 3 ? fill(TXT.upsGoBundle, { per: Math.round((G.price * 2) / 3), total: G.price * 2 }) : fill(TXT.upsGo, { price: G.price, was: G.was }));
      }
      // le surligneur repasse sur l'économie
      if (!first && !reduce) {
        const m = $(".tk-save mark");
        m.style.setProperty("--mk", "0%");
        requestAnimationFrame(() => requestAnimationFrame(() => m.style.setProperty("--mk", "100%")));
      }
    };

    /* choix du format (clic, ou flèches au clavier comme un groupe radio) */
    const cards = [...sec.querySelectorAll(".fmt-card")];
    cards.forEach((c, i) => {
      c.addEventListener("click", () => { fmt = c.dataset.fmt; render(); });
      c.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        const n = cards[(i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + cards.length) % cards.length];
        fmt = n.dataset.fmt; render(); n.focus();
      });
    });
    /* choix du produit */
    const setProduct = (p) => { if (p === prod || sec.classList.contains("done")) return; prod = p; render(); window.dispatchEvent(new CustomEvent("otage:choice", { detail: { type: p === "yeux" ? "contour_des_yeux" : "gamme" } })); };
    sec.querySelectorAll(".psw").forEach((b) => b.addEventListener("click", () => setProduct(b.dataset.prod)));
    window.OTAGE = window.OTAGE || {};
    OTAGE.setProduct = setProduct;
    /* choix de l'offre */
    const qopts = [...sec.querySelectorAll(".qopt")];
    qopts.forEach((o, i) => {
      // toucher une offre la choisit et amène directement aux cases à remplir
      o.addEventListener("click", () => {
        qty = Number(o.dataset.q); render();
        setTimeout(() => OTAGE.detachTicket && OTAGE.detachTicket(), reduce ? 0 : 350);
      });
      o.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        const n = qopts[(i + 1) % qopts.length];
        qty = Number(n.dataset.q); render(); n.focus();
      });
    });
    render(true);

    /* barre mobile → ticket */
    const ticketCol = $(".tk-col");
    const goTicket = () => {
      const y = ticketCol.getBoundingClientRect().top + window.scrollY - 80;
      window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" });
    };
    $(".mini-go").addEventListener("click", () => OTAGE.detachTicket());
    if ("IntersectionObserver" in window) {
      /* visible tant qu'on est sur l'offre, sauf formulaire ouvert ou commande faite */
      let inOffer = false;
      let curVisible = false;
      const syncMini = () => $(".tk-mini").classList.toggle("off", !inOffer || curVisible || sec.classList.contains("done"));
      new IntersectionObserver(([en]) => { curVisible = en.isIntersecting; syncMini(); }, { threshold: 0.25 }).observe($(".curtain"));
      new IntersectionObserver(([en]) => { inOffer = en.isIntersecting; syncMini(); }, { rootMargin: "-25% 0px -25% 0px" }).observe(sec);

      /* Le bouton Commander attire l'œil : il vibre dès qu'on arrive sur l'offre,
         puis toutes les 4 secondes (6 fois au maximum), jusqu'au premier appui. */
      const reduceM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let nudges = 0, nudgeTimer = 0, tapped = false, buzzed = false;
      const target = () => (window.innerWidth < 900 ? $(".mini-go") : $(".tk-send"));
      const nudge = () => {
        const b = target();
        const visible = window.innerWidth < 900 ? !$(".tk-mini").classList.contains("off") : inOffer && !$(".ticket").classList.contains("flipped");
        if (tapped || reduceM || !visible || sec.classList.contains("done")) return;
        b.classList.remove("nudge"); void b.offsetWidth; b.classList.add("nudge");
        // petite vibration réelle du téléphone, une seule fois (Android)
        if (!buzzed && window.innerWidth < 900 && navigator.vibrate) { try { navigator.vibrate([18, 60, 18]); } catch (e) {} buzzed = true; }
        nudges++;
      };
      const startNudge = () => {
        if (nudgeTimer || tapped) return;
        setTimeout(nudge, 700);
        nudgeTimer = setInterval(() => { if (nudges >= 6) { clearInterval(nudgeTimer); return; } nudge(); }, 4000);
      };
      new IntersectionObserver(([en]) => { if (en.isIntersecting) startNudge(); }, { threshold: 0.2 }).observe(sec.querySelector(".tk-choose"));
      [$(".mini-go"), $(".tk-send")].forEach((b) => {
        b.addEventListener("click", () => { tapped = true; clearInterval(nudgeTimer); b.classList.remove("nudge"); });
        b.addEventListener("animationend", (e) => { if (e.animationName === "buzz") b.classList.remove("nudge"); });
      });
      new MutationObserver(syncMini).observe($(".ticket"), { attributes: true, attributeFilter: ["class"] });
      new MutationObserver(syncMini).observe(sec, { attributes: true, attributeFilter: ["class"] });
      syncMini();
    }

    /* entrée de la section */
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { sec.classList.add("seen"); io.disconnect(); } }, { threshold: 0.1 });
      io.observe(sec);
    } else sec.classList.add("seen");

    /* liens « #offres » partout sur la page */
    document.querySelectorAll('a[href="#offres"]').forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      const y = sec.getBoundingClientRect().top + window.scrollY - 10;
      window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" });
    }));

    /* ---- Le rideau du formulaire ---- */
    const ticket = $(".ticket"), stub = $(".stub"), form = $(".cur-form"), err = $(".tk-err");
    const curtain = $(".curtain");
    const glideY = (y) => (window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" }));
    const openCurtain = () => curtain.classList.add("open");
    // il descend tout seul quand la cliente arrive dessus (l'offre est déjà choisie)
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { openCurtain(); io.disconnect(); } }, { threshold: 0.12 });
      io.observe(curtain);
    } else openCurtain();
    // depuis n'importe quel bouton Commander : on descend au rideau, ouvert, curseur dans le nom
    const detach = () => {
      if (sec.classList.contains("done")) { glideY(curtain.getBoundingClientRect().top + window.scrollY - 24); return; }
      openCurtain();
      let y = 0; for (let el = curtain; el; el = el.offsetParent) y += el.offsetTop;
      glideY(y - 24);
      setTimeout(() => form.elements.nom.focus({ preventScroll: true }), reduce ? 0 : 1300);
    };
    $(".tk-detach").addEventListener("click", detach);
    window.OTAGE = window.OTAGE || {};
    OTAGE.detachTicket = detach;

    /* boutons Petit / Grand format en haut de l'offre */
    sec.querySelectorAll(".fsw").forEach((b) => {
      b.addEventListener("click", () => { fmt = b.dataset.f; render(); });
      b.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
        e.preventDefault(); fmt = fmt === "petit" ? "grand" : "petit"; render(); sec.querySelector(`.fsw[data-f="${fmt}"]`).focus();
      });
    });
    /* passer au Grand format, ou revenir au Petit, sans quitter le formulaire */
    $(".ups").addEventListener("click", () => { fmt = fmt === "petit" ? "grand" : "petit"; render(); });

    /* ---- Envoi des commandes vers le tableur (Google Sheet, ouvrable dans Excel) ----
       Colle ici l'URL de l'application web Apps Script (se termine par /exec). */
    const ORDERS_ENDPOINT = cfg.ordersEndpoint;
    const QUEUE = "otage-commandes-en-attente";
    const readQ = () => { try { return JSON.parse(localStorage.getItem(QUEUE) || "[]"); } catch (e) { return []; } };
    const writeQ = (q) => { try { localStorage.setItem(QUEUE, JSON.stringify(q)); } catch (e) {} };
    const post = (o) => fetch(ORDERS_ENDPOINT, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // évite la requête préalable CORS
      body: JSON.stringify(o).replace(/[\u2066\u2069]/g, ""), // sans les caractères d'isolement des textes arabes
    }).then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); }); // refusée par Google : la commande reste en attente
    const flush = async () => {
      if (!ORDERS_ENDPOINT) return;
      const q = readQ(); if (!q.length) return;
      const left = [];
      for (const o of q) { try { await post(o); } catch (e) { left.push(o); } }
      writeQ(left);
    };
    const sendOrder = (o) => {
      if (!ORDERS_ENDPOINT) { console.warn("Commande non envoyée : ORDERS_ENDPOINT est vide.", o); return; }
      // on garde la commande de côté tant qu'elle n'est pas partie (coupure réseau, onglet fermé…)
      writeQ([...readQ(), o]);
      flush();
    };
    flush();
    window.addEventListener("online", flush);

    /* ---- Valider la commande ---- */
    const telOk = (v) => /^(?:\+212|00212|0)[5-7]\d{8}$/.test(v.replace(/[\s.-]/g, ""));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = [];
      ["nom", "tel", "ville"].forEach((n) => {
        const el = form.elements[n];
        const ok = n === "tel" ? telOk(el.value) : el.value.trim().length > 1;
        el.setAttribute("aria-invalid", String(!ok));
        if (!ok) bad.push(el);
      });
      if (bad.length) {
        err.textContent = bad.length === 1 && bad[0].name === "tel"
          ? TXT.errPhone
          : TXT.errFields;
        bad[0].focus();
        return;
      }
      // case obligatoire : CGV et politique de retour
      if (form.elements.cgv && !form.elements.cgv.checked) { err.textContent = TXT.errTerms; form.elements.cgv.focus(); return; }
      err.textContent = "";
      const fd = new FormData(form);
      const t = totals();
      if (form.elements.site && form.elements.site.value) return; // robot détecté (champ piège rempli)
      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), // évite les doublons si la commande est renvoyée
        ticket: $("[data-tkno]").textContent,
        nom: String(fd.get("nom") || "").trim(),
        tel: String(fd.get("tel") || "").trim(),
        ville: String(fd.get("ville") || "").trim(),
        adresse: String(fd.get("adresse") || "").trim(),
        produit: prod === "yeux" ? "Sérum contour des yeux" : "Gamme anti-taches",
        format: prod === "yeux" ? "Unique (15 ml)" : F[fmt].labelFr,
        quantite: qty === 3 ? "3 (2 + 1 offerte)" : "1",
        total: t.total,
        offre: t.recapFr + (prod === "yeux" ? " + livraison 35 à 45 DH selon la ville" : " (livraison offerte)"),
        page: location.href.split("#")[0],
      };
      sendOrder(order);
      window.dispatchEvent(new CustomEvent("otage:order", { detail: { type: prod === "yeux" ? "contour_des_yeux" : "gamme", format: order.format, value: t.total } })); // mesure d'audience, si acceptée
      $("[data-thanks]").textContent = fill(TXT.thanks, { name: String(fd.get("nom")).trim().split(/\s+/)[0] });
      $(".stub-act").hidden = true;
      $(".stub-done").hidden = false;
      $("[data-thanks2]").textContent = fill(TXT.thanks, { name: String(fd.get("nom")).trim().split(/\s+/)[0] });
      // confirmation : récapitulatif, livraison, total, et le même texte prêt à envoyer sur WhatsApp
      {
        const liv = prod === "yeux" ? `${TXT.deliveryFee} (${TXT.deliveryFeeNote})` : TXT.deliveryFree;
        const lignes = [fill(TXT.orderNo, { n: order.ticket }), t.recap, `${TXT.delivery}${TXT.comma === ", " ? " : " : ": "}${liv}`, `${TXT.totalWord}${TXT.comma === ", " ? " : " : ": "}${t.total} ${TXT.dhWord}${prod === "yeux" ? " + " + TXT.delivery.toLowerCase() : ""}`];
        $("[data-done-recap]").innerHTML = lignes.map((l) => `<span>${l}</span>`).join("");
        const msg = [fill(TXT.waHello, { n: order.ticket }), ...lignes.slice(1).map((l) => "- " + l), cfg.retractation].join("\n").replace(/[\u2066\u2069]/g, "");
        const wa = $("[data-done-wa]");
        if (cfg.whatsapp) wa.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`; else wa.hidden = true;
      }
      form.hidden = true;
      $(".cur-done").hidden = false;
      sec.classList.add("done", "locked");
      $(".tk-mini").hidden = true;
    });
    form.addEventListener("input", (e) => { if (e.target.getAttribute("aria-invalid") === "true") e.target.removeAttribute("aria-invalid"); });
  })();


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

  /* ================= Les questions =================
     Le chat est un composant React (src/home/chat/). Ici : seulement la liste complète des réponses,
     écrite dans le HTML, que l'on replie derrière son bouton. */
  (() => {
    const sec = document.querySelector(".faq");
    if (!sec) return;
    const all = sec.querySelector(".faq-all"), allBtn = sec.querySelector(".faq-all-btn");
    all.hidden = true; // visible sans JavaScript (robots, lecteurs), repliée derrière le bouton sinon
    allBtn.addEventListener("click", () => {
      const open = all.hidden;
      all.hidden = !open;
      allBtn.setAttribute("aria-expanded", String(open));
      allBtn.textContent = open ? TXT.hideAll : TXT.showAll;
      if (open) all.querySelector("summary").focus();
    });
  })();

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

  /* ================= Pied de page ================= */
  (() => {
    const f = document.querySelector(".foot");
    if (!f) return;
    const logo = document.querySelector(".logo img").src;
    f.style.setProperty("--logo", `url("${logo}")`);
    f.querySelector("[data-year]").textContent = new Date().getFullYear();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // liens internes : même glissement doux que le reste
    f.querySelectorAll("[data-glide]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute("href"));
      const y = t.getBoundingClientRect().top + window.scrollY - 10;
      window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo(0, y);
    }));
    f.querySelector("[data-go-routine]").addEventListener("click", (e) => { e.preventDefault(); window.OTAGE && OTAGE.goToStep && OTAGE.goToStep(0); });
    // même numéro WhatsApp que la FAQ (à renseigner là-bas)
    const faqWa = document.querySelector(".faq .wa");
    if (faqWa && !faqWa.hidden) { const w = f.querySelector(".foot-wa"); w.href = faqWa.href; w.hidden = false; }
    if (reduce) { f.style.setProperty("--sun", "0%"); f.style.setProperty("--word", "0%"); return; }
    // le soleil et le logo montent pendant qu'on arrive en bas de page
    let tick = false;
    const upd = () => {
      tick = false;
      const r = f.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (window.innerHeight - r.top) / r.height));
      const e = 1 - Math.pow(1 - k, 2);
      f.style.setProperty("--sun", `${(1 - e) * 45}%`);
      f.style.setProperty("--word", `${(1 - e) * 30}%`);
    };
    window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  })();

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
        // achat facilité : on descend tout de suite sur « Profite de l'offre 2 + 1 »
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

    /* « Voir la routine » partout sur le site : la carte des taches, sur le bon soin */
    window.OTAGE = window.OTAGE || {};
    OTAGE.showRoutine = (i = 0) => {
      pick("taches", { reveal: false });
      const r = document.querySelector('.dg-r[data-r="taches"]');
      glide(r.getBoundingClientRect().top + window.scrollY - 70);
      setTimeout(() => cars[0].go(i), 300);
    };

    // le bouton « Trouver mon soin » du hero mène ici
    document.querySelectorAll('[data-glide-to="#diagnostic"]').forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      glide(sec.getBoundingClientRect().top + window.scrollY - 10);
    }));
  })();

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

  /* Arrivée depuis une page produit : /?produit=yeux#offres ouvre l'offre du sérum contour des yeux */
  if (new URLSearchParams(location.search).get("produit") === "yeux" && window.OTAGE && OTAGE.pick) {
    OTAGE.pick("yeux", { reveal: false });
  }
}
