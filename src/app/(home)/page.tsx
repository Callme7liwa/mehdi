import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { fmtMl, gamme, productByKey, products, type FormatKey } from "@/data/products";
import { abs } from "@/data/site";
import HomePage from "@/home/HomePage";
import { faqLd, gammeLd, graph, orgLd, pageMetadata, productLd, webPageLd, websiteLd } from "@/lib/seo";

const title = "Sérum et crème anti-taches fabriqués au Maroc | OTAGE";
const description = "Routine anti-taches OTAGE : gel nettoyant, sérum, crème et écran solaire SPF 50 contre les taches pigmentaires. Fabriqué au Maroc, paiement à la livraison.";

export const metadata: Metadata = pageMetadata({ locale: "fr", path: "/", title, description, hasAr: true });

const gammeDesc = (f: FormatKey) => {
  const part = (k: "gel" | "serum" | "creme" | "ecran", label: string) => {
    const p = productByKey(k);
    return `${label} ${fmtMl(p.ml[f])} (${p.ingredients.map((i) => i.fr.toLowerCase()).join(", ")})`;
  };
  return `Routine anti-taches en 4 soins fabriqués au Maroc, ${gamme.formats[f].label.fr} : ${part("gel", "gel nettoyant")}, ${part("serum", "sérum anti-taches")}, ${part("creme", "crème anti-taches")} et ${part("ecran", "écran solaire SPF 50")}.`;
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          orgLd(),
          websiteLd(),
          webPageLd({ locale: "fr", path: "/", title, description }),
          gammeLd("petit", gammeDesc("petit")),
          gammeLd("grand", gammeDesc("grand")),
          productLd(products.find((p) => p.key === "yeux")!, "fr"),
          faqLd(faq.fr, abs("/#faq")),
        )}
      />
      <HomePage />
    </>
  );
}
