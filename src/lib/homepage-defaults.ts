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
  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    visibleCount: 5,
    items: [
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
    ],
  },
};
