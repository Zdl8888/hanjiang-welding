"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "zsBOkX_0Rb-03YKiN";
const EMAILJS_SERVICE_ID = "service_gk4cjwt";
const EMAILJS_TEMPLATE_ID = "template_9gayfk8";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY);
      setSent(true);
    } catch {
      alert("发送失败，请稍后重试或直接电话联系我们。");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            联系我们
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            欢迎来电咨询产品信息、技术参数或索取报价，我们将竭诚为您服务
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">在线留言</h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg mb-2">提交成功！</p>
                <p className="text-gray-400 text-sm">我们将在 24 小时内回复您。</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">姓名</label>
                  <input type="text" name="from_name" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="请输入您的姓名" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                  <input type="email" name="from_email" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="请输入您的邮箱" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">电话</label>
                  <input type="tel" name="phone" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="请输入您的联系电话" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">留言</label>
                  <textarea name="message" rows={4} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none" placeholder="请输入您想咨询的内容" />
                </div>
                <button type="submit" disabled={sending} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60">
                  {sending ? "发送中..." : "提交留言"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">电话</div>
                    <div className="text-white font-medium">19228284544（上海）</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">邮箱</div>
                    <div className="text-white font-medium">2381821791@qq.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">地址</div>
                    <div className="text-white font-medium">XX省XX市XX工业区悍将焊机产业园</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-zinc-800/50 border border-zinc-700 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xs text-zinc-500">二维码待添加</span>
              </div>
              <p className="text-sm text-gray-400">扫码添加微信咨询</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
