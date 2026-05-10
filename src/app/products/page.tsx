import Link from "next/link";
import { products } from "@/data/products";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">首页</Link>
            <span>/</span>
            <span className="text-orange-400">产品中心</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Products</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">产品中心</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            覆盖氩弧焊、二保焊、手工焊、等离子切割全系列，满足各类工业场景需求
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group block bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="relative h-48 bg-zinc-800/30 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-10 h-10 mx-auto mb-2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-zinc-500">图片待添加</span>
                </div>
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

      <Footer />
    </div>
  );
}
