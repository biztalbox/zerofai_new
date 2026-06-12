import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "site_footer"
        ADD CONSTRAINT "site_footer_logo_id_media_id_fk"
        FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_footer_columns"
        ADD CONSTRAINT "site_footer_columns_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "site_footer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_footer_columns_links"
        ADD CONSTRAINT "site_footer_columns_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "site_footer_columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
}

export async function down(): Promise<void> {
  // Non-destructive schema fix; no down required.
}
