import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Payment | HanJang Welding",
  description: "Secure online payment for HanJang welding machines. PayPal accepted. Buy TIG welders, MIG/MAG welders, plasma cutters online with confidence.",
};

export default function EnPaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
