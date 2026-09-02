import { CountUpStat } from "@/components/home2/CountUpStat";
import { isNumericStatValue } from "@/lib/stat-value";
import { FadeInTextStat } from "@/components/home2/FadeInTextStat";
import type { HomepageStats } from "@/types/homepage";

type Props = {
  content: HomepageStats;
};

const valueClassName =
  "block text-[3.5rem] font-light leading-none tracking-[-0.03em] text-[#006670]";
const labelClassName = "mt-4 text-base font-medium leading-snug text-[#3d3d3d]";

export function BridgeStats({ content }: Props) {
  return (
    <section className="bg-white py-16 lg:py-24">
      
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[15px] font-medium text-[#3d3d3d]">{content.sectionLabel}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
          {content.items.map((stat, index) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={`${index > 0 ? "md:border-l md:border-[#e8e8e8] md:pl-8 lg:pl-10" : ""}`}
            >
              {isNumericStatValue(stat.value) ? (
                <>
                  <CountUpStat value={stat.value} className={valueClassName} />
                  <h3 className={labelClassName}>{stat.label}</h3>
                </>
              ) : (
                <FadeInTextStat
                  value={stat.value}
                  label={stat.label}
                  valueClassName={valueClassName}
                  labelClassName={labelClassName}
                />
              )}
            </div>
          ))}
        </div>

      </div>
      <div className="text-center leading-0 -mb-[50px] md:-mb-[38px] lg:-mb-[35px] xl:-mb-[43px] md:text-[75px] pt-28 xl:text-[8.3rem] 2xl:text-[9.4rem] lg:text-[6.3rem] whitespace-nowrap text-[#F4F4F1] text-[40px] font-bold">ZerofAI Intelligence</div>

    </section>
  );
}
