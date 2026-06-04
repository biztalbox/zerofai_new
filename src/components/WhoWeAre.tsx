import { useState } from "react";
import { Play } from "lucide-react";

export function WhoWeAre() {
  const [hover, setHover] = useState(false);
  return (
    <section className="bg-background">
      <div className="grid lg:grid-cols-2">
        {/* Left text */}
        <div className="flex items-center px-6 py-20 lg:px-20 lg:py-28">
          <div className="max-w-xl">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Who we are</div>
            <div className="mt-3 h-[2px] w-10 bg-coral" />
            <h2 className="mt-10 text-4xl font-light leading-[1.15] text-foreground md:text-[44px]">
              Where continuous innovation meets operational excellence
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-foreground/75">
              We help customers in every industry ensure their essential systems will work when, where, and how they need them to.
              But steady operations aren't enough in today's dynamic IT landscape — Zerofai brings the data, insights, patterns and
              proven methodologies businesses need to stay competitive.
            </p>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-[15px]">
              {["Our story", "Awards and recognition", "Analyst recognition"].map((l, i) => (
                <a key={l} href="#" className={`group inline-flex items-center text-coral hover:text-coral-hover ${i ? "border-l border-border pl-8" : ""}`}>
                  <span className="story-link">{l}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right coral panel with hover reveal */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="group relative min-h-[460px] overflow-hidden bg-coral lg:min-h-[640px]"
        >
          {/* Revealed image */}
          <div
            className="absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{
              opacity: hover ? 1 : 0,
              transform: hover ? "scale(1)" : "scale(1.08)",
              backgroundImage:
                "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0 bg-black/35 transition-opacity duration-700"
            style={{ opacity: hover ? 1 : 0 }}
          />
          {/* Headline */}
          <div className="relative flex h-full min-h-[460px] items-center justify-center px-6 lg:min-h-[640px]">
            <h3
              className="text-center text-5xl font-light text-white transition-transform duration-700 md:text-6xl lg:text-7xl"
              style={{ transform: hover ? "translateY(-12px)" : "translateY(0)" }}
            >
              We are Zerofai
            </h3>
          </div>
          {/* Watch button */}
          <button className="absolute bottom-8 left-8 inline-flex items-center gap-3 border border-white px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-coral">
            <Play className="h-3.5 w-3.5 fill-current" /> Watch
          </button>
        </div>
      </div>
    </section>
  );
}
