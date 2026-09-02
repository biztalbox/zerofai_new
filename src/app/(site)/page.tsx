import type { Metadata } from "next";

import { CustomerTrust } from "@/components/CustomerTrust";
import { BridgeCatalog } from "@/components/home2/BridgeCatalog";
import { BridgeFAQ } from "@/components/home2/BridgeFAQ";
import { BridgeHero } from "@/components/home2/BridgeHero";
import { BridgePillars } from "@/components/home2/BridgePillars";
import { BridgeStats } from "@/components/home2/BridgeStats";
import { BridgeWhatIs } from "@/components/home2/BridgeWhatIs";
import CtaBot from "@/components/home2/CtaBot";
import { JsonLdScript } from "@/components/JsonLdScript";
import { NavigationBar } from "@/components/Navigation";
import { getHomepageContent } from "@/lib/homepage";
import { toNextMetadata } from "@/lib/page-seo";
import { getKnowledgePageContent } from "@/lib/site-content";

/**
 * Deliberately dynamic. The expensive part of this route was never the render,
 * it was the Payload/Postgres round trip — and that is now cached at the data
 * layer (see lib/homepage.ts and lib/site-content.ts), which gives the same
 * TTFB win without marking the route static.
 *
 * Marking it ISR instead makes `next dev` re-render it, broadcast a rebuild on
 * the HMR socket, and hard-reload every open tab — an endless reload loop.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageContent();
  return toNextMetadata(content.meta);
}

export default async function HomePage() {
  const [content, knowledge] = await Promise.all([
    getHomepageContent(),
    getKnowledgePageContent(),
  ]);

  return (
    <>
      <JsonLdScript schemaJson={content.meta.schemaJson} />
      <main className="bridge-page min-h-screen overflow-x-hidden bg-white text-[#3d3d3d]">
        <NavigationBar overlay />

        {/* Above the fold — rendered eagerly. */}
        <BridgeHero content={content.hero} />

        {/*
          `cv-auto` lets the browser skip layout and paint for these subtrees
          until they scroll near the viewport. It is deliberately NOT applied
          to the sections that are anchor targets (#what-is, #platform,
          #insights, #knowledge) so in-page navigation still lands exactly.
        */}
        <BridgeWhatIs content={content.whatIs} />

        <div className="cv-auto">
          <CustomerTrust content={content.customerTrust} />
        </div>
        <div className="cv-auto">
          <BridgeStats content={content.stats} />
        </div>

        <BridgePillars content={content.pillars} />

        <div className="cv-auto">
          <CtaBot content={content.cta} />
        </div>

        <BridgeCatalog content={content.catalog} />
        <BridgeFAQ faqs={knowledge.faqs} />
      </main>
    </>
  );
}
