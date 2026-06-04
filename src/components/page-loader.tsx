"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function LoaderContent() {
  return (
    <section
      className="absolute inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden"
      aria-busy="true"
      aria-label="Loading"
    >
      <Image
        src="/loader.gif"
        width={1024}
        height={1024}
        alt="Loading"
        className="block w-52"
        unoptimized
        priority
      />
    </section>
  );
}

/** Full-screen loader via portal — works inside HeroCanvas Suspense without clipping. */
export function PageLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoaderContent />;
  }

  return createPortal(<LoaderContent />, document.body);
}
