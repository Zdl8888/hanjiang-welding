"use client";

import Link from "next/link";
import { productsEn } from "@/data/products-en";

export default function ProductsEn() {
  return (
    <section id="products" className="relative py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
            Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Our Products
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Full range of TIG, MIG/MAG, MMA, and plasma cutting solutions for every industrial need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsEn.map((p) => (
            <Link
              key={p.slug}
              href={`/en/products/${p.slug}`}
              className="group block bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
