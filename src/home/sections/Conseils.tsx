import type { HomeText } from "../text";
import { formatDate, site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/** « Conseils » : cinq portes d'entrée vers les pages conseils existantes (de vrais liens, sans script).
    « Grossesse et allaitement » n'a pas de page à elle : le lien mène à la page mélasma, qui traite ces précautions.
    La mention de relecture suit site.medicalReview : rien tant que le pharmacien n'a pas validé les pages. */
export default function Conseils({ t, locale }: { t: HomeText; locale: Locale }) {
  const cards = [
    { slug: "taches-pigmentaires", title: t.conseilsTaches, sub: t.conseilsTachesSub },
    { slug: "cernes", title: t.conseilsCernes, sub: t.conseilsCernesSub },
    { slug: "taches-acne", title: t.conseilsAcne, sub: t.conseilsAcneSub },
    { slug: "melasma-grossesse", title: t.conseilsMelasma, sub: t.conseilsMelasmaSub },
    { slug: "melasma-grossesse", title: t.conseilsGrossesse, sub: t.conseilsGrossesseSub },
  ];
  const { validated, date } = site.medicalReview;
  return (
    <section className="cs" id="conseils" aria-labelledby="cs-title">
      <div className="cs-in">
        <header className="cs-head">
          <p className="shop-k">{t.conseilsConseils}</p>
          <h2 id="cs-title">{t.conseilsComprendreTaPeau}</h2>
          <p>{t.conseilsDesReponsesSimples}</p>
          {validated && date && <p className="cs-badge ok">✓ {t.conseilsReluPar}{locale === "ar" ? site.founder.nameAr : site.founder.name}{t.conseilsPharmacienLe}{formatDate(date, locale)}</p>}
        </header>
        <div className="cs-grid">
          {cards.map((c, i) => (
            <a key={c.title} className="cs-card" href={localePath(locale, `/${c.slug}`)}>
              <span className="cs-n" aria-hidden="true">0{i + 1}</span>
              <span className="cs-t">{c.title}</span>
              <span className="cs-s">{c.sub}</span>
              <span className="cs-go">{t.conseilsLire}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
