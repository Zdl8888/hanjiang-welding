const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PORT = 3000;
const ROOT = path.join(__dirname, "out");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
};

// Cache-Control: WASM 文件内容不变，缓存一年
const CACHE = {
  ".wasm": "public, max-age=31536000, immutable",
  ".js": "public, max-age=31536000, immutable",
  ".css": "public, max-age=31536000, immutable",
  ".png": "public, max-age=86400",
  ".jpg": "public, max-age=86400",
  ".webp": "public, max-age=86400",
  ".svg": "public, max-age=86400",
  ".ico": "public, max-age=86400",
};

const COMPRESS_TYPES = [
  "text/html",
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/json",
  "image/svg+xml",
  "application/wasm",
];

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
const payment = require("./lib/payment.js");

function jsonRes(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function getQueryParams(url) {
  const q = url.split("?")[1];
  if (!q) return {};
  const params = {};
  for (const part of q.split("&")) {
    const [k, v] = part.split("=");
    params[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return params;
}

async function handleApi(req, res, pathname) {
  const url = req.url || "";

  if (pathname === "/api/pay/wechat" && req.method === "POST") {
    const body = await readBody(req);
    if (!body.amount || parseFloat(body.amount) <= 0) {
      jsonRes(res, 400, { error: "请输入有效金额" });
      return true;
    }
    try {
      const result = await payment.createWechatOrder({
        amount: body.amount,
        currency: body.currency || "CNY",
        description: body.description || "HanJang Welding Machine Order",
      });
      jsonRes(res, 200, result);
    } catch (err) {
      jsonRes(res, 503, { error: err.message || "微信支付下单失败" });
    }
    return true;
  }

  if (pathname === "/api/pay/alipay" && req.method === "POST") {
    const body = await readBody(req);
    if (!body.amount || parseFloat(body.amount) <= 0) {
      jsonRes(res, 400, { error: "请输入有效金额" });
      return true;
    }
    try {
      const result = await payment.createAlipayOrder({
        amount: body.amount,
        currency: body.currency || "CNY",
        description: body.description || "HanJang Welding Machine Order",
      });
      jsonRes(res, 200, result);
    } catch (err) {
      jsonRes(res, 503, { error: err.message || "支付宝下单失败" });
    }
    return true;
  }

  if (pathname === "/api/pay/status" && req.method === "GET") {
    const params = getQueryParams(url);
    const { orderId, type } = params;
    if (!orderId || !type) {
      jsonRes(res, 400, { error: "缺少参数 orderId 和 type" });
      return true;
    }
    if (type !== "wechat" && type !== "alipay") {
      jsonRes(res, 400, { error: "无效的支付类型" });
      return true;
    }
    try {
      const result = await payment.checkPaymentStatus({ type, orderId });
      jsonRes(res, 200, result);
    } catch (err) {
      jsonRes(res, 500, { error: err.message || "查询支付状态失败", status: "error" });
    }
    return true;
  }

  return false;
}

function shouldCompress(contentType) {
  return COMPRESS_TYPES.some((t) => contentType.startsWith(t));
}

const server = http.createServer(async (req, res) => {
  try {
    let url = req.url.split("?")[0].split("#")[0];
    if (url === "/") url = "/index.html";

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
      res.end("<h1>404 - Not Found</h1>");
      return;
    }

    const contentType = MIME[ext] || "application/octet-stream";
    const cacheControl = CACHE[ext] || "no-cache";
    const acceptEncoding = req.headers["accept-encoding"] || "";

    // 检查预压缩文件（.br / .gz）
    let usePrecompressed = false;
    let compression = "";
    if (shouldCompress(contentType)) {
      if (acceptEncoding.includes("br") && fs.existsSync(filePath + ".br")) {
        compression = "br";
        filePath += ".br";
        usePrecompressed = true;
      } else if (acceptEncoding.includes("gzip") && fs.existsSync(filePath + ".gz")) {
        compression = "gzip";
        filePath += ".gz";
        usePrecompressed = true;
      }
    }

    // 是否动态压缩
    const dynamicGzip = !usePrecompressed && shouldCompress(contentType) && acceptEncoding.includes("gzip");
    const dynamicBrotli = !usePrecompressed && shouldCompress(contentType) && acceptEncoding.includes("br");

    // 先设好所有 headers，再 writeHead
    const headers = {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
      "Vary": "Accept-Encoding",
    };

    const finalStat = fs.statSync(filePath, { throwIfNoEntry: false });
    const fileSize = finalStat ? finalStat.size : stat.size;

    if (usePrecompressed) {
      headers["Content-Encoding"] = compression;
      if (fileSize > 0) headers["Content-Length"] = String(fileSize);
    } else if (dynamicGzip || dynamicBrotli) {
      headers["Content-Encoding"] = dynamicGzip ? "gzip" : "br";
      // 动态压缩时无法预知 Content-Length，用 chunked
    } else {
      if (fileSize > 0) headers["Content-Length"] = String(fileSize);
    }

    res.writeHead(200, headers);

    const readStream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 });

    if (dynamicGzip) {
      const gzipStream = zlib.createGzip({ level: 5 });
      readStream.pipe(gzipStream).pipe(res);
    } else if (dynamicBrotli) {
      const brStream = zlib.createBrotliCompress();
      readStream.pipe(brStream).pipe(res);
    } else {
      readStream.pipe(res);
    }
  } catch (err) {
    console.error("REQ ERROR:", req.url, err.message);
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>500 - Internal Server Error</h1>");
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
