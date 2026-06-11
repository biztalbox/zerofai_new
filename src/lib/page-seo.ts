import type { Metadata } from "next";

import type { PageSeo } from "@/types/page-seo";

export function mapPageSeo(
  meta: Record<string, unknown> | undefined,
  defaults: PageSeo,
): PageSeo {
  const data = meta ?? {};
  return {
    title: (data.title as string) || defaults.title,
    description: (data.description as string) || defaults.description,
    schemaJson: (data.schemaJson as string) || defaults.schemaJson,
  };
}

export function toNextMetadata(seo: PageSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
  };
}
