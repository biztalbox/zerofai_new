const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const bucket =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  process.env.SUPABASE_STORAGE_BUCKET ||
  process.env.S3_BUCKET;

type ResolveMediaUrlArgs = {
  url?: string | null;
  filename?: string | null;
  prefix?: string | null;
};

/** Public object URL for a file in Supabase Storage. */
export function buildSupabasePublicUrl(filename: string, prefix = "media"): string | null {
  if (!supabaseUrl || !bucket) return null;
  const path = prefix ? `${prefix}/${filename}` : filename;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/** Convert S3/API-style Supabase URLs to browser-accessible public URLs. */
export function toSupabasePublicUrl(url: string): string {
  if (!supabaseUrl || !bucket) return url;
  if (url.includes("/storage/v1/object/public/")) return url;

  const s3Match = url.match(/\/storage\/v1\/s3\/([^/]+)\/(.+)$/);
  if (s3Match) {
    return `${supabaseUrl}/storage/v1/object/public/${s3Match[1]}/${s3Match[2]}`;
  }

  const objectAuthedMatch = url.match(/\/storage\/v1\/object\/(?:sign|authenticated)\/([^/]+)\/(.+)$/);
  if (objectAuthedMatch) {
    return `${supabaseUrl}/storage/v1/object/public/${objectAuthedMatch[1]}/${objectAuthedMatch[2]}`;
  }

  return url;
}

export function resolveMediaPublicUrl({
  url,
  filename,
  prefix = "media",
}: ResolveMediaUrlArgs): string | null {
  if (url?.startsWith("http")) {
    return toSupabasePublicUrl(url);
  }

  if (url?.startsWith("/api/media/file/") && filename) {
    return buildSupabasePublicUrl(filename, prefix || "media");
  }

  if (filename) {
    return buildSupabasePublicUrl(filename, prefix || "media");
  }

  if (url?.startsWith("/")) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
    return serverUrl ? `${serverUrl}${url}` : url;
  }

  return url ?? null;
}
