/**
 * Prepare Payload for production:
 * 1. Remove dev-mode push markers (batch = -1)
 * 2. Record homepage migration if schema already exists from dev push
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

const pool = new pg.Pool({ connectionString });

try {
  const deleted = await pool.query(
    `DELETE FROM "payload_migrations" WHERE batch = -1 RETURNING name`,
  );

  if (deleted.rowCount > 0) {
    console.log(
      `Removed ${deleted.rowCount} dev-mode marker(s):`,
      deleted.rows.map((row) => row.name).join(", "),
    );
  } else {
    console.log("No dev-mode markers (batch = -1) found.");
  }

  const homepageExists = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'homepage'
    ) AS exists
  `);

  const migrationPending = await pool.query(`
    SELECT 1 FROM "payload_migrations"
    WHERE name = '20260610_homepage_global'
    LIMIT 1
  `);

  if (homepageExists.rows[0]?.exists && migrationPending.rowCount === 0) {
    const latestBatch = await pool.query(`
      SELECT COALESCE(MAX(batch), 0) AS batch FROM "payload_migrations"
    `);
    const nextBatch = Number(latestBatch.rows[0]?.batch ?? 0) + 1;

    await pool.query(
      `INSERT INTO "payload_migrations" (name, batch, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())`,
      ["20260610_homepage_global", nextBatch],
    );

    console.log("Recorded homepage migration for existing dev-provisioned schema.");
  }

  console.log("\nPayload is ready for production mode.");
  console.log("Migrations run automatically when the app starts with NODE_ENV=production.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Production migration prep failed:", message);
  process.exit(1);
} finally {
  await pool.end();
}
