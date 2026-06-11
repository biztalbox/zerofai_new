/**
 * Creates site-content CMS global tables and records the migration.
 * Run after adding new Payload globals when `payload migrate` fails on Windows.
 */
import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const databaseUri = process.env.DATABASE_URI;

if (!databaseUri) {
  console.error("DATABASE_URI is missing from .env.local");
  process.exit(1);
}

const connectionString = databaseUri.includes("pooler.supabase.com") && !databaseUri.includes("pgbouncer")
  ? `${databaseUri}${databaseUri.includes("?") ? "&" : "?"}pgbouncer=true`
  : databaseUri;

const MIGRATION_NAME = "20260611_site_content_globals";

const pool = new pg.Pool({ connectionString });

const createTablesSql = `
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
`;

try {
  const pending = await pool.query(
    `SELECT 1 FROM "payload_migrations" WHERE name = $1 LIMIT 1`,
    [MIGRATION_NAME],
  );

  if (pending.rowCount > 0) {
    console.log(`Migration "${MIGRATION_NAME}" already applied.`);
  } else {
    await pool.query(createTablesSql);

    const latestBatch = await pool.query(
      `SELECT COALESCE(MAX(batch), 0) AS batch FROM "payload_migrations"`,
    );
    const nextBatch = Number(latestBatch.rows[0]?.batch ?? 0) + 1;

    await pool.query(
      `INSERT INTO "payload_migrations" (name, batch, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())`,
      [MIGRATION_NAME, nextBatch],
    );

    console.log(`Applied migration "${MIGRATION_NAME}" (batch ${nextBatch}).`);
  }

  const globals = [
    "site_navigation",
    "site_footer",
    "contact_page",
    "leadership_page",
    "knowledge_page",
  ];

  for (const table of globals) {
    const count = await pool.query(`SELECT COUNT(*)::int AS c FROM "${table}"`);
    if (Number(count.rows[0]?.c) === 0) {
      await pool.query(`INSERT INTO "${table}" DEFAULT VALUES`);
      console.log(`Seeded initial row in ${table}`);
    }
  }

  console.log("Site content CMS tables are ready.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Migration failed:", message);
  process.exit(1);
} finally {
  await pool.end();
}
