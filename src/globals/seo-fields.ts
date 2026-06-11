export const pageMetaGroupFields = [
  {
    name: "meta",
    type: "group" as const,
    label: "SEO / Metadata",
    fields: [
      { name: "title", type: "text" as const, label: "Meta title", required: true },
      { name: "description", type: "textarea" as const, label: "Meta description", required: true },
      {
        name: "schemaJson",
        type: "textarea" as const,
        label: "JSON-LD schema",
        admin: {
          description: "Optional structured data JSON (schema.org). Must be valid JSON.",
        },
      },
    ],
  },
];
