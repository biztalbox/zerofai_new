"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * The chat assistant is ~20KB of client JS plus its own state machine and
 * validation module. None of it is needed for first paint, so we render a
 * static launcher button and only pull in the real widget once the browser
 * goes idle or the user actually reaches for it.
 */
const ContactChatBot = dynamic(
  () => import("@/app/(site)/contact/ContactChatBot").then((m) => m.ContactChatBot),
  { ssr: false, loading: () => null },
);

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function DeferredChatBot() {
  const [load, setLoad] = useState(false);
  const openAfterLoad = useRef(false);

  useEffect(() => {
    if (load) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setLoad(true);
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart", "scroll"];
    events.forEach((event) =>
      window.addEventListener(event, activate, { once: true, passive: true }),
    );

    const idle = window as IdleWindow;
    const requestIdle = idle.requestIdleCallback;
    let idleId: number;
    let usedIdleCallback = false;

    if (typeof requestIdle === "function") {
      usedIdleCallback = true;
      idleId = requestIdle(activate, { timeout: 5000 });
    } else {
      idleId = window.setTimeout(activate, 3500);
    }

    return () => {
      cancelled = true;
      events.forEach((event) => window.removeEventListener(event, activate));
      if (usedIdleCallback) idle.cancelIdleCallback?.(idleId);
      else window.clearTimeout(idleId);
    };
  }, [load]);

  // If the user clicked the placeholder, forward that click to the real FAB
  // as soon as the widget has mounted so the interaction is not swallowed.
  useEffect(() => {
    if (!load || !openAfterLoad.current) return;

    let frames = 0;
    let raf = 0;
    const tryOpen = () => {
      const fab = document.getElementById("chatbotIcon");
      if (fab) {
        openAfterLoad.current = false;
        fab.click();
        return;
      }
      if (frames++ < 120) raf = requestAnimationFrame(tryOpen);
    };
    raf = requestAnimationFrame(tryOpen);
    return () => cancelAnimationFrame(raf);
  }, [load]);

  const handlePlaceholderClick = useCallback(() => {
    openAfterLoad.current = true;
    setLoad(true);
  }, []);

  if (load) return <ContactChatBot />;

  // Same position and size as the real FAB, so swapping in causes no shift.
  return (
    <button
      id="chatbotIcon"
      type="button"
      onClick={handlePlaceholderClick}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
      aria-label="Open chat assistant"
    >
      <MessageCircle className="relative h-6 w-6" strokeWidth={2} />
    </button>
  );
}
