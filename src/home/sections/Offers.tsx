import Img from "@/components/Img";
import { bundleTotal, bundleUnit, gamme } from "@/data/products";

const P = gamme.formats.petit, G = gamme.formats.grand;

export default function Offers() {
  return (
    <section className="offers" id="offres" aria-labelledby="offers-title" style={{ "--ypack": "url('/images/serum-contour-des-yeux-n05-15ml.webp')", "--bag": "url('/images/gamme-anti-taches-otage-trousse-vignette.webp')" } as React.CSSProperties}>
      <div className="of-in">
        <header className="of-head">
          <h2 id="offers-title">L'offre à ne pas rater.</h2>
          <p><span data-offer-for="">Pour ta routine anti-taches.</span> Ton ticket s'écrit en direct : tout est affiché, rien n'est caché.</p>
        </header>

        <div className="tk-grid">
          <div className="tk-choose">



            <div className="fsw-wrap" role="radiogroup" aria-label="Format">
              <button type="button" className="fsw" role="radio" aria-checked="true" data-f="petit"><span className="fsw-pic" style={{ "--s": "0.62" } as React.CSSProperties} aria-hidden="true"></span><span><b>Petit format</b><small>dès {bundleUnit(P.price)} DH la gamme</small></span></button>
              <button type="button" className="fsw" role="radio" aria-checked="false" data-f="grand"><span className="fsw-pic" style={{ "--s": "1" } as React.CSSProperties} aria-hidden="true"></span><span><b>Grand format</b><small>dès {bundleUnit(G.price)} DH la gamme</small></span></button>
            </div>

            <div className="ch">
              <h3 className="ch-title" id="ch0"><span className="n">1</span>Profite de l'offre 2 + 1</h3>
              <div className="qty" role="radiogroup" aria-labelledby="ch0">
                <button type="button" className="qopt q3" role="radio" aria-checked="true" data-q="3">
                  <span className="q-badge" data-badge="">2 + 1 offerte</span>
                  <span className="q-pics" aria-hidden="true"><i></i><i></i><i className="gift"><b className="gv"></b><b className="gh"></b></i></span>
                  <span className="q-name" data-n3="">3 gammes</span>
                  <span className="q-price"><s><span data-o-old="">{P.price}</span> DH</s><b data-o-per="">{bundleUnit(P.price)}</b><span className="u" data-unit="">DH la gamme</span></span>
                  <span className="q-total">Total <b><span data-o-total="">{bundleTotal(P.price)}</span> DH</b>, tu économises <em><span data-o-save="">{P.price}</span> DH</em></span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
                <button type="button" className="qopt q1" role="radio" aria-checked="false" data-q="1">
                  <span className="q-pics" aria-hidden="true"><i></i></span>
                  <span className="q-name" data-n1="">1 gamme</span>
                  <span className="q-price"><b data-s-price="">{P.price}</b><span className="u">DH</span></span>
                  <span className="q-total">Total <b><span data-s-total="">{P.price}</span> DH</b></span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
              </div>
              <button type="button" className="hz-open" data-hz="avis"><span className="hz-faces" aria-hidden="true"><i>S</i><i>H</i><i>N</i></span><span className="hz-txt"><b>Tu hésites ?</b><small>Avis, résultats, ou parle aux fondateurs</small></span><svg className="hz-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button>
            </div>

            <div className="curtain" id="livraison">
              <div className="cur-rod" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
              <div className="cur-body">
                <span className="cur-hem" aria-hidden="true"></span>
                <form className="cur-form" noValidate aria-label="Informations de livraison">
                  <p className="cur-k"><span className="n">2</span>Dernière étape, 20 secondes et c'est fini</p>
                  <h3 className="cur-t">Où est-ce qu'on te livre ?</h3>
                  <p className="back-recap"><span data-recap=""></span><b><span data-total2="">{P.price}</span> DH</b></p>
                  <button type="button" className="ups" aria-pressed="false">
                    <span className="ups-pic" aria-hidden="true"></span>
                    <span className="ups-txt"><b data-ups-t="">Passer au Grand format</b><small data-ups-s=""></small></span>
                    <span className="ups-sw" aria-hidden="true"><i></i></span>
                  </button>
                  <label className="fld"><span>Nom complet</span><input name="nom" autoComplete="name" placeholder="Ex. Salma Bennani" /></label>
                  <label className="fld"><span>Téléphone</span><input name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" /></label>
                  <label className="fld"><span>Ville</span><input name="ville" list="villes" autoComplete="address-level2" placeholder="Ex. Casablanca" /></label>
                  <div className="city-chips" aria-label="Villes fréquentes"><button type="button">Casablanca</button><button type="button">Rabat</button><button type="button">Marrakech</button><button type="button">Fès</button><button type="button">Tanger</button><button type="button">Agadir</button></div>
                  <label className="fld"><span>Adresse <small>facultatif, on peut la noter au téléphone</small></span><input name="adresse" autoComplete="address-line1" placeholder="Quartier, rue, numéro" /></label>
                  <datalist id="villes"><option>Casablanca</option><option>Rabat</option><option>Salé</option><option>Fès</option><option>Marrakech</option><option>Tanger</option><option>Agadir</option><option>Meknès</option><option>Oujda</option><option>Kénitra</option><option>Tétouan</option><option>El Jadida</option></datalist>
                  <button type="button" className="hz-open hz-mini" data-hz="avis"><span className="hz-faces" aria-hidden="true"><i>S</i><i>H</i><i>N</i></span><span className="hz-txt"><b>Tu hésites ?</b><small>Avis, résultats, ou parle aux fondateurs</small></span><svg className="hz-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button>
                  <input className="hp" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <p className="tk-err" role="alert"></p>
                  <button type="submit" className="o-btn o-primary o-lg tk-send"><span className="o-lbl">Valider ma commande</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></button>
                  <p className="cur-note">Tu paies <b><span data-total3="">{P.price}</span> DH</b> à la livraison. Livraison offerte.</p>
                </form>
                <div className="cur-done" hidden>
                  <svg className="od-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
                  <h3 className="cur-t" data-thanks2="">Merci !</h3>
                  <p>Ta commande est bien enregistrée. On t'appelle pour confirmer avant la livraison.</p>
                </div>
              </div>
            </div>

            <div className="ch">
              <h3 className="ch-title" id="ch1"><span className="n">2</span>Choisis ton format</h3>
              <div className="fmt" role="radiogroup" aria-labelledby="ch1">
                <button type="button" className="fmt-card" role="radio" aria-checked="true" data-fmt="petit">
                  <span className="fmt-pic" style={{ "--s": "0.62" } as React.CSSProperties}></span>
                  <span className="fmt-txt">
                    <span className="fmt-tag">Idéal pour commencer</span>
                    <span className="fmt-name">Petit format</span>
                    <span className="fmt-price"><b>{P.price}</b> DH</span>
                    <span className="fmt-was"><s>{P.was} DH</s><em>−{P.was - P.price} DH</em></span>
                  </span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
                <button type="button" className="fmt-card" role="radio" aria-checked="false" data-fmt="grand">
                  <span className="fmt-pic" style={{ "--s": "1.02" } as React.CSSProperties}></span>
                  <span className="fmt-txt">
                    <span className="fmt-tag hot">Meilleure économie</span>
                    <span className="fmt-name">Grand format</span>
                    <span className="fmt-price"><b>{G.price}</b> DH</span>
                    <span className="fmt-was"><s>{G.was} DH</s><em>−{G.was - G.price} DH</em></span>
                  </span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
              </div>
              <div className="ch-note"><span>Une gamme, ce sont les 4 soins de la routine</span><ul className="inside-row" data-inside=""></ul></div>
            </div>

          </div>

          <div className="tk-col">
            <div className="printer" aria-hidden="true"></div>
            <div className="ticket">
              <div className="tk-face front">
                <div className="tk-paper">
                  <div className="tk-head">
                    <Img className="tk-logo" src="/images/logo-otage.webp" alt="OTAGE" width={206} height={96} loading="eager" />
                    <p>Soins de la peau, fabriqués au Maroc</p>
                    <p className="tk-meta"><span>Ticket n° <span data-tkno="">0000</span></span><span data-tkdate=""></span></p>
                  </div>
                  <ul className="tk-lines" aria-live="polite"></ul>
                  <div className="tk-total">
                    <span>Total</span>
                    <b><span data-total="">{P.price}</span> DH</b>
                  </div>
                  <p className="tk-save"><mark>Tu économises <span data-save="">{P.was - P.price}</span> DH</mark></p>
                  <p className="tk-thanks">Merci de choisir des soins honnêtes.</p>
                  <div className="tk-bars" aria-hidden="true"></div>
                  <div className="tk-ok" aria-hidden="true"><b>Confirmé</b><span>Paiement à la livraison</span></div>
                </div>
                <div className="stub">
                  <div className="perf" aria-hidden="true"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="7" r="2.6" /><circle cx="6" cy="17" r="2.6" /><path d="M8.2 8.4L20 17M8.2 15.6L20 7" /></svg></span></div>
                  <div className="stub-act">
                    <button type="button" className="o-btn o-primary o-lg tk-detach"><span className="o-lbl">Commander</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="7" r="2.6" /><circle cx="6" cy="17" r="2.6" /><path d="M8.2 8.4L20 17M8.2 15.6L20 7" /></svg></span></button>

                  </div>
                  <div className="stub-done" hidden>
                    <p className="done-t" data-thanks="">Merci !</p>
                    <p>Ta commande est enregistrée. On t'appelle pour confirmer avant la livraison. Tu peux garder ce ticket en capture d'écran.</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    <div className="tk-mini off">
              <span className="mini-txt"><span data-mini-lbl="">3 gammes</span><b><span data-mini="">{bundleTotal(P.price)}</span> DH</b></span>
              <button type="button" className="mini-go"><span>Commander</span><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></i></button>
            </div>
    </section>
  );
}
