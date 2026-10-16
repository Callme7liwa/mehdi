import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { reviewName, reviews } from "@/data/reviews";
import { formatDate, site, waLink, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { breadcrumbLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/* Page des avis. Arabe : « À relire par un natif ».
   Pas de note, pas d'étoiles, ni aggregateRating / Review dans le JSON-LD : ce sont des messages, pas des avis notés. */
const copy = {
  fr: {
    label: "Avis de clientes",
    title: "Avis clientes sur la gamme anti-taches | OTAGE",
    description: "Avis de clientes sur la gamme anti-taches OTAGE : leurs messages Instagram, la capture d'origine et le texte retranscrit, sans retouche ni note.",
    h1: "Avis clientes sur la gamme anti-taches",
    lead: "Leurs messages Instagram, tels quels : capture et texte.",
    from: "Message de",
    about: "à propos de la gamme anti-taches",
    client: "Cliente",
    reply: "OTAGE",
    translation: "Traduction",
    note: "Chaque peau est différente : ces messages racontent l'expérience de ces clientes, pas une promesse de résultat.",
    cta: "Envie d'essayer ?",
    ctaText: "Livraison en 24 à 72 h partout au Maroc, paiement à la livraison.",
  },
  ar: {
    label: "آراء الزبونات",
    title: "آراء الزبونات في مجموعة العناية ضد البقع | OTAGE",
    description: "آراء زبونات OTAGE في مجموعة العناية ضد البقع: رسائلهن على إنستغرام، اللقطة الأصلية والنص مكتوبًا، بدون تعديل وبدون تنقيط. علامة مغربية للعناية.",
    h1: "آراء الزبونات في مجموعة العناية ضد البقع",
    lead: "رسائلهن على إنستغرام، كما هي: اللقطة والنص.",
    from: "رسالة من",
    about: "عن مجموعة العناية ضد البقع",
    client: "الزبونة",
    reply: "OTAGE",
    translation: "الترجمة",
    note: "كل بشرة مختلفة: هذه الرسائل تحكي تجربة هؤلاء الزبونات، وليست وعدًا بالنتيجة.",
    cta: "تريدين التجربة؟",
    ctaText: "التوصيل من 24 إلى 72 ساعة في كل المغرب، والدفع عند الاستلام.",
  },
};

export const reviewsMetadata = (locale: Locale): Metadata =>
  pageMetadata({ locale, path: "/avis", title: copy[locale].title, description: copy[locale].description, hasAr: true });

export default function ReviewsPage({ locale }: { locale: Locale }) {
  const t = ui[locale], c = copy[locale];
  const crumbs: Crumb[] = [{ name: t.home, path: "/" }, { name: c.label, path: "/avis" }];
  return (
    <>
      <JsonLd data={graph(orgLd(locale), webPageLd({ locale, path: "/avis", title: c.title, description: c.description }), breadcrumbLd(locale, crumbs))} />
      <Breadcrumbs locale={locale} items={crumbs} />
      <main id="contenu" className="wrap">
        <header className="page-head">
          <h1>{c.h1}</h1>
          <p className="lead">{c.lead}</p>
          <p><b>{site.satisfaction.percent} %</b> {locale === "ar" ? `رضا، حسب استطلاع شمل ${site.satisfaction.sample} زبونة.` : `de satisfaction, d'après une enquête auprès de ${site.satisfaction.sample} clientes.`}</p>
        </header>

        <section className="sec" id="avis">
          <div className="rvw-list">
            {reviews.filter((r) => r.capture).map((r) => {
              const name = reviewName(r, locale);
              return (
                <article className="rvw card" key={r.prenom}>
                  <Img className="rvw-shot" src={r.capture!.src} alt={r.capture!.alt[locale]} width={r.capture!.w} height={r.capture!.h} sizes="(max-width: 700px) 70vw, 300px" />
                  <div className="rvw-text">
                    <h2>{c.from} {name}</h2>
                    <p className="updated">{r.date?.[locale]}{locale === "ar" ? "، " : ", "}{c.about}</p>
                    <blockquote className="rvw-quote">
                      {r.messages.map((m, i) => (
                        <p key={i} className={m.de === "otage" ? "o" : "c"} dir={m.rtl ? "rtl" : "ltr"} lang={m.rtl ? "ar" : "fr"}>
                          {m.de === "otage" && <b dir="ltr">{c.reply} : </b>}{m.texte}
                        </p>
                      ))}
                    </blockquote>
                    {r.traduction?.[locale] && <p className="rvw-tr"><b>{c.translation}{locale === "ar" ? ": " : " : "}</b>{r.traduction[locale]}</p>}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="note" style={{ marginTop: 20, maxWidth: 820 }}>{c.note}</p>
        </section>

        <section className="sec">
          <div className="band">
            <h2>{c.cta}</h2>
            <p>{c.ctaText}</p>
            <div className="btns">
              <a className="btn btn-primary" href={`${localePath(locale, "/")}#offres`}>{t.orderRange}<BagIcon /></a>
              <a className="btn btn-ghost" href={waLink()} target="_blank" rel="noopener">{t.askWhatsApp}<WaIcon /></a>
            </div>
          </div>
          <p className="updated" style={{ marginTop: 20 }}>{t.updated} <time dateTime={site.updated}>{formatDate(site.updated, locale)}</time>.</p>
        </section>
      </main>
    </>
  );
}
