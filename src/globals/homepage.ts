import type { GlobalConfig } from "payload";

import { pageMetaGroupFields } from "./seo-fields";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                {
                  name: "video",
                  type: "upload",
                  relationTo: "media",
                  label: "Tablet / desktop background video",
                },
                {
                  name: "videoUrl",
                  type: "text",
                  label: "Tablet / desktop video URL (fallback if no upload)",
                },
                {
                  name: "mobileVideo",
                  type: "upload",
                  relationTo: "media",
                  label: "Mobile background video",
                },
                {
                  name: "mobileVideoUrl",
                  type: "text",
                  label: "Mobile video URL (fallback if no upload)",
                },
                { name: "title", type: "text", required: true },
                { name: "ctaLabel", type: "text", label: "CTA label" },
                { name: "ctaLink", type: "text", label: "CTA link" },
              ],
            },
          ],
        },
        {
          label: "What is ZerofAI",
          fields: [
            {
              name: "whatIs",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                {
                  name: "paragraphs",
                  type: "array",
                  fields: [{ name: "text", type: "textarea", required: true }],
                },
                { name: "video", type: "upload", relationTo: "media", label: "Section video" },
                {
                  name: "videoUrl",
                  type: "text",
                  label: "Video URL (fallback if no upload)",
                },
              ],
            },
          ],
        },
        {
          label: "Customer Trust",
          fields: [
            {
              name: "customerTrust",
              type: "group",
              fields: [
                { name: "heading", type: "text" },
                { name: "headingHighlight", type: "text", label: "Highlighted text" },
                {
                  name: "cards",
                  type: "array",
                  fields: [
                    { name: "number", type: "text", required: true },
                    { name: "image", type: "upload", relationTo: "media" },
                    {
                      name: "imageUrl",
                      type: "text",
                      label: "Image URL (fallback if no upload)",
                    },
                    {
                      name: "videoId",
                      type: "text",
                      label: "YouTube video ID",
                      admin: { description: "e.g. kLja5C1i_kk — opens in popup on click" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "stats",
              type: "group",
              fields: [
                { name: "sectionLabel", type: "text", label: "Section label" },
                {
                  name: "items",
                  type: "array",
                  fields: [
                    { name: "value", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                    { name: "description", type: "textarea" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Platform Pillars",
          fields: [
            {
              name: "pillars",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                {
                  name: "items",
                  type: "array",
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "description", type: "textarea", required: true },
                    { name: "image", type: "upload", relationTo: "media" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "CTA",
          fields: [
            {
              name: "cta",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
                { name: "buttonLabel", type: "text" },
                { name: "buttonLink", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Insights / Catalog",
          fields: [
            {
              name: "catalog",
              type: "group",
              fields: [
                { name: "image", type: "upload", relationTo: "media" },
                {
                  name: "paragraphs",
                  type: "array",
                  fields: [{ name: "text", type: "textarea", required: true }],
                },
                { name: "ctaLabel", type: "text", label: "CTA label" },
                { name: "ctaLink", type: "text", label: "CTA link" },
              ],
            },
          ],
        },
        {
          label: "SEO / Metadata",
          fields: pageMetaGroupFields,
        },
      ],
    },
  ],
};
