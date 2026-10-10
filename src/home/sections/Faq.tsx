import type { HomeText } from "../text";
import Img from "@/components/Img";
import { faq, faqCats, faqMeta, faqStarters } from "@/data/faq";
import { site, type Locale } from "@/data/site";
import { isolateAll } from "@/lib/bidi";
import ChatIsland from "../chat/ChatIsland";
import type { ChatConfig } from "../chat/chat-logic";
import { chatText } from "../chat/chat-text";

export default function Faq({ t, locale }: { t: HomeText; locale: Locale }) {
  const text = locale === "ar" ? isolateAll(chatText.ar) : chatText.fr;
  const cfg: ChatConfig = {
    items: faq[locale].map((f, i) => ({ ...faqMeta[i], q: f.q, a: f.a })),
    starters: faqStarters,
    cats: faqCats.map((key) => ({ key, label: text.cats[key] })),
    t: text,
    whatsapp: site.whatsapp.wa,
  };
  return (
    <section className="faq" id="questions" aria-labelledby="faq-title">
      <div className="faq-in">
        <header className="faq-head">
          <h2 id="faq-title">{t.faqLesQuestionsQuOn}</h2>
          <p>{t.faqToucheUneQuestionOn}</p>
          <button type="button" className="faq-all-btn" aria-expanded="false" aria-controls="faq-all">{t.faqVoirToutesLesReponses}</button>
        </header>

        <ChatIsland cfg={cfg} logo={<Img src="/images/logo-otage.webp" alt="" width={206} height={96} sizes="32px" />} />

        {/* La FAQ complète, écrite dans le HTML (et reprise dans le JSON-LD FAQPage). Le chat n'est qu'une interface au-dessus. */}
        <div className="faq-all" id="faq-all">
          {faq[locale].map((f) => (
            <details key={f.q}><summary>{f.q}</summary><div className="a">{f.a.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</div></details>
          ))}
        </div>
      </div>
    </section>
  );
}
