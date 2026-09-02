"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useSiteContent } from "@/components/SiteContentProvider";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { NavLink } from "@/types/site-content";

type NavigationBarProps = {
  overlay?: boolean;
  hardNavigation?: boolean;
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

export function NavigationBar({ overlay = false, hardNavigation = false }: NavigationBarProps) {
  const { navigation } = useSiteContent();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { homeSectionLinks, routeLinks } = navigation;

  const links = useMemo(() => {
    const anchors = homeSectionLinks.filter(
      (link) => link.type === "anchor" && link.href && !link.href.startsWith("/"),
    );
    const routes = routeLinks.filter(
      (link) =>
        link.type === "route" &&
        link.href.startsWith("/") &&
        (!isHomePage || link.showOnHomepage !== false),
    );

    return dedupeNavLinks(isHomePage ? [...anchors, ...routes] : routes);
  }, [homeSectionLinks, routeLinks, isHomePage]);

  const [active, setActive] = useState(homeSectionLinks[0]?.href ?? "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   if (!isHomePage) return;

  //   const sections = homeSectionLinks
  //     .filter((link) => link.type === "anchor" && !link.href.startsWith("/"))
  //     .map((link) => document.getElementById(link.href))
  //     .filter(Boolean) as HTMLElement[];

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) setActive(entry.target.id);
  //       });
  //     },
  //     { rootMargin: "0px 0px 0px 0px", threshold: 0 },
  //   );
  //   sections.forEach((section) => observer.observe(section));
  //   return () => observer.disconnect();
  // }, [isHomePage, homeSectionLinks]);

  const isLinkActive = (link: NavLink) =>
    link.type === "route" ? pathname === link.href : active === link.href;

  const linkClassName = (link: NavLink) =>
    `shrink-0 border-b-[2px] px-4 py-3.5 text-[13px] transition-colors lg:px-5 ${
      isLinkActive(link)
        ? "border-primary font-medium text-[#3d3d3d]"
        : "border-transparent text-[#666] hover:text-[#3d3d3d]"
    }`;

  const mobileLinkClassName = (link: NavLink) =>
    `block border-b border-[#e8e8e8] px-6 py-4 text-[14px] transition-colors last:border-b-0 ${
      isLinkActive(link)
        ? "border-l-2 border-l-primary font-medium text-[#3d3d3d] bg-[#f9f9f9]"
        : "text-[#666] hover:bg-[#f4f4f4] hover:text-[#3d3d3d]"
    }`;

  const renderNavLink = (link: NavLink, className: string, onNavigate?: () => void) =>
    link.type === "route" ? (
      hardNavigation ? (
        <a
          key={`route-${link.href}`}
          href={link.href}
          className={className}
          onClick={onNavigate}
        >
          {link.label}
        </a>
      ) : (
        <Link
          key={`route-${link.href}`}
          href={link.href}
          className={className}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      )
    ) : (
      <a
        key={`anchor-${link.href}`}
        href={`/#${link.href}`}
        onClick={() => {
          setActive(link.href);
          onNavigate?.();
        }}
        className={className}
      >
        {link.label}
      </a>
    );

  const navClassName = overlay
    ? "fixed top-0 left-0 right-0 z-50 border-b border-[#e8e8e8] bg-white"
    : "sticky top-0 z-40 border-b border-[#e8e8e8] bg-[#f4f4f4]";

  return (
    <nav className={navClassName}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {hardNavigation ? (
            <a href="/">
              {navigation.logoUrl ? (
                <Image
                  src={navigation.logoUrl}
                  width={150}
                  height={37}
                  priority
                  sizes="112px"
                  alt="ZerofAI"
                  className="h-auto w-28 px-2 py-3"
                />
              ) : null}
            </a>
          ) : (
            <Link href="/">
              {navigation.logoUrl ? (
                <Image
                  src={navigation.logoUrl}
                  width={150}
                  height={37}
                  priority
                  sizes="112px"
                  alt="ZerofAI"
                  className="h-auto w-28 px-2 py-3"
                />
              ) : null}
            </Link>
          )}

          <div className="hidden overflow-x-auto md:flex">
            {links.map((link) => renderNavLink(link, linkClassName(link)))}
          </div>

          <button
            type="button"
            className="p-2 text-[#3d3d3d] md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[min(85vw,20rem)] border-[#e8e8e8] bg-white p-0 md:hidden"
        >
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <nav className="pt-12">
            {links.map((link) =>
              renderNavLink(link, mobileLinkClassName(link), () => setMobileMenuOpen(false)),
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
