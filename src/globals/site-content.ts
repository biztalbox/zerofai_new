import type { GlobalConfig } from "payload";

const pageHeroFields = [
  { name: "eyebrow", type: "text" as const, label: "Eyebrow label" },
  { name: "title", type: "text" as const, required: true },
  { name: "subtitle", type: "text" as const },
  {
    name: "image",
    type: "upload" as const,
    relationTo: "media" as const,
    label: "Hero image",
  },
  {
    name: "imageUrl",
    type: "text" as const,
    label: "Hero image URL (fallback if no upload)",
  },
];

const navLinkFields = [
  { name: "label", type: "text" as const, required: true },
  {
    name: "href",
    type: "text" as const,
    required: true,
    admin: { description: "Route path (e.g. /contact) or section id (e.g. what-is)" },
  },
  {
    name: "type",
    type: "select" as const,
    required: true,
    defaultValue: "route",
    options: [
      { label: "Page route", value: "route" },
      { label: "Homepage anchor", value: "anchor" },
    ],
  },
];

export const SiteNavigation: GlobalConfig = {
  slug: "site-navigation",
  label: "Header / Navigation",
  access: { read: () => true },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
    {
      name: "logoUrl",
      type: "text",
      label: "Logo URL (fallback if no upload)",
      defaultValue: "/assets/logo.png",
    },
    {
      name: "homeSectionLinks",
      type: "array",
      label: "Homepage section links",
      fields: navLinkFields,
    },
    {
      name: "routeLinks",
      type: "array",
      label: "Page links",
      fields: navLinkFields,
    },
  ],
};

export const SiteFooter: GlobalConfig = {
  slug: "site-footer",
  label: "Footer",
  access: { read: () => true },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
    {
      name: "logoUrl",
      type: "text",
      label: "Logo URL (fallback)",
      defaultValue: "/assets/logo.png",
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "columns",
      type: "array",
      label: "Link columns",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    { name: "demoTitle", type: "text", label: "Demo form title", defaultValue: "Book a demo" },
    {
      name: "copyright",
      type: "text",
      label: "Copyright text",
      defaultValue: "ZerofAI All rights reserved.",
    },
  ],
};

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", fields: pageHeroFields }],
        },
        {
          label: "Contact info",
          fields: [
            { name: "address", type: "textarea", required: true },
            { name: "email", type: "text", required: true },
            {
              name: "mapAddress",
              type: "textarea",
              label: "Map search address",
              admin: { description: "Used to generate the Google Maps embed" },
            },
          ],
        },
        {
          label: "Form",
          fields: [
            { name: "formSubmitLabel", type: "text", defaultValue: "Request Demo" },
            {
              name: "formSuccessMessage",
              type: "textarea",
              defaultValue:
                "Thank you! Your message has been submitted. Our team will get back to you soon.",
            },
          ],
        },
      ],
    },
  ],
};

export const LeadershipPage: GlobalConfig = {
  slug: "leadership-page",
  label: "Leadership / Our Team Page",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", fields: pageHeroFields }],
        },
        {
          label: "Team",
          fields: [
            {
              name: "members",
              type: "array",
              label: "Team members",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "designation", type: "text", required: true },
                { name: "image", type: "upload", relationTo: "media", label: "Photo" },
                {
                  name: "imageUrl",
                  type: "text",
                  label: "Photo URL (fallback)",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const KnowledgePage: GlobalConfig = {
  slug: "knowledge-page",
  label: "Knowledge Page",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", fields: pageHeroFields }],
        },
        {
          label: "FAQs",
          fields: [
            {
              name: "faqs",
              type: "array",
              fields: [
                {
                  name: "id",
                  type: "text",
                  admin: { description: "Unique id for accordion (e.g. what-is-zerofai)" },
                },
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "CTA",
          fields: [
            { name: "ctaTitle", type: "text", defaultValue: "Still have questions?" },
            {
              name: "ctaDescription",
              type: "textarea",
              defaultValue: "Our engineering team is ready to walk you through a custom demo.",
            },
            { name: "ctaButtonLabel", type: "text", defaultValue: "Contact Support" },
            { name: "ctaButtonLink", type: "text", defaultValue: "/contact" },
          ],
        },
      ],
    },
  ],
};

export const SiteGlobals = [
  SiteNavigation,
  SiteFooter,
  ContactPage,
  LeadershipPage,
  KnowledgePage,
];
