import { BridgeLogo } from "./BridgeLogo";

const VIDEO_POSTER =
  "https://s7d1.scene7.com/is/image/kyndryl/Video_social?qlt=85";
const DOW_THUMB =
  "https://s7d1.scene7.com/is/image/kyndryl/kyndryl-intelligent-recovery-services-16x9?qlt=85";

export function BridgeWhatIs() {
  return (
    <section id="what-is" className="bg-white relative">
      <div className="grid gap-12 lg:grid-cols-2 items-center lg:gap-16">
        <div className="py-10 container mx-auto max-w-xl ml-auto">
          <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#3d3d3d] lg:text-[2.75rem]">
          What is ZerofAI?
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-[1.65] text-[#666]">
            <p>
              Modern enterprises struggle with growing operational complexity, fragmented
              tools, rising support workloads, and increasing demands for seamless digital
              experiences. At the core is ZerofAI, an AI-powered Autonomous IT Operations Platform that
              helps organizations observe, analyze, predict, and automate across their
              technology environment.
            </p>
            <p>
              By combining operational intelligence, autonomous remediation, workplace
              experience insights, and predictive analytics into a unified platform, ZerofAI
              enables organizations to reduce operational overhead, improve resilience,
              enhance employee experience, and continuously evolve toward more
              autonomous operations.
            </p>
       
          </div>
        </div>

        <div className="relative">
          <video src="assets/zerofai_intro.mp4" controls loop className="w-full h-108 aspect-auto bg-black"></video>
        </div>
      </div>

      {/* <div className="mx-auto mt-14 container px-6 lg:px-10">
        <div className="grid overflow-hidden bg-[#f4f4f1] md:grid-cols-[minmax(200px,280px)_1fr]">
          <div className="aspect-[4/3] md:aspect-auto">
            <img
              src={DOW_THUMB}
              alt="Dow case study"
              className="h-full min-h-[180px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14">
            <h3 className="text-xl font-normal leading-snug text-[#3d3d3d] md:text-2xl">
              Dow&apos;s journey to visibility, resilience and control with Kyndryl Bridge
            </h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-[#666]">
              Dow leveraged the AI capabilities of Kyndryl Bridge to generate predictive analytics
              that helped them proactively reduce major incidents by 93% and IT incidents overall
              by 50%.
            </p>
          </div>
        </div>
      </div> */}

      {/* <h3 className="text-7xl text-muted absolute -bottom-1 left-10">Stories that Inspire</h3> */}
    </section>
  );
}
