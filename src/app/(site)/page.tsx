import { BridgeCatalog } from "@/components/home2/BridgeCatalog";
import { BridgeFAQ } from "@/components/home2/BridgeFAQ";
import { BridgeHero } from "@/components/home2/BridgeHero";
import { BridgePillars } from "@/components/home2/BridgePillars";
import { BridgeStats } from "@/components/home2/BridgeStats";
import { BridgeWhatIs } from "@/components/home2/BridgeWhatIs";
import CtaBot from "@/components/home2/CtaBot";
import { CustomerTrust } from "@/components/CustomerTrust";
import { NavigationBar } from "@/components/Navigation";
import { getHomepageContent } from "@/lib/homepage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <main className="bridge-page min-h-screen bg-white text-[#3d3d3d]">
      <NavigationBar overlay />
      <BridgeHero content={content.hero} />
      <BridgeWhatIs content={content.whatIs} />
      <CustomerTrust />
      <BridgeStats content={content.stats} />
      <BridgePillars content={content.pillars} />
      <CtaBot content={content.cta} />
      <BridgeCatalog content={content.catalog} />
      <BridgeFAQ />
    </main>
  );
}
