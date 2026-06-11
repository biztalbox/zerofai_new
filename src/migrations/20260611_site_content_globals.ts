import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

/**
 * Site-wide CMS globals (navigation, footer, contact, leadership, knowledge).
 * Tables may already exist if created during development.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_navigation" (
      "id" serial PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "logo_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "site_navigation_home_section_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "href" varchar,
      "type" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_navigation_route_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "href" varchar,
      "type" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_footer" (
      "id" serial PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "logo_url" varchar,
      "description" varchar,
      "demo_title" varchar,
      "copyright" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "site_footer_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_footer_columns_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "href" varchar
    );

    CREATE TABLE IF NOT EXISTS "contact_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "hero_image_url" varchar,
      "address" varchar,
      "email" varchar,
      "map_address" varchar,
      "form_submit_label" varchar,
      "form_success_message" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "leadership_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "hero_image_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "leadership_page_members" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "designation" varchar,
      "image_id" integer,
      "image_url" varchar
    );

    CREATE TABLE IF NOT EXISTS "knowledge_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_subtitle" varchar,
      "hero_image_id" integer,
      "hero_image_url" varchar,
      "cta_title" varchar,
      "cta_description" varchar,
      "cta_button_label" varchar,
      "cta_button_link" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "knowledge_page_faqs" (
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
    DROP TABLE IF EXISTS "knowledge_page_faqs";
    DROP TABLE IF EXISTS "knowledge_page";
    DROP TABLE IF EXISTS "leadership_page_members";
    DROP TABLE IF EXISTS "leadership_page";
    DROP TABLE IF EXISTS "contact_page";
    DROP TABLE IF EXISTS "site_footer_columns_links";
    DROP TABLE IF EXISTS "site_footer_columns";
    DROP TABLE IF EXISTS "site_footer";
    DROP TABLE IF EXISTS "site_navigation_route_links";
    DROP TABLE IF EXISTS "site_navigation_home_section_links";
    DROP TABLE IF EXISTS "site_navigation";
  `);
}
