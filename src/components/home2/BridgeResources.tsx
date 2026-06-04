const resources = [
  {
    image: "https://s7d1.scene7.com/is/image/kyndryl/magic-quadrant-data-center-outsourcing-services-16x9.png?qlt=85",
    title: "Kyndryl named a Leader in 2025 Gartner® DCOS report",
    desc: "Gartner 2025 Magic Quadrant™ for Data Center Outsourcing Services report cites our embedded consulting approach with Kyndryl Consult and Kyndryl Bridge, our real-time AI-powered platform.",
    cta: "Learn more",
  },
  {
    image: "https://s7d1.scene7.com/is/image/kyndryl/AdobeStock_600413797-1920x1080-poster?qlt=85",
    title: "Kyndryl Bridge enables continuous transformation",
    desc: "Use actionable insights to continuously innovate, achieve higher levels of operational maturity, and provide a foundation for current and future digital business requirements.",
    cta: "Download solution brief",
  },
  {
    image: "https://s7d1.scene7.com/is/image/kyndryl/kyndryl-intelligent-recovery-services-16x9?qlt=85",
    title: "Unlock the full potential of your IT Infrastructure",
    desc: "Kyndryl Bridge Intelligence for IT Operations combines AI insights from the Kyndryl Bridge platform with Kyndryl Consult expertise to improve efficiency, reduce incidents, and strengthen compliance and resilience.",
    cta: "Download the solution flyer",
  },
];

export function BridgeResources() {
  return (
    <section id="resources" className="scroll-mt-[calc(var(--bridge-header-h)+48px)] border-t border-[#e8e8e8] bg-white py-16 lg:py-24">
      <div className="mx-auto container px-6 lg:px-10">
        <h2 className="text-[2rem] font-normal tracking-[-0.02em] text-[#006670] lg:text-[2.75rem]">Resources</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {resources.map((r) => (
            <article key={r.title}>
              <div className="overflow-hidden rounded-md">
                <img src={r.image} alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
              <h3 className="mt-5 text-base font-medium leading-snug text-[#3d3d3d]">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#666]">{r.desc}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-[#006670] hover:underline">
                {r.cta} <span aria-hidden>›</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
