"use client";

/* Îlot du chat FAQ : la page affiche d'abord le chat tel qu'il est écrit dans le HTML (message d'accueil,
   4 questions, bouton WhatsApp). Le code interactif n'est téléchargé que lorsque la section approche de l'écran
   ou au premier geste dessus. */
import { useEffect, useRef, useState, type ComponentType } from "react";
import ChatView from "./ChatView";
import { suggestionsFor, waHref, type ChatConfig } from "./chat-logic";

export default function ChatIsland({ cfg, logo }: { cfg: ChatConfig; logo: React.ReactNode }) {
  const [Chat, setChat] = useState<ComponentType<{ cfg: ChatConfig; logo: React.ReactNode }> | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let asked = false;
    const go = () => { if (!asked) { asked = true; import("./FaqChat").then((m) => setChat(() => m.default)); } };
    if (!("IntersectionObserver" in window)) { go(); return; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { go(); io.disconnect(); } }, { rootMargin: "100% 0px" });
    io.observe(el);
    el.addEventListener("pointerdown", go, { once: true });
    el.addEventListener("focusin", go, { once: true });
    return () => io.disconnect();
  }, []);

  const first = suggestionsFor(cfg, { type: "starters" }, new Set());
  return (
    <div ref={box} className="chat-island">
      {Chat ? <Chat cfg={cfg} logo={logo} /> : <ChatView t={cfg.t} logo={logo} messages={[{ who: "them", html: `<p>${cfg.t.welcome}</p>` }]} suggestions={first.list} waHref={waHref(cfg)} />}
      {/* repère fixe de la zone des questions : la barre « Commander » s'efface quand elle est à l'écran */}
      <span className="chat-zone" aria-hidden="true" />
    </div>
  );
}
