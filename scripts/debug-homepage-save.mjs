import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

try {
  const columns = await pool.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'homepage'
    ORDER BY ordinal_position
  `);
  console.log("homepage columns:", columns.rows.map((r) => r.column_name).join(", "));

  const rows = await pool.query(`SELECT id, hero_title, created_at FROM homepage ORDER BY id`);
  console.log("homepage rows:", rows.rows);

  const trustCols = await pool.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'homepage_customer_trust_cards'
    ORDER BY ordinal_position
  `);
  console.log("trust card columns:", trustCols.rows.map((r) => r.column_name).join(", "));
} finally {
  await pool.end();
}
