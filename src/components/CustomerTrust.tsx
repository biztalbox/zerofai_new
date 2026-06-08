import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const cards = [
  { num: "01", img: "/assets/ravi.png"},
  { num: "02", img: "/assets/rajeev.png" },
];

export function CustomerTrust() {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-secondary py-24">
      <div className="grid items-stretch lg:grid-cols-[1fr_2fr]">
        {/* Left label */}
        <div className="flex flex-col justify-between px-6 py-12 lg:px-16">
          <h2 className="text-5xl font-light leading-[1.1] text-foreground md:text-6xl">
           Customer trust.{" "}<br />
            <span className="text-primary">Real transformation.</span>
          </h2>
          <div className="mt-12 flex gap-2">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              className="flex h-10 w-10 items-center justify-center text-foreground/70 transition hover:text-foreground"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setActive((a) => Math.min(cards.length - 1, a + 1))}
              className="flex h-10 w-10 items-center justify-center text-foreground/70 transition hover:text-foreground"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Right columns */}
        <div className="flex overflow-hidden">
          {cards.map((c, i) => {
            const isActive = i === active;
            const shade = ["#00a6cd", "#0079c9", "#009dcd", "#0087cb", "#0079c9"][i];
            return (
              <button
                key={c.num}
                onClick={() => setActive(i)}
                className="relative flex h-full flex-col justify-between overflow-hidden text-left text-white transition-all duration-[700ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ flex: isActive ? "1 1 0%" : "0 0 90px", background: shade }}
              >
                <div className="p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-xs">
                    {c.num}
                  </div>
                </div>
                <div
                  className="px-0 pb-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <Image src={c.img} width="1000" height="1000" alt="Customer Trust"  className="w-full h-full object-cover" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
