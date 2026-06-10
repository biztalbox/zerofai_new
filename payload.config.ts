import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Homepage } from "./src/globals/homepage";
import { articleEditor } from "./src/lib/lexical-editor";
import { s3Storage } from "@payloadcms/storage-s3";
import { config as loadEnv } from "dotenv";
import path from "path";
import type { CollectionConfig } from "payload";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { migrations } from "./src/migrations";
import { buildSupabasePublicUrl, resolveMediaPublicUrl } from "./src/lib/supabase-storage";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });

const databaseUri = process.env.DATABASE_URI || "";
const connectionString =
  databaseUri.includes("pooler.supabase.com") && !databaseUri.includes("pgbouncer")
    ? `${databaseUri}${databaseUri.includes("?") ? "&" : "?"}pgbouncer=true`
    : databaseUri;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Enabled = Boolean(process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY);
const isNextBuild = process.env.npm_lifecycle_event === "build";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["admin"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data && !data.name && typeof data.email === "string") {
          data.name = data.email.split("@")[0];
        }
        if (operation === "create" && data && !data.roles?.length) {
          data.roles = ["admin"];
        }
        return data;
      },
    ],
  },
};

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "prefix",
      type: "text",
      defaultValue: "media",
    },
  ],
  upload: {
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "tablet", width: 1024, height: undefined, position: "centre" },
      { name: "desktop", width: 1920, height: undefined, position: "centre" },
    ],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.filename) {
          const publicUrl = resolveMediaPublicUrl({
            url: typeof doc.url === "string" ? doc.url : null,
            filename: doc.filename,
            prefix: typeof doc.prefix === "string" ? doc.prefix : "media",
          });
          if (publicUrl) doc.url = publicUrl;
        }
        return doc;
      },
    ],
  },
};

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: "published" } };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value;
            if (typeof siblingData?.title === "string") return slugify(siblingData.title);
            return value;
          },
        ],
      },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      editor: articleEditor,
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "src/app/(payload)"),
    },
  },
  collections: [Users, Media, Posts],
  globals: [Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString,
    },
    prodMigrations: isNextBuild ? undefined : migrations,
    push: process.env.NODE_ENV !== "production",
  }),
  plugins: [
    ...(s3Enabled
      ? [
          s3Storage({
            acl: "public-read",
            bucket: process.env.S3_BUCKET || process.env.SUPABASE_STORAGE_BUCKET || "",
            collections: {
              media: {
                prefix: "media",
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename, prefix }) =>
                  buildSupabasePublicUrl(filename, prefix || "media") ?? "",
              },
            },
            config: {
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
              },
              region: process.env.S3_REGION || "ap-northeast-1",
              endpoint: process.env.S3_ENDPOINT,
            },
          }),
        ]
      : []),
  ],
  sharp,
});
