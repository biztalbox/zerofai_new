"use client";

import { useState } from "react";

const cases = [
  {
    client: "LifeLabs",
    title: "Kyndryl Bridge and Microsoft Azure help deploy cloud resources and enable cost optimization",
    desc: "With Kyndryl Bridge and Microsoft Azure, we helped Lifelabs assess cloud utilization and strategically cut costs. The FinOps program, jointly developed by Kyndryl and Lifelabs improved operational visibility and helped focus on customer experience.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/lifelabs-case-study-16x9?qlt=85",
  },
  {
    client: "Aflac",
    title: "Aflac Life Insurance Japan transforms with Kyndryl Bridge",
    desc: "Discover how Aflac Life Insurance Japan Ltd uses Kyndryl Bridge to improve operations, automate routine tasks, and unlock insights to drive agility and innovation across its digital services.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/aflac-case-study-16x9?qlt=85",
  },
  {
    client: "Securitas",
    title: "Kyndryl Bridge boosts Securitas' IT Resilience",
    desc: "Kyndryl Bridge delivers actionable insights from patterns created from thousands of past engagements to help Securitas predict and proactively address IT issues. The team expects up to 90% of IT issues to be automatically resolved.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/securitas-case-study-16x9?qlt=85",
  },
  {
    client: "Kantar",
    title: "Rapidly transforming IT operations at scale for a leading marketing data and analytics business",
    desc: "Kantar relies on Kyndryl Bridge for monitoring hybrid IT and budget optimization. With upcoming access to advanced analytics, Kantar can deep dive into IT expenditures and lead technology transformations with confidence.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/kantar-case-study-16x9?qlt=85",
  },
  {
    client: "Children's National Hospital",
    title: "Kyndryl and Children's National hospital aim to create a modern information services experience",
    desc: "Children's National Hospital achieves operational efficiency and tackles technical challenges head-on with Kyndryl Bridge. This innovative partnership shifts staff from reacting to proactively pursuing modern healthcare practices.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/childrens-national-hospital-case-study-16x9?qlt=85",
  },
  {
    client: "Stellantis",
    title: "Kyndryl to help drive Stellantis' IT infrastructure transformation",
    desc: "Stellantis will use Kyndryl Bridge, an open integration platform that delivers solutions by leveraging Kyndryl's core technology strengths, for real-time insights and unprecedented control over its IT environment.",
    image: "https://s7d1.scene7.com/is/image/kyndryl/stellantis-case-study-16x9?qlt=85",
  },
];

const FALLBACK_IMG = "https://s7d1.scene7.com/is/image/kyndryl/AdobeStock_600413797-1920x1080-poster?qlt=85";

export function BridgeResults() {
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section id="results" className="scroll-mt-[calc(var(--bridge-header-h)+48px)] bg-white py-16 lg:py-24">
      <div className="mx-auto container px-6 lg:px-10">
        <h2 className="max-w-3xl text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#3d3d3d] lg:text-[2.5rem]">
          We focus on driving better business outcomes for our customers
        </h2>

        <div className="mt-10 border-b-2 border-[#006670]">
          <div className="flex gap-0 overflow-x-auto">
            {cases.map((c, i) => (
              <button
                key={c.client}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 border-b-[3px] px-4 py-3.5 text-[14px] transition lg:px-5 ${
                  active === i
                    ? "-mb-[2px] border-[#006670] font-medium text-[#3d3d3d]"
                    : "border-transparent text-[#666] hover:text-[#3d3d3d]"
                }`}
              >
                {c.client}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-normal leading-[1.2] tracking-[-0.02em] text-[#3d3d3d] lg:text-[1.75rem]">
              {current.title}
            </h3>
            <p className="mt-5 text-[15px] leading-[1.65] text-[#666]">{current.desc}</p>
            <a href="#" className="mt-8 inline-flex items-center gap-1 text-[14px] font-medium text-[#006670] hover:underline">
              Learn more <span aria-hidden>›</span>
            </a>
          </div>
          <div className="overflow-hidden">
            <img
              src={current.image}
              alt={current.client}
              className="aspect-[4/3] w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMG;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
