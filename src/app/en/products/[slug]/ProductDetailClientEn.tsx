"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProductBySlugEn } from "@/data/products-en";

export default function ProductDetailClientEn({ slug }: { slug: string }) {
  const router = useRouter();
  const product = getProductBySlugEn(slug);
  const [toast, setToast] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The requested product could not be found.</p>
          <Link href="/en" className="text-orange-400 hover:text-orange-300 transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

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
          <Link href="/en" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/#products" className="hover:text-orange-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="aspect-square rounded-xl border border-zinc-800 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">{t}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{product.name}</h1>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {product.fullDesc.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => showToast("Customer support coming soon!")} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-lg font-semibold transition-colors cursor-pointer">
                Inquiry Now
              </button>
              <button onClick={() => showToast("Payment coming soon! WeChat Pay, Alipay, PayPal will be supported.")} className="flex-1 border border-zinc-600 hover:border-orange-400 text-gray-300 hover:text-orange-400 py-3.5 rounded-lg font-semibold transition-all cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-orange-500 rounded-full" />
            Specifications
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-transparent" : "bg-zinc-900/30"}>
                    <td className="px-6 py-3.5 text-sm text-gray-400 w-1/3 border-r border-zinc-800">{key}</td>
                    <td className="px-6 py-3.5 text-sm text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-orange-500 rounded-full" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((f, i) => (
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
          <button onClick={() => router.push("/en")} className="text-gray-500 hover:text-white transition-colors text-sm cursor-pointer">← Back to Home</button>
          <button onClick={() => showToast("Customer support coming soon!")} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer">Inquiry Now</button>
          <button onClick={() => showToast("Payment coming soon! WeChat Pay, Alipay, PayPal will be supported.")} className="border border-zinc-600 hover:border-orange-400 text-gray-300 hover:text-orange-400 px-8 py-3 rounded-lg font-semibold transition-all cursor-pointer">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
