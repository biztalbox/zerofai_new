import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const tables = [
  "homepage",
  "homepage_what_is_paragraphs",
  "homepage_customer_trust_cards",
  "homepage_stats_items",
  "homepage_pillars_items",
  "homepage_catalog_paragraphs",
  "homepage_faq_items",
];

try {
  for (const table of tables) {
    const exists = await pool.query(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = $1
      ) AS exists`,
      [table],
    );
    console.log(`\n${table}: exists=${exists.rows[0].exists}`);
    if (!exists.rows[0].exists) continue;

    const cols = await pool.query(
      `SELECT column_name, is_nullable, column_default
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1
       ORDER BY ordinal_position`,
      [table],
    );
    for (const c of cols.rows) {
      console.log(`  ${c.column_name} nullable=${c.is_nullable} default=${c.column_default ?? "none"}`);
    }

    const fks = await pool.query(
      `SELECT tc.constraint_name, kcu.column_name, ccu.table_name AS foreign_table
       FROM information_schema.table_constraints tc
       JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
       JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
       WHERE tc.table_name = $1 AND tc.constraint_type = 'FOREIGN KEY'`,
      [table],
    );
    if (fks.rows.length) {
      console.log("  FKs:", fks.rows);
    } else {
      console.log("  FKs: none");
    }
  }
} finally {
  await pool.end();
}
