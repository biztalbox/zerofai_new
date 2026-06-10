"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "what-is-zerofai",
    question: "What is ZerofAI?",
    answer:
      "ZerofAI is an AI-powered autonomous IT operations platform that helps enterprises move from reactive support to proactive and predictive digital operations. It automates issue resolution, improves workplace experience, and helps IT teams operate more efficiently at scale.",
  },
  {
    id: "vs-traditional-automation",
    question: "How is ZerofAI different from traditional IT automation?",
    answer:
      "Traditional automation follows predefined workflows and rules. ZerofAI goes further by continuously analyzing operational signals, identifying issues proactively, orchestrating remediation, and helping IT operations become more intelligent and autonomous.",
  },
  {
    id: "platform-or-service",
    question: "Is ZerofAI a platform, service, or both?",
    answer:
      "ZerofAI is both. Organizations can use it as a technology platform or combine it with ZerofAI-led operational services such as Autonomous Support Operations, Proactive Experience Operations, and Predictive Intelligence Operations.",
  },
  {
    id: "proactive-self-healing",
    question: "How does Proactive Self-Healing work?",
    answer:
      "ZerofAI continuously detects anomalies, identifies recurring endpoint issues, and triggers automated remediation workflows to resolve disruptions before they impact users or create support tickets.",
  },
  {
    id: "endpoint-governance",
    question: "What is Autonomous Endpoint Governance?",
    answer:
      "Autonomous Endpoint Governance helps organizations continuously manage endpoint compliance, security policies, provisioning, and operational health through intelligent automation and proactive control.",
  },
  {
    id: "sentiment-trend",
    question: "What does Sentiment Trend Analysis analyze?",
    answer:
      "ZerofAI analyzes workplace behavioral signals, support interactions, and digital experience patterns to identify employee frustration, dissatisfaction, and emerging experience issues early.",
  },
  {
    id: "predictive-health",
    question: "How does Predictive Health Analytics work?",
    answer:
      "ZerofAI analyzes historical operational patterns, real-time signals, and system behavior to identify early indicators of potential failures, helping teams act before disruptions occur.",
  },
  {
    id: "enterprise-customization",
    question: "Can ZerofAI be customized to fit enterprise business needs?",
    answer:
      "Yes. ZerofAI is designed to adapt to enterprise environments, workflows, and operational requirements. It can be aligned with existing ITSM platforms, endpoint ecosystems, security policies, support processes, and automation use cases to match specific business needs and operational maturity.",
  },
  {
    id: "operational-services",
    question: "What's included in ZerofAI's operational services?",
    answer:
      "ZerofAI's services combine AI-powered automation, operational intelligence, and managed execution to help enterprises improve support operations, workplace experience, and predictive decision-making across IT environments.",
  },
  {
    id: "replace-it-teams",
    question: "Does ZerofAI replace existing IT teams?",
    answer:
      "No. ZerofAI is designed to augment IT teams by reducing repetitive operational workload, improving response efficiency, and helping teams focus on strategic initiatives, governance, and higher-value operational decisions. AI operations models are increasingly positioned as augmentation layers rather than direct team replacements.",
  },
]

const HOME_FAQ_LIMIT = 5;

export function BridgeFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const visibleFaqs = faqs.slice(0, HOME_FAQ_LIMIT);

  return (
    <section id="knowledge" className="bg-[#0A6EC1] py-16 lg:py-24 relative z-20">
      <div className="mx-auto container px-6 lg:px-10">
        <p className="text-[13px] uppercase tracking-[0.08em] text-white">FAQs</p>
        <h2 className="mt-3 text-[2rem] font-normal tracking-[-0.02em] text-white lg:text-[2.5rem]">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 divide-y divide-[#d8d8d8] border-y border-[#d8d8d8]">
          {visibleFaqs.map((faq, index) => (
            <div key={index}>
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
