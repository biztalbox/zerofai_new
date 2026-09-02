"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * three.js + @react-three/fiber + drei + gsap + a 621KB GLB is by far the
 * heaviest thing on the homepage, and it lives in a section most visitors
 * never reach. It is now split out of the initial bundle entirely:
 *
 *  - phones get a static image (the WebGL scene is not worth the battery or
 *    the main-thread time on a mid-tier device),
 *  - desktops only start downloading it once the section is within 400px of
 *    the viewport.
 */
const HeroCanvas = dynamic(() => import("@/components/bot/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const DESKTOP_QUERY = "(min-width: 768px)";

export default function DeferredHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isDesktop !== true) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative order-1 flex h-full min-h-96 w-full min-w-0 items-center justify-center overflow-hidden md:order-2"
    >
      {isDesktop === true && inView ? (
        <HeroCanvas />
      ) : (
        <Image
          src="/assets/zerof_bot.png"
          width={320}
          height={320}
          alt=""
          aria-hidden
          loading="lazy"
          sizes="(max-width: 767px) 60vw, 320px"
          className="h-auto w-[min(60vw,320px)] object-contain"
        />
      )}
    </div>
  );
}
