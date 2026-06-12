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

  const siteNavExists = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'site_navigation'
    ) AS exists
  `);

  const siteMigrationPending = await pool.query(`
    SELECT 1 FROM "payload_migrations"
    WHERE name = '20260611_site_content_globals'
    LIMIT 1
  `);

  if (!siteNavExists.rows[0]?.exists && siteMigrationPending.rowCount === 0) {
    console.log(
      "Site content CMS tables are missing. Run: yarn migrate:site-content",
    );
  }

  const footerFkExists = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'site_footer_columns_links_parent_id_fk'
    ) AS exists
  `);

  if (!footerFkExists.rows[0]?.exists) {
    console.log(
      "Site footer CMS schema is missing nested-array FKs. Run: yarn fix:site-footer-schema",
    );
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
