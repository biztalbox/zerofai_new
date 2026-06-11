import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ALTER COLUMN "faq_title" DROP NOT NULL;
    ALTER TABLE "homepage" ALTER COLUMN "hero_title" DROP NOT NULL;
    ALTER TABLE "homepage" ALTER COLUMN "what_is_title" DROP NOT NULL;
    ALTER TABLE "homepage" ALTER COLUMN "pillars_title" DROP NOT NULL;
    ALTER TABLE "homepage" ALTER COLUMN "cta_title" DROP NOT NULL;

    ALTER TABLE "homepage_customer_trust_cards" ALTER COLUMN "image_id" DROP NOT NULL;
    ALTER TABLE "homepage_customer_trust_cards" ALTER COLUMN "number" DROP NOT NULL;

    ALTER TABLE "homepage_what_is_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
    ALTER TABLE "homepage_catalog_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
    ALTER TABLE "homepage_stats_items" ALTER COLUMN "value" DROP NOT NULL;
    ALTER TABLE "homepage_stats_items" ALTER COLUMN "label" DROP NOT NULL;
    ALTER TABLE "homepage_pillars_items" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "homepage_pillars_items" ALTER COLUMN "description" DROP NOT NULL;
    ALTER TABLE "homepage_faq_items" ALTER COLUMN "question" DROP NOT NULL;
    ALTER TABLE "homepage_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive relax migration; no down required.
}
