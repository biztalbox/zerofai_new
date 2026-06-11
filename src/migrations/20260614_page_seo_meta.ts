import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_schema_json" varchar;

    ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
    ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "meta_schema_json" varchar;

    ALTER TABLE "leadership_page" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
    ALTER TABLE "leadership_page" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    ALTER TABLE "leadership_page" ADD COLUMN IF NOT EXISTS "meta_schema_json" varchar;

    ALTER TABLE "knowledge_page" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
    ALTER TABLE "knowledge_page" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    ALTER TABLE "knowledge_page" ADD COLUMN IF NOT EXISTS "meta_schema_json" varchar;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive additive migration.
}
