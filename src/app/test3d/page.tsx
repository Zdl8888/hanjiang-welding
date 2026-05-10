"use client";

import Spline from "@splinetool/react-spline";

export default function Test3D() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Spline
        scene="https://prod.spline.design/u418FuFyVBpcXItq/scene.splinecode"
        wasmPath="/wasm"
      />
    </div>
  );
}
