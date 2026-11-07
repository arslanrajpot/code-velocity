import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Section label: index + name, e.g. "02 — Selected work". */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="size-1.5 bg-lime" />
      {index && <span>{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />}
      <span>{children}</span>
    </p>
  );
}

export function SectionIntro({
  index,
  label,
  title,
  children,
  className,
  titleClassName,
  as: Heading = "h2",
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={className}>
      <Eyebrow index={index} className="mb-6 opacity-80">
        {label}
      </Eyebrow>
      <Heading className={cn(Heading === "h1" ? "type-h1" : "type-h2", "text-balance", titleClassName)}>
        {title}
      </Heading>
      {children}
    </Reveal>
  );
}
