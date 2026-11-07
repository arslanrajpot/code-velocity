import {
  Cable,
  GitBranch,
  KeyRound,
  Network,
  ScanSearch,
  ShieldCheck,
  TextSearch,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { getTechIcon } from "@/content/tech";
import { cn } from "@/lib/cn";

/** Practices and concepts get a neutral glyph; brands without a published icon get a monogram. */
const CONCEPT_ICONS: Record<string, LucideIcon> = {
  RAG: TextSearch,
  "Vector Search": ScanSearch,
  LangGraph: Workflow,
  WebSockets: Cable,
  "CI/CD": GitBranch,
  "OAuth 2.0": KeyRound,
  RBAC: ShieldCheck,
  Microservices: Network,
};

/** Technology chip with its brand icon, a concept glyph, or a monogram. */
export function TechBadge({
  name,
  tone = "dark",
  className,
}: {
  name: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const icon = getTechIcon(name);
  const Concept = CONCEPT_ICONS[name];
  const iconClass = cn(
    "size-4 shrink-0 transition-colors duration-300",
    tone === "dark" ? "opacity-80 group-hover/tech:text-lime" : "opacity-75",
  );

  return (
    <span
      className={cn(
        "group/tech inline-flex h-10 items-center gap-2.5 border px-3 text-sm transition-colors duration-300",
        tone === "dark"
          ? "border-white/10 text-paper/85 hover:border-lime/50 hover:text-paper"
          : "border-charcoal/15 text-charcoal/85 hover:border-charcoal/50 hover:text-charcoal",
        className,
      )}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(iconClass, "fill-current")}>
          <path d={icon.path} />
        </svg>
      ) : Concept ? (
        <Concept aria-hidden="true" strokeWidth={1.75} className={iconClass} />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "grid h-4 min-w-4 shrink-0 place-items-center px-0.5 font-mono text-[0.5rem] font-medium uppercase leading-none ring-1 transition-colors duration-300",
            tone === "dark"
              ? "ring-white/40 group-hover/tech:text-lime group-hover/tech:ring-lime"
              : "ring-charcoal/50",
          )}
        >
          {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
        </span>
      )}
      <span>{name}</span>
    </span>
  );
}
