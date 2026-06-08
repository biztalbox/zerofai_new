const CATALOG_IMG =
  "https://s7d1.scene7.com/is/image/kyndryl/team_womaninmeetingwithcolleagues_16x9:4x3_Large?qlt=85";

export function BridgeCatalog() {
  return (
    <section id="insights" className="scroll-mt-[calc(var(--bridge-header-h)+48px)] border-[#e8e8e8]">
      <div className="grid lg:grid-cols-2">
        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
          <img
            src={CATALOG_IMG}
            alt="Professional woman at desk with laptop"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-[#f4f4f1] px-8 py-14 lg:px-14 lg:py-20">
          {/* <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#3d3d3d] lg:text-[2.75rem]">
            Our catalog
          </h2> */}
          <p className="mt-6 max-w-lg text-[15px] leading-[1.65] text-[#666]">
          Stay informed with expert perspectives, industry trends, and practical insights
on autonomous IT operations, workplace experience, predictive intelligence,
and the future of enterprise technology.
          </p>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.65] text-[#666]">
          Explore how organizations are transforming IT operations through automation,
operational intelligence, and AI-driven decision-making.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex w-fit items-center gap-1 rounded-full border border-[#3d3d3d] px-6 py-2.5 text-[14px] font-medium text-[#3d3d3d] transition hover:bg-[#3d3d3d] hover:text-white"
          >
           Visit the Resource Center <span aria-hidden>›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
