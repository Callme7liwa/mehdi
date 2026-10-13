import { shared } from "./shared";

export default function init(cfg) {
  const { TXT } = shared(cfg);
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
}
