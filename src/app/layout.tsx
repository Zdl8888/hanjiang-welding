import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorker } from "./sw";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanjiang-welding.vercel.app"),
  title: {
    default: "悍将焊机 | 智能焊接设备制造商 — 氩弧焊·二保焊·等离子切割",
    template: "%s | 悍将焊机",
  },
  description:
    "悍将焊机专注智能焊接设备与自动化产线解决方案。20年行业经验，50+产品型号，远销30+国家。工厂直供氩弧焊机、二保焊机、手工焊机、等离子切割机。CE & ISO 认证，支持定制。",
  keywords: [
    "焊机", "电焊机", "氩弧焊机", "二保焊机", "手工焊机", "等离子切割机",
    "焊接设备", "焊接设备厂家", "焊接设备制造商", "悍将焊机",
    "welding machine", "welding machine manufacturer", "TIG welder",
    "MIG welder", "plasma cutter", "China welding machine supplier",
    "welding equipment factory",
  ],
  authors: [{ name: "悍将焊机" }],
  creator: "悍将焊机",
  publisher: "悍将焊机",
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  verification: {
    google: "s9AQjA1Kzj4VXqYPFzyZAdyHAHPLntWdd1gIqkqIYHE",
  },
  openGraph: {
    type: "website",
    siteName: "悍将焊机",
    title: "悍将焊机 | 智能焊接设备制造商",
    description:
      "专注智能焊接设备与自动化产线解决方案，20年行业经验，远销30+国家。工厂直供，CE & ISO 认证。",
    url: "https://hanjiang-welding.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "悍将焊机 — 智能焊接解决方案",
      },
    ],
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "悍将焊机 | 智能焊接设备制造商",
    description:
      "专注智能焊接设备与自动化产线解决方案，20年行业经验。工厂直供，CE & ISO 认证。",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://hanjiang-welding.vercel.app",
    languages: {
      en: "https://hanjiang-welding.vercel.app/en",
      "zh-CN": "https://hanjiang-welding.vercel.app",
    },
  },
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
