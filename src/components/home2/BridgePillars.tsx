import type { HomepagePillars } from "@/types/homepage";

type Props = {
  content: HomepagePillars;
};

export function BridgePillars({ content }: Props) {
  return (
    <section
      id="platform"
      className="relative scroll-mt-[calc(var(--bridge-header-h)+48px)] overflow-hidden bg-[#f4f4f1] py-16 lg:py-24"
    >
      <div className="relative mx-auto container px-6 lg:px-10">
        <h2 className="max-w-3xl text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#006670] lg:text-[2.75rem]">
          {content.title}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {content.items.map((pillar) => (
            <article key={pillar.title}>
              <div className="overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <img
                  src={pillar.imageUrl}
                  alt={pillar.title}
                  className="aspect-[4/3] w-full object-cover object-top"
                />
              </div>
              <h4 className="mt-6 text-lg font-medium text-[#3d3d3d]">{pillar.title}</h4>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#666] whitespace-pre-line">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
