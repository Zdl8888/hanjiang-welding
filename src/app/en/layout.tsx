import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HanJang Welding | Intelligent Welding Solutions",
  description: "From standalone machines to robotic welding lines — TIG, MIG/MAG, MMA, Plasma Cutting. CE & ISO certified. Exported to 30+ countries. Factory direct pricing.",
  keywords: "welding machine, TIG welder, MIG welder, ARC welder, plasma cutter, welding equipment manufacturer, China welding machine supplier",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
