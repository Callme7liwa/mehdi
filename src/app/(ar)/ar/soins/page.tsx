import ProductsIndex, { productsIndexMetadata } from "@/templates/ProductsIndex";

export const metadata = productsIndexMetadata("ar");

export default function Page() {
  return <ProductsIndex locale="ar" />;
}
