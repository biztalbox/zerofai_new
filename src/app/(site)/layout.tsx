import { Geist, Geist_Mono } from "next/font/google";

import { ContactChatBot } from "@/app/(site)/contact/ContactChatBot";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { getFooterContent, getNavigationContent } from "@/lib/site-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {children}
          <ContactChatBot />
          <ConditionalFooter />
        </SiteContentProvider>
      </body>
    </html>
  );
}
