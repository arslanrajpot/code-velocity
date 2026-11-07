"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article" | "header" | "span";
  delay?: number;
  className?: string;
};

/**
 * Fades content up when it scrolls into view. Styling lives in globals.css and
 * only applies when JS is running; reduced-motion users see content immediately.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-revealed={revealed ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
