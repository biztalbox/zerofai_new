import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_navigation_route_links"
    ADD COLUMN IF NOT EXISTS "show_on_homepage" boolean DEFAULT true;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive additive migration.
}
