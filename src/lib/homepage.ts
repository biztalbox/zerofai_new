import type { Media } from "@/payload-types";
import type { HomepageContent } from "@/types/homepage";

import { getMediaUrl } from "@/lib/blog";
import { homepageDefaults } from "@/lib/homepage-defaults";
import { getPayloadClient } from "@/lib/payload";

function resolveUploadUrl(
  media: number | Media | null | undefined,
  fallback: string,
): string {
  return getMediaUrl(media) ?? fallback;
}

function mapHomepageFromCms(data: Record<string, unknown>): HomepageContent {
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  const whatIs = (data.whatIs ?? {}) as Record<string, unknown>;
  const customerTrust = (data.customerTrust ?? {}) as Record<string, unknown>;
  const stats = (data.stats ?? {}) as Record<string, unknown>;
  const pillars = (data.pillars ?? {}) as Record<string, unknown>;
  const cta = (data.cta ?? {}) as Record<string, unknown>;
  const catalog = (data.catalog ?? {}) as Record<string, unknown>;
  const faq = (data.faq ?? {}) as Record<string, unknown>;

  return {
    hero: {
      videoUrl: resolveUploadUrl(
        hero.video as number | Media | null | undefined,
        (hero.videoUrl as string) || homepageDefaults.hero.videoUrl,
      ),
      title: (hero.title as string) || homepageDefaults.hero.title,
      ctaLabel: (hero.ctaLabel as string) || homepageDefaults.hero.ctaLabel,
      ctaLink: (hero.ctaLink as string) || homepageDefaults.hero.ctaLink,
    },
    whatIs: {
      title: (whatIs.title as string) || homepageDefaults.whatIs.title,
      paragraphs:
        Array.isArray(whatIs.paragraphs) && whatIs.paragraphs.length > 0
          ? whatIs.paragraphs
              .map((item) => (item as { text?: string }).text)
              .filter((text): text is string => Boolean(text))
          : homepageDefaults.whatIs.paragraphs,
      videoUrl: resolveUploadUrl(
        whatIs.video as number | Media | null | undefined,
        (whatIs.videoUrl as string) || homepageDefaults.whatIs.videoUrl,
      ),
    },
    customerTrust: {
      heading: (customerTrust.heading as string) || homepageDefaults.customerTrust.heading,
      headingHighlight:
        (customerTrust.headingHighlight as string) ||
        homepageDefaults.customerTrust.headingHighlight,
      cards:
        Array.isArray(customerTrust.cards) && customerTrust.cards.length > 0
          ? customerTrust.cards.map((card, index) => {
              const item = card as { number?: string; image?: number | Media | null };
              const fallback = homepageDefaults.customerTrust.cards[index];
              return {
                number: item.number || fallback?.number || String(index + 1).padStart(2, "0"),
                imageUrl: resolveUploadUrl(
                  item.image,
                  (item as { imageUrl?: string }).imageUrl || fallback?.imageUrl || "",
                ),
                videoId:
                  (item as { videoId?: string }).videoId || fallback?.videoId || undefined,
              };
            })
          : homepageDefaults.customerTrust.cards,
    },
    stats: {
      sectionLabel: (stats.sectionLabel as string) || homepageDefaults.stats.sectionLabel,
      items:
        Array.isArray(stats.items) && stats.items.length > 0
          ? stats.items.map((item, index) => {
              const stat = item as { value?: string; label?: string; description?: string };
              const fallback = homepageDefaults.stats.items[index];
              return {
                value: stat.value || fallback?.value || "",
                label: stat.label || fallback?.label || "",
                description: stat.description || fallback?.description,
              };
            })
          : homepageDefaults.stats.items,
    },
    pillars: {
      title: (pillars.title as string) || homepageDefaults.pillars.title,
      items:
        Array.isArray(pillars.items) && pillars.items.length > 0
          ? pillars.items.map((item, index) => {
              const pillar = item as {
                title?: string;
                description?: string;
                image?: number | Media | null;
              };
              const fallback = homepageDefaults.pillars.items[index];
              return {
                title: pillar.title || fallback?.title || "",
                description: pillar.description || fallback?.description || "",
                imageUrl: resolveUploadUrl(pillar.image, fallback?.imageUrl ?? ""),
              };
            })
          : homepageDefaults.pillars.items,
    },
    cta: {
      title: (cta.title as string) || homepageDefaults.cta.title,
      description: (cta.description as string) || homepageDefaults.cta.description,
      buttonLabel: (cta.buttonLabel as string) || homepageDefaults.cta.buttonLabel,
      buttonLink: (cta.buttonLink as string) || homepageDefaults.cta.buttonLink,
    },
    catalog: {
      imageUrl: resolveUploadUrl(
        catalog.image as number | Media | null | undefined,
        homepageDefaults.catalog.imageUrl,
      ),
      paragraphs:
        Array.isArray(catalog.paragraphs) && catalog.paragraphs.length > 0
          ? catalog.paragraphs
              .map((item) => (item as { text?: string }).text)
              .filter((text): text is string => Boolean(text))
          : homepageDefaults.catalog.paragraphs,
      ctaLabel: (catalog.ctaLabel as string) || homepageDefaults.catalog.ctaLabel,
      ctaLink: (catalog.ctaLink as string) || homepageDefaults.catalog.ctaLink,
    },
    faq: {
      eyebrow: (faq.eyebrow as string) || homepageDefaults.faq.eyebrow,
      title: (faq.title as string) || homepageDefaults.faq.title,
      visibleCount:
        typeof faq.visibleCount === "number" && faq.visibleCount > 0
          ? faq.visibleCount
          : homepageDefaults.faq.visibleCount,
      items:
        Array.isArray(faq.items) && faq.items.length > 0
          ? faq.items.map((item, index) => {
              const faqItem = item as { id?: string; question?: string; answer?: string };
              const fallback = homepageDefaults.faq.items[index];
              return {
                id: faqItem.id || fallback?.id || `faq-${index}`,
                question: faqItem.question || fallback?.question || "",
                answer: faqItem.answer || fallback?.answer || "",
              };
            })
          : homepageDefaults.faq.items,
    },
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const payload = await getPayloadClient();
    const homepage = await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    });

    return mapHomepageFromCms(homepage as Record<string, unknown>);
  } catch {
    return homepageDefaults;
  }
}
