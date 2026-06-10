import type { HomepageStats } from "@/types/homepage";

type Props = {
  content: HomepageStats;
};

export function BridgeStats({ content }: Props) {
  return (
    <section className="border-y border-[#e8e8e8] bg-white py-16 lg:py-24">
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[15px] font-medium text-[#3d3d3d]">{content.sectionLabel}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
          {content.items.map((stat, index) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={`${index > 0 ? "md:border-l md:border-[#e8e8e8] md:pl-8 lg:pl-10" : ""}`}
            >
              <div className="text-[3.5rem] font-light leading-none tracking-[-0.03em] text-[#006670]">
                {stat.value}
              </div>
              <h3 className="mt-4 text-base font-medium leading-snug text-[#3d3d3d]">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
