"use client"
import { ArrowRight, Cloud, Shield, Database, Network, Cpu, Layers } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WhoWeAre } from "@/components/WhoWeAre";
import { IndustryRecognition } from "@/components/IndustryRecognition";
import { useEffect, useRef, useState } from "react";



const slides = [
  {
    eyebrow: "AI",
    title: ["Enable innovation", "without losing", "control"],
    sub: "Governed AI starts with infrastructure you can trust.",
    cta: "Read the article",
    video: "https://www.kyndryl.com/content/dam/kyndrylprogram/images/global/ai-abstract/videos/Bloomberg-AI-16x9-02.mp4",
  },
  {
    eyebrow: "Connection",
    title: ["Modernize core", "systems on", "your terms"],
    sub: "From mainframe to multicloud — without breaking what works.",
    cta: "See the playbook",
    video: "https://s7d1.scene7.com/is/content/kyndryl/connection-is-resilience-header-video-16x9",
  },
  {
    eyebrow: "Agentic AI",
    title: ["Turn data into", "decisions, not", "dashboards"],
    sub: "Production-grade AI built on the data you already own.",
    cta: "Explore Data & AI",
    video: "https://s7d1.scene7.com/is/content/kyndryl/agerntic-ai-mainframe-solution-16x9-looped",
  },
];

const services = [
  { icon: Cloud, title: "Cloud", desc: "Multicloud strategy, migration and operations across AWS, Azure and Google Cloud." },
  { icon: Shield, title: "Cybersecurity & Resilience", desc: "Zero-trust architectures, threat detection and rapid recovery for regulated industries." },
  { icon: Database, title: "Data & AI", desc: "Modern data platforms and production AI you can actually govern." },
  { icon: Network, title: "Network & Edge", desc: "Software-defined networks engineered for latency, scale and security." },
  { icon: Cpu, title: "Core Enterprise & zCloud", desc: "Mainframe modernization and hybrid integration for mission-critical workloads." },
  { icon: Layers, title: "Applications, Data & AI", desc: "Build, migrate and modernize applications across every layer of the stack." },
];

const industries = ["Banking", "Insurance", "Healthcare", "Retail", "Manufacturing", "Public sector", "Telecom", "Energy"];

const insights = [
  { tag: "Report", title: "The 2026 State of Mainframe Modernization", desc: "Why 76% of enterprises are choosing integration over replacement." },
  { tag: "Article", title: "Governing agentic AI in regulated industries", desc: "A pragmatic framework for shipping autonomous systems safely." },
  { tag: "Case study", title: "A global bank cuts incident MTTR by 64%", desc: "Inside a four-quarter platform consolidation program." },
];

export default function Page() {
  const [slide, setSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // auto-advance slides
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, []);

  // ensure the active video plays
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === slide) v.play().catch(() => { });
      else v.pause();
    });
  }, [slide]);

  const s = slides[slide];

  return (
    <div className="bg-background">
      <Header />

      {/* HERO with looping video backgrounds */}
      <section className="relative min-h-screen overflow-hidden bg-navy-deep">
        {slides.map((sl, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={sl.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ opacity: i === slide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-deep/70" />

        <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 pt-[180px] pb-28 lg:px-12">
          <div key={slide} className="max-w-2xl">
            <div className="fade-up text-sm uppercase tracking-[0.18em] text-coral">{s.eyebrow}</div>
            <h1 className="fade-up-2 mt-6 text-5xl font-light leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {s.title.map((t, i) => <div key={i}>{t}</div>)}
            </h1>
            <p className="fade-up-3 mt-8 max-w-lg text-lg text-white/80">{s.sub}</p>
            <button className="fade-up-4 group mt-10 inline-flex items-center gap-3 border border-white/60 px-7 py-3.5 text-sm font-medium text-white transition hover:border-coral hover:bg-coral">
              {s.cta}
              <ArrowRight className="hover-arrow h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === slide ? "w-10 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE — hover reveal */}
      <WhoWeAre />

      {/* INDUSTRY RECOGNITION — click to expand */}
      <IndustryRecognition />

      {/* SERVICES */}
      <section className="bg-secondary py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.18em] text-coral">Services</div>
            <h2 className="mt-6 max-w-2xl text-4xl font-light leading-tight md:text-5xl">Solutions across the stack you depend on.</h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((sv, i) => (
              <Reveal key={sv.title} delay={i * 60}>
                <a href="#" className="card-hover group flex h-full flex-col justify-between bg-background p-10">
                  <div>
                    <sv.icon className="h-10 w-10 text-coral" strokeWidth={1.25} />
                    <h3 className="mt-8 text-2xl font-medium">{sv.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{sv.desc}</p>
                  </div>
                  <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-coral">
                    Explore <ArrowRight className="hover-arrow h-4 w-4" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK BAND */}
      <section className="bg-navy py-28 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.18em] text-coral">Consulting</div>
            <h2 className="mt-6 text-4xl font-light leading-tight md:text-5xl">Strategy meets the systems that run on it.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg text-white/70">Our consultants don't hand off a deck and disappear. We sit beside your engineers, architect the path, and stay until your platform is doing what we promised it would.</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-10">
              {[{ n: "90k+", l: "Practitioners" }, { n: "60+", l: "Countries" }, { n: "$17B+", l: "Revenue" }].map((m) => (
                <div key={m.l}>
                  <div className="text-4xl font-light">{m.n}</div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-white/50">{m.l}</div>
                </div>
              ))}
            </div>
            <a href="#" className="group mt-10 inline-flex items-center gap-3 text-base font-medium text-white hover:text-coral">
              Meet Zerofai Consult <ArrowRight className="hover-arrow h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b border-border bg-background py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.18em] text-coral">Industries</div>
            <h2 className="mt-6 max-w-3xl text-4xl font-light leading-tight md:text-5xl">Built for the industries that can't afford downtime.</h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind} delay={i * 40}>
                <a href="#" className="group flex items-center justify-between bg-background p-8 transition hover:bg-secondary">
                  <span className="text-xl font-medium">{ind}</span>
                  <ArrowRight className="hover-arrow h-5 w-5 text-coral" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="bg-secondary py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-coral">Insights</div>
                <h2 className="mt-6 text-4xl font-light leading-tight md:text-5xl">Latest thinking.</h2>
              </div>
              <a href="#" className="group hidden items-center gap-2 text-sm font-medium text-coral md:inline-flex">View all <ArrowRight className="hover-arrow h-4 w-4" /></a>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {insights.map((it, i) => (
              <Reveal key={it.title} delay={i * 100}>
                <a href="#" className="card-hover group block h-full bg-background p-8">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-navy via-navy-deep to-coral/60" />
                  <div className="mt-6 text-xs uppercase tracking-wider text-coral">{it.tag}</div>
                  <h3 className="mt-3 text-xl font-medium leading-snug">{it.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-coral">Read <ArrowRight className="hover-arrow h-4 w-4" /></div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-32 text-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <h2 className="max-w-4xl text-5xl font-light leading-[1.1] md:text-6xl">Let's build what's next, together.</h2>
            <div className="mt-12 flex flex-wrap gap-4">
              <a href="#" className="group inline-flex items-center gap-3 bg-coral px-8 py-4 text-sm font-medium text-white transition hover:bg-coral-hover">
                Contact us <ArrowRight className="hover-arrow h-4 w-4" />
              </a>
              <a href="#" className="group inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-sm font-medium text-white transition hover:border-white">
                Explore careers <ArrowRight className="hover-arrow h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
