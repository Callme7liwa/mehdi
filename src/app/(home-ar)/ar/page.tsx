import type { Metadata } from "next";
import { gamme } from "@/data/products";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { abs, site } from "@/data/site";
import HomePage from "@/home/HomePage";
import { faqLd, founderLd, graph, orgLd, pageMetadata, webPageLd, websiteLd } from "@/lib/seo";

/* Accueil en arabe. Textes « À relire par un natif ». */
// الثمن من products.ts
const title = `روتين ضد البقع مصنوع في المغرب، ابتداءً من ${gamme.formats.petit.price} درهم | OTAGE`;
const description = `جل منظف، سيروم، كريم وواقي شمس SPF 50 لتخفيف البقع البنية. ابتداءً من ${gamme.formats.petit.price} درهم، توصيل مجاني ${site.delivery.label.ar}، والدفع عند الاستلام في كل المغرب.`;

export const metadata: Metadata = pageMetadata({ locale: "ar", path: "/", title, description, hasAr: true });

export default function Page() {
  return (
    <>
      <JsonLd data={graph(orgLd("ar"), founderLd("ar"), websiteLd("ar"), webPageLd({ locale: "ar", path: "/", title, description }), faqLd(faq.ar, abs("/ar#faq")))} />
      <HomePage locale="ar" />
    </>
  );
}
