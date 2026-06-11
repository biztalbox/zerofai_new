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

    const play = () => video.play().catch(() => setUsePoster(true));
    play();

    video.addEventListener("error", () => setUsePoster(true));
    return () => video.removeEventListener("error", () => setUsePoster(true));
  }, [content.videoUrl]);

  return (
    <section className="relative min-h-[93vh] overflow-hidden flex">
      {!usePoster && (
        <video
          ref={videoRef}
          src={content.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="relative mx-auto flex h-full min-h-[460px] self-center container items-center px-6 py-12 lg:min-h-[540px] lg:px-10 lg:py-16">
        <div className="w-full max-w-[400px] rounded-xl bg-[#2828288a] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[2px] lg:max-w-[420px] lg:p-10">
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
