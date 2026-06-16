import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const MIGRATION_NAME = "20260617_blog_page_global";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const createTableSql = `
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
`;

try {
  const pending = await pool.query(
    `SELECT 1 FROM "payload_migrations" WHERE name = $1 LIMIT 1`,
    [MIGRATION_NAME],
  );

  await pool.query(createTableSql);

  if (pending.rowCount === 0) {
    const latestBatch = await pool.query(
      `SELECT COALESCE(MAX(batch), 0) AS batch FROM "payload_migrations"`,
    );
    const nextBatch = Number(latestBatch.rows[0]?.batch ?? 0) + 1;

    await pool.query(
      `INSERT INTO "payload_migrations" (name, batch, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())`,
      [MIGRATION_NAME, nextBatch],
    );

    console.log(`Applied "${MIGRATION_NAME}" (batch ${nextBatch}).`);
  } else {
    console.log(`"${MIGRATION_NAME}" table ensured.`);
  }
} catch (error) {
  console.error("Migration failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
