const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = path.join(__dirname, "out");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
};

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT:", err.message);
});

if (!fs.existsSync(ROOT)) {
  console.error("ERROR: out/ folder not found. Run: npx next build");
  process.exit(1);
}

// ============================================================
// Payment API - 微信支付 / 支付宝
// ============================================================
// 配置你的商户密钥（申请商户号后填入）
const PAYMENT_CONFIG = {
  wechat: {
    enabled: false, // 改为 true 启用
    appId: "",
    mchId: "",
    apiKey: "",
    notifyUrl: "https://yourdomain.com/api/pay/wechat/notify",
  },
  alipay: {
    enabled: false, // 改为 true 启用
    appId: "",
    privateKey: "",
    alipayPublicKey: "",
    notifyUrl: "https://yourdomain.com/api/pay/alipay/notify",
  },
};

function jsonRes(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

async function handleApi(req, res, pathname) {
  // POST /api/pay/wechat
  if (pathname === "/api/pay/wechat" && req.method === "POST") {
    const body = await readBody(req);
    if (!PAYMENT_CONFIG.wechat.enabled) {
      jsonRes(res, 503, { error: "微信支付尚未配置。请先申请微信支付商户号并填入密钥。" });
      return true;
    }
    if (!body.amount || body.amount <= 0) {
      jsonRes(res, 400, { error: "金额无效" });
      return true;
    }
    // TODO: 调用微信支付统一下单 API 生成 mweb_url
    // 参考: https://pay.weixin.qq.com/doc/v3/merchant/4012067059
    // 返回 { payUrl: mweb_url }
    jsonRes(res, 503, { error: "微信支付后端待实现。请配置商户信息后完成开发。" });
    return true;
  }

  // POST /api/pay/alipay
  if (pathname === "/api/pay/alipay" && req.method === "POST") {
    const body = await readBody(req);
    if (!PAYMENT_CONFIG.alipay.enabled) {
      jsonRes(res, 503, { error: "支付宝支付尚未配置。请先申请支付宝商户号并填入密钥。" });
      return true;
    }
    if (!body.amount || body.amount <= 0) {
      jsonRes(res, 400, { error: "金额无效" });
      return true;
    }
    // TODO: 调用支付宝电脑网站支付 API 生成支付链接
    // 参考: https://opendocs.alipay.com/open/270/105899
    // 返回 { payUrl: redirect_url }
    jsonRes(res, 503, { error: "支付宝支付后端待实现。请配置商户信息后完成开发。" });
    return true;
  }

  return false; // 不是 API 路由
}

const server = http.createServer(async (req, res) => {
  try {
    let url = req.url.split("?")[0].split("#")[0];
    if (url === "/") url = "/index.html";

    // API 路由优先
    const apiHandled = await handleApi(req, res, url);
    if (apiHandled !== false) return;

    let filePath = path.normalize(path.join(ROOT, url)).replace(/[\\/]$/, "");
    let ext = path.extname(filePath);

    if (!ext) {
      if (fs.existsSync(path.join(filePath, "index.html"))) {
        filePath = path.join(filePath, "index.html");
        ext = ".html";
      } else if (fs.existsSync(filePath + ".html")) {
        filePath += ".html";
        ext = ".html";
      }
    }

    const stat = fs.statSync(filePath, { throwIfNoEntry: false });
    if (!stat || stat.isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>404 - " + url + "</h1><p>filePath: " + filePath + "</p>");
      return;
    }

    const extMatch = path.extname(filePath);
    const mime = MIME[extMatch] || "application/octet-stream";
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  } catch (err) {
    console.error("REQ ERROR:", req.url, err.message, err.stack);
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>500 - Internal Server Error</h1><pre>" + err.message + "\n" + (err.stack || "") + "</pre>");
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("Port " + PORT + " is in use. Close the other program first.");
  } else {
    console.error("Server error:", err.message);
  }
  process.exit(1);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running at http://localhost:" + PORT);
  console.log("Press Ctrl+C to stop.");
});
