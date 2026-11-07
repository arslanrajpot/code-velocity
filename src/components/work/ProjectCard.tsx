import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/project-types";
import { cn } from "@/lib/cn";
import { AttributionBadge } from "./AttributionBadge";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCard({
  project,
  variant = "default",
  headingLevel: Heading = "h3",
  className,
}: {
  project: Project;
  variant?: "default" | "feature";
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const feature = variant === "feature";

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/work/${project.slug}`}
        className={cn("block", feature && "grid gap-8 md:grid-cols-12 md:gap-10")}
      >
        <ProjectPreview
          project={project}
          size={feature ? "large" : "default"}
          className={feature ? "md:col-span-7" : undefined}
        />

        <div className={cn(feature ? "flex flex-col md:col-span-5 md:py-2" : "mt-7")}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-mute">
              {project.category}
            </span>
            <AttributionBadge type={project.attribution.type} />
          </div>

          <Heading
            className={cn(
              "mt-5 font-display font-medium tracking-[-0.03em] text-paper text-balance",
              feature ? "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1]" : "text-[1.75rem] leading-[1.1]",
            )}
          >
            {project.name}
          </Heading>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-paper/65">{project.summary}</p>

          {feature && (
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-sm leading-snug text-paper/55">{outcome.label}</dt>
                  <dd className="font-display text-3xl font-medium tracking-[-0.03em] text-lime">
                    {outcome.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-paper/50">
            {project.stack.slice(0, feature ? 7 : 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <span
            className={cn(
              "inline-flex items-center gap-2 font-medium text-paper",
              feature ? "mt-auto pt-10" : "mt-7",
            )}
          >
            <span className="link-underline pb-0.5 [.group:hover_&]:bg-[length:100%_1px]">
              View case study
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-lime transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
