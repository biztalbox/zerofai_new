"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NavigationBar } from "@/components/Navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { KnowledgePageContent } from "@/types/site-content";

type KnowledgePageClientProps = {
  content: KnowledgePageContent;
};

export function KnowledgePageClient({ content }: KnowledgePageClientProps) {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.faqs;
    return content.faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query),
    );
  }, [search, content.faqs]);

  return (
    <main>
      <NavigationBar />

      <section className="relative  overflow-hidden md:min-h-[320px] lg:min-h-[360px]">
        <Image
          src={content.hero.imageUrl}
          alt={content.hero.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex h-full min-h-[280px] container items-center px-6 py-12 md:min-h-[320px] lg:min-h-[360px] lg:px-10 lg:py-16">
          <div>
            {content.hero.eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                {content.hero.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
              {content.hero.title}
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container max-w-7xl mx-auto relative px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
          <div className="mt-8 sm:mt-10">
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

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6 rounded-xl border border-neutral-200/70 bg-white/70 px-5 py-6 shadow-sm backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7 dark:border-white/10 dark:bg-[#0c1424]/55 dark:shadow-none">
            <div className="text-center sm:text-left">
              <h2 className="text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
                {content.ctaTitle}
              </h2>
              <p className="mt-1.5 text-sm! leading-relaxed text-neutral-600 dark:text-[#94A3B8]">
                {content.ctaDescription}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href={content.ctaButtonLink}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {content.ctaButtonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
