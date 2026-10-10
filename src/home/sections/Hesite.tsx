import Img from "@/components/Img";

export default function Hesite() {
  return (
    <dialog className="hz" aria-labelledby="hz-title">
      <div className="hz-card">
        <button type="button" className="qv-close hz-close" aria-label="Fermer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
        <h3 id="hz-title" className="hz-t">Tu hésites ? C'est normal.</h3>
        <p className="hz-s">Trois façons de te décider, sans pression.</p>
        <div className="hz-tabs" role="tablist">
          <button type="button" role="tab" className="hz-tab" data-tab="avis" aria-selected="true" aria-controls="hz-avis">Les avis</button>
          <button type="button" role="tab" className="hz-tab" data-tab="res" aria-selected="false" aria-controls="hz-res">Les résultats</button>
          <button type="button" role="tab" className="hz-tab" data-tab="ceo" aria-selected="false" aria-controls="hz-ceo">Les fondateurs</button>
        </div>

        <div className="hz-panel" id="hz-avis" role="tabpanel">
          <div className="rv">
            <p className="rv-demo" hidden>Aperçu : ces messages sont des exemples. Remplace-les par de vrais avis de clientes avant la mise en ligne.</p>
        <div className="rv-rail">
          <button type="button" className="rv-nav rv-prev" aria-label="Avis précédents"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
          <div className="rv-track" tabIndex={0} aria-label="Avis de clientes, à faire défiler"></div>
          <button type="button" className="rv-nav rv-next" aria-label="Avis suivants"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
        </div>
        <div className="rv-dots" aria-hidden="true"></div>
          </div>
        </div>

        <div className="hz-panel" id="hz-res" role="tabpanel" hidden>
          <div className="ring">
            <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="rg-bg" cx="60" cy="60" r="52" /><circle className="rg-fg" cx="60" cy="60" r="52" /></svg>
            <b><span><span data-pct-count="">0</span><small>%</small></span></b>
          </div>
          <p className="res-big">de nos clientes sont conquises.</p>
          <p className="res-src">D'après les retours de nos clientes.</p>
          <ul className="res-pts">
            <li><b>Tu paies à la livraison.</b> Rien à avancer en ligne.</li>
            <li><b>Livraison offerte</b> partout au Maroc.</li>
            <li><b>Fabriqué au Maroc,</b> avec des ingrédients d'ici.</li>
          </ul>
        </div>

        <div className="hz-panel" id="hz-ceo" role="tabpanel" hidden>
          <div className="ceo">
            <span className="ceo-av" aria-hidden="true"><Img src="/images/logo-otage.webp" alt="" width={206} height={96} /></span>
            <div className="ceo-msg">
              <p>Salam ! Ici les fondateurs d'OTAGE. Une question sur ta peau, un soin ou ta commande ? Écris-nous directement, on te répond nous-mêmes.</p>
            </div>
          </div>
          <a className="o-btn o-dark o-md ceo-wa" href="#" target="_blank" rel="noopener" hidden><span className="o-lbl">Écrire aux fondateurs sur WhatsApp</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg></span></a>
          <button type="button" className="o-btn o-dark o-md ceo-faq"><span className="o-lbl">Poser ma question</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg></span></button>
        </div>

        <div className="hz-cta">
          <button type="button" className="o-btn o-primary o-lg hz-go"><span className="o-lbl">C'est bon, je commande</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></button>
        </div>
      </div>
    </dialog>
  );
}
