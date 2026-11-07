"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Category, Project } from "@/content/project-types";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | Category;

/** Column spans for the asymmetric grid: a feature row, then alternating 7/5 and 5/7 pairs. */
function layoutFor(index: number, total: number) {
  if (index === 0) return { variant: "feature" as const, className: "md:col-span-12" };
  const k = index - 1;
  const pair = Math.floor(k / 2);
  const first = k % 2 === 0;
  const lastAlone = first && index === total - 1;
  if (lastAlone) return { variant: "default" as const, className: "md:col-span-7 md:col-start-6" };
  const wide = pair % 2 === 0 ? first : !first;
  return {
    variant: "default" as const,
    className: cn(wide ? "md:col-span-7" : "md:col-span-5", !wide && "md:mt-28"),
  };
}

export function ProjectGrid({
  projects,
  categories,
  headingLevel = "h3",
}: {
  projects: Project[];
  /** Only categories that at least one project belongs to. */
  categories: Category[];
  headingLevel?: "h2" | "h3";
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();
  const filters: Filter[] = ["All", ...categories];
  const visible =
    filter === "All" ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((item) => {
          const count =
            item === "All" ? projects.length : projects.filter((p) => p.categories.includes(item)).length;
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2.5 border px-4 text-[0.9375rem] transition-colors duration-300",
                active
                  ? "border-lime bg-lime text-ink"
                  : "border-white/15 text-paper/75 hover:border-white/50 hover:text-paper",
              )}
            >
              {item}
              <span className={cn("font-mono text-xs", active ? "text-ink/60" : "text-paper/40")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      <ul className="mt-12 grid gap-x-10 gap-y-20 md:mt-16 md:grid-cols-12 md:gap-y-24">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const layout = layoutFor(i, visible.length);
            return (
              <motion.li
                key={project.slug}
                layout={reduceMotion ? false : "position"}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={layout.className}
              >
                <ProjectCard project={project} variant={layout.variant} headingLevel={headingLevel} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
