import type { HomeText } from "../text";
import { problemPages, trustPages } from "@/data/pages";
import { products } from "@/data/products";
import { formatDate, site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

export default function Footer({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <footer className="foot" aria-labelledby="foot-title">
      <div className="foot-sky" aria-hidden="true"><span className="foot-sun"></span></div>
      <div className="foot-in">
        <div className="foot-cta">
          <h2 id="foot-title">{t.footerTaRoutineDuSoir}</h2>
          <p>{t.footerLivraisonOffertePartoutAu}</p>
          <a href="#offres" className="o-btn o-primary o-lg" data-order=""><span className="o-lbl">{t.footerCommanderLaGamme}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg></span></a>
        </div>

        <nav className="foot-cols" aria-label={t.footerPiedDePage}>
          <div>
            <p className="fc-t">{t.footerLeSite}</p>
            <ul>
              <li><a href="#routine" data-go-routine="">{t.footerLaRoutineEn4}</a></li>
              <li><a href="#campagne" data-glide="">{t.footerLesAffiches}</a></li>
              <li><a href="#avis" data-hz-link="">{t.footerLesAvis}</a></li>
              <li><a href="#diagnostic" data-glide="">{t.footerTrouverMonSoin}</a></li>
              <li><a href="#offres" data-glide="">{t.footerLesOffres}</a></li>
              <li><a href="#questions" data-glide="">{t.footerVosQuestions}</a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">{t.footerLesSoins}</p>
            <ul>
              {products.map((p) => <li key={p.slug}><a href={localePath(locale, `/soins/${p.slug}`)}>{p.name[locale]}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="fc-t">{t.footerConseilsPeau}</p>
            <ul>
              {problemPages.map((p) => <li key={p.slug}><a href={localePath(locale, `/${p.slug}`)}>{p.label[locale]}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="fc-t">{t.footerOtage}</p>
            <ul>
              {trustPages.map((p) => <li key={p.path}><a href={localePath(locale, p.path)}>{p.label[locale]}</a></li>)}
              <li><a href={locale === "fr" ? "/ar" : "/"} lang={locale === "fr" ? "ar" : "fr"} dir={locale === "fr" ? "rtl" : "ltr"}>{t.footerTxt}</a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">{t.footerNousSuivre}</p>
            <ul>
              <li><a href={site.instagram.url} target="_blank" rel="noopener" className="fc-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg><span dir="ltr">{site.instagram.handle}</span></a></li>
              <li><a href="#" target="_blank" rel="noopener" className="fc-ic foot-wa" hidden><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg><span>{t.footerWhatsapp}</span></a></li>
              <li><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></li>
            </ul>
          </div>
          <div>
            <p className="fc-t">{t.footerNosEngagements}</p>
            <ul className="fc-plain">
              <li>{t.footerFabriqueAuMaroc}</li>
              <li>{t.footerLivraisonOfferte}</li>
              <li>{t.footerPaiementALaLivraison}</li>
            </ul>
          </div>
        </nav>
      </div>
      <p className="foot-about">{t.footerOtageEstUneMarque}</p>
      <div className="foot-word" aria-hidden="true"></div>
      <p className="foot-legal">© <span data-year="" suppressHydrationWarning>{new Date().getFullYear()}</span> {site.brand[locale]}.{t.footerOtageDesSoinsHonnetes}<span className="foot-upd">{t.footerMisAJourLe}<time dateTime={site.updated}>{formatDate(site.updated, locale)}</time>.</span></p>
    </footer>
  );
}
