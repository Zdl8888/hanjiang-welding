"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "zsBOkX_0Rb-03YKiN";
const EMAILJS_SERVICE_ID = "service_gk4cjwt";
const EMAILJS_TEMPLATE_ID = "template_9gayfk8";

export default function ContactEn() {
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
      alert("Failed to send. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Contact us for product information, technical specifications, or a quotation. We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Send Inquiry</h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg mb-2">Submitted!</p>
                <p className="text-gray-400 text-sm">We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" name="from_name" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" name="from_email" required className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="Your email" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" name="phone" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea name="message" rows={4} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none" placeholder="Tell us about your requirements" />
                </div>
                <button type="submit" disabled={sending} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60">
                  {sending ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">Phone</div>
                    <div className="text-white font-medium">+86 19228284544 (Shanghai)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">Email</div>
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
                    <div className="text-sm text-gray-400 mb-0.5">Address</div>
                    <div className="text-white font-medium">HanJang Welding Industrial Park, XX City, XX Province, China</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-zinc-800/50 border border-zinc-700 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xs text-zinc-500">QR Code Coming Soon</span>
              </div>
              <p className="text-sm text-gray-400">Scan to add on WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
