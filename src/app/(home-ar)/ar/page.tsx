import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { abs } from "@/data/site";
import HomePage from "@/home/HomePage";
import { faqLd, founderLd, graph, orgLd, pageMetadata, webPageLd, websiteLd } from "@/lib/seo";

/* Accueil en arabe. Textes « À relire par un natif ». */
const title = "سيروم وكريم ضد البقع، مصنوعة في المغرب | OTAGE";
const description = "روتين OTAGE ضد البقع: جل منظف، سيروم، كريم وواقي الشمس SPF 50 للبقع الصبغية والكلف. مصنوع في المغرب، والدفع عند الاستلام.";

export const metadata: Metadata = pageMetadata({ locale: "ar", path: "/", title, description, hasAr: true });

export default function Page() {
  return (
    <>
      <JsonLd data={graph(orgLd("ar"), founderLd("ar"), websiteLd(), webPageLd({ locale: "ar", path: "/", title, description }), faqLd(faq.ar, abs("/ar#faq")))} />
      <HomePage locale="ar" />
    </>
  );
}
