import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { BagIcon } from "@/components/icons";
import { bundleUnit, gamme, products } from "@/data/products";
import { abs, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { breadcrumbLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

const copy = {
  fr: {
    title: "Soins anti-taches et contour des yeux | OTAGE",
    description: "Les 5 soins OTAGE fabriqués au Maroc : gel nettoyant, sérum anti-taches, crème anti-taches, écran solaire SPF 50 et sérum contour des yeux. Livraison offerte.",
    h1: "Les soins OTAGE",
    lead: "Une routine anti-taches en 4 soins, et un sérum contour des yeux. Fabriqués au Maroc, livrés gratuitement, payés à la livraison.",
    offer: (p: number, b: number) => `La gamme anti-taches complète dès ${p} DH, ou ${b} DH la gamme avec l'offre 2 + 1.`,
  },
  ar: {
    title: "منتجات العناية ضد البقع ومحيط العين | OTAGE",
    description: "منتجات OTAGE الخمسة المصنوعة في المغرب: جل منظف، سيروم ضد البقع، كريم ضد البقع، واقي الشمس SPF 50 وسيروم محيط العين. توصيل مجاني.",
    h1: "منتجات OTAGE",
    lead: "روتين ضد البقع من 4 منتجات، وسيروم لمحيط العين. مصنوعة في المغرب، توصيل مجاني والدفع عند الاستلام.",
    offer: (p: number, b: number) => `المجموعة الكاملة ضد البقع ابتداءً من ${p} درهم، أو ${b} درهم للمجموعة مع عرض ⁦2 + 1⁩.`,
  },
};

export const productsIndexMetadata = (locale: Locale): Metadata => pageMetadata({ locale, path: "/soins", title: copy[locale].title, description: copy[locale].description, hasAr: true });

export default function ProductsIndex({ locale }: { locale: Locale }) {
  const t = ui[locale], c = copy[locale];
  const crumbs: Crumb[] = [{ name: t.home, path: "/" }, { name: t.products, path: "/soins" }];
  const P = gamme.formats.petit.price;
  return (
    <>
      <JsonLd
        data={graph(orgLd(locale), webPageLd({ locale, path: "/soins", title: c.title, description: c.description, type: "CollectionPage" }), breadcrumbLd(locale, crumbs), {
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name[locale], url: abs(localePath(locale, `/soins/${p.slug}`)) })),
        })}
      />
      <Breadcrumbs locale={locale} items={crumbs} />
      <main id="contenu" className="wrap">
        <header className="page-head">
          <h1>{c.h1}</h1>
          <p className="lead">{c.lead}</p>
        </header>
        <section className="sec">
          <div className="grid c3">{products.map((p) => <ProductCard key={p.key} p={p} locale={locale} />)}</div>
        </section>
        <section className="sec">
          <div className="band">
            <h2>{gamme.name[locale]}</h2>
            <p>{c.offer(P, bundleUnit(P))}</p>
            <a className="btn btn-primary" href={`${localePath(locale, "/")}#offres`}>{t.orderRange}<BagIcon /></a>
          </div>
        </section>
      </main>
    </>
  );
}
