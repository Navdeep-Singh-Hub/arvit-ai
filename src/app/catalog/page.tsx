import type { Metadata } from "next";
import { ProductCatalog } from "@/components/sections/catalog/product-catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "ARVIT AI catalog — one AAC Device for children and parents, with price and what it includes.",
};

export default function CatalogPage() {
  return <ProductCatalog />;
}
