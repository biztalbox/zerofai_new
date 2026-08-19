"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Source used below the md breakpoint. Empty string = no video on mobile. */
  mobileSrc: string;
  /** Source used from the md breakpoint up. Empty string = no video on desktop. */
  desktopSrc: string;
  mobilePoster?: string;
  desktopPoster?: string;
};

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

type SaveDataNavigator = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * The hero background video used to be mounted with preload="auto" during SSR,
 * so the browser began pulling tens of megabytes before it had even painted the
 * headline — the single largest contributor to a poor mobile LCP.
 *
 * This layer renders nothing on the server, waits until the page has finished
 * loading and the main thread is idle, and only then attaches the <video>.
 *
 * Each breakpoint is evaluated strictly on its own source: if the active
 * breakpoint has no video (because an image was configured for it, or because
 * nothing was configured at all) this renders nothing and the still layer in
 * BridgeHero stands alone. There is no cross-breakpoint fallback.
 *
 * It also opts out entirely for reduced-motion users and on metered or slow
 * connections.
 */
export function HeroVideoLayer({
  mobileSrc,
  desktopSrc,
  mobilePoster,
  desktopPoster,
}: Props) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track the breakpoint so rotating a phone or resizing swaps the source.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Decide once whether playing a background video is appropriate at all.
  useEffect(() => {
    const nav = navigator as SaveDataNavigator;
    if (nav.connection?.saveData) return;
    if (["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAllowed(true);
  }, []);

  // Wait for load + idle before letting the <video> into the DOM.
  useEffect(() => {
    if (!allowed || armed) return;

    let cancelled = false;
    let idleId: number | undefined;
    let usedIdleCallback = false;

    const arm = () => {
      if (!cancelled) setArmed(true);
    };

    const schedule = () => {
      const idle = window as IdleWindow;
      if (typeof idle.requestIdleCallback === "function") {
        usedIdleCallback = true;
        idleId = idle.requestIdleCallback(arm, { timeout: 2500 });
        return;
      }
      idleId = window.setTimeout(arm, 900);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId === undefined) return;
      if (usedIdleCallback) {
        (window as IdleWindow).cancelIdleCallback?.(idleId);
        return;
      }
      window.clearTimeout(idleId);
    };
  }, [allowed, armed]);

  const src = isDesktop === null ? "" : isDesktop ? desktopSrc : mobileSrc;
  const poster = isDesktop ? desktopPoster : mobilePoster;

  // Re-try playback and clear a previous failure whenever the source changes.
  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (!src || !armed || failed) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {
      /* Autoplay refused — the still layer behind stays visible, which is fine. */
    });
  }, [src, armed, failed]);

  if (!src || !armed || failed) return null;

  return (
    <video
      key={src}
      ref={videoRef}
      src={src}
      poster={poster || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
