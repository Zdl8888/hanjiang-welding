import { productsEn } from "@/data/products-en";
import ProductDetailClientEn from "./ProductDetailClientEn";

export function generateStaticParams() {
  return productsEn.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClientEn slug={slug} />;
}
