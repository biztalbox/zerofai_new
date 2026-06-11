import { getKnowledgePageContent } from "@/lib/site-content";

import { KnowledgePageClient } from "./KnowledgePageClient";

export const dynamic = "force-dynamic";

export default async function KnowledgeCenterPage() {
  const content = await getKnowledgePageContent();
  return <KnowledgePageClient content={content} />;
}
