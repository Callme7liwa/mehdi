"use client";

/* Le chat FAQ interactif. Chargé seulement quand la section approche de l'écran (voir ChatIsland). */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatView, { type ChatMessage, type Suggestion } from "./ChatView";
import { suggestionsFor, waHref, type ChatConfig, type View } from "./chat-logic";

const now = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

export default function FaqChat({ cfg, logo }: { cfg: ChatConfig; logo: React.ReactNode }) {
  const welcome = useCallback((): ChatMessage => ({ who: "them", html: `<p>${cfg.t.welcome}</p>`, time: now() }), [cfg]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcome()]);
  const [asked, setAsked] = useState<Set<string>>(() => new Set());
  const [view, setView] = useState<View>({ type: "starters" });
  const [typing, setTyping] = useState(false);
  const [last, setLast] = useState<string>();
  const [edge, setEdge] = useState({ start: false, end: false });
  const log = useRef<HTMLDivElement>(null), chips = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const focusNext = useRef(false);
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* défilement vers le dernier échange, à l'intérieur de la conversation (jamais la page) */
  useLayoutEffect(() => {
    const el = log.current;
    if (!el) return;
    const mine = [...el.querySelectorAll<HTMLElement>(".msg.me")].pop();
    const bottom = el.scrollHeight - el.clientHeight;
    // si la question et sa réponse dépassent la hauteur visible, on cale la question en haut : rien n'est coupé
    const top = mine && el.scrollHeight - mine.offsetTop + 12 > el.clientHeight ? Math.min(bottom, mine.offsetTop - 12) : bottom;
    el.scrollTo({ top, behavior: reduce() ? "auto" : "smooth" });
  }, [messages, typing]);

  /* indicateur « il reste des questions à faire défiler » */
  const updateMore = useCallback(() => {
    const el = chips.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft), start = pos > 8, end = el.scrollWidth - el.clientWidth - pos > 8;
    setEdge((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, []);
  const nav = (dir: 1 | -1) => {
    const el = chips.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.7, behavior: reduce() ? "auto" : "smooth" });
  };
  const { list, hint } = suggestionsFor(cfg, view, asked);
  useLayoutEffect(() => {
    const el = chips.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateMore();
    if (focusNext.current) { focusNext.current = false; el.querySelector<HTMLElement>(".chip")?.focus({ preventScroll: true }); }
  }, [view, asked, updateMore]);
  useEffect(() => {
    window.addEventListener("resize", updateMore);
    return () => window.removeEventListener("resize", updateMore);
  }, [updateMore]);

  const pick = (s: Suggestion, byKeyboard: boolean) => {
    if (typing) return;
    focusNext.current = byKeyboard;
    if (s.kind === "other" || s.kind === "back") return setView({ type: "cats" });
    if (s.kind === "cat") return setView({ type: "cat", cat: s.key.slice(4) });
    const item = cfg.items.find((i) => i.id === s.key);
    if (!item) return;
    const still = reduce();
    setMessages((m) => [...m, { who: "me", html: `<p>${item.q}</p>`, time: now() }]);
    setAsked((a) => new Set(a).add(item.id));
    setLast(item.q);
    setView({ type: "follow", ids: item.next });
    const answer = () => {
      setTyping(false);
      setMessages((m) => {
        const all = m.map((x, i) => (i === m.length - 1 ? { ...x, read: true } : x));
        const done = cfg.items.every((i) => i.id === item.id || asked.has(i.id));
        return [...all, { who: "them", html: item.a.map((p) => `<p>${p}</p>`).join(""), time: now() }, ...(done ? [{ who: "them" as const, html: `<p>${cfg.t.done}</p>`, time: now() }] : [])];
      });
    };
    if (still) return answer();
    setTyping(true);
    // « en train d'écrire » : de 400 à 700 ms selon la longueur de la réponse
    timers.current.push(window.setTimeout(answer, Math.min(700, 400 + item.a.join(" ").length * 1.5)));
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    setTyping(false); setAsked(new Set()); setLast(undefined); setView({ type: "starters" }); setMessages([welcome()]);
  };

  /* flèches gauche/droite : navigation dans les suggestions (dans le sens de lecture) */
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const all = [...e.currentTarget.querySelectorAll<HTMLElement>(".chip")];
    const i = all.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    e.preventDefault();
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "Home" ? -i : e.key === "End" ? all.length - 1 - i : (e.key === "ArrowRight") !== rtl ? 1 : -1;
    const next = all[Math.max(0, Math.min(all.length - 1, i + step))];
    next.focus({ preventScroll: true });
    next.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce() ? "auto" : "smooth" });
  };

  return (
    <ChatView
      t={cfg.t} logo={logo} messages={messages} typing={typing} suggestions={list} hint={hint} waHref={waHref(cfg, last)}
      canRestart={asked.size > 0} edge={edge} onNav={nav} logRef={log} chipsRef={chips} onPick={pick} onRestart={restart} onChipsKey={onKey} onChipsScroll={updateMore}
    />
  );
}
