import Link from "next/link";

import type { HomepageCatalog } from "@/types/homepage";

type Props = {
  content: HomepageCatalog;
};

export function BridgeCatalog({ content }: Props) {
  return (
    <section id="insights" className="scroll-mt-[calc(var(--bridge-header-h)+48px)] border-[#e8e8e8]">
      <div className="grid lg:grid-cols-2">
        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
          <img
            src={content.imageUrl}
            alt="Insights"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-[#f4f4f1] px-8 py-14 lg:px-14 lg:py-20">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-6 max-w-lg text-[15px] leading-[1.65] text-[#666] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={content.ctaLink}
            className="mt-8 inline-flex w-fit items-center gap-1 rounded-full border border-[#3d3d3d] px-6 py-2.5 text-[14px] font-medium text-[#3d3d3d] transition hover:bg-[#3d3d3d] hover:text-white"
          >
            {content.ctaLabel}
            <span aria-hidden>›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
