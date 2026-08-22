import type { Metadata, Viewport } from "next";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
  description:
    "TPJ Group phát triển hệ sinh thái giải trí trực tuyến ứng dụng công nghệ hiện đại, hướng đến trải nghiệm an toàn, minh bạch, sáng tạo và bền vững tại thị trường châu Á.",
  keywords: ["TPJ Group", "hệ sinh thái giải trí trực tuyến", "công nghệ hiện đại", "giải trí trực tuyến"],
  openGraph: {
    title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
    description:
      "TPJ Group phát triển hệ sinh thái giải trí trực tuyến ứng dụng công nghệ hiện đại, hướng đến trải nghiệm an toàn, minh bạch, sáng tạo và bền vững tại thị trường châu Á.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: "/assets/tpj-og-image.jpg", width: 1672, height: 941, alt: "TPJ Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
    description:
      "TPJ Group phát triển hệ sinh thái giải trí trực tuyến ứng dụng công nghệ hiện đại, hướng đến trải nghiệm an toàn, minh bạch, sáng tạo và bền vững tại thị trường châu Á.",
    images: ["/assets/tpj-og-image.jpg"],
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
