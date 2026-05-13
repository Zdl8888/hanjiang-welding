import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanjiang-welding.vercel.app"),
  title: {
    default: "HanJang Welding | Intelligent Welding Equipment Manufacturer",
    template: "%s | HanJang Welding",
  },
  description:
    "Professional welding machine manufacturer from China. TIG, MIG/MAG, MMA, Plasma Cutting — from standalone machines to robotic welding lines. CE & ISO certified. Exported to 30+ countries. Factory direct pricing.",
  keywords: [
    "welding machine", "TIG welder", "MIG welder", "ARC welder",
    "plasma cutter", "welding equipment manufacturer",
    "China welding machine supplier", "welding machine factory",
    "welding equipment wholesale", "inverter welding machine",
    "industrial welder", "portable welding machine",
  ],
  authors: [{ name: "HanJang Welding" }],
  creator: "HanJang Welding",
  publisher: "HanJang Welding",
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    siteName: "HanJang Welding",
    title: "HanJang Welding | Intelligent Welding Equipment Manufacturer",
    description:
      "Professional welding machine manufacturer from China. TIG, MIG/MAG, MMA, Plasma Cutting. CE & ISO certified. Factory direct pricing.",
    url: "https://hanjiang-welding.vercel.app/en",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HanJang Welding — Intelligent Welding Solutions",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HanJang Welding | Welding Equipment Manufacturer",
    description:
      "TIG, MIG/MAG, MMA, Plasma Cutting machines. CE & ISO certified. Exported to 30+ countries.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://hanjiang-welding.vercel.app/en",
    languages: {
      en: "https://hanjiang-welding.vercel.app/en",
      "zh-CN": "https://hanjiang-welding.vercel.app",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
