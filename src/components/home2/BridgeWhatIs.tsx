import type { HomepageWhatIs } from "@/types/homepage";

type Props = {
  content: HomepageWhatIs;
};

export function BridgeWhatIs({ content }: Props) {
  return (
    <section id="what-is" className="bg-white relative">
      <div className="grid gap-12 lg:grid-cols-2 items-center lg:gap-16">
        <div className="py-10 container mx-auto max-w-xl ml-auto">
          <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#3d3d3d] lg:text-[2.75rem]">
            {content.title}
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-[1.65] text-[#666]">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="relative">
          <video
            src={content.videoUrl}
            controls
            loop
            className="w-full h-108 aspect-auto bg-black"
          />
        </div>
      </div>
    </section>
  );
}
