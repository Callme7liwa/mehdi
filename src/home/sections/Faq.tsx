import type { HomeText } from "../text";
import Img from "@/components/Img";
import { faq } from "@/data/faq";
import type { Locale } from "@/data/site";

export default function Faq({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <section className="faq" id="questions" aria-labelledby="faq-title">
      <div className="faq-in">
        <header className="faq-head">
          <h2 id="faq-title">{t.faqLesQuestionsQuOn}</h2>
          <p>{t.faqToucheUneQuestionOn}</p>
          <button type="button" className="faq-all-btn" aria-expanded="false" aria-controls="faq-all">{t.faqVoirToutesLesReponses}</button>
        </header>

        <div className="chat" aria-label={t.faqConversationAvecOtage}>
          <div className="chat-top">
            <span className="chat-av"><Img src="/images/logo-otage.webp" alt="" width={206} height={96} loading="eager" /></span>
            <span className="chat-who"><b>{t.faqOtage}</b><span>{t.faqServiceClient}</span></span>
          </div>
          <div className="chat-log" role="log" aria-live="polite" aria-relevant="additions">
            <div className="msg them"><p>{t.faqSalamToucheUneQuestion}</p><time></time></div>
          </div>
          <div className="chat-ask">
            <div className="qchips" role="group" aria-label={t.faqQuestions}></div>
            <a className="wa" href="#" target="_blank" rel="noopener" hidden><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" /></svg><span>{t.faqUneAutreQuestionEcris}</span></a>
          </div>
        </div>

        {/* La FAQ : écrite ici une seule fois. Le chat et le JSON-LD FAQPage (généré au build) la lisent. */}
        <div className="faq-all" id="faq-all">
          {faq[locale].map((f) => (
            <details key={f.q}><summary>{f.q}</summary><div className="a">{f.a.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</div></details>
          ))}
        </div>
      </div>
    </section>
  );
}
