import type { Project } from "@/content/project-types";
import { cn } from "@/lib/cn";

/**
 * Project artwork generated from the project's verified architecture: its
 * headline figure and real pipeline steps. Used instead of mock screenshots.
 * Hover (via a parent `group`) runs a signal along the pipeline.
 */
export function ProjectPreview({
  project,
  className,
  size = "default",
}: {
  project: Project;
  className?: string;
  size?: "default" | "large" | "wide";
}) {
  const steps = project.systems[0]?.steps ?? [];

  return (
    <div
      className={cn(
        "@container relative isolate overflow-hidden border border-white/10 bg-charcoal",
        {
          default: "aspect-[4/3]",
          large: "aspect-[4/3] md:aspect-[16/11]",
          wide: "aspect-[4/3] md:aspect-[21/9]",
        }[size],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-blueprint absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />

      <div className="relative flex h-full flex-col justify-between p-[5cqi]">
        <div className="flex items-start justify-between gap-4 font-mono text-[max(0.625rem,1.9cqi)] uppercase tracking-[0.12em] text-mute">
          <span className="truncate">{project.slug}</span>
          <span className="shrink-0">{project.period}</span>
        </div>

        <div>
          <p className="font-display text-[clamp(1.75rem,11cqi,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-paper">
            {project.signal.value}
          </p>
          <p className="mt-[2cqi] font-mono text-[max(0.6875rem,2.1cqi)] uppercase tracking-[0.1em] text-lime">
            {project.signal.label}
          </p>
        </div>

        {/* Pipeline: the project's real system steps */}
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] h-px bg-white/15" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative pr-2">
              <span
                aria-hidden="true"
                className="relative block size-[11px] border border-white/40 bg-charcoal transition-colors duration-300 group-hover:border-lime group-hover:bg-lime"
                style={{ transitionDelay: `${i * 90}ms` }}
              />
              <span className="mt-3 hidden text-[max(0.625rem,1.75cqi)] leading-tight text-paper/60 @md:line-clamp-2">
                {step.title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
