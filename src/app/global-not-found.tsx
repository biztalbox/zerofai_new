import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import { NotFoundContent } from "@/components/NotFoundContent";
import { NavigationBar } from "@/components/Navigation";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { getFooterContent, getNavigationContent } from "@/lib/site-content";

import "./globals.css";
import { ConditionalFooter } from "@/components/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 - Page Not Found | ZeroFAI",
  description: "The page you are looking for could not be found.",
};

export default async function GlobalNotFound() {
  const [navigation, footer] = await Promise.all([
    getNavigationContent(),
    getFooterContent(),
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteContentProvider navigation={navigation} footer={footer}>
          <NavigationBar hardNavigation />
          <NotFoundContent hardNavigation />
          <ConditionalFooter />
        </SiteContentProvider>
      </body>
    </html>
  );
}
