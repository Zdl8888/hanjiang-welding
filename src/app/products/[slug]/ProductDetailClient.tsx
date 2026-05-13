"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProductBySlug } from "@/data/products";
import type { Variant } from "@/data/products";
import PaymentModal from "@/components/PaymentModal";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const product = getProductBySlug(slug);
  const [activeVariant, setActiveVariant] = useState(0);
  const [toast, setToast] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">产品未找到</h1>
          <p className="text-gray-400 mb-6">未找到对应的产品信息</p>
          <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const variant: Variant = product.variants[activeVariant];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="min-h-screen bg-black">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-zinc-700 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-pulse">
          {toast}
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-6 md:px-16 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            首页
          </Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-orange-400 transition-colors">
            产品中心
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="aspect-square rounded-xl border border-zinc-800 overflow-hidden">
            <img
              src={variant.image}
              alt={variant.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {product.name}
            </h1>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {product.fullDesc.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => showToast("客服功能即将上线，敬请期待！")}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                咨询客服
              </button>
              <button
                onClick={() => setShowPayment(true)}
                className="flex-1 border border-zinc-600 hover:border-orange-400 text-gray-300 hover:text-orange-400 py-3.5 rounded-lg font-semibold transition-all cursor-pointer"
              >
                {variant.price ? `立即购买 - $${variant.price.toLocaleString()} USD` : "立即购买"}
              </button>
            </div>
          </div>
        </div>

        {/* 选择规格 */}
        {product.variants.length > 1 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-orange-500 rounded-full" />
              选择规格
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => setActiveVariant(i)}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                    i === activeVariant
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-zinc-900/50 border border-zinc-700 text-gray-400 hover:border-orange-500/50 hover:text-white"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 规格参数 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-orange-500 rounded-full" />
            规格参数 — {variant.name}
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(variant.specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-transparent" : "bg-zinc-900/30"}>
                    <td className="px-6 py-3.5 text-sm text-gray-400 w-1/3 border-r border-zinc-800">
                      {key}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 产品亮点 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-orange-500 rounded-full" />
            产品亮点 — {variant.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {variant.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-zinc-800">
          <button onClick={() => router.push("/")} className="text-gray-500 hover:text-white transition-colors text-sm cursor-pointer">
            ← 返回首页
          </button>
          <button onClick={() => showToast("客服功能即将上线，敬请期待！")} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
            咨询客服
          </button>
          <button onClick={() => setShowPayment(true)} className="border border-zinc-600 hover:border-orange-400 text-gray-300 hover:text-orange-400 px-8 py-3 rounded-lg font-semibold transition-all cursor-pointer">
            {variant.price ? `立即购买 - $${variant.price.toLocaleString()} USD` : "立即购买"}
          </button>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          lang="zh"
          productName={product.name}
          variantName={variant.name}
          prefillAmount={variant.price}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
