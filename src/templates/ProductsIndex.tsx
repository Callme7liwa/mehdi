import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { BagIcon } from "@/components/icons";
import { gamme, products, unitFormats } from "@/data/products";
import { abs, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { breadcrumbLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

// le prix le plus bas vient de products.ts (jamais écrit à la main)
const lowest = Math.min(...products.flatMap((p) => unitFormats(p).map((f) => p.unitPrice[f] as number)));
const copy = {
  fr: {
    title: "Soins anti-taches, contour des yeux et déodorant | OTAGE",
    description: `Les 6 soins OTAGE fabriqués au Maroc : routine anti-taches, contour des yeux, déodorant. Dès ${lowest} DH, livrés en 24 à 72 h, paiement à la livraison.`,
    h1: "Soins anti-taches, contour des yeux et déodorant",
    lead: "Fabriqués au Maroc, livrés en 24 à 72 h, paiement à la livraison.",
    offer: (p: number) => `La gamme complète dès ${p} DH, livraison offerte.`,
    orderRange: (p: number) => `Commander la gamme · ${p} DH`,
  },
  ar: {
    title: "منتجات ضد البقع، لمحيط العين ومزيل العرق | OTAGE",
    description: `منتجات OTAGE الستة المصنوعة في المغرب: روتين ضد البقع، محيط العين ومزيل العرق. ابتداءً من ${lowest} درهم، التوصيل من 24 إلى 72 ساعة والدفع عند الاستلام.`,
    h1: "منتجات ضد البقع، لمحيط العين ومزيل العرق",
    lead: "مصنوعة في المغرب، التوصيل من 24 إلى 72 ساعة، والدفع عند الاستلام.",
    offer: (p: number) => `المجموعة الكاملة ابتداءً من ${p} درهم، والتوصيل مجاني.`,
    orderRange: (p: number) => `اطلبي المجموعة · ${p} درهم`,
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
            <p>{c.offer(P)}</p>
            <a className="btn btn-primary" href={`${localePath(locale, "/")}#offres`}>{c.orderRange(P)}<BagIcon /></a>
          </div>
        </section>
      </main>
    </>
  );
}
