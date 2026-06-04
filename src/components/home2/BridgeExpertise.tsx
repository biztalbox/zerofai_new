const expertiseItems = [
  {
    title: "People",
    desc: "We are the world's largest IT infrastructure services provider. We are the most trusted IT engineers and transformative thinkers in the market.",
  },
  {
    title: "Approach",
    desc: "We propel customer success with an approach that enables continuous innovation and operational excellence.",
  },
  {
    title: "Value",
    desc: "We use operational data, IP and embedded AI, to help customers uncover new value from past, current and future technology investments.",
  },
  {
    title: "Culture",
    desc: 'We deliver progress for each customer by being restless, empathetic, devoted, flat, fast and focused. We call this "The Kyndryl Way".',
  },
];

const EXPERTISE_IMG =
  "https://s7d1.scene7.com/is/image/kyndryl/team_womaninmeetingwithcolleagues_16x9?qlt=85";

export function BridgeExpertise() {
  return (
    <section id="expertise" className="scroll-mt-[calc(var(--bridge-header-h)+48px)]">
      <div className="relative overflow-hidden bg-white pb-0 pt-12 lg:pt-16">
        <div className="mx-auto container px-6 lg:px-10">
          <p className="bridge-split-text text-[clamp(2.75rem,9vw,6.5rem)] font-light lowercase leading-[0.95] tracking-[-0.03em]">
            kyndryl expertise
          </p>
        </div>
      </div>

      <div className="relative bg-[#1a5e63] px-6 py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute left-6 top-10 hidden lg:left-10 lg:block">
          <svg width="72" height="52" viewBox="0 0 72 52" fill="none" aria-hidden>
            <line x1="0" y1="44" x2="72" y2="8" stroke="#3dff8a" strokeWidth="1.5" />
            <line x1="0" y1="50" x2="72" y2="14" stroke="#3dff8a" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="mx-auto max-w-[1440px]">
          <h2 className="ml-auto max-w-md text-right text-2xl font-normal leading-[1.25] tracking-[-0.02em] text-white md:text-3xl lg:max-w-lg lg:text-[2rem]">
            Tap into Kyndryl&apos;s global network of skilled professionals
          </h2>
        </div>
      </div>

      <div className="bg-white py-0">
        <div className="mx-auto container px-6 lg:px-10">
          <div className="grid border border-[#e8e8e8] md:grid-cols-2 lg:grid-cols-4">
            {expertiseItems.map((item, i) => (
              <div
                key={item.title}
                className={`border-b border-[#e8e8e8] p-8 lg:p-10 ${
                  i % 2 === 0 ? "md:border-r" : ""
                } ${i < 3 ? "lg:border-r" : ""} ${i >= 2 ? "md:border-b-0 lg:border-b-0" : ""}`}
              >
                <h3 className="text-lg font-medium text-[#3d3d3d]">{item.title}</h3>
                <hr className="my-5 border-[#e8e8e8]" />
                <p className="text-[15px] leading-[1.65] text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto container px-6 pb-16 pt-10 lg:px-10 lg:pb-20">
        <img
          src={EXPERTISE_IMG}
          alt="Businesswoman in discussion with colleagues during meeting"
          className="aspect-[16/7] w-full object-cover"
        />
      </div>
    </section>
  );
}
