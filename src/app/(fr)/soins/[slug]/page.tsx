import { notFound } from "next/navigation";
import { productBySlug, products } from "@/data/products";
import ProductPage, { productMetadata } from "@/templates/ProductPage";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/soins/[slug]">) {
  const p = productBySlug((await params).slug);
  return p ? productMetadata(p, "fr") : {};
}

export default async function Page({ params }: PageProps<"/soins/[slug]">) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  return <ProductPage p={p} locale="fr" />;
}
