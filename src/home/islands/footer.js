export default function init() {
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
}
