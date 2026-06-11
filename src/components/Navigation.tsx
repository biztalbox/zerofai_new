"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useSiteContent } from "@/components/SiteContentProvider";
import type { NavLink } from "@/types/site-content";

type NavigationBarProps = {
  overlay?: boolean;
};

function dedupeNavLinks(links: NavLink[]): NavLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.type}:${link.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function NavigationBar({ overlay = false }: NavigationBarProps) {
  const { navigation } = useSiteContent();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { homeSectionLinks, routeLinks } = navigation;

  const links = useMemo(() => {
    const anchors = homeSectionLinks.filter(
      (link) => link.type === "anchor" && link.href && !link.href.startsWith("/"),
    );
    const routes = routeLinks.filter(
      (link) => link.type === "route" && link.href.startsWith("/"),
    );

    return dedupeNavLinks(isHomePage ? [...anchors, ...routes] : routes);
  }, [homeSectionLinks, routeLinks, isHomePage]);

  const [active, setActive] = useState(homeSectionLinks[0]?.href ?? "");

  useEffect(() => {
    if (!isHomePage) return;

    const sections = homeSectionLinks
      .filter((link) => link.type === "anchor" && !link.href.startsWith("/"))
      .map((link) => document.getElementById(link.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage, homeSectionLinks]);

  const isLinkActive = (link: NavLink) =>
    link.type === "route" ? pathname === link.href : active === link.href;

  const linkClassName = (link: NavLink) =>
    `shrink-0 border-b-[2px] px-4 py-3.5 text-[13px] transition-colors lg:px-5 ${
      isLinkActive(link)
        ? "border-primary font-medium text-[#3d3d3d]"
        : "border-transparent text-[#666] hover:text-[#3d3d3d]"
    }`;

  const navClassName = overlay
    ? "fixed top-0 left-0 right-0 z-50 border-b border-[#e8e8e8] bg-white"
    : "sticky top-0 z-40 border-b border-[#e8e8e8] bg-[#f4f4f4]";

  return (
    <nav className={navClassName}>
      <div className="mx-auto flex container overflow-x-auto px-6 lg:px-10">
        <Link href="/">
          <img
            width="150"
            height="50"
            src={navigation.logoUrl}
            alt="ZerofAI"
            className="w-28 px-2 py-3"
          />
        </Link>
        {links.map((link) =>
          link.type === "route" ? (
            <Link key={`route-${link.href}`} href={link.href} className={linkClassName(link)}>
              {link.label}
            </Link>
          ) : (
            <a
              key={`anchor-${link.href}`}
              href={`/#${link.href}`}
              onClick={() => setActive(link.href)}
              className={linkClassName(link)}
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
