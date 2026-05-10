"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "zsBOkX_0Rb-03YKiN";
const EMAILJS_SERVICE_ID = "service_gk4cjwt";
const EMAILJS_TEMPLATE_ID = "template_9gayfk8";

interface Props {
  open: boolean;
  onClose: () => void;
  productName?: string;
  lang?: "zh" | "en";
}

export default function InquiryModal({ open, onClose, productName, lang = "zh" }: Props) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) return null;

  const t = {
    title: lang === "zh" ? "产品询盘" : "Product Inquiry",
    name: lang === "zh" ? "姓名" : "Name",
    email: lang === "zh" ? "邮箱" : "Email",
    phone: lang === "zh" ? "电话" : "Phone",
    company: lang === "zh" ? "公司" : "Company",
    message: lang === "zh" ? "留言" : "Message",
    product: lang === "zh" ? "产品" : "Product",
    submit: lang === "zh" ? "提交询盘" : "Submit Inquiry",
    sending: lang === "zh" ? "发送中..." : "Sending...",
    thanks: lang === "zh" ? "感谢您的询盘！我们将在 24 小时内回复。" : "Thank you for your inquiry! We'll reply within 24 hours.",
    error: lang === "zh" ? "发送失败，请稍后重试或直接联系我们。" : "Failed to send. Please try again or contact us directly.",
    close: lang === "zh" ? "关闭" : "Close",
    namePlaceholder: lang === "zh" ? "请输入您的姓名" : "Your name",
    emailPlaceholder: lang === "zh" ? "请输入您的邮箱" : "Your email",
    phonePlaceholder: lang === "zh" ? "请输入您的电话" : "Your phone number",
    companyPlaceholder: lang === "zh" ? "请输入您的公司名称" : "Your company name",
    messagePlaceholder: lang === "zh" ? "请输入您需要咨询的内容" : "Tell us about your requirements",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY);
      setSent(true);
    } catch {
      alert(t.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer text-xl">&times;</button>

        {sent ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg mb-2">{t.thanks}</p>
            <button onClick={onClose} className="text-orange-400 hover:text-orange-300 transition-colors text-sm cursor-pointer">{t.close}</button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-6">{t.title}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {productName && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t.product}</label>
                  <input type="text" name="product" value={productName} readOnly className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-3 text-gray-300 text-sm cursor-default" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t.name}</label>
                  <input type="text" name="from_name" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder={t.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t.email}</label>
                  <input type="email" name="from_email" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder={t.emailPlaceholder} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t.phone}</label>
                  <input type="tel" name="phone" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder={t.phonePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{t.company}</label>
                  <input type="text" name="company" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder={t.companyPlaceholder} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t.message}</label>
                <textarea name="message" rows={4} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none" placeholder={t.messagePlaceholder} />
              </div>
              <button type="submit" disabled={sending} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {sending ? t.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
