import * as migration_20260522_183457_initial from "./20260522_183457_initial";
import * as migration_20260527_add_media_prefix from "./20260527_add_media_prefix";
import * as migration_20260610_homepage_global from "./20260610_homepage_global";
import * as migration_20260611_site_content_globals from "./20260611_site_content_globals";

export const migrations = [
  {
    up: migration_20260522_183457_initial.up,
    down: migration_20260522_183457_initial.down,
    name: "20260522_183457_initial",
  },
  {
    up: migration_20260527_add_media_prefix.up,
    down: migration_20260527_add_media_prefix.down,
    name: "20260527_add_media_prefix",
  },
  {
    up: migration_20260610_homepage_global.up,
    down: migration_20260610_homepage_global.down,
    name: "20260610_homepage_global",
  },
  {
    up: migration_20260611_site_content_globals.up,
    down: migration_20260611_site_content_globals.down,
    name: "20260611_site_content_globals",
  },
];
