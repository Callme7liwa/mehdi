import type { HomeText } from "../text";
import Img from "@/components/Img";
import { gamme } from "@/data/products";
import { site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

const BAG = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg>;

export default function Hero({ t, locale }: { t: HomeText; locale: Locale }) {
  const other = locale === "fr" ? "ar" : "fr";
  /* Menu : « Soins », « À l'unité » et « FAQ » défilent vers leur section ; « Produits » ouvre la page /soins,
     « Avis » la page /avis (ou la fenêtre des avis quand le script est chargé). */
  const links = (
    <>
      <a href="#diagnostic" data-nav="">{t.heroSoins}</a>
      <a href="#unite" data-nav="" data-new={t.heroNouveau}>{t.heroUnite}</a>
      <a href={localePath(locale, "/soins")}>{t.heroProduits}</a>
      <a href={localePath(locale, "/avis")} data-hz-link="">{t.heroAvis}</a>
      <a href="#questions" data-nav="">{t.heroFaq}</a>
      <a className="lang" href={locale === "fr" ? "/ar" : "/"} lang={other} hrefLang={other}>{locale === "fr" ? "العربية" : "Français"}</a>
    </>
  );
  const order = <a className="o-btn o-primary o-md" href="#offres" data-order=""><span className="o-lbl">{t.heroCommanderLaGamme}</span><span className="o-cap">{BAG}</span></a>;
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
        <a href={locale === "ar" ? "/ar" : "/"} className="logo" aria-label={t.heroOtageAccueil}><Img src="/images/logo-otage.webp" alt={t.heroOtage} width={206} height={96} loading="eager" /></a>
        <nav className="links" aria-label={t.heroNavigationPrincipale}>
          {links}
        </nav>
        <a href="#offres" className="o-btn o-dark o-sm navBtn"><span className="o-lbl">{t.heroCommander}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
        <button className="burger" type="button" aria-label={t.heroOuvrirLeMenu} aria-expanded="false" aria-controls="sheet"><span></span></button>
        <nav className="sheet" id="sheet" aria-label={t.heroMenu}>
          {links}
        </nav>
      </header>

      <div className="content">
        {/* Le chiffre vient de l'enquête interne (site.satisfaction) : toujours affiché avec la taille de l'échantillon. */}
        <button type="button" className="proof s85 go" data-hz-res="">
          <span className="s85-badge">
            <svg className="s85-ring" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="s85c" d="M60,60 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0" /></defs><text><textPath href="#s85c" startOffset="0" {...(locale === "ar" ? {} : { textLength: 306, lengthAdjust: "spacing" })}>{t.hero85Anneau}</textPath></text></svg>
            <span className="s85-num"><b aria-hidden="true" style={{ "--to": site.satisfaction.percent } as React.CSSProperties}></b><span className="s85-val">{site.satisfaction.percent}</span><sup>%</sup></span>
          </span>
          <span className="s85-rule" aria-hidden="true"></span>
          <span className="s85-txt"><span className="s85-l1">{t.hero85DeSatisfaction}</span><span className="s85-l2">{t.hero85EnqueteA}{site.satisfaction.sample}{t.hero85EnqueteB}</span><span className="s85-link">{t.hero85LireLesAvis}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></span></span>
          <span className="s85-bar" aria-hidden="true"><i></i></span>
        </button>

        {/* Le surtitre « Routine anti-taches » reste dans le H1 : c'est lui qui porte le mot-clé de la page. */}
        <h1 className="title">
          <span className="line kick">{t.heroRoutineAntiTaches}</span>
          <span className="line">{t.heroDesSoins}<span className="hn">{t.heroHonnetes}<svg className="hn-loop" viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true"><path d="M16 46 C 14 22, 70 8, 130 9 C 190 10, 232 22, 230 42 C 228 64, 170 74, 112 73 C 56 72, 10 64, 9 44 C 8 30, 30 18, 62 13" /></svg></span></span>
          <span className="line l2">{t.heroFabriquesAuMaroc}</span>
        </h1>

        <p className="arabic" lang="ar" dir="rtl"><span className="ar-dash" aria-hidden="true"></span>{t.heroAccroche}<span className="ar-dash" aria-hidden="true"></span></p>

        <div className="pins">
          <div className="laurel l" aria-hidden="true"></div>
          <div className="lane" role="group" aria-label={t.heroLaGammeAntiTaches}>
            <a className="pin gel" href={localePath(locale, "/soins/gel-nettoyant")}>
              <Img src="/images/gel-nettoyant-anti-taches-n01-200ml.webp" alt={t.heroGelNettoyantAntiTaches} width={122} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">{t.heroGelNettoyant}<b>{t.heroN01}</b></span>
            </a>
            <a className="pin serum" href={localePath(locale, "/soins/serum-anti-taches")}>
              <Img src="/images/serum-anti-taches-n02-30ml.webp" alt={t.heroSerumAntiTachesN} width={183} height={480} loading="eager" preload fetchPriority="high" />
              <span className="tag" aria-hidden="true">{t.heroSerum}<b>{t.heroN02}</b></span>
            </a>
            <a className="pin creme" href={localePath(locale, "/soins/creme-anti-taches")}>
              <Img src="/images/creme-anti-taches-n03-50ml.webp" alt={t.heroCremeAntiTachesN} width={117} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">{t.heroCreme}<b>{t.heroN03}</b></span>
            </a>
            <a className="pin ecran" href={localePath(locale, "/soins/ecran-solaire-spf50")} suppressHydrationWarning>
              <Img src="/images/ecran-solaire-spf50-n04-50ml.webp" alt={t.heroEcranSolaireSpf50} width={117} height={480} loading="eager" />
              <span className="tag" aria-hidden="true">{t.heroEcranSolaireSpf502}<b>{t.heroN04}</b></span>
            </a>
          </div>
          <div className="laurel r" aria-hidden="true"></div>
        </div>


        <div className="moment">
          <div className="switch" role="group" aria-label={t.heroMomentDeLaRoutine}>
            <button type="button" data-set="matin" aria-pressed="true" suppressHydrationWarning>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              {t.heroMatin}
            </button>
            <button type="button" data-set="soir" aria-pressed="false" suppressHydrationWarning>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
              {t.heroSoir}
            </button>
          </div>
          <p className="routine" aria-live="polite"></p>
        </div>

        <div className="ctas">
          <div className="cta-wrap"><a href="#offres" className="o-btn o-primary o-lg"><span className="o-lbl">{t.heroVoirLesOffres}</span><span className="o-price"><small>{t.heroDes}</small> {gamme.formats.petit.price} <small>{t.heroDh}</small></span></a><span className="flag" aria-hidden="true">{t.hero21Offerte}</span></div>
          <a href="#diagnostic" className="o-btn o-ghost o-lg" data-glide-to="#diagnostic"><span className="o-lbl">{t.heroTrouverMonSoin}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.2c2.9 3.6 6 7 6 10.8a6 6 0 0 1-12 0c0-3.8 3.1-7.2 6-10.8z" /><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4" /></svg></span></a>
        </div>

        <ul className="perks">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
            <span>{t.msgGammeA}{gamme.formats.petit.price}{t.msgGammeB}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
            {t.heroPaiementALaLivraison}
          </li>
        </ul>
      </div>

        <div className="bigs" aria-hidden="true">
          <button type="button" className="big" data-i="0" aria-label={t.heroVoirLeDetailGel} tabIndex={-1}><Img src="/images/gel-nettoyant-anti-taches-n01-hd.webp" alt="" width={255} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">{t.heroVoirLeSoin}</span></span></button>
          <button type="button" className="big" data-i="1" aria-label={t.heroVoirLeDetailSerum} tabIndex={-1}><Img src="/images/serum-anti-taches-n02-hd.webp" alt="" width={381} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">{t.heroVoirLeSoin}</span></span></button>
          <button type="button" className="big" data-i="2" aria-label={t.heroVoirLeDetailCreme} tabIndex={-1}><Img src="/images/creme-anti-taches-n03-hd.webp" alt="" width={243} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">{t.heroVoirLeSoin}</span></span></button>
          <button type="button" className="big" data-i="3" aria-label={t.heroVoirLeDetailEcran} tabIndex={-1}><Img src="/images/ecran-solaire-spf50-n04-hd.webp" alt="" width={245} height={1000} /><span className="peek"><span className="peek-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></span><span className="peek-tx">{t.heroVoirLeSoin}</span></span></button>
        </div>
        <div className="routine-ui" id="routine" aria-label={t.heroLaRoutineEn4}>
          <p className="routine-head"><b className="rh-phase">{t.heroTaRoutineDuMatin}</b>{t.heroEn4Etapes}</p>
          <article className="step" data-i="0" aria-hidden="true">
            <p className="step-count">{t.heroEtape1Sur4}</p>
            <h2>{t.heroGelNettoyant}</h2>
            <p className="step-lead">{t.heroNettoieEnDouceurSans}</p>
            <ul className="chips"><li>{t.heroFigueDeBarbarie}</li><li>{t.heroLouban}</li><li>{t.heroSansSulfate}</li></ul>
            <p className="step-how"><b>{t.heroComment}</b>{t.heroMatinEtSoirSur}</p>
            <a className="step-link" href={localePath(locale, "/soins/gel-nettoyant")}>{t.heroVoirLaFiche}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></a>
            {order}
          </article>
          <article className="step" data-i="1" aria-hidden="true">
            <p className="step-count">{t.heroEtape2Sur4}</p>
            <h2>{t.heroSerumAntiTaches}</h2>
            <p className="step-lead">{t.heroLeSoinConcentreDe}</p>
            <ul className="chips"><li>{t.heroMatcha}</li><li>{t.heroCalendula}</li><li>{t.heroAlphaArbutine}</li></ul>
            <p className="step-how"><b>{t.heroComment}</b>{t.hero3A4Gouttes}</p>
            <a className="step-link" href={localePath(locale, "/soins/serum-anti-taches")}>{t.heroVoirLaFiche}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></a>
            {order}
          </article>
          <article className="step" data-i="2" aria-hidden="true">
            <p className="step-count">{t.heroEtape3Sur4}</p>
            <h2>{t.heroCremeAntiTaches}</h2>
            <p className="step-lead">{t.heroHydrateUnifieLeTeint}</p>
            <ul className="chips"><li>{t.heroNiacinamide}</li><li>{t.heroAcideHyaluronique}</li><li>{t.heroAha}</li></ul>
            <p className="step-how"><b>{t.heroComment}</b>{t.heroUneNoisetteSurLe}</p>
            <a className="step-link" href={localePath(locale, "/soins/creme-anti-taches")}>{t.heroVoirLaFiche}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></a>
            {order}
          </article>
          <article className="step" data-i="3" aria-hidden="true">
            <p className="step-count">{t.heroEtape4Sur4}</p>
            <h2>{t.heroEcranSolaireSpf502}</h2>
            <p className="step-lead">{t.heroProtegeDesUvaEt}</p>
            <ul className="chips"><li>{t.heroHauteProtection}</li><li>{t.heroUvaUvb}</li></ul>
            <p className="step-how"><b>{t.heroComment}</b>{t.heroLeMatinEnDernier}</p>
            <p className="step-note">{t.heroLeSoirTaRoutine}</p>
            <a className="step-link" href={localePath(locale, "/soins/ecran-solaire-spf50")}>{t.heroVoirLaFiche}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></a>
            {order}
          </article>
          <ol className="rail" aria-label={t.heroEtapes}>
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
