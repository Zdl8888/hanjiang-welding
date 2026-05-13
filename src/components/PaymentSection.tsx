"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";

const PAYPAL_CLIENT_ID = "AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT"; // 替换为你的 PayPal Client ID

type PaymentMethod = "paypal" | "wechat" | "alipay" | "wire";
type PaymentStatus = "idle" | "loading" | "waiting" | "paid" | "closed" | "error";

interface Props {
  lang?: "zh" | "en";
}

const t = {
  paymentTitle: { zh: "在线支付", en: "Online Payment" },
  paymentDesc: { zh: "支持多种支付方式，安全、便捷。大额订单推荐银行电汇。", en: "Multiple payment methods supported. Bank wire recommended for large orders." },
  amount: { zh: "支付金额", en: "Amount" },
  amountPlaceholder: { zh: "请输入金额", en: "Enter amount" },
  currency: { zh: "币种", en: "Currency" },
  invalidAmount: { zh: "请输入有效金额", en: "Please enter a valid amount" },
  paypalTitle: { zh: "PayPal 在线支付", en: "PayPal Checkout" },
  paypalDesc: { zh: "支持全球主流信用卡和借记卡，PayPal 余额支付。安全加密，买家保护。", en: "Accepts major credit/debit cards and PayPal balance. Encrypted and secure with buyer protection." },
  paypalConfig: { zh: "配置提示", en: "Setup Required" },
  paypalConfigMsg: { zh: "请前往 developer.paypal.com 登录你的 PayPal 账号，创建应用获取 Client ID，然后替换代码中的 AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT。", en: "Go to developer.paypal.com, log in with your PayPal account, create an app to get your Client ID, then replace AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT in the code." },
  paypalSdkError: { zh: "PayPal SDK 加载失败，请刷新重试", en: "PayPal SDK failed to load. Please refresh." },
  paypalSuccess: { zh: "支付成功！感谢您的付款，{name}。我们将在 24 小时内处理您的订单。", en: "Payment successful! Thank you, {name}. We will process your order within 24 hours." },
  paypalError: { zh: "支付失败：{msg}", en: "Payment failed: {msg}" },
  paypalCancel: { zh: "您已取消支付。如需帮助请联系我们。", en: "Payment cancelled. Contact us if you need help." },
  wechatTitle: { zh: "微信支付", en: "WeChat Pay" },
  wechatDesc: { zh: "支持微信余额、绑定银行卡支付。点击下方按钮跳转至微信支付页面完成付款。", en: "WeChat Pay balance and linked bank cards. Click below to proceed to WeChat Pay." },
  wechatGenerating: { zh: "正在生成支付二维码...", en: "Generating payment QR code..." },
  wechatButton: { zh: "使用微信支付", en: "Pay with WeChat" },
  wechatUnavailable: { zh: "微信支付暂不可用", en: "WeChat Pay is currently unavailable" },
  wechatScanHint: { zh: "请使用微信扫描二维码完成支付", en: "Scan the QR code with WeChat to pay" },
  wechatOrderId: { zh: "订单号", en: "Order ID" },
  wechatWaiting: { zh: "等待支付中...", en: "Waiting for payment..." },
  wechatPaid: { zh: "支付成功！我们将在 24 小时内处理您的订单。", en: "Payment successful! We will process your order within 24 hours." },
  wechatExpired: { zh: "二维码已过期，请重新下单", en: "QR code expired. Please try again." },
  wechatCancel: { zh: "取消支付", en: "Cancel Payment" },
  alipayTitle: { zh: "支付宝", en: "Alipay" },
  alipayDesc: { zh: "支持支付宝余额、花呗、绑定银行卡支付。点击下方按钮跳转至支付宝收银台完成付款。", en: "Alipay balance, Huabei, and linked bank cards. Click below to proceed to Alipay checkout." },
  alipayGenerating: { zh: "正在生成支付二维码...", en: "Generating payment QR code..." },
  alipayButton: { zh: "使用支付宝支付", en: "Pay with Alipay" },
  alipayUnavailable: { zh: "支付宝支付暂不可用", en: "Alipay is currently unavailable" },
  alipayScanHint: { zh: "请使用支付宝扫描二维码完成支付", en: "Scan the QR code with Alipay to pay" },
  alipayWaiting: { zh: "等待支付中...", en: "Waiting for payment..." },
  alipayPaid: { zh: "支付成功！我们将在 24 小时内处理您的订单。", en: "Payment successful! We will process your order within 24 hours." },
  alipayExpired: { zh: "二维码已过期，请重新下单", en: "QR code expired. Please try again." },
  alipayCancel: { zh: "取消支付", en: "Cancel Payment" },
  wireTitle: { zh: "银行电汇 (T/T)", en: "Bank Wire Transfer (T/T)" },
  wireDesc: { zh: "适用于大额订单（建议 $1,000 以上）。买家通过银行直接将款项汇至我方账户，安全可靠，手续费低。", en: "For large orders ($1,000+ recommended). Buyer transfers funds directly to our account. Secure with low fees." },
  beneficiary: { zh: "收款方", en: "Beneficiary" },
  account: { zh: "银行账号", en: "Account Number" },
  bank: { zh: "开户银行", en: "Bank" },
  swift: { zh: "SWIFT 代码", en: "SWIFT Code" },
  bankAddress: { zh: "银行地址", en: "Bank Address" },
  arrival: { zh: "到账时间", en: "Arrival Time" },
  arrivalTime: { zh: "1-5 个工作日", en: "1-5 business days" },
  wireNote: { zh: "提示：汇款完成后请将银行水单发送至 2381821791@qq.com，我们将尽快确认并安排发货。", en: "Note: Please email the bank receipt to 2381821791@qq.com after transfer. We will confirm and arrange shipment promptly." },
  networkError: { zh: "网络错误，请稍后重试", en: "Network error. Please try again." },
  securityNote: { zh: "所有支付均通过加密通道处理，我们不会存储您的支付信息。", en: "All payments are processed through encrypted channels. We do not store your payment information." },
  wechatNotConfigured: { zh: "微信支付尚未配置。请先申请微信支付商户号并填入密钥。", en: "WeChat Pay is not yet configured. Please obtain a WeChat Pay merchant account first." },
  alipayNotConfigured: { zh: "支付宝支付尚未配置。请先申请支付宝商户号并填入密钥。", en: "Alipay is not yet configured. Please obtain an Alipay merchant account first." },
  wechatPending: { zh: "微信支付后端待实现。请配置商户信息后完成开发。", en: "WeChat Pay backend pending. Please configure merchant credentials." },
  alipayPending: { zh: "支付宝支付后端待实现。请配置商户信息后完成开发。", en: "Alipay backend pending. Please configure merchant credentials." },
};

export default function PaymentSection({ lang = "zh" }: Props) {
  const s = (key: keyof typeof t, vars?: Record<string, string>) => {
    let text = t[key]?.[lang] ?? t[key]?.zh ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, v);
      }
    }
    return text;
  };
  const [method, setMethod] = useState<PaymentMethod>("paypal");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [alipayLoading, setAlipayLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const paypalRef = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);

  // 二维码支付状态
  const [wechatOrder, setWechatOrder] = useState<{ codeUrl: string; orderId: string } | null>(null);
  const [alipayOrder, setAlipayOrder] = useState<{ qrCode: string; orderId: string } | null>(null);
  const [wechatStatus, setWechatStatus] = useState<PaymentStatus>("idle");
  const [alipayStatus, setAlipayStatus] = useState<PaymentStatus>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 清理轮询
  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // 轮询支付状态
  const startPolling = useCallback((type: "wechat" | "alipay", orderId: string) => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/pay/status?orderId=${orderId}&type=${type}`);
        const data = await res.json();
        if (data.status === "paid") {
          stopPolling();
          if (type === "wechat") setWechatStatus("paid");
          else setAlipayStatus("paid");
        } else if (data.status === "closed") {
          stopPolling();
          if (type === "wechat") setWechatStatus("closed");
          else setAlipayStatus("closed");
        } else if (data.status === "error") {
          stopPolling();
          if (type === "wechat") setWechatStatus("error");
          else setAlipayStatus("error");
        }
      } catch {
        // 网络错误时不改变状态，继续轮询
      }
    }, 3000);
  }, [stopPolling]);

  // 组件卸载时清理
  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  // 加载 PayPal SDK
  useEffect(() => {
    if (method !== "paypal" || paypalLoaded || typeof window === "undefined") return;
    const scriptId = "paypal-sdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=${currency}`;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => setMessage({ type: "error", text: s("paypalSdkError") });
    document.body.appendChild(script);

    return () => {};
  }, [method, paypalLoaded, currency, lang]);

  // 渲染 PayPal 按钮
  useEffect(() => {
    if (!paypalLoaded || !paypalRef.current || paypalRendered.current) return;

    const win = window as unknown as { paypal?: { Buttons?: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void }; close: () => void } };
    if (!win.paypal?.Buttons) return;

    paypalRendered.current = true;

    win.paypal.Buttons({
      createOrder: (_data: unknown, actions: { order: { create: (cfg: Record<string, unknown>) => Promise<string> } }) => {
        if (!amount || parseFloat(amount) <= 0) {
          setMessage({ type: "error", text: s("invalidAmount") });
          return Promise.reject("no amount");
        }
        return actions.order.create({
          purchase_units: [{
            amount: { currency_code: currency, value: amount },
            description: "HanJang Welding Machine",
          }],
        });
      },
      onApprove: (_data: unknown, actions: { order: { capture: () => Promise<{ payer: { name: { given_name: string } } }> } }) => {
        return actions.order.capture().then((details) => {
          setMessage({ type: "success", text: s("paypalSuccess", { name: details.payer.name.given_name }) });
        });
      },
      onError: (err: Error) => {
        setMessage({ type: "error", text: s("paypalError", { msg: err.message || "unknown" }) });
      },
      onCancel: () => {
        setMessage({ type: "info", text: s("paypalCancel") });
      },
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
        height: 48,
      },
    }).render(paypalRef.current);
  }, [paypalLoaded, amount, currency, lang]);

  // 微信支付（获取二维码）
  const handleWechatPay = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: s("invalidAmount") });
      return;
    }
    setWechatLoading(true);
    setWechatStatus("loading");
    setMessage(null);
    setWechatOrder(null);
    stopPolling();
    try {
      const res = await fetch("/api/pay/wechat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount), currency: currency === "USD" ? "CNY" : currency, description: "HanJang Welding Machine Order" }),
      });
      const data = await res.json();
      if (data.codeUrl) {
        setWechatOrder({ codeUrl: data.codeUrl, orderId: data.orderId });
        setWechatStatus("waiting");
        startPolling("wechat", data.orderId);
      } else {
        setWechatStatus("error");
        setMessage({ type: "error", text: data.error || s("wechatUnavailable") });
      }
    } catch {
      setWechatStatus("error");
      setMessage({ type: "error", text: s("networkError") });
    } finally {
      setWechatLoading(false);
    }
  }, [amount, currency, lang, stopPolling, startPolling]);

  // 支付宝支付（获取二维码）
  const handleAlipay = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: s("invalidAmount") });
      return;
    }
    setAlipayLoading(true);
    setAlipayStatus("loading");
    setMessage(null);
    setAlipayOrder(null);
    stopPolling();
    try {
      const res = await fetch("/api/pay/alipay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount), currency: currency === "USD" ? "CNY" : currency, description: "HanJang Welding Machine Order" }),
      });
      const data = await res.json();
      if (data.qrCode) {
        setAlipayOrder({ qrCode: data.qrCode, orderId: data.orderId });
        setAlipayStatus("waiting");
        startPolling("alipay", data.orderId);
      } else {
        setAlipayStatus("error");
        setMessage({ type: "error", text: data.error || s("alipayUnavailable") });
      }
    } catch {
      setAlipayStatus("error");
      setMessage({ type: "error", text: s("networkError") });
    } finally {
      setAlipayLoading(false);
    }
  }, [amount, currency, lang, stopPolling, startPolling]);

  const resetWechat = useCallback(() => {
    setWechatOrder(null);
    setWechatStatus("idle");
    stopPolling();
  }, [stopPolling]);

  const resetAlipay = useCallback(() => {
    setAlipayOrder(null);
    setAlipayStatus("idle");
    stopPolling();
  }, [stopPolling]);

  const tabs: { key: PaymentMethod; label: string; icon: string }[] = [
    { key: "paypal", label: "PayPal", icon: "P" },
    { key: "wechat", label: lang === "zh" ? "微信支付" : "WeChat Pay", icon: lang === "zh" ? "微" : "W" },
    { key: "alipay", label: lang === "zh" ? "支付宝" : "Alipay", icon: lang === "zh" ? "支" : "A" },
    { key: "wire", label: lang === "zh" ? "银行电汇" : "Wire Transfer", icon: lang === "zh" ? "汇" : "T" },
  ];

  return (
    <section id="payment" className="relative py-24 px-6 md:px-16 bg-zinc-950">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
            Payment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            {s("paymentTitle")}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {s("paymentDesc")}
          </p>
        </div>

        {/* 金额输入 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">{s("amount")}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setMessage(null); }}
                placeholder={s("amountPlaceholder")}
                min="0"
                step="0.01"
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm text-gray-400 mb-2">{s("currency")}</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CNY">CNY</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>

        {/* 支付方式选择 */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setMethod(tab.key); setMessage(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                method === tab.key
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                method === tab.key ? "bg-white/20" : "bg-zinc-800"
              }`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 支付操作区 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          {method === "paypal" && (
            <div>
              <h3 className="text-white font-semibold mb-4">{s("paypalTitle")}</h3>
              <p className="text-sm text-gray-400 mb-6">{s("paypalDesc")}</p>
              {PAYPAL_CLIENT_ID === "AT9aWe1R1cEUC2iSAe3h2AhJNKApph-e249Obdp2MX5qibX2cv_92ulZ909QoU3MKoM0frXPwdb9QdpT" ? (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm text-yellow-400">
                  <strong>{s("paypalConfig")}：</strong>{s("paypalConfigMsg")}
                </div>
              ) : (
                <div ref={paypalRef} className="min-h-[150px]" />
              )}
            </div>
          )}

          {method === "wechat" && (
            <div>
              <h3 className="text-white font-semibold mb-4">{s("wechatTitle")}</h3>

              {/* 已支付成功 */}
              {wechatStatus === "paid" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-400 font-medium">{s("wechatPaid")}</p>
                </div>
              )}

              {/* 二维码已过期 */}
              {wechatStatus === "closed" && (
                <div className="text-center py-6">
                  <p className="text-yellow-400 mb-4">{s("wechatExpired")}</p>
                  <button onClick={resetWechat} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                    {s("wechatButton")}
                  </button>
                </div>
              )}

              {/* 显示二维码等待支付 */}
              {(wechatStatus === "loading" || wechatStatus === "waiting") && (
                <div className="text-center">
                  {wechatStatus === "loading" ? (
                    <div className="py-8 flex items-center justify-center gap-2 text-gray-400">
                      <span className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                      {s("wechatGenerating")}
                    </div>
                  ) : wechatOrder ? (
                    <div>
                      <div className="bg-white p-4 rounded-xl inline-block mb-4">
                        <QRCodeSVG value={wechatOrder.codeUrl} size={200} level="M" />
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{s("wechatScanHint")}</p>
                      <p className="text-gray-500 text-xs mb-4">
                        {s("wechatOrderId")}: {wechatOrder.orderId}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-orange-400 text-sm mb-4">
                        <span className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                        {s("wechatWaiting")}
                      </div>
                      <button onClick={resetWechat} className="text-gray-500 hover:text-gray-300 text-sm transition-colors cursor-pointer">
                        {s("wechatCancel")}
                      </button>
                    </div>
                  ) : null}
                </div>
              )}

              {/* 错误状态 */}
              {wechatStatus === "error" && (
                <div className="text-center py-6">
                  <p className="text-red-400 mb-4">{message?.text || s("wechatUnavailable")}</p>
                  <button onClick={() => { setWechatStatus("idle"); handleWechatPay(); }} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                    {s("wechatButton")}
                  </button>
                </div>
              )}

              {/* 初始状态 — 未下单 */}
              {wechatStatus === "idle" && (
                <>
                  <p className="text-sm text-gray-400 mb-6">{s("wechatDesc")}</p>
                  <button
                    onClick={handleWechatPay}
                    disabled={wechatLoading}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {wechatLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {s("wechatGenerating")}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z" />
                        </svg>
                        {s("wechatButton")}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {method === "alipay" && (
            <div>
              <h3 className="text-white font-semibold mb-4">{s("alipayTitle")}</h3>

              {/* 已支付成功 */}
              {alipayStatus === "paid" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-400 font-medium">{s("alipayPaid")}</p>
                </div>
              )}

              {/* 二维码已过期 */}
              {alipayStatus === "closed" && (
                <div className="text-center py-6">
                  <p className="text-yellow-400 mb-4">{s("alipayExpired")}</p>
                  <button onClick={resetAlipay} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                    {s("alipayButton")}
                  </button>
                </div>
              )}

              {/* 显示二维码等待支付 */}
              {(alipayStatus === "loading" || alipayStatus === "waiting") && (
                <div className="text-center">
                  {alipayStatus === "loading" ? (
                    <div className="py-8 flex items-center justify-center gap-2 text-gray-400">
                      <span className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                      {s("alipayGenerating")}
                    </div>
                  ) : alipayOrder ? (
                    <div>
                      <div className="bg-white p-4 rounded-xl inline-block mb-4">
                        <QRCodeSVG value={alipayOrder.qrCode} size={200} level="M" />
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{s("alipayScanHint")}</p>
                      <p className="text-gray-500 text-xs mb-4">
                        {s("wechatOrderId")}: {alipayOrder.orderId}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-orange-400 text-sm mb-4">
                        <span className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                        {s("alipayWaiting")}
                      </div>
                      <button onClick={resetAlipay} className="text-gray-500 hover:text-gray-300 text-sm transition-colors cursor-pointer">
                        {s("alipayCancel")}
                      </button>
                    </div>
                  ) : null}
                </div>
              )}

              {/* 错误状态 */}
              {alipayStatus === "error" && (
                <div className="text-center py-6">
                  <p className="text-red-400 mb-4">{message?.text || s("alipayUnavailable")}</p>
                  <button onClick={() => { setAlipayStatus("idle"); handleAlipay(); }} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                    {s("alipayButton")}
                  </button>
                </div>
              )}

              {/* 初始状态 — 未下单 */}
              {alipayStatus === "idle" && (
                <>
                  <p className="text-sm text-gray-400 mb-6">{s("alipayDesc")}</p>
                  <button
                    onClick={handleAlipay}
                    disabled={alipayLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {alipayLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {s("alipayGenerating")}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.5c-4.694 0-8.5-3.806-8.5-8.5S7.306 3.5 12 3.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z"/>
                        </svg>
                        {s("alipayButton")}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {method === "wire" && (
            <div>
              <h3 className="text-white font-semibold mb-4">{s("wireTitle")}</h3>
              <p className="text-sm text-gray-400 mb-6">{s("wireDesc")}</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-3 border-b border-zinc-800">
                  <span className="text-gray-400">{s("beneficiary")}</span>
                  <span className="text-white font-medium">ZHAO DONGLIANG</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-800">
                  <span className="text-gray-400">{s("account")}</span>
                  <span className="text-white font-medium">6215 5804 0900 7390 361</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-800">
                  <span className="text-gray-400">{s("bank")}</span>
                  <span className="text-white font-medium text-right max-w-[240px]">ICBC (Industrial and Commercial Bank of China)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-800">
                  <span className="text-gray-400">{s("swift")}</span>
                  <span className="text-white font-medium">ICBKCNBJ</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-800">
                  <span className="text-gray-400">{s("bankAddress")}</span>
                  <span className="text-white font-medium text-right max-w-[220px]">No.28 Ping'an East Street, Shunping County, Baoding, Hebei, China</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-400">{s("arrival")}</span>
                  <span className="text-white font-medium">{s("arrivalTime")}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg text-xs text-gray-400">
                {s("wireNote")}
              </div>
            </div>
          )}

          {/* 消息提示 */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-sm ${
              message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" :
              message.type === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" :
              "bg-blue-500/10 border border-blue-500/30 text-blue-400"
            }`}>
              {message.text}
            </div>
          )}

          {/* 安全提示 */}
          <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {s("securityNote")}
          </div>
        </div>
      </div>
    </section>
  );
}
