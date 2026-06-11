import type { Media } from "@/payload-types";
import type {
  ContactPageContent,
  FaqItem,
  FooterContent,
  KnowledgePageContent,
  LeadershipPageContent,
  NavLink,
  NavigationContent,
  PageHero,
  TeamMember,
} from "@/types/site-content";

import { getMediaUrl } from "@/lib/blog";
import {
  contactPageDefaults,
  footerDefaults,
  knowledgePageDefaults,
  leadershipPageDefaults,
  navigationDefaults,
} from "@/lib/site-defaults";
import { getPayloadClient } from "@/lib/payload";

function resolveUploadUrl(
  media: number | Media | null | undefined,
  fallback: string,
): string {
  return getMediaUrl(media) ?? fallback;
}

function mapNavLink(
  item: Record<string, unknown>,
  fallback?: NavLink,
): NavLink {
  return {
    label: (item.label as string) || fallback?.label || "",
    href: (item.href as string) || fallback?.href || "",
    type: (item.type as NavLink["type"]) || fallback?.type || "route",
  };
}

function mapHero(
  hero: Record<string, unknown> | undefined,
  defaults: PageHero,
): PageHero {
  const data = hero ?? {};
  return {
    eyebrow: (data.eyebrow as string) || defaults.eyebrow,
    title: (data.title as string) || defaults.title,
    subtitle: (data.subtitle as string) || defaults.subtitle,
    imageUrl: resolveUploadUrl(
      data.image as number | Media | null | undefined,
      (data.imageUrl as string) || defaults.imageUrl,
    ),
  };
}

function mapNavigationFromCms(data: Record<string, unknown>): NavigationContent {
  return {
    logoUrl: resolveUploadUrl(
      data.logo as number | Media | null | undefined,
      (data.logoUrl as string) || navigationDefaults.logoUrl,
    ),
    homeSectionLinks:
      Array.isArray(data.homeSectionLinks) && data.homeSectionLinks.length > 0
        ? data.homeSectionLinks.map((item, index) =>
            mapNavLink(item as Record<string, unknown>, navigationDefaults.homeSectionLinks[index]),
          )
        : navigationDefaults.homeSectionLinks,
    routeLinks:
      Array.isArray(data.routeLinks) && data.routeLinks.length > 0
        ? data.routeLinks.map((item, index) =>
            mapNavLink(item as Record<string, unknown>, navigationDefaults.routeLinks[index]),
          )
        : navigationDefaults.routeLinks,
  };
}

function mapFooterFromCms(data: Record<string, unknown>): FooterContent {
  return {
    logoUrl: resolveUploadUrl(
      data.logo as number | Media | null | undefined,
      (data.logoUrl as string) || footerDefaults.logoUrl,
    ),
    description: (data.description as string) || footerDefaults.description,
    columns:
      Array.isArray(data.columns) && data.columns.length > 0
        ? data.columns.map((col, colIndex) => {
            const column = col as {
              title?: string;
              links?: { label?: string; href?: string }[];
            };
            const fallbackCol = footerDefaults.columns[colIndex];
            return {
              title: column.title || fallbackCol?.title || "",
              links:
                Array.isArray(column.links) && column.links.length > 0
                  ? column.links.map((link, linkIndex) => ({
                      label:
                        link.label || fallbackCol?.links[linkIndex]?.label || "",
                      href: link.href || fallbackCol?.links[linkIndex]?.href || "#",
                    }))
                  : fallbackCol?.links ?? [],
            };
          })
        : footerDefaults.columns,
    demoTitle: (data.demoTitle as string) || footerDefaults.demoTitle,
    copyright: (data.copyright as string) || footerDefaults.copyright,
  };
}

function mapContactPageFromCms(data: Record<string, unknown>): ContactPageContent {
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  return {
    hero: mapHero(hero, contactPageDefaults.hero),
    address: (data.address as string) || contactPageDefaults.address,
    email: (data.email as string) || contactPageDefaults.email,
    mapAddress: (data.mapAddress as string) || contactPageDefaults.mapAddress,
    formSubmitLabel:
      (data.formSubmitLabel as string) || contactPageDefaults.formSubmitLabel,
    formSuccessMessage:
      (data.formSuccessMessage as string) || contactPageDefaults.formSuccessMessage,
  };
}

function mapTeamMember(
  item: Record<string, unknown>,
  fallback?: TeamMember,
): TeamMember {
  return {
    name: (item.name as string) || fallback?.name || "",
    designation: (item.designation as string) || fallback?.designation || "",
    imageUrl: resolveUploadUrl(
      item.image as number | Media | null | undefined,
      (item.imageUrl as string) || fallback?.imageUrl || "",
    ),
  };
}

function mapLeadershipPageFromCms(data: Record<string, unknown>): LeadershipPageContent {
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  return {
    hero: mapHero(hero, leadershipPageDefaults.hero),
    members:
      Array.isArray(data.members) && data.members.length > 0
        ? data.members.map((item, index) =>
            mapTeamMember(
              item as Record<string, unknown>,
              leadershipPageDefaults.members[index],
            ),
          )
        : leadershipPageDefaults.members,
  };
}

function mapFaqItem(item: Record<string, unknown>, fallback?: FaqItem): FaqItem {
  return {
    id: (item.id as string) || fallback?.id || "",
    question: (item.question as string) || fallback?.question || "",
    answer: (item.answer as string) || fallback?.answer || "",
  };
}

function mapKnowledgePageFromCms(data: Record<string, unknown>): KnowledgePageContent {
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  return {
    hero: mapHero(hero, knowledgePageDefaults.hero),
    faqs:
      Array.isArray(data.faqs) && data.faqs.length > 0
        ? data.faqs.map((item, index) =>
            mapFaqItem(item as Record<string, unknown>, knowledgePageDefaults.faqs[index]),
          )
        : knowledgePageDefaults.faqs,
    ctaTitle: (data.ctaTitle as string) || knowledgePageDefaults.ctaTitle,
    ctaDescription:
      (data.ctaDescription as string) || knowledgePageDefaults.ctaDescription,
    ctaButtonLabel:
      (data.ctaButtonLabel as string) || knowledgePageDefaults.ctaButtonLabel,
    ctaButtonLink:
      (data.ctaButtonLink as string) || knowledgePageDefaults.ctaButtonLink,
  };
}

export async function getNavigationContent(): Promise<NavigationContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "site-navigation", depth: 2 });
    return mapNavigationFromCms(data as Record<string, unknown>);
  } catch {
    return navigationDefaults;
  }
}

export async function getFooterContent(): Promise<FooterContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "site-footer", depth: 2 });
    return mapFooterFromCms(data as Record<string, unknown>);
  } catch {
    return footerDefaults;
  }
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "contact-page", depth: 2 });
    return mapContactPageFromCms(data as Record<string, unknown>);
  } catch {
    return contactPageDefaults;
  }
}

export async function getLeadershipPageContent(): Promise<LeadershipPageContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "leadership-page", depth: 2 });
    return mapLeadershipPageFromCms(data as Record<string, unknown>);
  } catch {
    return leadershipPageDefaults;
  }
}

export async function getKnowledgePageContent(): Promise<KnowledgePageContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "knowledge-page", depth: 2 });
    return mapKnowledgePageFromCms(data as Record<string, unknown>);
  } catch {
    return knowledgePageDefaults;
  }
}

export function buildMapEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
