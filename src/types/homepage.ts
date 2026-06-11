import type { PageSeo } from "@/types/page-seo";

export type HomepageHero = {
  videoUrl: string;
  title: string;
  ctaLabel: string;
  ctaLink: string;
};

export type HomepageWhatIs = {
  title: string;
  paragraphs: string[];
  videoUrl: string;
};

export type HomepageTrustCard = {
  number: string;
  imageUrl: string;
  videoId?: string;
};

export type HomepageCustomerTrust = {
  heading: string;
  headingHighlight: string;
  cards: HomepageTrustCard[];
};

export type HomepageStat = {
  value: string;
  label: string;
  description?: string;
};

export type HomepageStats = {
  sectionLabel: string;
  items: HomepageStat[];
};

export type HomepagePillar = {
  title: string;
  description: string;
  imageUrl: string;
};

export type HomepagePillars = {
  title: string;
  items: HomepagePillar[];
};

export type HomepageCta = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
};

export type HomepageCatalog = {
  imageUrl: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaLink: string;
};

export type HomepageContent = {
  meta: PageSeo;
  hero: HomepageHero;
  whatIs: HomepageWhatIs;
  customerTrust: HomepageCustomerTrust;
  stats: HomepageStats;
  pillars: HomepagePillars;
  cta: HomepageCta;
  catalog: HomepageCatalog;
};
