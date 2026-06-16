import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const MIGRATION_NAME = "20260616_knowledge_page_intro_content";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const alterSql = `
  ALTER TABLE "knowledge_page" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
`;

try {
  const pending = await pool.query(
    `SELECT 1 FROM "payload_migrations" WHERE name = $1 LIMIT 1`,
    [MIGRATION_NAME],
  );

  await pool.query(alterSql);

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
    console.log(`"${MIGRATION_NAME}" column ensured.`);
  }
} catch (error) {
  console.error("Migration failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
