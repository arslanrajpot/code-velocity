import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { SystemVisual } from "./SystemVisual";

const HEADLINE = ["We build technology", "that builds", "your business."];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface-dark relative overflow-hidden bg-ink">
      <div className="container-site relative pb-10 pt-14 sm:pt-20 lg:pb-14 lg:pt-24">
        <p className="eyebrow fade-up mb-8 flex items-center gap-3 text-mute sm:mb-10">
          <span aria-hidden="true" className="size-1.5 bg-lime" />
          AI &amp; Software Development Studio
        </p>

        <h1 id="hero-title" className="type-hero max-w-[15ch] text-paper lg:max-w-none">
          {HEADLINE.map((line, i) => (
            <span key={line} className="line-mask" style={{ "--line": i } as React.CSSProperties}>
              <span>
                {line}
                {i === HEADLINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="cursor-blink ml-[0.08em] inline-block h-[0.72em] w-[0.42em] translate-y-[0.04em] bg-lime align-baseline"
                  />
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="fade-up lg:col-span-4 lg:pt-2" style={{ "--delay": "350ms" } as React.CSSProperties}>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-paper/75 sm:text-xl">
              We design and develop custom software, AI-powered solutions, and digital experiences
              that help businesses solve complex challenges, work smarter, and move forward.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/contact" size="lg">
                Discuss Your Project
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>

          <div className="fade-up lg:col-span-8" style={{ "--delay": "500ms" } as React.CSSProperties}>
            <SystemVisual />
          </div>
        </div>
      </div>

      {/* Capability index: answers "what do you do?" at a glance. */}
      <nav aria-label="Services" className="relative border-t border-white/10">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li
              key={service.id}
              className={[
                "border-white/10",
                i % 2 === 1 ? "border-l" : "",
                i >= 2 ? "border-t lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full items-start gap-3 px-1 py-5 transition-colors sm:px-4 lg:py-6"
              >
                <span className="font-mono text-xs text-lime">{service.index}</span>
                <span className="text-sm leading-snug text-paper/70 transition-colors group-hover:text-paper sm:text-[0.9375rem]">
                  {service.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
