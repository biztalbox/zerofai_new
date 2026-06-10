"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const homeSectionLinks = [
  { label: "What is ZerofAI?", id: "what-is" },
  { label: "Platform", id: "platform" },
  { label: "Insights", id: "insights" },
];

const routeLinks = [
  { label: "Our Team", id: "/our-team" },
  { label: "Blog", id: "/blog" },
  { label: "Knowledge", id: "/knowledge" },
  { label: "Contact us", id: "/contact" },
];

const isRouteLink = (id: string) => id.startsWith("/");

export function NavigationBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const links = isHomePage ? [...homeSectionLinks, ...routeLinks] : routeLinks;
  const [active, setActive] = useState(homeSectionLinks[0].id);

  useEffect(() => {
    if (!isHomePage) return;

    const sections = homeSectionLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  const isLinkActive = (id: string) =>
    isRouteLink(id) ? pathname === id : active === id;

  const linkClassName = (id: string) =>
    `shrink-0 border-b-[2px] px-4 py-3.5 text-[13px] transition-colors lg:px-5 ${
      isLinkActive(id)
        ? "border-primary font-medium text-[#3d3d3d]"
        : "border-transparent text-[#666] hover:text-[#3d3d3d]"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-[#e8e8e8] bg-[#f4f4f4]">
      <div className="mx-auto flex container overflow-x-auto px-6 lg:px-10">

      <Link href="/">
          <img width="150" height="50" src="/assets/logo.png" className="w-28 px-2 py-3" />
        </Link>
        {links.map((link) =>
          isRouteLink(link.id) ? (
            <Link key={link.id} href={link.id} className={linkClassName(link.id)}>
              {link.label}
            </Link>
          ) : (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setActive(link.id)}
              className={linkClassName(link.id)}
            >
              {link.label}
            </a>
          )
        )}
      </div>
    </nav>
  );
}
