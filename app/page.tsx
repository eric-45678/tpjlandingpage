"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [1, 2, 3, 4, 5];
const destinationDomains = [
  "tpj01.com",
  "tpj02.com",
  "tpj03.com",
  "tpj04.com",
  "tpj05.com",
  "tpj06.com",
  "tpj07.com",
  "tpj08.com",
  "tpj09.com",
  "tpj10.com",
];

function getRandomDestinationUrl() {
  const domain = destinationDomains[Math.floor(Math.random() * destinationDomains.length)];
  return `https://${domain}/`;
}

const benefits = [
  { title: "Hệ Sinh Thái Sạch", description: "Vì Một Tương Lai Xanh Bền Vững", icon: "/assets/benefit-ecosystem.png" },
  { title: "Kết Nối Ổn Định", description: "Đường Truyền Tốc Độ Cao Luôn Ổn Định", icon: "/assets/benefit-connection.png" },
  { title: "An Toàn", description: "Bảo Mật Đa Lớp An Toàn Tuyệt Đối", icon: "/assets/benefit-security.png" },
  { title: "Bền Vững", description: "Công Nghệ Xanh - Hiệu Quả - Phát Triển Bền Lâu", icon: "/assets/benefit-sustainability.png" },
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
      <source media="(max-width: 1023px)" srcSet={mobile} />
      <Image src={desktop} alt={alt} fill priority={priority} sizes="100vw" />
    </picture>
  );
}

function LogoAsset({ alt = "TPJ" }: { alt?: string }) {
  return (
    <picture className="tpj-logo">
      <source media="(max-width: 1023px)" srcSet="/assets/tpj-logo-v4-mobile.png" />
      <img src="/assets/tpj-logo-v4-desktop.png" alt={alt} />
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
      <source media="(max-width: 1023px)" srcSet={mobile} />
      <img src={desktop} alt={alt} />
    </picture>
  );
}

const LATENCY_MIN = 90;
const LATENCY_MAX = 220;
const NEEDLE_MIN_ROTATION = -72;
const NEEDLE_MAX_ROTATION = 0;

function useAnimatedLatency(value: number) {
  const [displayValue, setDisplayValue] = useState(value);
  const displayValueRef = useRef(value);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startValue = displayValueRef.current;

    if (reducedMotion || startValue === value) {
      displayValueRef.current = value;
      setDisplayValue(value);
      return;
    }

    const duration = 720;
    const startedAt = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      // Ease out so a new reading settles naturally instead of jumping.
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(startValue + (value - startValue) * easedProgress);
      displayValueRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return displayValue;
}

function latencyToNeedleRotation(value: number) {
  const progress = Math.min(Math.max((value - LATENCY_MIN) / (LATENCY_MAX - LATENCY_MIN), 0), 1);
  return NEEDLE_MIN_ROTATION + progress * (NEEDLE_MAX_ROTATION - NEEDLE_MIN_ROTATION);
}

function SpeedCard({ index, latency, destination }: { index: number; latency: number; destination: string }) {
  const displayLatency = useAnimatedLatency(latency);
  const needleRotation = latencyToNeedleRotation(displayLatency);

  return (
    <article className="speed-card" aria-label={`Đường dẫn truy cập ${index}`}>
      <div className="gauge" aria-hidden="true">
        <Image className="gauge-dial" src="/assets/gauge-dial.svg" alt="" width={121} height={94} />
        <Image
          className="gauge-needle"
          src="/assets/gauge-needle.svg"
          alt=""
          width={70}
          height={50}
          style={{ transform: `rotate(${needleRotation}deg)` }}
        />
      </div>
      <div className="speed-copy">
        <span>Tốc Độ Hiện Tại</span>
        <strong>{displayLatency} Ms</strong>
        <span>Link <b>{String(index).padStart(2, "0")}</b></span>
        <a className="access-button" href={destination} target="_blank" rel="noreferrer" aria-label={`Truy cập đường dẫn ${index}`}>
          Truy Cập Ngay
        </a>
      </div>
    </article>
  );
}

function BenefitCard({ title, description, icon }: (typeof benefits)[number]) {
  const mobileTitleLines = title === "Hệ Sinh Thái Sạch"
    ? ["Hệ Sinh", "Thái Sạch"]
    : title === "Kết Nối Ổn Định"
      ? ["Kết Nối", "Ổn Định"]
      : [title];

  return (
    <article className="benefit-card">
      <div className="benefit-icon" aria-hidden="true">
        <Image src={icon} alt="" fill sizes="(max-width: 1023px) 34px, 76px" />
      </div>
      <div className="benefit-copy">
        <h2>
          <span className="benefit-title-desktop">{title}</span>
          <span className="benefit-title-mobile">
            {mobileTitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </span>
        </h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [latencies, setLatencies] = useState(() => links.map(() => 144));
  const [destinations, setDestinations] = useState(() => links.map(() => "https://tpj01.com/"));

  useEffect(() => {
    setDestinations(links.map(() => getRandomDestinationUrl()));
  }, []);

  useEffect(() => {
    const updateLatency = () => {
      setLatencies(links.map(() => Math.floor(90 + Math.random() * 131)));
    };
    const interval = window.setInterval(updateLatency, 2000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="landing-page">
      <section className="design-stage" aria-labelledby="main-heading">
        <h1 id="main-heading" className="sr-only">TPJ - Năng lượng mới, tương lai mới</h1>

        <CroppedAsset className="background-art" desktop="/assets/desktop-bg-cloud-fixed.png" mobile="/assets/mobile-bg.png" priority />
        {/* The replacement desktop background already contains the complete scene. */}
        {/* <CroppedAsset className="background-overlay" desktop="/assets/desktop-overlay.png" mobile="/assets/mobile-background.png" priority /> */}

        <header className="brand-lockup">
          <LogoAsset />
          <div className="headline" aria-label="Năng lượng mới, tương lai mới">
            <div className="headline-copy">
              <span>NĂNG LƯỢNG MỚI</span>
              <div className="headline-second-line">
                {/* <div className="headline-ornament" aria-hidden="true"><Image src="/assets/Frame 59.png" alt="" fill sizes="(max-width: 1023px) 8.28vw, 5.258vw" /></div> */}
                <span>TƯƠNG LAI MỚI</span>
                {/* <div className="headline-ornament headline-ornament-right" aria-hidden="true"><Image src="/assets/Frame 46.png" alt="" fill sizes="(max-width: 1023px) 8.28vw, 5.258vw" /></div> */}
              </div>
            </div>
          </div>
        </header>

        <div className="speed-title section-heading" aria-hidden="true">
          <CroppedAsset className="speed-title-art" desktop="/assets/desktop-speed-title.png" mobile="/assets/mobile-speed-title.png" />
          <span>Kiểm tra tốc độ</span>
        </div>

        <div className="speed-panel">
          <div className="speed-grid">
            {links.map((index, position) => (
              <SpeedCard key={index} index={index} latency={latencies[position]} destination={destinations[position]} />
            ))}
          </div>
        </div>

        <section className="benefits" aria-label="Lợi ích của TPJ">
          <div className="benefits-panel" aria-hidden="true" />
          <div className="benefits-grid">
            {benefits.map((benefit) => <BenefitCard key={benefit.title} {...benefit} />)}
          </div>
        </section>

        <div className="mobile-logo-pedestal" aria-hidden="true">
          <picture>
            <img src="/assets/mobile-logo-pedestal.png" alt="" />
          </picture>
        </div>

        <CroppedAsset className="woman" desktop="/assets/tpj-woman-v4-desktop.png" mobile="/assets/tpj-woman-v4-mobile.png" priority alt="Đại diện TPJ" />
        <a className="support-link" aria-label="Hỗ trợ 24/7">
          <NativeAsset className="support" desktop="/assets/support-24-7.png" mobile="/assets/support-24-7.png" alt="Hỗ trợ 24/7 - admin@tpj.com" />
        </a>
      </section>
    </main>
  );
}
