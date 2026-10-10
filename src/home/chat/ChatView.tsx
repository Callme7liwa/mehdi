/* Affichage du chat FAQ (sans logique) : sert à la fois au rendu statique de la page et au chat interactif. */
import type { Ref } from "react";
import type { ChatText } from "./chat-text";

export type ChatItem = { id: string; q: string; a: string[]; cat: string; next: string[] };
export type ChatMessage = { who: "them" | "me"; html: string; time?: string; read?: boolean };
export type Suggestion = { key: string; label: string; kind: "question" | "other" | "cat" | "back" };

const Send = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z" /></svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
);
const WhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" /></svg>
);

type Props = {
  t: ChatText;
  logo: React.ReactNode;
  messages: ChatMessage[];
  typing?: boolean;
  suggestions: Suggestion[];
  hint?: string;
  waHref: string;
  canRestart?: boolean;
  /** Il reste des questions à faire défiler avant (start) ou après (end). */
  edge?: { start: boolean; end: boolean };
  logRef?: Ref<HTMLDivElement>;
  chipsRef?: Ref<HTMLDivElement>;
  onPick?: (s: Suggestion, byKeyboard: boolean) => void;
  onRestart?: () => void;
  onChipsKey?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onChipsScroll?: () => void;
  onNav?: (dir: 1 | -1) => void;
};

export default function ChatView({ t, logo, messages, typing, suggestions, hint, waHref, canRestart, edge, logRef, chipsRef, onPick, onRestart, onChipsKey, onChipsScroll, onNav }: Props) {
  return (
    <div className="chat" aria-label={t.label}>
      <div className="chat-top">
        <span className="chat-av">{logo}</span>
        <span className="chat-who"><b>OTAGE</b><span>{t.service}</span></span>
        <button type="button" className="chat-restart" onClick={onRestart} hidden={!canRestart}>{t.restart}</button>
      </div>
      <div className="chat-log" role="log" aria-live="polite" aria-relevant="additions" tabIndex={0} ref={logRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}${m.read ? " read" : ""}`}>
            <div dangerouslySetInnerHTML={{ __html: m.html }} />
            <time suppressHydrationWarning>{m.time}</time>
          </div>
        ))}
        {typing && <div className="typing" role="status" aria-label={t.typing}><i></i><i></i><i></i></div>}
      </div>
      <div className="chat-ask">
        {hint && <p className="chat-hint">{hint}</p>}
        {suggestions.length > 0 && <div className="qwrap">
          <div className="qchips" role="group" aria-label={t.suggestions} ref={chipsRef} onKeyDown={onChipsKey} onScroll={onChipsScroll}>
            {suggestions.map((s) => (
              <button type="button" key={s.key} className={`chip ${s.kind}`} data-key={s.key} onClick={(e) => onPick?.(s, e.detail === 0)}>
                {s.kind === "back" && <i className="dir"><Chevron /></i>}
                <span dangerouslySetInnerHTML={{ __html: s.label }} />
                {s.kind === "question" && <i className="send"><Send /></i>}
                {(s.kind === "other" || s.kind === "cat") && <i className="dir"><Chevron /></i>}
              </button>
            ))}
          </div>
          {/* indicateur de défilement (et raccourci à la souris) ; au clavier : flèches gauche et droite */}
          <button type="button" className="qnav q-prev" tabIndex={-1} aria-hidden="true" hidden={!edge?.start} onClick={() => onNav?.(-1)}><Chevron /></button>
          <button type="button" className="qnav q-next" tabIndex={-1} aria-hidden="true" hidden={!edge?.end} onClick={() => onNav?.(1)}><Chevron /></button>
        </div>}
        <a className="wa" href={waHref} target="_blank" rel="noopener"><WhatsApp /><span>{t.whatsapp}</span></a>
      </div>
    </div>
  );
}
