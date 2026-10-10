import Link from "next/link";
import Img from "./Img";
import type { Product } from "@/data/products";
import type { Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { localePath } from "@/lib/seo";

export default function ProductCard({ p, locale }: { p: Product; locale: Locale }) {
  return (
    <Link className="pcard" href={localePath(locale, `/soins/${p.slug}`)}>
      <div className="pcard-pic">
        <Img src={p.pack.src} alt={p.pack.alt[locale]} width={p.pack.w} height={p.pack.h} />
        <span className="num" dir="ltr">{p.no}</span>
      </div>
      <div className="pcard-body">
        <h3>{p.name[locale]}</h3>
        <p>{p.lead[locale]}</p>
        <span className="pcard-more">{ui[locale].seeProduct}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></span>
      </div>
    </Link>
  );
}
