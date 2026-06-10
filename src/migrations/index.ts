import * as migration_20260522_183457_initial from "./20260522_183457_initial";
import * as migration_20260527_add_media_prefix from "./20260527_add_media_prefix";

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
];
