/* Textes d'interface d'une fiche produit, dans une langue : ce que reçoivent les composants du navigateur. */
import { productUi } from "@/data/product-pages";
import type { L, Locale } from "@/data/site";

type Keys = Exclude<keyof typeof productUi, "band">;
export type ProductUi = Record<Keys | "dh", string>;

export const uiFor = (locale: Locale): ProductUi => {
  const out = { dh: locale === "ar" ? "درهم" : "DH" } as ProductUi;
  for (const [k, v] of Object.entries(productUi)) if (!Array.isArray(v)) out[k as Keys] = (v as L)[locale];
  return out;
};
