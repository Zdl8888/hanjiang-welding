import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HanJang Welding | Professional Welding Machine Manufacturer",
  description: "High-quality TIG, MIG/MAG, MMA welding machines and plasma cutters. CE & ISO certified. Exported to 30+ countries. Factory direct pricing.",
  keywords: "welding machine, TIG welder, MIG welder, ARC welder, plasma cutter, welding equipment manufacturer, China welding machine supplier",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
