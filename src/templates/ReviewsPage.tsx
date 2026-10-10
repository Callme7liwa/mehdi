import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { reviews } from "@/data/reviews";
import { formatDate, site, waLink, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { breadcrumbLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/* Page des avis. Arabe : « À relire par un natif ».
   Pas de note, pas d'étoiles, ni aggregateRating / Review dans le JSON-LD : ce sont des messages, pas des avis notés. */
const copy = {
  fr: {
    label: "Avis de clientes",
    title: "Avis de clientes sur la gamme anti-taches | OTAGE",
    description: "Les messages que des clientes OTAGE nous ont envoyés sur Instagram à propos de la gamme anti-taches : captures d'origine et texte retranscrit.",
    h1: "Ce que nos clientes nous écrivent",
    lead: "Des messages reçus sur Instagram, montrés tels qu'ils nous ont été envoyés : la capture d'origine, et le texte retranscrit à côté.",
    from: "Message de",
    about: "à propos de la gamme anti-taches",
    client: "Cliente",
    reply: "OTAGE",
    translation: "Traduction",
    note: "Chaque peau est différente : ces messages racontent l'expérience de ces clientes, pas une promesse de résultat.",
    cta: "Envie d'essayer ?",
    ctaText: "Livraison offerte partout au Maroc, paiement à la livraison.",
  },
  ar: {
    label: "آراء الزبونات",
    title: "آراء الزبونات في مجموعة العناية ضد البقع | OTAGE",
    description: "رسائل أرسلتها لنا زبونات OTAGE على إنستغرام عن مجموعة العناية ضد البقع: اللقطات الأصلية والنص مكتوبًا.",
    h1: "ما تكتبه لنا زبوناتنا",
    lead: "رسائل وصلتنا على إنستغرام، نعرضها كما أُرسلت: اللقطة الأصلية، والنص مكتوبًا بجانبها.",
    from: "رسالة من",
    about: "عن مجموعة العناية ضد البقع",
    client: "الزبونة",
    reply: "OTAGE",
    translation: "الترجمة",
    note: "كل بشرة مختلفة: هذه الرسائل تحكي تجربة هؤلاء الزبونات، وليست وعدًا بالنتيجة.",
    cta: "تريدين التجربة؟",
    ctaText: "توصيل مجاني في كل أنحاء المغرب، والدفع عند الاستلام.",
  },
};
const nameAr: Record<string, string> = { Nabila: "نبيلة", Awatef: "عواطف" };

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
        </header>

        <section className="sec" id="avis">
          <div className="rvw-list">
            {reviews.filter((r) => r.capture).map((r) => {
              const name = locale === "ar" ? nameAr[r.prenom] ?? r.prenom : r.prenom;
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
