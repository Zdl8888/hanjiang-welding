import Link from "next/link";
import { products } from "@/data/products";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "技术参数对比 | 悍将焊机全系列产品规格",
  description: "悍将焊机全系列产品核心技术参数一览表。对比氩弧焊机、二保焊机、手工焊机、等离子切割机规格参数，方便选型。CE & ISO 认证。",
};

const specKeys = [
  "输入电源",
  "额定输入容量",
  "输出电流范围",
  "额定负载持续率",
  "防护等级",
  "绝缘等级",
  "净重",
];

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">首页</Link>
            <span>/</span>
            <span className="text-orange-400">技术参数</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Specifications</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">技术参数对比</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            全系列产品核心技术参数一览，方便选型对比
          </p>
        </div>
      </section>

      {/* Spec Table */}
      <section className="pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-3 px-4 text-gray-400 font-semibold sticky left-0 bg-black z-10 min-w-[140px]">型号</th>
                {products.map((p) => (
                  <th key={p.slug} className="py-3 px-4 text-orange-400 font-semibold whitespace-nowrap">
                    <Link href={`/products/${p.slug}`} className="hover:text-orange-300 transition-colors">{p.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specKeys.map((key) => (
                <tr key={key} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4 text-gray-300 font-medium sticky left-0 bg-black z-10">{key}</td>
                  {products.map((p) => (
                    <td key={p.slug} className="py-3 px-4 text-gray-400 whitespace-nowrap">
                      {p.variants[0].specs[key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View detail CTA */}
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm mb-6">点击型号名称查看完整产品详情</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30"
          >
            查看全部产品
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
