import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** The closing call to action, shared by every page. */
export function CtaSection({
  title = (
    <>
      Have an idea? Let&apos;s build something that <span className="text-lime">works.</span>
    </>
  ),
  description = "Whether you're developing a new product, improving an existing system, or exploring AI automation, we'd love to understand what you're building.",
}: {
  title?: React.ReactNode;
  description?: string;
}) {
  return (
    <section
      aria-labelledby="cta-title"
      className="surface-dark relative overflow-hidden border-t border-white/10 bg-ink py-24 sm:py-36"
    >
      {/* Velocity lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {[18, 34, 52, 71, 86].map((top, i) => (
          <span
            key={top}
            className="cta-streak absolute h-px w-1/3 bg-gradient-to-r from-transparent via-lime/40 to-transparent"
            style={{ top: `${top}%`, animationDelay: `${i * 1.3}s`, animationDuration: `${6 + (i % 3)}s` }}
          />
        ))}
      </div>

      <div className="container-site relative">
        <Reveal>
          <h2 id="cta-title" className="type-hero max-w-[14ch] text-balance">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-12">
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-paper/70 lg:col-span-6">
            {description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <ButtonLink href="/contact" size="lg">
              Start Your Project
            </ButtonLink>
            <ButtonLink href={`mailto:${site.contact.email}`} size="lg" variant="secondary">
              Email Us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
