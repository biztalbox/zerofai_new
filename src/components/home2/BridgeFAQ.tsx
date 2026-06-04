"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What are digital business platforms?",
    a: "Digital business platforms are comprehensive technology solutions that address the complexity of today's information technology environments. Digital business platforms integrate various tools, data, and services to support and enhance IT operations. These platforms often include capabilities for AI, data management, analytics, automation, and collaboration, enabling organizations to streamline processes and improve efficiency. IDC defines the digital business platform as a multilayered, enterprise-wide technology architecture that seamlessly integrates systems and applications from multiple vendors. This allows organizations to leverage the entire IT estate, identifying new insights and opportunities to enable use cases that ensure business competitiveness and innovation.",
  },
  {
    q: "How do digital business platforms enhance operational efficiency?",
    a: "Digital business platforms enhance operational efficiency by applying AI and automating routine tasks, providing real-time data insights, and facilitating seamless communication across different departments. This reduces manual effort, minimizes errors, and allows employees to focus on more strategic activities, ultimately leading to increased productivity.",
  },
  {
    q: "Why is data integration important in digital business platforms?",
    a: "Data integration is crucial in digital business platforms because it ensures that information from various sources is consolidated and accessible in one place. This holistic observability of data enables better decision-making, as organizations can analyze comprehensive datasets to identify trends, optimize operations, and respond quickly to market changes.",
  },
];

export function BridgeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#0A6EC1] py-16 lg:py-24 relative z-20">
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[13px] uppercase tracking-[0.08em] text-white">Frequently asked questions</p>
        <h2 className="mt-3 text-[2rem] font-normal tracking-[-0.02em] text-white lg:text-[2.5rem]">
        Everything You Need to Know About ZerofAI
        </h2>

        <div className="mt-10 divide-y divide-[#d8d8d8] border-y border-[#d8d8d8]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-medium text-white lg:text-lg">{faq.q}</span>
                <span className="mt-0.5 shrink-0 text-white">
                  {open === i ? <Minus className="h-5 w-5" strokeWidth={1.5} /> : <Plus className="h-5 w-5" strokeWidth={1.5} />}
                </span>
              </button>
              {open === i && (
                <p className="pb-6 text-[15px] leading-[1.65] text-[#666]">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
