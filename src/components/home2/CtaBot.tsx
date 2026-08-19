"use client";

import Link from "next/link";

import DeferredHeroCanvas from "@/components/bot/DeferredHeroCanvas";
import type { HomepageCta } from "@/types/homepage";

type Props = {
  content: HomepageCta;
};

const CtaBot = ({ content }: Props) => {
  return (
    <section className="relative w-full min-w-0 overflow-x-hidden lg:min-h-screen flex items-center">
      <div className="pointer-events-none absolute -top-20 right-0 z-0 hidden h-[calc(100%+5rem)] w-[36vw] overflow-hidden md:block">
        <div className="absolute top-0 right-[72px] h-[120%] w-[140px] skew-x-[-33deg] bg-[#f4f4f1]" />
        <div className="absolute top-0 right-[-90px] h-[120%] w-[130px] skew-x-[-33deg] bg-[#f4f4f1]" />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 lg:px-10">
        <div className="md:py-16 pb-16 order-2 md:order-1 text-center items-center md:items-start md:text-left">
          <h2 className="max-w-3xl text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#006670] lg:text-[2.75rem]">
            {content.title}
          </h2>

          <p className="mt-10 max-w-[720px] text-sm leading-7 text-black/75 dark:text-white/80 whitespace-pre-line">
            {content.description}
          </p>

          <div className="mt-8 sm:gap-10">
            <Link
              href={content.buttonLink}
              className="rounded-full w-fit bg-primary px-7 py-3 text-sm font-semibold text-background"
            >
              {content.buttonLabel}
            </Link>
          </div>
        </div>
        <DeferredHeroCanvas />
      </div>
    </section>
  );
};

export default CtaBot;
