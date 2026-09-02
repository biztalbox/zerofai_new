import Image from "next/image";
import Link from "next/link";

import { HeroVideoLayer } from "@/components/home2/HeroVideoLayer";
import { desktopSrcSet, mobileSrcSet, optimizedSrc } from "@/lib/image-loader";
import type { HomepageHero } from "@/types/homepage";

type Props = {
  content: HomepageHero;
};

/**
 * Shown only when a breakpoint has neither an image nor a video configured.
 * Swap this file to change the fallback backdrop.
 */
const HERO_PLACEHOLDER = "/assets/hero-placeholder.webp";

type HeroSlot = {
  /** What actually paints as the still layer for this breakpoint. */
  image: string;
  /** Empty string means "no video at this breakpoint". */
  video: string;
};

/**
 * Media priority, resolved independently for each breakpoint:
 *
 *   1. image configured  -> show the image, and nothing else (no video at all)
 *   2. no image, video   -> show the video, with the placeholder behind it
 *      configured           until the first frame is ready
 *   3. neither           -> show the placeholder
 */
function resolveSlot(imageUrl: string, videoUrl: string): HeroSlot {
  if (imageUrl) return { image: imageUrl, video: "" };
  if (videoUrl) return { image: HERO_PLACEHOLDER, video: videoUrl };
  return { image: HERO_PLACEHOLDER, video: "" };
}

/**
 * Server component on purpose: the headline, CTA and logo are all in the first
 * HTML response, so LCP no longer waits on hydration or on a video download.
 * Only the optional background video is client-side, and it is deferred until
 * after load (see HeroVideoLayer).
 */
export function BridgeHero({ content }: Props) {
  const { imageUrl, mobileImageUrl, videoUrl, mobileVideoUrl } = content;

  const mobile = resolveSlot(mobileImageUrl, mobileVideoUrl);
  const desktop = resolveSlot(imageUrl, videoUrl);

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#0d1b26]">
      {/*
        <picture> rather than next/image because the two breakpoints can be
        entirely different assets; the browser downloads exactly one of them.
      */}
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet(desktop.image)}
          sizes="100vw"
        />
        <img
          src={optimizedSrc(mobile.image, 828)}
          srcSet={mobileSrcSet(mobile.image)}
          sizes="100vw"
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <HeroVideoLayer
        mobileSrc={mobile.video}
        desktopSrc={desktop.video}
        mobilePoster={mobile.image}
        desktopPoster={desktop.image}
      />

      <div className="relative mx-auto container flex h-full min-h-[460px] items-center self-center px-6 py-12 lg:min-h-[540px] lg:px-10 lg:py-16">
        <div className="w-full max-w-[400px] rounded-xl bg-[#2828288a] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[2px] lg:max-w-[420px] lg:p-10">
          <Image
            src="/assets/logo.webp"
            width={150}
            height={37}
            alt="ZerofAI"
            loading="eager"
            sizes="112px"
            className="h-auto w-28 px-2 py-3"
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
