import type { HomepageContent } from "@/types/homepage";

export const homepageDefaults: HomepageContent = {
  hero: {
    videoUrl: "/assets/Zerofai_mashup.mp4",
    title: "Autonomous IT Operations Platform",
    ctaLabel: "Request a Demo",
    ctaLink: "/contact",
  },
  whatIs: {
    title: "What is ZerofAI?",
    paragraphs: [
      "Modern enterprises struggle with growing operational complexity, fragmented tools, rising support workloads, and increasing demands for seamless digital experiences. At the core is ZerofAI, an AI-powered Autonomous IT Operations Platform that helps organizations observe, analyze, predict, and automate across their technology environment.",
      "By combining operational intelligence, autonomous remediation, workplace experience insights, and predictive analytics into a unified platform, ZerofAI enables organizations to reduce operational overhead, improve resilience, enhance employee experience, and continuously evolve toward more autonomous operations.",
    ],
    videoUrl: "/assets/zerofai_intro.mp4",
  },
  customerTrust: {
    heading: "Customer trust.",
    headingHighlight: "Real transformation.",
    cards: [
      { number: "01", imageUrl: "/assets/ravi.png", videoId: "kLja5C1i_kk" },
      { number: "02", imageUrl: "/assets/rajeev.png", videoId: "Qo6BTfEd8UE" },
    ],
  },
  stats: {
    sectionLabel: "The Foundation Behind ZerofAI",
    items: [
      { value: "38+ Years", label: "Of Enterprise IT Expertise" },
      { value: "2500+", label: "Trusted Clients" },
      { value: "AI-Powered", label: "Autonomous Operations" },
    ],
  },
  pillars: {
    title: "Journey to Autonomous IT Operations",
    items: [
      {
        title: "Observe",
        description:
          "Gain real-time visibility across endpoints, users, applications, services, and operational workflows. ZerofAI continuously analyzes enterprise signals to uncover issues, experience gaps, and operational bottlenecks before they escalate.",
        imageUrl: "/assets/observe.png",
      },
      {
        title: "Predict",
        description:
          "Move beyond monitoring. ZerofAI uses operational intelligence and behavioral analytics to identify emerging risks, recurring issues, and experience degradation patterns before they impact users or business operations.",
        imageUrl: "/assets/predict.png",
      },
      {
        title: "Automate",
        description:
          "Transform insights into action. ZerofAI orchestrates remediation workflows, resolves repetitive operational issues, and enables autonomous execution to reduce manual effort and improve operational resilience.",
        imageUrl: "/assets/automate.png",
      },
    ],
  },
  cta: {
    title: "Spend 30 Minutes Exploring the Future of IT Operations",
    description:
      "Meet with a ZerofAI specialist to understand how autonomous operations can help simplify IT management, improve employee experience, and accelerate digital transformation.",
    buttonLabel: "Request a Demo",
    buttonLink: "/contact",
  },
  catalog: {
    imageUrl: "/assets/insights.jpg",
    paragraphs: [
      "Stay informed with expert perspectives, industry trends, and practical insights on autonomous IT operations, workplace experience, predictive intelligence, and the future of enterprise technology.",
      "Explore how organizations are transforming IT operations through automation, operational intelligence, and AI-driven decision-making.",
    ],
    ctaLabel: "Visit the Resource Center",
    ctaLink: "/blog",
  },
};
