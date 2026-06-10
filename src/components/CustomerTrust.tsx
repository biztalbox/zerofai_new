"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import type { HomepageCustomerTrust } from "@/types/homepage";

const SHADES = ["#00a6cd", "#0079c9", "#009dcd", "#0087cb", "#0079c9"];

type Props = {
  content: HomepageCustomerTrust;
};

export function CustomerTrust({ content }: Props) {
  const [active, setActive] = useState(1);
  const cards = content.cards;

  return (
    <section className="bg-secondary py-24">
      <div className="grid items-stretch lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col justify-between px-6 py-12 lg:px-16">
          <h2 className="text-5xl font-light leading-[1.1] text-foreground md:text-6xl">
            {content.heading}{" "}
            <br />
            <span className="text-primary">{content.headingHighlight}</span>
          </h2>
          <div className="mt-12 flex gap-2">
            <button
              onClick={() => setActive((current) => Math.max(0, current - 1))}
              className="flex h-10 w-10 items-center justify-center text-foreground/70 transition hover:text-foreground"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setActive((current) => Math.min(cards.length - 1, current + 1))}
              className="flex h-10 w-10 items-center justify-center text-foreground/70 transition hover:text-foreground"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex overflow-hidden">
          {cards.map((card, index) => {
            const isActive = index === active;
            const shade = SHADES[index % SHADES.length];

            return (
              <button
                key={card.number}
                onClick={() => setActive(index)}
                className="relative flex h-full flex-col justify-between overflow-hidden text-left text-white transition-all duration-[700ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ flex: isActive ? "1 1 0%" : "0 0 90px", background: shade }}
              >
                <div className="p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-xs">
                    {card.number}
                  </div>
                </div>
                <div
                  className="px-0 pb-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <Image
                    src={card.imageUrl}
                    width={1000}
                    height={1000}
                    alt={`Customer trust ${card.number}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
