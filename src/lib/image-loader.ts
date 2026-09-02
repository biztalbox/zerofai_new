/**
 * Helpers for pointing raw <img>/<picture> markup at Next.js' built-in image
 * optimizer. Needed where next/image cannot be used directly — art-directed
 * heroes that swap between a portrait mobile crop and a landscape desktop crop
 * via <source media>, which next/image has no API for.
 */

const MOBILE_WIDTHS = [640, 750, 828, 1080] as const;
const DESKTOP_WIDTHS = [1080, 1200, 1920, 2048] as const;

export function optimizedSrc(src: string, width: number, quality = 72): string {
  if (!src) return "";
  // Data URIs and SVGs are passed through untouched.
  if (src.startsWith("data:") || src.endsWith(".svg")) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export function optimizedSrcSet(
  src: string,
  widths: readonly number[],
  quality = 72,
): string {
  if (!src) return "";
  if (src.startsWith("data:") || src.endsWith(".svg")) return src;
  return widths.map((w) => `${optimizedSrc(src, w, quality)} ${w}w`).join(", ");
}

export const mobileSrcSet = (src: string, quality?: number) =>
  optimizedSrcSet(src, MOBILE_WIDTHS, quality);

export const desktopSrcSet = (src: string, quality?: number) =>
  optimizedSrcSet(src, DESKTOP_WIDTHS, quality);
