import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "hero_image_url" varchar,
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_schema_json" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `);
}

export async function down(): Promise<void> {
  // Non-destructive additive migration.
}
