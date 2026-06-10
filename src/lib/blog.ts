import type { Media, Post } from "@/payload-types";

import { resolveMediaPublicUrl } from "@/lib/supabase-storage";

export function getMediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === "number") return null;

  return resolveMediaPublicUrl({
    url: media.url,
    filename: media.filename,
    prefix: media.prefix,
  });
}

export function formatBlogDate(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBlogExcerpt(post: Post): string {
  if (post.excerpt) return post.excerpt;
  return "Read the latest insights from ZerofAI.";
}
