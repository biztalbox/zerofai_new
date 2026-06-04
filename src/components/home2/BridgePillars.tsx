const pillars = [
  {
    title: "Observe",
    desc: `Gain real-time visibility across
endpoints, users, applications,
services, and operational
workflows. ZerofAI continuously
analyzes enterprise signals to
uncover issues, experience gaps,
and operational bottlenecks
before they escalate.`,
    image: "https://s7d1.scene7.com/is/image/kyndryl/integrate-16x9-01?qlt=85",
  },
  {
    title: "Predict",
    desc: `Move beyond monitoring.
ZerofAI uses operational
intelligence and behavioral
analytics to identify emerging
risks, recurring issues, and
experience degradation
patterns before they impact
users or business operations.`,
    image: "https://s7d1.scene7.com/is/image/kyndryl/Observe-2.2-16x9-01?qlt=85",
  },
  {
    title: "Automate",
    desc: `Transform insights into action.
ZerofAI orchestrates
remediation workflows, resolves
repetitive operational issues,
and enables autonomous
execution to reduce manual
effort and improve operational
resilience.`,
    image: "https://s7d1.scene7.com/is/image/kyndryl/Orchestrate-16x9-01?qlt=85",
  },
];

export function BridgePillars() {
  return (
    <section id="value" className="relative scroll-mt-[calc(var(--bridge-header-h)+48px)] overflow-hidden bg-[#f4f4f1] py-16 lg:py-24">
      {/* Observe */}

      <div className="relative mx-auto container px-6 lg:px-10">
        <h2 className="max-w-3xl text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#006670] lg:text-[2.75rem]">
        Journey to Autonomous IT Operations
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((p) => (
            <article key={p.title}>
              <div className="overflow-hidden rounded-md bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover object-top" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-[#3d3d3d]">{p.title}</h4>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#666]">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
