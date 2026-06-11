import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

/**
 * Homepage global schema is tracked in production migrations.
 * Tables may already exist if they were created during earlier development.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "homepage" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_video_id" integer,
      "hero_title" varchar,
      "hero_cta_label" varchar,
      "hero_cta_link" varchar,
      "what_is_title" varchar,
      "what_is_video_id" integer,
      "customer_trust_heading" varchar,
      "customer_trust_heading_highlight" varchar,
      "stats_section_label" varchar,
      "pillars_title" varchar,
      "cta_title" varchar,
      "cta_description" varchar,
      "cta_button_label" varchar,
      "cta_button_link" varchar,
      "catalog_image_id" integer,
      "catalog_cta_label" varchar,
      "catalog_cta_link" varchar,
      "faq_eyebrow" varchar,
      "faq_title" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "homepage_what_is_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar
    );

    CREATE TABLE IF NOT EXISTS "homepage_customer_trust_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "number" varchar,
      "image_id" integer
    );

    CREATE TABLE IF NOT EXISTS "homepage_stats_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "homepage_pillars_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "image_id" integer
    );

    CREATE TABLE IF NOT EXISTS "homepage_catalog_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar
    );

    CREATE TABLE IF NOT EXISTS "homepage_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "faq_id" varchar,
      "question" varchar,
      "answer" varchar
    );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "homepage_faq_items" CASCADE;
    DROP TABLE IF EXISTS "homepage_catalog_paragraphs" CASCADE;
    DROP TABLE IF EXISTS "homepage_pillars_items" CASCADE;
    DROP TABLE IF EXISTS "homepage_stats_items" CASCADE;
    DROP TABLE IF EXISTS "homepage_customer_trust_cards" CASCADE;
    DROP TABLE IF EXISTS "homepage_what_is_paragraphs" CASCADE;
    DROP TABLE IF EXISTS "homepage" CASCADE;
  `);
}
