import type { HomeText } from "../text";
import Img from "@/components/Img";
import { bundleTotal, bundleUnit, gamme } from "@/data/products";
import { cities } from "@/data/cities";
import { site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

const P = gamme.formats.petit, G = gamme.formats.grand;

export default function Offers({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <section className="offers" id="offres" aria-labelledby="offers-title" style={{ "--ypack": "url('/images/serum-contour-des-yeux-n05-15ml.webp')", "--bag": "url('/images/gamme-anti-taches-otage-trousse-vignette.webp')" } as React.CSSProperties}>
      <div className="of-in">
        <header className="of-head">
          <h2 id="offers-title">{t.offersLOffreANe}</h2>
          <p><span data-offer-for="">{t.msgGammeA}{P.price}{t.msgGammeB}{t.offersPourTaRoutineAnti}</span>{t.offersTonTicketSEcrit}</p>
        </header>

        <div className="tk-grid">
          <div className="tk-choose">



            {/* Les étapes dans l'ordre : 1. format, 2. quantité (ou offre), 3. coordonnées. Les numéros sont posés par le CSS
                (compteur) : une étape masquée, comme le format pour le sérum contour des yeux, ne laisse pas de trou. */}
            <div className="ch ch-fmt">
            <h3 className="ch-title" id="ch-f"><span className="n"></span>{t.offersChoisisTonFormat}</h3>
            <div className="fsw-wrap" role="radiogroup" aria-labelledby="ch-f">
              <button type="button" className="fsw" role="radio" aria-checked="true" data-f="petit"><span className="fsw-pic" style={{ "--s": "0.62" } as React.CSSProperties} aria-hidden="true"></span><span><b>{t.offersPetitFormat}</b><small><em>{P.price}{t.offersDh}</em> <s>{P.was}{t.offersDh}</s></small></span></button>
              <button type="button" className="fsw" role="radio" aria-checked="false" data-f="grand"><span className="fsw-pic" style={{ "--s": "1" } as React.CSSProperties} aria-hidden="true"></span><span><b>{t.offersGrandFormat}</b><small><em>{G.price}{t.offersDh}</em> <s>{G.was}{t.offersDh}</s></small></span></button>
            </div>
            </div>

            <div className="ch">
              <h3 className="ch-title" id="ch0"><span className="n"></span>{t.offersProfiteDeLOffre}</h3>
              <div className="qty" role="radiogroup" aria-labelledby="ch0">
                <button type="button" className="qopt q3" role="radio" aria-checked="true" data-q="3">
                  <span className="q-badge" data-badge="">{t.offers21Offerte}</span>
                  <span className="q-pics" aria-hidden="true"><i></i><i></i><i className="gift"><b className="gv"></b><b className="gh"></b></i></span>
                  <span className="q-name" data-n3="">{t.offers3Gammes}</span>
                  <span className="q-price"><b data-o-per="">{bundleUnit(P.price)}</b><span className="u" data-unit="">{t.offersDhLaGamme2}</span></span>
                  <span className="q-total">{t.offersTotal}<b><span data-o-total="">{bundleTotal(P.price)}</span>{t.offersDh}</b>{t.offersTuEconomises}<em><span data-o-save="">{P.price}</span>{t.offersDh}</em></span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
                <button type="button" className="qopt q1" role="radio" aria-checked="false" data-q="1">
                  <span className="q-pics" aria-hidden="true"><i></i></span>
                  <span className="q-name" data-n1="">{t.offers1Gamme}</span>
                  <span className="q-price"><b data-s-price="">{P.price}</b><span className="u">{t.offersDh2}</span></span>
                  <span className="q-total">{t.offersTotal}<b><span data-s-total="">{P.price}</span>{t.offersDh}</b></span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
              </div>
              <button type="button" className="hz-open" data-hz="avis"><span className="hz-txt"><b>{t.offersTuHesites}</b><small>{t.offersAvisResultatsOuParle}</small></span><svg className="hz-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button>
            </div>

            <div className="curtain" id="livraison">
              <div className="cur-rod" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
              <div className="cur-body">
                <span className="cur-hem" aria-hidden="true"></span>
                <form className="cur-form" noValidate aria-label={t.offersInformationsDeLivraison}>
                  <p className="cur-k"><span className="n"></span>{t.offersDerniereEtape20Secondes}</p>
                  <h3 className="cur-t">{t.offersOuEstCeQu}</h3>
                  <p className="back-recap"><span data-recap=""></span><b><span data-total2="">{P.price}</span>{t.offersDh}</b></p>
                  <label className="fld"><span>{t.offersNomComplet}</span><input name="nom" autoComplete="name" placeholder={t.offersExSalmaBennani} /></label>
                  <label className="fld"><span>{t.offersTelephone}</span><input name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" /></label>
                  <label className="fld"><span>{t.offersVille}</span><input name="ville" list="villes" autoComplete="address-level2" placeholder={t.offersExCasablanca} aria-describedby="tk-ville-info" /><small id="tk-ville-info" className="fld-info">{t.offersAutreVille}</small></label>
                  <label className="fld"><span>{t.offersAdresse}<small>{t.offersFacultatifOnPeutLa}</small></span><input name="adresse" autoComplete="address-line1" placeholder={t.offersQuartierRueNumero} /></label>
                  <label className="fld"><span>{t.offersEmail}<small>{t.offersEmailOpt}</small></span><input name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" placeholder="prenom@exemple.com" aria-describedby="tk-email-info" /><small id="tk-email-info" className="fld-info"><b>{t.offersEmailHint}</b> {t.offersEmailConsent}</small></label>
                  <datalist id="villes">{cities.map((c) => <option key={c.fr}>{c[locale]}</option>)}</datalist>
                  <button type="button" className="hz-open hz-mini" data-hz="avis"><span className="hz-txt"><b>{t.offersTuHesites}</b><small>{t.offersAvisResultatsOuParle}</small></span><svg className="hz-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button>
                  <input className="hp" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <label className="agree">
                    <input type="checkbox" name="cgv" />
                    <span>{t.offersAgreeA} <a href={localePath(locale, "/cgv")} target="_blank" rel="noopener">{t.offersAgreeCgv}</a> {t.offersAgreeAnd} <a href={`${localePath(locale, "/livraison-paiement")}#retours`} target="_blank" rel="noopener">{t.offersAgreeReturns}</a>.</span>
                  </label>
                  <p className="tk-err" role="alert"></p>
                  <button type="submit" className="o-btn o-primary o-lg tk-send"><span className="o-lbl">{t.offersValiderMaCommande}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></button>
                  <p className="cur-note">{t.offersTuPaies}<b><span data-total3="">{P.price}</span>{t.offersDh}</b><span data-pay-note="">{t.offersALaLivraisonLivraison}</span></p>
                </form>
                <div className="cur-done" hidden>
                  <svg className="od-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
                  <h3 className="cur-t" data-thanks2="">{t.offersMerci}</h3>
                  <p>{t.offersTaCommandeEstBien}</p>
                  {/* récapitulatif écrit par le script à la validation : commande, livraison, total */}
                  <p className="done-recap" data-done-recap=""></p>
                  <p className="done-right">{site.returns.short[locale]}</p>
                  <a className="done-wa" data-done-wa="" href="#" target="_blank" rel="noopener">{t.offersWaConfirm}</a>
                </div>
              </div>
            </div>

            {/* anciennes cartes de format : le script s'en sert encore pour ses calculs, elles ne s'affichent plus (le format est l'étape 1) */}
            <div className="ch" hidden>
              <h3 className="ch-title" id="ch1">{t.offersChoisisTonFormat}</h3>
              <div className="fmt" role="radiogroup" aria-labelledby="ch1">
                <button type="button" className="fmt-card" role="radio" aria-checked="true" data-fmt="petit">
                  <span className="fmt-pic" style={{ "--s": "0.62" } as React.CSSProperties}></span>
                  <span className="fmt-txt">
                    <span className="fmt-tag">{t.offersIdealPourCommencer}</span>
                    <span className="fmt-name">{t.offersPetitFormat}</span>
                    <span className="fmt-price"><b>{P.price}</b>{t.offersDh}</span>
                    <span className="fmt-was"><s>{P.was}{t.offersDh}</s><em>{t.offersEcart}{P.was - P.price}{t.offersDh}</em></span>
                  </span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
                <button type="button" className="fmt-card" role="radio" aria-checked="false" data-fmt="grand">
                  <span className="fmt-pic" style={{ "--s": "1.02" } as React.CSSProperties}></span>
                  <span className="fmt-txt">
                    <span className="fmt-tag hot">{t.offersMeilleureEconomie}</span>
                    <span className="fmt-name">{t.offersGrandFormat}</span>
                    <span className="fmt-price"><b>{G.price}</b>{t.offersDh}</span>
                    <span className="fmt-was"><s>{G.was}{t.offersDh}</s><em>{t.offersEcart}{G.was - G.price}{t.offersDh}</em></span>
                  </span>
                  <span className="tick" aria-hidden="true"></span>
                </button>
              </div>
              <div className="ch-note"><span>{t.offersUneGammeCeSont}</span><ul className="inside-row" data-inside=""></ul></div>
            </div>

          </div>

          <div className="tk-col">
            <div className="printer" aria-hidden="true"></div>
            <div className="ticket">
              <div className="tk-face front">
                <div className="tk-paper">
                  <div className="tk-head">
                    <Img className="tk-logo" src="/images/logo-otage.webp" alt={t.offersOtage} width={206} height={96} loading="eager" />
                    <p>{t.offersSoinsDeLaPeau}</p>
                    <p className="tk-meta"><span>{t.offersTicketN}<span data-tkno="">0000</span></span><span data-tkdate=""></span></p>
                  </div>
                  <ul className="tk-lines" aria-live="polite"></ul>
                  <div className="tk-total">
                    <span>{t.offersTotal2}</span>
                    <b><span data-total="">{P.price}</span>{t.offersDh}</b>
                  </div>
                  <p className="tk-save"><mark>{t.offersTuEconomises2}<span data-save="">{P.was - P.price}</span>{t.offersDh}</mark></p>
                  <p className="tk-thanks">{t.offersMerciDeChoisirDes}</p>
                  <div className="tk-bars" aria-hidden="true"></div>
                  <div className="tk-ok" aria-hidden="true"><b>{t.offersConfirme}</b><span>{t.offersPaiementALaLivraison}</span></div>
                </div>
                <div className="stub">
                  <div className="perf" aria-hidden="true"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="7" r="2.6" /><circle cx="6" cy="17" r="2.6" /><path d="M8.2 8.4L20 17M8.2 15.6L20 7" /></svg></span></div>
                  <div className="stub-act">
                    <button type="button" className="o-btn o-primary o-lg tk-detach"><span className="o-lbl">{t.offersCommander}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="7" r="2.6" /><circle cx="6" cy="17" r="2.6" /><path d="M8.2 8.4L20 17M8.2 15.6L20 7" /></svg></span></button>

                  </div>
                  <div className="stub-done" hidden>
                    <p className="done-t" data-thanks="">{t.offersMerci}</p>
                    <p>{t.offersTaCommandeEstEnregistree}</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    <div className="tk-mini off">
              <span className="mini-txt"><span data-mini-lbl="">{t.offers3Gammes}</span><b><span data-mini="">{bundleTotal(P.price)}</span>{t.offersDh}</b></span>
              <button type="button" className="mini-go"><span>{t.offersCommander}</span><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></i></button>
            </div>
    </section>
  );
}
