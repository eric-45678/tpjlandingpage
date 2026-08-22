import type { Metadata, Viewport } from "next";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const socialImage = "/assets/tpj-og-image.jpg";
const siteDescription =
  "TPJ Group phát triển hệ sinh thái giải trí trực tuyến ứng dụng công nghệ hiện đại, hướng đến trải nghiệm an toàn, minh bạch, sáng tạo và bền vững tại thị trường châu Á.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
  description: siteDescription,
  keywords: ["TPJ Group", "hệ sinh thái giải trí trực tuyến", "công nghệ hiện đại", "giải trí trực tuyến"],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "TPJ Group",
    title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
    description: siteDescription,
    type: "website",
    locale: "vi_VN",
    url: "/",
    images: [{ url: socialImage, width: 1672, height: 941, type: "image/jpeg", alt: "TPJ Group - Hệ sinh thái giải trí trực tuyến" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TPJ Group - Hệ sinh thái giải trí trực tuyến",
    description: siteDescription,
    images: [{ url: socialImage, alt: "TPJ Group - Hệ sinh thái giải trí trực tuyến" }],
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
