"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [1, 2, 3, 4, 5];

const benefits = [
  { title: "Hệ sinh thái sạch", description: "Vì một tương lai xanh bền vững", icon: "/assets/benefit-ecosystem.png" },
  { title: "Kết nối ổn định", description: "Đường truyền tốc độ cao luôn ổn định", icon: "/assets/benefit-connection.png" },
  { title: "An toàn", description: "Bảo mật đa lớp an toàn tuyệt đối", icon: "/assets/benefit-security.png" },
  { title: "Bền vững", description: "Công nghệ xanh - hiệu quả - phát triển bền lâu", icon: "/assets/benefit-sustainability.png" },
];

function CroppedAsset({ className, desktop, mobile, priority = false, alt = "" }: {
  className: string;
  desktop: string;
  mobile: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <Image src={desktop} alt={alt} fill priority={priority} sizes="100vw" />
    </picture>
  );
}

function LogoAsset({ alt = "TPJ" }: { alt?: string }) {
  return (
    <picture className="tpj-logo">
      <source media="(max-width: 767px)" srcSet="/assets/mobile-tpj-trimmed.png" />
      <img src="/assets/desktop-tpj.png" alt={alt} />
    </picture>
  );
}

function NativeAsset({ className, desktop, mobile, alt = "" }: {
  className: string;
  desktop: string;
  mobile: string;
  alt?: string;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img src={desktop} alt={alt} />
    </picture>
  );
}

function SpeedCard({ index, latency }: { index: number; latency: number }) {
  return (
    <article className="speed-card" aria-label={`Đường dẫn truy cập ${index}`}>
      <div className="gauge" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/assets/mobile-gauge.png" />
          <Image src="/assets/desktop-gauge.png" alt="" fill sizes="140px" />
        </picture>
      </div>
      <div className="speed-copy">
        <span>Tốc độ hiện tại</span>
        <strong>{latency} ms</strong>
        <span>Link <b>{String(index).padStart(2, "0")}</b></span>
        <a className="access-button" href={`#link-${index}`} aria-label={`Truy cập đường dẫn ${index}`}>
          Truy cập ngay
        </a>
      </div>
    </article>
  );
}

function BenefitCard({ title, description, icon }: (typeof benefits)[number]) {
  return (
    <article className="benefit-card">
      <div className="benefit-icon" aria-hidden="true">
        <Image src={icon} alt="" fill sizes="(max-width: 767px) 34px, 76px" />
      </div>
      <div className="benefit-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [latencies, setLatencies] = useState(() => links.map(() => 144));

  useEffect(() => {
    const updateLatency = () => {
      setLatencies(links.map(() => Math.floor(90 + Math.random() * 131)));
    };
    const interval = window.setInterval(updateLatency, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="landing-page">
      <section className="design-stage" aria-labelledby="main-heading">
        <h1 id="main-heading" className="sr-only">TPJ - Năng lượng mới, tương lai mới</h1>

        <CroppedAsset className="background-art" desktop="/assets/landing-background-airplane.jpg" mobile="/assets/landing-background-airplane.jpg" priority />
        <div className="warm-overlay" aria-hidden="true" />

        <header className="brand-lockup">
          <LogoAsset />
          <NativeAsset className="headline" desktop="/assets/desktop-headline.png" mobile="/assets/mobile-headline-trimmed.png" alt="Năng lượng mới, tương lai mới - Đường truyền tốc độ cao" />
        </header>

        <div className="speed-title" aria-hidden="true">
          <CroppedAsset className="speed-title-art" desktop="/assets/desktop-speed-title.png" mobile="/assets/mobile-speed-title.png" />
          <span>Kiểm tra tốc độ</span>
        </div>

        <div className="speed-panel">
          <div className="speed-grid">
            {links.map((index, position) => (
              <SpeedCard key={index} index={index} latency={latencies[position]} />
            ))}
          </div>
        </div>

        <section className="benefits" aria-label="Lợi ích của TPJ">
          <div className="benefits-panel" aria-hidden="true" />
          <div className="benefits-grid">
            {benefits.map((benefit) => <BenefitCard key={benefit.title} {...benefit} />)}
          </div>
        </section>

        <CroppedAsset className="woman" desktop="/assets/tpj-girl.png" mobile="/assets/tpj-girl.png" priority alt="Đại diện TPJ" />
        <NativeAsset className="support" desktop="/assets/desktop-support.png" mobile="/assets/mobile-support.png" alt="Hỗ trợ 24/7 - Luôn đồng hành cùng bạn" />
      </section>
    </main>
  );
}
