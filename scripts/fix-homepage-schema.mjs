/**
 * Relax homepage DB constraints that block CMS saves.
 */
import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const MIGRATION_NAME = "20260613_homepage_schema_fix";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const alterSql = `
  ALTER TABLE "homepage" ALTER COLUMN "faq_title" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "what_is_title" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "pillars_title" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "cta_title" DROP NOT NULL;

  ALTER TABLE "homepage_customer_trust_cards" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "homepage_customer_trust_cards" ALTER COLUMN "number" DROP NOT NULL;

  ALTER TABLE "homepage_what_is_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "homepage_catalog_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "homepage_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "homepage_stats_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "homepage_pillars_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "homepage_pillars_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "homepage_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "homepage_faq_items" ALTER COLUMN "answer" DROP NOT NULL;

  UPDATE "homepage"
  SET
    "created_at" = COALESCE("created_at", NOW()),
    "updated_at" = COALESCE("updated_at", NOW()),
    "what_is_title" = COALESCE("what_is_title", 'What is ZerofAI?'),
    "pillars_title" = COALESCE("pillars_title", 'Journey to Autonomous IT Operations'),
    "cta_title" = COALESCE("cta_title", 'Spend 30 Minutes Exploring the Future of IT Operations'),
    "faq_title" = COALESCE("faq_title", 'Frequently Asked Questions')
  WHERE "created_at" IS NULL OR "what_is_title" IS NULL OR "pillars_title" IS NULL OR "cta_title" IS NULL;
`;

try {
  const pending = await pool.query(
    `SELECT 1 FROM "payload_migrations" WHERE name = $1 LIMIT 1`,
    [MIGRATION_NAME],
  );

  if (pending.rowCount === 0) {
    await pool.query(alterSql);

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
    await pool.query(alterSql);
    console.log(`"${MIGRATION_NAME}" already recorded — re-applied safe alters.`);
  }

  console.log("Homepage schema constraints relaxed.");
} catch (error) {
  console.error("Fix failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
