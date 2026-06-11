"use client";

import { createContext, useContext, type ReactNode } from "react";

import {
  footerDefaults,
  navigationDefaults,
} from "@/lib/site-defaults";
import type { FooterContent, NavigationContent } from "@/types/site-content";

type SiteContentContextValue = {
  navigation: NavigationContent;
  footer: FooterContent;
};

const SiteContentContext = createContext<SiteContentContextValue>({
  navigation: navigationDefaults,
  footer: footerDefaults,
});

type SiteContentProviderProps = {
  navigation: NavigationContent;
  footer: FooterContent;
  children: ReactNode;
};

export function SiteContentProvider({
  navigation,
  footer,
  children,
}: SiteContentProviderProps) {
  return (
    <SiteContentContext.Provider value={{ navigation, footer }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContentContextValue {
  return useContext(SiteContentContext);
}
