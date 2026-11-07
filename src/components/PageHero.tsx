import { cn } from "@/lib/cn";

/** Opening section for inner pages: label, oversized title, and an intro. */
export function PageHero({
  label,
  title,
  intro,
  children,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-dark relative overflow-hidden bg-ink", className)}>
      <div
        aria-hidden="true"
        className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-site relative pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
        <p className="eyebrow fade-up mb-8 flex items-center gap-3 text-mute">
          <span aria-hidden="true" className="size-1.5 bg-lime" />
          {label}
        </p>
        <h1 className="type-h1 line-mask max-w-[18ch] text-balance">
          <span>{title}</span>
        </h1>
        {intro && (
          <div
            className="fade-up mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-paper/70 sm:text-xl"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            {intro}
          </div>
        )}
        {children && (
          <div className="fade-up mt-12" style={{ "--delay": "300ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
