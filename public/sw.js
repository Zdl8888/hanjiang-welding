const WASM_FILES = {
  "navmesh.wasm": "/wasm/navmesh.wasm",
  "navmesh.js": "/wasm/navmesh.js",
  "boolean.wasm": "/wasm/boolean.wasm",
  "boolean.js": "/wasm/boolean.js",
  "process.wasm": "/wasm/process.wasm",
  "process.js": "/wasm/process.js",
  "ui.wasm": "/wasm/ui.wasm",
  "ui.js": "/wasm/ui.js",
};

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  if (url.includes("unpkg.com/@splinetool/")) {
    for (const [filename, localPath] of Object.entries(WASM_FILES)) {
      if (url.endsWith("/" + filename)) {
        event.respondWith(fetch(localPath));
        return;
      }
    }

    // For other unpkg requests, try without wasm prefix too
    for (const [filename, localPath] of Object.entries(WASM_FILES)) {
      if (url.includes(filename)) {
        event.respondWith(fetch(localPath));
        return;
      }
    }
  }
});
