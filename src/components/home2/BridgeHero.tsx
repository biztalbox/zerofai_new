"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

import type { HomepageHero } from "@/types/homepage";

type Props = {
  content: HomepageHero;
};

export function BridgeHero({ content }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const play = () => video.play().catch(() => setUsePoster(true));
    play();

    const handleError = () => setUsePoster(true);
    video.addEventListener("error", handleError);
    return () => video.removeEventListener("error", handleError);
  }, [content.mobileVideoUrl, content.videoUrl]);

  return (
    <section className="relative min-h-screen overflow-hidden flex">
      {!usePoster && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source media="(max-width: 767px)" src={content.mobileVideoUrl} />
          <source media="(min-width: 768px)" src={content.videoUrl} />
        </video>
      )}

      <div className="relative mx-auto flex h-full min-h-[460px] self-center container items-center px-6 py-12 lg:min-h-[540px] lg:px-10 lg:py-16">
        <div className="w-full max-w-[400px] rounded-xl bg-[#2828288a] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[2px] lg:max-w-[420px] lg:p-10">
          <img
            width="150"
            height="50"
            src="/assets/logo.png"
            alt="ZerofAI"
            className="w-28 px-2 py-3"
          />
          <h1 className="text-[1.625rem] font-normal leading-[1.25] tracking-[-0.02em] text-white lg:text-[1.75rem]">
            {content.title}
          </h1>
          <Link
            href={content.ctaLink}
            className="mt-5 inline-flex items-center gap-1.5 rounded bg-primary p-2.5 text-[14px] font-medium text-white transition hover:bg-[#005a63]"
          >
            {content.ctaLabel}
            <span aria-hidden>›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
