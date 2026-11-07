"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/company";
import { cn } from "@/lib/cn";

/**
 * Desktop: a tabbed engineering workflow — pick a stage to see what happens
 * and what you get. Mobile: the same content as a connected vertical timeline.
 */
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const step = processSteps[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = processSteps.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % processSteps.length
        : event.key === "ArrowLeft"
          ? (active - 1 + processSteps.length) % processSteps.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      {/* Mobile & tablet: vertical timeline */}
      <ol className="relative mt-14 space-y-12 border-l border-charcoal/15 pl-8 lg:hidden">
        {processSteps.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5px)] top-1.5 size-[9px] bg-charcoal ring-4 ring-paper"
            />
            <p className="font-mono text-sm text-mute-ink">{item.index}</p>
            <h3 className="type-h3 mt-2">{item.title}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-mute-ink">{item.summary}</p>
            <ul className="mt-5 space-y-2 text-[0.9375rem]">
              {item.activities.map((activity) => (
                <li key={activity} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-charcoal/50" />
                  {activity}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-2 border-lime pl-4 text-[0.9375rem] font-medium">
              {item.output}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop: interactive workflow */}
      <div className="mt-16 hidden lg:block">
        <div role="tablist" aria-label="Development process" className="relative grid grid-cols-4" onKeyDown={onKeyDown}>
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] h-px bg-charcoal/15" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[7px] h-px bg-charcoal transition-[width] duration-700 ease-[var(--ease-out-expo)]"
            style={{ width: `${(active / processSteps.length) * 100}%` }}
          />
          {processSteps.map((item, i) => {
            const selected = i === active;
            const done = i <= active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                id={`process-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="process-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className="group relative pr-8 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative block size-[15px] border transition-colors duration-500",
                    selected
                      ? "border-charcoal bg-lime"
                      : done
                        ? "border-charcoal bg-charcoal"
                        : "border-charcoal/30 bg-paper group-hover:border-charcoal",
                  )}
                />
                <span className="mt-6 block font-mono text-sm text-mute-ink">{item.index}</span>
                <span
                  className={cn(
                    "mt-2 block font-display text-[2.5rem] font-medium leading-none tracking-[-0.035em] transition-colors duration-300",
                    selected ? "text-charcoal" : "text-charcoal/45 group-hover:text-charcoal/75",
                  )}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="process-panel"
          role="tabpanel"
          aria-labelledby={`process-tab-${step.id}`}
          className="mt-14 border-t border-charcoal/15 pt-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-12 gap-10"
            >
              <p className="col-span-5 text-pretty font-display text-[1.75rem] leading-snug tracking-[-0.02em]">
                {step.summary}
              </p>
              <div className="col-span-4">
                <p className="eyebrow mb-5 text-mute-ink">What happens</p>
                <ul className="space-y-3">
                  {step.activities.map((activity) => (
                    <li key={activity} className="flex gap-3 leading-relaxed">
                      <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-charcoal/50" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-3">
                <p className="eyebrow mb-5 text-mute-ink">You get</p>
                <p className="border-l-2 border-lime pl-4 font-medium leading-relaxed">{step.output}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
