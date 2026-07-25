import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage"
    ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    ALTER TABLE "homepage"
    ADD COLUMN IF NOT EXISTS "hero_image_url" varchar;

    ALTER TABLE "homepage"
    ADD COLUMN IF NOT EXISTS "hero_mobile_image_id" integer;

    ALTER TABLE "homepage"
    ADD COLUMN IF NOT EXISTS "hero_mobile_image_url" varchar;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive additive migration.
}
