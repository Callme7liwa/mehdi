export default function init() {
  /* ================= Ciel réaliste (WebGL) =================
     Dégradé atmosphérique, soleil avec halo, et nuages volumétriques
     (bruit fractal + éclairage dirigé vers le soleil). Rendu en demi-résolution,
     ~30 i/s. Chargé après l'affichage de la page (voir loader.ts), à l'arrêt quand le hero est hors écran
     ou l'onglet caché. Sans WebGL, sur un téléphone trop lent ou si les animations sont réduites : le ciel CSS reste. */
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

    /* La boucle ne tourne que si le ciel est à l'écran et l'onglet visible : sinon elle s'arrête complètement. */
    let visible = true, last = 0, raf = 0, slow = 0, frames = 0, prev = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const giveUp = () => { stop(); visible = false; hero.classList.remove("gl"); };
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (window.OTAGE && OTAGE.skyHidden) { prev = 0; return; } // ciel masqué : pas de calcul
      /* téléphone qui n'arrive pas à suivre (une image sur deux à plus de 100 ms au démarrage) : retour au ciel CSS */
      if (coarse && frames < 40) {
        if (prev) { frames++; if (now - prev > 100) slow++; }
        prev = now;
        if (frames === 40 && slow > 20) { giveUp(); return; }
      }
      const transitioning = (tStart && now - tStart < 1700) || (window.OTAGE && OTAGE.flyMoving);
      if (reduce && !transitioning && hero.dataset.phase === phase) return;
      if (!transitioning && now - last < 33) return; // ~30 i/s, les nuages sont lents
      last = now;
      render(now);
    };
    const sync = () => {
      const on = visible && !document.hidden && hero.classList.contains("gl");
      if (on && !raf) { prev = 0; raf = requestAnimationFrame(loop); }
      else if (!on && raf) stop();
    };

    resize();
    hero.classList.add("gl");
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(hero); else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); }).observe(hero);
    document.addEventListener("visibilitychange", sync);
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); giveUp(); });
    sync();
  })();
}
