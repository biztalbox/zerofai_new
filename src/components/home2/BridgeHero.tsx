"use client";

import { useRef, useEffect, useState } from "react";
import { BridgeLogo } from "./BridgeLogo";
import Image from "next/image";

const HERO_VIDEO = "/assets/hero_video.mp4";

export function BridgeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => video.play().catch(() => setUsePoster(true));
    play();

    video.addEventListener("error", () => setUsePoster(true));
    return () => video.removeEventListener("error", () => setUsePoster(true));
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex">
      <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

      <div className="relative mx-auto flex h-full min-h-[460px] self-center container items-center px-6 py-12 lg:min-h-[540px] lg:px-10 lg:py-16">
        <div className="w-full max-w-[400px] rounded-xl bg-white/88 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[2px] lg:max-w-[420px] lg:p-10">
          {/* <BridgeLogo size="lg" /> */}

          <Image width="300" height="100" src="/assets/logo.png" alt="Zerofai" className="w-32" />
          <h1 className="mt-5 text-[1.625rem] font-normal leading-[1.25] tracking-[-0.02em] text-[#3d3d3d] lg:text-[1.75rem]">
          Autonomous IT Operations Platform
          </h1>
          <a
            href="#"
            className="mt-5 inline-flex items-center gap-1.5 rounded bg-primary p-2.5 text-[14px] font-medium text-white transition hover:bg-[#005a63]"
          >
           Request a Demo<span aria-hidden>›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
