"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavigationBar } from "@/components/Navigation";
import Image from "next/image";

const FAQ_ITEMS = [
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
] as const;

const KnowledgeCenterPage = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <main>
      <NavigationBar />

     

<section className="relative  overflow-hidden md:min-h-[320px] lg:min-h-[360px]">
  <Image
    src="https://plus.unsplash.com/premium_photo-1664474834472-6c7d1e3198e2?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29ya2luZyUyMGVtcGxveWVlc3xlbnwwfHwwfHx8MA%3D%3D"
    alt="Team collaborating in a modern office"
    fill
    priority
    className="object-cover object-center"
  />
  <div
    className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
    aria-hidden
  />
  <div className="relative mx-auto flex h-full min-h-[280px] container items-center px-6 py-12 md:min-h-[320px] lg:min-h-[360px] lg:px-10 lg:py-16">
    <div className="">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
       FAQs
      </p>
      <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
        Knowledge Center
      </h1>
    </div>
  </div>
</section>
      <section className="">
        <div className="container relative px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">


          {/* FAQ list */}
          <div className="mx-auto mt-8 sm:mt-10">
            {filteredFaqs.length === 0 ? (
              <p className="rounded-xl border border-neutral-200/60 bg-white/60 px-5 py-8 text-center text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-[#94A3B8]">
                No matching questions found. Try a different search term.
              </p>
            ) : (
              <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
                {filteredFaqs.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="overflow-hidden rounded-xl border border-b-0 border-neutral-200/70 bg-white/70 shadow-sm backdrop-blur-sm last:border-b-0 dark:border-white/10 dark:bg-[#0c1424]/55 dark:shadow-none"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold text-neutral-950 data-[state=open]:text-primary sm:px-5 sm:py-5 sm:text-base dark:text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm leading-relaxed text-neutral-600 sm:px-5 sm:text-[15px] dark:text-[#94A3B8]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

          {/* Still have questions? */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6 rounded-xl border border-neutral-200/70 bg-white/70 px-5 py-6 shadow-sm backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7 dark:border-white/10 dark:bg-[#0c1424]/55 dark:shadow-none">
            <div className="text-center sm:text-left">
              <h2 className="text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
                Still have questions?
              </h2>
              <p className="mt-1.5 text-sm! leading-relaxed text-neutral-600 dark:text-[#94A3B8]">
                Our engineering team is ready to walk you through a custom demo.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Contact Support
              </Link>
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeCenterPage;
