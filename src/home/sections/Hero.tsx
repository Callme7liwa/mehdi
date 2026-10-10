import Img from "@/components/Img";
import { gamme } from "@/data/products";

export default function Hero() {
  return (
    <div className="journey">
    <section className="hero" data-phase="matin" suppressHydrationWarning>
      <div className="ground" aria-hidden="true"></div>
      <canvas className="sky-gl" aria-hidden="true"></canvas>
      <div className="sun" aria-hidden="true"></div>
      <div className="sky" aria-hidden="true">
        <span className="cloud c1"></span><span className="cloud c2"></span>
        <span className="cloud c3"></span><span className="cloud c4"></span><span className="cloud c5"></span>
        <span className="cloud c6"></span><span className="cloud c7"></span>
        <span className="haze"></span>
      </div>
      <div className="side l" aria-hidden="true"></div>
      <div className="side r" aria-hidden="true"></div>

      <header className="nav">
        <a href="/" className="logo" aria-label="OTAGE, accueil"><Img src="/images/logo-otage.webp" alt="OTAGE" width={206} height={96} loading="eager" /></a>
        <nav className="links" aria-label="Navigation principale">
          <a href="#decouvrir">Soins</a>
          <a href="#ingredients">Ingrédients</a>
          <a href="#avis" data-hz-link="">Avis</a>
          <a href="#questions">FAQ</a>
        </nav>
        <a href="#offres" className="o-btn o-dark o-sm navBtn"><span className="o-lbl">Commander</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
        <button className="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="sheet"><span></span></button>
        <nav className="sheet" id="sheet" aria-label="Menu">
          <a href="#decouvrir">Soins</a>
          <a href="#ingredients">Ingrédients</a>
          <a href="#avis" data-hz-link="">Avis</a>
          <a href="#questions">FAQ</a>
        </nav>
      </header>

      <div className="content">
        <div className="avatar">
          {/* Photo du docteur : remplacer src par l'image (carrée, 240×240 px minimum) */}
          <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20120%20120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22%23f7efe6%22/%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2247%22%20r%3D%2221%22%20fill%3D%22%23e4c3bd%22/%3E%3Cpath%20d%3D%22M22%20120c3-25%2019-38%2038-38s35%2013%2038%2038z%22%20fill%3D%22%23e4c3bd%22/%3E%3C/svg%3E" alt="Docteur partenaire OTAGE" width={240} height={240} decoding="async" />
        </div>

        <div className="proof">
          <div className="faces" aria-hidden="true"><span>S</span><span>H</span><span>N</span></div>
          <div>
            <div className="stars rating" role="img" aria-label="5 étoiles">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" /></svg>
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" /></svg>
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" /></svg>
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" /></svg>
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" /></svg>
            </div>
            <p>85 % de nos clientes sont conquises</p>
          </div>
        </div>

        <h1 className="title">
          <span className="line kick">Routine anti-taches</span>
          <span className="line">Des soins <mark>honnêtes.</mark></span>
          <span className="line">Fabriqués au Maroc</span>
        </h1>

        <p className="arabic" lang="ar" dir="rtl">ما كنبيعوش الوهم، كنبيعو <span>النتيجة.</span></p>

        <div className="pins">
          <div className="laurel l" aria-hidden="true"></div>
          <div className="lane" role="list" aria-label="La gamme anti-taches">
            <a className="pin gel" href="#gel-nettoyant" role="listitem">
              <Img src="/images/gel-nettoyant-anti-taches-n01-200ml.webp" alt="Gel nettoyant anti-taches N°01, 200 ml" width={122} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">Gel nettoyant<b>N°01</b></span>
            </a>
            <a className="pin serum" href="#serum" role="listitem">
              <Img src="/images/serum-anti-taches-n02-30ml.webp" alt="Sérum anti-taches N°02, 30 ml" width={183} height={480} loading="eager" preload fetchPriority="high" />
              <span className="tag" aria-hidden="true">Sérum<b>N°02</b></span>
            </a>
            <a className="pin creme" href="#creme" role="listitem">
              <Img src="/images/creme-anti-taches-n03-50ml.webp" alt="Crème anti-taches N°03, 50 ml" width={117} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">Crème<b>N°03</b></span>
            </a>
            <a className="pin ecran" href="#ecran-solaire" role="listitem" suppressHydrationWarning>
              <Img src="/images/ecran-solaire-spf50-n04-50ml.webp" alt="Écran solaire SPF 50 N°04, 50 ml" width={117} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">Écran solaire SPF 50<b>N°04</b></span>
            </a>
          </div>
          <div className="laurel r" aria-hidden="true"></div>
        </div>


        <div className="moment">
          <div className="switch" role="group" aria-label="Moment de la routine">
            <button type="button" data-set="matin" aria-pressed="true" suppressHydrationWarning>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              Matin
            </button>
            <button type="button" data-set="soir" aria-pressed="false" suppressHydrationWarning>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
              Soir
            </button>
          </div>
          <p className="routine" aria-live="polite"></p>
        </div>

        <div className="ctas">
          <div className="cta-wrap"><a href="#offres" className="o-btn o-primary o-lg"><span className="o-lbl">Voir les offres</span><span className="o-price"><small>dès</small> {gamme.formats.petit.price} <small>DH</small></span></a><span className="flag" aria-hidden="true">2 + 1 offerte</span></div>
          <a href="#diagnostic" className="o-btn o-ghost o-lg" data-glide-to="#diagnostic"><span className="o-lbl">Trouver mon soin</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.2c2.9 3.6 6 7 6 10.8a6 6 0 0 1-12 0c0-3.8 3.1-7.2 6-10.8z" /><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4" /></svg></span></a>
        </div>

        <ul className="perks">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
            <span>Livraison offerte<span className="extra"> partout au Maroc</span></span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
            Paiement à la livraison
          </li>
        </ul>
      </div>

        <div className="bigs" aria-hidden="true">
          <button type="button" className="big" data-i="0" aria-label="Voir le détail : Gel nettoyant anti-taches" tabIndex={-1}><Img src="/images/gel-nettoyant-anti-taches-n01-hd.webp" alt="" width={255} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">Voir le soin</span></span></button>
          <button type="button" className="big" data-i="1" aria-label="Voir le détail : Sérum anti-taches" tabIndex={-1}><Img src="/images/serum-anti-taches-n02-hd.webp" alt="" width={381} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">Voir le soin</span></span></button>
          <button type="button" className="big" data-i="2" aria-label="Voir le détail : Crème anti-taches" tabIndex={-1}><Img src="/images/creme-anti-taches-n03-hd.webp" alt="" width={243} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">Voir le soin</span></span></button>
          <button type="button" className="big" data-i="3" aria-label="Voir le détail : Écran solaire SPF 50" tabIndex={-1}><Img src="/images/ecran-solaire-spf50-n04-hd.webp" alt="" width={245} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">Voir le soin</span></span></button>
        </div>
        <div className="routine-ui" id="routine" aria-label="La routine en 4 étapes">
          <p className="routine-head"><b className="rh-phase">Ta routine du matin</b>, en 4 étapes</p>
          <article className="step" data-i="0" aria-hidden="true">
            <p className="step-count">Étape 1 sur 4</p>
            <h2>Gel nettoyant</h2>
            <p className="step-lead">Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins.</p>
            <ul className="chips"><li>Figue de Barbarie</li><li>Louban</li><li>Sans sulfate</li></ul>
            <p className="step-how"><b>Comment :</b> matin et soir, sur peau humide. Masse 30 secondes, puis rince.</p>
            <a className="o-btn o-primary o-md" href="#offres" data-order=""><span className="o-lbl">Commander la gamme</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
          </article>
          <article className="step" data-i="1" aria-hidden="true">
            <p className="step-count">Étape 2 sur 4</p>
            <h2>Sérum anti-taches</h2>
            <p className="step-lead">Le soin concentré de la gamme, qui cible les taches.</p>
            <ul className="chips"><li>Matcha</li><li>Calendula</li><li>Alpha-arbutine</li></ul>
            <p className="step-how"><b>Comment :</b> 3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts.</p>
            <a className="o-btn o-primary o-md" href="#offres" data-order=""><span className="o-lbl">Commander la gamme</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
          </article>
          <article className="step" data-i="2" aria-hidden="true">
            <p className="step-count">Étape 3 sur 4</p>
            <h2>Crème anti-taches</h2>
            <p className="step-lead">Hydrate, unifie le teint et scelle le sérum.</p>
            <ul className="chips"><li>Niacinamide</li><li>Acide hyaluronique</li><li>AHA</li></ul>
            <p className="step-how"><b>Comment :</b> une noisette sur le visage et le cou, en mouvements vers le haut.</p>
            <a className="o-btn o-primary o-md" href="#offres" data-order=""><span className="o-lbl">Commander la gamme</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
          </article>
          <article className="step" data-i="3" aria-hidden="true">
            <p className="step-count">Étape 4 sur 4</p>
            <h2>Écran solaire SPF 50</h2>
            <p className="step-lead">Protège des UVA et des UVB pour que les taches ne reviennent pas.</p>
            <ul className="chips"><li>Haute protection</li><li>UVA/UVB</li></ul>
            <p className="step-how"><b>Comment :</b> le matin, en dernier. Renouvelle toutes les 2 heures au soleil.</p>
            <p className="step-note">Le soir, ta routine s'arrête à l'étape 3.</p>
            <a className="o-btn o-primary o-md" href="#offres" data-order=""><span className="o-lbl">Commander la gamme</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
          </article>
          <ol className="rail" aria-label="Étapes">
            <li><button type="button" data-go="0">01</button></li>
            <li><button type="button" data-go="1">02</button></li>
            <li><button type="button" data-go="2">03</button></li>
            <li><button type="button" data-go="3">04</button></li>
          </ol>
        </div>
        <div className="mist" aria-hidden="true"></div>
    </section>
    </div>
  );
}
