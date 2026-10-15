import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { fmtMl, gamme, ingredientList, productByKey, products, type FormatKey } from "@/data/products";
import { abs, site } from "@/data/site";
import HomePage from "@/home/HomePage";
import { faqLd, founderLd, gammeLd, graph, orgLd, pageMetadata, productLd, webPageLd, websiteLd } from "@/lib/seo";

// le prix vient de products.ts : jamais écrit à la main
const P = gamme.formats.petit.price;
const title = `Routine anti-taches fabriquée au Maroc, dès ${P} DH | OTAGE`;
const description = `Gel nettoyant, sérum, crème et écran SPF 50 pour atténuer les taches brunes. Dès ${P} DH, livraison offerte en ${site.delivery.label.fr}, paiement à la livraison.`;

export const metadata: Metadata = pageMetadata({ locale: "fr", path: "/", title, description, hasAr: true });

const gammeDesc = (f: FormatKey) => {
  const part = (k: "gel" | "serum" | "creme" | "ecran", label: string) => {
    const p = productByKey(k);
    return `${label} ${fmtMl(p.ml[f])} (${ingredientList(p)})`;
  };
  return `Routine anti-taches en 4 soins fabriqués au Maroc, ${gamme.formats[f].label.fr} : ${part("gel", "gel nettoyant")}, ${part("serum", "sérum anti-taches")}, ${part("creme", "crème anti-taches")} et ${part("ecran", "écran solaire SPF 50")}.`;
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          orgLd(),
          founderLd(),
          websiteLd("fr"),
          webPageLd({ locale: "fr", path: "/", title, description }),
          gammeLd("petit", gammeDesc("petit")),
          gammeLd("grand", gammeDesc("grand")),
          productLd(products.find((p) => p.key === "yeux")!, "fr"),
          faqLd(faq.fr, abs("/#faq")),
        )}
      />
      <HomePage locale="fr" />
    </>
  );
}
