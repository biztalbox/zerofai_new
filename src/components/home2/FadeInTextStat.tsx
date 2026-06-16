"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
};

const WORD_DELAY_MS = 220;
const LABEL_DELAY_MS = 120;

export function FadeInTextStat({ value, label, valueClassName, labelClassName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = value.trim().split(/\s+/);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const reset = () => {
      clearTimers();
      setStep(-1);
    };

    const play = () => {
      clearTimers();
      setStep(-1);

      words.forEach((_, index) => {
        timers.push(
          setTimeout(() => {
            setStep(index);
          }, (index + 1) * WORD_DELAY_MS),
        );
      });

      timers.push(
        setTimeout(() => {
          setStep(words.length);
        }, words.length * WORD_DELAY_MS + LABEL_DELAY_MS),
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          play();
        } else {
          reset();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [value, label, words.length]);

  const visibleStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
  });

  return (
    <div ref={containerRef}>
      <span className={valueClassName} aria-label={value}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block will-change-transform"
            style={visibleStyle(step >= index)}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </span>
      <h3
        className={`${labelClassName ?? ""} will-change-transform`}
        style={visibleStyle(step >= words.length)}
      >
        {label.trim()}
      </h3>
    </div>
  );
}
