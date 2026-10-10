import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import OrderBox from "@/components/OrderBox";
import ProductCard from "@/components/ProductCard";
import { BagIcon, CashIcon, ClockIcon, PinIcon, TruckIcon, WaIcon } from "@/components/icons";
import { productFaq } from "@/data/faq";
import { problemPages } from "@/data/pages";
import { bundleUnit, gamme, products, rangeProducts, yeuxPrice, type Product } from "@/data/products";
import { abs, formatDate, site, waLink, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { breadcrumbLd, faqLd, graph, localePath, orgLd, pageMetadata, productLd, webPageLd } from "@/lib/seo";

const path = (p: Product) => `/soins/${p.slug}`;
const title = (p: Product, locale: Locale) => `${p.metaTitle[locale]} | OTAGE`;

export function productMetadata(p: Product, locale: Locale): Metadata {
  return pageMetadata({ locale, path: path(p), title: title(p, locale), description: p.metaDescription[locale], image: p.photos[0], hasAr: true });
}

export default function ProductPage({ p, locale }: { p: Product; locale: Locale }) {
  const t = ui[locale];
  const taches = p.range === "taches";
  const faqs = productFaq(p, locale);
  const crumbs: Crumb[] = [{ name: t.home, path: "/" }, { name: t.products, path: "/soins" }, { name: p.name[locale], path: path(p) }];
  const url = abs(localePath(locale, path(p)));
  const P = gamme.formats.petit, G = gamme.formats.grand;
  const related = taches ? rangeProducts.filter((x) => x.key !== p.key) : rangeProducts;
  const waMsg = locale === "ar" ? `مرحبًا OTAGE، أريد طلب: ${p.name.ar} (${p.no}).` : `Bonjour OTAGE, je souhaite commander : ${p.name.fr} (${p.no}).`;
  const ml = locale === "ar" ? "مل" : "ml";
  const dh = locale === "ar" ? "درهم" : "DH";

  return (
    <>
      <JsonLd
        data={graph(
          orgLd(locale),
          webPageLd({ locale, path: path(p), title: title(p, locale), description: p.metaDescription[locale], image: p.photos[0], type: "ItemPage" }),
          breadcrumbLd(locale, crumbs),
          productLd(p, locale),
          faqLd(faqs, `${url}#faq`),
        )}
      />
      <Breadcrumbs locale={locale} items={crumbs} />

      <main id="contenu">
      <div className="wrap pd">
        <div className="pd-media">
          <div className="pd-pack">
            <Img src={(p.hd ?? p.pack).src} alt={(p.hd ?? p.pack).alt[locale]} width={(p.hd ?? p.pack).w} height={(p.hd ?? p.pack).h} sizes="(max-width: 900px) 130px, 200px" loading="eager" />
          </div>
          {/* la première photo est la plus grande image de l'écran : elle seule est préchargée en priorité */}
          <div className="pd-thumbs">
            {p.photos.map((ph, i) => <Img key={ph.src} src={ph.src} alt={ph.alt[locale]} width={ph.w} height={ph.h} sizes="(max-width: 900px) 50vw, 240px" loading={i === 0 ? "eager" : "lazy"} preload={i === 0} fetchPriority={i === 0 ? "high" : "auto"} />)}
          </div>
        </div>

        <div className="pd-info">
          <p className="pd-no num" dir="ltr">{p.no}</p>
          <h1>{p.h1[locale]}</h1>
          <p className="lead">{p.lead[locale]}</p>
          <ul className="chips">{p.ingredients.map((i) => <li key={i.fr}>{i[locale]}</li>)}</ul>

          <div className="price">
            {taches ? (
              <>
                <p className="price-main"><b>{p.unitPrice.petit}</b> {dh} <span>{t.unit} ({p.ml.petit} {ml})</span></p>
                <small>{t.rangeFrom} <b>{P.price} {dh}</b> {t.insteadOf} <s>{P.was} {dh}</s>. {t.bundle} : {bundleUnit(P.price)} {dh}.</small>
              </>
            ) : (
              <>
                <p className="price-main"><b>{yeuxPrice}</b> {dh} <span>({p.ml.petit} {ml})</span></p>
                <small>{t.bundle} : {bundleUnit(yeuxPrice)} {dh} ({t.bundleText}).</small>
              </>
            )}
          </div>

          <div className="btns">
            <a className="btn btn-primary" href="#commander">{t.order}<BagIcon /></a>
            <a className="btn btn-wa" href={waLink(waMsg)} target="_blank" rel="noopener">{t.orderWhatsApp}<WaIcon /></a>
          </div>

          <ul className="facts">
            <li><TruckIcon />{t.freeDelivery}</li>
            <li><ClockIcon />{t.deliveryTime} {site.delivery.label[locale]}</li>
            <li><CashIcon />{t.cod}</li>
            <li><PinIcon />{t.madeInMorocco}</li>
          </ul>
        </div>
      </div>

        <section className="sec wrap" aria-labelledby="pour-qui">
          <div className="grid c2">
            <div className="card">
              <h2 id="pour-qui">{t.forWho}</h2>
              <p style={{ marginTop: 12 }}>{p.forWho[locale]}</p>
            </div>
            <div className="card">
              <h2 id="ingredients">{t.ingredients}</h2>
              <ul className="chips" style={{ marginTop: 14 }}>{p.ingredients.map((i) => <li key={i.fr}>{i[locale]}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="sec wrap" aria-labelledby="mode-emploi">
          <div className="sec-head">
            <h2 id="mode-emploi">{t.howTo}</h2>
            <p className="lead">{p.how[locale]}</p>
            <p><b>{t.when} :</b> {p.when[locale]}.</p>
          </div>
          {taches && (
            <>
              <h3 style={{ marginBottom: 6 }}>{t.routine}</h3>
              <p className="updated" style={{ marginBottom: 14 }}>{t.routineIntro}</p>
              <ol className="steps">
                {rangeProducts.map((x) => (
                  <li key={x.key} aria-current={x.key === p.key ? "step" : undefined}>
                    <div>
                      {x.key === p.key ? <b>{x.name[locale]}</b> : <Link href={localePath(locale, path(x))}>{x.name[locale]}</Link>}
                      <br /><span>{x.when[locale]}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>

        <section className="sec wrap" aria-labelledby="prix">
          <div className="sec-head"><h2 id="prix">{t.sizesPrices}</h2></div>
          <div className="card table-wrap">
            {taches ? (
              <table className="table">
                <thead><tr><th>{t.format}</th><th>{t.size}</th><th>{t.unitPrice}</th><th>{t.inRange}</th></tr></thead>
                <tbody>
                  {(["petit", "grand"] as const).map((f) => (
                    <tr key={f}>
                      <td><b>{gamme.formats[f].label[locale]}</b></td>
                      <td>{p.ml[f]} {ml}</td>
                      {/* TODO : prix à l'unité du Grand format non communiqué */}
                      <td>{p.unitPrice[f] ? `${p.unitPrice[f]} ${dh}` : t.onRequest}</td>
                      <td><b>{gamme.formats[f].price} {dh}</b> {t.insteadOf} <s>{gamme.formats[f].was} {dh}</s><br />{t.bundle} : {bundleUnit(gamme.formats[f].price)} {dh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table">
                <thead><tr><th>{t.size}</th><th>{t.unitPrice}</th><th>{t.bundle}</th></tr></thead>
                <tbody><tr><td>{p.ml.petit} {ml}</td><td><b>{yeuxPrice} {dh}</b></td><td>{bundleUnit(yeuxPrice)} {dh} ({t.bundleText})</td></tr></tbody>
              </table>
            )}
          </div>
          <p className="updated" style={{ marginTop: 12 }}>{t.freeDelivery}. {t.cod}.</p>
          {taches && <p className="updated">{locale === "ar" ? `الحجم الكبير: ${G.price} ${dh} للمجموعة.` : `Le Grand format coûte ${G.price} DH la gamme.`}</p>}
        </section>

        <section className="sec wrap" id="commander" aria-labelledby="commander-t">
          <div className="sec-head">
            <h2 id="commander-t">{t.orderTitle}</h2>
            <p className="lead">{t.orderLead}</p>
          </div>
          <div className="grid c2" style={{ alignItems: "start" }}>
            <OrderBox locale={locale} product={taches ? "taches" : "yeux"} unitKey={taches ? p.key : undefined} />
            <div className="card sand" style={{ display: "grid", gap: 14, justifyItems: "start" }}>
              <h3>{t.preferWhatsApp}</h3>
              <p>{taches ? t.preferWhatsAppRange : t.preferWhatsAppYeux}</p>
              <a className="btn btn-wa" href={waLink(waMsg)} target="_blank" rel="noopener">{t.orderWhatsApp}<WaIcon /></a>
              <p className="updated" dir="ltr">{site.whatsapp.display}</p>
            </div>
          </div>
        </section>

        <section className="sec wrap" aria-labelledby="faq-t">
          <div className="sec-head"><h2 id="faq-t">{t.faq}</h2></div>
          <FaqList items={faqs} />
        </section>

        {(
          <section className="sec wrap" aria-labelledby="problemes">
            <div className="sec-head"><h2 id="problemes">{t.problems}</h2></div>
            <ul className="chips">
              {p.problems.map((slug) => {
                const pg = problemPages.find((x) => x.slug === slug)!;
                return <li key={slug}><Link href={localePath(locale, `/${slug}`)}>{pg.label[locale]}</Link></li>;
              })}
            </ul>
          </section>
        )}

        <section className="sec wrap" aria-labelledby="associes">
          <div className="sec-head"><h2 id="associes">{taches ? t.related : t.relatedYeux}</h2></div>
          <div className={`grid ${related.length > 3 ? "c4" : "c3"}`}>
            {related.map((x) => <ProductCard key={x.key} p={x} locale={locale} />)}
            {taches && <ProductCard p={products.find((x) => x.key === "yeux")!} locale={locale} />}
          </div>
          <p className="updated" style={{ marginTop: 24 }}>{t.updated} <time dateTime={site.updated}>{formatDate(site.updated, locale)}</time>.</p>
        </section>
      </main>
    </>
  );
}
