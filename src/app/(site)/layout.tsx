import { ConditionalFooter } from "@/components/ConditionalFooter";
import { DeferredChatBot } from "@/components/lazy/DeferredChatBot";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { getFooterContent, getNavigationContent } from "@/lib/site-content";

/** CMS media origin — warming it removes a DNS + TLS hop from the LCP path. */
const MEDIA_ORIGIN = "https://agqugimammzwbqtyqwry.supabase.co";

/**
 * Only the two weights used above the fold. The @font-face rules themselves
 * live in globals.css; next/font is deliberately not used here because its
 * loader crashed Turbopack in dev and put the server in a reload loop.
 *
 * These are plain children, not wrapped in a manual <head> — React 19 hoists
 * <link> elements into the document head on its own.
 */
const PRELOADED_FONTS = [
  "/twk-everett/TWKEverett-Regular.woff2",
  "/twk-everett/TWKEverett-Medium.woff2",
];

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <link rel="preconnect" href={MEDIA_ORIGIN} crossOrigin="" />
        <link rel="dns-prefetch" href={MEDIA_ORIGIN} />
        {PRELOADED_FONTS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
        <SiteContentProvider navigation={navigation} footer={footer}>
          {children}
          <DeferredChatBot />
          <ConditionalFooter />
        </SiteContentProvider>
      </body>
    </html>
  );
}
