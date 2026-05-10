"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    const fileMap: Record<string, string> = {
      "navmesh.wasm": "/wasm/navmesh.wasm",
      "navmesh.js": "/wasm/navmesh.js",
      "boolean.wasm": "/wasm/boolean.wasm",
      "boolean.js": "/wasm/boolean.js",
      "process.wasm": "/wasm/process.wasm",
      "process.js": "/wasm/process.js",
      "ui.wasm": "/wasm/ui.wasm",
      "ui.js": "/wasm/ui.js",
    };

    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

      if (url.includes("unpkg.com/@splinetool/")) {
        for (const [filename, localPath] of Object.entries(fileMap)) {
          if (url.endsWith("/" + filename) || url.endsWith(filename)) {
            return originalFetch(localPath, init);
          }
        }
      }

      return originalFetch(input as RequestInfo, init);
    } as typeof fetch;

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
