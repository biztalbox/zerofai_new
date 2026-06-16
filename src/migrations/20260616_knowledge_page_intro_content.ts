import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "knowledge_page" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive additive migration.
}
