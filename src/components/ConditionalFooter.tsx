"use client";

import { usePathname } from "next/navigation";

import { useSiteContent } from "@/components/SiteContentProvider";
import { Footer } from "@/components/Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const { footer } = useSiteContent();

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return null;
  }

  return <Footer content={footer} />;
}
