/* Page d'accueil en arabe (/ar). Traduction en arabe standard simple : À RELIRE PAR UN NATIF.
   Même contenu que l'accueil français (gamme, routine, commande, FAQ), dans la mise en page des pages
   intérieures : les animations de l'accueil français sont conçues pour une lecture de gauche à droite. */
import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import OrderBox from "@/components/OrderBox";
import ProductCard from "@/components/ProductCard";
import { BagIcon, CashIcon, ClockIcon, PinIcon, TruckIcon, WaIcon } from "@/components/icons";
import { faq } from "@/data/faq";
import { bundleUnit, gamme, productByKey, products, rangeProducts, yeuxPrice } from "@/data/products";
import { abs, site, waLink } from "@/data/site";
import { ui } from "@/data/ui";
import { faqLd, graph, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

const title = "سيروم وكريم ضد البقع، مصنوعة في المغرب | OTAGE";
const description = "روتين OTAGE ضد البقع: جل منظف، سيروم، كريم وواقي الشمس SPF 50 للبقع الصبغية. مصنوع في المغرب، توصيل مجاني والدفع عند الاستلام.";

export const arHomeMetadata: Metadata = pageMetadata({ locale: "ar", path: "/", title, description, hasAr: true });

export default function ArHome() {
  const t = ui.ar;
  const P = gamme.formats.petit, G = gamme.formats.grand;
  const hero = gamme.photos[0];
  const yeux = productByKey("yeux");
  return (
    <>
      <JsonLd data={graph(orgLd(), webPageLd({ locale: "ar", path: "/", title, description }), faqLd(faq.ar, abs("/ar#faq")))} />
      <main id="contenu">
        <div className="wrap pd">
          <div className="pd-info">
            <p className="kicker">روتين ضد البقع</p>
            <h1>عناية صادقة ضد البقع، مصنوعة في المغرب</h1>
            <p className="lead">روتين من 4 منتجات للبقع البنية والبقع الصبغية ولون البشرة غير الموحد: جل منظف، سيروم، كريم وواقي الشمس SPF 50.</p>
            <p lang="ar"><b>ما كنبيعوش الوهم، كنبيعو النتيجة.</b></p>
            <div className="price">
              <p className="price-main"><b>{P.price}</b> درهم <span>للمجموعة الكاملة، {P.label.ar}</span></p>
              <small>{t.insteadOf} <s>{P.was} درهم</s>. {t.bundle}: {bundleUnit(P.price)} درهم للمجموعة ({t.bundleText}).</small>
            </div>
            <div className="btns">
              <a className="btn btn-primary" href="#commander">{t.orderRange}<BagIcon /></a>
              <a className="btn btn-wa" href={waLink("مرحبًا OTAGE، أريد طلب مجموعة العناية ضد البقع.")} target="_blank" rel="noopener">{t.orderWhatsApp}<WaIcon /></a>
            </div>
            <ul className="facts">
              <li><TruckIcon />{t.freeDelivery}</li>
              <li><ClockIcon />{t.deliveryTime} {site.delivery.label.ar}</li>
              <li><CashIcon />{t.cod}</li>
              <li><PinIcon />{t.madeInMorocco}</li>
            </ul>
          </div>
          <div className="pd-media">
            <Img src={hero.src} alt={hero.alt.ar} width={hero.w} height={hero.h} sizes="(max-width: 900px) 100vw, 480px" style={{ borderRadius: 28 }} loading="eager" preload fetchPriority="high" />
          </div>
        </div>

        <section className="sec wrap" aria-labelledby="produits">
          <div className="sec-head">
            <h2 id="produits">المنتجات الأربعة في الروتين</h2>
            <p className="lead">في الصباح: الخطوات الأربع. في المساء: الثلاث الأولى، بدون واقي الشمس.</p>
          </div>
          <div className="grid c4">{rangeProducts.map((p) => <ProductCard key={p.key} p={p} locale="ar" />)}</div>
          <ol className="steps" style={{ marginTop: 20 }}>
            {rangeProducts.map((p) => (
              <li key={p.key}>
                <div>
                  <Link href={`/ar/soins/${p.slug}`}>{p.name.ar}</Link>
                  <br /><span>{p.how.ar}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="sec wrap" id="commander" aria-labelledby="commander-t">
          <div className="sec-head">
            <h2 id="commander-t">{t.orderRange}</h2>
            <p className="lead">{t.orderLead}</p>
          </div>
          <div className="grid c2" style={{ alignItems: "start" }}>
            <OrderBox locale="ar" product="taches" />
            <div className="card sand" style={{ display: "grid", gap: 14, justifyItems: "start" }}>
              <h3>{P.label.ar} أم {G.label.ar}؟</h3>
              <p>{P.label.ar}: {P.price} درهم بدل {P.was} درهم. {G.label.ar}: {G.price} درهم بدل {G.was} درهم. مع عرض 2 + 1 تصبح المجموعة بـ {bundleUnit(P.price)} درهم أو {bundleUnit(G.price)} درهم.</p>
              <a className="btn btn-wa" href={waLink("مرحبًا OTAGE، لدي سؤال.")} target="_blank" rel="noopener">{t.askWhatsApp}<WaIcon /></a>
              <p className="updated" dir="ltr">{site.whatsapp.display}</p>
            </div>
          </div>
        </section>

        <section className="sec wrap" aria-labelledby="yeux">
          <div className="band">
            <h2 id="yeux">{yeux.name.ar}</h2>
            <p>{yeux.forWho.ar} {yeux.ingredients.map((i) => i.ar).join("، ")}. {yeuxPrice} درهم، أو {bundleUnit(yeuxPrice)} درهم مع عرض 2 + 1.</p>
            <Link className="btn btn-primary" href={`/ar/soins/${yeux.slug}`}>{t.seeProduct}</Link>
          </div>
        </section>

        <section className="sec wrap" id="faq" aria-labelledby="faq-t">
          <div className="sec-head"><h2 id="faq-t">{t.faq}</h2></div>
          <FaqList items={faq.ar} />
        </section>

        <section className="sec wrap" aria-labelledby="tous">
          <div className="sec-head"><h2 id="tous">{t.allProducts}</h2></div>
          <ul className="chips">{products.map((p) => <li key={p.slug}><Link href={`/ar/soins/${p.slug}`}>{p.name.ar}</Link></li>)}</ul>
        </section>
      </main>
    </>
  );
}
