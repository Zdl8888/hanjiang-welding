"use client";

import Spline from "@splinetool/react-spline";

interface Props {
  onLoad?: () => void;
}

export default function SplineScene({ onLoad }: Props) {
  return (
    <Spline
      scene="https://prod.spline.design/u418FuFyVBpcXItq/scene.splinecode"
      wasmPath="/wasm"
      onLoad={onLoad}
    />
  );
}
