import type { Metadata } from "next";
import { ProductCatalog } from "@/components/sections/catalog/product-catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "ARVIT AI product catalog — the Adult AAC Device and the Child AAC + Therapy Progress App, with prices and what each includes.",
};

export default function CatalogPage() {
  return <ProductCatalog />;
}
