import { productsEn, getProductBySlugEn } from "@/data/products-en";
import ProductDetailClientEn from "./ProductDetailClientEn";
import type { Metadata } from "next";

export function generateStaticParams() {
  return productsEn.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlugEn(slug);
  if (!product) return {};
  const title = `${product.name} | HanJang Welding`;
  const description = `${product.name} — ${product.desc} CE & ISO certified. Factory direct pricing.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClientEn slug={slug} />;
}
