import type { HomeText } from "../text";
import Img from "@/components/Img";

export default function Diagnostic({ t }: { t: HomeText }) {
  return (
    <section className="dg" id="diagnostic" aria-labelledby="dg-title" style={{ "--ypack": "url('/images/serum-contour-des-yeux-n05-15ml.webp')" } as React.CSSProperties}>
      <div className="dg-in">
        <header className="dg-head">
          <h2 id="dg-title">{t.diagnosticQuEstCeQui}</h2>
          <p>{t.diagnosticTachesPigmentairesCernesOu}</p>
        </header>
        <div className="dg-cards pb" role="radiogroup" aria-label={t.diagnosticTonProbleme}>
          <button type="button" className="dg-card pbc" role="radio" aria-checked="true" data-pb="taches">
            <span className="pb-ic ic-taches" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
            <span className="pb-txt"><b>{t.diagnosticJAiDesTaches}</b><span>{t.diagnosticTachesPigmentairesTeintIrregulier}</span><em>{t.diagnosticOffre21}</em></span>
            <svg className="pb-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button type="button" className="dg-card pbc" role="radio" aria-checked="false" data-pb="yeux">
            <span className="pb-ic ic-cernes" aria-hidden="true"><svg viewBox="0 0 64 64"><path className="lid" d="M10 30c6-9 14-13 22-13s16 4 22 13c-6 9-14 13-22 13s-16-4-22-13z" /><circle className="iris" cx="32" cy="30" r="7" /><path className="dark" d="M14 40c5 7 11 10 18 10s13-3 18-10" /></svg></span>
            <span className="pb-txt"><b>{t.diagnosticJAiDesCernes}</b><span>{t.diagnosticCernesContourDesYeux}</span><em>{t.diagnosticOffre21}</em></span>
            <svg className="pb-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button type="button" className="dg-card pbc soon" role="radio" aria-checked="false" data-pb="odeurs">
            <span className="pb-ic ic-odeurs" aria-hidden="true"><i></i><i></i><i></i></span>
            <span className="pb-txt"><b>{t.diagnosticDesOdeursSousLes}</b><span>{t.diagnosticUnDeodorantQuiTient}</span><em className="soon-tag">{t.diagnosticBientot}</em></span>
            <svg className="pb-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
        <Img className="src-yeux-life" src="/images/serum-contour-des-yeux-n05-application.webp" alt={t.diagnosticSerumContourDesYeux} width={1195} height={1600} hidden />

      </div>
    </section>
  );
}
