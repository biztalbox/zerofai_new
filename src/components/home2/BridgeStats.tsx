const stats = [
  {
    value: "38+ Years",
    label: "Of Enterprise IT Expertise",
    desc: "Kyndryl Bridge is providing customers with productivity benefits totaling nearly $3 billion a year by avoiding major incidents and planned maintenance costs.",
  },
  {
    value: "2500+",
    label: "Trusted Clients",
    desc: "With over 16 million AI-driven insights monthly, Kyndryl Bridge helps customers make better decisions faster to achieve their business objectives.",
  },
  {
    value: "AI-Powered",
    label: "Autonomous Operations",
    desc: "The IT industry's first AI-powered open integration platform now has more than 1,400 onboarded customers and more than 190 new services.",
  },
];

export function BridgeStats() {
  return (
    <section className="border-y border-[#e8e8e8] bg-white py-16 lg:py-24">
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[15px] font-medium text-[#3d3d3d]">The Foundation Behind ZerofAI</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`${i > 0 ? "md:border-l md:border-[#e8e8e8] md:pl-8 lg:pl-10" : ""}`}
            >
              <div className="text-[3.5rem] font-light leading-none tracking-[-0.03em] text-[#006670]">
                {s.value}
              </div>
              <h3 className="mt-4 text-base font-medium leading-snug text-[#3d3d3d]">{s.label}</h3>
              {/* <p className="mt-3 text-[15px] leading-[1.65] text-[#666]">{s.desc}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
