import type { HomeText } from "../text";
import Img from "@/components/Img";

export default function QuickView({ t }: { t: HomeText }) {
  return (
    <dialog className="qv" aria-labelledby="qv-title">
      <div className="qv-card">
        <button type="button" className="qv-close" aria-label={t.quickViewFermer}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
        <div className="qv-media"><Img src="/images/serum-anti-taches-n02-hd.webp" alt="" width={381} height={1000} /></div>
        <div className="qv-body">
          <p className="qv-num"><span></span></p>
          <h3 id="qv-title" className="qv-title"></h3>
          <p className="qv-size"></p>
          <p className="qv-lead"></p>
          <ul className="qv-chips"></ul>
          <p className="qv-how"></p>
          <p className="qv-when"></p>
          <div className="qv-actions">
            <a className="o-btn o-primary o-md qv-buy" href="#offres" data-order=""><span className="o-lbl">{t.quickViewCommander}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
            <button type="button" className="qv-step">{t.quickViewVoirLEtapeDans}</button>
            <a className="qv-step qv-more" href="/soins/serum-anti-taches">{t.quickViewVoirLaFicheComplete}</a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
