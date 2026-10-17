import type { HomeText } from "../text";
import { problemBySlug } from "@/data/problems";
import { hasArProblem } from "@/data/problems.ar";
import { formatDate, isReviewed, reviewers, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/** « Conseils » : cinq portes d'entrée vers les pages conseils existantes (de vrais liens, sans script).
    En arabe, seulement les pages qui ont une version arabe (pas encore le pilier « taches brunes »).
    « Grossesse et allaitement » n'a pas encore de page publiée (/masque-de-grossesse attend son approbation) : le lien mène
    à la page mélasma.
    La mention de relecture suit le champ `reviewed` de chaque page : elle n'apparaît que quand toutes les pages liées
    sont relues par le même relecteur, avec la date de la dernière relecture. */
export default function Conseils({ t, locale }: { t: HomeText; locale: Locale }) {
  const cards = [
    { slug: "taches-brunes-visage", title: t.conseilsTaches, sub: t.conseilsTachesSub },
    { slug: "cernes", title: t.conseilsCernes, sub: t.conseilsCernesSub },
    { slug: "taches-acne", title: t.conseilsAcne, sub: t.conseilsAcneSub },
    { slug: "melasma", title: t.conseilsMelasma, sub: t.conseilsMelasmaSub },
    { slug: "melasma", title: t.conseilsGrossesse, sub: t.conseilsGrossesseSub },
  ].filter((c) => locale === "fr" || hasArProblem(c.slug)); // en arabe : seulement les pages traduites
  const reviews = cards.map((c) => problemBySlug(c.slug)?.reviewed);
  const all = reviews.every((r) => isReviewed(r) && r.by === reviews[0]?.by);
  const date = all ? reviews.map((r) => r!.date).sort().at(-1)! : null;
  const reviewer = all ? reviewers[reviews[0]!.by] : null;
  return (
    <section className="cs" id="conseils" aria-labelledby="cs-title">
      <div className="cs-in">
        <header className="cs-head">
          <p className="shop-k">{t.conseilsConseils}</p>
          <h2 id="cs-title">{t.conseilsComprendreTaPeau}</h2>
          <p>{t.conseilsDesReponsesSimples}</p>
          {reviewer && date && <p className="cs-badge ok">✓ {t.conseilsReluPar}{locale === "ar" ? reviewer.nameAr : reviewer.name}{t.conseilsPharmacienLe}{formatDate(date, locale)}</p>}
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
