import { ATTRIBUTION_LABELS, type AttributionType } from "@/content/project-types";
import { cn } from "@/lib/cn";

export function AttributionBadge({
  type,
  tone = "dark",
  className,
}: {
  type: AttributionType;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
        tone === "dark" ? "border-white/15 text-paper/75" : "border-charcoal/20 text-charcoal/80",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5",
          type === "independent"
            ? tone === "dark"
              ? "ring-1 ring-paper/70"
              : "ring-1 ring-charcoal/70"
            : "bg-lime",
        )}
      />
      {ATTRIBUTION_LABELS[type]}
    </span>
  );
}
