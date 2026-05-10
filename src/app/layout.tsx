import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorker } from "./sw";

export const metadata: Metadata = {
  title: "悍将焊机 | 专业电焊机制造商",
  description: "悍将焊机专注高品质焊接设备研发与制造，20年行业经验，50+产品型号，远销30+国家。氩弧焊、二保焊、手工焊、等离子切割全套焊接解决方案。CE & ISO 认证。",
  keywords: "焊机,电焊机,氩弧焊机,二保焊机,等离子切割机,焊接设备,悍将焊机,welding machine manufacturer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full">
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
