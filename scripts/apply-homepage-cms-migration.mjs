import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const MIGRATION_NAME = "20260612_homepage_cms_fields";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const alterSql = `
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "hero_video_url" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "what_is_video_url" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "faq_visible_count" numeric;

  ALTER TABLE "homepage_customer_trust_cards" ADD COLUMN IF NOT EXISTS "video_id" varchar;
  ALTER TABLE "homepage_customer_trust_cards" ADD COLUMN IF NOT EXISTS "image_url" varchar;
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

    console.log(`Applied migration "${MIGRATION_NAME}" (batch ${nextBatch}).`);
  } else {
    console.log(`Migration "${MIGRATION_NAME}" already applied.`);
  }

  const homepageCount = await pool.query(`SELECT COUNT(*)::int AS c FROM "homepage"`);
  if (Number(homepageCount.rows[0]?.c) === 0) {
    await pool.query(
      `INSERT INTO "homepage" ("hero_title", "what_is_title", "pillars_title", "cta_title", "faq_title")
       VALUES ($1, $2, $3, $4, $5)`,
      [
        "Autonomous IT Operations Platform",
        "What is ZerofAI?",
        "Journey to Autonomous IT Operations",
        "Spend 30 Minutes Exploring the Future of IT Operations",
        "Frequently Asked Questions",
      ],
    );
    console.log("Seeded initial homepage row.");
  }

  console.log("Homepage CMS schema is ready.");
} catch (error) {
  console.error("Migration failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
