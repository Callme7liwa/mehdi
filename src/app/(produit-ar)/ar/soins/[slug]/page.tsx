import { notFound } from "next/navigation";
import { productBySlug, products } from "@/data/products";
import ProductView, { productMetadata } from "@/product/ProductView";

// Fiches produits en arabe : traduction « À relire par un natif » (textes dans src/data/product-pages.ts et products.ts)
export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/ar/soins/[slug]">) {
  const p = productBySlug((await params).slug);
  return p ? productMetadata(p, "ar") : {};
}

export default async function Page({ params }: PageProps<"/ar/soins/[slug]">) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  return <ProductView p={p} locale="ar" />;
}
