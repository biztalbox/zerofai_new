"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

import type { HomepageHero } from "@/types/homepage";

type Props = {
  content: HomepageHero;
};

function HeroVideo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setFailed(false);
    video.load();

    const play = () => video.play().catch(() => setFailed(true));
    play();

    const handleError = () => setFailed(true);
    video.addEventListener("error", handleError);
    return () => video.removeEventListener("error", handleError);
  }, [src]);

  if (!src || failed) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}

function HeroMedia({
  imageUrl,
  videoUrl,
  className,
}: {
  imageUrl: string;
  videoUrl: string;
  className: string;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className={`${className} object-cover`}
        aria-hidden
      />
    );
  }

  return <HeroVideo src={videoUrl} className={`${className} object-cover`} />;
}

export function BridgeHero({ content }: Props) {
  const mediaClassName = "absolute inset-0 h-full w-full";

  return (
    <section className="relative min-h-screen overflow-hidden flex">
      <HeroMedia
        imageUrl={content.mobileImageUrl}
        videoUrl={content.mobileVideoUrl}
        className={`${mediaClassName} md:hidden`}
      />
      <HeroMedia
        imageUrl={content.imageUrl}
        videoUrl={content.videoUrl}
        className={`${mediaClassName} hidden md:block`}
      />

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
