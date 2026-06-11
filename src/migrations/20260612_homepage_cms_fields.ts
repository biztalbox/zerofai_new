import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "hero_video_url" varchar;
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "what_is_video_url" varchar;
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "faq_visible_count" numeric;

    ALTER TABLE "homepage_customer_trust_cards" ADD COLUMN IF NOT EXISTS "video_id" varchar;
    ALTER TABLE "homepage_customer_trust_cards" ADD COLUMN IF NOT EXISTS "image_url" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage_customer_trust_cards" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE "homepage_customer_trust_cards" DROP COLUMN IF EXISTS "video_id";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "faq_visible_count";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "what_is_video_url";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "hero_video_url";
  `);
}
