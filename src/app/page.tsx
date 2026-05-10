"use client";

import { useState, Component, type ReactNode, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Products from "@/components/Products";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import LanguageSwitch from "@/components/LanguageSwitch";
import WhatsAppButton from "@/components/WhatsAppButton";
import InquiryModal from "@/components/InquiryModal";
import PaymentSection from "@/components/PaymentSection";

class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <WhatsAppButton />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />

      <div ref={heroRef} className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Spline 3D 背景 — 滚出视野后卸载，提升性能 */}
      <div className="absolute inset-0 z-0">
        {heroInView ? (
          <ErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-red-400">
                3D 场景加载失败，请刷新页面重试
              </div>
            }
          >
            <Spline
              scene="https://prod.spline.design/u418FuFyVBpcXItq/scene.splinecode"
              wasmPath="/wasm"
              onLoad={() => setLoading(false)}
            />
          </ErrorBoundary>
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}
      </div>

      {/* 加载动画 */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">3D 场景加载中...</span>
          </div>
        </div>
      )}

      {/* 暗色遮罩 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">悍</span>
          </div>
          <span className="text-white text-xl font-bold tracking-wider">
            悍将焊机
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
          <a href="#products" className="hover:text-orange-400 transition-colors">
            产品中心
          </a>
          <a href="#features" className="hover:text-orange-400 transition-colors">
            技术优势
          </a>
          <a href="#about" className="hover:text-orange-400 transition-colors">
            关于我们
          </a>
          <a href="#contact" className="hover:text-orange-400 transition-colors">
            联系我们
          </a>
          <a href="#payment" className="hover:text-orange-400 transition-colors">
            在线支付
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setInquiryOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
            立即咨询
          </button>
          <LanguageSwitch currentLang="zh" />
        </div>
      </nav>

      {/* 主视觉文案 */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="px-8 md:px-16 max-w-2xl">
          <div className="inline-block bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            专业电焊机制造商 · 始于 2005
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            悍将焊机
            <br />
            <span className="text-orange-400">悍动未来</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            专注高品质焊接设备研发与制造。氩弧焊、二保焊、手工焊、等离子切割 —
            全套焊接解决方案，为每一道焊缝负责。
          </p>
          <div className="flex items-center gap-4">
            <a href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30 cursor-pointer inline-block">
              查看产品
            </a>
            <a href="/specs" className="border border-gray-500 hover:border-orange-400 text-gray-300 hover:text-orange-400 px-8 py-3 rounded-lg font-semibold transition-all cursor-pointer inline-block">
              技术参数
            </a>
          </div>
          <div className="flex items-center gap-8 mt-10 text-sm text-gray-400">
            <div>
              <span className="text-orange-400 font-bold text-2xl">20+</span>
              <span className="block text-xs text-gray-500">年行业经验</span>
            </div>
            <div>
              <span className="text-orange-400 font-bold text-2xl">50+</span>
              <span className="block text-xs text-gray-500">产品型号</span>
            </div>
            <div>
              <span className="text-orange-400 font-bold text-2xl">10000+</span>
              <span className="block text-xs text-gray-500">服务客户</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-gray-500 text-xs">
        <span>向下滚动</span>
        <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-orange-400 rounded-full mt-1 animate-bounce" />
        </div>
      </div>
    </div>
    <TrustBadges />
    <div className="h-24 bg-zinc-950" />
    <Products />
    <Features />
    <About />
    <Contact />
    <PaymentSection />
    <Footer />
  </>
  );
}
