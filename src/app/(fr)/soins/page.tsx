import ProductsIndex, { productsIndexMetadata } from "@/templates/ProductsIndex";

export const metadata = productsIndexMetadata("fr");

export default function Page() {
  return <ProductsIndex locale="fr" />;
}
