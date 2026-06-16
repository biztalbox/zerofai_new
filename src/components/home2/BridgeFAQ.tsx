"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import type { FaqItem } from "@/types/site-content";

const HOME_FAQ_TITLE = "Frequently Asked Questions";
const HOME_FAQ_LIMIT = 5;

type BridgeFAQProps = {
  faqs: FaqItem[];
};

export function BridgeFAQ({ faqs }: BridgeFAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  const visibleFaqs = faqs.slice(0, HOME_FAQ_LIMIT);

  return (
    <section id="knowledge" className="bg-[#0A6EC1] py-16 lg:py-24 relative z-20">
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[13px] tracking-[0.08em] text-white">{HOME_FAQ_EYEBROW}</p>
        <h2 className="mt-3 text-[2rem] font-normal tracking-[-0.02em] text-white lg:text-[2.5rem]">
          {HOME_FAQ_TITLE}
        </h2>

        <div className="mt-10 divide-y divide-[#d8d8d8] border-y border-[#d8d8d8]">
          {visibleFaqs.map((faq, index) => (
            <div key={faq.id || index}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-medium text-white lg:text-lg">{faq.question}</span>
                <span className="mt-0.5 shrink-0 text-white">
                  {open === index ? (
                    <Minus className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Plus className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </span>
              </button>
              {open === index && (
                <p className="pb-6 text-[15px] leading-[1.65] text-white">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
