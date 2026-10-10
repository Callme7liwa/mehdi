/* Règles du chat FAQ : quelles questions proposer, selon ce qui a déjà été demandé. */
import type { ChatItem, Suggestion } from "./ChatView";
import type { ChatText } from "./chat-text";

export type ChatConfig = {
  items: ChatItem[];
  starters: string[];
  cats: { key: string; label: string }[];
  t: ChatText;
  /** Numéro WhatsApp au format wa.me. */
  whatsapp: string;
};
export type View = { type: "starters" } | { type: "follow"; ids: string[] } | { type: "cats" } | { type: "cat"; cat: string };

const question = (i: ChatItem): Suggestion => ({ key: i.id, label: i.q, kind: "question" });

export function suggestionsFor(cfg: ChatConfig, view: View, asked: Set<string>): { list: Suggestion[]; hint?: string } {
  const left = cfg.items.filter((i) => !asked.has(i.id));
  if (!left.length) return { list: [] };
  const other: Suggestion = { key: "other", label: cfg.t.other, kind: "other" };
  const byId = (ids: string[]) => ids.map((id) => left.find((i) => i.id === id)).filter((i): i is ChatItem => Boolean(i));

  if (view.type === "cat") {
    const inCat = left.filter((i) => i.cat === view.cat);
    if (inCat.length) return { list: [{ key: "back", label: cfg.t.back, kind: "back" }, ...inCat.map(question)] };
  }
  if (view.type === "cats" || view.type === "cat") {
    const cats = cfg.cats.filter((c) => left.some((i) => i.cat === c.key));
    return { list: cats.map((c) => ({ key: `cat:${c.key}`, label: c.label, kind: "cat" as const })), hint: cfg.t.topics };
  }
  const picks = byId(view.type === "follow" ? view.ids : cfg.starters).slice(0, view.type === "follow" ? 3 : 4);
  // plus rien à proposer dans cette série : on montre les sujets
  if (!picks.length) return suggestionsFor(cfg, { type: "cats" }, asked);
  return { list: left.length > picks.length ? [...picks.map(question), other] : picks.map(question) };
}

export const waHref = (cfg: ChatConfig, lastQuestion?: string) =>
  `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(lastQuestion ? cfg.t.waQuestion + lastQuestion.replace(/<[^>]+>|[\u2066\u2069]/g, "") : cfg.t.waIntro)}`;
