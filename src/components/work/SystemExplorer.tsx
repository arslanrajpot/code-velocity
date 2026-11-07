"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { SystemView } from "@/content/project-types";
import { cn } from "@/lib/cn";

/**
 * Interactive architecture views for a case study. Projects with more than
 * one system view get tabs; hovering a step traces it (a visual enhancement only).
 */
export function SystemExplorer({ systems }: { systems: SystemView[] }) {
  const [active, setActive] = useState(0);
  const [focusStep, setFocusStep] = useState<number | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const system = systems[active];
  const multiple = systems.length > 1;

  const select = (index: number) => {
    setActive(index);
    setFocusStep(null);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % systems.length
        : (active - 1 + systems.length) % systems.length;
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="border border-white/10 bg-ink">
      <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-mute">
          System view{multiple ? "s" : ""} · architecture from verified project notes
        </p>
        {multiple && (
          <div role="tablist" aria-label="System views" className="flex gap-1" onKeyDown={onKeyDown}>
            {systems.map((item, i) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                id={`system-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="system-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "h-9 px-3 text-sm transition-colors",
                  i === active ? "bg-lime text-ink" : "text-paper/65 hover:text-paper",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        id="system-panel"
        {...(multiple ? { role: "tabpanel", "aria-labelledby": `system-tab-${system.id}` } : {})}
        className="relative"
      >
        <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={system.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-5 sm:p-8 lg:p-10"
          >
            <div className="grid gap-6 lg:grid-cols-12">
              <h3 className="type-h3 lg:col-span-5">{system.title}</h3>
              <p className="text-pretty leading-relaxed text-paper/65 lg:col-span-6 lg:col-start-7">
                {system.summary}
              </p>
            </div>

            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {system.steps.map((step, i) => {
                const lit = focusStep === null || focusStep === i;
                const last = i === system.steps.length - 1;
                return (
                  <li
                    key={step.title}
                    onPointerEnter={() => setFocusStep(i)}
                    onPointerLeave={() => setFocusStep(null)}
                    className={cn(
                      "relative border bg-charcoal p-5 transition-all duration-300",
                      focusStep === i ? "border-lime" : "border-white/10",
                      lit ? "opacity-100" : "opacity-45",
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className={focusStep === i ? "text-lime" : "text-mute"}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {!last && (
                        <span className="flex items-center gap-1.5 text-paper/35">
                          <ArrowRight aria-hidden="true" className="size-3" />
                          {String(i + 2).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 font-display text-lg leading-tight tracking-[-0.015em]">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">{step.detail}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="eyebrow text-mute">Key design decisions</p>
              <ul className="mt-5 grid gap-5 md:grid-cols-3">
                {system.decisions.map((decision) => (
                  <li key={decision} className="border-l-2 border-lime pl-4 text-pretty leading-relaxed text-paper/80">
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
