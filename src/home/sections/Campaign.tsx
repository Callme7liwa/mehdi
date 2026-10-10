import type { HomeText } from "../text";
import Img from "@/components/Img";

export default function Campaign({ t }: { t: HomeText }) {
  return (
    <section className="camp" id="campagne" aria-labelledby="camp-title">
      <div className="camp-pin">
        <header className="camp-head">
          <h2 id="camp-title">{t.campaignOnLAffichePartout}</h2>
          <p>{t.campaignFaisDefilerLeMur}</p>
        </header>
        <div className="camp-wall">
          <div className="camp-track">
            <button type="button" className="poster photo" data-open="1" style={{ "--r": "-1.6deg" } as React.CSSProperties} aria-label={t.campaignSerumAntiTachesVoir}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/affiche-eclat-serum-anti-taches.webp" alt={t.campaignAfficheEclatAvecLe} width={664} height={1000} /></span>
              <span className="p-tag"><span className="p-name">{t.campaignSerumAntiTaches}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <div className="poster type red" style={{ "--r": "1.4deg" } as React.CSSProperties} aria-hidden="true"><span className="tape t1"></span><p>{t.campaignDesSoins}<br /><em>{t.campaignHonnetes}</em></p><small>{t.campaignOtage}</small></div>
            <button type="button" className="poster photo" data-open="3" style={{ "--r": "0.8deg" } as React.CSSProperties} aria-label={t.campaignEcranSolaireSpf50}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/ecran-solaire-spf50-plage-bouee.webp" alt={t.campaignLEcranSolaireA} width={1600} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignEcranSolaireSpf502}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="0" style={{ "--r": "-1.0deg" } as React.CSSProperties} aria-label={t.campaignGelNettoyantVoirLe}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/cliente-gel-nettoyant-anti-taches.webp" alt={t.campaignUneClienteSourianteTend} width={1600} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignGelNettoyant}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="2" style={{ "--r": "1.8deg" } as React.CSSProperties} aria-label={t.campaignCremeAntiTachesVoir}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/panneau-ton-teint-revele-creme-anti-taches.webp" alt={t.campaignPanneauPublicitaireTonTeint} width={1195} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignCremeAntiTaches}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <div className="poster type cream" style={{ "--r": "-1.2deg" } as React.CSSProperties} aria-hidden="true"><span className="tape t1"></span><p lang="ar" dir="rtl">{t.campaignTxt}<br />{t.campaignTxt2}<em>{t.campaignTxt3}</em></p><small>{t.campaignFabriqueAuMaroc}</small></div>
            <button type="button" className="poster photo" data-offres="" style={{ "--r": "-0.6deg" } as React.CSSProperties} aria-label={t.campaignLaGammeCompleteVoir}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/gamme-anti-taches-4-soins-papier-rouge.webp" alt={t.campaignLes4SoinsTenus} width={1600} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignLaGammeComplete}</span><span className="p-go">{t.campaignVoirLesOffres}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="1" style={{ "--r": "1.2deg" } as React.CSSProperties} aria-label={t.campaignSerumAntiTachesVoir}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/femme-serum-anti-taches.webp" alt={t.campaignUneFemmeTendLe} width={1195} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignSerumAntiTaches}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="3" style={{ "--r": "1.2deg" } as React.CSSProperties} aria-label={t.campaignEcranSolaireSpf50}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><video src="/videos/ecran-solaire-spf50.mp4" poster="/images/ecran-solaire-spf50-video-poster.webp" width={720} height={720} muted loop playsInline preload="none" aria-hidden="true"></video></span>
              <span className="p-tag"><span className="p-name">{t.campaignEcranSolaireSpf502}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-offres="" style={{ "--r": "-1.4deg" } as React.CSSProperties} aria-label={t.campaignLaGammeCompleteVoir}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/flacons-otage-trousse.webp" alt={t.campaignUnePluieDeFlacons} width={1600} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignLaGammeComplete}</span><span className="p-go">{t.campaignVoirLesOffres}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <button type="button" className="poster photo" data-open="0" style={{ "--r": "0.9deg" } as React.CSSProperties} aria-label={t.campaignGelNettoyantVoirLe}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img"><Img src="/images/gel-nettoyant-anti-taches-mains.webp" alt={t.campaignLeGelNettoyantTenu} width={1195} height={1600} sizes="(max-width: 640px) 90vw, 640px" /></span>
              <span className="p-tag"><span className="p-name">{t.campaignGelNettoyant}</span><span className="p-go">{t.campaignVoirLeSoin}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12" /></svg></i></span></span>
            </button>
            <a className="poster type cta" href="#offres" style={{ "--r": "-1deg" } as React.CSSProperties}><span className="tape t1" aria-hidden="true"></span><p>{t.campaignTaTrousse}<br />{t.campaignTAttend}</p><span className="cta-l">{t.campaignVoirLesOffres}<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg></i></span><small>{t.campaign21Offerte}</small></a>
          </div>
        </div>
        <div className="camp-foot" aria-hidden="true">
          <span className="camp-count"><b data-cc="">01</b> / <span data-ct="">12</span></span>
          <span className="camp-bar"><i></i></span>
          <span className="camp-hint">{t.campaignFaisDefiler}</span>
        </div>
      </div>
    </section>
  );
}
