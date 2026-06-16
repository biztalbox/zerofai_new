/**
 * Fix site-footer CMS saves:
 * - remove orphaned nested array rows
 * - add missing FK constraints (Payload expects these for nested arrays)
 * - reseed footer link columns from defaults
 */
import { randomBytes } from "node:crypto";

import { config as loadEnv } from "dotenv";
import pg from "pg";

loadEnv({ path: ".env.local" });

const MIGRATION_NAME = "20260615_site_footer_schema_fix";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });

const footerDefaults = {
  description:
    "Engineering the next generation of neural architectures. We bridge the gap between human intuition and machine precision to build an autonomous future.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Our Team", href: "/our-team" },
        { label: "Blogs", href: "/blog" },
        { label: "Knowledge Center", href: "/knowledge" },
        { label: "Customer Stories", href: "#" },
      ],
    },
    {
      title: "Quicklinks",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/termscondition" },
      ],
    },
  ],
  demoTitle: "Book a demo",
  copyright: "ZerofAI All rights reserved.",
};

function newArrayId() {
  return randomBytes(12).toString("hex");
}

async function addConstraint(name, sql) {
  try {
    await pool.query(sql);
    console.log(`Added constraint ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("already exists")) {
      console.log(`Constraint ${name} already exists`);
      return;
    }
    throw error;
  }
}

try {
  await pool.query(`DELETE FROM "site_footer_columns_links"`);
  await pool.query(`DELETE FROM "site_footer_columns"`);
  console.log("Cleared footer column/link rows.");

  await addConstraint(
    "site_footer_logo_id_media_id_fk",
    `ALTER TABLE "site_footer"
     ADD CONSTRAINT "site_footer_logo_id_media_id_fk"
     FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
  );

  await addConstraint(
    "site_footer_columns_parent_id_fk",
    `ALTER TABLE "site_footer_columns"
     ADD CONSTRAINT "site_footer_columns_parent_id_fk"
     FOREIGN KEY ("_parent_id") REFERENCES "site_footer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  );

  await addConstraint(
    "site_footer_columns_links_parent_id_fk",
    `ALTER TABLE "site_footer_columns_links"
     ADD CONSTRAINT "site_footer_columns_links_parent_id_fk"
     FOREIGN KEY ("_parent_id") REFERENCES "site_footer_columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  );

  const footer = await pool.query(`SELECT id FROM "site_footer" ORDER BY id LIMIT 1`);
  const footerId = footer.rows[0]?.id ?? 1;

  if (!footer.rows[0]) {
    await pool.query(`INSERT INTO "site_footer" DEFAULT VALUES`);
  }

  let columnOrder = 0;
  for (const column of footerDefaults.columns) {
    columnOrder += 1;
    const columnId = newArrayId();

    await pool.query(
      `INSERT INTO "site_footer_columns" ("_order", "_parent_id", "id", "title")
       VALUES ($1, $2, $3, $4)`,
      [columnOrder, footerId, columnId, column.title],
    );

    let linkOrder = 0;
    for (const link of column.links) {
      linkOrder += 1;
      await pool.query(
        `INSERT INTO "site_footer_columns_links" ("_order", "_parent_id", "id", "label", "href")
         VALUES ($1, $2, $3, $4, $5)`,
        [linkOrder, columnId, newArrayId(), link.label, link.href],
      );
    }
  }

  await pool.query(
    `UPDATE "site_footer"
     SET
       "description" = COALESCE("description", $1),
       "demo_title" = COALESCE("demo_title", $2),
       "copyright" = COALESCE("copyright", $3),
       "updated_at" = NOW()
     WHERE "id" = $4`,
    [
      footerDefaults.description,
      footerDefaults.demoTitle,
      footerDefaults.copyright,
      footerId,
    ],
  );

  const pending = await pool.query(
    `SELECT 1 FROM "payload_migrations" WHERE name = $1 LIMIT 1`,
    [MIGRATION_NAME],
  );

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
    console.log(`Recorded migration "${MIGRATION_NAME}" (batch ${nextBatch}).`);
  } else {
    console.log(`Migration "${MIGRATION_NAME}" already recorded.`);
  }

  console.log("Site footer schema repaired and reseeded.");
} catch (error) {
  console.error("Fix failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
