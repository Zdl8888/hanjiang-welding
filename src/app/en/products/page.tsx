import Link from "next/link";
import { productsEn } from "@/data/products-en";
import FooterEn from "@/components/en/FooterEn";

export default function EnProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/en" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-orange-400">Products</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Products</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">Product Center</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Complete range of TIG, MIG/MAG, MMA, and plasma cutting solutions for all industrial applications
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsEn.map((p) => (
            <Link
              key={p.slug}
              href={`/en/products/${p.slug}`}
              className="group block bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
