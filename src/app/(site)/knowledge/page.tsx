import type { Metadata } from "next";

import { JsonLdScript } from "@/components/JsonLdScript";
import { toNextMetadata } from "@/lib/page-seo";
import { getKnowledgePageContent } from "@/lib/site-content";

import { KnowledgePageClient } from "./KnowledgePageClient";

// Dynamic route; the CMS reads underneath are cached at the data layer.
// See (site)/page.tsx for why this is not ISR.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getKnowledgePageContent();
  return toNextMetadata(content.meta);
}

export default async function KnowledgeCenterPage() {
  const content = await getKnowledgePageContent();

  return (
    <>
      <JsonLdScript schemaJson={content.meta.schemaJson} />
      <KnowledgePageClient content={content} />
    </>
  );
}
