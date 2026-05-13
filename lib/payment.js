const https = require("https");
const crypto = require("crypto");

// ============================================================
// 商户配置 — 拿到营业执照后在这里填入
// ============================================================
const CONFIG = {
  wechat: {
    enabled: false, // 填好信息后改为 true
    appId: "",      // 微信支付 AppID (wx开头)
    mchId: "",      // 商户号
    apiV3Key: "",   // API v3 密钥
    serialNo: "",   // 证书序列号
    privateKey: "", // 商户私钥 (PEM格式)
    notifyUrl: "",  // 支付结果通知地址，例如 https://yourdomain.com/api/pay/wechat/notify
  },
  alipay: {
    enabled: false, // 填好信息后改为 true
    appId: "",      // 支付宝 App ID
    privateKey: "", // 商户私钥 (PEM格式)
    alipayPublicKey: "", // 支付宝公钥
    notifyUrl: "",  // 支付结果通知地址
  },
};

// ============================================================
// 工具函数
// ============================================================
function generateOrderId(prefix) {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `${prefix}${ts}${rand}`;
}

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: data });
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Request timeout")); });
    if (body) req.write(body);
    req.end();
  });
}

// ============================================================
// 微信支付 Native v3
// ============================================================
function wechatSign(method, urlPath, timestamp, nonceStr, bodyStr) {
  const message = `${method}\n${urlPath}\n${timestamp}\n${nonceStr}\n${bodyStr}\n`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(message);
  return sign.sign(CONFIG.wechat.privateKey, "base64");
}

async function wechatCreateNativeOrder({ amount, currency, description }) {
  const cfg = CONFIG.wechat;
  if (!cfg.enabled) {
    throw new Error("微信支付尚未配置。请先申请微信支付商户号并填入密钥。");
  }

  const outTradeNo = generateOrderId("HJW");
  const urlPath = "/v3/pay/transactions/native";
  const method = "POST";
  const totalCents = Math.round(parseFloat(amount) * 100);

  const body = {
    appid: cfg.appId,
    mchid: cfg.mchId,
    description: description || "HanJang Welding Machine Order",
    out_trade_no: outTradeNo,
    notify_url: cfg.notifyUrl,
    amount: {
      total: totalCents,
      currency: currency || "CNY",
    },
  };
  const bodyStr = JSON.stringify(body);

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = crypto.randomBytes(16).toString("hex");
  const signature = wechatSign(method, urlPath, timestamp, nonceStr, bodyStr);

  const authHeader = `WECHATPAY2-SHA256-RSA2048 mchid="${cfg.mchId}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${cfg.serialNo}",signature="${signature}"`;

  const result = await httpsRequest(
    {
      hostname: "api.mch.weixin.qq.com",
      path: urlPath,
      method,
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    },
    bodyStr
  );

  if (result.status === 200 && result.data.code_url) {
    return { codeUrl: result.data.code_url, orderId: outTradeNo };
  }
  throw new Error(result.data.message || `微信支付下单失败 (HTTP ${result.status})`);
}

async function wechatQueryOrder(outTradeNo) {
  const cfg = CONFIG.wechat;
  if (!cfg.enabled) {
    throw new Error("微信支付尚未配置。");
  }

  const urlPath = `/v3/pay/transactions/out-trade-no/${outTradeNo}?mchid=${cfg.mchId}`;
  const method = "GET";
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = crypto.randomBytes(16).toString("hex");
  const signature = wechatSign(method, urlPath, timestamp, nonceStr, "");

  const authHeader = `WECHATPAY2-SHA256-RSA2048 mchid="${cfg.mchId}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${cfg.serialNo}",signature="${signature}"`;

  const result = await httpsRequest(
    {
      hostname: "api.mch.weixin.qq.com",
      path: urlPath,
      method,
      headers: {
        "Authorization": authHeader,
        "Accept": "application/json",
      },
    },
    null
  );

  if (result.status === 200 && result.data.trade_state) {
    return { status: result.data.trade_state, orderId: outTradeNo }; // SUCCESS, NOTPAY, CLOSED, etc.
  }
  throw new Error(result.data.message || `查询订单失败 (HTTP ${result.status})`);
}

// ============================================================
// 支付宝 当面付 (Precreate)
// ============================================================
function alipayBuildParams(bizContent) {
  const cfg = CONFIG.alipay;
  const params = {
    app_id: cfg.appId,
    method: "alipay.trade.precreate",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    version: "1.0",
    notify_url: cfg.notifyUrl,
    biz_content: JSON.stringify(bizContent),
  };
  return params;
}

function alipaySign(params) {
  const keys = Object.keys(params).sort();
  const content = keys.map((k) => `${k}=${params[k]}`).join("&");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(content);
  return sign.sign(CONFIG.alipay.privateKey, "base64");
}

function alipayBuildQuery(params) {
  const keys = Object.keys(params).sort();
  return keys.map((k) => `${k}=${encodeURIComponent(params[k])}`).join("&");
}

async function alipayPrecreate({ amount, currency, description }) {
  const cfg = CONFIG.alipay;
  if (!cfg.enabled) {
    throw new Error("支付宝支付尚未配置。请先申请支付宝商户号并填入密钥。");
  }

  const outTradeNo = generateOrderId("HJA");
  const totalAmount = parseFloat(amount).toFixed(2);

  const bizContent = {
    out_trade_no: outTradeNo,
    total_amount: totalAmount,
    subject: description || "HanJang Welding Machine Order",
  };

  const params = alipayBuildParams(bizContent);
  params.sign = alipaySign(params);

  const queryStr = alipayBuildQuery(params);

  const result = await httpsRequest(
    {
      hostname: "openapi.alipay.com",
      path: "/gateway.do",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
    queryStr
  );

  const resp = result.data.alipay_trade_precreate_response;
  if (resp && resp.code === "10000" && resp.qr_code) {
    return { qrCode: resp.qr_code, orderId: outTradeNo };
  }
  throw new Error((resp && resp.sub_msg) || resp.msg || `支付宝下单失败 (HTTP ${result.status})`);
}

async function alipayQueryOrder(outTradeNo) {
  const cfg = CONFIG.alipay;
  if (!cfg.enabled) {
    throw new Error("支付宝支付尚未配置。");
  }

  const bizContent = { out_trade_no: outTradeNo };

  let params = {
    app_id: cfg.appId,
    method: "alipay.trade.query",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    version: "1.0",
    biz_content: JSON.stringify(bizContent),
  };
  params.sign = alipaySign(params);

  const queryStr = alipayBuildQuery(params);

  const result = await httpsRequest(
    {
      hostname: "openapi.alipay.com",
      path: "/gateway.do",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
    queryStr
  );

  const resp = result.data.alipay_trade_query_response;
  if (resp && resp.code === "10000") {
    return { status: resp.trade_status, orderId: outTradeNo }; // WAIT_BUYER_PAY, TRADE_SUCCESS, TRADE_CLOSED
  }
  throw new Error((resp && resp.sub_msg) || `查询订单失败 (HTTP ${result.status})`);
}

// ============================================================
// 简单内存存储（订单号 -> 支付状态缓存）
// 用于轮询时快速返回，避免每次都打微信/支付宝API
// ============================================================
const orderCache = new Map();

function cacheOrder(type, orderId, payData) {
  orderCache.set(`${type}:${orderId}`, { ...payData, time: Date.now() });
}

function getCachedOrder(type, orderId) {
  return orderCache.get(`${type}:${orderId}`);
}

// 清理超过 30 分钟的缓存
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of orderCache) {
    if (now - val.time > 30 * 60 * 1000) orderCache.delete(key);
  }
}, 5 * 60 * 1000);

// ============================================================
// 对外接口
// ============================================================
async function createWechatOrder({ amount, currency, description }) {
  const result = await wechatCreateNativeOrder({ amount, currency, description });
  cacheOrder("wechat", result.orderId, { codeUrl: result.codeUrl });
  return result;
}

async function createAlipayOrder({ amount, currency, description }) {
  const result = await alipayPrecreate({ amount, currency, description });
  cacheOrder("alipay", result.orderId, { qrCode: result.qrCode });
  return result;
}

async function checkPaymentStatus({ type, orderId }) {
  if (type === "wechat") {
    const result = await wechatQueryOrder(orderId);
    return { status: result.status === "SUCCESS" ? "paid" : result.status === "CLOSED" ? "closed" : "pending" };
  }
  if (type === "alipay") {
    const result = await alipayQueryOrder(orderId);
    return {
      status: result.status === "TRADE_SUCCESS" || result.status === "TRADE_FINISHED"
        ? "paid"
        : result.status === "TRADE_CLOSED" ? "closed" : "pending"
    };
  }
  throw new Error("Unknown payment type: " + type);
}

module.exports = {
  CONFIG,
  createWechatOrder,
  createAlipayOrder,
  checkPaymentStatus,
};
