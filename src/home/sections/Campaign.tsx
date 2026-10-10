import Img from "@/components/Img";

export default function Campaign() {
  return (
    <section className="camp" id="campagne" aria-labelledby="camp-title">
      <div className="camp-pin">
        <header className="camp-head">
          <h2 id="camp-title">On l'affiche partout.</h2>
          <p>Fais défiler le mur. Touche une affiche pour découvrir le soin.</p>
        </header>
        <div className="camp-wall">
          <div className="camp-track">
            <button type="button" className="poster photo" data-open="1" style={{ "--r": "-1.6deg" } as React.CSSProperties} aria-label="Sérum anti-taches : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/affiche-eclat-serum-anti-taches.webp" alt="Affiche « Éclat » avec le sérum anti-taches" width={664} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Sérum anti-taches</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <div className="poster type red" style={{ "--r": "1.4deg" } as React.CSSProperties} aria-hidden="true"><span className="tape t1"></span><p>Des soins<br /><em>honnêtes.</em></p><small>otage</small></div>
            <button type="button" className="poster photo" data-open="3" style={{ "--r": "0.8deg" } as React.CSSProperties} aria-label="Écran solaire SPF 50 : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/ecran-solaire-spf50-plage-bouee.webp" alt="L'écran solaire à la plage, à travers une bouée" width={1000} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Écran solaire SPF 50</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="0" style={{ "--r": "-1.0deg" } as React.CSSProperties} aria-label="Gel nettoyant : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/cliente-gel-nettoyant-anti-taches.webp" alt="Une cliente souriante tend le gel nettoyant" width={1000} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Gel nettoyant</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="2" style={{ "--r": "1.8deg" } as React.CSSProperties} aria-label="Crème anti-taches : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/panneau-ton-teint-revele-creme-anti-taches.webp" alt="Panneau publicitaire « Ton teint, révélé » avec la crème" width={747} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Crème anti-taches</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <div className="poster type cream" style={{ "--r": "-1.2deg" } as React.CSSProperties} aria-hidden="true"><span className="tape t1"></span><p lang="ar" dir="rtl">ما كنبيعوش الوهم،<br />كنبيعو <em>النتيجة.</em></p><small>Fabriqué au Maroc</small></div>
            <button type="button" className="poster photo" data-offres="" style={{ "--r": "-0.6deg" } as React.CSSProperties} aria-label="La gamme complète : voir les offres">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/gamme-anti-taches-4-soins-papier-rouge.webp" alt="Les 4 soins tenus par des mains à travers un papier rouge" width={1000} height={1000} /></span>
              <span className="p-tag"><span className="p-name">La gamme complète</span><span className="p-go">Voir les offres<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="1" style={{ "--r": "1.2deg" } as React.CSSProperties} aria-label="Sérum anti-taches : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/femme-serum-anti-taches.webp" alt="Une femme tend le sérum anti-taches" width={747} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Sérum anti-taches</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="3" style={{ "--r": "1.2deg" } as React.CSSProperties} aria-label="Écran solaire SPF 50 : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><video src="/videos/ecran-solaire-spf50.mp4" poster="/images/ecran-solaire-spf50-video-poster.webp" width={540} height={540} muted loop playsInline preload="none" aria-hidden="true"></video></span>
              <span className="p-tag"><span className="p-name">Écran solaire SPF 50</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-offres="" style={{ "--r": "-1.4deg" } as React.CSSProperties} aria-label="La gamme complète : voir les offres">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/flacons-otage-trousse.webp" alt="Une pluie de flacons OTAGE sort d'une trousse" width={1000} height={1000} /></span>
              <span className="p-tag"><span className="p-name">La gamme complète</span><span className="p-go">Voir les offres<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="0" style={{ "--r": "0.9deg" } as React.CSSProperties} aria-label="Gel nettoyant : voir le soin">
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/gel-nettoyant-anti-taches-mains.webp" alt="Le gel nettoyant tenu entre deux mains" width={747} height={1000} /></span>
              <span className="p-tag"><span className="p-name">Gel nettoyant</span><span className="p-go">Voir le soin<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <a className="poster type cta" href="#offres" style={{ "--r": "-1deg" } as React.CSSProperties}><span className="tape t1" aria-hidden="true"></span><p>Ta trousse<br />t'attend.</p><span className="cta-l">Voir les offres<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg></i></span><small>2 + 1 offerte</small></a>
          </div>
        </div>
        <div className="camp-foot" aria-hidden="true">
          <span className="camp-count"><b data-cc="">01</b> / <span data-ct="">12</span></span>
          <span className="camp-bar"><i></i></span>
          <span className="camp-hint">Fais défiler</span>
        </div>
      </div>
    </section>
  );
}
