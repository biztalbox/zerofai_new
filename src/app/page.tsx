"use client";

import { BridgeHeader } from "@/components/home2/BridgeHeader";
import { BridgeBreadcrumb } from "@/components/home2/BridgeBreadcrumb";
import { BridgeSubNav } from "@/components/home2/BridgeSubNav";
import { BridgeHero } from "@/components/home2/BridgeHero";
import { BridgeWhatIs } from "@/components/home2/BridgeWhatIs";
import { BridgeStats } from "@/components/home2/BridgeStats";
import { BridgePillars } from "@/components/home2/BridgePillars";
import { BridgeExpertise } from "@/components/home2/BridgeExpertise";
import { BridgeCatalog } from "@/components/home2/BridgeCatalog";
import { BridgeResults } from "@/components/home2/BridgeResults";
import { BridgeResources } from "@/components/home2/BridgeResources";
import { BridgeFAQ } from "@/components/home2/BridgeFAQ";
import { BridgeFooter } from "@/components/home2/BridgeFooter";
import { Header } from "@/components/Header";
import { CustomerTrust } from "@/components/CustomerTrust";
import CtaBot from "@/components/home2/CtaBot";
import Leadership from "@/components/home2/Leadership";
import { Footer } from "@/components/Footer";

export default function Home2Page() {
  return (
    <div className="bridge-page min-h-screen bg-white text-[#3d3d3d]">
      {/* <BridgeHeader /> */}
      <Header/>
      <BridgeBreadcrumb />
      <BridgeHero />
      <BridgeSubNav />
      <main>
        <BridgeWhatIs />
        <CustomerTrust />
        <BridgeStats />
        <BridgePillars />
        <CtaBot />
        {/* <BridgeExpertise /> */}
        <BridgeCatalog />
        {/* <BridgeResults /> */}
        {/* <BridgeResources /> */}
        <Leadership />
        <BridgeFAQ />
      </main>
      {/* <BridgteeFooter /> */}
      <Footer />
    </div>
  );
}
