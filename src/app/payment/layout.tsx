import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "在线支付 | 悍将焊机",
  description: "悍将焊机在线支付页面，支持 PayPal 等多种支付方式。立即购买氩弧焊机、二保焊机、等离子切割机等焊接设备。",
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
