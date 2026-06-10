"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

const SHADES = ["#00a6cd", "#0079c9", "#009dcd", "#0087cb", "#0079c9"];

const customerTrustCards = [
  { num: "01", img: "/assets/ravi.png", videoId: "kLja5C1i_kk" },
  { num: "02", img: "/assets/rajeev.png", videoId: "Qo6BTfEd8UE" },
];

export function CustomerTrust() {
  const [active, setActive] = useState(1);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="bg-secondary py-24">
      <div className="grid items-stretch lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col justify-between px-6 py-12 lg:px-16">
          <h2 className="text-5xl font-light leading-[1.1] text-foreground md:text-6xl">
            Customer trust. <br />
            <span className="text-primary">Real transformation.</span>
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
              onClick={() => setActive((current) => Math.min(customerTrustCards.length - 1, current + 1))}
              className="flex h-10 w-10 items-center justify-center text-foreground/70 transition hover:text-foreground"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex overflow-hidden">
          {customerTrustCards.map((card, index) => {
            const isActive = index === active;
            const shade = SHADES[index % SHADES.length];

            return (
              <button
                key={card.num}
                onClick={() => setActive(index)}
                className="relative flex h-full flex-col justify-between overflow-hidden text-left text-white transition-all duration-[700ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ flex: isActive ? "1 1 0%" : "0 0 90px", background: shade }}
              >
                <div className="p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-xs">
                    {card.num}
                  </div>
                </div>
                <div
                  className="px-0 pb-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                  onClick={(e) => {
                    if (isActive && card.videoId) {
                      e.stopPropagation();
                      setActiveVideoId(card.videoId);
                    }
                  }}
                >
                  <Image
                    src={card.img}
                    width={1000}
                    height={1000}
                    alt="Customer Trust"
                    className={`h-full w-full object-cover ${card.videoId ? "cursor-pointer" : ""}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!activeVideoId} onOpenChange={(open) => !open && setActiveVideoId(null)}>
        <DialogContent className="w-auto max-w-none overflow-visible border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <div className="flex items-start gap-3">
            {activeVideoId && (
              <div className="relative aspect-[9/16] w-[min(400px,85vw)] overflow-hidden rounded-lg bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  title="Customer testimonial video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            )}
            <DialogClose
              className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full  text-white  transition hover:scale-105 hover:border focus:ring-2 focus:ring-white"
              aria-label="Close video"
            >
              <X className="h-7 w-7 stroke-[2.5]" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
