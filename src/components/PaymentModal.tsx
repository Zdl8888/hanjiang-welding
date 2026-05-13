"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";

const PAYPAL_CLIENT_ID = "AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT";

type PaymentMethod = "paypal" | "wechat" | "alipay" | "wire";
type PaymentStatus = "idle" | "loading" | "waiting" | "paid" | "closed" | "error";

interface Props {
  lang?: "zh" | "en";
  productName: string;
  variantName: string;
  prefillAmount?: number;
  onClose: () => void;
}

const t = {
  modalTitle: { zh: "在线支付", en: "Online Payment" },
  product: { zh: "产品", en: "Product" },
  spec: { zh: "规格", en: "Variant" },
  amount: { zh: "支付金额", en: "Amount" },
  amountPlaceholder: { zh: "请输入金额", en: "Enter amount" },
  currency: { zh: "币种", en: "Currency" },
  invalidAmount: { zh: "请输入有效金额", en: "Please enter a valid amount" },
  close: { zh: "关闭", en: "Close" },
  paypalTitle: { zh: "PayPal 在线支付", en: "PayPal Checkout" },
  paypalDesc: { zh: "支持全球主流信用卡和借记卡。", en: "Accepts major credit/debit cards." },
  paypalConfig: { zh: "配置提示", en: "Setup Required" },
  paypalConfigMsg: { zh: "请前往 developer.paypal.com 获取你的 Client ID 后替换代码中的示例值。", en: "Go to developer.paypal.com to get your Client ID." },
  paypalSdkError: { zh: "PayPal SDK 加载失败，请刷新重试", en: "PayPal SDK failed to load. Please refresh." },
  paypalSuccess: { zh: "支付成功！感谢您的付款，{name}。我们将在 24 小时内处理您的订单。", en: "Payment successful! Thank you, {name}. We will process your order within 24 hours." },
  paypalError: { zh: "支付失败：{msg}", en: "Payment failed: {msg}" },
  paypalCancel: { zh: "您已取消支付。", en: "Payment cancelled." },
  wechatTitle: { zh: "微信支付", en: "WeChat Pay" },
  wechatDesc: { zh: "微信扫码支付。", en: "Scan QR code with WeChat to pay." },
  wechatGenerating: { zh: "正在生成支付二维码...", en: "Generating payment QR code..." },
  wechatButton: { zh: "使用微信支付", en: "Pay with WeChat" },
  wechatScanHint: { zh: "请使用微信扫描二维码完成支付", en: "Scan the QR code with WeChat to pay" },
  wechatWaiting: { zh: "等待支付中...", en: "Waiting for payment..." },
  wechatPaid: { zh: "支付成功！我们将在 24 小时内处理您的订单。", en: "Payment successful! We will process your order within 24 hours." },
  wechatExpired: { zh: "二维码已过期，请重新下单", en: "QR code expired. Please try again." },
  wechatCancel: { zh: "取消支付", en: "Cancel Payment" },
  alipayTitle: { zh: "支付宝", en: "Alipay" },
  alipayDesc: { zh: "支付宝扫码支付。", en: "Scan QR code with Alipay to pay." },
  alipayGenerating: { zh: "正在生成支付二维码...", en: "Generating payment QR code..." },
  alipayButton: { zh: "使用支付宝支付", en: "Pay with Alipay" },
  alipayScanHint: { zh: "请使用支付宝扫描二维码完成支付", en: "Scan the QR code with Alipay to pay" },
  alipayWaiting: { zh: "等待支付中...", en: "Waiting for payment..." },
  alipayPaid: { zh: "支付成功！我们将在 24 小时内处理您的订单。", en: "Payment successful! We will process your order within 24 hours." },
  alipayExpired: { zh: "二维码已过期，请重新下单", en: "QR code expired. Please try again." },
  alipayCancel: { zh: "取消支付", en: "Cancel Payment" },
  wireTitle: { zh: "银行电汇 (T/T)", en: "Bank Wire Transfer (T/T)" },
  wireDesc: { zh: "适用于大额订单。", en: "For large orders." },
  wechatUnavailable: { zh: "微信支付暂不可用", en: "WeChat Pay is currently unavailable" },
  alipayUnavailable: { zh: "支付宝支付暂不可用", en: "Alipay is currently unavailable" },
  networkError: { zh: "网络错误，请稍后重试", en: "Network error. Please try again." },
  securityNote: { zh: "所有支付均通过加密通道处理，我们不会存储您的支付信息。", en: "All payments are processed through encrypted channels." },
  orderId: { zh: "订单号", en: "Order ID" },
  arrivalTime: { zh: "1-5 个工作日", en: "1-5 business days" },
  beneficiary: { zh: "收款方", en: "Beneficiary" },
  account: { zh: "银行账号", en: "Account Number" },
  bank: { zh: "开户银行", en: "Bank" },
  swift: { zh: "SWIFT 代码", en: "SWIFT Code" },
  bankAddress: { zh: "银行地址", en: "Bank Address" },
  arrival: { zh: "到账时间", en: "Arrival Time" },
  wireNote: { zh: "提示：汇款完成后请将银行水单发送至 2381821791@qq.com。", en: "Note: Please email the bank receipt to 2381821791@qq.com." },
};

export default function PaymentModal({ lang = "zh", productName, variantName, prefillAmount, onClose }: Props) {
  const s = (key: keyof typeof t, vars?: Record<string, string>) => {
    let text = t[key]?.[lang] ?? t[key]?.zh ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
    return text;
  };

  const exchangeRates: Record<string, number> = { USD: 1, EUR: 0.92, CNY: 7.2, GBP: 0.79 };

  const description = `HanJang ${productName} - ${variantName}`;
  const [method, setMethod] = useState<PaymentMethod>("paypal");
  const [amount, setAmount] = useState(prefillAmount ? String(prefillAmount) : "");
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = useCallback((newCurrency: string) => {
    const fromRate = exchangeRates[currency];
    const toRate = exchangeRates[newCurrency];
    if (amount && fromRate && toRate) {
      const usdValue = parseFloat(amount) / fromRate;
      setAmount((usdValue * toRate).toFixed(2));
    }
    setCurrency(newCurrency);
  }, [currency, amount]);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const paypalRef = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);

  // 二维码支付
  const [qrOrder, setQrOrder] = useState<{ url: string; orderId: string } | null>(null);
  const [qrStatus, setQrStatus] = useState<PaymentStatus>("idle");
  const [qrType, setQrType] = useState<"wechat" | "alipay" | null>(null);
  const [payLoading, setPayLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }, []);

  const startPolling = useCallback((type: "wechat" | "alipay", orderId: string) => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/pay/status?orderId=${orderId}&type=${type}`);
        const data = await res.json();
        if (data.status === "paid") { stopPolling(); setQrStatus("paid"); }
        else if (data.status === "closed") { stopPolling(); setQrStatus("closed"); }
        else if (data.status === "error") { stopPolling(); setQrStatus("error"); }
      } catch { /* continue polling */ }
    }, 3000);
  }, [stopPolling]);

  useEffect(() => { return () => stopPolling(); }, [stopPolling]);

  // PayPal SDK
  useEffect(() => {
    if (method !== "paypal" || paypalLoaded || typeof window === "undefined") return;
    if (document.getElementById("paypal-sdk-modal")) return;
    const script = document.createElement("script");
    script.id = "paypal-sdk-modal";
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=${currency}`;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => setMessage({ type: "error", text: s("paypalSdkError") });
    document.body.appendChild(script);
    return () => {};
  }, [method, paypalLoaded, currency]);

  // PayPal 按钮
  useEffect(() => {
    if (!paypalLoaded || !paypalRef.current || paypalRendered.current) return;
    const win = window as unknown as { paypal?: { Buttons?: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void }; close: () => void } };
    if (!win.paypal?.Buttons) return;
    paypalRendered.current = true;
    win.paypal.Buttons({
      createOrder: (_data: unknown, actions: { order: { create: (cfg: Record<string, unknown>) => Promise<string> } }) => {
        if (!amount || parseFloat(amount) <= 0) { setMessage({ type: "error", text: s("invalidAmount") }); return Promise.reject("no amount"); }
        return actions.order.create({ purchase_units: [{ amount: { currency_code: currency, value: amount }, description }] });
      },
      onApprove: (_data: unknown, actions: { order: { capture: () => Promise<{ payer: { name: { given_name: string } } }> } }) => {
        return actions.order.capture().then((details) => {
          setMessage({ type: "success", text: s("paypalSuccess", { name: details.payer.name.given_name }) });
        });
      },
      onError: (err: Error) => setMessage({ type: "error", text: s("paypalError", { msg: err.message || "unknown" }) }),
      onCancel: () => setMessage({ type: "info", text: s("paypalCancel") }),
      style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal", height: 48 },
    }).render(paypalRef.current);
  }, [paypalLoaded, amount, currency]);

  // 微信 / 支付宝 支付
  const handleQrPay = useCallback(async (type: "wechat" | "alipay") => {
    if (!amount || parseFloat(amount) <= 0) { setMessage({ type: "error", text: s("invalidAmount") }); return; }
    setPayLoading(true);
    setQrStatus("loading");
    setQrType(type);
    setMessage(null);
    setQrOrder(null);
    stopPolling();
    try {
      const res = await fetch(`/api/pay/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount), currency: currency === "USD" ? "CNY" : currency, description }),
      });
      const data = await res.json();
      const payUrl = data.codeUrl || data.qrCode;
      if (payUrl) {
        setQrOrder({ url: payUrl, orderId: data.orderId });
        setQrStatus("waiting");
        startPolling(type, data.orderId);
      } else {
        setQrStatus("error");
        setMessage({ type: "error", text: data.error || s(`${type}Unavailable` as keyof typeof t) });
      }
    } catch {
      setQrStatus("error");
      setMessage({ type: "error", text: s("networkError") });
    } finally {
      setPayLoading(false);
    }
  }, [amount, currency, stopPolling, startPolling]);

  const resetQr = useCallback(() => { setQrOrder(null); setQrStatus("idle"); setQrType(null); stopPolling(); }, [stopPolling]);

  const tabs: { key: PaymentMethod; label: string; icon: string }[] = [
    { key: "paypal", label: "PayPal", icon: "P" },
    { key: "wechat", label: lang === "zh" ? "微信支付" : "WeChat Pay", icon: lang === "zh" ? "微" : "W" },
    { key: "alipay", label: lang === "zh" ? "支付宝" : "Alipay", icon: lang === "zh" ? "支" : "A" },
    { key: "wire", label: lang === "zh" ? "银行电汇" : "Wire Transfer", icon: lang === "zh" ? "汇" : "T" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-white">{s("modalTitle")}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {s("product")}: {productName} · {s("spec")}: {variantName}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          {/* 金额输入 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1.5">{s("amount")}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setMessage(null); }}
                placeholder={s("amountPlaceholder")}
                min="0" step="0.01"
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div className="w-20">
              <label className="block text-sm text-gray-400 mb-1.5">{s("currency")}</label>
              <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-2 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50 cursor-pointer">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CNY">CNY</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          {/* 支付方式 */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {tabs.map((tab) => (
              <button key={tab.key}
                onClick={() => { setMethod(tab.key); setMessage(null); if (qrStatus !== "idle") resetQr(); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  method === tab.key ? "bg-orange-500 text-white" : "bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                }`}>
                <span className={`w-5 h-5 rounded text-xs flex items-center justify-center font-bold ${method === tab.key ? "bg-white/20" : "bg-zinc-800"}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 支付内容 */}
          <div>
            {/* PayPal */}
            {method === "paypal" && (
              <div>
                <h3 className="text-white font-semibold mb-1">{s("paypalTitle")}</h3>
                <p className="text-sm text-gray-400 mb-4">{s("paypalDesc")}</p>
                {PAYPAL_CLIENT_ID === "AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT" ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-400">
                    <strong>{s("paypalConfig")}：</strong>{s("paypalConfigMsg")}
                  </div>
                ) : (
                  <div ref={paypalRef} className="min-h-[150px]" />
                )}
              </div>
            )}

            {/* 微信 */}
            {method === "wechat" && qrStatus !== "paid" && qrStatus !== "closed" && (
              <div>
                <h3 className="text-white font-semibold mb-1">{s("wechatTitle")}</h3>

                {qrStatus === "idle" && (
                  <>
                    <p className="text-sm text-gray-400 mb-4">{s("wechatDesc")}</p>
                    <button onClick={() => handleQrPay("wechat")} disabled={payLoading}
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2">
                      {payLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{s("wechatGenerating")}</> : s("wechatButton")}
                    </button>
                  </>
                )}

                {qrStatus === "loading" && (
                  <div className="py-8 text-center text-gray-400">
                    <span className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin inline-block mr-2" />
                    {s("wechatGenerating")}
                  </div>
                )}

                {qrStatus === "waiting" && qrOrder && qrType === "wechat" && (
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-xl inline-block mb-3">
                      <QRCodeSVG value={qrOrder.url} size={180} level="M" />
                    </div>
                    <p className="text-gray-300 text-sm mb-1">{s("wechatScanHint")}</p>
                    <p className="text-gray-500 text-xs mb-3">{s("orderId")}: {qrOrder.orderId}</p>
                    <div className="flex items-center justify-center gap-2 text-orange-400 text-sm mb-3">
                      <span className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                      {s("wechatWaiting")}
                    </div>
                    <button onClick={resetQr} className="text-gray-500 hover:text-gray-300 text-sm transition-colors cursor-pointer">{s("wechatCancel")}</button>
                  </div>
                )}

                {qrStatus === "error" && (
                  <div className="text-center py-4">
                    <p className="text-red-400 mb-3 text-sm">{message?.text || s("wechatUnavailable")}</p>
                    <button onClick={() => handleQrPay("wechat")} className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer">{s("wechatButton")}</button>
                  </div>
                )}
              </div>
            )}

            {method === "wechat" && qrStatus === "paid" && (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-green-400 font-medium">{s("wechatPaid")}</p>
              </div>
            )}

            {method === "wechat" && qrStatus === "closed" && (
              <div className="text-center py-4">
                <p className="text-yellow-400 mb-3 text-sm">{s("wechatExpired")}</p>
                <button onClick={resetQr} className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer">{s("wechatButton")}</button>
              </div>
            )}

            {/* 支付宝 */}
            {method === "alipay" && qrStatus !== "paid" && qrStatus !== "closed" && (
              <div>
                <h3 className="text-white font-semibold mb-1">{s("alipayTitle")}</h3>

                {qrStatus === "idle" && (
                  <>
                    <p className="text-sm text-gray-400 mb-4">{s("alipayDesc")}</p>
                    <button onClick={() => handleQrPay("alipay")} disabled={payLoading}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2">
                      {payLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{s("alipayGenerating")}</> : s("alipayButton")}
                    </button>
                  </>
                )}

                {qrStatus === "loading" && (
                  <div className="py-8 text-center text-gray-400">
                    <span className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin inline-block mr-2" />
                    {s("alipayGenerating")}
                  </div>
                )}

                {qrStatus === "waiting" && qrOrder && qrType === "alipay" && (
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-xl inline-block mb-3">
                      <QRCodeSVG value={qrOrder.url} size={180} level="M" />
                    </div>
                    <p className="text-gray-300 text-sm mb-1">{s("alipayScanHint")}</p>
                    <p className="text-gray-500 text-xs mb-3">{s("orderId")}: {qrOrder.orderId}</p>
                    <div className="flex items-center justify-center gap-2 text-orange-400 text-sm mb-3">
                      <span className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                      {s("alipayWaiting")}
                    </div>
                    <button onClick={resetQr} className="text-gray-500 hover:text-gray-300 text-sm transition-colors cursor-pointer">{s("alipayCancel")}</button>
                  </div>
                )}

                {qrStatus === "error" && (
                  <div className="text-center py-4">
                    <p className="text-red-400 mb-3 text-sm">{message?.text || s("alipayUnavailable")}</p>
                    <button onClick={() => handleQrPay("alipay")} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer">{s("alipayButton")}</button>
                  </div>
                )}
              </div>
            )}

            {method === "alipay" && qrStatus === "paid" && (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-green-400 font-medium">{s("alipayPaid")}</p>
              </div>
            )}

            {method === "alipay" && qrStatus === "closed" && (
              <div className="text-center py-4">
                <p className="text-yellow-400 mb-3 text-sm">{s("alipayExpired")}</p>
                <button onClick={resetQr} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer">{s("alipayButton")}</button>
              </div>
            )}

            {/* 银行电汇 */}
            {method === "wire" && (
              <div>
                <h3 className="text-white font-semibold mb-1">{s("wireTitle")}</h3>
                <p className="text-sm text-gray-400 mb-3">{s("wireDesc")}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-zinc-800"><span className="text-gray-400">{s("beneficiary")}</span><span className="text-white font-medium">ZHAO DONGLIANG</span></div>
                  <div className="flex justify-between py-2 border-b border-zinc-800"><span className="text-gray-400">{s("account")}</span><span className="text-white font-medium">6215 5804 0900 7390 361</span></div>
                  <div className="flex justify-between py-2 border-b border-zinc-800"><span className="text-gray-400">{s("bank")}</span><span className="text-white font-medium text-right max-w-[200px]">ICBC</span></div>
                  <div className="flex justify-between py-2 border-b border-zinc-800"><span className="text-gray-400">{s("swift")}</span><span className="text-white font-medium">ICBKCNBJ</span></div>
                  <div className="flex justify-between py-2"><span className="text-gray-400">{s("arrival")}</span><span className="text-white font-medium">{s("arrivalTime")}</span></div>
                </div>
                <div className="mt-3 p-2 bg-zinc-800/50 rounded-lg text-xs text-gray-400">{s("wireNote")}</div>
              </div>
            )}
          </div>

          {/* 消息提示 */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" :
              message.type === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" :
              "bg-blue-500/10 border border-blue-500/30 text-blue-400"
            }`}>{message.text}</div>
          )}

          {/* 安全提示 */}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            {s("securityNote")}
          </div>
        </div>
      </div>
    </div>
  );
}
