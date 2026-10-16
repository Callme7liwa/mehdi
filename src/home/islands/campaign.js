export default function init() {
  /* ================= Le mur de l'atelier =================
     Le mur ne pilote plus le défilement : rien ici ne touche au scroll (ni épinglage, ni défilement horizontal forcé).
     Le parallaxe desktop est en CSS (animation-timeline: view()). Il ne reste que l'affiche vidéo :
     image d'attente chargée à l'approche du mur, lecture seulement quand elle est à l'écran. */
  const sec = document.querySelector(".camp");
  const video = sec && sec.querySelector("video");
  if (!video) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (video.dataset.poster) {
    const setPoster = () => { video.poster = video.dataset.poster; };
    if ("IntersectionObserver" in window) { const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setPoster(); io.disconnect(); } }, { rootMargin: "150% 0px" }); io.observe(sec); } else setPoster();
  }
  video.muted = true; // React ne pose pas l'attribut muted : sans lui, la lecture automatique est bloquée
  if ("IntersectionObserver" in window && !reduce) {
    new IntersectionObserver(([en]) => { en.isIntersecting ? video.play().catch(() => {}) : video.pause(); }, { threshold: 0.4 }).observe(video);
  }
}
