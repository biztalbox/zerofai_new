"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "What is ZerofAI?", id: "what-is" },
  { label: "Platform", id: "platform" },
  { label: "Insights", id: "insights" },
  { label: "Leadership", id: "leadership" },
  { label: "Contact us", id: "contact" },
];

export function BridgeSubNav() {
  const [active, setActive] = useState(links[0].id);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-14 z-40 border-b border-[#e8e8e8] bg-[#f4f4f4]">
      <div className="mx-auto flex container overflow-x-auto px-6 lg:px-10">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setActive(link.id)}
            className={`shrink-0 border-b-[2px] px-4 py-3.5 text-[13px] transition-colors lg:px-5 ${
              active === link.id
                ? "border-primary font-medium text-[#3d3d3d]"
                : "border-transparent text-[#666] hover:text-[#3d3d3d]"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
