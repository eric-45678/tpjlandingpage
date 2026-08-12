import type { Metadata, Viewport } from "next";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TPJ - Năng lượng mới, tương lai mới",
  description:
    "Kiểm tra tốc độ và truy cập đường truyền TPJ tốc độ cao, ổn định, an toàn và bền vững.",
  keywords: ["TPJ", "đường truyền tốc độ cao", "kiểm tra tốc độ", "năng lượng mới"],
  openGraph: {
    title: "TPJ - Năng lượng mới, tương lai mới",
    description: "Đường truyền tốc độ cao, kết nối ổn định và an toàn.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8e9cf",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
