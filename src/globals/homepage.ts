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
                  type: "row",
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      label: "Desktop / tablet background image",
                      admin: {
                        description:
                          "Priority: if set, image is shown instead of video on tablet/desktop.",
                        width: "50%",
                      },
                    },
                    {
                      name: "imageUrl",
                      type: "text",
                      label: "Desktop / tablet image URL (fallback)",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "video",
                      type: "upload",
                      relationTo: "media",
                      label: "Desktop / tablet background video",
                      admin: {
                        description: "Used only when no desktop/tablet image is set.",
                        width: "50%",
                      },
                    },
                    {
                      name: "videoUrl",
                      type: "text",
                      label: "Desktop / tablet video URL (fallback)",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "mobileImage",
                      type: "upload",
                      relationTo: "media",
                      label: "Mobile background image",
                      admin: {
                        description:
                          "Priority: if set, image is shown instead of video on phone.",
                        width: "50%",
                      },
                    },
                    {
                      name: "mobileImageUrl",
                      type: "text",
                      label: "Mobile image URL (fallback)",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "mobileVideo",
                      type: "upload",
                      relationTo: "media",
                      label: "Mobile background video",
                      admin: {
                        description: "Used only when no mobile image is set.",
                        width: "50%",
                      },
                    },
                    {
                      name: "mobileVideoUrl",
                      type: "text",
                      label: "Mobile video URL (fallback)",
                      admin: { width: "50%" },
                    },
                  ],
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
