"use client";

import { useEffect, useRef, useState } from "react";

import { parseStatValue } from "@/lib/stat-value";

type Props = {
  value: string;
  className?: string;
};

export function CountUpStat({ value, className }: Props) {
  const parsed = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(1);

  useEffect(() => {
    const stat = parseStatValue(value);
    if (!stat) return;

    const el = ref.current;
    if (!el) return;

    let frameId: number | null = null;

    const cancelAnimation = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const startAnimation = () => {
      cancelAnimation();
      setDisplay(1);

      const { target } = stat;
      const duration = 2000;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(1 + (target - 1) * eased);
        setDisplay(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
          frameId = null;
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startAnimation();
        } else {
          cancelAnimation();
          setDisplay(1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      cancelAnimation();
      observer.disconnect();
    };
  }, [value]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {parsed.suffix}
    </span>
  );
}
